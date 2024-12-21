import { arbitrum, arbitrumSepolia } from "wagmi/chains";

const config = {
	gameContractAddress: {
		[arbitrum.id]: "0xE2CDd97dFDE2E274F71A04693F264B01D3fD12bd",
		[arbitrumSepolia.id]: "0x1Ace536d3575454f169c39e6209308dDA80D8FD8",
	},
};

export default config;
