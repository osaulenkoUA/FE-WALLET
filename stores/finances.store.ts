import axios from "axios";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { urlSupabaseFinances } from "../components/helpers/endpoints";
import type { ICategory } from "../pages";

export type paymentMethod = "cash" | "card";

export interface IFinance {
	id: string;
	create_date: string;
	create_date_formatted: null;
	amount: number;
	description: string;
	paymentMethod: paymentMethod;
	categoryId: string;
	userId: string;
	financeGroupId: string;
	category: {
		id: string;
		name: string;
		userId: string;
		financeGroupId: string;
	};
}

export interface IPayloadFinance {
	categoryId: string;
	description?: string;
	amount: number;
	paymentMethod: paymentMethod;
}

export type SessionState = {
	loading: boolean;
	category: ICategory[];
	finances: IFinance[];
	financeGroups: { id: string; name: string }[];
	setCategories: (t: any) => void;
	addCategory: (name: string, config: any) => void;
	addFinance: (
		data: IPayloadFinance,
		config: any,
	) => Promise<number | undefined>;
	updateFinance: (
		data: Partial<IFinance>,
		config: any,
	) => Promise<number | undefined>;
	getFinances: (data: { month: string; year: string; config: any }) => void;
	getFinanceGroups: (config: any) => void;
	addFinanceGroup: (name: string, config: any) => void;
	joinFinanceGroup: (id: string, config: any) => void;
	activateFinanceGroup: (id: string, config: any) => void;
};

const useFinancesStore = create(
	devtools(
		subscribeWithSelector<SessionState>((set, get) => ({
			loading: false,
			category: [] as ICategory[],
			financeGroups: [],
			finances: [] as IFinance[],
			setCategories: async (config) => {
				try {
					set({ loading: true });
					const { data } = await axios.get(
						urlSupabaseFinances.getCategories,
						config,
					);
					const categoriesS = data.map(
						(el: {
							id: any;
							name: any;
							subcategories: { name: string }[];
						}) => ({
							...el,
							description: el.subcategories?.map((el) => el.name) ?? [],
						}),
					);
					set({ category: categoriesS });
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			addCategory: async (category: string, config) => {
				try {
					set({ loading: true });
					const response = await axios.post(
						urlSupabaseFinances.addCategories,
						{
							name: category,
						},
						config,
					);
					if (response.status === 200) {
						const newCategories = [...get().category, response.data];
						set({ category: newCategories });
					}
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			addFinance: async (payload, config): Promise<number | undefined> => {
				set({ loading: true });
				try {
					const { data } = await axios.post(
						urlSupabaseFinances.addTransaction,
						payload,
						config,
					);
					return data.status;
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			updateFinance: async (payload, config): Promise<number | undefined> => {
				set({ loading: true });
				try {
					const { data } = await axios.patch(
						urlSupabaseFinances.updateTransaction,
						payload,
						config,
					);
					if (data.status === 201) {
						const updatedFinances = get().finances.map((el) => {
							if (el.id !== payload.id) return el;

							return {
								...el,
								...(payload.description !== undefined && {
									description: payload.description,
								}),
								...(payload.amount !== undefined && { amount: payload.amount }),
							};
						});
						set({ finances: updatedFinances });
					}
					return data.status;
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			getFinances: async ({ year, month, config }) => {
				set({ loading: true });
				try {
					const { data } = await axios.post(
						urlSupabaseFinances.getFinances,
						{
							month,
							year,
						},
						config,
					);
					set({ finances: data });
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			addFinanceGroup: async (name: string, config) => {
				set({ loading: true });
				try {
					await axios.post(
						urlSupabaseFinances.addFinanceGroup,
						{ name },
						config,
					);
					get().getFinanceGroups(config);
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			joinFinanceGroup: async (id: string, config) => {
				set({ loading: true });
				try {
					await axios.post(
						urlSupabaseFinances.joinFinanceGroup,
						{ id },
						config,
					);
					get().getFinanceGroups(config);
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			activateFinanceGroup: async (id: string, config) => {
				set({ loading: true });
				try {
					await axios.patch(
						urlSupabaseFinances.activateFinanceGroup,
						{ id },
						config,
					);
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
			getFinanceGroups: async (config) => {
				set({ loading: true });
				try {
					const { data } = await axios.get(
						urlSupabaseFinances.getFinanceGroup,
						config,
					);
					set({ financeGroups: data.groups });
				} catch (err) {
					console.log(err);
				} finally {
					set({ loading: false });
				}
			},
		})),

		{
			name: "finances-store",
		},
	),
);
export default useFinancesStore;
