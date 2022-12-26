import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import swal from "sweetalert";

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
	const [meals, setMeals] = useState([]);

	const [mealData, setMealData] = useState({
		name: "",
		image: "",
		category_id: "",
		short_desc: "",
		long_desc: "",
		cost: "",
		note: "",
		tags: "",
		prep_time: "",
		calories: "",
		fat: "",
		saturated_fat: "",
		carbs: "",
		sugar: "",
		fiber: "",
		protein: "",
		cholesterol: "",
		sodium: "",
		ingredients: [],
	});
	const [url, setUrl] = useState(null);
	// useEffect(() => {
	// 	console.log("mealData");
	// 	console.log(mealData);
	// }, [mealData]);

	const [mealErrors, setMealErrors] = useState({});

	const [inputFields, setInputFields] = useState([
		{ ingredient: "", optional: false },
	]);
	// Get all meals
	useEffect(() => {
		axios.get("/api/allmeals/get").then((res) => {
			if (res.data.status === 200) {
				console.log(res);
				setMeals(res.data.meals);
			}
		});
	}, []);

	const handleInputMeals = (e) => {
		setMealData({ ...mealData, [e.target.name]: e.target.value });
	};

	const validateMeal = () => {
		const newErrors = {};

		if (mealData.name.replace(/ /g, "") === "") {
			newErrors.name = "Name is required";
		}
		if (mealData.category_id.replace(/ /g, "") === "") {
			newErrors.category_id = "Category is required";
		}
		if (mealData.short_desc.replace(/ /g, "") === "") {
			newErrors.short_desc = "Short description is required";
		}
		if (mealData.long_desc.replace(/ /g, "") === "") {
			newErrors.long_desc = "Long description is required";
		}
		if (mealData.prep_time.replace(/ /g, "") === "") {
			newErrors.prep_time = "Preparation time is required";
		}
		if (mealData.calories.replace(/ /g, "") === "") {
			newErrors.calories = "Calories are required";
		}
		if (mealData.fat.replace(/ /g, "") === "") {
			newErrors.fat = "Fat content is required";
		}
		if (mealData.saturated_fat.replace(/ /g, "") === "") {
			newErrors.saturated_fat = "Saturated fat content is required";
		}
		if (mealData.carbs.replace(/ /g, "") === "") {
			newErrors.carbs = "Carbohydrate content is required";
		}
		if (mealData.sugar.replace(/ /g, "") === "") {
			newErrors.sugar = "Sugar content is required";
		}
		if (mealData.fiber.replace(/ /g, "") === "") {
			newErrors.fiber = "Fiber content is required";
		}
		if (mealData.protein.replace(/ /g, "") === "") {
			newErrors.protein = "Protein content is required";
		}
		if (mealData.cholesterol.replace(/ /g, "") === "") {
			newErrors.cholesterol = "Cholesterol content is required";
		}
		if (mealData.sodium.replace(/ /g, "") === "") {
			newErrors.sodium = "Sodium content is required";
		}
		if (mealData.ingredients.length === 0) {
			newErrors.ingredients = "Ingredients are required";
		}

		return newErrors;
	};

	useEffect(() => {
		if (inputFields.length > 0) {
			const ingredientsArr = inputFields?.filter(
				(input) => input.ingredient.replace(/ /g, "") != ""
			);
			setMealData({ ...mealData, ingredients: ingredientsArr });
		}
	}, [inputFields]);

	const handleAddMeal = () => {
		const errors = validateMeal();
		setMealErrors(errors);

		if (Object.keys(mealErrors).length === 0) {
			const formData = new FormData();

			// for (const key in mealData) {
			// 	if (mealData.hasOwnProperty(key)) {
			// 		formData.append(key, mealData[key]);
			// 	}
			// }

			formData.append("name", mealData.name);
			formData.append("image", mealData.image);
			formData.append("category_id", mealData.category_id);
			formData.append("short_desc", mealData.short_desc);
			formData.append("long_desc", mealData.long_desc);
			formData.append("cost", mealData.cost);
			formData.append("note", mealData.note);
			formData.append("tags", mealData.tags);
			formData.append("prep_time", mealData.prep_time);
			formData.append("calories", mealData.calories);
			formData.append("fat", mealData.fat);
			formData.append("saturated_fat", mealData.saturated_fat);
			formData.append("carbs", mealData.carbs);
			formData.append("sugar", mealData.sugar);
			formData.append("fiber", mealData.fiber);
			formData.append("protein", mealData.protein);
			formData.append("cholesterol", mealData.cholesterol);
			formData.append("sodium", mealData.sodium);
			formData.append("ingredients", JSON.stringify(mealData.ingredients));

			axios.post("/api/meal/add", formData).then((res) => {
				if (res.data.status === 200) {
					console.log(res);
					setMeals(res.data.meals);
					setMealData({
						name: "",
						image: "",
						category_id: "",
						short_desc: "",
						long_desc: "",
						cost: "",
						note: "",
						tags: "",
						prep_time: "",
						calories: "",
						fat: "",
						saturated_fat: "",
						carbs: "",
						sugar: "",
						fiber: "",
						protein: "",
						cholesterol: "",
						sodium: "",
						ingredients: [],
					});
					setInputFields([{ ingredient: "", optional: false }]);
					setUrl(null);
					setMealErrors({});
					swal("Meal added successfully", "", "success");
				} else if (res.data.status === "failure") {
					console.log(res);
					setMealErrors(res.data.errors);
				}
			});
		}
	};
	return (
		<AdminContext.Provider
			value={{
				meals,
				setMeals,
				mealData,
				setMealData,
				handleInputMeals,
				inputFields,
				setInputFields,
				handleAddMeal,
				mealErrors,
				setMealErrors,
				url,
				setUrl,
			}}
		>
			{children}
		</AdminContext.Provider>
	);
}
