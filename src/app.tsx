import "./globals.css";
import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import { Home } from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import CreatePost from "./_root/pages/CreatePost";
import Market from "./_root/pages/Market";

const App = () => {
	return (
		<main className="flex h-screen">
			<Routes>
				{/* {Public Routes} */}
				<Route element={<AuthLayout />}>
					<Route path="/sign-in" element={<SigninForm />} />
					<Route path="/sign-up" element={<SignupForm />} />
				</Route>

				{/* {Private Routes} */}
				<Route element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/market" element={<Market />} />
				</Route>
			</Routes>

			<Toaster />
		</main>
	);
};

export default App;
