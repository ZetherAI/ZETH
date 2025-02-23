import React from "react";

import { Motion, DotGrid } from "@/components";
import { ExperimentData } from "@/constants/staticText";

interface ITitleList {
	title: string;
	desc: string;
}

interface IExperimentData {
	title: string;
	paragraphs?: string[];
	list?: string[];
	titleList?: ITitleList[];
}

const TheExperiment = () => {
	return (
		<div>
			<Motion custom={0} className="banner-container">
				<DotGrid w={100} h={20} id={2} />
				<div className="bg-pfp bg-center bg-no-repeat bg-cover rounded-xl w-full h-full flex flex-col justify-end ">
					<div className="heading flex-center w-full h-full bg-gradient-to-r from-brand-1/50 to-brand-3/10">
						<div className="heading flex-center w-full h-full bg-gradient-to-r from-brand-1/50 to-brand-3/10">
							{/* <Motion custom={1} className="heading font-semibold p-5">
								Litepaper
							</Motion> */}
						</div>
					</div>
				</div>
			</Motion>

			<div className="flex flex-col gap-3 lg:gap-4 py-7 ">
				{ExperimentData.map(({ title, paragraphs, list, titleList }: IExperimentData, index: number) => (
					<Motion custom={index + 2} key={index} className="flex flex-col gap-2 card">
						<Motion className="subheading" custom={index + 2}>
							{title}
						</Motion>
						{paragraphs && (
							<div className="flex flex-col gap-4">
								{paragraphs.map((item, j) => (
									<Motion tag="p" key={j} custom={index + 2 + j}>
										{item}
									</Motion>
								))}
							</div>
						)}
						{list && (
							<div className="flex flex-col gap-3">
								{list.map((item, j) => (
									<Motion key={j} custom={index + 2 + j}>
										<li>{item}</li>
									</Motion>
								))}
							</div>
						)}
						{titleList && (
							<div className="flex flex-col gap-4 pt-1">
								{titleList.map((item, j) => (
									<div key={j} className="flex flex-col gap-1">
										<Motion tag="p" className="font-semibold" custom={index + 2 + j}>
											{item.title}
										</Motion>
										<Motion tag="p" custom={index + 2 + j}>
											{item.desc}
										</Motion>
									</div>
								))}
							</div>
						)}
					</Motion>
				))}
			</div>
		</div>
	);
};

export default TheExperiment;
