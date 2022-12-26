import React, { useEffect } from "react";
// Importing aos
import AOS from "aos";
import "aos/dist/aos.css";

export default function FeatureCard(props) {
	// Initialize animation library
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div
			data-aos="zoom-in-up"
			data-aos-duration="1000"
			className="relative block rounded-xl bg-white border border-gray-100 px-4 pb-2 shadow-xl w-1/4 sm:w-1/2 md:w-3/4 text-center"
		>
			<div>
				<lord-icon
					src={`https://cdn.lordicon.com/${props.img}.json`}
					trigger="loop"
					state="hover"
					style={{ width: "100px", height: "100px", marginTop: "-5rem" }}
				></lord-icon>

				<h3 className="capitalize text-xs md:text-lg text-myBlack ">
					{props.text}
				</h3>
			</div>
		</div>
	);
}
