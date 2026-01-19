"use client";
import React, { useEffect, useState } from "react";
import { useFinancesStore } from "../../stores";
import useAuthStore from "../../stores/auth.store";

export default function FinanceGroups() {
	const financesStore = useFinancesStore();
	const { user, getUserProfile } = useAuthStore();
	const token = localStorage?.getItem("token") ?? "";
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const [groupNew, setGroupNew] = useState("");
	const [groupIdAnotherUser, setGroupIdAnotherUser] = useState("");

	const onHandleChangeNewGroup = (e: any) => {
		setGroupNew(e.target?.value);
	};
	const onHandleChangeExistingGroup = (e: any) => {
		setGroupIdAnotherUser(e.target?.value);
	};

	const onHandleAddNew = () => {
		financesStore.addFinanceGroup(groupNew,config);
		setGroupNew("");
	};
	const onHandleJoin = () => {
		financesStore.joinFinanceGroup(groupIdAnotherUser,config);
		setGroupIdAnotherUser("");
	};

	const onAtivateGroup = async (idGroup: string) => {
		void financesStore.activateFinanceGroup(idGroup,config);
		void getUserProfile(config);
		void financesStore.setCategories(config);
	};

	useEffect(() => {
		financesStore.getFinanceGroups(config);
	}, []);

	return (
		<div className={"block"}>
			<div className={"mb-8"}>
				<label className={"flex flex-col mb-2 text-sm"}>
					фінансова група
					<input
						placeholder={"нова група"}
						value={groupNew}
						onChange={onHandleChangeNewGroup}
						className={"border-2 h-8"}
					/>
				</label>
				<button
					onClick={onHandleAddNew}
					className={"border-2 w-max pl-8 pr-8 m-auto"}
				>
					Добавити нову групу
				</button>
			</div>
			<div className={"mb-8"}>
				<label className={"flex flex-col mb-2 text-sm"}>
					ID Існуючої фінансової групи
					<input
						placeholder={"ID групи"}
						value={groupIdAnotherUser}
						onChange={onHandleChangeExistingGroup}
						className={"border-2 h-8"}
					/>
				</label>
				<button
					onClick={onHandleJoin}
					className={"border-2 w-max pl-8 pr-8 m-auto"}
				>
					Приєднатися
				</button>
			</div>
			<h2>Мої Фінансові групи</h2>
			<div className={"mt-4 text-xl text-blue-900"}>
				{financesStore.financeGroups?.map((el) => (
					<div key={el.id} className={"flex gap-2"}>
						<p>{el.name}</p>
						<p
							onClick={() => {
								el.id !== user.financeGroupId && onAtivateGroup(el.id);
							}}
						>
							{el.id === user.financeGroupId
								? " - Активна група"
								: " - Зробити активною"}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
