import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export default function DataProvider({ children }) {
	// Save categories from database
	const [categories, setCategories] = useState();
	// Save pricing from database
	const [pricing, setPricing] = useState();

	// Save selected data from plan (step 1)
	const [selectedData, setSelectedData] = useState({
		ppl_num: 2,
		meals_per_week: 4,
	});
	const [selectedCateg, setSelectedCateg] = useState([1, 2]);

	const [pendingData, setPendingData] = useState();
	const { cookies } = useContext(AuthContext);

	// Get Categories and their meals
	useEffect(() => {
		axios.get("/api/categories").then((res) => {
			console.log(res);
			setCategories(res.data.categories);
		});
	}, []);

	// Get pricing data
	useEffect(() => {
		axios.get("/api/pricing").then((res) => {
			console.log(res);
			setPricing(res.data.pricings);
		});
	}, []);

	// Get pending data for a user
	useEffect(() => {
		if (cookies.Token) {
			axios
				.get("/api/pending", {
					headers: {
						Authorization: `Bearer ${cookies.Token}`,
					},
				})
				.then((res) => {
					if (res.data.status === 200) {
						setPendingData(res.data.pending);
						const categs = res.data.pending.categories
							.split(",")
							.map((item) => {
								return parseInt(item, 10);
							});
						const data = [...categs];
						localStorage.setItem("selectedCateg", JSON.stringify(data));
						setSelectedCateg(data);
					} else {
						setSelectedCateg([1, 2]);
						localStorage.setItem("selectedCateg", JSON.stringify([1, 2]));
					}
				});
		} else {
			console.log("out");
			setSelectedCateg([]);
		}
	}, [cookies.Token]);

	// Add data to pending
	const savePending = () => {
		const data = {
			people_num: selectedData.ppl_num,
			meals_per_week: selectedData.meals_per_week,
			categories: selectedCateg.toString(),
		};

		axios
			.post("/api/pending", data, {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				console.log(res);
				// const categs = pendingData?.categories.split(",").map((item) => {
				// 	return parseInt(item, 10);
				// });

				setSelectedCateg([...selectedCateg]);
				return res;
			});
	};

	// useEffect(() => {
	// 	setSelectedCateg(pendingData.categories);
	// }, [pendingData]);

	return (
		<DataContext.Provider
			value={{
				categories,
				setCategories,
				pricing,
				selectedData,
				selectedCateg,
				setSelectedCateg,
				setSelectedData,
				savePending,
				pendingData,
				setPendingData,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
