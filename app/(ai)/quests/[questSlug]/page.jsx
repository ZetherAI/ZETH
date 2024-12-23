"use client";

import React, { useEffect, useState, useRef, Fragment } from "react";
import { ChatTopbar, MessageNResponse, SubmitButton } from "@/components";
import { SendHorizonal, Wallet2 } from "lucide-react";
import { GameStats } from "@/constants/staticText";
import useGameStats, { toNum } from "@/components/utils/hooks/usegamestats";
import { useWriteContract, useAccount, useSwitchChain } from "wagmi";
import { GameAbi } from "../../../../constants";
import config from "@/config";
import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { arbitrum } from "wagmi/chains";
import { ConnectKitButton } from "connectkit";
import { createFetcher } from "../../../../components/utils/fetcher";
import cn from "classnames";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const Home = () => {
	const containerRef = useRef(null);
	const lastMessageRef = useRef(null);

	const queryClient = useQueryClient();
	const { data: gameStats } = useGameStats();
	const { writeContract } = useWriteContract();
	const { chain, address } = useAccount();
	const { switchChain } = useSwitchChain();
	const [message, setMessage] = useState("");
	const { messagePriceRaw, ethPrice } = gameStats;

	const [fetchParams, setFetchParams] = useState({
		cursor: 0,
		limit: 1,
		useGlobalChats: true,
	});

	function toggleGlobalChats() {
		setFetchParams({ ...fetchParams, useGlobalChats: !fetchParams.useGlobalChats, cursor: 0 });
	}

	const {
		data,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,

		status,
		error: fetchThreadsError,
	} = useInfiniteQuery({
		queryKey: [config.endpoints.getThreads, fetchParams],

		queryFn: async ({ pageParam }) => {
			const searchStr = new URLSearchParams(pageParam).toString();

			const res = await createFetcher({
				url: config.endpoints.getThreads,
				method: "GET",
				surfix: `/${address}?${searchStr}`,
			})();

			return res;
		},

		initialPageParam: {
			...fetchParams,
		},

		getNextPageParam: (lastPage, pages) => ({
			...fetchParams,
			cursor: lastPage?.nextCursor || fetchParams.cursor,
		}),

		enabled: !!address,

		// refetchInterval: 10000,
	});

	const {
		mutate,
		isPending,
		isError,
		error,
		isSuccess,
		reset,
		data: thread,
	} = useMutation({
		mutationKey: [config.endpoints.createThread, address],
		mutationFn: createFetcher({
			url: config.endpoints.createThread,
			method: "POST",
		}),
	});

	useEffect(() => {
		const handleScroll = () => {
			if (containerRef.current && containerRef.current.scrollTop === 0) {
				if (hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			}
		};

		const container = containerRef.current;

		if (container) {
			container.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener("scroll", handleScroll);
			}
		};
	}, [hasNextPage, isFetchingNextPage]);

	const scrollDownToBottom = () => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	};

	useEffect(() => {
		if (isSuccess && thread) {
			// scroll down
			scrollDownToBottom();

			if (chain?.id !== arbitrum.id) {
				toast.warning("Invalid chain detected, please switch to Arbitrum One");

				switchChain({
					chainId: arbitrum.id,
				});

				return;
			}

			queryClient.refetchQueries({
				queryKey: [config.endpoints.getThreads],
			});

			let value = (toNum(messagePriceRaw) * 1e24) / toNum(ethPrice);

			value = Math.round(value + value * 0.1);

			toast.info("Please confirm transaction in your wallet");

			// console.log(value, thread.requestId);

			writeContract({
				abi: GameAbi,
				address: config.gameContractAddress[chain?.id],
				functionName: "play",
				args: [thread.requestId, message],
				value,
			});

			setMessage("");
		}

		if (isError) {
			console.log("Error: ", error);
			toast.error("Unable to process your request, try again");

			reset();
		}
	}, [isSuccess, isError, thread]);

	function onMessageChange(e) {
		setMessage(e.target.value);
	}

	function play() {
		if (!message) return;

		if (isPending || isError) return;

		mutate({
			playerAddress: address,
			content: message,
		});
	}

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<ChatTopbar
				intro="Outsmart Lyra, the guardian of the Quantum Nexus, to unlock the growing prize pool and claim cosmic rewards."
				about="Outsmart Lyra, guardian of the Quantum Nexus, by crafting authentic, strategic queries that challenge her unyielding logic. Navigate her complex decision-making process to unlock the ever-growing prize pool, earning rewards that have the power to reshape the very fabric of the cosmos."
				stats={GameStats}
				globalChatsEnabled={fetchParams.useGlobalChats}
				toggleGlobalChats={toggleGlobalChats}
			/>

			{/* ! MESSAGES DISPLAY */}
			<div
				ref={containerRef}
				id="message-container"
				className="flex flex-col h-full py-5 gap-4 overflow-y-scroll overflow-x-clip"
			>
				{isFetchingNextPage && <p className="text-sm text-center pt-4 pb-12 text-white"> Loading more... </p>}

				{status === "pending" ? (
					<p className="text-sm text-center py-4 text-white"> Loading messages... </p>
				) : status === "error" ? (
					<p className="text-sm text-center py-4 text-white">
						{" "}
						Unable to load messages, please try again {console.log(fetchThreadsError)}{" "}
					</p>
				) : null}

				{status === "success" &&
					data.pages.map((page, i) => {
						return (
							<Fragment key={i}>
								{page && page.items.map((d, j) => <MessageNResponse key={j} {...d} chainId={arbitrum.id} />)}
							</Fragment>
						);
					})}

				<div className="pb-16" ref={lastMessageRef}></div>
			</div>

			{/* ! INPUT */}
			<div className="w-full py-5 border-t border-white/10 shadow-xl shadow-white/5">
				<div className="container !py-0">
					<div className="flex w-full gap-3 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-md relative">
						<textarea
							value={message}
							onChange={onMessageChange}
							className="w-full !bg-transparent text-light placeholder:text-light/50 placeholder:font-light focus:!ring-0 focus:outline-none resize-none pr-12 md:pr-16 lg:pr-20 overflow-y-hidden"
							rows={3}
							autoFocus
							maxLength={1000}
							placeholder={`Pay ${gameStats.messagePrice} to send a message`}
						/>

						<div className="absolute right-4 top-1/2 -translate-y-1/2">
							<ConnectKitButton.Custom>
								{({ isConnected, show }) => {
									const handleClick = () => {
										if (!isConnected && show) {
											show();
											return;
										}

										if (isConnected) {
											play();
										}
									};

									return (
										<SubmitButton
											onClick={handleClick}
											text=""
											className={
												" rounded-full  bg-white/10 hover:bg-white/20 backdrop-blur-lg p-2 lg:p-3 flex-center " +
												cn(isPending && " pointer-events-none opacity-40")
											}
											icon={
												isPending ? (
													<Loader type="default" size={7} />
												) : isConnected ? (
													<SendHorizonal className="size-4 lg:size-6" size={5} />
												) : (
													<Wallet2 className="size-4 lg:size-6" />
												)
											}
										/>
									);
								}}
							</ConnectKitButton.Custom>
						</div>
					</div>
					<p className="w-full xs text-center opactity-90 pt-3">75% of message fees go to the prize pool</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
