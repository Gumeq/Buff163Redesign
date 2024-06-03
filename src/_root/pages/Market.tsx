import AdSlider from "@/components/shared/AdSlider";
import SkinCard from "@/components/shared/SkinCard";
import { getPostById } from "@/lib/appwrite/api";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React from "react";

const Market = () => {
	const {
		data: recentPosts,
		isLoading: isPostLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();

	return (
		<div className="max-w-full">
			<AdSlider></AdSlider>
			<div className="pt-8 px-64 ">
				<h2 className="h3-bold text-left pb-4">Recommended</h2>
				{isPostLoading && !recentPosts ? (
					<Loader />
				) : (
					<ul className="flex flex-row gap-4 w-full ">
						{recentPosts?.documents
							.slice(0, 9)
							.map((recentPosts: Models.Document) => (
								<li
									key={recentPosts.$id}
									className="flex justify-center"
								>
									<SkinCard post={recentPosts} />
								</li>
							))}
					</ul>
				)}
			</div>
			{/* <div className="pt-8 px-64">
				<h2 className="h3-bold text-left pb-4">Best Deals</h2>
				{isPostLoading && !posts ? (
					<Loader />
				) : (
					<ul className="flex flex-row gap-4 w-full ">
						{posts?.documents
							.slice(0, 9)
							.map((post: Models.Document) => (
								<li
									key={post.$id}
									className="flex justify-center"
								>
									<SkinCard post={post} />
								</li>
							))}
					</ul>
				)}
			</div>
			<div className="pt-8 px-64">
				<h2 className="h3-bold text-left max-w-full pb-4">
					Best Sellers
				</h2>
				{isPostLoading && !posts ? (
					<Loader />
				) : (
					<ul className="flex flex-row gap-4 w-full ">
						{posts?.documents
							.slice(0, 9)
							.map((post: Models.Document) => (
								<li
									key={post.$id}
									className="flex justify-center"
								>
									<SkinCard post={post} />
								</li>
							))}
					</ul>
				)}
			</div> */}
		</div>
	);
};

export default Market;
