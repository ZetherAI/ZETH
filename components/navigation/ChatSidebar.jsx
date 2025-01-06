"use client";

import React, { useEffect } from "react";
// import { motion } from "framer-motion";
import { MotionDiv } from "@/constants/motionProps";

import { List, Handshake } from "lucide-react";
import { DotGrid, Button, Motion, Logo } from "@/components";
import { variants } from "@/constants";
import { ConnectKitButton } from "connectkit";
import cn from "classnames";
import { useAccount, useDisconnect } from "wagmi";
import Skeleton from "react-loading-skeleton";
import useGameStats, { toNum } from "../utils/hooks/usegamestats";
import useCountDown from "../utils/hooks/usecountdown";

function truncateWalletAddress(addr, startLength = 6, endLength = 4) {
	if (!addr || addr.length <= startLength + endLength) {
		return addr;
	}
	return `${addr.slice(0, startLength)}...${addr.slice(-endLength)}`;
}

const ChatSidebar = ({ about, stats, examplePrompts }) => {
	const { isConnected, address, chain } = useAccount();
	const { disconnect } = useDisconnect();

	const { isPending, isSuccess, data } = useGameStats();

	const { remainingTime, setFutureTimestamp } = useCountDown(Date.now());

	useEffect(() => {
		if (toNum(data.gameStartTime) * 1000 > Date.now()) {
			setFutureTimestamp(toNum(data.gameStartTime) * 1000);
		} else {
			setFutureTimestamp((toNum(data.gameStartTime) + toNum(data.gameDuration)) * 1000);
		}
	}, [data]);

	return (
		<div className="relative h-full bg-dark overflow-x-clip overflow-y-auto">
			<div
				className={`
            w-full md:w-[30vw] md:min-w-[300px] min-h-screen md:max-w-[380px] px-4 md:px-5 flex flex-col gap-5 py-5 overflow-hidden relative
        `}
			>
				<DotGrid w={40} h={100} id={0} />
				<div className="hide-md relative">
					<Logo showName />
				</div>

				<MotionDiv
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ staggerChildren: 0.1 }}
					className={`sidebar-card ` + cn(false && "  min-h-[150px] flex flex-col justify-center items-center ")}
				>
					<>
						<div className="space-y-[6px]">
							{isConnected && <p className="uppercase text-xs md:text-sm">Account</p>}

							<div className="space-y-2">
								{isConnected && (
									<>
										<h2 className="stats-value">{truncateWalletAddress(address)}</h2>

										<p className="text-xs font-bold"> {chain?.name} </p>
									</>
								)}

								<ConnectKitButton.Custom>
									{({ isConnecting, show, isConnected }) => {
										return (
											<Button
												text={isConnecting ? "Connecting.." : isConnected ? "Disconnect" : "Connect Wallet"}
												className={
													"bg-white/15 hover:bg-white/20 px-4 py-2 rounded-xl   " +
													cn(isConnecting && " pointer-events-none opacity-40 ")
												}
												onClick={isConnected ? disconnect : show}
											/>
										);
									}}
								</ConnectKitButton.Custom>
							</div>
						</div>
						{stats.map(({ label, name }, i) => (
							<MotionDiv variants={variants.slideInBottom} key={i} className="space-y-[6px]">
								<p className="uppercase text-xs md:text-sm">{label}</p>

								{(isPending || !isSuccess) && <Skeleton width={100} height={20} />}

								{isSuccess && <h2 className="stats-value break-words">{data[name]}</h2>}
							</MotionDiv>
						))}

						<div className="space-y-[6px]">
							<p className="uppercase text-xs md:text-sm">
								{toNum(data.gameStartTime) * 1000 > Date.now() ? "Game Starts In" : "Game Ends In"}
							</p>

							<div className="space-y-2">
								<h2 className="stats-value text-gradient">
									{remainingTime.hoursStr}:{remainingTime.minutesStr}:{remainingTime.secondsStr}
								</h2>
							</div>
						</div>
					</>
				</MotionDiv>

				{about && (
					<MotionDiv
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ staggerChildren: 0.1 }}
						className={`sidebar-card`}
					>
						<MotionDiv variants={variants.slideInBottom}>
							<h2 className="uppercase">About:</h2>
						</MotionDiv>
						<MotionDiv variants={variants.slideInBottom}>
							<p className="">{about}</p>
						</MotionDiv>
						<div className="flex-v-center">
							<Motion>
								<Button text="Lore" link="/faq" className="btn-3 !px-3" icon={<List className="size-4" />} />
							</Motion>
							<Motion>
								<Button text="Rules" link="/terms" className="btn-4 !px-3" icon={<Handshake className="size-4" />} />
							</Motion>
						</div>
					</MotionDiv>
				)}

				{examplePrompts && (
					<div className="flex flex-col gap-3">
						{examplePrompts.map((prompt, i) => (
							<MotionDiv
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ staggerChildren: 0.1 }}
								className={``}
								key={i}
								custom={i}
							>
								<Button text={prompt} link="/" className={`sidebar-card !bg-none !py-3`} />
							</MotionDiv>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatSidebar;
