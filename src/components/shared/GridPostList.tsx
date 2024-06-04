import { Models } from "appwrite";
import { Link } from "react-router-dom";

type GridPostListProps = {
	skins: Models.Document[];
	showUser?: boolean;
};

const GridPostList = ({ skins, showUser = true }: GridPostListProps) => {
	// const { user } = useUserContext();

	return (
		<ul className="grid-container">
			{skins.map((post) => (
				<li key={post.$id} className="relative w-40 h-40">
					<Link
						to={`/update-post/${post.$id}`}
						className="grid-post_link"
					>
						<div className="w-full">
							<img
								src={post.imageUrl}
								alt="post"
								className="h-full w-full absolute top-0 left-0"
							/>
						</div>
					</Link>

					<div className="grid-post_user">
						{showUser && (
							<div className="flex items-center justify-start gap-2 flex-1">
								<img
									src={
										post.seller.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt="creator"
									className="w-8 h-8 rounded-full"
								/>
								<p className="line-clamp-1">
									{post.seller.username}
								</p>
							</div>
						)}
					</div>
				</li>
			))}
		</ul>
	);
};

export default GridPostList;
