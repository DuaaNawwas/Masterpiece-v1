import { Carousel } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import Button from "../Button";
import CategoryCard from "./CategoryCard";
import chicken from "../../images/chicken.png";
import meat from "../../images/meat.png";
import pescatarian from "../../images/pescatarian.png";

// Importing aos
import AOS from "aos";
import "aos/dist/aos.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { DataContext } from "../../context/DataContext";
import { Link, useNavigate } from "react-router-dom";

export default function OurMenus() {
	// Initialize animation library
	useEffect(() => {
		AOS.init();
	}, []);

	// Get categories from context
	const { categories } = useContext(DataContext);

	// navigation
	const navigate = useNavigate();
	return (
		<>
			<div className="flex flex-col items-center gap-10 px-10">
				<p
					className="text-darkRed text-4xl drop-shadow-md"
					data-aos="fade-up"
					data-aos-duration="1000"
				>
					Our Menus
				</p>
				<div
					className="block container"
					data-aos="fade-up"
					data-aos-duration="1000"
					data-aos-anchor-placement="bottom-bottom"
				>
					<Swiper
						slidesPerView={3}
						slidesPerGroup={3}
						spaceBetween={20}
						pagination={{
							clickable: true,
						}}
						// autoplay={{
						// 	delay: 2500,
						// 	disableOnInteraction: false,
						// }}
						// navigation={true}
						loop={true}
						// loopFillGroupWithBlank={true}
						centeredSlides={true}
						modules={[Pagination, Navigation, Autoplay]}
						className="mySwiper"
					>
						{categories?.map((categ) => {
							return (
								<SwiperSlide>
									<div class="group relative mb-10">
										<div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
											<img
												src={categ?.image}
												alt=""
												class="h-full w-full object-cover object-center group-hover:scale-110 ease-in duration-100"
											/>
										</div>
										<h3 class="mt-6 text-sm text-gray-500">Category</h3>
										<p class="text-base font-semibold text-gray-900">
											{categ?.name}
										</p>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				<Button
					bgColor="bg-rusty"
					hoverColor="hover:bg-rustySh"
					text="BROWSE MENU"
					padding="px-10"
					dataaos="zoom-in-up"
					dataaosduration="1000"
					onClick={() => navigate("/menu")}
				/>
			</div>
			<div className="text-myBlack border-t-4 h-2 w-1/2 mx-auto my-10"></div>
		</>
	);
}
