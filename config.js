import { arbitrum, arbitrumSepolia } from "wagmi/chains";

const config = {
	gameContractAddress: {
		[arbitrum.id]: "0xD5650Dc4d24265cec6C517C9BdB5E0F93de8F6f9",
		[arbitrumSepolia.id]: "0x1Ace536d3575454f169c39e6209308dDA80D8FD8",
	},
};

export default config;
