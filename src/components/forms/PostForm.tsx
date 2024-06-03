"use client";
import SearchSkin from "../shared/SearchSkin";
import React, { useEffect, useState } from "react";
import { useSkins } from "@/context/SkinsContext";
import { fetchSkin } from "@/utils";
import { SkinSellProps } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";

type PostFormProps = {
	post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
	const { mutateAsync: createPost, isPending: isLoadingCreate } =
		useCreatePost();
	const { user } = useUserContext();

	const { toast } = useToast();

	const navigate = useNavigate();

	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [skin, setSkin] = useState("M4A4 | Asiimov");
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

		navigate("/");
		console.log(values);
	}

	useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetchSkin({ name: skin });
				setData(result);
			} catch (err) {
				setError("Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, [skin]);

	if (loading) return <p>Loading...</p>;
	// if (error) return <p>{error}</p>;

	return (
		<div className="flex flex-row gap-16">
			<div className="flex flex-row gap-4">
				<h2 className="text-lg font-bold">Select skin to sell</h2>
				<form action="" className="" onSubmit={handleSearch}>
					<div className="w-80">
						<SearchSkin skin={skin} setSkin={setSkin} />
					</div>
				</form>
			</div>
			<div className="flex flex-row gap-16">
				<div className="bg-gradient-to-t from-dark-3 to-white rounded-3xl relative">
					<div className="z-20 text-white absolute bottom-10 left-10 text-4xl flex flex-col gap-4">
						<h1 className="font-bold ">{data.name}</h1>
						<h1 className=" font-bold">
							<span className="text-orange-500">$ </span>
							{data.price}
						</h1>
					</div>
					<div className="bg-orange-500 w-64 h-16 absolute rounded-br-3xl rounded-tl-3xl text-3xl font-bold flex items-center justify-center">
						Factory New
					</div>

					<img src={data.img} alt="" />
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="button">Cancel</Button>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default PostForm;
