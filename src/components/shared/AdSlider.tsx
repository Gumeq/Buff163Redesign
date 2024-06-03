import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const AdSlider = () => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 2000,
		arrows: false,
	};
	return (
		<Slider {...settings} className=" h-80 bg-dark-3">
			<div className="bg-dark-3 h-full flex fex-row items-center px-64 gap-20">
				<div className=" h-full flex flex-col ">
					<h1 className="text-2xl font-bold">
						Stay up to date with our blog
					</h1>
					<h2>
						Read more about the latest updates, skin trading news
						beautiful curated loadouts.
					</h2>
					<div></div>
				</div>
				<div className="">
					<img src="" alt="SKINS" />
				</div>
			</div>
			<div className="bg-green-500">
				<h3>2</h3>
			</div>
			<div className="bg-blue-500">
				<h3>3</h3>
			</div>
		</Slider>
	);
};
export default AdSlider;
