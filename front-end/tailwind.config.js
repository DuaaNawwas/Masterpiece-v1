/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		fontFamily: {
			merri: ["Merriweather", "serif"],
		},
		// screens: {
		// 	sm: "480px",
		// 	md: "768px",
		// 	lg: "976px",
		// 	xl: "1440px",
		// },
		extend: {
			colors: {
				main: "#EEECEA",
				mainSh: "#E0DDD9",
				darkRed: "#6A2E0A",
				secRed: "#762E0C",
				darkYellow: "#D7B34C",
				lemonSh: "rgba(215, 179, 76, 0.9)",
				rusty: "#BB4314",
				rustySh: "rgba(187, 67, 20, 0.9)",
				darkGreen: "#606E6B",
				myBlack: "#241B0A",
				modalColor: "#FFFCFC",
			},
			backgroundImage: {
				"hero-bg": "url('/public/hero.png')",
				"login-bg": "url('/public/loginpic.jpg')",
			},
			display: ["group-hover"],
		},
	},
	safelist: ["darkYellow", "lemonSh", "rusty"],
	plugins: [require("flowbite/plugin")],
};
