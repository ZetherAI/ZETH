"use client";

import React from "react";
import Link from "next/link";
import { Button, Motion } from "@/components";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/navigation";
import cn from "classnames";

import { FaGithub, FaTwitter } from "react-icons/fa";

function Home() {
	const router = useRouter();

	return (
		<div className="fixed bottom-0 left-0 w-full p-5 md:p-7">
			<div className="h-full w-full flex-center !justify-end flex-col text-center !gap-4 md:max-w-[500px] xl:max-w-[600px] mx-auto">
				<Motion tag="h1" custom={0} className="display uppercase">
					Lyra’s Sentinel
				</Motion>
				<Motion tag="p" custom={1} className="">
					Lyra is the cosmic guardian, overseeing a growing prize pool and testing the ingenuity and wits of humanity.
					Prove your worth. Unlock the prize.
				</Motion>
				<div className="flex-center lg:py-2 !gap-2 md:!gap-3">
					<Motion custom={2} className="">
						<Button text="EXPLORE QUESTS" link="/quests" className="btn-1 xl:!text-xl lg:py-4 xl:!px-10" />
					</Motion>
					<Motion custom={3} className="">
						<ConnectKitButton.Custom>
							{({ isConnected, isConnecting, show }) => {
								const handleClick = () => {
									if (!isConnected && show) {
										show();
										return;
									}

									if (isConnected) {
										router.push("/quests/the-cosmic-price-pool");
									}
								};

								return (
									<Button
										text={isConnected ? "JOIN QUEST 🔥" : isConnecting ? "CONNECTING.." : "CONNECT WALLET"}
										className={
											"btn-2 xl:!text-xl lg:py-4 xl:!px-10 " + cn(isConnecting && " pointer-events-none opacity-40 ")
										}
										onClick={handleClick}
									/>
								);
							}}
						</ConnectKitButton.Custom>
					</Motion>
				</div>
				<div className="flex-center">
					{/* <span>© Lyra</span> */}
					<Link href="https://x.com/lyraverseai?s=21">
						<FaTwitter className="size-7 lg:size-8" />
					</Link>
					<Link href="https://github.com/Oxlyra">
						<FaGithub className="size-7 lg:size-8" />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
