import { FC, useEffect, useState } from "react";
import { ProfilesList } from "../../constans/secondTable";
import { NavLink, useLocation } from "react-router-dom";

interface ProfileData {
	profileId: string;
	country: string;
	marketplace: string;
}

const PAGE_SIZE = 2;

const Profiles: FC = () => {
	const [profile, setProfile] = useState<ProfileData[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchTermCntr, setSearchTermCntr] = useState<string>("");
	const [searchTermMrtpls, setSearchTermMrtpls] = useState<string>("");

	const { pathname, state } = useLocation();
	const parts = pathname.split("/");
	const id = parts[parts.length - 1];

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPage(1);
		if (event.target.id === "1") {
			setSearchTermCntr(event.target.value);
		} else {
			setSearchTermMrtpls(event.target.value);
		}

	};

	const filteredUsers = profile.filter(
		(user) =>
			user.country.toLowerCase().includes(searchTermCntr.toLowerCase()) &&
			user.marketplace.toLowerCase().includes(searchTermMrtpls.toLowerCase())
	);

	useEffect(() => {
		setProfile(ProfilesList.filter((el) => el.accountId === id));
	}, [id]);

	const totalPageCount = Math.ceil(profile.length / PAGE_SIZE);

	const visibleUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
			<div className="mt-10 ml-10">
				<NavLink to="/">
					<button
						type="button"
						className="flex justify-center items-center w-[70px] h-[50px] border-2 rounded-full hover:bg-blue-400 duration-500"
					>
						<svg
							className="w-6 h-6"
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
						Back
					</button>
				</NavLink>
			</div>
			<div>
				<h1 className="text-center text-4xl mt-4 ">Account {state}</h1>
			</div>
			<div className="flex items-center justify-between w-[600px] mx-auto p-4 ">
				<p className="text-gray-600">Country</p>
				<p className="text-gray-600">Marketplace</p>
			</div>
			<div className="w-[600px] mx-auto mb-2 flex justify-between">
				<input
					type="text"
					placeholder="Search country..."
					value={searchTermCntr}
					onChange={handleSearchChange}
					className="border-2 w-[240px] px-1"
					id="1"
				/>
				<input
					type="text"
					placeholder="Search marketplace..."
					value={searchTermMrtpls}
					onChange={handleSearchChange}
					className="border-2 w-[240px] px-1"
					id="2"
				/>
			</div>
			<ul className=" w-[600px] mx-auto">
				{visibleUsers?.map((item) => (
					<li
						key={item.profileId}
						className="hover:bg-gray-200 transition duration-300 border rounded overflow-hidden divide-y divide-gray-200 mb-2"
					>
						<NavLink
							to={`${location.pathname}/profiles/${item.profileId}`}
							state={{ pth: pathname, eml: state, cntr: item.country, mrkpls: item.marketplace }}
							className="block p-4"
						>
							<div className="flex items-center justify-between">
								<p className="text-blue-600 font-semibold">{item.country}</p>
								<p className="text-gray-600">{item.marketplace}</p>
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

export default Profiles;
