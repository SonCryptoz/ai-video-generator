import type { Metadata } from "next";
import DashboardPage from "./dashboard";

export const metadata: Metadata = {
    title: "Dashboard - AI Video Creator",
    description: "Manage your AI-powered short videos with ease.",
    icons: {
        icon: "/logo.svg",
    }
};

export default DashboardPage;