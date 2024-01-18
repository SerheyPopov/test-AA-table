import { FC, useEffect, useState } from "react";
import { CampaignsList } from "../../constans/thirdTable";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

interface CampaignData {
	profileId: string;
	campaignId: string;
	clicks: number;
	cost: number;
	date: string;
}

const PAGE_SIZE = 2;

const Campaigns: FC = () => {
	const [campaign, setCampaign] = useState<CampaignData[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

	const { pathname, state } = useLocation();
	const parts = pathname.split("/");
	const id = parts[parts.length - 1];

	useEffect(() => {
		const filteredCampaigns = CampaignsList.filter((item) => {
			const itemCost = item.cost;
			if (minPrice !== undefined && itemCost < minPrice) {
				return false;
			}
			if (maxPrice !== undefined && itemCost > maxPrice) {
				return false;
			}
			return true;
		});

		setCampaign(filteredCampaigns);
	}, [minPrice, maxPrice]);

	const filterIdProfile = campaign.filter((el) => el.profileId === id);

	const totalPageCount = Math.ceil(filterIdProfile.length / PAGE_SIZE);

	const visibleUsers = filterIdProfile.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE
	);

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
			<div className=" mt-10 ml-10">
				<NavLink to={state.pth}>
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
				<h1 className="text-center text-4xl mt-4 mb-3">{state.eml} </h1>
				<div className="flex justify-evenly w-[600px] mx-auto">
					<p className="text-center text-3xl ">{state.cntr}</p>
					<p className="text-center text-3xl ">{state.mrkpls}</p>
				</div>
			</div>
			<div className="flex items-center justify-between w-[600px] mx-auto p-4  ">
				<p className="text-gray-600 w-[90px]">Clics</p>
				<p className="text-gray-600 w-[90px]">Cost</p>
				<p className="text-gray-600 w-[90px]">Date</p>
			</div>
			<div className="flex justify-center gap-2 mb-2 w-[600px] mx-auto mt-4">
				<input
					type="number"
					placeholder="min price"
					value={minPrice !== undefined ? minPrice : ""}
					onChange={(e) =>
						setMinPrice(e.target.value !== "" ? parseFloat(e.target.value) : undefined)
					}
					className="border-2 w-[100px] px-1"
				/>
				<input
					type="number"
					placeholder="max price"
					value={maxPrice !== undefined ? maxPrice : ""}
					onChange={(e) =>
						setMaxPrice(e.target.value !== "" ? parseFloat(e.target.value) : undefined)
					}
					className="border-2 w-[100px] px-1"
				/>
			</div>

			<ul className="w-[600px] mx-auto">
				{visibleUsers.map((item) => (
					<li
						key={item.campaignId}
						className="hover:bg-gray-200 transition duration-300 border rounded overflow-hidden divide-y divide-gray-200 mb-2"
					>
						<div className="flex items-center justify-between p-4">
							<p className="text-gray-600 w-[90px]">{item.clicks}</p>
							<p className="text-gray-600 w-[90px]">{item.cost} $</p>
							<p className="text-gray-600 w-[90px]">{item.date}</p>
						</div>
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

export default Campaigns;
