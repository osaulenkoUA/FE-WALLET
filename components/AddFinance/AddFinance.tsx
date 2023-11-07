import React, {useEffect, useRef, useState} from "react";
import {ICategory} from "../../pages";
import {CategoryItem} from "./CategoryItem";
import axios from "axios";
import {addTransaction} from "../helpers/endpoints";
import {IconAdd} from "../assets/Icons/icon-add";
import {Spinner} from "../Spinner/Spinner";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddFinance({items}: { items: ICategory[] }) {

    const [loading, setLoading] = useState(false);
    const [chosenDescription, setChosenDescription] = useState('');
    const inputEl = useRef(null);
    const [description, setDescription] = useState(chosenDescription);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const notifyOpt: ToastOptions = {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    useEffect(() => {
        setDescription(chosenDescription)
        // @ts-ignore
        chosenDescription && inputEl!.current!.focus()
    }, [chosenDescription]);


    const onHandleSubmit = async () => {
        setLoading(true)
        try {
            const fetch = await axios.post(addTransaction, {
                category: category,
                ...(description ? {description: description} : {description: 'Інше'}),
                amount: +amount!
            })
            if (fetch?.status === 201) {
                toast.success('ДОДАНО !!!', notifyOpt);
                setDescription('');
                setAmount('');
                setChosenDescription('')
                setLoading(false)
                return;
            }
        } catch (err) {
            toast.error('ERROR, спробуй ще (', notifyOpt);
            setLoading(false)
            console.log(err)
        }
    }

    const handleClickCategory = (cat: string) => {
        setCategory(cat)
        setChosenDescription('')
        setAmount('')
    }

    const onHandleAddAmount = (e: any) => {
        if (e.target.value === '0') return
        setAmount(e.target?.value)
    }
    const onHandleChangeDescrip = (e: any) => setDescription(e.target?.value)

    return (
        <div className={'p-4 pt-[42px]'}>
            {!loading ? (
                <div className={'grid grid-cols-1 lg:grid-cols-3'}>
                    {items.map(c => (
                        <div className={'mb-2'} key={c._id}>
                            <p onClick={() => handleClickCategory(c.category)}
                               className={'text-white w-full bg-green p-3 text-[18px] font-bold rounded-3xl'}>{c?.category}</p>
                            {category === c?.category &&
                              <>
                                <CategoryItem chosenDescription={chosenDescription}
                                              setChosenDescription={setChosenDescription}
                                              descriptions={c?.description}/>


                                <div className={'relative flex gap-2 items-center mt-2 h-[30px]'}>
                                  <label className={'flex flex-col text-sm w-full'}>
                                    <input onChange={onHandleChangeDescrip} value={description}
                                           className={'border-2'}/>
                                  </label>
                                  <label className={'flex w-[50px] flex-col text-sm'}>
                                    <input type={'number'} ref={inputEl} onChange={onHandleAddAmount}
                                           value={amount}
                                           className={'border-2'}/>
                                  </label>
                                    {amount&& <button onClick={onHandleSubmit} className={'text-white z-50 flex gap-2 justify-center items-center absolute top-[35px] left-0 h-[54px] w-full bg-charcoal-dark rounded-3xl'}>
                                        <IconAdd />
                                    </button>}

                                </div>

                              </>


                            }


                        </div>
                    ))}
                </div>
            ) : <Spinner/>}
            <ToastContainer/>
        </div>
    )
}
