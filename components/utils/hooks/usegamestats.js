import { useAccount, useReadContracts } from "wagmi";
import config from "../../../config";
import { GameAbi } from "../../../constants";
import { arbitrum } from "wagmi/chains";

function getValueForName(name, data) {
	if (!data) return 0;

	if (name === "totalParticipants") {
		return data[2]?.result || 0;
	}

	if (name === "totalAttempts") {
		return data[3]?.result || 0;
	}

	if (name === "playerAttempts") {
		return data[4]?.result || 0;
	}

	if (name === "prizePool") {
		return data[0]?.result || 0;
	}

	if (name === "messagePrice") {
		return data[1]?.result[0] || 0;
	}

	if (name === "duration") {
		return data[1]?.result[3] || 0;
	}

	if (name === "startTime") {
		return data[1]?.result[4] || 0;
	}

	if (name === "ethPrice") {
		return data[5]?.result || 0;
	}

	return data[0]?.result || 0;
}

export function generateRequestId() {
	return Math.floor(Math.random() * 1e16).toString();
}

export function toNum(v) {
	try {
		return Number(BigInt(v));
	} catch (err) {
		console.error(err);
		return 0;
	}
}

export function toBaseUnit(v) {
	return +(+v / 100).toFixed(2);
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
				functionName: "prizePool",
			},

			{
				...gameContract,
				functionName: "gameConfig",
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
				functionName: "playerAttemptCount",
				args: [address],
			},

			{
				...gameContract,
				functionName: "ethPrice",
			},
		],

		query: {
			refetchInterval: 5000,

			enabled: isConnected && chain?.id === arbitrum.id,
		},
	});

	// console.log(data);

	return {
		isPending,
		isSuccess,
		data: {
			totalParticipants: getValueForName("totalParticipants", data),

			totalAttempts: getValueForName("totalAttempts", data),

			prizePool: "$ " + toBaseUnit(toNum(getValueForName("prizePool", data))),

			messagePrice: "$ " + toBaseUnit(toNum(getValueForName("messagePrice", data))),

			playerAttempts: getValueForName("playerAttempts", data),

			messagePriceRaw: (data && data[1]?.result[0]) || 0,

			ethPrice: getValueForName("ethPrice", data),

			gameDuration: getValueForName("duration", data),

			gameStartTime: getValueForName("startTime", data),
		},
	};
}
