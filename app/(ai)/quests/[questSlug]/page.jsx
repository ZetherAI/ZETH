"use client";

import React, { useEffect, useState } from "react";
import { ChatTopbar, MessageNResponse, SubmitButton } from "@/components";
import { SendHorizonal, Wallet2 } from "lucide-react";
import { GameStats } from "@/constants/staticText";
import useGameStats, { toNum } from "@/components/utils/hooks/usegamestats";
import { useWriteContract, useAccount, useSwitchChain } from "wagmi";
import { GameAbi } from "../../../../constants";
import config from "@/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { arbitrum } from "wagmi/chains";
import { ConnectKitButton } from "connectkit";
import { createFetcher } from "../../../../components/utils/fetcher";
import cn from "classnames";
import WorkingIndicator from "../../../../components/WorkingIndicator";
import { toast } from "sonner";

const Home = () => {
	const queryClient = useQueryClient();
	const { data } = useGameStats();
	const { writeContract } = useWriteContract();
	const { chain, address } = useAccount();
	const { switchChain } = useSwitchChain();
	const [message, setMessage] = useState("");
	const { messagePriceRaw, playerAttempts, ethPrice } = data;

	const {
		data: threads,
		isPending: loadingThreads,
		isError: cannotLoadThreads,
	} = useQuery({
		queryKey: [config.endpoints.getThreads, address],

		queryFn: createFetcher({
			url: config.endpoints.getThreads,
			method: "GET",
			surfix: `/${address}`,
		}),

		enabled: !!address,

		refetchInterval: 30000,
	});

	const {
		mutate,
		isPending,
		isError,
		error,
		isSuccess,
		data: thread,
	} = useMutation({
		mutationKey: [config.endpoints.createThread, address],
		mutationFn: createFetcher({
			url: config.endpoints.createThread,
			method: "POST",
		}),
	});

	useEffect(() => {
		const messageContainer = document.getElementById("message-container");
		if (messageContainer) {
			messageContainer.scrollTop = messageContainer?.scrollHeight;
		}
	}, [threads]);

	useEffect(() => {
		if (isSuccess && thread) {
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

			const value = Math.round((toNum(messagePriceRaw) * 1e24) / toNum(ethPrice));

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
		}
	}, [isSuccess, isError, thread]);

	function onMessageChange(e) {
		setMessage(e.target.value);
	}

	function play() {
		if (!message) return;

		if (isPending) return;

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
			/>

			{/* ! MESSAGES DISPLAY */}
			<div id="message-container" className="flex flex-col h-full py-5 gap-4 overflow-y-auto overflow-x-clip">
				{!threads && <p className="text-sm text-center py-4 text-white"> Loading previous attempts... </p>}

				{threads &&
					threads.items.map((t, i) => (
						<div key={i} className="container  border-b py-4 border-white/10">
							<MessageNResponse key={i} {...t} />
						</div>
					))}

				<WorkingIndicator />
			</div>

			{/* ! INPUT */}
			<div className="w-full py-5 border-t border-white/10 shadow-xl shadow-white/5">
				<div className="container !py-0">
					<div className="flex w-full gap-3 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-md relative">
						<textarea
							value={message}
							onChange={onMessageChange}
							className="w-full !bg-transparent text-light placeholder:text-light/50 placeholder:font-light focus:!ring-0 focus:outline-none resize-none pr-12 md:pr-16 lg:pr-20"
							rows={3}
							autoFocus
							maxLength={1000}
							placeholder={`Pay ${data.messagePrice} to send a message`}
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
												isConnected ? (
													<SendHorizonal className="size-4 lg:size-6" />
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
					<p className="w-full xs text-center opactity-90 pt-3">70% of message fees goes to the price pool</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
