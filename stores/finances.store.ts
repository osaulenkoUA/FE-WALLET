import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import {ICategory} from "../pages"
import axios from "axios"
import { fetchCategoriesSupabase2 } from "../components/helpers/endpoints"

export type SessionState = {
    category: ICategory[];
    setCategories: () => void;
};


const useFinancesStore = create(
    devtools(
        subscribeWithSelector<SessionState>((set) => ({
            category: [] as ICategory[],
            setCategories: async ()=>{
                const {data} = await axios.get(fetchCategoriesSupabase2)
                const categoriesS = data.map((el: { id: any; name: any; }) => ({
                    ...el,
                    description: []
                }))
                set({ category: categoriesS })
            }
        })),

        {
            name: 'finances-store'
        }
    )
);
export default useFinancesStore
