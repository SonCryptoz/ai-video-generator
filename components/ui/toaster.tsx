"use client";

import { useToastStore } from "@/app/store/use-toast-store";
import { useEffect, useState } from "react";
import {
    CheckCircle,
    AlertTriangle,
    Info,
    XCircle,
    Loader2,
} from "lucide-react";

const ICONS = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    loading: <Loader2 className="w-5 h-5 animate-spin" />,
};

const STYLES = {
    success:
        "border-success bg-success/15 text-success backdrop-blur-xl shadow-lg",
    error: "border-error bg-error/15 text-error backdrop-blur-xl shadow-lg",
    warning:
        "border-warning bg-warning/15 text-warning backdrop-blur-xl shadow-lg",
    info: "border-info bg-info/15 text-info backdrop-blur-xl shadow-lg",
    loading:
        "border-base-300 bg-base-100/80 text-base-content backdrop-blur-xl shadow-lg",
};

export default function Toaster() {
    const { toast, hide } = useToastStore();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (toast) {
            queueMicrotask(() => setVisible(true));

            const t1 = setTimeout(() => setVisible(false), 2000);
            const t2 = setTimeout(() => hide(), 2500);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
            };
        }
    }, [toast, hide]);

    return (
        <div className="fixed top-20 right-6 z-999 pointer-events-none">
            {toast && (
                <div
                    className={`
                        pointer-events-auto flex items-center gap-3 px-5 py-4 
                        rounded-xl border
                        transform transition-all duration-300
                        ${
                            visible
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 -translate-y-3 scale-95"
                        }
                        ${STYLES[toast.type]}
                    `}
                >
                    <div className="shrink-0">{ICONS[toast.type]}</div>
                    <span className="font-medium text-sm">{toast.message}</span>
                </div>
            )}
        </div>
    );
}
