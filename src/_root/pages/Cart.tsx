import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
	useDeleteSavedPost,
	useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

type PostStatsProps = {
	skins: Models.Document;
};

const Cart = () => {
	const { data: currentUser } = useGetCurrentUser();
	const navigate = useNavigate();

	const { mutate: deleteSavePost } = useDeleteSavedPost();

	const products = currentUser?.cart.map((item: PostStatsProps) => {
		return item;
	});

	const calculateTotalPrice = (): number => {
		// Check if the cart is present and has items
		if (currentUser?.cart && currentUser?.cart.length > 0) {
			return currentUser?.cart.reduce(
				(total: number, item: Models.Document) => {
					return total + parseFloat(item.skins.price);
				},
				0
			); // Start accumulating from 0
		}
		return 0; // Return 0 if cart is empty or not present
	};

	const removeProductById = (productId: string) => {
		return deleteSavePost(productId);
	};

	const totalPrice = calculateTotalPrice();
	return (
		<div className=" py-4 mx-auto w-7xl h-full lg:h-3/4 flex justify-center">
			<div className="flex h-full flex-col lg:flex-row overflow-y-auto bg-dark-3 rounded-xl">
				<div className="overflow-y-auto px-4 py-6 sm:px-6 custom-scrollbar">
					<div className="flex items-start justify-between">
						<h1 className="text-lg font-medium text-white">
							Skins Cart
						</h1>
					</div>
					<div className="mt-8">
						<div className="flow-root">
							<ul role="list" className="flex flex-col gap-4">
								{products &&
									products.map((product: Models.Document) => (
										<li
											key={product.$id}
											className="flex py-6 bg-dark-4 p-4 rounded-md"
										>
											<div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md  bg-dark-5">
												<img
													src={product.skins.imageUrl}
													alt={product.skins.imageAlt}
													className="h-full w-full object-cover object-center"
												/>
											</div>

											<div className="ml-4 flex flex-1 flex-col">
												<div>
													<div className="flex justify-between text-base font-medium text-white">
														<div>
															<h3>
																<p>
																	{product
																		.skins
																		.name ||
																		product
																			.skins
																			.$id}
																</p>
																<p className="text-gray-400">
																	{
																		product
																			.skins
																			.wear
																	}
																</p>
															</h3>
														</div>
														<p className="ml-4">
															{
																product.skins
																	.price
															}{" "}
															$
														</p>
													</div>
												</div>
												<div className="flex flex-1 items-end  text-sm">
													<div className="flex">
														<button
															type="button"
															className="font-medium text-gray-300"
															onClick={() =>
																removeProductById(
																	product.$id
																)
															}
														>
															Remove
														</button>
													</div>
												</div>
											</div>
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>

				<div className="border-t lg:border-0 border-gray-200 px-4 py-6 sm:px-6 max-w-[500px]  ">
					<div className="flex justify-between text-base font-medium text-white">
						<p>Subtotal</p>
						<p>{totalPrice.toFixed(2)} $</p>
					</div>
					<p className="mt-0.5 text-sm text-gray-500">
						Taxes calculated at checkout.
					</p>
					<div className="mt-6">
						<Button
							type="button"
							className="shad-button_primary w-full h-14 rounded-lg flex flex-row items-center justify-center"
							onClick={() => console.log("Checkout")}
						>
							<div className="h3-bold">Checkout</div>
						</Button>
					</div>
					<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
						<p>
							or{" "}
							<button
								type="button"
								className="font-medium text-orange-500 "
								onClick={() => navigate("/market")}
							>
								Continue Shopping
								<span aria-hidden="true"> &rarr;</span>
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
