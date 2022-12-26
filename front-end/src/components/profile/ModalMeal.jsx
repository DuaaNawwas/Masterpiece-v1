import axios from "axios";
import { Badge, Button, Modal } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HiClock } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import LoadingModal from "../menu/LoadingModal";

export default function ModalMeal({
	id,
	show,
	closeModal,
	removedIng,
	deleteMeal,
}) {
	const { cookies } = useContext(AuthContext);
	// Get meal data from database
	const [meal, setMeal] = useState();
	const [loading, setLoading] = useState(true);
	const [allIngredients, setAllIngredients] = useState([]);
	const [now, setNow] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios.get(`/api/meals/${id}`).then((res) => {
			console.log(res);
			setMeal(res.data.meal);
			setLoading(false);
		});
	}, [id]);

	useEffect(() => {
		if (removedIng?.length > 0) {
			const removedIngredients = Object.keys(removedIng[0])
				.filter((key) => key.includes("remove") && removedIng[0][key] != null)
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: removedIng[0][key],
					});
				}, {});
			// console.log("removedIng");
			// console.log(removedIngredients);

			const removed = Object.values(removedIngredients);
			const ings = meal?.ingredients?.filter(
				(ing) => !removed.includes(ing.id)
			);
			setAllIngredients(ings);
			console.log(removed);
			console.log("kkoljihib");
			console.log(ings);
		}
	}, [removedIng, show]);

	return (
		<>
			<React.Fragment>
				{/* <Button onClick={showModalRecipe}>Toggle modal</Button> */}
				<Modal show={show} size="3xl" onClose={closeModal}>
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
												{allIngredients?.map((ingredient) => {
													return (
														<li key={Math.random()}>
															<div className="flex items-center">
																<p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
																	{ingredient.name}
																</p>
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
						<Button color="failure" onClick={() => deleteMeal(meal?.id)}>
							Delete
						</Button>
						<Button color="gray" onClick={closeModal}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		</>
	);
}
