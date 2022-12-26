import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";

export default function ChangePassword() {
	const { user, cookies } = useContext(AuthContext);
	const [isChanged, setIsChanged] = useState(false);
	const [updatedPwd, setUpdatedPwd] = useState({
		password_current: "",
		password_new: "",
		password_confirmation: "",
		errors: [],
	});
	const token = cookies.Token;

	// Handle inputs function
	const handleInput = (e) => {
		e.persist();
		setUpdatedPwd({ ...updatedPwd, [e.target.name]: e.target.value });
		if (
			(updatedPwd.password_confirmation &&
				updatedPwd.password_current &&
				updatedPwd.password_new) != ""
		) {
			setIsChanged(true);
		}
	};

	// Change password function
	const handleChangePassword = (e) => {
		e.preventDefault();

		const data = { ...updatedPwd };

		axios
			.put("/api/changepassword", data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.status == 200) {
					console.log(res);
					swal({
						title: "Password Updated Successfully!",
						icon: "success",
					});
					setUpdatedPwd({
						password_current: "",
						password_new: "",
						password_confirmation: "",
						errors: [],
					});
					setIsChanged(false);
				} else {
					console.log(res);
					setUpdatedPwd({
						...updatedPwd,
						errors: res.data.errors,
					});
				}
			});
	};

	return (
		<form
			onSubmit={handleChangePassword}
			className="flex flex-col gap-4 w-full md:w-7/12 mx-auto"
		>
			<h2 className="text-3xl text-darkRed font-bold sm:text-4xl text-center py-5">
				Change your password
			</h2>

			<div className="relative">
				<input
					type="password"
					id="password"
					name="password_current"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
					placeholder=" "
					value={updatedPwd.password_current}
					onChange={handleInput}
				/>
				<label
					htmlFor="password"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					Your current password
				</label>
				<small className="text-red-500">
					{updatedPwd?.errors.password_current}
				</small>
			</div>
			<div className="relative">
				<input
					type="password"
					id="password2"
					name="password_new"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
					placeholder=" "
					value={updatedPwd.password_new}
					onChange={handleInput}
				/>
				<label
					htmlFor="password2"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					New password
				</label>
				<small className="text-red-500">
					{updatedPwd?.errors.password_new}
				</small>
			</div>
			<div className="relative">
				<input
					type="password"
					id="password_confirmation"
					name="password_confirmation"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
					placeholder=" "
					value={updatedPwd.password_confirmation}
					onChange={handleInput}
				/>
				<label
					htmlFor="password_confirmation"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					Confirm New Password
				</label>
			</div>

			<Button
				bgColor="bg-darkGreen"
				text="CONFIRM"
				type="submit"
				padding="px-8"
				style="mt-5"
				disabled={!isChanged}
			/>
		</form>
	);
}
