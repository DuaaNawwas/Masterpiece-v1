import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";

import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { DataContext } from "../../context/DataContext";
export default function Categories() {
	const { categories, setCategories } = useContext(DataContext);

	const handleDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "This category will be deleted!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.delete(`/api/category/${id}`).then((res) => {
					if (res.data.status === 200) {
						setCategories(res.data.categories);
					}
				});
				swal("Poof! Category has been deleted!", {
					icon: "success",
				});
			} else {
				swal("Your category is safe!");
			}
		});
	};

	const handleEdit = (oldname, newname, id) => {
		if (oldname == newname || newname.trim() === "") {
			return;
		}
		const data = {
			id: id,
			name: newname,
		};
		axios.post("/api/category/edit", data).then((res) => {
			if (res.data.status === 200) {
				setCategories(res.data.categories);
				swal("Category edited successfully", "", "success");
			}
		});
	};
	const handleImageEdit = (image, id) => {
		const formData = new FormData();
		formData.append("id", id);
		formData.append("image", image);

		axios.post("/api/category/edit", formData).then((res) => {
			if (res.data.status === 200) {
				setCategories(res.data.categories);
				swal("Category edited successfully", "", "success");
			}
		});
	};
	return (
		<section className="w-7/12 m-auto p-6  bg-white rounded-md shadow-md dark:bg-gray-800 space-y-5">
			<h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
				Manage Categories{" "}
				<span className="text-sm text-gray-400">- Click on cell to edit</span>
			</h2>
			<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" class="py-3 px-6">
								Category
							</th>
							{/* <th scope="col" class="py-3 px-6">
								Position
							</th>
							<th scope="col" class="py-3 px-6">
								Status
							</th> */}
							<th scope="col" class="py-3 px-6">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{categories?.map((category, i) => {
							return (
								<tr
									key={i}
									class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<th
										scope="row"
										class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
									>
										<img
											class="w-10 h-10 rounded-full"
											src={category?.image}
											alt=""
										/>
										<label
											htmlFor="CategImage"
											className="w-10 h-10 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
										>
											<img
												className="hidden group-hover:block w-5"
												src="https://www.svgrepo.com/show/33565/upload.svg"
												alt=""
											/>
											<input
												type="file"
												className="hidden"
												id="CategImage"
												onChange={(e) =>
													handleImageEdit(e.target.files[0], category?.id)
												}
											/>
										</label>
										<div
											class="pl-3"
											contentEditable
											onBlur={(e) =>
												handleEdit(
													category?.name,
													e.target.innerText,
													category?.id
												)
											}
										>
											<div class="text-base font-semibold">
												{category?.name}
											</div>
										</div>
									</th>
									{/* <td class="py-4 px-6">React Developer</td>
							<td class="py-4 px-6">
								<div class="flex items-center">
									<div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
									Online
								</div>
							</td> */}
									<td class="py-4 px-6 ">
										<div>
											<button
												onClick={() => handleDelete(category?.id)}
												class=" text-darkRed  hover:underline"
											>
												<MdDelete size={20} />
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
}
