"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, Motion } from "@/components";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/navigation";
import cn from "classnames";
import { useAccount, useSwitchChain, useDisconnect } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { toast } from "sonner";

function Home() {
	const router = useRouter();

	const { chain } = useAccount();
	const { disconnect } = useDisconnect();
	const { switchChain, isPending: isSwitchingChain } = useSwitchChain();

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

	return (
		<div className="fixed bottom-0 left-0 w-full p-5 md:p-7">
			<div className="h-full w-full flex-center !justify-end flex-col text-center !gap-4 md:max-w-[500px] xl:max-w-[600px] mx-auto">
				<Motion tag="h1" custom={0} className="display uppercase">
					ZetherAI (ZETH)
				</Motion>
				<Motion tag="p" custom={0} className="ca">
					Smart Contract CA: <i>coming soon</i>
				</Motion>
				<Motion tag="p" custom={1} className="">
				ZetherAI is the fusion of artificial intelligence and decentralized finance (DeFi), creating an autonomous ecosystem where AI optimizes trading, staking, and yield generation.
				</Motion>
				<div className="flex-center lg:py-2 !gap-2 md:!gap-3">
					<Motion custom={2} className="">
						<Button text="Start Trial" link="/quests" className="btn-1 xl:!text-xl lg:py-4 xl:!px-10" />
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
										
										/*onClick={handleClick}*/
									/>
								);
							}}
						</ConnectKitButton.Custom>
					</Motion>
				</div>
				<div className="flex-center">
					{/* <span>© ZETH</span> */}
					<Link href="https://x.com/ZetherAI">
						<FaTwitter className="size-7 lg:size-8" />
					</Link>
					<Link href="">
						<FaGithub className="size-7 lg:size-8" />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
