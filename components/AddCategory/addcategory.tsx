"use client";

import React, { useState } from "react";
import { useFinancesStore } from "../../stores";

export default function Addcategory() {
	const financesStore = useFinancesStore();
	const [cat, setCat] = useState("");
	const onHandleAdd = (e: any) => {
		setCat(e.target?.value);
	};
	const token = localStorage?.getItem("token") ?? "";
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const onHandleSubmit = async () => {
		try {
			financesStore.addCategory(cat,config);
			setCat("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={"flex flex-col"}>
			<label className={"flex flex-col mb-4 text-sm"}>
				Категорія
				<input value={cat} onChange={onHandleAdd} className={"border-2 h-8"} />
			</label>
			<button
				disabled={!cat}
				onClick={onHandleSubmit}
				className={"border-2 w-max pl-8 pr-8 m-auto"}
			>
				Добавити
			</button>
			<div>
				{financesStore.category.map((el) => (
					<p className={"mt-2 text-xl text-blue-900"} key={el.id}>
						{el.name}
					</p>
				))}
			</div>
		</div>
	);
}
