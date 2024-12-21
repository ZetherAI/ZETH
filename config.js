import { arbitrum, arbitrumSepolia } from "wagmi/chains";

const config = {
	gameContractAddress: {
		[arbitrum.id]: "0x5B3b4eC5c0b8fC0A1eE2F3d3f7d6E3C3A0f7a7e6",
		[arbitrumSepolia.id]: "0x1Ace536d3575454f169c39e6209308dDA80D8FD8",
	},
};

export default config;
