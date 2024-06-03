import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, avatars } from "./config";
import { SkinSellProps, INewUser } from "@/types";

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

// ============================== GET USER
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

// export async function getPostById(postId?: string) {
// 	if (!postId) throw Error;

// 	try {
// 		const post = await databases.getDocument(
// 			appwriteConfig.databaseId,
// 			appwriteConfig.skinsCollectionId,
// 			postId
// 		);

// 		if (!post) throw Error;

// 		return post;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

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

// export async function getCheapPosts() {
// 	try {
// 		const posts = await databases.listDocuments(
// 			appwriteConfig.databaseId,
// 			appwriteConfig.skinsCollectionId,
// 			[Query.orderDesc("price"), Query.limit(20)]
// 		);

// 		if (!posts) throw Error;

// 		return posts;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
// 	const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

// 	if (pageParam) {
// 		queries.push(Query.cursorAfter(pageParam.toString()));
// 	}

// 	try {
// 		const posts = await databases.listDocuments(
// 			appwriteConfig.databaseId,
// 			appwriteConfig.skinsCollectionId,
// 			queries
// 		);

// 		if (!posts) throw Error;

// 		return posts;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
