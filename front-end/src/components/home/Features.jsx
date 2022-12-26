import React from "react";
import FeatureCard from "./FeatureCard";

export default function Features() {
	return (
		<>
			<div className="flex flex-col gap-10 items-center -mt-10 px-10">
				<div className="flex gap-5 md:gap-16  justify-center">
					<FeatureCard
						img={"qwzdhaoa"}
						text="All the groceries you need delivered to your doorsteps"
					/>
					<FeatureCard
						img={"pimvysaa"}
						text="Save your time and money with our meal kits"
					/>
					<FeatureCard
						img={"ibzzbohe"}
						text="Easy to follow recipes with every meal kit"
					/>
				</div>
			</div>
			<div className="text-myBlack border-t-4 h-2 w-1/2 mx-auto my-10"></div>
		</>
	);
}
