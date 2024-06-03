import PostForm from "@/components/forms/PostForm";
import { FilterProps } from "@/types";
import React, { useEffect, useState } from "react";
import { fetchSkin } from "@/utils";

const CreatePost = () => {
	return (
		<div className="flex flex-1">
			<div className="py-16 px-64 flex flex-col gap-8">
				<div className="flex-start gap-4 justify-start w-full">
					<img
						src="/assets/icons/sell.svg"
						alt="add-post"
						width={36}
						height={36}
					/>
					<h2 className="h3-bold ">Sell skins</h2>
				</div>
				<PostForm />
			</div>
		</div>
	);
};

export default CreatePost;
