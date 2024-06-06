import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

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
	const { data: skinSeller } = useGetUserById(post.seller.$id);
	const { user } = useUserContext();

	const ItemUse = () => {
		if (user.id === post.seller.$id) {
			return (
				<div className="bg-orange-500 rounded-[12px]  w-[160px] h-[30px] flex items-center justify-center">
					<Link to={`/update-post/${post.$id}`}>
						<img
							src="/assets/icons/edit.svg"
							alt="edit"
							height={20}
							width={20}
						/>
					</Link>
				</div>
			);
		} else {
			return <PostStats post={post} userId={user.id} />;
		}
	};

	return (
		<div className="flex flex-col items-center relative h-[260px] overflow-hidden mb-4">
			<div className=" z-10 bg-dark-4 rounded-tl-[12px] rounded-tr-[12px] h-[160px] w-[180px] p-2">
				<div className="absolute font-bold text-sm text-nowrap w-[160px] overflow-hidden">
					<h2 className=" ">{post.name}</h2>
					<h2 className="text-zinc-400 text-xs">
						{getExterior(post.wear)}
					</h2>
				</div>
				<div>
					<img
						src={post.imageUrl}
						alt="img"
						className="absolute  w-full "
					/>
				</div>
			</div>

			<div className=" absolute bottom-0 left-0 pt-8 h-[120px] w-[180px] bg-dark-3 rounded-[12px]  ">
				<div className="flex flex-col w-full h-full gap-1">
					<div className="z-20 text-white flex flex-row w-full justify-between items-center px-2">
						<h2 className=" font-bold text-lg">
							{post.price}
							<span className="text-orange-500"> $</span>
						</h2>
						<div>
							{skinSeller && (
								<Link to={`/profile/${skinSeller.$id}`}>
									<img
										src={skinSeller.imageUrl}
										alt=""
										className="rounded-full"
										width={30}
										height={30}
									/>
								</Link>
							)}
						</div>
					</div>
					<div className="flex flex-row justify-between items-center pt-2 "></div>
					<div className=" flex items-center justify-center">
						<ItemUse></ItemUse>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkinCard;
