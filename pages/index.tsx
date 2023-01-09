import {useEffect, useState} from "react";
import axios from "axios";
import {fetchCategories} from "../components/helpers/endpoints";
import AddFinance from "../components/AddFinance/AddFinance";
import {Analyze} from "../components/analyze/Analyze";
import {Settings} from "../components/settings/Settings";

export interface ICategory {
    category: string
    _id: string
    description?: [string]
}
export default function Home() {

    const [items, setItems] = useState<ICategory[]>([]);

    const [activeTab, setActiveTab] = useState('0');
    const [loading, setLoading] = useState(false);


    const getCategories = async () => {
        try {
            const categories = JSON.parse(localStorage.getItem('categories') || '[]');
            if (!!categories.length) {
                setItems(categories)
                return;
            }
            const {data} = await axios.get(fetchCategories)
            localStorage.setItem('categories', JSON.stringify(data));
            setItems(categories)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])
    return (
        <section className={'p-[16px]'}>

            <div className={'w-full h-[40px] bg-amber-500 flex gap-8 items-center justify-center'}>

                <div className={'text-white font-bold cursor-pointer'} onClick={() => setActiveTab('0')}> Добавити</div>
                <div className={'text-white font-bold cursor-pointer'} onClick={() => setActiveTab('1')}> Аналіз</div>
                <div className={'text-white font-bold cursor-pointer'} onClick={() => setActiveTab('2')}> Налаштування
                </div>


            </div>

            {activeTab === '0' && <AddFinance items={items}/>}
            {activeTab === '1' && <Analyze/>}
            {activeTab === '2' && <Settings/>}


        </section>
    )
}
