import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "../images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { useEffect } from "react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [pages, setPages] = useState([
		"home",
		"menu",
		"plans",
		"about",
		"contact",
	]);

	const navigate = useNavigate();

	const { user, setUser, cookies, removeCookie, stateToken, setIsAdmin } =
		useContext(AuthContext);
	useEffect(() => {
		if (user?.is_sub === 1) {
			setPages(["home", "menu", "about", "contact"]);
		} else {
			setPages(["home", "menu", "plans", "about", "contact"]);
		}
	}, [user]);

	const { setSelectedCateg } = useContext(DataContext);

	// Log out the user
	const handleLogout = () => {
		axios
			.get("/api/logout", {
				headers: {
					Authorization: `Bearer ${stateToken}`,
				},
			})
			.then((res) => {
				removeCookie("Token");
				setUser({});
				localStorage.removeItem("selectedCateg");
				localStorage.removeItem("selectedData");
				localStorage.removeItem("details");
				localStorage.removeItem("dod");
				localStorage.removeItem("admin");
				setIsAdmin(false);
				// setSelectedCateg([]);
				navigate("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="sticky top-0 z-50 bg-main px-4 py-3 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-24 lg:px-8 uppercase shadow-lg "
			id="navbar"
		>
			<div className="z-50 relative flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Link
						to="/"
						aria-label="Company"
						title="Company"
						className="inline-flex items-center mr-8"
					>
						<img src={logo} alt="" className="w-16" />
					</Link>
					<ul className=" items-center hidden space-x-8 lg:flex text-darkRed">
						{pages.map((page) => (
							<li key={page}>
								<NavLink
									to={
										page == "plans"
											? "/subscribe"
											: page == "home"
											? "/"
											: "/" + page
									}
									aria-label={page}
									title={page}
									className="font-medium tracking-wide transition-colors duration-200 hover:drop-shadow-lg"
								>
									{page}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				{user?.email ? (
					<div className="hidden lg:block pr-2">
						<Dropdown
							label={
								<img
									class="w-10 h-10 rounded-full"
									src={user?.image}
									alt=""
									referrerPolicy="no-referrer"
								/>
							}
							arrowIcon={true}
							inline={true}
						>
							<Dropdown.Header>
								<span className="block text-sm">
									{user?.first_name + " " + user?.last_name}
								</span>
								<span className="block truncate text-sm font-medium">
									{user?.email}
								</span>
							</Dropdown.Header>
							<Dropdown.Item>
								<Link to="/profile">Profile </Link>
							</Dropdown.Item>
							{localStorage.getItem("admin") ? (
								<Dropdown.Item>
									<Link to="/dashboard">Dashboard </Link>
								</Dropdown.Item>
							) : (
								""
							)}

							<Dropdown.Divider />
							<Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
						</Dropdown>
					</div>
				) : (
					<ul className=" items-center hidden space-x-8 lg:flex">
						<li>
							<Link
								to="/login"
								aria-label="Sign in"
								title="Sign in"
								className="font-medium text-darkRed border-2 border-darkRed bg-main rounded py-2 px-5  transition duration-500  hover:bg-mainSh hover:drop-shadow-lg tracking-wide "
							>
								Sign in
							</Link>
						</li>
						<li>
							<Button
								textColor="text-main"
								bgColor="bg-darkRed"
								hoverColor="hover:bg-secRed"
								text="SIGN UP"
								onClick={() => navigate("/register")}
							/>
						</li>
					</ul>
				)}

				<div className="lg:hidden">
					<button
						aria-label="Open Menu"
						title="Open Menu"
						className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
						onClick={() => setIsMenuOpen(true)}
					>
						<svg className="w-5 text-gray-600" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
							></path>
							<path
								fill="currentColor"
								d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
							></path>
							<path
								fill="currentColor"
								d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
							></path>
						</svg>
					</button>
					{isMenuOpen && (
						<div className="absolute top-0 left-0 w-full">
							<div className="p-5 bg-white border rounded shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<div>
										<Link
											to="/"
											aria-label="Company"
											title="Company"
											className="inline-flex items-center"
										>
											<img src={logo} alt="" className="w-16" />
										</Link>
									</div>
									<div>
										<button
											aria-label="Close Menu"
											title="Close Menu"
											className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
											onClick={() => setIsMenuOpen(false)}
										>
											<svg className="w-5 text-gray-600" viewBox="0 0 24 24">
												<path
													fill="currentColor"
													d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
												></path>
											</svg>
										</button>
									</div>
								</div>
								<nav>
									<ul className="space-y-4">
										{pages.map((page) => (
											<li key={page}>
												<NavLink
													to={
														page == "plans"
															? "/subscribe"
															: page == "home"
															? "/"
															: "/" + page
													}
													aria-label={page}
													title={page}
													className="font-medium tracking-wide transition-colors duration-200 hover:drop-shadow-lg"
												>
													{page}
												</NavLink>
											</li>
										))}
										{user?.email ? (
											<Dropdown
												label={
													<Avatar
														alt=""
														img={user?.image}
														rounded={true}
														referrerPolicy="no-referrer"
													/>
												}
												arrowIcon={false}
												inline={true}
												placement="top"
											>
												<Dropdown.Header>
													<span className="block text-sm">
														{" "}
														{user?.first_name + " " + user?.last_name}
													</span>
													<span className="block truncate text-sm font-medium">
														{user?.email}
													</span>
												</Dropdown.Header>
												<Dropdown.Item>
													{" "}
													<Link to="/profile">Profile </Link>
												</Dropdown.Item>

												<Dropdown.Divider />
												<Dropdown.Item onClick={handleLogout}>
													Sign out
												</Dropdown.Item>
											</Dropdown>
										) : (
											<ul className="flex align-middle gap-2">
												<li>
													<Link
														to="/login"
														aria-label="Sign in"
														title="Sign in"
														className="inline-flex items-center justify-center  font-medium text-darkRed border-2 border-darkRed bg-main rounded py-1 px-5  transition duration-500  hover:bg-darkRed hover:text-main hover:drop-shadow-lg tracking-wide "
													>
														Sign in
													</Link>
												</li>
											</ul>
										)}
									</ul>
								</nav>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
