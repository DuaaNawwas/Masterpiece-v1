import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Subscribe from "./pages/Subscribe";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Registration from "./pages/Registration";
import DataProvider from "./context/DataContext";
import UserEnd from "./layouts/UserEnd";
import AdminEnd from "./layouts/AdminEnd";
import Dashboard from "./pages/admin/Dashboard";
import AddCategory from "./pages/admin/AddCategory";
import Categories from "./pages/admin/Categories";
import AddMeal from "./pages/admin/AddMeal";
import Meals from "./pages/admin/Meals";
import AdminProvider from "./context/AdminContext";
import EditMeal from "./pages/admin/EditMeal";
import SingleWeek from "./components/admin/orders/SingleWeek";
import OrdersTable from "./pages/admin/OrdersTable";
import ContactsTable from "./pages/admin/ContactsTable";
import Apply from "./pages/Apply";
import ApplicationTable from "./pages/admin/ApplicationTable";

// define axios defaults
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/vnd.api+json";
axios.defaults.headers.post["Accept"] = "application/vnd.api+json";
axios.defaults.withCredentials = true;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_ID);

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function App() {
	return (
		<>
			<Elements stripe={stripePromise}>
				<GoogleOAuthProvider
					clientId={`${process.env.REACT_APP_GOOGLE_API_CLIENT_ID}`}
				>
					<AuthProvider>
						<AdminProvider>
							<DataProvider>
								<Routes>
									<Route path="/" element={<UserEnd />}>
										<Route index element={<Home />} />
										<Route path="/home" element={<Home />} />
										<Route path="/about" element={<About />} />
										<Route path="/contact" element={<Contact />} />
										<Route path="/subscribe" element={<Subscribe />} />
										<Route path="/login" element={<Login />} />
										<Route path="/register" element={<Registration />} />
										<Route path="/menu" element={<Menu />} />
										<Route path="/profile" element={<Profile />} />
										<Route path="/apply" element={<Apply />} />
										<Route path="*" element={<NotFound />} />
									</Route>

									<Route path="/dashboard" element={<AdminEnd />}>
										<Route index element={<Dashboard />} />
										<Route
											path="/dashboard/category/add"
											element={<AddCategory />}
										/>
										<Route
											path="/dashboard/categories"
											element={<Categories />}
										/>
										<Route path="/dashboard/meal/add" element={<AddMeal />} />
										<Route path="/dashboard/meals" element={<Meals />} />
										<Route path="/dashboard/meals/:id" element={<EditMeal />} />
										<Route path="/dashboard/orders" element={<OrdersTable />} />
										<Route
											path="/dashboard/orders/:id"
											element={<SingleWeek />}
										/>
										<Route
											path="/dashboard/contacts"
											element={<ContactsTable />}
										/>
										<Route
											path="/dashboard/applications"
											element={<ApplicationTable />}
										/>
									</Route>
								</Routes>
							</DataProvider>
						</AdminProvider>
					</AuthProvider>
				</GoogleOAuthProvider>
			</Elements>
		</>
	);
}

export default App;
