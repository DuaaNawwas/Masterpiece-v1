import axios from "axios";
import { Avatar } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";

import WeekMeals from "./WeekMeals";

export default function WeekCard({ week_num, meals_per_week }) {
	const { cookies } = useContext(AuthContext);
	const navigate = useNavigate();
	const [week, setWeek] = useState();
	const [meals, setMeals] = useState();

	useEffect(() => {
		axios
			.get(`/api/oneweek/${week_num}`, {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					// console.log(res.data.week);
					setWeek(res.data.week);
				}
			});
	}, []);
	console.log("week");
	console.log(week);
	useEffect(() => {
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
			console.log(meals);
		}
	}, [week]);

	const addMeals = () => {
		navigate("/menu", {
			state: { fromSpecificPage: true, week: week.week_num },
		});
	};

	// console.log("---------");
	// console.log("---------");
	return (
		<div className="mt-8 lg:mt-20 relative block rounded-xl border border-gray-100 py-4 px-6 shadow-xl bg-main w-full">
			{/* <div className="mt-1 text-myBlack sm:pr-8"> */}
			<div className="flex justify-between mb-4">
				<h3 className="mt-1 text-md font-semibold capitalize">
					your meals for{" "}
					<span className="text-xs text-gray-600">
						{week?.starting_date} to {week?.ending_date}
					</span>
				</h3>
				{/* <Button bgColor="bg-darkGreen" text="EDIT" /> */}
			</div>
			<div className="flex flex-wrap gap-3 justify-start pt-5">
				{meals?.map((meal, i) => {
					return (
						<WeekMeals week={week} setWeek={setWeek} meal={meal} key={i} />
					);
				})}

				{meals_per_week && meals_per_week == meals?.length ? (
					""
				) : (
					<button
						onClick={addMeals}
						className="p-1 w-20 h-20 rounded-full ring-2 ring-gray-300 flex justify-center items-center disabled:cursor-not-allowed disabled:text-gray-400"
						disabled={week?.is_delivered}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-10 h-10"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}
