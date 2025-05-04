import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../../lib/modals/Modal";
import { RegisterRequest } from "../../../types/Auth.types";
import { register } from "../../../service/Auth.service";
import { FetchError } from "../../../core/FetchWrapper";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSwitch: () => void;
}

export const RegisterModal = ({ isOpen, onClose, onSwitch }: Props) => {
    const { t: lang } = useTranslation();
    const [form, setForm] = useState<RegisterRequest>({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await register(form);
            onClose();
        } catch (error) {
            if (!(error instanceof FetchError)) return setError(lang("error.unexpected"));

            switch (error.status) {
                case 409:
                    setError(lang("error.user_already_registered"));
                    break;
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} backgroundOpacity={70}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">{lang("auth.register.title")}</h2>

                {error && <p className="text-error text-sm">{error}</p>}

                <div>
                    <label className="block text-text-secondary">{lang("auth.username")}</label>
                    <input
                        name="username"
                        type="text"
                        required
                        value={form.username}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 bg-background border border-borders rounded-md text-text-primary"
                    />
                </div>

                <div>
                    <label className="block text-text-secondary">{lang("auth.password")}</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 bg-background border border-borders rounded-md text-text-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-accent text-white py-2 rounded-md hover:opacity-90 transition"
                >
                    {lang("auth.register")}
                </button>
            </form>
            <p className="text-sm mt-4 text-text-muted">
                {lang("auth.already_have_account")}{" "}
                <button onClick={onSwitch} className="text-accent hover:underline">{lang("auth.login.login_here")}</button>
            </p>
        </Modal>
    );
};
