import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import { Badge, Button } from "flowbite-react";
import MealOrder from "./MealOrder";
import NotFound from "../../../pages/NotFound";

export default function SingleWeek() {
	const { id } = useParams();
	const [week, setWeek] = useState();
	const [meals, setMeals] = useState();
	const [position, setPosition] = useState();
	useEffect(() => {
		axios.get(`/api/orders/week/${id}`).then((res) => {
			if (res.data.status === 200) {
				console.log("res.data.week");
				console.log(res.data.week);
				if (res.data.week) {
					setWeek(res.data.week);
					setPosition(JSON.parse(res.data.week.subscription.user.address));
				} else {
					setWeek("No Data");
				}
			}
		});
	}, []);

	useEffect(() => {
		console.log(week);
		if (week) {
			const weekMeals = Object.keys(week)
				.filter(
					(key) => key.includes("meal") && key.length === 5 && week[key] != null
				)
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: week[key],
					});
				}, {});
			console.log(weekMeals);

			const allMeals = Object.values(weekMeals);
			setMeals(allMeals);
		}
	}, [week]);

	const handleDelivery = (status) => {
		const data = {
			id: id,
			is_delivered: status,
		};
		axios.post("/api/makeDelivered", data).then((res) => {
			if (res.data.status === 200) {
				setWeek(res.data.week);
				setPosition(JSON.parse(res.data.week.subscription.user.address));
			}
		});
	};

	if (week === "No Data") {
		return (
			<div className="flex-1 flex justify-center items-center">
				<NotFound />
			</div>
		);
	}
	return (
		<div className="flex flex-col w-full p-10 gap-10 text-[10px] md:text-sm">
			<section className="w-full md:w-8/12 m-auto p-6  bg-white rounded-md shadow-md dark:bg-gray-800 ">
				<h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
					Manage Orders
				</h2>
				<div className="w-full flex flex-wrap md:justify-around">
					<div className="flex flex-col gap-5 p-5 ">
						<span className="text-darkRed font-bold text-lg">User Info</span>
						<span className="flex flex-col md:flex-row gap-5">
							<img
								src={week?.subscription.user.image}
								className="rounded-full w-10 h-10"
								alt=""
								referrerPolicy="no-referrer"
							/>
							<span className="flex flex-col w-full">
								<span>
									{week?.subscription?.user.first_name}{" "}
									{week?.subscription?.user.last_name}
								</span>
								<span>{week?.subscription?.user.email}</span>
								<span>{week?.subscription?.user.phone}</span>
							</span>
						</span>
						<div className="flex flex-col w-full">
							<span className="whitespace-nowrap">
								City: {week?.subscription.user.city}
							</span>
							<span className="whitespace-nowrap">
								Street: {week?.subscription.user.street}
							</span>
							<span className="whitespace-nowrap">
								Building: {week?.subscription.user.building}
							</span>
							<span className="whitespace-nowrap">
								Floor: {week?.subscription.user.floor}
							</span>
							<LoadScript
								googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
							>
								<GoogleMap
									id="my-map"
									mapContainerStyle={{
										height: "100px",
										width: "200px",
									}}
									zoom={15}
									center={position}
								>
									<MarkerF position={position} />
								</GoogleMap>
							</LoadScript>
						</div>
					</div>
					<div className="flex flex-col gap-5 p-5 ">
						<span className="text-darkRed font-bold text-lg">
							Week Information
						</span>
						<div className="flex flex-col whitespace-nowrap">
							<span className="">
								Meals per week: {week?.subscription?.meals_per_week}
							</span>
							<span>People number: {week?.subscription?.people_num}</span>
							<span>
								Servings:{" "}
								{week?.subscription?.people_num *
									week?.subscription?.meals_per_week}
							</span>
							<span>
								Date: {week?.starting_date} to {week?.ending_date}
							</span>
							<span>
								Day of delivery:{" "}
								{week?.day_of_delivery === "0"
									? "Sunday"
									: week?.day_of_delivery === "1"
									? "Monday"
									: week?.day_of_delivery === "2"
									? "Tuesday"
									: week?.day_of_delivery === "3"
									? "Wednesday"
									: week?.day_of_delivery === "4"
									? "Thurdsay"
									: week?.day_of_delivery === "5"
									? "Friday"
									: week?.day_of_delivery === "6"
									? "Saturday"
									: ""}
							</span>
							<span className="flex items-center gap-2">
								Status:
								{week?.is_delivered === 0 ? (
									<>
										<Badge color="warning">Pending</Badge>
										<Button
											onClick={() => handleDelivery(1)}
											size="xs"
											color="success"
										>
											Deliver
										</Button>
									</>
								) : (
									<>
										<Badge color="success">Delivered</Badge>
										<Button
											onClick={() => handleDelivery(0)}
											size="xs"
											color="warning"
										>
											Pending
										</Button>
									</>
								)}
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full md:w-8/12 m-auto p-6  bg-white rounded-md shadow-md dark:bg-gray-800 ">
				<h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
					Meals
				</h2>
				<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
					{meals?.map((meal, i) => {
						return <MealOrder meal={meal} key={i} />;
					})}
				</div>
			</section>
		</div>
	);
}
