import axios from "axios";
import React from "react";
import { useContext } from "react";
import swal from "sweetalert";
import MealCardDash from "../../components/admin/meals/MealCardDash";
import { AdminContext } from "../../context/AdminContext";

export default function Meals() {
	const { meals, setMeals } = useContext(AdminContext);

	const handleDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "This meal will be deleted!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.delete(`/api/meal/${id}`).then((res) => {
					if (res.data.status === 200) {
						setMeals(res.data.meals);
					}
				});
				swal("Poof! meal has been deleted!", {
					icon: "success",
				});
			} else {
				swal("Your meal is safe!");
			}
		});
	};
	return (
		<section className="flex flex-wrap justify-center gap-10 w-9/12 my-5 mx-auto p-6  bg-white rounded-md shadow-md dark:bg-gray-800">
			{meals?.map((meal, i) => {
				return <MealCardDash handleDelete={handleDelete} meal={meal} key={i} />;
			})}
		</section>
	);
}
