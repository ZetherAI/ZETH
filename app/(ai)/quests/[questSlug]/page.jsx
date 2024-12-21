"use client";

import React, { useEffect, useState } from "react";
import { ChatTopbar, SubmitButton } from "@/components";
import { Play } from "lucide-react";
import { GameStats } from "@/constants/staticText";
import useGameStats from "@/components/utils/hooks/usegamestats";
import { useWriteContract, useAccount, useSwitchChain } from "wagmi";
import { GameAbi } from "../../../../constants";
import config from "@/config";

const Home = () => {
	// const messageContainer = document.getElementById("message-container");
	// if (messageContainer) {
	//   messageContainer.scrollTop = messageContainer?.scrollHeight;
	// }

	const { data } = useGameStats();
	const { writeContract } = useWriteContract();
	const { chain } = useAccount();
	const { switchChain, chains } = useSwitchChain();
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!chains.map((c) => c.id).includes(chain.id)) {
			switchChain({
				chainId: chains[0].id,
			});
		}
	}, []);

	function onMessageChange(e) {
		setMessage(e.target.value);
	}

	function play() {
		if (!message) return;

		writeContract({
			abi: GameAbi,
			address: config.gameContractAddress[chain?.id],
			functionName: "play",
			args: [message, 11],
		});

		setMessage("");
	}

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<ChatTopbar
				intro="Outsmart Lyra, the guardian of the Quantum Nexus, to unlock the growing prize pool and claim cosmic rewards."
				about="Outsmart Lyra, guardian of the Quantum Nexus, by crafting authentic, strategic queries that challenge her unyielding logic. Navigate her complex decision-making process to unlock the ever-growing prize pool, earning rewards that have the power to reshape the very fabric of the cosmos."
				stats={GameStats}
			/>

			{/* ! MESSAGES DISPLAY */}
			{/* <div id="message-container" className="flex flex-col h-full py-5 gap-4 overflow-y-auto overflow-x-clip">
				{dummyMessages.map(({ message, ai_response, time }: IMessage, i: number) => (
					<div key={i} className="container !py-0">
						<MessageNResponse key={i} message={message} ai_response={ai_response} time={time} />
					</div>
				))}
			</div> */}

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
							<SubmitButton
								onClick={play}
								text=""
								className="rounded-full  bg-white/10 hover:bg-white/20 backdrop-blur-lg p-2 lg:p-3 flex-center"
								icon={<Play className="size-4 lg:size-6" />}
							/>
						</div>
					</div>
					<p className="w-full xs text-center opactity-90 pt-3">70% of message fees goes to the price pool</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
