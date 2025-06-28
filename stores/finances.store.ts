import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import {ICategory} from "../pages"
import axios from "axios"
import {fetchCategoriesSupabase, urlSupabaseFinances} from "../components/helpers/endpoints"

export type paymentMethod = 'cash' | 'card'

export interface IFinance {
    id: string
    create_date: string
    create_date_formatted: null,
    amount: number
    description: string
    paymentMethod: paymentMethod
    categoryId: string
    userId: string
    financeGroupId: string
    category: {
        id: string
        name: string
        userId: string
        financeGroupId: string
    }
}


export interface IPayloadFinance {
    categoryId: string
    description?: string
    amount: number
    paymentMethod: paymentMethod
}

export type SessionState = {
    loading: boolean,
    category: ICategory[];
    finances: IFinance[],
    financeGroups: { id: string; name: string }[];
    setCategories: () => void;
    addCategory: (name: string) => void;
    addFinance: (data: IPayloadFinance) => Promise<number | undefined>;
    getFinances: (data: { month: string; year: string }) => void;
    getFinanceGroups: () => void;
    addFinanceGroup: (name: string) => void;
    joinFinanceGroup: (id: string) => void;
    activateFinanceGroup: (id: string) => void;
};

const useFinancesStore = create(
    devtools(
        subscribeWithSelector<SessionState>((set, get) => ({
            loading: false,
            category: [] as ICategory[],
            financeGroups: [],
            finances: [] as IFinance[],
            setCategories: async () => {
                try {
                    set({loading: true})
                    const {data} = await axios.get(fetchCategoriesSupabase, {withCredentials: true})
                    const categoriesS = data.map((el: { id: any; name: any; subcategories: { name: string }[] }) => ({
                        ...el,
                        description: el.subcategories?.map(el => el.name) ?? []

                    }))
                    set({category: categoriesS})
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})

                }
            },
            addCategory: async (category: string) => {
                try {
                    set({loading: true})
                    const response = await axios.post(urlSupabaseFinances.addCategories, {
                        name: category,
                    }, {
                        withCredentials: true
                    })
                    if (response.status === 200) {
                        const newCategories = [...get().category, response.data]
                        set({category: newCategories})
                    }
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})

                }
            },
            addFinance: async (payload): Promise<number | undefined> => {
                set({loading: true})
                try {
                    const {data} = await axios.post(urlSupabaseFinances.addTransaction, payload, {withCredentials: true})
                    return data.status
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})
                }
            },
            getFinances: async ({year, month}) => {
                set({loading: true})
                try {
                    const {data} = await axios.post(urlSupabaseFinances.getFinances, {
                        month, year
                    }, {withCredentials: true})
                    set({finances: data})
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})
                }
            },
            addFinanceGroup: async (name: string) => {
                set({loading: true})
                try {
                    await axios.post(urlSupabaseFinances.addFinanceGroup, {name}, {withCredentials: true})
                    get().getFinanceGroups()
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})

                }
            },
            joinFinanceGroup: async (id: string) => {
                set({loading: true})
                try {
                    await axios.post(urlSupabaseFinances.joinFinanceGroup, {id}, {withCredentials: true})
                    get().getFinanceGroups()
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})
                }
            },
            activateFinanceGroup: async (id: string) => {
                set({loading: true})
                try {
                    await axios.patch(urlSupabaseFinances.activateFinanceGroup, {id}, {withCredentials: true})
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})
                }
            },
            getFinanceGroups: async () => {
                set({loading: true})
                try {
                    const {data} = await axios.get(urlSupabaseFinances.getFinanceGroup, {withCredentials: true})
                    set({financeGroups: data.groups})
                } catch (err) {
                    console.log(err)
                } finally {
                    set({loading: false})
                }
            }

        })),

        {
            name: 'finances-store'
        }
    )
);
export default useFinancesStore
