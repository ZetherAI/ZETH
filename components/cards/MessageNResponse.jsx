"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import config from "@/config";
import { images } from "@/constants";
import { createFetcher } from "../utils/fetcher";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "react-loading-skeleton";
import { useReadContract } from "wagmi";
import { GameAbi } from "../../constants";
import { toBaseUnit, toNum } from "@/components/utils/hooks/usegamestats";

dayjs.extend(relativeTime);

const MessageNResponse = ({ uid, requestId, won, responded, score, playerAddress, chainId }) => {
	const gameContract = {
		address: config.gameContractAddress[chainId],
		abi: GameAbi,
	};

	const {
		data: messages,
		isPending: loadingMsg,
		isError: cannotLoadMsgs,
	} = useQuery({
		queryKey: [config.endpoints.getThreadMessages, uid, playerAddress],

		queryFn: createFetcher({
			url: config.endpoints.getThreadMessages,
			method: "GET",
			surfix: `/${uid}/messages`,
		}),
	});

	const { data } = useReadContract({
		...gameContract,
		functionName: "playerAttempts",
		args: [playerAddress, requestId],

		query: {
			enabled: !!(requestId && playerAddress),
			refetchInterval: 10000,
		},
	});

	let isValid = false;

	if (data && toNum(data[2]) > 0) {
		isValid = true;
	}

	if (!isValid) return null;

	return (
		<div className="container  border-b py-4 border-white/10">
			<div className="flex flex-col gap-3 relative">
				{data && (
					<p className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black z-20 text-xs font-medium rounded-lg text-white px-2 py-1">
						{toBaseUnit(toNum(data[2])) > 0 ? `$${toBaseUnit(toNum(data[2]))}` : "awaiting payment..."}

						{won && " | Winner 🏆"}
					</p>
				)}

				{!messages && (
					<div className="flex gap-2 md:gap-3 w-full justify-end">
						<div className="ai-message flex flex-col items-end gap-1">
							<Skeleton height={40} width={200} borderRadius={10} />
						</div>
						{/* <div className="size-[35px] rounded-full bg-gradient-to-br from-brand-1/50 to-brand-4/50 backdrop-blur-xl" /> */}
					</div>
				)}
				{messages &&
					messages.map((msg, i) => {
						return (
							<div key={i}>
								{!msg.isSystem && (
									<div className="flex gap-3 w-full justify-end">
										<div className="user-message flex flex-col items-end gap-1">
											<p className="w-full text-black">{msg.content}</p>
											<p className="xs !text-dark/50">{dayjs(msg.createdAt * 1000).fromNow()}</p>
										</div>
										{/* <div className="size-[35px] rounded-full bg-gradient-to-br from-brand-1/50 to-brand-4/50 backdrop-blur-xl" /> */}
										{/* <Image
          src={images.pfp}
          alt="user"
          className="size-[35px] rounded-full object-cover"
          /> */}
									</div>
								)}

								{msg.isSystem && (
									<div className="flex gap-2 md:gap-3 w-full justify-start">
										<Image
											src={images.lyra}
											alt="user"
											className="size-[35px] lg:size-[40px] rounded-full object-cover"
										/>
										<div className="ai-message flex flex-col items-end gap-1">
											<p className="w-full">{msg.content}</p>
											{/* <p className="xs !text-light/50">{dayjs(toNum(data[3]) * 1000).fromNow()}</p> */}
										</div>
										{/* <div className="size-[35px] rounded-full bg-gradient-to-br from-brand-1/50 to-brand-4/50 backdrop-blur-xl" /> */}
									</div>
								)}
							</div>
						);
					})}

				{/* <p className="ai-message !leading-[1.7em]">{ai_response}</p> */}
			</div>
		</div>
	);
};

export default MessageNResponse;
