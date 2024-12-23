import { arbitrum } from "wagmi/chains";

const config = {
	gameContractAddress: {
		[arbitrum.id]: "0xeE744c05A8BFe7599e833D8dE546A07A9892b9de",
	},

	apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api",

	endpoints: {
		createThread: "/threads/messages",
		getThreads: "/threads/player",
		getThreadMessages: "/threads",
	},
};

export default config;
