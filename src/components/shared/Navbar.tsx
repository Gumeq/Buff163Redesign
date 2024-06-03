import { useEffect } from "react";
import SearchBar from "./SearchBar";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

const navbar = () => {
	// Log Out Button
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	return (
		<div className="flex flex-col divide-y w-full">
			<div className="h-20 w-full bg-dark-3 flex flex-row px-64 items-center justify-between">
				<div className="flex flex-row gap-8 items-center">
					<a className="h2-bold text-slate-100" href="/">
						BUFF<span className="text-orange-500">163</span>
					</a>
					<a className="text-lg font-semibold" href="/Market">
						MARKET
					</a>
				</div>
				<div className="">
					<SearchBar />
				</div>
				<div className="flex flex-row gap-8 items-center">
					<a className="text-xl font-semibold" href="/create-post">
						SELL
					</a>
					<div className="bg-orange-500 rounded-md h-10 flex flex-row gap-2 items-center p-4">
						<img
							src="/assets/icons/bag.svg"
							alt=""
							className="w-8 h-8"
						/>
						<h2 className="text-lg font-semibold">0</h2>
					</div>
					<div className="flex gap-4">
						{/* log Out button */}
						<Button
							variant="default"
							onClick={() => signOut()}
							className="text-lg font-bold"
						>
							LOGOUT
						</Button>
					</div>
					{/* <ProfilePicture></ProfilePicture> */}
				</div>
			</div>
			<div className="w-full h-10 bg-dark-3 flex flex-row items-center gap-8 justify-center text-md font-bold">
				<div className="">KNIFE</div>
				<div className="">GLOVES</div>
				<div className="">PISTOL</div>
				<div className="">RIFLE</div>
				<div className="">SMG</div>
				<div className="">HEAVY</div>
				<div className="">AGENT</div>
				<div className="">STICKER</div>
				<div className="">CONTAINER</div>
				<div className="">KEY</div>
				<div className="">PATCH</div>
				<div className="">GRAFFITI</div>
				<div className="">COLLECTIBLE</div>
				<div className="">PASS</div>
				<div className="">MUSIC KIT</div>
			</div>
		</div>
	);
};

// export async function getSkins() {
// 	const allSkins = await fetchSkins();

// 	console.log(allSkins);
// }

export default navbar;
