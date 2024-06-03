import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useUserContext } from "@/context/AuthContext";

const navbar = () => {
	const navigate = useNavigate();
	const { user } = useUserContext();

	return (
		<nav className="flex flex-col divide-y w-full">
			<div className="h-20 w-full bg-dark-3 flex flex-row px-64 items-center justify-between">
				<div className="flex flex-row gap-8 items-center">
					<a className="h2-bold text-slate-100" href="/">
						BUFF<span className="text-orange-500">163</span>
					</a>
					<a
						className="text-lg font-semibold"
						onClick={() => navigate("/Market")}
					>
						MARKET
					</a>
				</div>
				<div className="">
					<SearchBar />
				</div>
				<div className="flex flex-row gap-8 items-center">
					<a
						className="text-xl font-semibold relative"
						onClick={() => navigate("/create-post")}
					>
						SELL
						<span className="absolute -top-1 -right-1 flex h-3 w-3">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
						</span>
					</a>
					<div className="">
						{/* <img
							src="/assets/icons/bag.svg"
							alt=""
							className="w-8 h-8"
						/> */}
						<h2 className="text-lg font-semibold">CART</h2>
					</div>
					<ProfilePicture imageUrl={user.imageUrl}></ProfilePicture>
				</div>
			</div>
			{/* <div className="w-full h-10 bg-dark-3 flex-row items-center gap-8 justify-center text-md font-bold hidden lg:flex">
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
			</div> */}
		</nav>
	);
};

// export async function getSkins() {
// 	const allSkins = await fetchSkins();

// 	console.log(allSkins);
// }

export default navbar;
