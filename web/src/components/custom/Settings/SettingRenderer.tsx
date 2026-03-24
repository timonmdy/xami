import { SettingConfig } from "../../../config/Settings.config";
import { UserSettingKey } from "../../../types/User.types";
import SettingBoolean from "./SettingBoolean";
import SettingMultiSelect from "./SettingMultiSelect";
import SettingRow from "./SettingRow";
import SettingString from "./SettingString";

interface SettingRendererProps {
    config: SettingConfig;
    value: any;
    onChange: (key: UserSettingKey, value: any) => void;
}

const SettingRenderer: React.FC<SettingRendererProps> = ({ config, value, onChange }) => {
    const handle = (v: any) => onChange(config.key, v);

    const control = (() => {
        if (config.type === "boolean") {
            return <SettingBoolean value={value ?? config.defaultValue} onChange={handle} />;
        }
        if (config.type === "string") {
            return (
                <SettingString
                    value={value ?? config.defaultValue}
                    onChange={handle}
                    placeholder={config.placeholder}
                    maxLength={config.maxLength}
                    type={config.inputType}
                />
            );
        }
        if (config.type === "multiselect") {
            return (
                <SettingMultiSelect
                    value={value ?? config.defaultValue}
                    options={config.options}
                    onChange={handle}
                    maxSelections={config.maxSelections}
                    single={config.single}
                />
            );
        }
        return null;
    })();

    return (
        <SettingRow label={config.label} description={config.description}>
            {control}
        </SettingRow>
    );
};

export default SettingRenderer;