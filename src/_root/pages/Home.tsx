import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

// SWEET HOME ALAB..
//HOM PAGE

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="mx-auto max-w-7xl patterned-div">
			<div className="radial-grad ">
				<div className="z-10 w-full h-full p-8 flex items-center flex-col gap-4 lg:flex-row-reverse lg:justify-evenly lg:h-3/4 ">
					<div className="">
						<div className="flex justify-center">
							<img
								src="/assets/images/hero-main.png"
								alt="hero-main"
								className="animated-div"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 max-w-[500px]">
						<h1 className="h1-bold">
							Revolutionize Your CS2 Trading Experience with{" "}
							<span>
								<a className="h2-bold text-slate-100" href="/">
									BUFF
									<span className="text-orange-500">163</span>
								</a>
							</span>
						</h1>
						<h2 className="text-lg">
							The most sophisticated marketplace and trading
							tools, facilitating millions of skin transactions
							and indexing billions of skins. Experience unmatched
							ease and security when buying and selling CS2 skins.
						</h2>
						<div className="flex flex-row gap-4">
							<Button
								type="button"
								className="shad-button_primary w-full h-14 rounded-lg flex flex-row items-center justify-center"
								onClick={() => navigate("/Market")}
							>
								<div className="h3-bold">Marketplace</div>
								<div>
									<img
										src="/assets/icons/market.svg"
										alt=""
									/>
								</div>
							</Button>
							<Button
								type="button"
								className="shad-button_dark_4 w-full h-14 rounded-lg flex flex-row items-center justify-center"
								onClick={() => navigate("/Market")}
							>
								<div className="h3-bold">Link</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
