import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import {ICategory} from "../pages"
import axios from "axios"
import {fetchCategoriesSupabase} from "../components/helpers/endpoints"

export type SessionState = {
    category: ICategory[];
    setCategories: () => void;
};


const useFinancesStore = create(
    devtools(
        subscribeWithSelector<SessionState>((set) => ({
            category: [] as ICategory[],
            setCategories: async () => {
                const {data} = await axios.get(fetchCategoriesSupabase)
                console.log(data)
                const categoriesS = data.map((el: { id: any; name: any; subcategories: { name: string }[] }) => ({
                    ...el,
                    description: el.subcategories?.map(el => el.name)??[]
                }))
                set({category: categoriesS})
            }
        })),

        {
            name: 'finances-store'
        }
    )
);
export default useFinancesStore
