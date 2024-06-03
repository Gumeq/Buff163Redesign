import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div className="w-full">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default RootLayout;
