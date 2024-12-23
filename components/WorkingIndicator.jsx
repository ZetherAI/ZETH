import Loader from "./Loader";

export default function WorkingIndicator({ working }) {
	if (!working) return null;

	return (
		<div className="w-full flex flex-row justify-start items-start">
			<div className=" w-max flex flex-row justify-start items-center space-x-2 min-w-[50px] px-4 lg:px-6 py-4 lg:py-3 rounded-lg bg-white/10">
				<Loader color="#CCCCCC" speedMultiplier={1} size={10} />
			</div>
		</div>
	);
}
