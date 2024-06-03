import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
	const { id } = useParams();
	const { data: post, isPending } = useGetPostById(id || "");

	if (isPending)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);

	return (
		<div className="flex flex-1 common-container ">
			<div className="">
				<div className="flex-start gap-4 justify-start w-full">
					<img
						src="/assets/icons/sell.svg"
						alt="add-post"
						width={36}
						height={36}
					/>
					<h2 className="h3-bold ">Sell skins</h2>
				</div>
				{isPending ? (
					<Loader />
				) : (
					<PostForm action="Update" post={post} />
				)}
			</div>
		</div>
	);
};

export default UpdatePost;
