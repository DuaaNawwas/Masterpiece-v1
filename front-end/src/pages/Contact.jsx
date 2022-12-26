import React, { useEffect } from "react";
import contact from "../images/contact.png";
import { Label, Textarea, TextInput } from "flowbite-react";
import Button from "../components/Button";
// Importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Contact() {
	const { user, cookies } = useContext(AuthContext);
	// Initialize animation library
	useEffect(() => {
		AOS.init();
	}, []);

	const [contactData, setContactData] = useState({
		email: "",
		message: "",
	});

	const [enableBtn, setEnableBtn] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (contactData.email != "" && contactData.message != "") {
			setEnableBtn(true);
		} else {
			setEnableBtn(false);
		}
	}, [contactData]);

	const handleContact = () => {
		if (enableBtn) {
			axios.post("/api/contact", contactData).then((res) => {
				if (res.data.status === 200) {
					console.log(res);
					swal(
						"Your message has been sent successfully!",
						"We will reply to you soon",
						"success"
					);
					setContactData({
						email: "",
						message: "",
					});
				} else if (res.data.status === "failure") {
					setErrors(res.data.errors);
				}
			});
		}
	};
	return (
		<>
			<div className="relative  hidden lg:block w-full h-52">
				<img src={contact} className="mx-auto w-full" />
			</div>

			<div
				data-aos="fade-up"
				data-aos-duration="3000"
				className="relative block rounded-xl bg-white border border-gray-100 p-5 shadow-xl w-11/12 md:w-9/12 lg:w-11/12 xl:w-9/12 mx-auto mt-10 lg:mt-20 mb-44"
			>
				<div className="hidden lg:block absolute left-1/2 -ml-0.5 w-0.5 h-56 top-1/2 -translate-y-1/2 bg-gray-300"></div>
				<section>
					<h2 className="text-3xl text-darkRed font-bold sm:text-4xl text-center py-8">
						Send Us Your Thoughts
					</h2>
					<div className="mx-auto max-w-screen-xl px-4 py-4 lg:py-16 sm:px-6 xl:px-8">
						<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16  justify-items-center">
							<p className=" text-xl text-gray-600 text-justify lg:w-2/3 xl:w-1/2 justify-self-center mx-auto">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
								qui hic atque tenetur quis eius quos ea neque sunt, accusantium
								soluta minus veniam tempora deserunt? Molestiae eius quidem quam
								repellat.
							</p>

							<div className="w-full lg:w-9/12 sm:h-80 lg:h-full flex flex-col ">
								<form action="">
									<div className="mb-5">
										<div className="mb-2 block ">
											<Label
												htmlFor="email3"
												value="Your Email*"
												className="text-myBlack text-lg"
											/>
										</div>
										<TextInput
											id="email3"
											type="email"
											placeholder="name@mail.com"
											required={true}
											onChange={(e) =>
												setContactData({
													...contactData,
													email: e.target.value,
												})
											}
											value={cookies.Token ? user?.email : contactData?.email}
											disabled={cookies.Token ? true : false}
										/>
										<small className="text-darkRed">{errors?.email}</small>
									</div>
									<div className="mb-5">
										<div className="mb-2 block">
											<Label
												htmlFor="comment"
												value="Your Message*"
												className="text-myBlack text-lg"
											/>
										</div>
										<div id="textarea">
											<Textarea
												id="comment"
												placeholder="Leave a comment..."
												required={true}
												rows={4}
												onChange={(e) =>
													setContactData({
														...contactData,
														message: e.target.value,
													})
												}
												value={contactData?.message}
											/>
										</div>
										<small className="text-darkRed">{errors?.email}</small>
									</div>
									<Button
										bgColor="bg-darkYellow"
										hoverColor="hover:bg-lemonSh"
										text="SEND"
										style="float-right"
										padding="px-8"
										disabled={!enableBtn}
										onClick={handleContact}
									/>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
