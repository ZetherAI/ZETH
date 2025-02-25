import Loader from "./Loader";
import { images } from "@/constants";
import Image from "next/image";

export default function WorkingIndicator({ working }) {
	if (!working) return null;

	return (
		<div className="container  border-b py-4 border-white/5">
			<div className="flex flex-col gap-x-2 gap-y-8 relative pb-4">
				<div className="flex gap-2 md:gap-3 w-full justify-start">
					<Image src={images.ZETH} alt="user" className="size-[35px] lg:size-[40px] rounded-full object-cover" />
					<div className={"ai-message flex flex-row justify-start space-x-2  rounded-[20px]"}>
						<p className="w-full whitespace-nowrap">ZETH is typing</p>

						<Loader size={5} />
					</div>
				</div>
			</div>
		</div>
	);
}
