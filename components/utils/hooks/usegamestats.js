import { useBlockNumber } from "wagmi";
import { createPublicClient, http } from "viem";
import config from "../../../config";
import { GameAbi } from "../../../constants";
import { arbitrum } from "wagmi/chains";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const publicClient = createPublicClient({
	chain: arbitrum,
	transport: http(`https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
});

export default function useGameStats() {
	const { data: blockNumber } = useBlockNumber({ watch: true });

	const gameContract = {
		address: config.gameContractAddress[arbitrum.id],
		abi: GameAbi,
		chainId: arbitrum.id,
	};

	const {
		data: gameStats,
		isPending,
		isError,
		isSuccess,
		isFetching,

		refetch,
	} = useQuery({
		queryKey: ["gameStats"],
		queryFn: async () => {
			const [prizePool, gameConfig, totalPlayers, totalAttempts, ethPrice] = await Promise.all([
				publicClient.readContract({ ...gameContract, functionName: "prizePool" }),
				publicClient.readContract({ ...gameContract, functionName: "gameConfig" }),
				publicClient.readContract({ ...gameContract, functionName: "totalPlayers" }),
				publicClient.readContract({ ...gameContract, functionName: "totalAttempts" }),
				publicClient.readContract({ ...gameContract, functionName: "ethPrice" }),
			]);

			return {
				prizePool,
				gameConfig,
				totalPlayers,
				totalAttempts,
				ethPrice,
			};
		},

		enabled: !!blockNumber,

		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (blockNumber && toNum(blockNumber) % 45 === 0 && !isFetching && !isPending) {
			refetch();
			console.log("Refreshing now");
		}
	}, [blockNumber]);

	// console.log("Stats: ", gameStats, "Error: ", error);

	// Format the fetched data
	const formattedStats = useMemo(() => {
		if (!gameStats) return {};

		return {
			totalParticipants: toNum(gameStats.totalPlayers || 0),
			totalAttempts: toNum(gameStats.totalAttempts || 0),
			prizePool: `$ ${toBaseUnit(toNum(gameStats.prizePool || 0))}`,
			messagePrice: `$ ${toBaseUnit(toNum(gameStats.gameConfig?.[0] || 0))}`,
			ethPrice: toNum(gameStats.ethPrice || 0),
			gameDuration: toNum(gameStats.gameConfig?.[3] || 0),
			gameStartTime: toNum(gameStats.gameConfig?.[4] || 0),
		};
	}, [gameStats]);

	return {
		isPending,
		isError,
		isSuccess,
		data: formattedStats,
	};
}

// -------------------------------------------

export function generateRequestId() {
	return Math.floor(Math.random() * 1e16).toString();
}

export function toNum(v) {
	try {
		return Number(BigInt(v));
	} catch (err) {
		// console.error(err);
		return 0;
	}
}

export function toBaseUnit(v) {
	return +(+v / 100).toFixed(2);
}
