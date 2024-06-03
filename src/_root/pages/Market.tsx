import SkinCard from "@/components/shared/SkinCard";
import { getPostById } from "@/lib/appwrite/api";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React from "react";

// useGetRecentPosts();

console.log(getPostById("665cf2b7d584efb0a55d"));

const Market = () => {
	const {
		data: posts,
		isLoading: isPostLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();

	return (
		<div className="home-container">
			<div className="home-posts">
				<h2 className="h3-bold md:h2-bold text-left w-full">
					Home Feed
				</h2>
				{isPostLoading && !posts ? (
					<Loader />
				) : (
					<ul className="flex flex-col flex-1 gap-9 w-full ">
						{posts?.documents.map((post: Models.Document) => (
							<li
								key={post.$id}
								className="flex justify-center w-full"
							>
								<SkinCard post={post} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Market;
