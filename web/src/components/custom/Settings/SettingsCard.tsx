import React from "react";
import { FiAlertTriangle, FiSave } from "react-icons/fi";
import { LuBell, LuGlobe, LuLock, LuPalette, LuSettings2, LuShieldCheck, LuUser } from "react-icons/lu";
import { SETTINGS_CONFIG, SettingsPageConfig } from "../../../config/Settings.config";
import SettingRenderer from "./SettingRenderer";
import SettingSection from "./SettingSection";
import useSettings from "../../../hooks/User.hooks";

// ─── Icon map — add new react-icons here as you expand the config ─────────────
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
    LuPalette,
    LuGlobe,
    LuSettings2,
    LuUser,
    LuBell,
    LuShieldCheck,
    LuLock,
};

// ─── Unsaved Changes Dialog ───────────────────────────────────────────────────
interface UnsavedDialogProps {
    onSave: () => void;
    onDiscard: () => void;
    onCancel: () => void;
}

const UnsavedDialog: React.FC<UnsavedDialogProps> = ({ onSave, onDiscard, onCancel }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
        />
        {/* Card */}
        <div className={[
            "relative z-10 w-[420px] rounded-2xl border border-borders/60 bg-cards p-6 shadow-2xl shadow-black/40",
            "animate-in fade-in zoom-in-95 duration-200",
        ].join(" ")}>
            <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-warning/10">
                    <FiAlertTriangle size={20} className="text-warning" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-text-primary">Unsaved Changes</h3>
                    <p className="mt-1 text-sm text-text-muted leading-relaxed">
                        You have changes that haven't been saved yet. What would you like to do?
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-background/60 transition-colors duration-150"
                >
                    Stay
                </button>
                <button
                    type="button"
                    onClick={onDiscard}
                    className="px-4 py-2 rounded-lg text-sm text-error hover:bg-error/10 border border-error/30 transition-colors duration-150"
                >
                    Discard
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-accent hover:brightness-110 transition-all duration-150 shadow-lg shadow-accent/20"
                >
                    Save & Continue
                </button>
            </div>
        </div>
    </div>
);

// ─── Save Bar ─────────────────────────────────────────────────────────────────
interface SaveBarProps {
    isDirty: boolean;
    saving: boolean;
    saveError: string | null;
    onSave: () => void;
    onDiscard: () => void;
}

const SaveBar: React.FC<SaveBarProps> = ({ isDirty, saving, saveError, onSave, onDiscard }) => {
    if (!isDirty && !saveError) return null;

    return (
        <div className={[
            "flex items-center justify-between gap-4 rounded-xl px-4 py-3",
            "border border-borders/60 bg-cards/90 backdrop-blur",
            "shadow-lg shadow-black/20",
            "animate-in slide-in-from-bottom-2 fade-in duration-200",
            saveError ? "border-error/40 bg-error/5" : "",
        ].join(" ")}>
            <div className="flex items-center gap-2.5 min-w-0">
                {saveError ? (
                    <>
                        <FiAlertTriangle size={15} className="text-error flex-shrink-0" />
                        <span className="text-xs text-error truncate">{saveError}</span>
                    </>
                ) : (
                    <>
                        <div className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse flex-shrink-0" />
                        <span className="text-xs text-text-muted">You have unsaved changes</span>
                    </>
                )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    type="button"
                    onClick={onDiscard}
                    disabled={saving}
                    className="px-3 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-background/60 transition-colors duration-150 disabled:opacity-40"
                >
                    Discard
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    className={[
                        "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white",
                        "bg-accent hover:brightness-110 transition-all duration-150",
                        "shadow-md shadow-accent/25",
                        saving ? "opacity-70 cursor-wait" : "",
                    ].join(" ")}
                >
                    {saving ? (
                        <>
                            <div className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Saving…
                        </>
                    ) : (
                        <>
                            <FiSave size={12} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
interface SidebarItemProps {
    page: SettingsPageConfig;
    isActive: boolean;
    isDirty: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ page, isActive, isDirty, onClick }) => {
    const Icon = ICON_MAP[page.iconName];

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left",
                "transition-all duration-150 outline-none",
                isActive
                    ? "bg-accent/12 text-text-primary shadow-sm"
                    : "text-text-secondary hover:bg-background/60 hover:text-text-primary",
            ].join(" ")}
        >
            {/* Active indicator bar */}
            {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-accent" />
            )}

            {/* Icon */}
            <span className={[
                "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-150",
                isActive ? "bg-accent/15" : "bg-background/60 group-hover:bg-background",
            ].join(" ")}>
                {Icon && <Icon size={15} color={isActive ? page.iconColor : undefined} className={isActive ? "" : "text-text-muted"} />}
            </span>

            <span className="flex-1 truncate text-sm font-medium">{page.label}</span>

            {/* Dirty dot */}
            {isDirty && !isActive && (
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning" />
            )}
        </button>
    );
};

// ─── Main SettingsCard ────────────────────────────────────────────────────────
const SettingsCard: React.FC = () => {
    const { draft, loading, saving, saveError, isDirty, updateDraft, save, discard } = useSettings();

    const [activePageId, setActivePageId] = React.useState<string>(SETTINGS_CONFIG[0]?.id ?? "");
    const [pendingPageId, setPendingPageId] = React.useState<string | null>(null);

    const activePage = SETTINGS_CONFIG.find((p) => p.id === activePageId);

    // Navigation guard
    const requestNavigate = (pageId: string) => {
        if (pageId === activePageId) return;
        if (isDirty) {
            setPendingPageId(pageId);
        } else {
            setActivePageId(pageId);
        }
    };

    const handleDialogSave = async () => {
        await save();
        if (pendingPageId) { setActivePageId(pendingPageId); setPendingPageId(null); }
    };

    const handleDialogDiscard = () => {
        discard();
        if (pendingPageId) { setActivePageId(pendingPageId); setPendingPageId(null); }
    };

    const handleDialogCancel = () => setPendingPageId(null);

    return (
        <>
            {/* Unsaved changes dialog */}
            {pendingPageId && (
                <UnsavedDialog
                    onSave={handleDialogSave}
                    onDiscard={handleDialogDiscard}
                    onCancel={handleDialogCancel}
                />
            )}

            <div className="flex h-full w-full overflow-hidden rounded-2xl border border-borders/50 bg-cards shadow-xl shadow-black/20">

                {/* ── Sidebar ───────────────────────────────────────────────── */}
                <aside className="flex w-[220px] flex-shrink-0 flex-col border-r border-borders/40 bg-background/20">
                    {/* Sidebar header */}
                    <div className="flex items-center gap-2.5 px-4 py-4 border-b border-borders/30">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                            <LuSettings2 size={16} className="text-accent" />
                        </div>
                        <span className="text-sm font-semibold text-text-primary tracking-tight">Settings</span>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
                        {SETTINGS_CONFIG.map((page) => {
                            const pageKeys = page.sections.flatMap((s) => s.settings.map((x) => x.key));
                            const pageDirty = pageKeys.some(
                                (k) => JSON.stringify(draft[k]) !== JSON.stringify(draft[k])
                            );
                            return (
                                <SidebarItem
                                    key={page.id}
                                    page={page}
                                    isActive={activePageId === page.id}
                                    isDirty={isDirty && pageDirty}
                                    onClick={() => requestNavigate(page.id)}
                                />
                            );
                        })}
                    </nav>

                    {/* Sidebar footer hint */}
                    <div className="p-3 border-t border-borders/30">
                        <p className="text-[10px] text-text-muted/60 text-center leading-relaxed">
                            Changes are saved manually
                        </p>
                    </div>
                </aside>

                {/* ── Content ───────────────────────────────────────────────── */}
                <main className="flex flex-1 flex-col overflow-hidden">
                    {loading ? (
                        <div className="flex flex-1 items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-8 w-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                                <span className="text-xs text-text-muted">Loading settings…</span>
                            </div>
                        </div>
                    ) : activePage ? (
                        <>
                            {/* Content scroll area */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="px-8 py-7 max-w-2xl">
                                    {/* Page header */}
                                    <div className="mb-7">
                                        <div className="flex items-center gap-3 mb-1">
                                            {(() => {
                                                const Icon = ICON_MAP[activePage.iconName];
                                                return Icon ? (
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                                                        style={{ backgroundColor: `${activePage.iconColor}18` }}>
                                                        <Icon size={18} color={activePage.iconColor} />
                                                    </div>
                                                ) : null;
                                            })()}
                                            <div>
                                                <h2 className="text-lg font-semibold text-text-primary leading-tight">
                                                    {activePage.label}
                                                </h2>
                                                <p className="text-xs text-text-muted mt-0.5">
                                                    Configure your {activePage.label.toLowerCase()} preferences
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 h-px bg-gradient-to-r from-borders/60 via-borders/20 to-transparent" />
                                    </div>

                                    {/* Sections */}
                                    {activePage.sections.map((section) => (
                                        <SettingSection key={section.id} title={section.title}>
                                            {section.settings.map((cfg) => (
                                                <SettingRenderer
                                                    key={cfg.key}
                                                    config={cfg}
                                                    value={draft[cfg.key]}
                                                    onChange={updateDraft}
                                                />
                                            ))}
                                        </SettingSection>
                                    ))}
                                </div>
                            </div>

                            {/* Save bar — pinned to bottom of content area */}
                            <div className="px-8 py-3 border-t border-borders/30 bg-background/10">
                                <SaveBar
                                    isDirty={isDirty}
                                    saving={saving}
                                    saveError={saveError}
                                    onSave={save}
                                    onDiscard={discard}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-1 items-center justify-center">
                            <p className="text-sm text-text-muted">No page selected.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default SettingsCard;
