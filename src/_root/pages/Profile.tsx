import {
	Route,
	Routes,
	Link,
	Outlet,
	useParams,
	useLocation,
} from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import GridPostList from "@/components/shared/GridPostList";
import { Loader } from "lucide-react";

interface StabBlockProps {
	value: string | number;
	label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
	<div className="flex-center gap-2">
		<p className="small-semibold lg:body-bold text-primary-500">{value}</p>
		<p className="small-medium lg:base-medium text-light-2">{label}</p>
	</div>
);

const Profile = () => {
	const { id } = useParams();
	const { user } = useUserContext();
	const { pathname } = useLocation();

	const { data: currentUser } = useGetUserById(id || "");

	if (!currentUser)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);

	console.log(currentUser.skins);

	return (
		<div className="profile-container">
			<div className="profile-inner_container">
				<div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
					<img
						src={
							currentUser.imageUrl ||
							"/assets/icons/profile-placeholder.svg"
						}
						alt="profile"
						className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
					/>
					<div className="flex flex-col flex-1 justify-between md:mt-2">
						<div className="flex flex-col w-full">
							<h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
								@{currentUser.username}
							</h1>
						</div>

						<div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
							<StatBlock
								value={currentUser.skins.length}
								label="Posts"
							/>
						</div>
					</div>
				</div>
			</div>

			{currentUser.$id === user.id && (
				<div className="flex max-w-5xl w-full">
					<Link
						to={`/profile/${id}`}
						className={`profile-tab rounded-lg ${
							pathname === `/profile/${id}` && "!bg-dark-3"
						}`}
					>
						Skins
					</Link>
				</div>
			)}
			<Routes>
				<Route
					index
					element={
						<GridPostList
							skins={currentUser.skins}
							showUser={false}
						/>
					}
				/>
			</Routes>
			<Outlet />
		</div>
	);
};

export default Profile;
