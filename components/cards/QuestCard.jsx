"use client";

import { useEffect } from "react";
import Image from "next/image";

import { List, Handshake } from "lucide-react";

import { featuredQuest } from "@/constants/staticText";
import { images } from "@/constants";
import { Motion, Button, DotGrid } from "@/components";
import useGameStats from "../utils/hooks/usegamestats";
import useCountdownTimer from "../utils/hooks/usecountdown";
import { TermsData } from "@/constants/staticText";

const QuestCard = () => {
	const { data, isSuccess } = useGameStats();

	const botLaunch = Date.now() * 1.0003

	const { remainingTime, setFutureTimestamp } = useCountdownTimer(Date.now());

	useEffect(() => {
		// if (data.gameStartTime * 1000 > Date.now()) {
			setFutureTimestamp(botLaunch * 1);
		// } else {
		// 	setFutureTimestamp((data.gameStartTime + data.gameDuration) * 1000);
		// }
	}, [data]);

	return (
		<Motion tag="div" className="card grid md:grid-cols-7 gap-8 md:items-center relative overflow-hidden">
			<div className="absolute top-0 left-0 w-full md:w-[45%] h-[35%] md:h-full overflow-hidden">
				<DotGrid w={100} h={20} id={1} />
			</div>

			<Motion className="w-full h-full md:col-span-3 relative rounded-xl overflow-hidden">
				<Image src={featuredQuest.image} width={750} height={300} className="object-cover w-full h-full" alt="Quest" />
				<div className="flex-center absolute top-0 left-0 w-full h-full bg-black/40">
					<Image
						src={images.comingSoon}
						width={300}
						height={300}
						className="object-contain w-full h-full p-[15%] lg:p-[15%] opacity-60"
						alt="Quest"
					/>
					{/* <Motion className="uppercase text-gray-300 text-center !leading-[120%] font-bold text-3xl lg:text-4xl py-4 lg:py-5 border-y border-gray-500 w-[80%]">
            Coming
            <br />
            Soon
          </Motion> */}
				</div>
			</Motion>
			<div className="md:col-span-4 relative">
				<Motion tag="h1" className="featured-title">
					{featuredQuest.title}
				</Motion>
				<div className="flex-v-center my-3 lg:mt-5 mb-4">
					<Motion>
						<Button text="Lore" link="/faq" className="btn-3" icon={<List className="size-4" />} />
					</Motion>
					<Motion>
						<Button text="Rules" link="/terms" className="btn-4" icon={<Handshake className="size-4" />} />
					</Motion>
				</div>
				{isSuccess && data && (
					<div className="flex flex-row justify-start items-center space-x-4">
						<p className="uppercase font-medium text-xs md:text-sm">
							{botLaunch * 1000 > Date.now() ? "Full Subscription Available In:" : "Available In:"}
						</p>

						<div className="space-y-2">
							<h2 className="font-bold text-lg text-gradient">
								{remainingTime.hoursStr}:{remainingTime.minutesStr}:{remainingTime.secondsStr}
							</h2>
						</div>
					</div>
				)}
				<div className="flex flex-col gap-3 lg:gap-4 py-7 ">
				<Motion tag="p"><b>{featuredQuest.desc}</b></Motion>
				<Motion tag="p"><b>Flexible Subscription Plan</b> - Choose from multiple tiers based on your trading needs, with options for monthly, quarterly, or annual access.</Motion>
				<Motion tag="p"><b>Exclusive AI Insights</b> - Subscribers receive premium analytics, predictive market signals, and early access to new AI-driven trading strategies.</Motion>
				<Motion tag="p"><b>Staking Benefits</b> - Holders of ZETH tokens may receive discounts or additional perks when subscribing to ZetherBot's premium features.</Motion>
				<Motion tag="p"><b>Seamless Wallet Integration</b> - Connect your wallet effortlessly and manage your subscription directly within the ZetherAI ecosystem.</Motion>
				<Motion tag="p"><b>Transparent & Secure Payments</b> - Pay with ZETH tokens or supported cryptocurrencies, with no hidden fees or surprise charges.</Motion>
				<Motion className="flex mt-5">
					<Button text="Start Trial" link="/quests/the-cosmic-price-pool" className="btn-1 !bg-brand-4/50" />
				</Motion>
				</div>
			</div>
		</Motion>
	);
};

export default QuestCard;
