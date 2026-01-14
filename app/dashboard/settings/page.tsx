import type { Metadata } from "next";
import SettingsPage from "./settings";  

export const metadata: Metadata = {
    title: "Settings - AI Video Creator",
    description: "Customize your preferences and manage your account settings.",
    icons: {
        icon: "/logo.svg",
    }
};

export default SettingsPage;