import {FetchWrapper} from "../core/FetchWrapper.ts";
import {AppData} from "../types/System.types.ts";

export const fetchAppData = (): Promise<AppData> =>
    FetchWrapper.get<AppData>("/api/system/getAppData");