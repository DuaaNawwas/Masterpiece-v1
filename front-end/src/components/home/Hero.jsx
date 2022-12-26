import React, { useEffect } from "react";
import Button from "../Button";
import hero from "../../images/hero.png";
import Features from "./Features";

// Importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function Hero() {
	const navigate = useNavigate();
	// Initialize animation library
	useEffect(() => {
		AOS.init();
	}, []);

	const goToPlans = () => {
		return navigate("/subscribe");
	};
	return (
		<>
			<div className="relative z-0 bg-hero-bg bg-cover bg-top bg-fixed bg-no-repeat">
				<div className="z-0 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
					<div className="relative py-28 max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl text-center">
						<h2
							data-aos="fade-right"
							data-aos-duration="1000"
							className="mb-12 mt-16 text-4xl tracking-wide text-darkRed sm:text-6xl sm:leading-none drop-shadow-lg"
						>
							Unlock Your Cooking <br className="hidden md:block" />
							Potential
						</h2>

						<Button
							textColor="text-main"
							bgColor="bg-darkYellow"
							hoverColor="hover:bg-lemonSh"
							text="DISCOVER PLANS"
							padding="px-12"
							dataaos="fade-left"
							dataaosduration="1000"
							onClick={goToPlans}
						/>
					</div>
				</div>
			</div>
			<Features />
		</>
	);
}
