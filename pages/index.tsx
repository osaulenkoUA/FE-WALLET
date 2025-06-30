import {useEffect, useState} from "react";
import AddFinance from "../components/AddFinance/AddFinance";
import {Analyze} from "../components/analyze/Analyze";
import {Settings} from "../components/settings/Settings";
import {useFinancesStore} from "../stores"
import {AuthGuard} from "../components/AuthGuard/authGuard"
import {Header} from "../components/Header/Header"
import useAuthStore from "../stores/auth.store"
import {Spinner} from "../components/Spinner/Spinner"
import {AnalyzeNew} from "../components/analyze-new/Analyze-new"

export interface ICategory {
    name: string
    id: string
    description?: string[]
    subcategories?:[]
}

export default function Home() {

    const {authenticated} = useAuthStore();
    const [activeTab, setActiveTab] = useState('0');
    const financesStore = useFinancesStore()
    return (
        <AuthGuard>
            {authenticated && <Header setActiveTab={setActiveTab}/>}
            {activeTab === '0' && authenticated && <AddFinance items={financesStore.category}/>}
            {activeTab === '1' && authenticated && <AnalyzeNew/>}
            {activeTab === '7' && authenticated && <Analyze/>}
            {activeTab === '2' && authenticated && <Settings/>}
            {financesStore.loading && <Spinner/>}
        </AuthGuard>
    )
}
