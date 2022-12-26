import React, { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";

export default function AddNutrientsForm() {
	const { handleInputMeals, mealErrors, mealData } = useContext(AdminContext);

	return (
		<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="py-3 px-6">
						Nutrition
					</th>
					<th scope="col" className="py-3 px-6">
						Per Serving
					</th>
				</tr>
			</thead>
			<tbody>
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Calories *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="calories"
							onChange={handleInputMeals}
							value={mealData?.calories}
							id="calories"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						Kcal
					</td>
					<small className="text-red-500">{mealErrors?.calories}</small>
				</tr>
				<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Fat *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="fat"
							onChange={handleInputMeals}
							value={mealData?.fat}
							id="fat"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						g
					</td>
					<small className="text-red-500">{mealErrors?.fat}</small>
				</tr>
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Saturated Fat *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="saturated_fat"
							onChange={handleInputMeals}
							value={mealData?.saturated_fat}
							id="saturated_fat"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						g
					</td>
					<small className="text-red-500">{mealErrors?.saturated_fat}</small>
				</tr>
				<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Carbohydrates *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="carbs"
							onChange={handleInputMeals}
							value={mealData?.carbs}
							id="carbs"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						g
					</td>
					<small className="text-red-500">{mealErrors?.carbs}</small>
				</tr>
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Sugar *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="sugar"
							onChange={handleInputMeals}
							value={mealData?.sugar}
							id="sugar"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						g
					</td>
					<small className="text-red-500">{mealErrors?.sugar}</small>
				</tr>
				<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Dietary Fiber *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="fiber"
							onChange={handleInputMeals}
							value={mealData?.fiber}
							id="fiber"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						g
					</td>
					<small className="text-red-500">{mealErrors?.fiber}</small>
				</tr>
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Protein *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="protein"
							onChange={handleInputMeals}
							value={mealData?.protein}
							id="protein"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						g
					</td>
					<small className="text-red-500">{mealErrors?.protein}</small>
				</tr>
				<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Cholesterol *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="cholesterol"
							onChange={handleInputMeals}
							value={mealData?.cholesterol}
							id="cholesterol"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						mg
					</td>
					<small className="text-red-500">{mealErrors?.cholesterol}</small>
				</tr>
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<th
						scope="row"
						className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						Sodium *
					</th>
					<td className="py-1 px-6 flex gap-2 items-center">
						<input
							type="text"
							name="sodium"
							onChange={handleInputMeals}
							value={mealData?.sodium}
							id="sodium"
							className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						mg
					</td>
					<small className="text-red-500">{mealErrors?.sodium}</small>
				</tr>
			</tbody>
		</table>
	);
}
