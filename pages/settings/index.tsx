import {useState} from "react";
import Addcategory from "../../components/AddCategory/addcategory";
import UpdateCategory from "../../components/UpdateCategory/updateCategory";
import axios from "axios";
import {fetchCategories} from "../../components/helpers/endpoints";


export default function Settings() {

    const [activeTab, setActiveTab] = useState('0');

    const getCategories = async () => {
        try {
            const {data} = await axios.get(fetchCategories)
            localStorage.setItem('categories', JSON.stringify(data));
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <section className={'p-[16px]'}>
            <div className={'flex gap-4 mb-[20px] border-b-2 pb-1'}>
                <button onClick={() => setActiveTab('0')}>Добавити категорію</button>
                <button onClick={() => setActiveTab('1')}>Добавити опис</button>
                <button onClick={() => getCategories() }>Оновити список категорій</button>

            </div>
            {activeTab === '0' && <Addcategory/>}
            {activeTab === '1' && <UpdateCategory/>}
        </section>
    )
}
