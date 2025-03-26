import {useEffect, useState} from "react";
import axios from "axios";
import {fetchCategoriesSupabase} from "../components/helpers/endpoints";
import AddFinance from "../components/AddFinance/AddFinance";
import {Analyze} from "../components/analyze/Analyze";
import {Settings} from "../components/settings/Settings";

export interface ICategory {
    name: string
    id: string
    description?: string[]
}

export default function Home() {

    const [category, setCategory] = useState<ICategory[]>([]);
    const [activeTab, setActiveTab] = useState('0');

    const getCategories = async () => {
        try {
            const categories = JSON.parse(localStorage.getItem('categories') || '[]');
            if (!!categories.length) {
                setCategory(categories)
                return;
            }
            const {data} = await axios.get(fetchCategoriesSupabase)
            const categoriesS = data.map((el: { id: any; name: any; }) => ({
                ...el,
                description: []
            }))
            localStorage.setItem('categories', JSON.stringify(categoriesS));
            setCategory(categories)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <section>
            <div className={'w-full h-[40px] bg-amber-500 flex gap-8 items-center justify-center'}>
                <div className={'text-white font-bold cursor-pointer'} onClick={() => setActiveTab('0')}> Добавити</div>
                <div className={'text-white font-bold cursor-pointer'} onClick={() => setActiveTab('1')}> Аналіз</div>
                <div className={'text-white font-bold cursor-pointer'} onClick={() => setActiveTab('2')}> Налаштування
                </div>
            </div>
            {activeTab === '0' && <AddFinance items={category}/>}
            {activeTab === '1' && <Analyze/>}
            {activeTab === '2' && <Settings/>}
        </section>
    )
}
