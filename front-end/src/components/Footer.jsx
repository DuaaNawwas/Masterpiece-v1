import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
// // Importing aos
// import AOS from "aos";
// import "aos/dist/aos.css";
export default function Footer() {
	// // Initialize animation library
	// useEffect(() => {
	// 	AOS.init();
	// }, []);
	return (
		<div
			// data-aos="fade-up"
			// data-aos-duration="3000"
			className="relative mt-16 bg-darkGreen text-main "
		>
			<svg
				className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-darkGreen"
				preserveAspectRatio="none"
				viewBox="0 0 1440 54"
			>
				<path
					fill="currentColor"
					d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
				/>
			</svg>
			<div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
				<div
					// data-aos="zoom-in-down"
					// data-aos-duration="1000"
					className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6"
				>
					<div className="md:max-w-md lg:col-span-2">
						<a
							href="/"
							aria-label="Go home"
							title="Company"
							className="inline-flex items-center"
						>
							<img src={logo} alt="" className="w-24 rounded-md ml-32" />
						</a>
						<div className="mt-4 lg:max-w-sm">
							<p className="text-sm text-deep-purple-50">
								Easy meals subscription service makes it easy to enjoy healthy,
								home-cooked meals every day.
							</p>
							<p className="mt-4 text-sm text-deep-purple-50">
								With a variety of delicious and nutritious options to choose
								from, there's something for every taste and dietary need.
							</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-5 md:gap-1 row-gap-8 lg:col-span-4 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
						<div>
							<p className="tracking-wider font-light">QUICK LINKS</p>
							<ul className="mt-2 space-y-2">
								<li>
									<Link
										to="/"
										className="transition hover:drop-shadow-lg duration-300"
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										to="menu"
										className="transition hover:drop-shadow-lg duration-300"
									>
										Meals
									</Link>
								</li>
								<li>
									<Link
										to="subscribe"
										className="transition hover:drop-shadow-lg duration-300"
									>
										Plans
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="tracking-wider font-light uppercase">Our Company</p>
							<ul className="mt-2 space-y-2">
								<li>
									<Link
										to="/about"
										className="transition-colors duration-300 hover:drop-shadow-lg"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="transition-colors duration-300 hover:drop-shadow-lg"
									>
										Contact Us
									</Link>
								</li>
								<li>
									<Link className="transition-colors duration-300 hover:drop-shadow-lg">
										Policy
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="tracking-wide font-thin uppercase">Work with us</p>
							<ul className="mt-2 space-y-2">
								<li>
									<Link
										to="/apply"
										className="transition-colors duration-300 hover:drop-shadow-lg"
									>
										Apply
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="font-thin tracking-wide uppercase">
								Download our app
							</p>
							<ul className="mt-2 space-y-2">
								<div className="flex mt-3 w-48 h-14 bg-black text-white rounded-lg items-center justify-center">
									<div className="mr-3">
										<svg viewBox="30 336.7 120.9 129.2" width="30">
											<path
												fill="#FFD400"
												d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
											/>
											<path
												fill="#FF3333"
												d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
											/>
											<path
												fill="#48FF48"
												d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
											/>
											<path
												fill="#3BCCFF"
												d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
											/>
										</svg>
									</div>
									<div>
										<div className="text-xs">GET IT ON</div>
										<div className="text-xl font-semibold font-sans -mt-1">
											Google Play
										</div>
									</div>
								</div>

								<div className="flex mt-3 w-48 h-14 bg-black text-white rounded-xl items-center justify-center">
									<div className="mr-3">
										<svg viewBox="0 0 384 512" width="30">
											<path
												fill="currentColor"
												d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
											/>
										</svg>
									</div>
									<div>
										<div className="text-xs">Download on the</div>
										<div className="text-2xl font-semibold font-sans -mt-1">
											App Store
										</div>
									</div>
								</div>
							</ul>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
					<p className="text-sm text-gray-100">
						© Copyright 2022 Easy Meals. All rights reserved.
					</p>
					<div className="flex items-center mt-4 space-x-4 sm:mt-0">
						<a
							href="/"
							className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
								<path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
							</svg>
						</a>
						<a
							href="/"
							className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
						>
							<svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
								<circle cx="15" cy="15" r="4" />
								<path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
							</svg>
						</a>
						<a
							href="/"
							className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
								<path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
