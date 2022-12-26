import React from "react";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import OurMenus from "../components/home/OurMenus";
import Partners from "../components/home/Partners";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
	const { isAdmin } = useContext(AuthContext);
	console.log("-----------------");
	console.log(isAdmin);
	console.log("-----------------");
	return (
		<>
			<Hero />
			{/* <Features /> */}
			<OurMenus />
			<Partners />
		</>
	);
}
