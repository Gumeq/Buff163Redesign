import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createUserAccount,
	signInAccount,
	signOutAccount,
	createPost,
	getRecentPosts,
	getUserById,
	getPostById,
	updatePost,
	deletePost,
	deleteSavedPost,
	savePost,
	getCurrentUser,
	getAkPosts,
	getM4Posts,
	getCartPosts,
} from "../appwrite/api";
import { INewUser, SkinSellProps, SkinSellPropsUpdate } from "@/types";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};

// ============================== SIGN IN

export const useSignInAccount = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signInAccount(user),
	});
};

// ============================== SIGN OUT

export const useSignOutAccount = () => {
	return useMutation({
		mutationFn: signOutAccount,
	});
};

// ============================== SIGN OUT

export const useGetUserById = (userId: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
	});
};

// ============================== GET CURRENT USER

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST

export const useCreatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: SkinSellProps) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
};

// ============================== UPDATE POST

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: SkinSellPropsUpdate) => updatePost(post),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});
		},
	});
};

// ============================== UPDATE POST

export const useGetPostById = (postId?: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
		queryFn: () => getPostById(postId),
		enabled: !!postId,
	});
};

// ============================== DELETE POSTS

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ postId }: { postId?: string }) => deletePost(postId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

// ============================== GET RECENT POSTS

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};

// ============================== GET AK POSTS

export const useGetAkPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_AK_POSTS],
		queryFn: getAkPosts,
	});
};

// ============================== GET M4A4 POSTS

export const useGetM4Posts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_M4_POSTS],
		queryFn: getM4Posts,
	});
};

// ============================== GET CART POSTS

export const useGetCartPosts = (user: any) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CART_POSTS],
		queryFn: () => getCartPosts(user),
		// enabled: !!user,
	});
};

// ============================== SAVE POST (TO CART)

export const useSavePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
			savePost(userId, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

// ============================== DELETE SAVED POST (FROM CART)

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};
