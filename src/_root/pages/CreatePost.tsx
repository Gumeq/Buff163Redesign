import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
	return (
		<div className="flex flex-1">
			<div className="flex justify-center w-full pt-2 md:pt-8">
				<PostForm action="Create" />
			</div>
		</div>
	);
};

export default CreatePost;
