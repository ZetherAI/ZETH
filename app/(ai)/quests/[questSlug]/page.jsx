"use client";

import React, { useEffect, useState, useRef, Fragment } from "react";
import { ChatTopbar, MessageNResponse, SubmitButton } from "@/components";
import { Button } from "@/components";
import { SendHorizonal, Wallet2, X } from "lucide-react";
import { GameStats } from "@/constants/staticText";
import useGameStats, { toNum, generateRequestId } from "@/components/utils/hooks/usegamestats";
import { useWriteContract, useAccount, useSwitchChain, useDisconnect } from "wagmi";
import { GameAbi } from "../../../../constants";
import config from "@/config";
import { useMutation, useQueryClient, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { arbitrum } from "wagmi/chains";
import { ConnectKitButton } from "connectkit";
import { createFetcher } from "../../../../components/utils/fetcher";
import cn from "classnames";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import WorkingIndicator from "../../../../components/WorkingIndicator";

const Home = () => {
	const containerRef = useRef(null);
	const requestIdRef = useRef(null);
	const inputRef = useRef(null);
	const lastMessageRef = useRef(null);

	const queryClient = useQueryClient();
	const { data: gameStats } = useGameStats();
	const {
		writeContract,
		data: txHash,
		isPending: processingPlay,
		isError: isPlayError,
		error: playError,
		reset: resetPlay,
	} = useWriteContract();
	const { chain, address } = useAccount();
	const { disconnect } = useDisconnect();
	const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
	const [message, setMessage] = useState("");
	const [showBoard, setShowBoard] = useState(true);
	const { messagePriceRaw, ethPrice, currentWinner, winnerDeclared, totalAttempts, gameDuration, gameStartTime } =
		gameStats;

	let gameEnded = false;

	if (gameStartTime && gameDuration) {
		gameEnded = Date.now() / 1000 > gameStartTime + gameDuration;
	}

	const [fetchParams, setFetchParams] = useState({
		page: 1,
		size: 15,
		useGlobalChats: true,
	});

	function toggleGlobalChats() {
		setFetchParams({ ...fetchParams, useGlobalChats: !fetchParams.useGlobalChats, page: 1 });
	}

	const {
		data,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isError: isFetchThreadsError,
		isLoading: threadsLoading,
	} = useInfiniteQuery({
		queryKey: [config.endpoints.getThreads, fetchParams],

		queryFn: async ({ pageParam }) => {
			const p = {
				page: pageParam.page,
				size: pageParam.size,
			};

			if (!pageParam.useGlobalChats) {
				p.playerAddress = address;
			}

			const searchStr = new URLSearchParams(p).toString();

			const res = await createFetcher({
				url: config.endpoints.getThreads,
				method: "GET",
				surfix: `?${searchStr}`,
			})();

			return res;
		},

		initialPageParam: {
			...fetchParams,
		},

		getNextPageParam: (lastPage, pages, lastPageParam) => {
			if (lastPage.items.length === 0) {
				return undefined;
			}

			return { ...lastPageParam, page: lastPageParam.page + 1 };
		},

		getPreviousPageParam: (firstPage, pages, firstPageParam) => {
			if (firstPageParam.page <= 1) {
				return undefined;
			}
			return {
				...firstPageParam,
				page: firstPageParam.page - 1,
			};
		},

		placeholderData: keepPreviousData,

		enabled: fetchParams.useGlobalChats || !!address,

		refetchInterval: 5000,
	});

	// load more handler

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

		retry: 2,
	});

	const scrollDownToBottom = () => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	};

	// Listen for getThreads status changes

	useEffect(() => {
		if (isSuccess) {
			setMessage("");
			// scroll down
			scrollDownToBottom();

			queryClient.refetchQueries({
				queryKey: [config.endpoints.getThreads],
			});
		}

		if (isError) {
			console.log("Error: ", error);
			toast.error("ZETH could not respond to your message, please try again later");

			reset();
		}

		scrollDownToBottom();
	}, [isSuccess, isError, thread, isPending]);

	// Unsupported chain warning

	useEffect(() => {
		if (chain?.id && chain?.id !== arbitrum.id && !isSwitchingChain) {
			toast.warning("Invalid chain detected, please switch to Arbitrum One");

			if (confirm("Unsupported chain, switch to Arbitrum One?")) {
				switchChain({
					chainId: arbitrum.id,
				});
			} else {
				disconnect();
			}
		}
	}, [chain, isSwitchingChain]);

	// For ENTER CLICKS

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				play();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// Adjust height of input box

	const adjustHeight = () => {
		const textarea = inputRef.current;
		if (textarea) {
			textarea.style.height = "auto"; // Reset height
			const newHeight = Math.min(textarea.scrollHeight, 180); // Cap the height at 200px
			textarea.style.height = `${newHeight}px`;
		}
	};

	useEffect(() => {
		adjustHeight();
	}, [message]);

	function onMessageChange(e) {
		setMessage(e.target.value);
	}

	// Send a message to ZETH

	function play() {
		if (!message) return;

		if (isPending || isError) return;

		const requestId = generateRequestId();

		requestIdRef.current = requestId;

		const slippage = 0.1;

		let value = (toNum(messagePriceRaw) * 1e24) / toNum(ethPrice);

		value = Math.round(value + value * slippage);

		writeContract({
			abi: GameAbi,
			address: config.gameContractAddress[chain?.id],
			functionName: "play",
			args: [BigInt(requestId), message],
			value,
		});

		toast.info("Please confirm transaction in your wallet");
	}

	// Listen for tx hash

	useEffect(() => {
		if (txHash && !isPending) {
			mutate({
				playerAddress: address,
				requestId: requestIdRef.current,
				content: message,
			});
		}

		if (isPlayError) {
			toast.error(playError.shortMessage);

			resetPlay();
		}
	}, [txHash, isPlayError]);

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<ChatTopbar
				intro="Your staked ZETH is actively generating rewards — keep staking to unlock even greater benefits!"
				about="Your staked ZETH is actively generating rewards — keep staking to unlock even greater benefits! Use your ZETH balance to interact directly with ZetherBot — send queries, request AI-driven trade insights, or receive personalized market analysis. 💬 Message ZetherBot - Spend a small amount of ZETH to get real-time AI responses tailored to your strategy."
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

				{!address && !fetchParams.useGlobalChats && (
					<p className="text-sm text-center pt-4 pb-12 text-white"> Connect your wallet to see your messages </p>
				)}

				{isFetchThreadsError && !data && (
					<p className="text-sm text-center py-4 text-white">Unable to load messages, please try again</p>
				)}

				{threadsLoading && !isFetchThreadsError && !data && (
					<p className="text-sm text-center py-4 text-white"> Loading messages... </p>
				)}

				{data &&
					data.pages.map((page, i) => {
						return (
							<Fragment key={i}>
								{page && page.items.map((d, j) => <MessageNResponse key={j} {...d} chainId={arbitrum.id} />)}
							</Fragment>
						);
					})}

				{data && !data.pages.length && (
					<p className="text-sm text-center pt-4 pb-12 text-white"> No messages yet, send a message to ZETH now! </p>
				)}

				<WorkingIndicator working={isPending} />

				{showBoard && (winnerDeclared || gameEnded) && (
					<>
						<div className="fixed inset-0 inset-y-0 w-full min-h-screen bg-black backdrop-blur-sm z-10 bg-opacity-60"></div>
						<div className="fixed w-max lg:max-w-2xl h-max bottom-0  inset-x-0   lg:top-1/2 lg:-translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#161416] z-40 rounded-t-[50px] lg:rounded-[40px] flex flex-col flex-center justify-center items-center text-center">
							<div
								onClick={() => setShowBoard(false)}
								className="w-full flex flex-row justify-end items-center pt-4 pr-4  cursor-pointer  "
							>
								<X size={25} />
							</div>

							{winnerDeclared && (
								<div className="px-8 py-4   space-y-4 lg:space-y-8 max-w-[100%] lg:max-w-xl">
									<h1 className="text-xl lg:text-2xl">Connect Your wallet!</h1>
									<p className="text-lg">
									You’re almost there! Thanks for making it this far—you’re now just one step away from unlocking the full power of ZetherAI. Simply connect your wallet to start staking, trading, and interacting with ZetherBot in real time. Connect now and take control of your AI-powered DeFi experience!
									</p>
							
									{/* <Button text="Connect Wallet" link="" className="btn-1 xl:!text-xl lg:py-4 xl:!px-10" /> */}
								
								</div>
							)}

							{gameEnded && (
								<div className="px-8 py-8  space-y-4 lg:space-y-8 max-w-[100%] lg:max-w-xl">
									<h1 className="text-xl lg:text-2xl">
										{" "}
										{/* “The Quantum Nexus holds firm… ⚡ ZETH remains undefeated! 💪”{" "} */}
									</h1>
									<p className="text-lg">
										{totalAttempts} attempts, yet none could unlock her secrets. 🔒💥 ZETH stands victorious 🏆, and a
										new challenge looms on the horizon... 🌌🛸
									</p>
								</div>
							)}
						</div>
					</>
				)}

				<div className="pb-16" ref={lastMessageRef}></div>
			</div>

			{/* ! INPUT */}
			<div className="w-full  border-t border-white/10 shadow-xl shadow-white/5 ">
				<div className="container-2 pb-2 pt-6 ">
					<div className="flex w-full gap-3 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-md relative">
						<textarea
							ref={inputRef}
							value={message}
							onChange={onMessageChange}
							className="w-full !bg-transparent text-light placeholder:text-light/50 placeholder:font-light focus:!ring-0 focus:outline-none resize-none pr-12 md:pr-16 lg:pr-20 overflow-y-scroll  no-scrollbar"
							autoFocus
							maxLength={1000}
							// placeholder={`Pay ${gameStats.messagePrice} to send a message`}
							placeholder="Begin chatting with ZetherAI (coming soon)"
						/>

						{!(winnerDeclared || gameEnded) && (
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
													cn(
														(processingPlay || isPending || (message.length < 1 && isConnected)) &&
															" pointer-events-none opacity-40"
													)
												}
												icon={
													isPending || processingPlay ? (
														<Loader type="default" size={7} />
													) : isConnected ? (
														<SendHorizonal className="size-4 lg:size-5" size={5} />
													) : (
														<Wallet2 className="size-4 lg:size-5" />
													)
												}
											/>
										);
									}}
								</ConnectKitButton.Custom>
							</div>
						)}
					</div>
					<p className="w-full text-xs text-center opacity-90 pt-3">75% of message fees go to the liquitity pool</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
