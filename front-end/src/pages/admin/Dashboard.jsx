import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaMoneyBillWave, FaMoneyCheckAlt } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { HiUser } from "react-icons/hi2";
import { MdAutorenew, MdOutlineCategory } from "react-icons/md";
import PaymentsTable from "../../components/admin/dashboard/PaymentsTable";
import StatCard from "../../components/admin/dashboard/StatCard";

export default function Dashboard() {
	const [stats, setStats] = useState();
	useEffect(() => {
		axios.get("/api/stats").then((res) => {
			if (res.data.status === 200) {
				setStats(res.data);
			}
		});
	}, []);
	return (
		<div className="flex flex-col gap-7 pb-5">
			<section className="flex flex-wrap justify-center  gap-10 w-9/12 my-5 mx-auto p-6  bg-white rounded-md shadow-md dark:bg-gray-800">
				<StatCard
					icon={<HiUser size="20" className="text-white" />}
					text={"Total Users"}
					number={stats?.users}
				/>
				<StatCard
					icon={<MdAutorenew size="20" className="text-white" />}
					text={"Users with auto renewal"}
					number={stats?.usersRenewal}
				/>
				<StatCard
					icon={<FaMoneyCheckAlt size="20" className="text-white" />}
					text={"Active Subscriptions"}
					number={stats?.activeSubscriptions}
				/>
				<StatCard
					icon={<MdOutlineCategory size="20" className="text-white" />}
					text={"Categories"}
					number={stats?.categories}
				/>
				<StatCard
					icon={<GiHotMeal size="20" className="text-white" />}
					text={"Meals"}
					number={stats?.meals}
				/>
				<StatCard
					icon={<FaMoneyBillWave size="20" className="text-white" />}
					text={"Total Sales"}
					number={stats?.payments + " Jd"}
				/>
			</section>
			{/* <section className="flex flex-wrap justify-center  gap-10 w-9/12 my-5 mx-auto p-6  bg-white rounded-md shadow-md dark:bg-gray-800"> */}
			<PaymentsTable />
			{/* </section> */}
		</div>
	);
}
