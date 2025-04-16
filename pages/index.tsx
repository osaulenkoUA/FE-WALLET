import {useEffect, useState} from "react";
import AddFinance from "../components/AddFinance/AddFinance";
import {Analyze} from "../components/analyze/Analyze";
import {Settings} from "../components/settings/Settings";
import {useFinancesStore} from "../stores"
import {useAuth} from "../hooks/useAuth"
import Cookies from "js-cookie"
import {AuthGuard} from "../components/AuthGuard/authGuard"
import {Header} from "../components/Header/Header"
import useAuthStore from "../stores/auth.store"

export interface ICategory {
    name: string
    id: string
    description?: string[]
}

export default function Home() {

    const {authenticated} = useAuthStore();
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
    void getCategories();
    }, [])
    return (
        <AuthGuard>
            {authenticated && <Header setActiveTab={setActiveTab}/>}
            {activeTab === '0' && authenticated && <AddFinance items={financesStore.category}/>}
            {activeTab === '1' && authenticated && <Analyze/>}
            {activeTab === '2' && authenticated && <Settings/>}
        </AuthGuard>
    )
}
