"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileVideo, PanelsTopLeft, Settings } from "lucide-react";

import { usePageLoading } from "@/app/_context/loading-context";

const Sidebar = () => {
    const pathname = usePathname();
    const { setShow, show } = usePageLoading();

    const menuItems = [
        { id: 1, name: "Dashboard", path: "/dashboard", icon: PanelsTopLeft },
        {
            id: 2,
            name: "Create New",
            path: "/dashboard/create-new",
            icon: FileVideo,
        },
        {
            id: 3,
            name: "Settings",
            path: "/dashboard/settings",
            icon: Settings,
        },
    ];

    return (
        <aside
            className="
                w-64 h-screen 
                bg-base-100/70
                backdrop-blur-xl 
                border-r border-base-300/40
                shadow-[4px_0_30px_rgba(0,0,0,0.05)]
                flex flex-col
                fixed left-0 top-0
            "
        >
            <nav className="flex-1 p-4">
                <ul className="space-y-1.5">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.path}
                                    onClick={() => {
                                        if (!show && pathname !== item.path) {
                                            setShow(true);
                                        }
                                    }}
                                    className={`
                                        relative flex items-center gap-3 px-3 py-2.5 rounded-r-full
                                        text-sm font-medium transition-all 
                                        group
                                        ${
                                            isActive
                                                ? "bg-primary/20 text-primary shadow-inner"
                                                : "hover:bg-base-200/60"
                                        }
                                    `}
                                >
                                    {/* Active Indicator Line */}
                                    {isActive && (
                                        <span
                                            className="
                                                absolute left-0 top-0 h-full w-1 
                                                bg-primary 
                                                shadow-[0_0_10px_var(--tw-shadow-color)]
                                                shadow-primary/60
                                            "
                                        />
                                    )}

                                    <Icon
                                        className={`
                                            h-5 w-5 transition-all duration-200
                                            ${
                                                isActive
                                                    ? "text-primary"
                                                    : "text-base-content/70 group-hover:text-base-content"
                                            }
                                        `}
                                    />

                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <footer
                className="
                    border-t border-base-300/40 
                    p-4 
                    text-xs text-base-content/50 
                    backdrop-blur-xl
                "
            >
                © {new Date().getFullYear()} AI PicMotion Lab
            </footer>
        </aside>
    );
};

export default Sidebar;
