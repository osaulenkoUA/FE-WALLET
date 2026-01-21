import { useState } from "react";
import AddFinance from "../components/AddFinance/AddFinance";
import { AuthGuard } from "../components/AuthGuard/authGuard";
import { Analyze } from "../components/analyze/Analyze";
import { AnalyzeNew } from "../components/analyze-new/Analyze-new";
import { Header } from "../components/Header/Header";
import { Spinner } from "../components/Spinner/Spinner";
import { Settings } from "../components/settings/Settings";
import { useFinancesStore } from "../stores";

export interface ICategory {
	name: string;
	id: string;
	description?: string[];
	subcategories?: [];
}

export default function Home() {
	const [activeTab, setActiveTab] = useState("0");
	const financesStore = useFinancesStore();

	return (
		<AuthGuard>
			{<Header setActiveTab={setActiveTab} activeTab={activeTab} />}
			{activeTab === "0"  && (
				<AddFinance items={financesStore.category} />
			)}
			{activeTab === "1" && <AnalyzeNew />}
			{activeTab === "7"  && <Analyze />}
			{activeTab === "2" && <Settings />}
			{financesStore.loading && <Spinner />}
		</AuthGuard>
	);
}
