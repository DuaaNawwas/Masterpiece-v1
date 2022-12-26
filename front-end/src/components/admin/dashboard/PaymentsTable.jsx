import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Pagination, TextInput, Tooltip } from "flowbite-react";
import axios from "axios";
export default function PaymentsTable() {
	// const { concertData, loadingT, setLoadingT, searchTicket, setSearchTicket } = useContext(AdminContext);
	const [data, setData] = useState();
	const [search, setSearch] = useState("");
	const [columns, setColumns] = useState();
	const [w, setW] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [nPages, setNPages] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(10);
	const [indexOfLastRecord, setIndexOfLastRecord] = useState(); // = currentPage * recordsPerPage;

	const indexOfFirstRecord =
		indexOfLastRecord - recordsPerPage < 0
			? 0
			: indexOfLastRecord - recordsPerPage;
	const [currentRecords, setCurrentRecords] = useState([]);
	// const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);
	const navigate = useNavigate();
	function transformDate(dateString) {
		const date = new Date(dateString);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		};
		return date.toLocaleDateString("en-US", options);
	}
	const reArrangeData = (data) => {
		console.log("data");
		console.log(data);
		const dataForTable = data?.map((payment) => ({
			id: payment.id,
			date: makeDateHumanReadable(payment.created_at),
			amount: payment.amount,
			email: payment.user.email,
			name: payment.user.first_name + " " + payment.user.last_name,
			city: payment.user.city,
			img: payment.user.image,
			phone: payment.user.phone,
			brand: JSON.parse(payment.card_num).brand,
			last4: JSON.parse(payment.card_num).last4,
		}));
		console.log("dataForTable");
		console.log(dataForTable);
		setData(dataForTable);
	};
	useEffect(() => {
		axios.get("/api/payments").then((res) => {
			reArrangeData(res.data.payments);
		});
	}, []);

	useEffect(() => {
		setColumns([
			{
				name: "Id",
				id: "id",
				sort: true,
			},
			{
				name: "Email",
				id: "email",
				sort: true,
			},
			{
				name: "Last 4 Card .Num",
				id: "last4",
				sort: true,
			},
			{
				name: "Card brand",
				id: "brand",
				sort: true,
			},
			{
				name: "Amount",
				id: "amount",
				sort: true,
			},
			{
				name: "Date",
				id: "date",
				sort: true,
			},
		]);
	}, []);

	useEffect(() => {
		data?.length - (currentPage - 1) * recordsPerPage < recordsPerPage
			? setIndexOfLastRecord(data?.length)
			: setIndexOfLastRecord(recordsPerPage * currentPage);
		const num = Math.ceil(data?.length / recordsPerPage);
		if (num) {
			num <= 1 ? setNPages(1) : setNPages(num);
		}
	}, [data, currentPage, recordsPerPage]);

	useEffect(() => {
		// setCurrentRecords()
		if (search == "") {
			setCurrentRecords(data?.slice(indexOfFirstRecord, indexOfLastRecord));
		} else {
			const filtered = data?.filter((entry) =>
				Object.values(entry).some(
					(val) =>
						(typeof val === "string" &&
							val.toLowerCase().includes(search.toLowerCase())) ||
						(typeof val === "number" &&
							val.toString().includes(search.toString()))
				)
			);

			setCurrentRecords(filtered);
		}
	}, [data, search, indexOfFirstRecord, indexOfLastRecord]);

	// check state effect

	function sortByKey(array, key, sort) {
		sort
			? setData([...array].sort((a, b) => (a[key] < b[key] ? 1 : -1)))
			: setData([...array].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
		setW(!w);
	}

	function makeDateHumanReadable(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString() + " " + date.toLocaleTimeString();
	}
	return (
		<section className="w-9/12 m-auto p-6  bg-white rounded-md shadow-md dark:bg-gray-800 space-y-5">
			<h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
				Payments
			</h2>
			<TextInput
				id="email1"
				type="email"
				placeholder="Search"
				required={true}
				className="w-52 my-2"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							{columns?.map((col, i) => {
								return (
									<th key={i} scope="col" class="py-3 px-6">
										{col.sort ? (
											<span
												onClick={() => sortByKey(data, col.id, w)}
												className="flex items-center gap-2 cursor-pointer hover:text-gray-500"
											>
												{col.name}

												<IoIosArrowDown size={12} />
											</span>
										) : (
											<span className="flex items-center gap-2  ">
												{col.name}
											</span>
										)}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{currentRecords?.length > 0 ? (
							currentRecords?.map((item, i) => {
								return (
									<tr
										key={i}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										<td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white">
											{item.id}
										</td>
										<Tooltip
											content={
												<div className="flex flex-col gap-2">
													<span className="flex gap-2 items-center">
														<img
															src={item.img}
															className="rounded-full w-7 h-7"
															alt=""
														/>

														<span>{item.name}</span>
													</span>
													<span>Phone : {item.phone}</span>
													<span>City : {item.city}</span>
												</div>
											}
										>
											<td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-500 hover:dark:text-blue-500">
												{item.email}
											</td>
										</Tooltip>
										<td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white">
											{item.last4}
										</td>
										<td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white">
											{item.brand}
										</td>
										<td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white">
											{item.amount}
										</td>
										<td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white">
											{item.date}
										</td>
									</tr>
								);
							})
						) : (
							<tr className="dark:bg-gray-900">
								<td colSpan={columns?.length}>
									<div className="flex justify-center items-center    ">
										<p>No Data Was Found</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={columns?.length}>
								<div className="flex justify-around items-center    ">
									<div>
										{search === "" ? (
											<span>
												{indexOfFirstRecord + 1}-{indexOfLastRecord} of{" "}
												{data?.length}
											</span>
										) : (
											<span>Results found: {currentRecords?.length}</span>
										)}
									</div>
									<Pagination
										className={` ${
											(nPages == 1 || search !== "") && "invisible"
										}  pb-2`}
										currentPage={currentPage}
										totalPages={nPages}
										onPageChange={(e) => setCurrentPage(e)}
									/>
									<div
										className={`flex gap-2 items-center ${
											search !== "" && "invisible"
										}`}
									>
										<label className=" whitespace-nowrap ">
											Rows per page:
										</label>
										<div className="   ">
											<div className="my-1 ">
												<select
													onChange={(e) =>
														setRecordsPerPage(parseInt(e.target.value))
													}
													className=" block text-[9px] md:text-[12px] md:px-7 md:py-2 px-2 py-1  dark:bg-slate-700 rounded-md border border-gray-300  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
												>
													<option className="" defaultValue="10">
														10
													</option>
													<option defaultValue="20">20</option>
													<option defaultValue="30">30</option>
													<option defaultValue="50">50</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</section>
	);
}
