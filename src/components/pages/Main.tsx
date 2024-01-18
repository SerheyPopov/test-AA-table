import { FC, useEffect, useState } from "react";

import { accountsList } from "../../constans/firstTable";
import { NavLink } from "react-router-dom";

interface AccountData {
	accountId: string;
	email: string;
	authToken: string;
	creationDate: string;
}

const PAGE_SIZE = 5;

const Main: FC = () => {
	const [account, setAccount] = useState<AccountData[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		setAccount(accountsList);
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1);
	};

	const filteredUsers = account.filter((user) =>
		user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPageCount = Math.ceil(filteredUsers.length / PAGE_SIZE);

	const visibleUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	const sortFnAsc = () => {
		const sortedUsersAsc = filteredUsers
			.slice()
			.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
		setAccount(sortedUsersAsc);
	};

	const sortFnDesc = () => {
		const sortedUsersDesc = filteredUsers
			.slice()
			.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
		setAccount(sortedUsersDesc);
	};

	const handlePageChange = (arg: string) => {
		switch (arg) {
			case "prev":
				if (currentPage !== 1) {
					setCurrentPage(currentPage - 1);
				}
				break;
			case "next":
				if (currentPage !== totalPageCount) {
					setCurrentPage(currentPage + 1);
				}
				break;

			default:
				break;
		}
	};
	return (
		<div>
			<div>
				<h1 className="text-center text-4xl mt-4 ">Accounts list</h1>
			</div>

			<div className="mt-10 w-[600px] mx-auto flex justify-between">
				<div className="">
					<input
						type="text"
						placeholder="Search email..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="border-2 w-[240px] px-1"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<button type="button" onClick={sortFnAsc} className="border-2 px-1 hover:bg-gray-300">
						ascending
					</button>
					<button type="button" onClick={sortFnDesc} className="border-2 px-1 hover:bg-gray-300">
						descending
					</button>
				</div>
			</div>
			<div className="flex items-center justify-between w-[600px] mx-auto p-4 ">
				<p className="text-gray-600">Email</p>
				<div className="flex gap-4 items-center w-[200px] justify-between">
					<p className="text-gray-600">Token</p>
					<p className="text-gray-600">Date</p>
				</div>
			</div>
			<ul className=" w-[600px] mx-auto">
				{visibleUsers?.map(({ accountId, email, authToken, creationDate }) => (
					<li
						key={accountId}
						className="hover:bg-gray-200 transition duration-300 border rounded overflow-hidden divide-y divide-gray-200 mb-2"
					>
						<NavLink to={`/account/${accountId}`} state={email} className="block p-4">
							<div className="flex items-center justify-between">
								<p className="text-blue-600 font-semibold">{email}</p>
								<div className="flex gap-4 items-center w-[200px] justify-between">
									<p className="text-gray-600">{authToken}</p>
									<p className="text-gray-600"> {creationDate}</p>
								</div>
							</div>
						</NavLink>
					</li>
				))}
			</ul>

			<div className="w-[600px] mx-auto mb-10 flex justify-center gap-10">
				<button
					type="button"
					onClick={() => handlePageChange("prev")}
					className="w-12 h-12 border-2 rounded-full active:bg-slate-600 hover:bg-gray-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					type="button"
					onClick={() => handlePageChange("next")}
					className="w-12 h-12 border-2 rounded-full active:bg-slate-600 hover:bg-gray-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Main;
