import axios from "axios";
import { Badge, Button, Modal } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import modalimg from "../../images/modalimg.png";
import LoadingModal from "./LoadingModal";
import { HiClock } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

export default function ModalRecipe(props) {
	const { cookies, user } = useContext(AuthContext);
	// Get meal data from database
	const [meal, setMeal] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		axios.get(`/api/meals/${props.id}`).then((res) => {
			console.log(res);
			setMeal(res.data.meal);
			setLoading(false);
		});
	}, [props.id]);

	// Save ids of removed ingredients
	const [removedIngredients, setRemovedIngredients] = useState([]);

	const handleRemovedIngredients = (e) => {
		if (e.target.checked) {
			const newArr = removedIngredients?.filter(
				(item) => item != e.target.value
			);
			setRemovedIngredients(newArr);
		} else {
			setRemovedIngredients([...removedIngredients, e.target.value]);
		}
	};
	console.log(removedIngredients);

	const [weekNum, setWeekNum] = useState(1);
	console.log(weekNum);
	const { state } = useLocation();
	const { week } = state || {};
	useEffect(() => {
		if (week) {
			setWeekNum(week);
		}
	}, []);

	const addMeal = () => {
		const data = {
			meal_id: props.id,
			week_num: weekNum,
			removed_ingredients: removedIngredients,
		};
		axios
			.post("/api/weeks", data, {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					console.log(res);
					setRemovedIngredients([]);
					swal(
						"Meal added successfully!",
						"You can visit your profile to view your added meals",
						"success"
					);
					closeModal();
				} else if (res.data.status === 500) {
					console.log(res);
					swal(
						"This week is full!",
						"You can visit your profile to edit your meals",
						"error"
					);
				} else {
					swal(
						"An error has occured!",
						"Please refresh the page and try again!",
						"error"
					);
				}
			});
	};

	// setRemovedIngredients([]) on add

	// Handle closing the modal
	const closeModal = () => {
		setMeal([]);
		setRemovedIngredients([]);
		props.hideModalRecipe();
	};

	return (
		<>
			<React.Fragment>
				{/* <Button onClick={showModalRecipe}>Toggle modal</Button> */}
				<Modal show={props.modalRecipe} size="3xl" onClose={closeModal}>
					{/* <Modal.Header>
				</Modal.Header> */}
					<Modal.Body className="relative overflow-y-scroll h-[600px] p-0 scrollbar ">
						{loading ? (
							<LoadingModal />
						) : (
							<>
								<button
									type="button"
									className="text-white bg-myBlack hover:bg-rustySh focus:ring-4 focus:outline-none focus:ring-rusty font-medium rounded-full text-sm p-1 text-center inline-flex items-center absolute z-50 right-7 top-7"
									onClick={closeModal}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>

								<img
									src={meal?.image}
									className="object-cover object-center h-72 w-full"
								/>
								<div className="space-y-1 p-3 flex flex-col items-start">
									<Badge
										color="success"
										size="sm"
										className="rounded-sm py-1"
										icon={HiClock}
									>
										{" "}
										{meal?.prep_time}
									</Badge>
									<h4 className="mt-1 mb-0 pb-0 text-xl font-semibold uppercase leading-tight">
										{meal?.name}
									</h4>
									<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mt-0">
										{meal?.long_desc}
									</p>
								</div>
								<div className="space-y-1 p-3">
									<h4 className="mt-5 text-lg font-semibold uppercase leading-tight">
										Ingredients
									</h4>
									{/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"> */}
									<div className="grid z-10 grid-cols-2 w-auto text-sm dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
										<div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
											<ul
												className="gap-x-32 gap-y-3 flex flex-col flex-wrap max-h-32 "
												aria-labelledby="mega-menu-icons-dropdown-button"
											>
												{meal?.ingredients?.map((ingredient, i) => {
													return (
														<li key={i}>
															<div className="flex items-center">
																{ingredient.is_optional ? (
																	<input
																		defaultChecked={true}
																		id={`meal${ingredient.id}`}
																		type="checkbox"
																		onChange={handleRemovedIngredients}
																		value={ingredient.id}
																		className="w-4 h-4 text-rusty bg-gray-100 rounded border-gray-300 focus:ring-rusty focus:ring-2 "
																	/>
																) : (
																	""
																)}
																<label
																	htmlFor={`meal${ingredient.id}`}
																	className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
																>
																	{ingredient.name}
																</label>
															</div>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								</div>
								<div className="space-y-1 p-3">
									<h4 className="mt-5 text-lg font-semibold uppercase leading-tight">
										Nutrition Values
									</h4>

									<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
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
														Calories
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.calories} Kcal
													</td>
												</tr>
												<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Fat
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.fat} g
													</td>
												</tr>
												<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Saturated Fat
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.saturated_fat} g
													</td>
												</tr>
												<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Carbohydrates
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.carbs} g
													</td>
												</tr>
												<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Sugar
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.sugar} g
													</td>
												</tr>
												<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Dietary Fiber
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.fiber} g
													</td>
												</tr>
												<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Protein
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.protein} g
													</td>
												</tr>
												<tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Cholesterol
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.cholesterol} mg
													</td>
												</tr>
												<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
													<th
														scope="row"
														className="py-1 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														Sodium
													</th>
													<td className="py-1 px-6">
														{meal?.nutrients?.sodium} mg
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</>
						)}
					</Modal.Body>
					<Modal.Footer className="justify-between">
						{/* <Button onClick={onClick}>I accept</Button> */}
						<Button color="gray" onClick={closeModal}>
							Cancel
						</Button>

						<div className="flex w-56 gap-2">
							{user && user?.is_sub === 1 ? (
								<>
									<select
										id="countries"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										onChange={(e) => setWeekNum(parseInt(e.target.value))}
									>
										<option selected={weekNum === 1} value="1">
											Week 1
										</option>
										<option selected={weekNum === 2} value="2">
											Week 2
										</option>
										<option selected={weekNum === 3} value="3">
											Week 3
										</option>
										<option selected={weekNum === 4} value="4">
											Week 4
										</option>
									</select>

									<button
										type="button"
										className="text-white bg-rusty hover:bg-rustySh focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
										onClick={addMeal}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>

										<span className="sr-only">Icon description</span>
									</button>
								</>
							) : (
								""
							)}
						</div>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		</>
	);
}
