"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import config from "@/config";
import { images } from "@/constants";
import { createFetcher } from "../utils/fetcher";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MessageNResponse = ({ uid, requestId, won, responded, score, playerAddress }) => {
	const {
		data: messages,
		isPending: loadingMsg,
		isError: cannotLoadMsgs,
	} = useQuery({
		queryKey: [config.endpoints.getThreadMessages, playerAddress],

		queryFn: createFetcher({
			url: config.endpoints.getThreadMessages,
			method: "GET",
			surfix: `/${uid}/messages`,
		}),

		refetchInterval: 5000,
	});

	return (
		<div className="flex flex-col gap-3">
			{messages &&
				messages.map((msg, i) => {
					return (
						<>
							{!msg.isSystem && (
								<div key={i} className="flex gap-3 w-full justify-end">
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
								<div key={i + 100} className="flex gap-2 md:gap-3 w-full justify-start">
									<Image
										src={images.lyra}
										alt="user"
										className="size-[35px] lg:size-[40px] rounded-full object-cover"
									/>
									<div className="ai-message flex flex-col items-end gap-1">
										<p className="w-full">{msg.content}</p>
										<p className="xs !text-light/50">{dayjs(msg.createdAt * 1000).fromNow()}</p>
									</div>
									{/* <div className="size-[35px] rounded-full bg-gradient-to-br from-brand-1/50 to-brand-4/50 backdrop-blur-xl" /> */}
								</div>
							)}
						</>
					);
				})}

			{/* <p className="ai-message !leading-[1.7em]">{ai_response}</p> */}
		</div>
	);
};

export default MessageNResponse;
