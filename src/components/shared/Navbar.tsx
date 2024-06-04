import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

// Navbar

import { useEffect } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const navigation = [
	{ name: "Market", href: "/market", current: true },
	{ name: "Sell", href: "/create-post", current: true },
];

function classNames(
	...classes: (string | undefined | null | boolean)[]
): string {
	return classes.filter(Boolean).join(" ");
}

const navbar = () => {
	const { user } = useUserContext();

	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	return (
		<Disclosure as="nav" className="bg-dark-3">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-dark-4 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									{open ? (
										<XMarkIcon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<Bars3Icon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</DisclosureButton>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<a
										className="h3-bold text-slate-100"
										onClick={() => navigate("/")}
									>
										BUFF
										<span className="text-orange-500">
											163
										</span>
									</a>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												onClick={() =>
													navigate(item.href)
												}
												className={classNames(
													item.current
														? " text-white"
														: "text-gray-300 hover:bg-dark-4 hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium"
												)}
												aria-current={
													item.current
														? "page"
														: undefined
												}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="absolute -inset-1.5" />
											<img
												className="h-8 w-8 rounded-full"
												src={user.imageUrl}
												alt=""
											/>
										</MenuButton>
									</div>
									<Transition
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-dark-4 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<MenuItem>
												{({ focus }) => (
													<Link
														to={`/profile/${user.id}`}
														className={classNames(
															focus
																? "bg-dark-5"
																: "",
															"block px-4 py-2 text-sm text-white"
														)}
													>
														Profile
													</Link>
												)}
											</MenuItem>
											<MenuItem>
												{({ focus }) => (
													<p
														className={classNames(
															focus
																? "bg-dark-5"
																: "",
															"block px-4 py-2 text-sm text-white"
														)}
														onClick={() =>
															navigate(
																"/create-post"
															)
														}
													>
														Sell Skins
													</p>
												)}
											</MenuItem>
											<MenuItem>
												{({ focus }) => (
													<p
														className={classNames(
															focus
																? "bg-dark-5"
																: "",
															"block px-4 py-2 text-sm text-white"
														)}
														onClick={() =>
															signOut()
														}
													>
														Sign out
													</p>
												)}
											</MenuItem>
										</MenuItems>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									onClick={() => navigate(item.href)}
									className={classNames(
										item.current
											? "bg-dark-4 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={
										item.current ? "page" : undefined
									}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
	// 	<nav classNameName="flex flex-col divide-y w-full">
	// 		<div classNameName="h-20 w-full bg-dark-3 flex flex-row items-center justify-between px-4 lg:px-32">
	// 			<div classNameName="flex flex-row gap-8 items-center">
	// <a classNameName="h3-bold text-slate-100" href="/">
	// 	BUFF<span classNameName="text-orange-500">163</span>
	// </a>
	// 				<p
	// 					classNameName="text-lg font-semibold hidden md:block"
	// 					onClick={() => navigate("/Market")}
	// 				>
	// 					MARKET
	// 				</p>
	// 			</div>
	// 			<div classNameName="hidden md:block">
	// 				<SearchBar />
	// 			</div>
	// 			<div classNameName="flex flex-row gap-8 items-center">
	// 				<a
	// 					classNameName="text-xl font-semibold relative"
	// 					onClick={() => navigate("/create-post")}
	// 				>
	// 					SELL
	// 					<span classNameName="absolute -top-1 -right-1 flex h-3 w-3">
	// 						<span classNameName="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
	// 						<span classNameName="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
	// 					</span>
	// 				</a>
	// 				<div classNameName="">
	// 					{/* <img
	// 						src="/assets/icons/bag.svg"
	// 						alt=""
	// 						classNameName="w-8 h-8"
	// 					/> */}
	// 					<h2 classNameName="text-lg font-semibold">CART</h2>
	// 				</div>
	// 				<ProfilePicture imageUrl={user.imageUrl}></ProfilePicture>
	// 			</div>
	// 		</div>
	// 	</nav>
};

export default navbar;
