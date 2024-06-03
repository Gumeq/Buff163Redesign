import { useUserContext } from "@/context/AuthContext";
import React, { useState } from "react";

function ProfilePicture() {
	// State to manage visibility of the overlay
	const [showOverlay, setShowOverlay] = useState(false);

	// Function to toggle the visibility
	const toggleOverlay = () => {
		setShowOverlay(!showOverlay);
	};

	const { user } = useUserContext();

	return (
		<div>
			{/* This is the div that you click to show/hide the overlay */}
			<div
				onClick={toggleOverlay}
				style={{
					width: "200px",
					height: "200px",
					backgroundColor: "blue",
					position: "relative",
				}}
			>
				Click me
				{showOverlay && (
					<div
						style={{
							width: "100px",
							height: "100px",
							backgroundColor: "red",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						Overlay Div
					</div>
				)}
			</div>
		</div>
	);
}
export default ProfilePicture;
