import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	turbopack: (config) => {
		config.resolve.fallback = { fs: false, net: false, tls: false };
		return config;
	},
};

export default nextConfig;
