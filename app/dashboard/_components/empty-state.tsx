import { FileVideo } from "lucide-react";
import Link from "next/link";

const EmptyState = () => {
    return (
        <div
            className="
            mt-16 mx-auto w-full
            flex flex-col items-center text-center
            p-10 rounded-3xl
            bg-white/5 dark:bg-black/10
            backdrop-blur-xl
            border border-white/20
            shadow-[0_8px_32px_rgb(0,0,0,0.07)]
        "
        >
            {/* Glass Icon Wrapper */}
            <div
                className="
                w-20 h-20 rounded-2xl
                flex items-center justify-center
                bg-white/10 dark:bg-black/20
                backdrop-blur-2xl
                border border-white/20
                shadow-inner
                mb-5
            "
            >
                <FileVideo className="w-10 h-10 text-base-content/60" />
            </div>

            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                No Videos Yet
            </h2>

            <p className="opacity-70 text-sm mb-6 leading-relaxed">
                Create your first AI-powered short video and it’ll appear here
                automatically.
            </p>

            <Link
                href="/dashboard/create-new"
                className="
                    btn btn-primary px-6 rounded-full
                    shadow-md shadow-primary/20
                    hover:shadow-lg hover:shadow-primary/30
                    transition-all active:scale-95
                "
            >
                Create New Short Video
            </Link>
        </div>
    );
};

export default EmptyState;
