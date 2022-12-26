import React from "react";
import { MdDelete, MdOutlineDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import Button from "../../Button";

export default function MealCardDash({ meal, handleDelete }) {
	return (
		<div className="grid justify-center place-items-center text-gray-900">
			<div className="w-[200px] h-[300px]">
				<img
					src={meal?.image}
					alt=""
					className="w-full h-52 object-cover object-center shadow-md scale-100 hover:scale-110 ease-in duration-100"
				/>

				<div className="relative px-4 -mt-16  ">
					<div className="bg-white p-6 rounded-sm shadow-lg">
						<h4 className="mt-1 text-sm font-semibold uppercase leading-tight truncate">
							{meal?.name}
						</h4>

						<div className="mt-1 text-[10px] truncate whitespace-normal">
							{meal?.short_desc}
						</div>
						<div className="flex gap-5 float-right">
							<Link
								to={`/dashboard/meals/${meal?.id}`}
								className={
									"bg-darkGreen text-white px-2 inline-flex items-center justify-center py-2 font-medium  rounded shadow-md  hover:drop-shadow-lg focus:shadow-outline focus:outline-none tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:bg-darkGreen/40 disabled:hover:shadow-md disabled:hover:bg-darkGreen/40"
								}
							>
								<TbEdit />
							</Link>
							<Button
								bgColor="bg-red-500"
								hoverColor="hover:bg-rustySh"
								text={<MdDelete />}
								onClick={() => handleDelete(meal?.id)}
								style=" px-2"
								type="button"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
