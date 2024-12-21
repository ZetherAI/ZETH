import { http, createConfig } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

const wagmiConfig = createConfig(
	getDefaultConfig({
		chains: [arbitrum, arbitrumSepolia, bscTestnet],
		transports: {
			[arbitrum.id]: http(),
			[arbitrumSepolia.id]: http(),
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
		[arbitrumSepolia.id]: "0x1Ace536d3575454f169c39e6209308dDA80D8FD8",
	},
};

export default config;
