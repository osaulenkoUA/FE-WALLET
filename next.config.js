const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		outputFileTracing: false,
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://wallet-be.duckdns.org/:path*",
			},
		];
	},
};

module.exports = withPWA(nextConfig);
