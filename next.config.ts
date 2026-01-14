import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "images.clerk.dev",
            },
        ],
    },
    webpack: (config) => {
        // Ignore TypeScript declaration files
        config.module.rules.push({
            test: /\.d\.ts$/,
            loader: "ignore-loader",
        });

        // Ignore markdown files (Remotion + esbuild có README.md)
        config.module.rules.push({
            test: /\.md$/,
            loader: "ignore-loader",
        });

        return config;
    },
};

export default nextConfig;
