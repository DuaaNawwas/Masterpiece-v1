import React, { useState } from "react";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { AdminContext } from "../../../context/AdminContext";

export default function AddIngredientsForm() {
	// const [inputFields, setInputFields] = useState([
	// 	{ ingredient: "", optional: false },
	// ]);

	const { inputFields, setInputFields, mealErrors } = useContext(AdminContext);

	const handleFormChange = (i, e) => {
		let data = [...inputFields];
		if (e.target.name == "optional") {
			data[i][e.target.name] = e.target.checked;
		} else {
			data[i][e.target.name] = e.target.value;
		}
		setInputFields(data);
	};

	const addFields = () => {
		let newfield = { ingredient: "", optional: false };

		setInputFields([...inputFields, newfield]);
	};

	const removeFields = (i) => {
		let data = [...inputFields];
		data.splice(i, 1);
		setInputFields(data);
	};
	return (
		<>
			<div className="bg-white px-4 py-5 sm:p-6">
				<div className="grid grid-cols-6 gap-6">
					{inputFields?.map((input, i) => {
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
										name="ingredient"
										id="ingredient"
										value={input.ingredient}
										onChange={(e) => handleFormChange(i, e)}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 items-center flex">
									<div className="flex h-5 items-center">
										<input
											id="optional"
											name="optional"
											type="checkbox"
											checked={input.optional}
											onChange={(e) => handleFormChange(i, e)}
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
									<button
										onClick={() => removeFields(i)}
										class=" text-red-500  hover:underline"
									>
										<MdDelete size={20} />
									</button>
								</div>
							</>
						);
					})}
				</div>
				<small className="text-red-500">{mealErrors?.ingredients}</small>
			</div>
			<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
				<button
					onClick={addFields}
					className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Add More
				</button>
			</div>
		</>
	);
}
