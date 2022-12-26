import React from "react";
import {
	MdOutlineCategory,
	MdOutlineLibraryAdd,
	MdOutlineSetMeal,
	MdOutlineSpaceDashboard,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GiMeal } from "react-icons/gi";
import { RiContactsBookLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";

export default function Sidenav() {
	const { user } = useContext(AuthContext);
	// To redirect
	const navigate = useNavigate();

	// Get url path
	const location = useLocation();

	// Styling for active nav item
	const activeNav = "bg-gray-100 text-gray-700";
	const inactiveNav = "hover:bg-gray-100 hover:text-gray-700";

	return (
		<div className="sticky top-0 w-60  flex flex-col justify-between h-screen bg-darkGreen text-main   shadow-xl shadow-slate-800">
			<div className="px-4 py-6 flex flex-col gap-10">
				<span className="flex justify-center  ">
					<Link
						to="/"
						aria-label="Company"
						title="Company"
						className="inline-flex items-center "
					>
						<img src={logo} alt="" className="w-16 rounded-md" />
					</Link>
				</span>

				<nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1">
					<Link
						to="/dashboard"
						className={`flex items-center px-4 py-2  rounded-lg ${
							location.pathname === "/dashboard" ? activeNav : inactiveNav
						}`}
					>
						<MdOutlineSpaceDashboard size="20" />

						<span className="ml-3 text-sm font-medium"> Dashboard </span>
					</Link>
					<details className="group [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex items-center px-4 py-2  rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
							<MdOutlineCategory size="20" />

							<span className="ml-3 text-sm font-medium"> Categories </span>

							<span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						</summary>

						<nav
							aria-label="Teams Nav"
							className="mt-1.5 ml-8 space-y-1 flex flex-col"
						>
							<Link
								to="/dashboard/category/add"
								className={`flex items-center px-4 py-2  rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
									location.pathname === "/dashboard/category/add"
										? activeNav
										: inactiveNav
								}`}
							>
								<MdOutlineLibraryAdd size="20" />

								<span className="ml-3 text-sm font-medium"> Add Category </span>
							</Link>

							<Link
								to="/dashboard/categories"
								className={`flex items-center px-4 py-2  rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
									location.pathname === "/dashboard/categories"
										? activeNav
										: inactiveNav
								}`}
							>
								<FiSettings />

								<span className="ml-3 text-sm font-medium">
									Manage Categories
								</span>
							</Link>
						</nav>
					</details>
					<details className="group [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex items-center px-4 py-2  rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
							<GiMeal size="20" />

							<span className="ml-3 text-sm font-medium"> Meals </span>

							<span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						</summary>

						<nav
							aria-label="Teams Nav"
							className="mt-1.5 ml-8 space-y-1 flex flex-col"
						>
							<Link
								to="/dashboard/meal/add"
								className={`flex items-center px-4 py-2  rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
									location.pathname === "/dashboard/meal/add"
										? activeNav
										: inactiveNav
								}`}
							>
								<MdOutlineSetMeal size="20" />

								<span className="ml-3 text-sm font-medium"> Add Meal </span>
							</Link>

							<Link
								to="/dashboard/meals"
								className={`flex items-center px-4 py-2  rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
									location.pathname === "/dashboard/meals"
										? activeNav
										: inactiveNav
								}`}
							>
								<FiSettings />

								<span className="ml-3 text-sm font-medium">Manage Meals</span>
							</Link>
						</nav>
					</details>

					<Link
						to="/dashboard/orders"
						className={`flex items-center px-4 py-2  rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
							location.pathname === "/dashboard/orders"
								? activeNav
								: inactiveNav
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5 opacity-75"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
							/>
						</svg>

						<span className="ml-3 text-sm font-medium"> Orders </span>
					</Link>

					<Link
						to="/dashboard/contacts"
						className={`flex items-center px-4 py-2  rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
							location.pathname === "/dashboard/contacts"
								? activeNav
								: inactiveNav
						}`}
					>
						<RiContactsBookLine size={20} />

						<span className="ml-3 text-sm font-medium"> Contacts </span>
					</Link>
					<Link
						to="/dashboard/applications"
						className={`flex items-center px-4 py-2  rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
							location.pathname === "/dashboard/applications"
								? activeNav
								: inactiveNav
						}`}
					>
						<HiOutlineDocumentArrowUp size={20} />

						<span className="ml-3 text-sm font-medium"> Applications </span>
					</Link>
				</nav>
			</div>

			<div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
				<div className="flex items-center p-4  shrink-0 ">
					<img
						alt=""
						src={user?.image}
						className="object-cover w-10 h-10 rounded-full"
					/>

					<div className="ml-1.5">
						<p className="text-xs">
							<strong className="block font-medium">
								{user?.first_name} {user?.last_name}
							</strong>

							<span>{user?.email}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
