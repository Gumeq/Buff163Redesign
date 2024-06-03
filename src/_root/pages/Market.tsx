import AdSlider from "@/components/shared/AdSlider";
import SkinCard from "@/components/shared/SkinCard";
import {
	useGetCheapPosts,
	useGetRecentPosts,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { useState, useEffect, useRef } from "react";
const Market = () => {
	const { data: recentPosts, isLoading: isPostLoading } = useGetRecentPosts();
	const { data: cheapPosts, isLoading: isCheapPostLoading } =
		useGetCheapPosts();

	const containerRef = useRef<HTMLDivElement | null>(null);
	const [visibleCount, setVisibleCount] = useState(20); // Default count

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			if (entries[0].target) {
				const width = entries[0].contentRect.width;
				const itemWidth = 200; // Adjust this to your SkinCard width
				const count = Math.floor(width / itemWidth);
				setVisibleCount(count);
			}
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				resizeObserver.unobserve(containerRef.current);
			}
		};
	}, [containerRef]);

	return (
		<div className="w-full">
			<AdSlider></AdSlider>
			<div ref={containerRef} className="pt-8 w-full px-4 md:px-64  ">
				<h2 className="h3-bold text-left pb-4">Newest Posts</h2>
				<div className="">
					{isPostLoading && !recentPosts ? (
						<Loader />
					) : (
						<ul className="flex flex-row gap-4 ">
							{recentPosts?.documents
								.slice(0, visibleCount)
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
			<div ref={containerRef} className="pt-8 w-full px-4 md:px-64  ">
				<h2 className="h3-bold text-left pb-4">Recommended AK-47</h2>
				<div className="">
					{isCheapPostLoading && !cheapPosts ? (
						<Loader />
					) : (
						<ul className="flex flex-row gap-4 ">
							{cheapPosts?.documents
								.slice(0, visibleCount)
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
