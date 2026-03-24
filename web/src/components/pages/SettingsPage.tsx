import { LuSettings2 } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import SettingsCard from "../custom/Settings/SettingsCard";

export default function SettingsPage() {
  const { t: lang } = useTranslation();

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-8 gap-6 overflow-hidden">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
          <LuSettings2 className="text-accent text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-text-primary leading-tight">
            {lang("settings.title", "Settings")}
          </h1>
          <p className="text-xs text-text-muted">
            {lang("settings.subtitle", "Manage your account, appearance and preferences")}
          </p>
        </div>
      </div>

      {/* ── Settings Card ────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0">
        <SettingsCard />
      </div>
    </div>
  );
}
