import React from "react";
import registerpic from "../images/registerpic.png";
import SocialLogin from "../components/login/SocialLogin";
import RegisterForm from "../components/login/RegisterForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Registration() {
	const { cookies } = useContext(AuthContext);
	const { state } = useLocation();
	const navigate = useNavigate();
	const { fromSpecificPage } = state || {};

	useEffect(() => {
		if (cookies.Token) {
			navigate("/profile", { replace: true });
		}
	}, []);

	return (
		<>
			<div className="relative block rounded-xl bg-white border border-gray-100 p-1 xs:pb-5 sm:pb-32 md:pb-32 lg:pb-5 shadow-xl w-11/12 md:w-9/12  lg:w-11/12 xl:w-9/12  mx-auto mt-20 mb-44">
				<div className="hidden lg:block absolute left-1/2 -ml-0.5 w-0.5 h-56 top-1/2 -translate-y-1/2 bg-gray-300"></div>
				<section>
					<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16  justify-items-center items-center">
							<div className="w-9/12 sm:h-80 lg:h-full flex flex-col ">
								<RegisterForm />
								{fromSpecificPage ? null : (
									<>
										<div className="flex my-2 text-sm font-semibold items-center text-myBlack">
											<div className="flex-grow border-t h-px mr-3"></div>
											OR
											<div className="flex-grow border-t h-px ml-3"></div>
										</div>
										<SocialLogin />
									</>
								)}
							</div>
							<div>
								<img
									src={registerpic}
									className="mx-auto hidden lg:block w-full"
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
