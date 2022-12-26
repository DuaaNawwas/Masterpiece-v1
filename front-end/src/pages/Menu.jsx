// import { Button, Modal, Tabs } from "flowbite-react";
import React, { useEffect, useState } from "react";
// import Button from "../components/Button";
import MealCard from "../components/menu/MealCard";
import ModalRecipe from "../components/menu/ModalRecipe";
import ModalTutorial from "../components/menu/ModalTutorial";
import meal1 from "../images/meal1.png";
import meal2 from "../images/meal2.png";
import meal3 from "../images/meal3.png";
import modalimg from "../images/modalimg.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Menu() {
	const [modalRecipe, setModalRecipe] = useState({ show: false, id: "" });
	const [modalTutorial, setModalTutorial] = useState(false);

	const { categories } = useContext(DataContext);
	const { user, cookies } = useContext(AuthContext);

	const token = cookies.Token;
	const [forYouMeals, setForYourMeals] = useState();

	const { state } = useLocation();
	const { fromSpecificPage, routeCateg } = state || {};

	useEffect(() => {
		setModalTutorial(true);

		if (fromSpecificPage || !user || user?.is_sub === 0) {
			setModalTutorial(false);
		}
	}, []);

	const showModalRecipe = (id) => {
		// e.preventDefault();
		setModalRecipe({ show: true, id: id });
	};
	const hideModalRecipe = () => {
		// e.preventDefault();
		setModalRecipe({ show: false });
	};
	const hideModalTutorial = () => {
		// e.preventDefault();
		setModalTutorial(false);
	};

	// Get recommended meals for user
	useEffect(() => {
		console.log("token: " + token);
		axios
			.get("/api/recommendedMeals", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				setForYourMeals(res.data.meals);
			});
	}, []);
	return (
		<>
			{modalTutorial && user?.is_sub === 1 && (
				<ModalTutorial close={hideModalTutorial} show={modalTutorial} />
			)}

			<ModalRecipe
				modalRecipe={modalRecipe.show}
				hideModalRecipe={hideModalRecipe}
				id={modalRecipe.id}
			/>
			{/* active = {true} to make a category active when visited from home */}
			<h2 className="text-center mt-20 pb-6 text-darkRed text-4xl font-bold">
				Browse Our Menus
			</h2>

			<Tabs className="flex flex-col items-center text-darkRed">
				<TabList className="text-sm">
					{token != null && forYouMeals?.length > 0 && <Tab>For You</Tab>}
					{categories?.map((categ, i) => {
						return (
							<Tab key={i} tabIndex={i}>
								{categ.name}
							</Tab>
						);
					})}
				</TabList>
				{token != null && forYouMeals?.length > 0 && (
					<TabPanel>
						<div className="p-5 md:p-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 justify-center items-center content-center">
							{forYouMeals?.map((meal) => {
								return (
									<MealCard
										title={meal.name}
										desc={meal.short_desc}
										img={meal.image}
										showModalRecipe={() => showModalRecipe(meal.id)}
									/>
								);
							})}
						</div>
					</TabPanel>
				)}
				{categories?.map((categ) => {
					return (
						<>
							<TabPanel>
								<div className="p-5 md:p-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 justify-center items-center content-center">
									{categ?.meals.map((meal) => {
										return (
											<MealCard
												title={meal.name}
												desc={meal.short_desc}
												img={meal.image}
												showModalRecipe={() => showModalRecipe(meal.id)}
											/>
										);
									})}
								</div>
							</TabPanel>
						</>
					);
				})}
			</Tabs>
		</>
	);
}
