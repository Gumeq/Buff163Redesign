import AdSlider from "@/components/shared/AdSlider";
import { Button } from "@headlessui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="relative flex w-full h-full patterned-div">
			<div className="radial-grad absolute top-0 left-0">
				<div className="z-10 w-full h-full flex flex-row px-64">
					<div className=" flex  w-1/2 h-full flex-col justify-center pl-80 gap-10">
						<h1 className="h1-bold">
							Revolutionize Your CS2 Trading
							<br /> Experience with{" "}
							<span>
								<a className="h2-bold text-slate-100" href="/">
									BUFF
									<span className="text-orange-500">163</span>
								</a>
							</span>
						</h1>
						<h2 className="w-1/2 text-lg">
							The most sophisticated marketplace and trading
							tools, facilitating millions of skin transactions
							and indexing billions of skins. Experience unmatched
							ease and security when buying and selling CS2 skins.
						</h2>
						<Button
							type="button"
							className="shad-button_primary w-64 h-14 rounded-lg flex  flex-row items-center justify-center"
							onClick={() => navigate("/Market")}
						>
							<div className="h3-bold">Marketplace</div>
							<div>
								<img src="/assets/icons/market.svg" alt="" />
							</div>
						</Button>
					</div>
					<div className="  w-1/2 ">
						<div className="flex h-full items-center justify-center">
							<img
								src="/assets/images/hero-main.png"
								alt="hero-main"
								width={800}
								height={800}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
