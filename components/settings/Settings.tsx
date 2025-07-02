import { useState } from "react";
import Addcategory from "../AddCategory/addcategory";
import UpdateCategory from "../UpdateCategory/updateCategory";
import FinanceGroups from "../FinanceGroups/financeGroups";

export const Settings = () => {
	const [activeTab, setActiveTab] = useState("0");

	return (
		<section className={"p-[16px]"}>
			<div className={"flex gap-4 mb-[20px] border-b-2 pb-1"}>
				<button onClick={() => setActiveTab("0")}>Добавити категорію</button>
				<button onClick={() => setActiveTab("1")}>Добавити опис</button>
				<button onClick={() => setActiveTab("2")}>Фінансові групи</button>
			</div>
			{activeTab === "0" && <Addcategory />}
			{activeTab === "1" && <UpdateCategory />}
			{activeTab === "2" && <FinanceGroups />}
		</section>
	);
};
