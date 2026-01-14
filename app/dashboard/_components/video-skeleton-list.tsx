const shimmer =
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

const VideoSkeletonList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-8">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className={`
                        ${shimmer}
                        rounded-3xl
                        h-full
                        overflow-hidden
                        bg-white/5 dark:bg-black/10
                        backdrop-blur-xl
                        border border-white/20 dark:border-white/10
                        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                    `}
                >
                    <div className="w-full aspect-3/4 bg-white/10 dark:bg-white/5" />
                </div>
            ))}
        </div>
    );
};

export default VideoSkeletonList;
