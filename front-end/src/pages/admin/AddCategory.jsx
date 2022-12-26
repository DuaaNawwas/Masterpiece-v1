import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";

export default function AddCategory() {
	const { setCategories } = useContext(DataContext);
	const [data, setData] = useState({
		name: "",
		image: "",
	});
	const [enableBtn, setEnableBtn] = useState(false);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		if (data.image != "") {
			setUrl(URL.createObjectURL(data.image));
		}
		if (data.name != "" && data.image != "") {
			setEnableBtn(true);
		} else {
			setEnableBtn(false);
		}
	}, [data]);

	const [errors, setErrors] = useState();

	const handleSubmit = () => {
		if (data.name != "" && data.image != "") {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("image", data.image);

			axios
				.post("/api/categories/add", formData, {
					headers: {
						"Content-type": "multipart/form-data",
					},
				})
				.then((res) => {
					if (res.data.status === 200) {
						console.log(res);
						swal("Category added successfully!", "", "success");
						setData({
							name: "",
							image: "",
						});
						setCategories(res.data.categories);
						setUrl(null);
					} else if (res.data.status === "failure") {
						setErrors(res.data.errors);
					}
				});
		} else {
			swal("All inputs are required", "", "error");
		}
	};

	return (
		<div className="w-7/12 m-auto">
			<section className=" p-6  bg-white rounded-md shadow-md dark:bg-gray-800">
				<h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
					Add Category
				</h2>

				<>
					<div className="grid grid-cols-1 gap-6 mt-4">
						<div>
							<label className="text-gray-700 dark:text-gray-200" for="name">
								Name
							</label>
							<input
								id="name"
								type="text"
								className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-darkGreen focus:ring-darkGreen focus:ring-opacity-40 dark:focus:border-darkGreen focus:outline-none focus:ring"
								onChange={(e) => setData({ ...data, name: e.target.value })}
								value={data?.name}
							/>
							<small className="text-darkRed">{errors?.name}</small>
						</div>

						<div>
							<label className=" text-gray-700">Photo</label>
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
											className="relative cursor-pointer rounded-md bg-white font-medium text-darkYellow hover:text-darkGreen"
										>
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
												onChange={(e) =>
													setData({ ...data, image: e.target.files[0] })
												}
											/>
										</label>
										<small className="text-darkRed">{errors?.image}</small>
									</div>
									<p className="text-xs text-gray-500">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end mt-6">
						<button
							disabled={!enableBtn}
							onClick={handleSubmit}
							className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-darkGreen rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:bg-gray-300"
						>
							Save
						</button>
					</div>
				</>
			</section>
		</div>
	);
}
