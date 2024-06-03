import { z } from "zod";

export const SignUpValidation = z.object({
	username: z.string().min(2, { message: "Too Short" }),
	email: z.string().email(),
	password: z.string().min(8, { message: "Too Short" }),
});
export const SignInValidation = z.object({
	email: z.string().email(),
	password: z.string().min(8, { message: "Too Short" }),
});

export const PostValidation = z.object({
	wear: z.string().max(2200),
	price: z.string(),
});
