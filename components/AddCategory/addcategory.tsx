import React, {useState} from "react";
import {IconAdd} from "../assets/Icons/icon-add";
import {IconRemove} from "../assets/Icons/icon-remove";
import axios from "axios";
import {addCategories} from "../helpers/endpoints";

export default function Addcategory() {

    const [loading, setLoading] = useState(false);

    const [cat, setCat] = useState('');
    const [desc, setDesc] = useState('');
    const [descAll, setDescAll] = useState([]);


    const onHandleAdd = (e: any) => {
        setCat(e.target?.value)
    }
    const onHandleAddDescrip = (e: any) => {
        setDesc(e.target?.value)
    }
    const onHandleAddDescripToArray = () => {
        // @ts-ignore
        setDescAll((prevState) => {
            return [...prevState, desc]
        })
        setDesc('')
    }
    const onHandleRemove = (el: string) => {
        setDescAll((prevState) => {
            const filtredDescription = prevState.filter(d => d !== el)
            return [...filtredDescription]
        })
    }


    const onHandleSubmit = async () => {
        setLoading(true)
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        try {
            const post = await axios.post(addCategories, {
                category: cat,
                description: descAll
            })
            setCat('')
            setDesc('');
            setDescAll([]);
            if (post.status === 201) {
                setLoading(false)
                const updatedCat = [...categories, post.data]
                localStorage.setItem('categories', JSON.stringify(updatedCat));
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    return (
        <>
            {!loading ? <div className={'flex flex-col'}>
                <label className={'flex flex-col mb-4 text-sm'}>
                    Category
                    <input value={cat} onChange={onHandleAdd} className={'border-2'}/>
                </label>

                <div className={'flex items-center justify-between'}>
                    <label className={'flex flex-col mb-4 text-sm w-full'}>
                        Description
                        <input value={desc} onChange={onHandleAddDescrip} className={'border-2'}/>
                    </label>
                    {desc && <div onClick={onHandleAddDescripToArray}>
                        <IconAdd/>
                    </div>}
                </div>
                <button disabled={!cat} onClick={onHandleSubmit} className={'border-2 w-max pl-8 pr-8 m-auto'}>ADD
                </button>

                <div>
                    <p>{cat}</p>
                    {descAll.map(d => (
                        <div key={d} className={'flex gap-3 mb-4'}>
                            <div onClick={() => onHandleRemove(d)} className={'w-[24px] h-[24px]'}>
                                <IconRemove/>
                            </div>
                            <p>{d}</p>
                        </div>
                    ))}
                </div>

            </div> : <div className={'text-4xl'}>Loading....</div>
            }
        </>
    )
}
