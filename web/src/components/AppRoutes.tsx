import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/lib/NotFoundPage";
import Navbar from "./custom/Navbar/Navbar";
import Sidebar from "./custom/Sidebar/Sidebar";
import { getStorageValue, setStorageValue } from "../storage/StorageProvider.ts";
import GenericErrorPage from "./pages/error/GenericErrorPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";

export default function AppRoutes() {
    const location = useLocation();
    const [errorCode, setErrorCode] = useState<string>("");
    const [sidebarLocked, setSidebarLocked] = useState<boolean>(getStorageValue("sidebarLocked") as boolean);

    useEffect(() => {
        fetch(window.location.pathname, { method: "HEAD" })
            .then((res) => {
                const code = res.headers.get("X-Frontend-Error-Code");
                if (code) setErrorCode(code);
                else setErrorCode("");
            })
            .catch(() => setErrorCode("500"));
    }, [location]);

    function changeSidebarLock(locked: boolean) {
        setSidebarLocked(locked);
        setStorageValue("sidebarLocked", locked);
    }

    if (errorCode) {
        return <GenericErrorPage errorCode={errorCode} />
    }

    return (
        <div className="flex min-h-screen max-h-screen max-w-screen bg-background text-text-primary">
            <Sidebar locked={sidebarLocked} />
            <div className={`flex flex-col w-full min-w-0 transition-all duration-300 ${sidebarLocked ? "ml-60" : "ml-20"}`}>
                <Navbar onSidebarToggle={() => changeSidebarLock(!sidebarLocked)} />

                <main className="flex-1 overflow-auto mt-16 p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
