import axios from "axios";
import { Alert } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Button from "../Button";
import MapComponent from "../map/MapComponent";

export default function Details(props) {
	const { user, setUser, cookies } = useContext(AuthContext);

	const { setPendingData, pendingData } = useContext(DataContext);
	const token = cookies.Token;
	const [isChangedContact, setIsChangedContact] = useState(false);
	const [isChangedDod, setIsChangedDod] = useState(false);
	const [position, setPosition] = useState({ lat: 31.9539, lng: 35.9106 });

	const [updatedUser, setUpdatedUser] = useState({
		phone: user?.phone,
		city: user?.city,
		street: user?.street,
		building: user?.building,
		floor: user?.floor,
		errors: [],
	});
	const [dod, setDod] = useState(parseInt(pendingData?.day_of_delivery));

	// Handle inputs function
	const handleInput = (e) => {
		e.persist();
		const data = { ...updatedUser, [e.target.name]: e.target.value };
		setUpdatedUser(data);
		localStorage.setItem("details", JSON.stringify(data));
	};

	useEffect(() => {
		if (localStorage.getItem("details")) {
			const data = JSON.parse(localStorage.getItem("details"));
			setUpdatedUser(data);
		}
	}, []);
	useEffect(() => {
		if (localStorage.getItem("dod")) {
			const data = JSON.parse(localStorage.getItem("dod"));
			setDod(data);
		}
	}, []);

	// Edit info function
	const handleEditInfo = () => {
		// e.preventDefault();

		const data = {
			...updatedUser,
			day_of_delivery: dod,
			address: position,
		};

		axios
			.put(`/api/adddetails/${user?.id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.status == 200) {
					console.log(res);
					setUser({
						...user,
						phone: updatedUser.phone,
						city: updatedUser.city,
						street: updatedUser.street,
						building: updatedUser.building,
						floor: updatedUser.floor,
						// address: position,
					});
					setIsChangedContact(true);
					setPendingData({ ...pendingData, day_of_delivery: dod });
					setIsChangedDod(true);
					props.changeStep();
				} else {
					setUpdatedUser({
						...updatedUser,
						errors: res.data.errors,
					});
				}
			});
	};

	// const handleDod = () => {
	// 	const data = { day_of_delivery: parseInt(dod) };
	// 	axios
	// 		.post("/api/pending", data, {
	// 			headers: {
	// 				Authorization: `Bearer ${cookies.Token}`,
	// 			},
	// 		})
	// 		.then((res) => {
	// 			if (res.data.status == 200) {
	// 				console.log(res);
	// 				setPendingData({ ...pendingData, day_of_delivery: dod });
	// 				setIsChangedDod(true);
	// 			}
	// 		});
	// };

	// Save to database
	// const handleSubmit = () => {
	// 	handleDod();
	// 	handleEditInfo();

	// 	// if ((isChangedContact && isChangedDod) == true) {
	// 	// 	props.changeStep();
	// 	// }
	// };

	console.log(isChangedContact);
	console.log(isChangedDod);

	return (
		<div className="relative block rounded-xl bg-white border border-gray-100 p-5 shadow-xl w-11/12 md:w-9/12  lg:w-11/12 xl:w-9/12 mx-auto mt-20 mb-44">
			<div className="hidden lg:block absolute left-1/2 -ml-0.5 w-0.5 h-56 top-1/2 -translate-y-1/2 bg-gray-300"></div>
			<section>
				{/* <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"> */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16  justify-items-center items-center">
					<div className="w-9/12 sm:h-80 lg:h-full flex flex-col ">
						<form className="flex flex-col gap-4">
							<h2 className="text-3xl text-darkRed font-bold sm:text-4xl text-center py-5">
								Tell Us More About Yourself
							</h2>
							{/* {updatedUser?.errors != "" && (
								<Alert color="failure" icon={HiInformationCircle}>
									<span>{updatedUser?.errors}</span>
								</Alert>
							)} */}
							<div className="relative">
								<input
									type="tel"
									id="phone"
									name="phone"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-darkRed peer"
									placeholder=" "
									defaultValue={updatedUser?.phone}
									onChange={handleInput}
								/>
								<label
									htmlFor="phone"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Phone
								</label>
								<small className="text-red-500">
									{updatedUser?.errors.phone}
								</small>
							</div>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="relative">
									<input
										type="text"
										id="street"
										name="street"
										className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-darkRed peer"
										placeholder=" "
										defaultValue={updatedUser?.street}
										onChange={handleInput}
									/>
									<label
										htmlFor="street"
										className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
									>
										Street
									</label>
									<small className="text-red-500">
										{updatedUser?.errors.street}
									</small>
								</div>

								<div className="relative">
									<input
										type="text"
										id="city"
										name="city"
										className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-darkRed peer"
										placeholder=" "
										defaultValue={updatedUser?.city}
										onChange={handleInput}
									/>
									<label
										htmlFor="city"
										className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
									>
										City
									</label>
									<small className="text-red-500">
										{updatedUser?.errors.city}
									</small>
								</div>
							</div>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="relative">
									<input
										type="text"
										id="building"
										name="building"
										className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-darkRed peer"
										placeholder=" "
										defaultValue={updatedUser?.building}
										onChange={handleInput}
									/>
									<label
										htmlFor="building"
										className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
									>
										Building
									</label>
									<small className="text-red-500">
										{updatedUser?.errors.building}
									</small>
								</div>

								<div className="relative">
									<input
										className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-darkRed peer"
										placeholder=" "
										type="number"
										id="floor"
										name="floor"
										defaultValue={updatedUser?.floor}
										onChange={handleInput}
									/>
									<label
										className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-darkRed peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
										htmlFor="floor"
									>
										Floor
									</label>
									<small className="text-red-500">
										{updatedUser?.errors.floor}
									</small>
								</div>
							</div>

							<label
								htmlFor="deliveryDay"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 sr-only"
							>
								Select your day of delivery
							</label>
							<select
								id="deliveryDay"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-darkRed focus:border-darkRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
								onChange={(e) => {
									setDod(e.target.value);
									localStorage.setItem("dod", JSON.stringify(e.target.value));
								}}
							>
								<option selected={dod === null}>
									Choose your day of delivery
								</option>
								<option value="0" selected={dod == 0}>
									Sunday
								</option>
								<option value="1" selected={dod == 1}>
									Monday
								</option>
								<option value="2" selected={dod == 2}>
									Tuesday
								</option>
								<option value="3" selected={dod == 3}>
									Wednesday
								</option>
								<option value="4" selected={dod == 4}>
									Thursday
								</option>
								<option value="5" selected={dod == 5}>
									Friday
								</option>
								<option value="6" selected={dod == 6}>
									Saturday
								</option>
							</select>
							<small className="text-red-500">
								{updatedUser?.errors.day_of_delivery}
							</small>
						</form>
					</div>
					<div className="flex flex-col items-center">
						<h2 className="text-3xl text-darkRed font-bold sm:text-4xl text-center py-5 sm:pt-32 sm:pb-5 lg:py-5">
							Refine Location
						</h2>
						{/* <iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d433875.4492923406!2d35.37324930415098!3d31.834470148162954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d7981af%3A0x631c30c0f8dc65e8!2sAmman!5e0!3m2!1sen!2sjo!4v1667574218991!5m2!1sen!2sjo"
							className="w-[300px] h-[200px] sm:w-[400px] sm:h-[300px]"
							// width="400"
							// height="300"
							allowfullscreen=""
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
						></iframe> */}

						<MapComponent position={position} setPosition={setPosition} />

						<div className="py-10">
							{isChangedContact && isChangedDod ? (
								<Button
									bgColor="bg-darkGreen"
									hoverColor="hover:bg-darkGreen/80"
									text="CONTINUE"
									padding="px-32 sm:px-40"
									onClick={props.changeStep}
								/>
							) : (
								<Button
									bgColor="bg-darkYellow"
									hoverColor="hover:bg-lemonSh"
									text="SAVE"
									padding="px-32 sm:px-40"
									onClick={handleEditInfo}
								/>
							)}
						</div>
					</div>
				</div>
				{/* </div> */}
			</section>
		</div>
	);
}
