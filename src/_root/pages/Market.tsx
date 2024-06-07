import AdSlider from "@/components/shared/AdSlider";
import SkinCard from "@/components/shared/SkinCard";
import {
	useGetAkPosts,
	useGetM4Posts,
	useGetRecentPosts,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { useRef } from "react";
const Market = () => {
	// GET THE ITEMS OF DIFFERENT CATEGORIES
	// RECENT
	const { data: recentPosts, isLoading: isPostLoading } = useGetRecentPosts();
	// AK
	const { data: akPosts, isLoading: isAkPostLoading } = useGetAkPosts();
	// M4A4
	const { data: m4Posts, isLoading: isM4PostLoading } = useGetM4Posts();
	// USED TO GET THE WIDTH OF THE DIV, WAS USED AT THE START LATER FOUND A BETTER SOLUTION.
	// KEEPING CAUSE IT BREAKS AND I HAVE NO TIME TO CHECK WHY
	const containerRef = useRef<HTMLDivElement | null>(null);

	return (
		<div className="mx-auto max-w-7xl ">
			<div className="hidden lg:block">
				<AdSlider></AdSlider>
			</div>

			<div ref={containerRef} className=" w-full p-2 pt-4">
				<h2 className="h3-bold text-left pb-4">Newest Posts</h2>
				<div className="">
					{isPostLoading && !recentPosts ? (
						<Loader />
					) : (
						<ul className="flex flex-row gap-1 lg:gap-4 overflow-x-auto custom-scrollbar ">
							{recentPosts?.documents
								.slice(0, 20)
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
			</div>
			<div ref={containerRef} className="w-full p-2">
				<h2 className="h3-bold text-left pb-4">
					Recommended AK-47 Skins
				</h2>
				<div className="">
					{isAkPostLoading && !akPosts ? (
						<Loader />
					) : (
						<ul className="flex flex-row gap-1 lg:gap-4 overflow-x-auto custom-scrollbar ">
							{akPosts?.documents
								.slice(0, 20)
								.map((cheapPosts: Models.Document) => (
									<li
										key={cheapPosts.$id}
										className="flex justify-center"
									>
										<SkinCard post={cheapPosts} />
									</li>
								))}
						</ul>
					)}
				</div>
			</div>
			<div ref={containerRef} className="w-full p-2">
				<h2 className="h3-bold text-left pb-4">
					Recommended M4A4 Skins
				</h2>
				<div className="">
					{isM4PostLoading && !akPosts ? (
						<Loader />
					) : (
						<ul className="flex flex-row gap-1 lg:gap-4 overflow-x-auto custom-scrollbar ">
							{m4Posts?.documents
								.slice(0, 20)
								.map((cheapPosts: Models.Document) => (
									<li
										key={cheapPosts.$id}
										className="flex justify-center"
									>
										<SkinCard post={cheapPosts} />
									</li>
								))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Market;
