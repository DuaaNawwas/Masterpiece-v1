import React from "react";
import Button from "../Button";

export default function MealCard(props) {
	return (
		<div className="grid justify-center place-items-center text-gray-900">
			<div className="w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] md:w-[300px] lg:[h-300px] xl:w-[400px] xl:h-[400px]">
				<img
					src={props.img}
					alt=" random imgee"
					className="w-full h-72 object-cover object-center shadow-md scale-100 hover:scale-110 ease-in duration-100"
				/>

				<div className="relative px-4 -mt-16  ">
					<div className="bg-white p-6 rounded-sm shadow-lg">
						{/* <div className="flex items-baseline">
							<span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
								New
							</span>
							<div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
								2 baths &bull; 3 rooms
							</div>
						</div> */}

						<h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
							{props.title}
						</h4>

						<div className="mt-1 truncate whitespace-normal">{props.desc}</div>
						<Button
							bgColor="bg-rusty"
							hoverColor="hover:bg-rustySh"
							text="MORE"
							style="float-right"
							type="button"
							onClick={props.showModalRecipe}
						/>
						{/* <div className="mt-4">
							<span className="text-teal-600 text-md font-semibold">
								4/5 ratings{" "}
							</span>
							<span className="text-sm text-gray-600">(based on 234 ratings)</span>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
