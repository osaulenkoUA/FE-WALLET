import {useState} from "react";
import Addcategory from "../AddCategory/addcategory";
import UpdateCategory from "../UpdateCategory/updateCategory";
import axios from "axios";
import {fetchCategories} from "../helpers/endpoints";
import {Spinner} from "../Spinner/Spinner";


export const Settings = () => {

    const [activeTab, setActiveTab] = useState('0');
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get(fetchCategories)
            localStorage.setItem('categories', JSON.stringify(data));
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }


    return (
        <section className={'p-[16px]'}>
            <div className={'flex gap-4 mb-[20px] border-b-2 pb-1'}>
                <button onClick={() => setActiveTab('0')}>Добавити категорію</button>
                <button onClick={() => setActiveTab('1')}>Добавити опис</button>
                <button onClick={() => getCategories()}>Оновити список категорій</button>
                {loading && <Spinner/>}
            </div>
            {activeTab === '0' && <Addcategory/>}
            {activeTab === '1' && <UpdateCategory/>}
        </section>
    )
}
