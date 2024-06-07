import { useUserContext } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

// AUTH LAYOUT
const AuthLayout = () => {
	const { isAuthenticated } = useUserContext();

	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<>
					<section className="flex flex-1 justify-center items-center flex-col py-10 dark-1">
						<Outlet />
					</section>

					<img
						src="/assets/images/side-img.png"
						alt="logo"
						className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
					/>
				</>
			)}
		</>
	);
};

export default AuthLayout;
