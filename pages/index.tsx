import {useEffect, useState} from "react";
import {ICategory} from "../components/Header/Header";
import axios from "axios";
import {fetchCategories} from "../components/helpers/endpoints";


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
            <h2 className={'text-4xl text-green'}>BODY</h2>
           <div className={'grid grid-cols-1 lg:grid-cols-3'}>
               {items.map(c=>(
                   <div key={c._id}>
                       <p className={'text-green'}>{c?.category}</p>
                       {c?.description?.map(d=><p key={d}>{d}</p>)}
                   </div>
               ))}
           </div>
        </section>
    )
}
