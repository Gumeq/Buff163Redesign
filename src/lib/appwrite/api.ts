import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, avatars } from "./config";
import { SkinSellProps, INewUser, SkinSellPropsUpdate } from "@/types";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(user.username);

		const newUser = await saveUserToDB({
			accountId: newAccount.$id,
			email: newAccount.email,
			username: user.username,
			imageUrl: avatarUrl,
		});

		return newUser;
	} catch (error) {
		console.log(error);
		return error;
	}
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
	accountId: string;
	email: string;
	imageUrl: URL;
	username?: string;
}) {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			user
		);

		return newUser;
	} catch (error) {
		console.log(error);
	}
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
	try {
		const session = await account.createEmailSession(
			user.email,
			user.password
		);

		return session;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET ACCOUNT
export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET CURRENT USER
export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
	try {
		const user = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			userId
		);

		if (!user) throw Error;

		return user;
	} catch (error) {
		console.log(error);
	}
}

// ============================== SIGN OUT
export async function signOutAccount() {
	try {
		const session = await account.deleteSession("current");

		return session;
	} catch (error) {
		console.log(error);
	}
}

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST

export async function createPost(post: SkinSellProps) {
	try {
		// Create post
		const newPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.skinsCollectionId,
			ID.unique(),
			{
				seller: post.seller,
				name: post.name,
				price: post.price,
				wear: post.wear,
				imageUrl: post.imageUrl,
				weapon: post.weapon,
			}
		);

		return newPost;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET POSTS

export async function getPostById(postId?: string) {
	if (!postId) throw Error;

	try {
		const post = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.skinsCollectionId,
			postId
		);

		if (!post) throw Error;

		return post;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET RECENT POSTS

export async function getRecentPosts() {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.skinsCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(20)]
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET AK POSTS

export async function getAkPosts() {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.skinsCollectionId,
			[Query.equal("weapon", ["AK-47"]), Query.limit(20)]
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET M4A4 POSTS

export async function getM4Posts() {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.skinsCollectionId,
			[Query.equal("weapon", ["M4A4"]), Query.limit(20)]
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET CART POSTS

export async function getCartPosts(user: any) {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.cartCollectionId,
			user
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
}

// ============================== UPDATE POSTS

export async function updatePost(post: SkinSellPropsUpdate) {
	try {
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.skinsCollectionId,
			post.postId,
			{
				price: post.price,
				wear: post.wear,
			}
		);
		if (!updatedPost) {
			throw Error;
		}
		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

// ============================== DELETE POSTS

export async function deletePost(postId?: string) {
	if (!postId) return "no post Id";

	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.skinsCollectionId,
			postId
		);

		if (!statusCode) throw Error;

		return { status: "Ok" };
	} catch (error) {
		console.log(error);
	}
}

// ============================== SAVE (ADD TO CART) POSTS

export async function savePost(userId: string, postId: string) {
	try {
		const updatedPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.cartCollectionId,
			ID.unique(),
			{
				user: userId,
				skins: postId,
			}
		);

		if (!updatedPost) throw Error;

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

// ============================== DELETE SAVE (REMOVE FROM CART) POSTS

export async function deleteSavedPost(savedRecordId: string) {
	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.cartCollectionId,
			savedRecordId
		);

		if (!statusCode) throw Error;

		return { status: "Ok" };
	} catch (error) {
		console.log(error);
	}
}
