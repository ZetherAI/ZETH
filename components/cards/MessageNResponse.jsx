"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import config from "@/config";
import { images } from "@/constants";
import { createFetcher } from "../utils/fetcher";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

import Skeleton from "react-loading-skeleton";
import { useReadContract } from "wagmi";
import { GameAbi } from "../../constants";
import { toBaseUnit, toNum } from "@/components/utils/hooks/usegamestats";
import cn from "classnames";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const MessageNResponse = ({ uid, requestId, won, playerAddress, chainId }) => {
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
		<div className="container  border-b py-4 border-white/5">
			<div className="flex flex-col gap-x-2 gap-y-8 relative pb-4">
				{data && (
					<p className="absolute shadow-lg -top-6   lg:-top-8 left-1/2 -translate-x-1/2 bg-black z-20 text-xs  rounded-lg text-white px-2 py-1">
						{toBaseUnit(toNum(data[2])) > 0 ? `$${toBaseUnit(toNum(data[2]))}` : ""}
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
							<div key={i} className=" ">
								{!msg.isSystem && (
									<div className="flex flex-col w-full justify-end space-y-2">
										<div
											className={
												"user-message flex flex-col items-end gap-y-1  " +
												cn({
													" rounded-[16px] ": msg.content.length < 30, // Really Short messages

													" rounded-[70px] ": msg.content.length >= 30 && msg.content.length < 50, // Short messages
													" rounded-[50px] ": msg.content.length >= 50 && msg.content.length < 100, // Medium messages
													" rounded-[15px] ": msg.content.length >= 100, // Long messages
												})
											}
										>
											<p className="w-full  text-black  ">{msg.content}</p>
										</div>
										<p className="xs self-end text-white/20">{dayjs(msg.createdAt * 1000).format("LT")}</p>

										{won && (
											<div className="pt-2 w-max  self-end">
												<p className=" text-white  text-xs  py-2 px-4 rounded-2xl bg-[#A67C00] ">🏆 Winner</p>
											</div>
										)}
									</div>
								)}

								{msg.isSystem && (
									<div className="flex gap-2 md:gap-3 w-full justify-start">
										<Image
											src={images.lyra}
											alt="user"
											className="size-[35px] lg:size-[40px] rounded-full object-cover"
										/>
										<div
											className={
												"ai-message flex flex-col items-end gap-y-1 " +
												cn({
													" rounded-[16px] ": msg.content.length < 30, // Really Short messages

													" rounded-[70px] ": msg.content.length >= 30 && msg.content.length < 50, // Short messages
													" rounded-[50px] ": msg.content.length >= 50 && msg.content.length < 100, // Medium messages
													" rounded-[15px] ": msg.content.length >= 100, // Long messages
												})
											}
										>
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
