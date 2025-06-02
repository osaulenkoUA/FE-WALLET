import {useEffect, useState} from "react";
import AddFinance from "../components/AddFinance/AddFinance";
import {Analyze} from "../components/analyze/Analyze";
import {Settings} from "../components/settings/Settings";
import {useFinancesStore} from "../stores"

export interface ICategory {
    name: string
    id: string
    description?: string[]
    subcategories?:[]
}

export default function Home() {

    const [activeTab, setActiveTab] = useState('0');

    const financesStore = useFinancesStore()

    const getCategories = async () => {
        try {
             financesStore.setCategories()
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
            {activeTab === '0' && <AddFinance items={financesStore.category}/>}
            {activeTab === '1' && <Analyze/>}
            {activeTab === '2' && <Settings/>}
        </section>
    )
}
