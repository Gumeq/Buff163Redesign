import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
	return (
		<div className="flex flex-1 mx-auto max-w-7xl ">
			<div className="flex justify-center w-full pt-4 md:pt-8">
				{/* NAVIGATE TO CREATE POST PAGE */}
				<PostForm action="Create" />
			</div>
		</div>
	);
};

export default CreatePost;
