import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div className="w-full h-dvh">
			<Navbar />
			<Outlet />
			<div className="hidden lg:block">
				<Footer />
			</div>
		</div>
	);
};

export default RootLayout;
