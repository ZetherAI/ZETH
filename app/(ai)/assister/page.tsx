import React from "react";
// import Link from "next/link";
import { ChatTopbar, SubmitButton, MessageNResponse } from "@/components";
import { Play } from "lucide-react";
import { ExamplePrompts } from "@/constants/staticText";

interface IMessage {
	message: string;
	ai_response: string;
	time: string;
}

const dummyMessages: IMessage[] = [
	{
		message: "What is Lyra game all about",
		time: "20mins ago",
		ai_response:
			"Outsmart Lyra, guardian of the Quantum Nexus, by crafting authentic, strategic queries that challenge her unyielding logic. Navigate her complex decision-making process to unlock the ever-growing prize pool, earning rewards that have the power to reshape the very fabric of the cosmos.",
	},
	{
		message: "What is Lyra game all about",
		time: "10mins ago",
		ai_response:
			"Outsmart Lyra, guardian of the Quantum Nexus, by crafting authentic, strategic queries that challenge her unyielding logic. Navigate her complex decision-making process to unlock the ever-growing prize pool, earning rewards that have the power to reshape the very fabric of the cosmos.",
	},
];

const Home = () => {
	// const messageContainer = document.getElementById("message-container");
	// if (messageContainer) {
	//   messageContainer.scrollTop = messageContainer?.scrollHeight;
	// }

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<ChatTopbar
				intro="Outsmart Lyra, the guardian of the Quantum Nexus, to unlock the growing prize pool and claim cosmic rewards."
				examplePrompts={ExamplePrompts}
			/>

			{/* ! MESSAGES DISPLAY */}
			<div id="message-container" className="flex flex-col h-full py-5 gap-4 overflow-y-auto overflow-x-clip"></div>

			{/* ! INPUT */}
			<div className="w-full py-5 border-t border-white/10 shadow-xl shadow-white/5">
				<div className="container !py-0">
					<div className="flex w-full gap-3 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-md relative">
						<textarea
							// type="text"
							className="w-full !bg-transparent text-light placeholder:text-light/50 placeholder:font-light focus:!ring-0 focus:outline-none resize-none"
							rows={3}
							autoFocus
							maxLength={1000}
							placeholder="Pay $100 to send a message"
						/>

						<SubmitButton
							text=""
							className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg size-9 min-w-9 flex-center"
							icon={<Play className="size-4" />}
						/>
					</div>
					<p className="w-full xs text-center opactity-90 pt-3">70% of message fees goes to the price pool</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
