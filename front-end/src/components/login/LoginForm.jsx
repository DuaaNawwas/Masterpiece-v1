import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
	// Get necessary functions from context
	const { setUser, setCookie, setStateToken, setIsAdmin } =
		useContext(AuthContext);

	// Navigation hook
	const navigate = useNavigate();

	// Get inputs from user
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
		errors: [],
	});

	// Handle inputs function
	const handleInput = (e) => {
		e.persist();

		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	// Login function
	const handleLogin = (e) => {
		e.preventDefault();

		const data = {
			email: loginData.email,
			password: loginData.password,
		};

		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/login", data).then((res) => {
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
					navigate("/", { replace: true });
				} else {
					console.log(res);
					setLoginData({ ...loginData, errors: res.data.errors });
				}
			});
		});
	};

	return (
		<div className="flex justify-center px-6 mt-20 mb-32">
			<div className="w-full md:w-9/12 xl:w-3/4 lg:w-11/12 flex">
				<div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover bg-center rounded-l-lg bg-login-bg"></div>

				<div className="pt-10 w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
					<h3 className="pt-4 text-2xl text-center text-darkRed font-semibold uppercase">
						Welcome Back!
					</h3>
					<form
						onSubmit={handleLogin}
						className="px-8 pt-6 pb-8 mb-4 bg-white rounded flex flex-col gap-4"
					>
						<div className="flex flex-col gap-8">
							<div className="relative">
								<input
									id="email"
									type="email"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
									placeholder=" "
									name="email"
									value={loginData?.email}
									onChange={handleInput}
								/>
								<label
									htmlFor="email"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Your email
								</label>

								<small className="text-red-500 -mt-10">
									{loginData.errors.email}
								</small>
							</div>
							<div className="relative">
								<input
									id="password"
									type="password"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkRed peer"
									placeholder=" "
									name="password"
									value={loginData?.password}
									onChange={handleInput}
								/>
								<label
									htmlFor="password"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Your password
								</label>

								<small className="text-red-500 -mt-10">
									{loginData.errors.password}
								</small>
							</div>
						</div>
						<div className="flex justify-end">
							{/* <div className="mb-4">
								<input
									className="mr-2 w-4 h-4 text-darkRed bg-gray-100 rounded border-gray-300 focus:ring-secRed dark:focus:ring-darkRed "
									type="checkbox"
									id="checkbox_id"
								/>
								<label className="text-sm" htmlFor="checkbox_id">
									Remember Me
								</label>
							</div> */}
							<a className="inline-block text-sm text-darkRed align-baseline hover:text-darkRed">
								Forgot Password?
							</a>
						</div>

						<Button
							bgColor="bg-darkYellow"
							hoverColor="hover:bg-lemonSh"
							text="SIGN IN"
							type="submit"
							padding="px-8"
							// onClick={props.changeStep}
						/>

						{/* <hr className="mb-6 border-t" /> */}
						<div className="text-center text-sm pb-5">
							Don't have an Account?{" "}
							<Link
								to="/register"
								className="inline-block text-sm text-darkRed align-baseline hover:text-darkRed"
							>
								Register!
							</Link>
						</div>
						<div className="flex my-2 text-sm font-semibold items-center text-myBlack">
							<div className="flex-grow border-t h-px mr-3"></div>
							OR
							<div className="flex-grow border-t h-px ml-3"></div>
						</div>
						<SocialLogin />
					</form>
				</div>
			</div>
		</div>
	);
}
