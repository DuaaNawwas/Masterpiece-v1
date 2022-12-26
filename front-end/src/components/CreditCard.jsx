import React from "react";

export default function CreditCard(props) {
	return (
		<div className="py-2 px-4 md:px-1 w-full ">
			<form className="bg-myBlack rounded-lg py-2 shadow-2xl">
				<div className="rounded-t-lg text-lg text-white w-full flex items-center justify-between border-b border-gray-300 ">
					<span className="block ml-2 font-semibold">Credit card</span>
					<div className="flex">
						<img
							className="h-10 w-10 object-contain mr-2"
							src="https://upload.wikimedia.org/wikipedia/commons/1/16/Former_Visa_%28company%29_logo.svg"
							alt="Visa"
						/>
						<img
							className="h-10 w-10 object-contain mr-2"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
							alt="Master card"
						/>
					</div>
				</div>

				<div className="mb-1 p-2">
					<input
						id="name"
						name="name"
						type="text"
						placeholder="CARD NAME"
						required
						className="w-full px-2 py-1 lg:px-4 lg:py-2 bg-myBlack text-white text-sm lg:text-md border border-none rounded-lg focus:outline-none   placeholder:text-gray-400"
					/>
				</div>
				<div className="flex mb-1 p-2">
					<input
						type="text"
						id="card"
						name="cardNum-1"
						maxLength={4}
						required
						className="w-1/4 border-none  flex-1 text-xs xl:text-lg py-1 lg:py-2 px-2 lg:px-4 bg-myBlack text-white  rounded-l-lg   focus:outline-none placeholder:text-gray-400 xl:tracking-[0.15rem] placeholder:text-center "
						placeholder="XXXX"
						onChange={props.handleChange}
					/>
					<input
						type="text"
						id="card"
						name="cardNum-2"
						maxLength={4}
						required
						className="w-1/4 border-none  inline-block text-xs xl:text-lg py-1 xl:py-2 px-2 xl:px-4 bg-myBlack text-white    focus:outline-none placeholder:text-gray-400 xl:tracking-[0.15rem] placeholder:text-center "
						placeholder="XXXX"
						onChange={props.handleChange}
					/>
					<input
						type="text"
						id="card"
						name="cardNum-3"
						maxLength={4}
						required
						className="w-1/4 border-none  inline-block text-xs xl:text-lg py-1 xl:py-2 px-2 xl:px-4 bg-myBlack text-white    focus:outline-none placeholder:text-gray-400 xl:tracking-[0.15rem] placeholder:text-center "
						placeholder="XXXX"
						onChange={props.handleChange}
					/>
					<input
						type="text"
						id="card"
						name="cardNum-4"
						maxLength={4}
						required
						className="w-1/4 border-none   inline-block text-xs xl:text-lg py-1 xl:py-2 px-2 xl:px-4 bg-myBlack text-white    rounded-r-lg focus:outline-none placeholder:text-gray-400 xl:tracking-[0.15rem] placeholder:text-center "
						placeholder="XXXX"
						onChange={props.handleChange}
					/>
				</div>

				<div className="w-full">
					<div className="flex my-1 p-2">
						<input
							type="text"
							id="month"
							name="cardInfo-1"
							required
							maxLength="2"
							className="w-1/4 border-none  flex-1 text-xs xl:text-lg py-1 xl:py-2 px-2 xl:px-4 bg-myBlack text-white rounded-l-lg   focus:outline-none placeholder:text-center "
							placeholder="MM"
							onChange={props.handleChange}
						/>
						<input
							type="text"
							id="year"
							name="cardInfo-2"
							required
							maxLength="2"
							className="w-1/4  border-none inline-block text-xs xl:text-lg py-1 xl:py-2 px-2 xl:px-4 bg-myBlack text-white   rounded-r-lg focus:outline-none placeholder:text-center "
							placeholder="YY"
							onChange={props.handleChange}
						/>
						<div className="w-1/4" />

						<input
							type="text"
							id="cvc"
							name="cardInfo-3"
							required
							maxLength="3"
							className="w-1/4 border-none  inline-block text-xs xl:text-lg py-1 xl:py-2 px-2 xl:px-4 bg-myBlack text-white rounded-lg focus:outline-none placeholder:text-center "
							placeholder="CVC"
							onChange={props.handleChange}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
