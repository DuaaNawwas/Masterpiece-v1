import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "../components/subscribe/Steps";
import Details from "../components/subscribe/Details";
import Payment from "../components/subscribe/Payment";
import Plan from "../components/subscribe/Plan";
import Registration from "./Registration";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Subscribe() {
	const { state } = useLocation();
	const { fromSpecificPage } = state || {};

	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (user?.is_sub == 1) {
			navigate("/profile", { replace: true });
		}
	}, []);

	const [step, setStep] = useState(1);

	const incrementStep = () => {
		setStep(step + 1);
		window.scrollTo(0, 0);
	};

	const changeStep = (i) => {
		setStep(i);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (fromSpecificPage) {
			setStep(2);
		}
	}, []);

	return (
		<>
			{step == 1 ? (
				<>
					<Steps step={step} changeStep={changeStep} />
					<Plan changeStep={incrementStep} />
				</>
			) : step == 2 ? (
				<>
					<Steps step={step} changeStep={changeStep} />
					<Details changeStep={incrementStep} />
				</>
			) : step == 3 ? (
				<>
					<Steps step={step} changeStep={changeStep} />
					<Payment changeStep={incrementStep} />
				</>
			) : (
				<NotFound />
			)}
		</>
	);
}
