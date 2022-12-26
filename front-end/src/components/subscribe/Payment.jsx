import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Button from "../Button";
import CreditCard from "../CreditCard";

export default function Payment() {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const planDetails = JSON.parse(localStorage.getItem("selectedData"));
	const { pricing, pendingData } = useContext(DataContext);
	const { cookies, user, setUser } = useContext(AuthContext);
	const total_servings = planDetails.meals_per_week * planDetails.ppl_num;
	const price_per_serving = pricing?.find(
		(price) => price.servings == total_servings
	);
	const categories = pendingData.categories?.split(",").map((item) => {
		return parseInt(item, 10);
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error, paymentMethod } = await stripe
			.createPaymentMethod({
				type: "card",
				card: elements.getElement(CardElement),
			})
			.then((res) => {
				if (res.paymentMethod) {
					console.log(res);

					const card = {
						brand: res.paymentMethod.card.brand,
						country: res.paymentMethod.card.country,
						last4: res.paymentMethod.card.last4,
					};

					const data = {
						people_num: planDetails.ppl_num,
						meals_per_week: planDetails.meals_per_week,
						price: price_per_serving.total_price,
						card: card,
						categories: categories,
						day_of_delivery: pendingData.day_of_delivery,
					};

					axios
						.post("/api/subscription", data, {
							headers: {
								Authorization: `Bearer ${cookies.Token}`,
							},
						})
						.then((res) => {
							console.log(res);
							if (res.data.status === 200) {
								swal(
									"You subscriberd successfully!",
									"Start planning your week and add some meals!",
									"success"
								);
								setUser({ ...user, is_sub: 1 });
								navigate("/menu", { replace: true });
							}
						});
				}
			});
	};

	return (
		<div className="relative block rounded-xl bg-white border border-gray-100 pb-5 pt-0 lg:p-5 shadow-xl w-11/12 md:w-9/12  lg:w-11/12 xl:w-9/12 mx-auto mt-20 mb-44">
			<div className="hidden lg:block absolute left-1/2 -ml-0.5 w-0.5 h-56 top-2/3 -translate-y-2/3 bg-gray-300"></div>

			<div className="mx-auto max-w-screen-xl px-4 pb-20 pt-0 lg:pt-8  sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 justify-items-center items-center place-items-center">
					<div className="mt-8 lg:mt-20 relative block rounded-xl border border-gray-100 py-4 px-6 shadow-xl bg-main w-full">
						<div className="mt-1 text-myBlack sm:pr-8">
							<h3 className="mt-1 text-2xl font-semibold uppercase underline">
								Payment Details
							</h3>

							<p className="mt-4  text-xl ">Billing Details</p>
							<p className="mt-2  text-lg  ">
								Plan:{" "}
								<span className=" text-lg  text-gray-500">
									{planDetails.meals_per_week} meals per week for{" "}
									{planDetails.ppl_num} people
								</span>
							</p>
							<p className=" text-lg  ">
								Period: <span className=" text-lg  text-gray-500">Monthly</span>
							</p>
							<p className="text-lg  ">
								Total price:{" "}
								<span className=" text-lg text-gray-500">
									{price_per_serving?.total_price} Jd
								</span>
							</p>
						</div>
					</div>

					<div className="w-10/12 sm:h-80 lg:h-full flex flex-col justify-center">
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<h2 className="text-3xl text-darkRed font-bold sm:text-4xl text-center py-5">
								Fill in Your Card Info
							</h2>
							{/* <CreditCard handleChange={handleChange} /> */}
							<CardElement className="border-2 border-darkRed rounded p-5 " />
							<Button
								bgColor="bg-darkYellow"
								hoverColor="hover:bg-lemonSh"
								text="PROCEED"
								type="submit"
								style="float-right"
								padding="px-8"
								disabled={!stripe || !elements}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
