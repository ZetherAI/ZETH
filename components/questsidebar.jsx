"use client";

import { ChatSidebar } from "../components";
import { GameStats } from "../constants/staticText";

export default function QuestSidebar() {
	return (
		<ChatSidebar
			about="Your staked ZETH is actively generating rewards—keep staking to unlock even greater benefits!"
			stats={GameStats}
		/>
	);
}
