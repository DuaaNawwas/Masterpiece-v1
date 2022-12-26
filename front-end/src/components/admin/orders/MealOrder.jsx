import React, { useEffect } from "react";
import { useState } from "react";

export default function MealOrder({ meal }) {
	const [removedIngs, setRemovedIngs] = useState();
	useEffect(() => {
		if (meal?.removedingredients.length > 0) {
			const removedIngredients = Object.keys(meal?.removedingredients[0])
				.filter(
					(key) =>
						key.includes("remove") && meal?.removedingredients[0][key] != null
				)
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: meal?.removedingredients[0][key],
					});
				}, {});

			const removed = Object.values(removedIngredients);
			const ings = meal?.ingredients?.filter((ing) => removed.includes(ing.id));
			setRemovedIngs(ings);
		}
	}, []);
	return (
		<article class="group">
			<img
				alt=""
				src={meal?.image}
				class="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
			/>

			<div class="p-4">
				<a href="#">
					<h3 class="text-lg font-medium text-gray-900">{meal?.name}</h3>
				</a>
				{removedIngs ? (
					<p class="mt-2 text-sm leading-relaxed text-gray-500 ">
						Removed ingredients:{" "}
						<ul>
							{removedIngs?.map((ing) => {
								return <li>- {ing.name}</li>;
							})}
						</ul>
					</p>
				) : (
					""
				)}
			</div>
		</article>
	);
}
