import React, { useEffect } from "react";
import about1 from "../images/about1.png";
import about2 from "../images/about2.png";
// Importing aos
import AOS from "aos";
import "aos/dist/aos.css";
export default function About() {
	// Initialize animation library
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div className=" px-10 xl:px-28">
			<div className="max-w-screen-xl px-4 py-16 sm:px-1 lg:px-2">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
					<div className="w-11/12 xl:w-9/12 sm:h-80 lg:h-full">
						<img
							data-aos="fade-right"
							data-aos-duration="1500"
							alt=""
							src={about1}
							className=" inset-0 h-full w-full object-cover"
						/>
					</div>
					<div
						data-aos="fade-left"
						data-aos-duration="1500"
						className="lg:py-24"
					>
						<h2 className="text-3xl text-myBlack font-bold sm:text-4xl">
							Meal Prep Kits
						</h2>

						<p className="mt-4 text-xl text-gray-600">
							Our meal prep kit subscription service is all about making healthy
							eating easy and convenient. No more spending hours meal planning
							and grocery shopping, or sacrificing taste for nutrition. We take
							care of the hard work for you by sourcing the freshest ingredients
							and pre-measuring everything you need to prepare delicious,
							healthy meals at home. Each week, we offer a wide selection of
							meals to choose from, so you can mix and match to find the perfect
							fit for your taste and dietary needs. All of our recipes are easy
							to follow and can be prepared in just a few simple steps. Plus,
							with the convenience of having everything you need delivered right
							to your door, you can save time and effort while still enjoying
							the satisfaction of cooking at home.
						</p>
					</div>
				</div>
			</div>

			<div className="text-myBlack border-t-4 h-2 w-1/2 mx-auto my-10"></div>

			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2  items-center justify-items-end">
					<div
						data-aos="fade-right"
						data-aos-duration="1500"
						className="lg:py-24"
					>
						<h2 className="text-3xl text-myBlack font-bold sm:text-4xl">
							Try Us!
						</h2>

						<p className="mt-4 text-xl text-gray-600">
							Are you tired of spending hours meal planning and grocery
							shopping, only to end up with uninspired and unhealthy meals? Or
							maybe you're struggling to find the time and energy to cook
							healthy meals at home. Our meal prep kit subscription service is
							here to help. We offer a wide selection of delicious and
							nutritious meals that can be easily prepared in just a few simple
							steps.
						</p>
						<p className="mt-4 text-xl text-gray-600">
							All of our ingredients are carefully sourced and pre-measured, so
							you can save time and effort on meal planning and grocery shopping
							while still enjoying the satisfaction of cooking at home. With our
							service, you can enjoy the convenience of having everything you
							need delivered right to your door. No more stressing about what to
							make for dinner or sacrificing taste for nutrition. Our selection
							of meals is sure to have something for every taste and dietary
							need, whether you're a busy professional, a health-conscious
							parent, or just looking to add some variety to your meal routine.
							So why wait? Sign up for our meal prep kit subscription today and
							discover how enjoyable and stress-free healthy eating can be. Give
							it a try and see the difference it can make in your life.
						</p>
					</div>
					<div className="w-11/12 xl:w-9/12 sm:h-80 lg:h-full">
						<img
							data-aos="fade-left"
							data-aos-duration="1500"
							alt=""
							src={about2}
							className=" inset-0 h-full w-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
