"use client";

import { http, createConfig, WagmiProvider } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const wagmiConfig = createConfig(
	getDefaultConfig({
		chains: [arbitrum],
		transports: {
			[arbitrum.id]: http(),
		},

		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

		appName: "Lyra",

		appDescription:
			"Lyra is the cosmic guardian, overseeing a growing prize pool and testing the ingenuity and wits of humanity.",
		appUrl: "https://www.lyraverse.xyz",
		appIcon: "https://www.lyraverse.xyz/favicon.ico",

		syncConnectedChain: true,
	})
);

const queryClient = new QueryClient();

export default function W3Provider({ children }) {
	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider>{children}</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
