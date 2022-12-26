import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create auth context
export const AuthContext = createContext();

// Create the provider
export default function AuthProvider({ children }) {
	const navigate = useNavigate();
	// cookies
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);

	const [stateToken, setStateToken] = useState();

	// logged in user
	const [user, setUser] = useState({});
	const [isAdmin, setIsAdmin] = useState(false);

	// Get logged in user data
	useEffect(() => {
		if (cookies.Token) {
			setStateToken(cookies.Token);

			axios
				.get("/api/user", {
					headers: {
						Authorization: `Bearer ${cookies.Token}`,
					},
				})
				.then((res) => {
					setUser(res.data.user);
					if (res.data.user.role === "admin") {
						setIsAdmin(true);
						localStorage.setItem("admin", "true");
					} else {
						setIsAdmin(false);
					}
				});
			console.log(user);
		} else {
			return;
		}
	}, []);

	// Google Login Function
	const loginWithGoogle = (response) => {
		console.log(response);
		const userObject = jwt_decode(response.credential);
		//console.log(userObject);
		const { given_name, family_name, sub, picture, email } = userObject;
		console.log(userObject);

		const data = {
			first_name: given_name,
			last_name: family_name,
			email: email,
			image: picture,
			google_id: sub,
		};
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/googleLogin", data).then((res) => {
				if (res.status === 200) {
					console.log(res.data);
					const token = res.data.token;
					setCookie("Token", token, { path: "/" });
					setStateToken(token);
					setUser(res.data.user);
					if (res.data.user.role === "admin") {
						setIsAdmin(true);
						localStorage.setItem("admin", "true");
					} else {
						setIsAdmin(false);
					}
					navigate("/", { replace: true });
				} else {
					console.log(res);
				}
			});
		});
	};

	// Facebook Login Function
	const loginWithFacebook = (response) => {
		console.log(response);
		const data = {
			first_name: response.name.split(" ")[0],
			last_name: response.name.split(" ")[1],
			email: response.email,
			image: response.picture.data.url,
			facebook_id: response.id,
		};
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/facebookLogin", data).then((res) => {
				if (res.status === 200) {
					console.log(res.data);
					const token = res.data.token;
					setCookie("Token", token, { path: "/" });
					setStateToken(token);
					setUser(res.data.user);
					if (res.data.user.role === "admin") {
						setIsAdmin(true);
						localStorage.setItem("admin", "true");
					} else {
						setIsAdmin(false);
					}
					navigate("/", { replace: true });
				} else {
					console.log(res);
				}
			});
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				cookies,
				setCookie,
				removeCookie,
				loginWithGoogle,
				loginWithFacebook,
				stateToken,
				setStateToken,
				isAdmin,
				setIsAdmin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
