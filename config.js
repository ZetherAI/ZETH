import { http, createConfig } from "wagmi";
import { arbitrum, bscTestnet, arbitrumSepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

const wagmiConfig = createConfig(
	getDefaultConfig({
		chains: [arbitrum, arbitrumSepolia, bscTestnet],
		transports: {
			// [arbitrum.id]: http(),
			[bscTestnet.id]: http(),
		},

		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

		appName: "Lyra",

		appDescription:
			"Lyra is the cosmic guardian, overseeing a growing prize pool and testing the ingenuity and wits of humanity.",
		appUrl: "https://www.lyraverse.xyz",
		appIcon: "https://www.lyraverse.xyz/favicon.ico",
	})
);

const config = {
	wagmiConfig,

	gameContractAddress: {
		[arbitrum.id]: "0x5B3b4eC5c0b8fC0A1eE2F3d3f7d6E3C3A0f7a7e6",
		[bscTestnet.id]: "0xB4fF660ebd25a15E2b9cF3557d9D0288298B9A74",
	},
};

export default config;
