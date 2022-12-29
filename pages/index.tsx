import {useEffect, useState} from "react";
import {ICategory} from "../components/Header/Header";
import axios from "axios";
import {fetchCategories} from "../components/helpers/endpoints";
import AddFinance from "../components/AddFinance/AddFinance";


export default function Home() {

    const [items, setItems] = useState<ICategory[]>([]);


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
    console.log(items)
    return (
        <section className={'p-[16px]'}>
           <AddFinance items={items}/>
        </section>
    )
}
