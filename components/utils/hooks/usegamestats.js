import { useAccount, useReadContracts } from "wagmi";
import config from "../../../config";
import { GameAbi } from "../../../constants";
import { formatEther } from "viem";

function getValueForName(name, data) {
	if (!data) return null;

	if (name === "totalParticipants") {
		return data[2].result;
	}

	if (name === "totalAttempts") {
		return data[3].result;
	}

	if (name === "prizePool") {
		return formatEther(data[0].result) + " ETH";
	}

	if (name === "messagePrice") {
		return formatEther(data[1].result[0]) + " ETH";
	}

	return data[0].result;
}

export default function useGameStats() {
	const { isConnected, address, chain } = useAccount();

	const gameContract = {
		address: config.gameContractAddress[chain?.id],
		abi: GameAbi,
	};

	const { data, isPending, isSuccess } = useReadContracts({
		// allowFailure: false,
		contracts: [
			{
				...gameContract,
				functionName: "pool",
			},

			{
				...gameContract,
				functionName: "gameSettings",
			},

			{
				...gameContract,
				functionName: "totalPlayers",
			},

			{
				...gameContract,
				functionName: "totalAttempts",
			},
			{
				...gameContract,
				functionName: "playerQueryCount",
				args: [address],
			},
		],

		query: {
			refetchInterval: 5000,

			enabled: isConnected,
		},
	});

	return {
		isPending,
		isSuccess,
		data: {
			totalParticipants: getValueForName("totalParticipants", data),

			totalAttempts: getValueForName("totalAttempts", data),

			prizePool: getValueForName("prizePool", data),

			messagePrice: getValueForName("messagePrice", data),
		},
	};
}
