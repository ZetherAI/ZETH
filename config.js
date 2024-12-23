import { arbitrum } from "wagmi/chains";

const config = {
	gameContractAddress: {
		[arbitrum.id]: "0xf9c9e334FC97Ff455A869b0D6715F48382d4d8Ba",
	},

	apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api",

	endpoints: {
		createThread: "/threads/messages",
		getThreads: "/threads/player",
		getThreadMessages: "/threads",
	},
};

export default config;
