import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { AdminContext } from "../../context/AdminContext";
import { DataContext } from "../../context/DataContext";

export default function EditMeal() {
	const { id } = useParams();
	const [meal, setMeal] = useState();
	const [url, setUrl] = useState(null);
	const { categories } = useContext(DataContext);
	const { setMeals } = useContext(AdminContext);
	useEffect(() => {
		axios.get(`/api/meals/${id}`).then((res) => {
			if (res.data.status === 200) {
				setMeal(res.data.meal);
			}
		});
	}, []);

	const handleEditMeal = (e, oldValue) => {
		if (
			e.target.value === oldValue ||
			e.target.value.replace(/ /g, "") === ""
		) {
			return;
		}

		const data = {
			id: meal?.id,
			key: e.target.name,
			value: e.target.value,
		};

		axios.put("/api/editMeal", data).then((res) => {
			if (res.data.status === 200) {
				setMeals(res.data.meals);
				swal("Edited successfully", "", "success");
			}
		});
	};
	const handleEditIngredients = (e, id, oldValue) => {
		if (
			e.target.value === oldValue ||
			e.target.value.replace(/ /g, "") === ""
		) {
			return;
		}

		const data = {
			id: id,
			key: e.target.name,
			value: e.target.value,
		};

		axios.put("/api/editIngredients", data).then((res) => {
			if (res.data.status === 200) {
				setMeals(res.data.meals);
				swal("Edited successfully", "", "success");
			}
		});
	};
	const handleEditIngredientsOptional = (e, id) => {
		const data = {
			id: id,
			key: e.target.name,
			value: e.target.checked,
		};

		axios.put("/api/editIngredients", data).then((res) => {
			if (res.data.status === 200) {
				setMeals(res.data.meals);
				swal("Edited successfully", "", "success");
			}
		});
	};
	const handleEditNutrients = (e, id, oldValue) => {
		if (
			e.target.value === oldValue ||
			e.target.value.replace(/ /g, "") === ""
		) {
			return;
		}

		const data = {
			id: id,
			key: e.target.name,
			value: e.target.value,
		};

		axios.put("/api/editNutrients", data).then((res) => {
			if (res.data.status === 200) {
				setMeals(res.data.meals);
				swal("Edited successfully", "", "success");
			}
		});
	};

	const handleMealImage = (e) => {
		let image = e.target.files[0];
		setUrl(URL.createObjectURL(image));
		let formData = new FormData();
		formData.append("image", image);
		formData.append("id", meal?.id);

		axios
			.post("/api/editMealImage", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setMeals(res.data.meals);
					console.log(res);
				} else {
					swal("Oops!", res.data.image[0], "error");

					console.log(res);
				}
			})
			.catch((res) => {
				if (res.response.status === 413) {
					swal("Oops!", res.response.statusText, "error");
				}
			});
	};
	return (
		<div className="py-10 mx-auto flex flex-col w-7/12">
			<div>
				<div className="mt-5 md:col-span-2 md:mt-0">
					<div className="shadow sm:overflow-hidden sm:rounded-md">
						<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700"
									>
										Name *
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<input
											type="text"
											name="name"
											id="name"
											defaultValue={meal?.name}
											onBlur={(e) => handleEditMeal(e, meal?.name)}
											className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									{/* <small className="text-red-500">{mealErrors?.name}</small> */}
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="category"
										className="block text-sm font-medium text-gray-700"
									>
										Category *
									</label>
									<select
										id="category"
										name="category_id"
										// defaultValue={meal?.category_id}
										// defaultChecked={meal?.category_id}
										onChange={(e) => handleEditMeal(e, meal?.category_id)}
										// autoComplete="country-name"
										className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									>
										<option defaultValue="">Select category</option>
										{categories?.map((categ, i) => {
											return (
												<option
													selected={meal?.category_id === categ.id}
													value={categ?.id}
													key={i}
												>
													{categ?.name}
												</option>
											);
										})}
									</select>
									{/* <small className="text-red-500">
										{mealErrors?.category_id}
									</small> */}
								</div>
							</div>
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="prep_time"
										className="block text-sm font-medium text-gray-700"
									>
										Preparation Time *
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<input
											type="text"
											name="prep_time"
											defaultValue={meal?.prep_time}
											onBlur={(e) => handleEditMeal(e, meal?.prep_time)}
											id="prep_time"
											className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									{/* <small className="text-red-500">
										{mealErrors?.prep_time}
									</small> */}
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="note"
										className="block text-sm font-medium text-gray-700"
									>
										Note
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<input
											type="text"
											name="note"
											defaultValue={meal?.note}
											onBlur={(e) => handleEditMeal(e, meal?.note)}
											id="note"
											className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									{/* <small className="text-red-500">{mealErrors?.note}</small> */}
								</div>
							</div>
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="cost"
										className="block text-sm font-medium text-gray-700"
									>
										Cost
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<input
											type="text"
											name="cost"
											defaultValue={meal?.cost}
											onBlur={(e) => handleEditMeal(e, meal?.cost)}
											id="cost"
											className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									{/* <small className="text-red-500">{mealErrors?.cost}</small> */}
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="tags"
										className="block text-sm font-medium text-gray-700"
									>
										Tags
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<input
											type="text"
											name="tags"
											defaultValue={meal?.tags}
											onBlur={(e) => handleEditMeal(e, meal?.tags)}
											id="tags"
											className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									{/* <small className="text-red-500">{mealErrors?.tags}</small> */}
								</div>
							</div>

							<div className="grid grid-cols-3 gap-6">
								<div className="col-span-3">
									<label
										htmlFor="short-desc"
										className="block text-sm font-medium text-gray-700"
									>
										Short Description *
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<input
											type="text"
											name="short_desc"
											defaultValue={meal?.short_desc}
											onBlur={(e) => handleEditMeal(e, meal?.short_desc)}
											id="short-desc"
											className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
									{/* <small className="text-red-500">
										{mealErrors?.short_desc}
									</small> */}
								</div>
							</div>

							<div>
								<label
									htmlFor="long_description"
									className="block text-sm font-medium text-gray-700"
								>
									Long Description *
								</label>
								<div className="mt-1">
									<textarea
										id="long_description"
										name="long_desc"
										defaultValue={meal?.long_desc}
										onBlur={(e) => handleEditMeal(e, meal?.long_desc)}
										rows={3}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								{/* <small className="text-red-500">{mealErrors?.long_desc}</small> */}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Image *
								</label>
								<div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
									<div className="space-y-1 text-center">
										{url ? (
											<img src={url} className="mx-auto h-12 w-12" />
										) : (
											<img src={meal?.image} className="mx-auto h-12 w-12" />
										)}
										<div className="flex justify-center text-sm text-gray-600">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="image"
													onChange={handleMealImage}
													type="file"
													className="sr-only"
												/>
											</label>
										</div>
										<p className="text-xs text-gray-500">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
									{/* <small className="text-red-500">{mealErrors?.image}</small> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0">
				<div className="mt-5 md:col-span-2 md:mt-0">
					<div className="overflow-hidden shadow sm:rounded-md">
						<div className="bg-white px-4 py-5 sm:p-6">
							<div className="grid grid-cols-6 gap-6">
								{meal?.ingredients?.map((ing, i) => {
									return (
										<>
											<div key={i} className="col-span-6 sm:col-span-3">
												<label
													htmlFor="ingredient"
													className="block text-sm font-medium text-gray-700"
												>
													Ingredient
												</label>
												<input
													type="text"
													name="name"
													id="ingredient"
													defaultValue={ing.name}
													onBlur={(e) =>
														handleEditIngredients(e, ing.id, ing.name)
													}
													className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3 items-center flex">
												<div className="flex h-5 items-center">
													<input
														id="optional"
														name="is_optional"
														type="checkbox"
														defaultChecked={ing.is_optional}
														onChange={(e) =>
															handleEditIngredientsOptional(e, ing.id)
														}
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
													/>
												</div>
												<div className="ml-3 text-sm">
													<label
														htmlFor="optional"
														className="font-medium text-gray-700"
													>
														Optional
													</label>
												</div>
											</div>
										</>
									);
								})}
							</div>
							{/* <small className="text-red-500">{mealErrors?.ingredients}</small> */}
						</div>
					</div>
				</div>
			</div>

			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0">
				<div className="mt-5 md:col-span-2 md:mt-0">
					<div className="overflow-hidden shadow sm:rounded-md">
						<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
							<fieldset>
								<legend className="sr-only">By Email</legend>
								<div
									className="text-base font-medium text-gray-900"
									aria-hidden="true"
								>
									Nutrients
								</div>
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.calories
														)
													}
													defaultValue={meal?.nutrients?.calories}
													id="calories"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												Kcal
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.calories}
											</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.fat
														)
													}
													defaultValue={meal?.nutrients?.fat}
													id="fat"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												g
											</td>
											{/* <small className="text-red-500">{mealErrors?.fat}</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.saturated_fat
														)
													}
													defaultValue={meal?.nutrients?.saturated_fat}
													id="saturated_fat"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												g
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.saturated_fat}
											</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.carbs
														)
													}
													defaultValue={meal?.nutrients?.carbs}
													id="carbs"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												g
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.carbs}
											</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.sugar
														)
													}
													defaultValue={meal?.nutrients?.sugar}
													id="sugar"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												g
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.sugar}
											</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.fiber
														)
													}
													defaultValue={meal?.nutrients?.fiber}
													id="fiber"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												g
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.fiber}
											</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.protein
														)
													}
													defaultValue={meal?.nutrients?.protein}
													id="protein"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												g
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.protein}
											</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients.id,
															meal?.nutrients?.cholesterol
														)
													}
													defaultValue={meal?.nutrients?.cholesterol}
													id="cholesterol"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												mg
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.cholesterol}
											</small> */}
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
													onBlur={(e) =>
														handleEditNutrients(
															e,
															meal?.nutrients?.id,
															meal?.nutrients?.sodium
														)
													}
													defaultValue={meal?.nutrients?.sodium}
													id="sodium"
													className=" w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
												mg
											</td>
											{/* <small className="text-red-500">
												{mealErrors?.sodium}
											</small> */}
										</tr>
									</tbody>
								</table>
							</fieldset>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
