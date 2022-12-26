import axios from "axios";
import { Badge } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PaymentHistoryTable() {
	const { cookies } = useContext(AuthContext);
	const [paymentHis, setPaymentHis] = useState();

	useEffect(() => {
		axios
			.get("/api/paymenthistory", {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				console.log(res);
				setPaymentHis(res.data.payments);
			});
	}, []);

	return (
		<div className="overflow-x-auto relative w-11/12 lg:w-full">
			<table className=" mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="py-3 px-6">
							Date
						</th>
						<th scope="col" className="py-3 px-6">
							Plan
						</th>
						<th scope="col" className="py-3 px-6">
							Price
						</th>
						<th scope="col" className="py-3 px-6">
							Card Type
						</th>
						<th scope="col" className="py-3 px-6">
							Card Number
						</th>
						<th scope="col" className="py-3 px-6">
							Status
						</th>
					</tr>
				</thead>
				<tbody>
					{paymentHis?.map((payment, i) => {
						const card = JSON.parse(payment.payment.card_num);
						return (
							<tr
								key={i}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							>
								<th
									scope="row"
									className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{payment?.created_at.split("T")[0]}
								</th>
								<td className="py-4 px-6">
									{payment.meals_per_week} meals for {payment.people_num} people
								</td>
								<td className="py-4 px-6">{payment.price} Jd</td>
								<td className="py-4 px-6 capitalize">{card.brand}</td>
								<td className="py-4 px-6">**** **** **** {card.last4}</td>
								<td className="py-4 px-6">
									{payment.status == 1 ? (
										<Badge color="success">Active</Badge>
									) : (
										<Badge color="warning">Inactive</Badge>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
