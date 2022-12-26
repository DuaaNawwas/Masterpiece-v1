import React, { useState } from "react";
import Button from "../Button";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { DataContext } from "../../context/DataContext";

export default function RegisterForm() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { fromSpecificPage } = state || {};

	// --------------------------------------------
	// Do same handling to register by google/ faceboook
	// --------------------------------------------

	const { setCookie, setUser, setStateToken, setIsAdmin } =
		useContext(AuthContext);
	const { selectedData, selectedCateg } = useContext(DataContext);
	// Take inputs from user
	const [register, setRegister] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirmation: "",
		errors: [],
	});

	// Handle inputs function
	const handleInput = (e) => {
		e.persist();
		setRegister({ ...register, [e.target.name]: e.target.value });
	};

	// Register user
	const handleRegistration = (e) => {
		e.preventDefault();

		const data = {
			first_name: register.first_name,
			last_name: register.last_name,
			email: register.email,
			password: register.password,
			password_confirmation: register.password_confirmation,
		};
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/register", data).then((res) => {
				if (res.data.status === "success") {
					console.log(res);
					const token = res.data.token;
					setCookie("Token", token, { path: "/" });
					setStateToken(token);
					setUser(res.data.user);
					if (res.data.user.role === "admin") {
						setIsAdmin(true);
						localStorage.setItem("admin", "true");
					} else {
						setIsAdmin(false);
					}

					const data2 = {
						people_num: selectedData.ppl_num,
						meals_per_week: selectedData.meals_per_week,
						categories: selectedCateg.toString(),
					};

					if (fromSpecificPage) {
						axios
							.post("/api/pending", data2, {
								headers: {
									Authorization: `Bearer ${token}`,
								},
							})
							.then((res) => {
								if (res.data.status === 200) {
									// localStorage.removeItem("selectedCateg");
									navigate("/subscribe", { state: { fromSpecificPage: true } });
								}
							});
					} else {
						navigate("/", { replace: true });
					}
				} else {
					console.log(res);
					setRegister({ ...register, errors: res.data.errors });
				}
			});
		});
	};
	return (
		<form onSubmit={handleRegistration} className="flex flex-col gap-4">
			<h2 className="text-3xl text-darkRed font-bold sm:text-4xl text-center py-1">
				Start Your Journey
			</h2>
			{fromSpecificPage ? (
				<Alert color="warning" icon={HiInformationCircle}>
					<span>
						<span className="font-medium">Info alert!</span> You need to
						register to continue your plan.
					</span>
				</Alert>
			) : null}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="relative">
					<input
						type="text"
						id="fname"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-darkRed peer"
						placeholder=" "
						name="first_name"
						value={register?.first_name}
						onChange={handleInput}
					/>
					<label
						htmlFor="fname"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						First Name
					</label>
					<small className="text-red-500">{register?.errors.first_name}</small>
				</div>

				<div className="relative">
					<input
						type="text"
						id="lname"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-darkRed peer"
						placeholder=" "
						name="last_name"
						value={register?.last_name}
						onChange={handleInput}
					/>
					<label
						htmlFor="lname"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Last Name
					</label>
					<small className="text-red-500">{register?.errors.last_name}</small>
				</div>
			</div>
			<div className="relative">
				<input
					id="email2"
					type="email"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
					placeholder=" "
					name="email"
					value={register?.email}
					onChange={handleInput}
				/>
				<label
					htmlFor="email2"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					Your email
				</label>
				<small className="text-red-500">{register?.errors.email}</small>
			</div>
			<div className="relative">
				<input
					id="password"
					type="password"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
					placeholder=" "
					name="password"
					value={register?.password}
					onChange={handleInput}
				/>
				<label
					htmlFor="password"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					Your password
				</label>
				<small className="text-red-500">{register?.errors.password}</small>
			</div>
			<div className="relative">
				<input
					id="password_confirmation"
					type="password"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
					placeholder=" "
					name="password_confirmation"
					value={register?.password_confirmation}
					onChange={handleInput}
				/>
				<label
					htmlFor="password_confirmation"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					Confirm your password
				</label>
			</div>

			<Button
				bgColor="bg-darkYellow"
				hoverColor="hover:bg-lemonSh"
				text="SIGN UP"
				type="submit"
				padding="px-8"
				// onClick={props.changeStep}
			/>
			<div className="text-center text-sm pb-5">
				Already have an Account?{" "}
				<Link
					to="/login"
					className="inline-block text-sm text-darkRed align-baseline hover:text-darkRed"
				>
					Login!
				</Link>
			</div>
		</form>
	);
}
