import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";

export default function Apply() {
	const [applyData, setApplyData] = useState({
		company: "",
		service: "",
		name: "",
		email: "",
		phone: "",
		location: "",
		message: "",
	});
	const [enableBtn, setEnableBtn] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (
			applyData.email.replace(/ /g, "") != "" &&
			applyData.message.replace(/ /g, "") != "" &&
			applyData.company.replace(/ /g, "") != "" &&
			applyData.service.replace(/ /g, "") != "" &&
			applyData.name.replace(/ /g, "") != "" &&
			applyData.phone.replace(/ /g, "") != "" &&
			applyData.location.replace(/ /g, "") != ""
		) {
			setEnableBtn(true);
		} else {
			setEnableBtn(false);
		}
	}, [applyData]);

	const handleApply = () => {
		if (enableBtn) {
			axios.post("/api/apply", applyData).then((res) => {
				if (res.data.status === 200) {
					console.log(res);
					swal(
						"Your application has been sent successfully!",
						"We will reply to you soon",
						"success"
					);
					setApplyData({
						company: "",
						service: "",
						name: "",
						email: "",
						phone: "",
						location: "",
						message: "",
					});
				} else if (res.data.status === "failure") {
					setErrors(res.data.errors);
				}
			});
		}
	};
	return (
		<div className="mt-10 sm:mt-0 p-10 flex ">
			<div className="mt-5 md:col-span-2 md:mt-0 mx-auto w-7/12">
				<div className="overflow-hidden shadow sm:rounded-md">
					<div className="bg-white px-4 py-5 sm:p-6">
						<h2 className="text-darkRed text-3xl font-bold py-5 uppercase">
							Work with us!
						</h2>
						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="company"
									className="block text-sm font-medium text-gray-700"
								>
									Company
								</label>
								<input
									type="text"
									name="company"
									id="company"
									onChange={(e) =>
										setApplyData({
											...applyData,
											company: e.target.value,
										})
									}
									value={applyData?.company}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-darkGreen focus:ring-darkGreen sm:text-sm"
								/>
								<small className="text-darkRed">{errors?.company}</small>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="service"
									className="block text-sm font-medium text-gray-700"
								>
									Service
								</label>
								<select
									id="service"
									name="service"
									onChange={(e) =>
										setApplyData({
											...applyData,
											service: e.target.value,
										})
									}
									value={applyData?.service}
									className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-darkGreen focus:outline-none focus:ring-darkGreen sm:text-sm"
								>
									<option value="">Select a service</option>
									<option value="delivery">Delivery</option>
									<option value="grocery">Grocery</option>
								</select>
								<small className="text-darkRed">{errors?.service}</small>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									onChange={(e) =>
										setApplyData({
											...applyData,
											name: e.target.value,
										})
									}
									value={applyData?.name}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-darkGreen focus:ring-darkGreen sm:text-sm"
								/>
								<small className="text-darkRed">{errors?.name}</small>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<input
									type="text"
									name="email"
									id="email"
									onChange={(e) =>
										setApplyData({
											...applyData,
											email: e.target.value,
										})
									}
									value={applyData?.email}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-darkGreen focus:ring-darkGreen sm:text-sm"
								/>
								<small className="text-darkRed">{errors?.email}</small>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700"
								>
									Phone
								</label>
								<input
									type="text"
									name="phone"
									id="phone"
									onChange={(e) =>
										setApplyData({
											...applyData,
											phone: e.target.value,
										})
									}
									value={applyData?.phone}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-darkGreen focus:ring-darkGreen sm:text-sm"
								/>
								<small className="text-darkRed">{errors?.phone}</small>
							</div>

							<div className="col-span-6 sm:col-span-3">
								<label
									htmlFor="location"
									className="block text-sm font-medium text-gray-700"
								>
									Address
								</label>
								<input
									type="text"
									name="location"
									id="location"
									onChange={(e) =>
										setApplyData({
											...applyData,
											location: e.target.value,
										})
									}
									value={applyData?.location}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-darkGreen focus:ring-darkGreen sm:text-sm"
								/>
								<small className="text-darkRed">{errors?.location}</small>
							</div>
							<div className="col-span-6">
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700"
								>
									Message
								</label>
								<div className="mt-1">
									<textarea
										id="message"
										name="message"
										onChange={(e) =>
											setApplyData({
												...applyData,
												message: e.target.value,
											})
										}
										value={applyData?.message}
										rows={3}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
								<small className="text-darkRed">{errors?.message}</small>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
						<button
							type="submit"
							className="inline-flex justify-center rounded-md border border-transparent bg-darkGreen py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-darkGreen/90 focus:outline-none focus:ring-2 focus:ring-darkGreen focus:ring-offset-2 disabled:bg-darkGreen/30"
							disabled={!enableBtn}
							onClick={handleApply}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
