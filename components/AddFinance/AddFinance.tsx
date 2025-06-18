import React, {useEffect, useRef, useState} from "react";
import {ICategory} from "../../pages";
import {CategoryItem} from "./CategoryItem";
import {IconCARD, IconCash} from "../assets/Icons/icon-add";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFinancesStore} from "../../stores"
import {paymentMethod} from "../../stores/finances.store"

export default function AddFinance({items}: { items: ICategory[] }) {

    const [chosenDescription, setChosenDescription] = useState('');
    const inputEl = useRef(null);
    const [description, setDescription] = useState(chosenDescription);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<ICategory | null>(null);

    const financesStore = useFinancesStore()

    const notifyOpt: ToastOptions = {
        position: "top-center",
        autoClose: 500,
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

    const onHandleSubmit = async (payMethod: paymentMethod) => {
        try {
            financesStore.addFinance({
                ...(category?.id ? {categoryId: category?.id} : {categoryId: ''}),
                ...(description ? {description: description} : {description: 'Інше'}),
                amount: +amount!,
                isPayByCard:payMethod==='card'
            })
            // const supabaseAddFinance = await axios.post(addTransactionSupabase, {
            //     categoryId: category.id,
            //     ...(description ? {description: description} : {description: 'Інше'}),
            //     amount: +amount!,
            //     paymentMethod: payMethod
            // })

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
            console.log(err)
        }
    }

    const handleClickCategory = (cat: ICategory) => {
        setCategory(cat)
        setChosenDescription('')
        setAmount('')
    }

    const onHandleAddAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setAmount(value);
        }
    }
    const onHandleChangeDescrip = (e: any) => setDescription(e.target?.value)
    return (
        <div className={'p-4 pt-[42px]'}>
            <div className={'grid grid-cols-1 lg:grid-cols-3'}>
                {items.map(c => (
                    <div className={'mb-2'} key={c.id}>
                        <p
                            onClick={() => handleClickCategory(c)}
                            className="w-full p-4 text-lg font-semibold rounded-2xl
             flex items-center justify-between shadow-md cursor-pointer
             transition-all duration-300
             bg-gradient-to-r from-indigo-500 to-purple-500 text-white
             hover:from-purple-500 hover:to-pink-500 hover:shadow-lg
             active:scale-95"
                        >
                            {c?.name}
                            <span className="ml-2">▼</span>
                        </p>
                        {category?.id === c?.id &&
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
                                    {amount &&
                                        <div className={'bg-white absolute top-[35px] left-0 w-full flex gap-2'}>
                                            <button onClick={() => onHandleSubmit('cash')}
                                                    className={'font-bold border-2 border-amber-700 text-black z-50 flex gap-2 justify-center items-center  top-[35px] left-0 h-[64px]  w-1/2 bg-gray-White_dark rounded-3xl'}>
                                                <IconCash/>
                                                CASH
                                            </button>

                                            <button onClick={() => onHandleSubmit('card')}
                                                    className={'font-bold border-2 border-amber-700 text-black z-50 flex gap-2 justify-center items-center  top-[35px] left-[50%] h-[64px] w-1/2 bg-gray-White_dark rounded-3xl'}>
                                                <IconCARD/>
                                                CARD
                                            </button>
                                        </div>
                                    }
                                </div>
                            </>
                        }
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </div>
    )
}
