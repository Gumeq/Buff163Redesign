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

// STATS IS A BAD NAME BUT I DIDN'T HAVE A BETTER ONE OK ?!

const PostStats = ({ post, userId }: PostStatsProps) => {
	// THIS IS USED FOR THE CART
	const [isSaved, setIsSaved] = useState(false);
	// SAVE TO CART
	const { mutate: savePost } = useSavePost();
	// DELETE FROM CART
	const { mutate: deleteSavePost } = useDeleteSavedPost();
	// GET CURRENT USER , AND YES THERE IS A DIFFERENCE BETWEEN THIS AND THE useUserContext();
	// WHY? I DON'T KNOW DATABASE ENOUGH TO TELL YOU
	const { data: currentUser } = useGetCurrentUser();
	// FIND A SKIN IN THE CART
	const savedPostRecord = currentUser?.cart.find(
		(record: Models.Document) => record.skins.$id === post.$id
	);
	// ADD TO CART, OTHERWISE DELETE FROM CART
	useEffect(() => {
		setIsSaved(!!savedPostRecord);
	}, [currentUser]);

	// HANDLE ADDING TO CART
	const handleSavePost = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		e.stopPropagation();
		// IF ALREADY IN CART
		if (savedPostRecord) {
			setIsSaved(false);
			// DELETE FROM CART
			return deleteSavePost(savedPostRecord.$id);
		}
		// OTHERWISE ADD TO CART
		savePost({ userId: userId, postId: post.$id });
		setIsSaved(true);
	};

	return (
		<div className={`flex justify-between items-center z-20 `}>
			{(isSaved && (
				<div
					className="bg-red rounded-[12px]  w-[160px] h-[30px] flex items-center justify-center cursor-pointer"
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
					className="bg-green-500 rounded-[12px]  w-[160px] h-[30px] flex items-center justify-center cursor-pointer"
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
