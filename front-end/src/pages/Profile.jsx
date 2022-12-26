import { Badge } from "flowbite-react";
import React from "react";
import Button from "../components/Button";
import ChangePassword from "../components/profile/ChangePassword";
import EditForm from "../components/profile/EditForm";
import PaymentHistoryTable from "../components/profile/PaymentHistoryTable";
import ProfileCard from "../components/profile/ProfileCard";
import WeekCard from "../components/profile/WeekCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Profile() {
	const { user, cookies, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!cookies.Token) {
			navigate("/login");
		}
		if (user?.is_sub === null) {
			navigate("/subscribe");
		}
	}, [cookies.Token]);

	const [plan, setPlan] = useState();

	useEffect(() => {
		axios
			.get("/api/plan", {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					console.log(res.data);
					setPlan(res.data.plan);
				}
			});
	}, []);

	const cancelAuto = () => {
		swal({
			title: "Are you sure?",
			text: "Your subscription will not be automatically renewed for next month!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willCancel) => {
			if (willCancel) {
				axios
					.get("/api/cancelauto", {
						headers: {
							Authorization: `Bearer ${cookies.Token}`,
						},
					})
					.then((res) => {
						setUser({ ...user, is_auto_renewed: 0 });
					});
				swal("Poof! Your auto subscription has been canceled!", {
					icon: "success",
				});
			} else {
				swal("Your next month plan is safe!");
			}
		});
	};
	const activateAuto = () => {
		axios
			.get("/api/activateauto", {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				setUser({ ...user, is_auto_renewed: 1 });
				swal("Auto Subscription Activated!", "", "success");
			});
	};

	return (
		<>
			<ProfileCard />
			<Tabs className="flex flex-col  mt-8 text-darkRed">
				<TabList className="text-sm flex justify-center">
					<Tab>Your Plan</Tab>
					<Tab>Edit Info</Tab>
					{user?.google_id || user.facebook_id ? null : (
						<Tab>Change Password</Tab>
					)}
					<Tab>Payment History</Tab>
				</TabList>

				{user?.is_sub === null ? (
					""
				) : (
					<TabPanel>
						<div className="mt-3 w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative">
							{plan ? (
								<>
									<Badge
										color="gray"
										size="sm"
										className="absolute -mt-[6%] md:-mt-[2%] lg:-mt-[5%]"
									>
										{plan?.created_at.split("T")[0]} to {plan?.ending_date}
									</Badge>
									<h1 className="font-bold uppercase text-2xl mb-5 text-center text-darkRed">
										your plan for the month
									</h1>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
										<WeekCard
											week_num={1}
											meals_per_week={plan?.meals_per_week}
										/>
										<WeekCard
											week_num={2}
											meals_per_week={plan?.meals_per_week}
										/>
										<WeekCard
											week_num={3}
											meals_per_week={plan?.meals_per_week}
										/>
										<WeekCard
											week_num={4}
											meals_per_week={plan?.meals_per_week}
										/>
									</div>
								</>
							) : (
								<div className="flex flex-col items-center">
									<h1 className="font-bold uppercase text-2xl mb-5 text-center text-darkRed">
										Your plan ended, you can subscribe again below!
									</h1>
									<Link
										to="/subscribe"
										className="focus:outline-none text-white bg-darkGreen hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
									>
										Subscribe
									</Link>
								</div>
							)}
						</div>
					</TabPanel>
				)}
				<TabPanel>
					<div className="mt-3 w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800">
						<EditForm />
					</div>
				</TabPanel>
				{user?.google_id || user.facebook_id ? null : (
					<TabPanel>
						<div className="mt-3 w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative">
							<ChangePassword />
						</div>
					</TabPanel>
				)}
				<TabPanel>
					<div className="mt-3 w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:px-10 lg:py-20 mx-auto text-gray-800 relative">
						<div className="mx-auto flex flex-col items-center space-y-5">
							<h1 className="font-bold uppercase text-2xl mb-5 text-center text-darkRed">
								Your Payment History
							</h1>
							<PaymentHistoryTable />
							{user?.is_auto_renewed === 1 ? (
								<>
									<h1 className="font-bold pt-10 text-lg mb-5 text-center text-darkRed">
										Your subscription is going to be renewd automatically when
										your current one ends
									</h1>

									<Button
										onClick={cancelAuto}
										bgColor="bg-red-500"
										text="CANCEL AUTORENEWAL"
									/>
								</>
							) : (
								<>
									<h1 className="font-bold pt-10 text-lg mb-5 text-center text-darkRed">
										Your subscription is not going to be renewd automatically
										when your current one ends
									</h1>

									<Button
										onClick={activateAuto}
										bgColor="bg-green-500"
										text="ACTIVATE AUTORENEWAL"
									/>
								</>
							)}
						</div>
					</div>
				</TabPanel>
			</Tabs>
		</>
	);
}
