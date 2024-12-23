import {
	ClipLoader,
	PulseLoader,
	CircleLoader,
	GridLoader,
	PuffLoader,
	MoonLoader,
	BarLoader,
	RingLoader,
	RotateLoader,
	SkewLoader,
	PropagateLoader,
} from "react-spinners";

const spinnersMap = {
	default: PulseLoader,
	circle: CircleLoader,
	clip: ClipLoader,
	grid: GridLoader,
	puff: PuffLoader,
	bar: BarLoader,
	moon: MoonLoader,
	ring: RingLoader,
	rotate: RotateLoader,
	skew: SkewLoader,
	propagate: PropagateLoader,
	pulse: PulseLoader,
};

export default function Loader({
	type = "default",
	size = 20,
	color = "#ffffff",
	inverted = false,
	speed = 1,
	...rest
}) {
	if (inverted) color = "#1652F0";

	const RenderProp = spinnersMap[type] || ClipLoader;

	return (
		<div className="flex  flex-row justify-center items-center w-full">
			<RenderProp size={size} color={color} speedMultiplier={speed} {...rest} />
		</div>
	);
}
