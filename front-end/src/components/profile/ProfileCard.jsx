import axios from "axios";
import { Avatar } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";

export default function ProfileCard() {
	const { user, cookies, setUser } = useContext(AuthContext);

	// Function to update user image
	const handleProfilePic = (e) => {
		let image = e.target.files[0];
		let formData = new FormData();
		formData.append("image", image);

		axios
			.post("/api/profileimage", formData, {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setUser(res.data.user);
					console.log(res);
				} else {
					swal("Oops!", res.data.image[0], "error");
					formData.delete("image");
					console.log(res);
				}
			})
			.catch((res) => {
				if (res.response.status === 413) {
					swal("Oops!", res.response.statusText, "error");
					formData.delete("image");
				}
			});
	};

	return (
		<div className="w-full max-w-md mx-auto px-8 py-8 mt-20 bg-white rounded-lg shadow-lg dark:bg-gray-800">
			<div className="relative flex justify-center -mt-16 group">
				<img
					class="w-20 h-20 rounded-full"
					src={user?.image}
					alt=""
					referrerPolicy="no-referrer"
				/>
				<label
					htmlFor="profileImage"
					className="w-20 h-20 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
				>
					<img
						className="hidden group-hover:block w-5"
						src="https://www.svgrepo.com/show/33565/upload.svg"
						alt=""
					/>
					<input
						type="file"
						className="hidden"
						id="profileImage"
						onChange={handleProfilePic}
					/>
				</label>
			</div>

			<h2 className="pt-6 text-center text-2xl font-semibold text-gray-800  md:mt-0 md:text-3xl capitalize">
				Welcome {user?.first_name + " " + user?.last_name}
			</h2>

			<p className="mt-2 text-center text-gray-600 dark:text-gray-200">
				You can manage your profile here
			</p>
			{/* <p className="mt-2 text-gray-600 dark:text-gray-200">Payment Info:</p> */}

			{/* <div className="flex justify-end mt-4">
				<Button bgColor="bg-darkGreen" text="EDIT PROFILE" />
			</div> */}
		</div>
	);
}
