import axios from "axios";
import { Alert, Toast } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";
import { HiCheck, HiInformationCircle } from "react-icons/hi";

export default function EditForm() {
	const { user, setUser, cookies } = useContext(AuthContext);
	const [isChanged, setIsChanged] = useState(false);
	const token = cookies.Token;
	const [updatedUser, setUpdatedUser] = useState({
		first_name: user?.first_name,
		last_name: user?.last_name,
		phone: user?.phone,
		city: user?.city,
		street: user?.street,
		building: user?.building,
		floor: user?.floor,
		errors: [],
	});

	// Handle inputs function
	const handleInput = (e) => {
		e.persist();
		setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
		setIsChanged(true);
	};

	// Edit info function
	const handleEditInfo = (e) => {
		e.preventDefault();

		if (
			(updatedUser.first_name &&
				updatedUser.last_name &&
				updatedUser.phone &&
				updatedUser.city &&
				updatedUser.street &&
				updatedUser.building &&
				updatedUser.floor) != ""
		) {
			const data = {
				...updatedUser,
			};

			axios
				.put(`/api/users/${user?.id}`, data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res.data.status == 200) {
						console.log(res);
						swal({
							title: "Info Updated Successfully!",

							icon: "success",
						});
						setUser({ ...user, ...data });
						setIsChanged(false);
						setUpdatedUser({
							...updatedUser,
							errors: "",
						});
					} else {
						console.log(res);
					}
				});
		} else {
			setUpdatedUser({
				...updatedUser,
				errors: "You shouldn't leave an empty input",
			});
		}
	};

	return (
		<>
			<form
				onSubmit={handleEditInfo}
				className="flex flex-col gap-4 w-full md:w-8/12 mx-auto"
			>
				<h2 className="text-3xl text-darkRed font-bold sm:text-4xl text-center py-5">
					Edit Your Information
				</h2>
				{updatedUser?.errors != "" && (
					<Alert color="failure" icon={HiInformationCircle}>
						<span>{updatedUser?.errors}</span>
					</Alert>
				)}

				<div className="relative">
					<input
						type="email"
						id="email"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer bg-darkGreen/20"
						placeholder=" "
						value={user?.email}
						disabled
					/>
					<label
						htmlFor="email"
						className="absolute text-sm text-myBlack dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Email
					</label>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="relative">
						<input
							type="text"
							id="fname"
							name="first_name"
							className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer"
							placeholder=" "
							defaultValue={user?.first_name}
							onChange={handleInput}
						/>
						<label
							htmlFor="fname"
							className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
						>
							First Name
						</label>
					</div>

					<div className="relative">
						<input
							type="text"
							id="lname"
							name="last_name"
							className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer"
							placeholder=" "
							defaultValue={user?.last_name}
							onChange={handleInput}
						/>
						<label
							htmlFor="lname"
							className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
						>
							Last Name
						</label>
					</div>
				</div>

				<div className="relative">
					<input
						type="tel"
						id="phone"
						name="phone"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer"
						placeholder=" "
						defaultValue={user?.phone}
						onChange={handleInput}
					/>
					<label
						htmlFor="phone"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Phone
					</label>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="relative">
						<input
							type="text"
							id="city"
							name="city"
							className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer"
							placeholder=" "
							defaultValue={user?.city}
							onChange={handleInput}
						/>
						<label
							htmlFor="city"
							className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
						>
							City
						</label>
					</div>
					<div className="relative">
						<input
							type="text"
							id="street"
							name="street"
							className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer"
							placeholder=" "
							defaultValue={user?.street}
							onChange={handleInput}
						/>
						<label
							htmlFor="street"
							className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
						>
							Street
						</label>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="relative">
						<input
							type="text"
							id="building"
							name="building"
							className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer"
							placeholder=" "
							defaultValue={user?.building}
							onChange={handleInput}
						/>
						<label
							htmlFor="building"
							className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
						>
							Building
						</label>
					</div>

					<div className="relative">
						<input
							className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-darkRed peer"
							placeholder=" "
							type="number"
							id="floor"
							name="floor"
							defaultValue={user?.floor}
							onChange={handleInput}
						/>
						<label
							className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-darkRed peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							htmlFor="floor"
						>
							Floor
						</label>
					</div>
				</div>
				{/* 
			<label
				htmlFor="deliveryDay"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 sr-only"
			>
				Select your day of delivery
			</label>
			<select
				id="deliveryDay"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option selected>Choose your day of delivery</option>
				<option value="sunday">Sunday</option>
				<option value="monday">Monday</option>
				<option value="tuesday">Tuesday</option>
				<option value="wednesday">Wednesday</option>
				<option value="thursday">Thursday</option>
				<option value="friday">Friday</option>
				<option value="saturday">Saturday</option>
			</select> */}

				<Button
					type="submit"
					bgColor="bg-darkGreen"
					text="EDIT"
					style="mt-5"
					disabled={!isChanged}
				/>
			</form>
		</>
	);
}
