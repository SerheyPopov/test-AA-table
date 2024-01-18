import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "../components/pages/Main";
// import Accounts from "../components/pages/Accounts";
import Campaigns from "../components/pages/Campaigns";
import Profiles from "../components/pages/Profiles";

const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/account/:id" element={<Profiles />} />
				<Route path="/account/:id/profiles/:id" element={<Campaigns />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
