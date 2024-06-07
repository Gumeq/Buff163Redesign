import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
	useDeletePost,
	useDeleteSavedPost,
	useGetCartPosts,
	useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

type PostStatsProps = {
	skins: Models.Document;
};

// CART PROBABLY COULD BE A COMPONENT, BUT I STARTED IT HERE SO DEAL WITH IT
const Cart = () => {
	const { data: currentUser } = useGetCurrentUser();
	const { data: cartSkins } = useGetCartPosts(currentUser);

	const navigate = useNavigate();

	// DELETE POST AND CART POST
	const { mutate: deleteSavePost } = useDeleteSavedPost();
	const { mutate: deletePost } = useDeletePost();

	// GET ALL THE ITEMS IN THE CART INTO AN ARRAY
	// MAKES IT EASIER FOR REACT LATER ON
	const products = currentUser?.cart.map((item: PostStatsProps) => {
		return item;
	});

	// CALCULATE TOTAL PRICE OF ITEMS
	const calculateTotalPrice = (): number => {
		// Check if the cart is present and has items
		if (currentUser?.cart && currentUser?.cart.length > 0) {
			return currentUser?.cart.reduce(
				// BASICALLY TOTAL = TOTAL+ITEM BUT THIS WAY IS FANCIER
				(total: number, item: Models.Document) => {
					// PRICE IS A STRING IN DB, CAUSE WHY NOT, SO I MAKE IT A NUMBER HERE
					// OK ACTUALLY PRICE IS STRING IN DB CAUSE THE API PRICE IS ALSO STRING SO NOT MY FAULT
					return total + parseFloat(item.skins.price);
				},
				0
			); // START ACCUMULATING FROM 0
		}
		return 0; // RETURN 0 IF CART EMPTY OR NO CART
	};
	const totalPrice = calculateTotalPrice();

	// CHECKOUT
	const handleCheckout = () => {
		// GET ALL SKINS FROM CART
		cartSkins?.documents.map((item: any) => {
			// SINCE CART IS BASICALLY A DIFFERENT COLLECTION 
			// THE ITEM AND THE USER ARE STORED IN THE CART 
			// SO WE NEED TO CHECK WHICH ITEMS BELONG TO THE USER
			// IS THERE AN EASIER WAY? PROBABLY
			// DID I FIND IT? NO 
			if (item.user.$id === currentUser?.$id) {
				// IF THE ITEM IN THE CART BELONGS TO THE USER
				// console.log(item.skins.$id);
				return deletePost({ postId: item.skins.$id });
				// DELETE THE ITEM FROM THE DATABASE ENTIRELY
				// NO REASON TO KEEP IT 
				// NO TAKESIES BACKSIES
			}
		});
		navigate("/market");
	};

	const removeProductById = (productId: string) => {
		return deleteSavePost(productId);
	};

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
							onClick={() => handleCheckout()}
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
