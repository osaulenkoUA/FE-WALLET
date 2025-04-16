import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import {ICategory} from "../pages"
import axios from "axios"
import {addTransactionSupabase, fetchCategoriesSupabase} from "../components/helpers/endpoints"

export type paymentMethod = 'cash' | 'card'
export interface IPayloadFinance {
    categoryId: string
    description?: string
    amount: number
    paymentMethod: paymentMethod
}

export type SessionState = {
    category: ICategory[];
    setCategories: () => void;
    addFinance: (data: IPayloadFinance) => void;
};

const useFinancesStore = create(
    devtools(
        subscribeWithSelector<SessionState>((set) => ({
            category: [] as ICategory[],
            setCategories: async () => {
                try {
                    const {data} = await axios.get(fetchCategoriesSupabase, {withCredentials: true})
                    const categoriesS = data.map((el: { id: any; name: any; }) => ({
                        ...el,
                        description: []
                    }))
                    set({category: categoriesS})
                } catch (err) {
                    console.log(err)
                }
            },
            addFinance: async (data) => {
                try {
                    console.log(data)
                    await axios.post(addTransactionSupabase, data, {withCredentials: true})
                } catch (err) {
                    console.log(err)
                }
            }
        })),

        {
            name: 'finances-store'
        }
    )
);
export default useFinancesStore
