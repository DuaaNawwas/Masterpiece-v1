import React, { useContext } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidenav from "../components/admin/Sidenav";
import { AuthContext } from "../context/AuthContext";

export default function AdminEnd() {
	const { user, cookies, isAdmin } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!cookies.Token) {
			navigate("/login");
		} else if (!localStorage.getItem("admin")) {
			navigate("/");
		}
	}, [cookies.Token]);

	return (
		<div className="flex">
			<Sidenav />

			<Outlet />
		</div>
	);
}
