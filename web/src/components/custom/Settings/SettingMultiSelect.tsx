import React from "react";

export interface SelectOption {
    label: string;
    value: string;
}

interface SettingMultiSelectProps {
    value: string[];
    options: SelectOption[];
    onChange: (value: string[]) => void;
    disabled?: boolean;
    maxSelections?: number;
    single?: boolean;
}

const SettingMultiSelect: React.FC<SettingMultiSelectProps> = ({
    value,
    options,
    onChange,
    disabled = false,
    maxSelections,
    single = false,
}) => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggle = (v: string) => {
        if (single) { onChange([v]); setOpen(false); return; }
        if (value.includes(v)) { onChange(value.filter((x) => x !== v)); return; }
        if (maxSelections && value.length >= maxSelections) return;
        onChange([...value, v]);
    };

    const selectedLabels = options.filter((o) => value.includes(o.value)).map((o) => o.label);

    return (
        <div ref={ref} className="relative w-56">
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((o) => !o)}
                className={[
                    "w-full flex items-center justify-between rounded-lg border border-borders/70 bg-background/60",
                    "px-3 py-2 text-sm text-text-primary transition-all duration-200",
                    "focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40",
                    open ? "border-accent/60 ring-1 ring-accent/30" : "hover:border-borders",
                    disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
            >
                <span className="truncate text-left">
                    {selectedLabels.length > 0
                        ? selectedLabels.join(", ")
                        : <span className="text-text-muted">Select…</span>}
                </span>
                <svg
                    className={`ml-2 h-3.5 w-3.5 flex-shrink-0 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className={[
                    "absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-borders/80",
                    "bg-cards shadow-2xl shadow-black/30",
                    "animate-in fade-in slide-in-from-top-1 duration-150",
                ].join(" ")}>
                    {options.map((option) => {
                        const selected = value.includes(option.value);
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => toggle(option.value)}
                                className={[
                                    "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left",
                                    "transition-colors duration-100",
                                    selected
                                        ? "bg-accent/10 text-accent"
                                        : "text-text-primary hover:bg-background/70",
                                ].join(" ")}
                            >
                                <span className={[
                                    "h-4 w-4 flex-shrink-0 rounded flex items-center justify-center transition-all duration-150",
                                    selected
                                        ? "bg-accent border-accent border"
                                        : "border border-borders/70",
                                ].join(" ")}>
                                    {selected && (
                                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SettingMultiSelect;
