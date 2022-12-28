import {useEffect, useState} from "react";

interface ICategory{
    category:string
    description?:[string]
}
export default function Home() {

    const [items, setItems] = useState<ICategory[]>([]);

    useEffect(() => {
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        setItems(categories)
    }, [])


    return (
        <section>
            <h2 className={'text-4xl text-green'}>BODY</h2>
           <div className={'grid grid-cols-3'}>
               {items.map(c=>(
                   <div key={c.category}>
                       <p>{c?.category}</p>
                       {c?.description?.map(d=><p key={d}>{d}</p>)}
                   </div>
               ))}
           </div>
        </section>
    )
}
