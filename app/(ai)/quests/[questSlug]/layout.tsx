import type { Metadata } from "next";

import QuestSidebar from "../../../../components/questsidebar";

export const metadata: Metadata = {
	title: "ZETH | AI Tading Assistant",
	description:
		"ZetherBot is a decentralized AI trading assistant that executes optimized trades for holders.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-full bg-fixed overflow-hidden bg-gradient-to-b from-black to-dark bg-center">
			<div className="flex h-full w-full relative overflow-hidden">
				<div className="h-full top-0 left-0 show-md">
					<QuestSidebar />
				</div>
				<div className="w-full relative h-full overflow-auto">{children}</div>
			</div>
		</div>
	);
}
