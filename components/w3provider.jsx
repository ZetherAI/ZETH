"use client";

import { http, createConfig, WagmiProvider, fallback } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const wagmiConfig = createConfig(
	getDefaultConfig({
		chains: [arbitrum],
		transports: {
			[arbitrum.id]: fallback([http(`https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`)]),
		},

		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

		appName: "ZETH",

		appDescription:
			"AI-Powered DeFi Protocol - ZetherAI integrates AI-driven yield farming, auto-compounding, and automated trading signals. ZetherBot is a decentralized AI trading assistant that executes optimized trades for holders.",
		appUrl: "https://www.zetherai.xyz",
		appIcon: "@/public/images/zeth_logo.jpg",

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
