("use client");
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
	const { toast } = useToast();

	// GET USER FROM LOCAL DATA, AGAIN...
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	const navigate = useNavigate();

	// SIGN IN
	const { mutateAsync: signInAccount } = useSignInAccount();

	// FORM VALIDATION USING ZOD, EASIER, FASTER, BETTER , STRONGER
	const form = useForm<z.infer<typeof SignInValidation>>({
		resolver: zodResolver(SignInValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// SUBMIT
	async function onSubmit(values: z.infer<typeof SignInValidation>) {
		// CREATE SESSION AND LOG IN
		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});

		// IF IT DIDNT WORK..TOO BAD
		if (!session) {
			return toast({ title: "Sign in failed. Please try again." });
		}

		// CHECK IF WE FINALLY GOT LOGGED

		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset();
			navigate("/");
		} else {
			return toast({ title: "Sign up failed. Plase try again." });
		}
	}
	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col ">
				<h1 className="h1-bold text-slate-100">
					BUFF<span className="text-orange-500">163</span>
				</h1>
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Log in to your account
				</h2>
				<p className="text-slate-200 small-medium md:base-regular mt-2">
					Welcome back! Please enter your details.
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary ">
						{isUserLoading ? (
							<div className="flex-center gap-2">
								{" "}
								<Loader />
								Loading...
							</div>
						) : (
							"Sign in"
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Dont have an account?
						<Link
							to="/sign-up"
							className="text-orange-500 text-small-semibold ml-1"
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignInForm;
