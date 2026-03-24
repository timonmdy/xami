interface SettingBooleanProps {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}

const SettingBoolean: React.FC<SettingBooleanProps> = ({ value, onChange, disabled = false }) => (
    <button
        type="button"
        role="switch"
        aria-checked={value}
        disabled={disabled}
        onClick={() => onChange(!value)}
        className={[
            "relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cards",
            value ? "bg-accent shadow-[0_0_12px_2px_var(--color-accent)] opacity-100" : "bg-borders/80",
            disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-105",
        ].join(" ")}
    >
        <span
            className={[
                "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
                value ? "translate-x-6" : "translate-x-1",
            ].join(" ")}
        />
    </button>
);

export default SettingBoolean;
