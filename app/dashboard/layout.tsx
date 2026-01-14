"use client";

import { useEffect, useState } from "react";
import { VideoData, VideoDataContext } from "../_context/video-data-context";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";
import {
    UserDetails,
    UserDetailsContext,
} from "../_context/user-details-context";

import { PageLoadingProvider } from "@/app/_context/loading-context";
import DashboardPageLoader from "@/components/ui/dashboard-page-loader";

import { useUser } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [videoData, setVideoData] = useState<VideoData>({});
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const { user } = useUser();

    useEffect(() => {
        if (!user) return;

        const loadUserDetails = async () => {
            const res = await fetch("/api/get-user-details", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user?.primaryEmailAddress?.emailAddress,
                }),
            });

            const data = await res.json();
            if (data?.user) {
                setUserDetails(data.user);
            }
        };

        loadUserDetails();
    }, [user]);

    return (
        <PageLoadingProvider>
            <UserDetailsContext.Provider
                value={{ userDetails, setUserDetails }}
            >
                <VideoDataContext.Provider value={{ videoData, setVideoData }}>
                    <DashboardPageLoader />
                    <div className="flex min-h-screen bg-base-100">
                        {/* Sidebar (fixed width) */}
                        <aside className="hidden md:flex w-64 border-r shrink-0">
                            <Sidebar />
                        </aside>

                        {/* RIGHT SECTION */}
                        <div className="flex flex-col flex-1">
                            {/* Header (sticky at top of page) */}
                            <Header />

                            {/* Page Content (scrolls normally) */}
                            <main className="flex-1 overflow-y-auto px-4 pb-10">
                                {children}
                            </main>
                        </div>
                    </div>
                </VideoDataContext.Provider>
            </UserDetailsContext.Provider>
        </PageLoadingProvider>
    );
};

export default DashboardLayout;
