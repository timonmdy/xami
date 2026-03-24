interface SettingStringProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    type?: "text" | "email" | "url" | "password";
}

const SettingString: React.FC<SettingStringProps> = ({
    value,
    onChange,
    placeholder = "",
    disabled = false,
    maxLength,
    type = "text",
}) => {
    const [local, setLocal] = React.useState(value);

    React.useEffect(() => { setLocal(value); }, [value]);

    const commit = () => { if (local !== value) onChange(local); };

    return (
        <div className="relative group">
            <input
                type={type}
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={[
                    "w-64 rounded-lg border bg-background/60 px-3 py-2 text-sm text-text-primary",
                    "border-borders/70 placeholder:text-text-muted",
                    "focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40",
                    "transition-all duration-200 hover:border-borders",
                    disabled ? "opacity-40 cursor-not-allowed" : "",
                ].join(" ")}
            />
            {maxLength && (
                <span className="absolute right-2 bottom-2 text-[10px] text-text-muted opacity-0 group-focus-within:opacity-100 transition-opacity">
                    {local.length}/{maxLength}
                </span>
            )}
        </div>
    );
};

export default SettingString;
