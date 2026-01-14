"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./page-loader";
import { usePageLoading } from "@/app/_context/loading-context";

export default function DashboardPageLoader() {
    const pathname = usePathname();
    const { show, setShow } = usePageLoading();

    useEffect(() => {
        const t = setTimeout(() => {
            setShow(false);
        }, 300);

        return () => clearTimeout(t);
    }, [pathname, setShow]);

    return <PageLoader show={show} />;
}
