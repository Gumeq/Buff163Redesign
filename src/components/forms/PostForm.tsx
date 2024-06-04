"use client";
import SearchSkin from "../shared/SearchSkin";
import React, { useEffect, useState } from "react";
import { fetchSkin } from "@/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";

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
import { Models } from "appwrite";
import {
	useCreatePost,
	useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
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

	// 1. Define your form.
	const form = useForm<z.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			wear: post ? post?.wear : "",
			price: post ? post?.price : "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof PostValidation>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// ACTION = UPDATE
		if (post && action === "Update") {
			const updatedPost = await updatePost({
				postId: post.$id,
				wear: values.wear,
				price: values.price,
			});

			if (!updatedPost) {
				toast({
					title: `${action} post failed. Please try again.`,
				});
				return navigate(`/update-post/${post.$id}`);
			}
		} else {
			const newPost = await createPost({
				seller: user.id,
				name: data.name,
				imageUrl: data.img,
				weapon: data.weapon,
				wear: values.wear,
				price: values.price,
			});
			if (!newPost) {
				toast({
					title: "Please try again",
				});
			}
		}
		navigate("/");
	}

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

	if (loading)
		return (
			<div>
				<Loader></Loader>
				<p>Loading...</p>
			</div>
		);

	return (
		<div className="flex flex-col gap-4 max-w-[400px] bg-dark-3 p-4 rounded-xl">
			<h1 className="h2-bold">{action} Post</h1>
			<div className="bg-gradient-to-b from-zinc-400 to-dark-4 rounded-xl relative max-w-[400]">
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
				<div className="">
					<img src={data.img} alt="" />
				</div>
			</div>
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
						className="flex flex-col gap-8 w-full"
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
											placeholder="Wear"
											className="shad-input"
											{...field}
										/>
									</FormControl>
									<FormDescription className="shad-form_label">
										<p className="text-zinc-400">
											Wear value should be smaller than 1
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
											placeholder="Price"
											className="shad-input"
											{...field}
										/>
									</FormControl>
									<FormDescription className="shad-form_label">
										<p className="text-zinc-400">
											Recommended price for {data.name}{" "}
											is: ${data.price}
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
								disabled={isLoadingCreate || isLoadingUpdate}
							>
								{(isLoadingCreate || isLoadingUpdate) && (
									<Loader />
								)}
								{action} Post
							</Button>
							<Button
								type="button"
								className="shad-button_dark_4 whitespace-nowrap w-1/2 font-bold text-lg"
								onClick={() => navigate("/")}
							>
								Cancel
							</Button>
						</div>
					</form>
				</Form>
			</div>
			<div className="flex"></div>
		</div>
	);
};

export default PostForm;
