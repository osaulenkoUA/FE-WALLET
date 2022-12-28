import {useState} from "react";
import Addcategory from "../../components/AddCategory/addcategory";
import UpdateCategory from "../../components/UpdateCategory/updateCategory";


export default function Settings() {

    const [activeTab, setActiveTab] = useState('0');

    return (
        <section className={'p-[16px]'}>
            <div className={'flex gap-4 mb-[20px]'}>
                <button onClick={() => setActiveTab('0')}>ADD category</button>
                <button onClick={() => setActiveTab('1')}>Update category</button>
            </div>
            {activeTab === '0' && <Addcategory/>}
            {activeTab === '1' && <UpdateCategory/>}
        </section>
    )
}
