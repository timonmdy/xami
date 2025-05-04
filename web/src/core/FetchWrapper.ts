import Cookies from "js-cookie";

export class FetchError extends Error {
  response: Response;
  status: number;
  statusText: string;
  body: string | null;

  constructor(message: string, response: Response, body: string | null) {
    super(message);
    this.name = "FetchError";
    this.response = response;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = body;
  }
}

export class FetchWrapper {
  private static get accessToken(): string | undefined {
    return Cookies.get("accessToken");
  }

  private static get refreshToken(): string | undefined {
    return Cookies.get("refresh_token");
  }

  static async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>("GET", url, undefined, options);
  }

  static async post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>("POST", url, body, options);
  }

  static async put<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>("PUT", url, body, options);
  }

  static async patch<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>("PATCH", url, body, options);
  }

  static async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", url, undefined, options);
  }

  private static async request<T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestInit,
    retry = true
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}),
      ...options?.headers,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    this.updateCookiesFromHeaders(response);

    if (!this.accessToken && this.refreshToken || !response.ok && retry) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        return this.request<T>(method, url, body, options, false);
      }
    }

    if (!response.ok) {
      const errorText = await this.safeParseError(response);
      throw new FetchError(`${response.status} ${response.statusText}`, response, errorText);
    }

    return this.parseResponse<T>(response);
  }

  public static async refreshAuthentication(): Promise<boolean> {
    if(!this.refreshToken) return false;
    return this.refreshAccessToken();
  }

  private static async refreshAccessToken(): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "GET",
        credentials: "include", // needed to send cookies
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.token) {
          Cookies.set("accessToken", data.token, { sameSite: "Strict" });
          return true;
        }
      }
    } catch (err) {
      console.error("Token refresh failed", err);
    }
    return false;
  }

  private static updateCookiesFromHeaders(response: Response) {
    const header = response.headers.get("refresh_cookie");
    if (!header) return;

    header.split(",").forEach((h) => {
      const match = h.match(/refresh_token=([^;]+)/);
      if (match?.[1]) {
        Cookies.set("refresh_token", match[1], { sameSite: "Strict" });
      }
    });
  }

  private static async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      return response.json();
    } else if (
      contentType.includes("text/") ||
      contentType.includes("application/xml") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      return response.text() as unknown as T;
    } else {
      return response.text() as unknown as T;
    }
  }

  private static async safeParseError(response: Response): Promise<string | null> {
    try {
      const data = await response.text();
      return data || null;
    } catch {
      return null;
    }
  }
}
