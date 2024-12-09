import { StaticImageData } from 'next/image';

export interface ICollection {
	name: string;
	image: string | StaticImageData;
	client: {
		name: string;
		img: string | StaticImageData;
	};
	fileSize: string;
	slug?: string;
}
