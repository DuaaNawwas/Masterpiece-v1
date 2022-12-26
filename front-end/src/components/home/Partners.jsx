import React, { useEffect } from "react";
import partner from "../../images/partner.png";

// Importing aos
import AOS from "aos";
import "aos/dist/aos.css";

export default function Partners() {
	// Initialize animation library
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div className="flex flex-col items-center">
			<p
				data-aos="fade-up"
				data-aos-duration="1000"
				className="text-darkRed text-4xl drop-shadow-md"
			>
				Our Partners
			</p>
			<div className="flex flex-wrap py-20 justify-center items-center gap-32">
				<img
					src={partner}
					alt=""
					className="w-40"
					data-aos="fade-up-right"
					data-aos-duration="1000"
				/>
				<img
					src={partner}
					alt=""
					className="w-40"
					data-aos="zoom-in"
					data-aos-duration="1000"
				/>
				<img
					src={partner}
					alt=""
					className="w-40"
					data-aos="fade-up-left"
					data-aos-duration="1000"
				/>
			</div>
		</div>
	);
}
