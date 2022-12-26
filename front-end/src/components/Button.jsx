import React from "react";

export default function Button(props) {
	return (
		<button
			className={`inline-flex items-center justify-center py-2 ${props.padding} ${props.textColor} ${props.bgColor} ${props.style} font-medium  rounded shadow-md ${props.hoverColor} hover:drop-shadow-lg focus:shadow-outline focus:outline-none tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:bg-darkGreen/40 disabled:hover:shadow-md disabled:hover:bg-darkGreen/40`}
			aria-label={props.text}
			title={props.text}
			type={props.type}
			onClick={props.onClick}
			data-aos={props.dataaos}
			data-aos-duration={props.dataaosduration}
			disabled={props.disabled}
		>
			{props.text}
		</button>
	);
}

Button.defaultProps = {
	padding: "px-5",
	textColor: "text-main",
	style: "",
	type: "button",
	disabled: false,
};
