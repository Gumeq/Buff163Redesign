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
		<div className="flex flex-1  mx-auto max-w-7xl">
			<div className="flex justify-center w-full pt-2 md:pt-8">
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
