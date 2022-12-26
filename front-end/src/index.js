import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";

// A helper to scroll to top of the page on route change
import ScrollToTop from "./helpers/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		{/* <AuthProvider> */}
		<ScrollToTop />
		<App />
		{/* </AuthProvider> */}
	</BrowserRouter>
);
