import axios from "axios";
import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthContext";
import ModalMeal from "./ModalMeal";

export default function WeekMeals({ meal, setWeek, week }) {
	const [show, setShow] = useState(false);
	const { cookies } = useContext(AuthContext);

	const deleteMeal = (id) => {
		swal({
			title: "Are you sure?",
			text: "This meal will be deleted from your week!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const data = {
					week_id: week?.id,
					meal_id: id,
				};
				axios
					.post("/api/deletemeal", data, {
						headers: {
							Authorization: `Bearer ${cookies.Token}`,
						},
					})
					.then((res) => {
						if (res.data.status === 200) {
							console.log(res);
							setWeek(res.data.week);
							setShow(false);
						}
					});
				swal("Poof! Your meal has been deleted!", {
					icon: "success",
				});
			} else {
				swal("Your meal is safe!");
			}
		});
	};

	const closeModal = () => {
		setShow(false);
	};

	return (
		<div className="relative group">
			<ModalMeal
				id={meal?.id}
				removedIng={meal?.removedingredients}
				show={show}
				closeModal={closeModal}
				deleteMeal={deleteMeal}
			/>
			<img
				className="w-20 h-20 rounded-full object-cover hover:cursor-pointer"
				src={meal.image}
				alt=""
				onClick={() => setShow(true)}
			/>
			{week?.is_delivered === 0 ? (
				<button
					onClick={() => deleteMeal(meal.id)}
					className="hidden bg-red-600 text-white top-0 left-14 absolute  text-sm font-semibold group-hover:inline-flex items-center p-1.5 rounded-full"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-3 h-3"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>

					<span className="sr-only">Icon description</span>
				</button>
			) : (
				""
			)}
		</div>
	);
}
