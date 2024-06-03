import { Models } from "appwrite";
import React from "react";

type PostCardProps = {
	post: Models.Document;
};

export const getExterior = (input: string): string => {
	const num = parseFloat(input);
	let exterior = "";

	if (num <= 0.07) {
		exterior = "Factory New";
	} else if (num > 0.07 && num <= 0.15) {
		exterior = "Minimal Wear";
	} else if (num > 0.15 && num <= 0.37) {
		exterior = "Field Tested";
	} else if (num > 0.37 && num <= 0.44) {
		exterior = "Well Worn";
	} else {
		exterior = "Battle Scarred";
	}

	return exterior;
};

const SkinCard = ({ post }: PostCardProps) => {
	return (
		<div className="bg-gradient-to-t from-dark-3 to-white rounded-[12px] relative h-[200px] w-[200px]">
			<div className="z-20 text-white absolute bottom-2 left-2 text-md flex flex-col ">
				<h1 className="font-bold ">{post.name}</h1>
				<h1 className=" font-bold">
					<span className="text-orange-500">$ </span>
					{post.price}
				</h1>
			</div>
			<div className="bg-orange-500 max-w-[120px] max-h-[30px] absolute rounded-br-[12px] rounded-tl-[12px] text-sm p-2 font-bold flex items-center justify-center">
				{getExterior(post.wear)}
			</div>

			<img
				src={post.imageUrl}
				alt="img"
				className="absolute  w-full p-2"
			/>
		</div>
	);
};

export default SkinCard;
