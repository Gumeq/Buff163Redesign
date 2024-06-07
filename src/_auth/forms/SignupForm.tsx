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
import { SignUpValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
	useCreateUserAccount,
	useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

// SIGN UP FORM
const SignUpForm = () => {
	// POPUP WINDOW FOR ERRORS ALSO KNOWN AS TOAST, YUM
	const { toast } = useToast();

	// useUserContext() TO GET THE USER IF THERE ALREADY IS ONE LOGGED IN
	const { checkAuthUser } = useUserContext();

	const navigate = useNavigate();

	// CREATE ACCOUNT
	const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
		useCreateUserAccount();

	// SIGN IN
	const { mutateAsync: signInAccount } = useSignInAccount();

	// FORM VALIDATION USING ZOD
	// COULD I HAVE DONE THIS WITHOUT ZOD, YES , BUT TOO MUCH WORK FOR NO REASON
	const form = useForm<z.infer<typeof SignUpValidation>>({
		resolver: zodResolver(SignUpValidation),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	// SUBMIT
	async function onSubmit(values: z.infer<typeof SignUpValidation>) {
		// Create User
		const newUser = await createUserAccount(values);

		// IF IT DIDNT CREATE USER, WELL TOO BAD TRY AGAIN
		if (!newUser) {
			return toast({
				title: "Sign up failed. Please try again.",
				description: "",
			});
		}

		// SINCE WE HAVE AN ACCOUNT NOW WE CAN LOG IN
		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});

		// IF WE DIDNT LOG IN, STH WENT WRONG
		if (!session) {
			return toast({ title: "Sign in failed. Please try again." });
		}

		// CHECKING IF WE FINALLY GOT LOGGED
		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset();

			navigate("/");
		} else {
			// TOO BAD
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
					Create a new account
				</h2>
				<p className="text-slate-200 small-medium md:base-regular mt-2">
					To use BUFF163, please enter your details
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										type="text"
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
						{isCreatingAccount ? (
							<div className="flex-center gap-2">
								{" "}
								<Loader />
								Loading...
							</div>
						) : (
							"Sign up"
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Already have an account?
						<Link
							to="/sign-in"
							className="text-orange-500 text-small-semibold ml-1"
						>
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignUpForm;
