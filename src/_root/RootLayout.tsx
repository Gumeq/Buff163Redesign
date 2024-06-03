import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div className="w-full">
			<Navbar />
			<section className="flex flex-1 h-full">
				<Outlet />
			</section>
			<Footer />
		</div>
	);
};

export default RootLayout;
