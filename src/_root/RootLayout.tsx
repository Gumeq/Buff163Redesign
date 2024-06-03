import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AdSlider from "@/components/shared/AdSlider";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div className="w-full">
			<Navbar />
			{/* <AdSlider></AdSlider> */}
			<section className="flex flex-1 h-4/5">
				<Outlet />
			</section>
			<Footer />
		</div>
	);
};

export default RootLayout;
