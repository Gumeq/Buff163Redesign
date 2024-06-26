"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchSkin } from "@/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SearchSkin from "../shared/SearchSkin";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { PostValidation } from "@/lib/validation";
import {
	useCreatePost,
	useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";

import { Models } from "appwrite";

import { useUserContext } from "@/context/AuthContext";

import { useToast } from "../ui/use-toast";
import { Loader } from "lucide-react";

type PostFormProps = {
	post?: Models.Document;
	action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
	const { mutateAsync: createPost, isPending: isLoadingCreate } =
		useCreatePost();
	const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
		useUpdatePost();
	const { user } = useUserContext();

	const { toast } = useToast();

	const navigate = useNavigate();

	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [skin, setSkin] = useState(post ? post.name : "M4A4 | Asiimov");
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	// 	FORM VALIDATION USING ZOD
	const form = useForm<z.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			wear: post ? post?.wear : "",
			price: post ? post?.price : "",
		},
	});

	// FORM ON SUBMIT HANDLING
	async function onSubmit(values: z.infer<typeof PostValidation>) {
		// IF THERE IS A POST AND ACTION IS UPDATE
		if (post && action === "Update") {
			// CHANGE POSTS ATTRIBUTES
			const updatedPost = await updatePost({
				postId: post.$id,
				wear: values.wear,
				price: values.price,
			});
			// IF POST DIDN'T UPDATE, TELL ME WHY..
			if (!updatedPost) {
				toast({
					title: `${action} post failed. Please try again.`,
				});
				return navigate(`/update-post/${post.$id}`);
			}
		} else {
			// IF ACTION IS CREATE, CREATE A POST, I KNOW CRAZY
			// SET POST ATTRIBUTES
			const newPost = await createPost({
				seller: user.id,
				name: data.name,
				imageUrl: data.img,
				weapon: data.weapon,
				wear: values.wear,
				price: values.price,
			});
			// IF IT DIDN'T WORK, PLEASE WORK
			if (!newPost) {
				toast({
					title: "Please try again",
				});
			}
		}
		navigate("/");
	}

	// GETTING SKIN FROM API USING NAME
	useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetchSkin({ name: skin });
				setData(result);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, [skin]);
	// WHENEVER SKIN NAME CHANGES, CALL THIS FUNCTION

	// LOADING..........
	if (loading)
		return (
			<div>
				<Loader></Loader>
				<p>Loading...</p>
			</div>
		);

	return (
		<div className="flex flex-col gap-4 bg-dark-3 p-4 rounded-xl lg:flex-row ">
			<div className="bg-gradient-to-b from-zinc-400 to-dark-4 rounded-xl relative">
				<div className="z-20 text-white absolute bottom-4 left-4 text-xl flex flex-col gap-2">
					<h1 className="font-bold ">{data.name}</h1>
					<h1 className=" font-bold">
						<span className="text-orange-500">$ </span>
						{data.price}
					</h1>
				</div>
				<div className="bg-orange-500 w-40 h-10 absolute rounded-br-xl rounded-tl-xl text-xl font-bold flex items-center justify-center">
					Factory New
				</div>
				<div className="max-w-lg">
					<img src={data.img} alt="" />
				</div>
			</div>
			<div>
				<div className="flex flex-col gap-4 w-full bg-dark-4 p-4 rounded-xl">
					<h2 className="text-lg font-bold">Select skin to sell</h2>
					<form action="" className="" onSubmit={handleSearch}>
						<div className="w-80">
							<SearchSkin skin={skin} setSkin={setSkin} />
						</div>
					</form>
				</div>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-8 w-full pt-8"
						>
							<FormField
								control={form.control}
								name="wear"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="shad-form_label">
											Wear
										</FormLabel>
										<FormControl>
											<Input
												placeholder="0.341234581"
												className="shad-input"
												{...field}
											/>
										</FormControl>
										<FormDescription className="shad-form_label">
											<p className="text-zinc-400">
												Wear value should be smaller
												than 1
											</p>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="shad-form_label">
											Price
										</FormLabel>
										<FormControl>
											<Input
												placeholder="69.99 $"
												className="shad-input"
												{...field}
											/>
										</FormControl>
										<FormDescription className="shad-form_label">
											<p className="text-zinc-400">
												Recommended price for{" "}
												{data.name} is: ${data.price} $
											</p>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-row gap-4 items-center justify-between">
								<Button
									type="submit"
									className="shad-button_primary whitespace-nowrap w-1/2 font-bold text-lg"
									disabled={
										isLoadingCreate || isLoadingUpdate
									}
								>
									{(isLoadingCreate || isLoadingUpdate) && (
										<Loader />
									)}
									{action} Post
								</Button>
								<Button
									type="button"
									className="shad-button_dark_4 whitespace-nowrap w-1/2 font-bold text-lg"
									onClick={() => navigate("/market")}
								>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>

			<div className="flex"></div>
		</div>
	);
};

export default PostForm;
