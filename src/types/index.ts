export type IContextType = {
	user: IUser;
	isLoading: boolean;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export type INavLink = {
	imgURL: string;
	route: string;
	label: string;
};

export type IUpdateUser = {
	userId: string;
	name: string;
	bio: string;
	imageId: string;
	imageUrl: URL | string;
	file: File[];
};

export type IUser = {
	id: string;
	name: string;
	username: string;
	email: string;
	imageUrl: string;
	bio: string;
};

export type INewUser = {
	email: string;
	username: string;
	password: string;
};

export interface SearchSkinsProps {
	skin: string;
	setSkin: (skins: string) => void;
}

export type SkinSearchProps = {
	name: string;
	price: string;
	img: string;
	weapon: string;
	class: string;
};

export interface FilterProps {
	name: string;
}

export type SkinSellProps = {
	seller: string;
	name: string;
	price: string;
	wear: string;
	imageUrl: string;
	weapon: string;
};
export type SkinSellPropsUpdate = {
	postId: string;
	price: string;
	wear: string;
};
