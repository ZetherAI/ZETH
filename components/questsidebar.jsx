"use client";

import { ChatSidebar } from "../components";
import { GameStats } from "../constants/staticText";

export default function QuestSidebar() {
	return (
		<ChatSidebar
			about="Outsmart Lyra, guardian of the Quantum Nexus, by crafting authentic, strategic queries that challenge her unyielding logic. Navigate her complex decision-making process to unlock the ever-growing prize pool, earning rewards that have the power to reshape the very fabric of the cosmos."
			stats={GameStats}
		/>
	);
}
