import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { DataContext } from "../../../context/DataContext";

export default function AddMealForm() {
	const { mealData, setMealData, handleInputMeals, mealErrors, url, setUrl } =
		useContext(AdminContext);
	const { categories } = useContext(DataContext);

	useEffect(() => {
		if (mealData.image != "") {
			setUrl(URL.createObjectURL(mealData.image));
		}
	}, [mealData]);
	// const handleInput = (e) => {
	// 	setMealData({ ...mealData, [e.target.name]: e.target.value });
	// };
	return (
		<>
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
								value={mealData?.name}
								onChange={handleInputMeals}
								className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
						<small className="text-red-500">{mealErrors?.name}</small>
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
							// value={mealData?.category_id}

							onChange={handleInputMeals}
							// autoComplete="country-name"
							className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						>
							<option value="">Select category</option>
							{categories?.map((categ, i) => {
								return (
									<option value={categ?.id} key={i}>
										{categ?.name}
									</option>
								);
							})}
						</select>
						<small className="text-red-500">{mealErrors?.category_id}</small>
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
								value={mealData?.prep_time}
								onChange={handleInputMeals}
								id="prep_time"
								className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
						<small className="text-red-500">{mealErrors?.prep_time}</small>
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
								value={mealData?.note}
								onChange={handleInputMeals}
								id="note"
								className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
						<small className="text-red-500">{mealErrors?.note}</small>
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
								value={mealData?.cost}
								onChange={handleInputMeals}
								id="cost"
								className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
						<small className="text-red-500">{mealErrors?.cost}</small>
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
								value={mealData?.tags}
								onChange={handleInputMeals}
								id="tags"
								className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
						<small className="text-red-500">{mealErrors?.tags}</small>
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
								value={mealData?.short_desc}
								onChange={handleInputMeals}
								id="short-desc"
								className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
						<small className="text-red-500">{mealErrors?.short_desc}</small>
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
							value={mealData?.long_desc}
							onChange={handleInputMeals}
							rows={3}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							defaultValue={""}
						/>
					</div>
					<small className="text-red-500">{mealErrors?.long_desc}</small>
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
								<svg
									className="mx-auto h-12 w-12 text-gray-400"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
									aria-hidden="true"
								>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
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
										onChange={(e) =>
											setMealData({ ...mealData, image: e.target.files[0] })
										}
										type="file"
										className="sr-only"
									/>
								</label>
							</div>
							<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
						</div>
						<small className="text-red-500">{mealErrors?.image}</small>
					</div>
				</div>
			</div>
		</>
	);
}
