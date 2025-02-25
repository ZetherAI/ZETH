"use client";

import { ChatSidebar } from "../components";
import { GameStats } from "../constants/staticText";

export default function QuestSidebar() {
	return (
		<ChatSidebar
			about="Your staked ZETH is actively generating rewards — keep staking to unlock even greater benefits! Use your ZETH balance to interact directly with ZetherBot — send queries, request AI-driven trade insights, or receive personalized market analysis. 💬 Message ZetherBot - Spend a small amount of ZETH to get real-time AI responses tailored to your strategy."
			stats={GameStats}
		/>
	);
}
