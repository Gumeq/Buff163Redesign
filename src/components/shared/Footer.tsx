const footer = () => {
	return (
		<div className="mx-auto max-w-7xl h-56 bg-dark-32 flex flex-row justify-between items-center ">
			<div>
				<h1 className="h2-bold text-slate-100">
					BUFF<span className="text-orange-500">163</span>
				</h1>
			</div>
			<div className=" flex flex-col gap-8 items-center">
				<div className="flex flex-row gap-16 text-lg">
					<p>About Us</p>
					<p>FAQ</p>
					<p>Contact Us</p>
					<p>Blog</p>
				</div>
				<div className="flex flex-row gap-8">
					<img
						src="/assets/icons/FB.png"
						alt=""
						className="footer-icon"
					/>
					<img
						src="/assets/icons/DISCORD.png"
						alt=""
						className="footer-icon"
					/>
					<img
						src="/assets/icons/INSTAGRAM.png"
						alt=""
						className="footer-icon"
					/>
					<img
						src="/assets/icons/REDDIT.png"
						alt=""
						className="footer-icon"
					/>
					<img
						src="/assets/icons/TIKTOK.png"
						alt=""
						className="footer-icon"
					/>
					<img
						src="/assets/icons/X.png"
						alt=""
						className="footer-icon"
					/>
					<img
						src="/assets/icons/YT.png"
						alt=""
						className="footer-icon"
					/>
				</div>
			</div>
			<div className="text-center">
				<p>
					© 2024 BUFF163
					<br />
					Handcrafted by Wedia{" "}
				</p>
			</div>
		</div>
	);
};

export default footer;
