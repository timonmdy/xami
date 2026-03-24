interface SettingSectionProps {
    title: string;
    children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => (
    <div className="mb-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted/70 px-1">
            {title}
        </p>
        <div className="rounded-xl border border-borders/50 bg-background/30 divide-y divide-borders/40 px-4">
            {children}
        </div>
    </div>
);

export default SettingSection;
