const NoSearchResult = ({ query }: { query: string }) => {
    return (
        <div className="w-full flex justify-center mt-16">
            <div
                className="
                    flex flex-col items-center text-center
                    bg-white/5 dark:bg-black/10
                    px-8 py-10
                    rounded-3xl
                    backdrop-blur-xl border border-white/20
                    shadow-[0_8px_32px_rgb(0,0,0,0.06)]
                    animate-fadein
                "
            >
                {/* Icon */}
                <div className="text-6xl mb-4 animate-bounce">😴</div>

                {/* Title */}
                <h3
                    className="
                        text-xl font-bold 
                        bg-clip-text text-transparent 
                        bg-linear-to-r from-primary to-secondary
                    "
                >
                    No videos found
                </h3>

                {/* Subtitle */}
                <p className="text-sm mt-2 opacity-75 max-w-xs">
                    We couldn’t find any results for:
                    <br />
                    <span className="font-semibold opacity-100">“{query}”</span>
                </p>

                {/* Suggestion */}
                <p className="text-xs mt-3 opacity-60">
                    Try different keywords or refine your search.
                </p>
            </div>
        </div>
    );
};

export default NoSearchResult;