interface SettingRowProps {
    label: string;
    description?: string;
    children: React.ReactNode;
}

const SettingRow: React.FC<SettingRowProps> = ({ label, description, children }) => (
    <div className="flex items-center justify-between gap-6 py-4">
        <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-medium text-text-primary leading-snug">{label}</span>
            {description && (
                <span className="text-xs text-text-muted leading-relaxed">{description}</span>
            )}
        </div>
        <div className="flex-shrink-0">{children}</div>
    </div>
);

export default SettingRow;
