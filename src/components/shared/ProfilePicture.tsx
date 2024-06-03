import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";

interface ProfileIconProps {
	imageUrl: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ imageUrl }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<img
				src={imageUrl}
				alt="Profile"
				style={{ width: 50, height: 50, borderRadius: "50%" }}
				onClick={toggleDropdown}
				aria-haspopup="true"
				aria-expanded={isOpen}
			/>
			{isOpen && (
				<div className="mt-2 z-20 absolute top-[100%] right-0 bg-dark-4 p-2 rounded">
					<ul style={{ listStyleType: "none", padding: 0 }}>
						<li>
							<Button
								variant="default"
								className="text-lg font-bold"
							>
								My Items
							</Button>
						</li>
						<li>
							<Button
								variant="default"
								className="text-lg font-bold"
							>
								Profile
							</Button>
						</li>
						<li>
							{/* log Out button */}
							<Button
								variant="default"
								onClick={() => signOut()}
								className="text-lg font-bold"
							>
								Logout
							</Button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default ProfileIcon;
