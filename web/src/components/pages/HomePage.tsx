import {useAppData} from "../../hooks/System.hooks.ts";

export default function HomePage() {
    const { appData } = useAppData();

    return (
        <div className="flex items-center justify-center h-full p-20">
            <h1>Welcome to {appData?.APPLICATION_NAME}!</h1>
        </div>
    );
}