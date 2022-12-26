import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useContext } from "react";
import { FaFacebook } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export default function SocialLogin() {
	const { loginWithGoogle, loginWithFacebook } = useContext(AuthContext);
	return (
		<div className="flex gap-10 justify-center">
			<GoogleLogin
				type="icon"
				shape="circle"
				onSuccess={loginWithGoogle}
				onError={() => {
					console.log("Login Failed");
				}}
			/>
			<FacebookLogin
				appId={process.env.REACT_APP_FACEBOOK_API_ID}
				onSuccess={(response) => {
					console.log("Login Success!", response);
				}}
				onFail={(error) => {
					console.log("Login Failed!", error);
				}}
				onProfileSuccess={loginWithFacebook}
				className=" text-[#4267b2] hover:shadow-lg w-fit rounded-full"
			>
				<FaFacebook size="40" />
			</FacebookLogin>
		</div>
	);
}
