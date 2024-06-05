import { Models } from "appwrite";
import { useState, useEffect } from "react";

import {
	useSavePost,
	useDeleteSavedPost,
	useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";

type PostStatsProps = {
	post: Models.Document;
	userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
	const [isSaved, setIsSaved] = useState(false);

	const { mutate: savePost } = useSavePost();
	const { mutate: deleteSavePost } = useDeleteSavedPost();

	const { data: currentUser } = useGetCurrentUser();

	const savedPostRecord = currentUser?.cart.find(
		(record: Models.Document) => record.skins.$id === post.$id
	);
	useEffect(() => {
		setIsSaved(!!savedPostRecord);
	}, [currentUser]);

	const handleSavePost = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		e.stopPropagation();

		if (savedPostRecord) {
			setIsSaved(false);
			return deleteSavePost(savedPostRecord.$id);
		}

		savePost({ userId: userId, postId: post.$id });
		setIsSaved(true);
	};

	const containerStyles = location.pathname.startsWith("/profile")
		? "w-full"
		: "";

	return (
		<div
			className={`flex justify-between items-center z-20 ${containerStyles}`}
		>
			{(isSaved && (
				<div
					className="bg-red fex flex-row w-full rounded-br-[12px] rounded-tl-[12px] cursor-pointer"
					onClick={handleSavePost}
				>
					<div>
						<img
							src="/assets/icons/remove-cart.svg"
							alt="removecart"
							height={30}
							width={30}
						/>
					</div>
				</div>
			)) || (
				<div
					className="bg-green-500 rounded-br-[12px] rounded-tl-[12px] cursor-pointer"
					onClick={handleSavePost}
				>
					<img
						src="/assets/icons/add-cart.svg"
						alt="addcart"
						height={30}
						width={30}
					/>
				</div>
			)}
		</div>
	);
};

export default PostStats;
