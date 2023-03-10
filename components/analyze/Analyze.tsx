import React, {useEffect, useRef, useState} from "react";
import {ICategory} from "../../pages";
import clsx from "clsx";
import {Spinner} from "../Spinner/Spinner";
import date from 'date-and-time';
import axios from "axios";
import {getOperationdByMonth, updateItem} from "../helpers/endpoints";
import {IconEdit} from "../assets/Icons/icon-edit";
import {IconConfirm} from "../assets/Icons/icon-ok";

export interface IFinnanceItem {
    _id: string
    category: string
    description: string
    amount: number
    balance?: number
    date: string
}


export const Analyze = () => {
    const descriptionRef = useRef(null);

    const [items, setItems] = useState<IFinnanceItem[]>([]);
    const [categoryies, setCategoryies] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState('');
    const [showDate, setShowDate] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(+date.format(new Date(), 'M'));

    const [isEdit, setIsEdit] = useState('');

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);

    const getFinances = async () => {
        setLoading(true)
        try {
            const {data} = await axios.post(getOperationdByMonth, {
                date: `${currentMonth < 10 ? 0 : ''}` + currentMonth
            })
            setItems(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const updateFields = async (item: IFinnanceItem) => {

        if (description === item.description && amount === item.amount) {
            setIsEdit('');
            return;
        }

        try {
            const data = await axios.put(updateItem, {
                id: item._id,
                ...(description !== item.description && {description: description}),
                ...(amount !== item.amount && {amount: amount}),
            })
            if (data.status === 202) {
                setIsEdit('')
                const newItems = items.map(el => el._id === data.data._id ? data.data : el)
                setItems(newItems)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getFinances();
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        setCategoryies(categories)
    }, [currentMonth])

    const handleClickCategory = (cat: string) => {
        setCategory(cat)
    }

    const getItemsByCategory = (category: string) => {
        return items.filter(el => el.category === category)
    }

    const monthlySpending = () => {
        return items.reduce((acc, el) => {
            return acc + el.amount
        }, 0)
    }

    const getSummaryCategory = (category: string) => {
        return items.filter(el => el.category === category).reduce((acc, el) => {
            return acc + el.amount
        }, 0)
    }

    const getColor = (el: any) => {
        const listDates = items.filter(f => f.category === el.category).map(m => m.date)
        const currDate = new Date().getDate()
        const color = listDates.some(d => d.slice(0, 2) === (currDate > 10 ? currDate.toFixed() : '0' + currDate))
        return color ? 'text-red' : 'text-white'
    }
    return (
        <div>
            {!loading && <div className={'p-[16px]'}>

                <div className={'flex gap-4 items-center justify-end mb-2'}>
                    <p className={'cursor-pointer text-[12px]'} onClick={() => {
                        currentMonth > 1 && setCurrentMonth(currentMonth - 1)
                    }
                    }>Previous Month</p>
                    <p className={'cursor-pointer text-[12px]'}
                       onClick={() => setCurrentMonth(+date.format(new Date(), 'M'))}>Current Month
                        - <b>{date.transform('0' + currentMonth, 'MM', 'MMMM')}</b></p>
                    <label className={'text-[12px] flex items-center justify-end '}>
                        ???????????????????? ???????? ????????????????
                        <input checked={showDate} onChange={() => setShowDate(!showDate)} type={'checkbox'}
                               className={'ml-2'}/>
                    </label>
                </div>

                <div className={'grid grid-cols-1 lg:grid-cols-3'}>
                    {categoryies.map(c => (
                        <div className={'mb-2'} key={c._id}>
                            <div className={'flex bg-blue-500 rounded-2xl items-center'}>
                                <p onClick={() => {
                                    if (category === c.category) {
                                        setCategory('')
                                        return
                                    }
                                    handleClickCategory(c.category)
                                }}
                                   className={'text-white w-full  p-3 text-[18px] font-bold '}>{c?.category}</p>
                                <p className={`p-3 text-[18px] font-bold ${getColor(c)}`}>{getSummaryCategory(c.category)}</p>
                            </div>

                            {category === c.category && <div>
                                {getItemsByCategory(c.category).map(el => (
                                    <div
                                        className={clsx(!showDate && 'grid-cols-col2', showDate && 'grid-cols-col3', 'grid items-center gap-4 mb-1')}
                                        key={el._id}>
                                        <div className={'flex gap-[10px] items-center'}>
                                            {isEdit !== el._id &&
                                            <div onClick={() => {
                                                setAmount(el.amount);
                                                setDescription(el.description)
                                                setIsEdit(el._id)
                                            }}><IconEdit/></div>}

                                            {isEdit === el._id &&
                                            <div className={'animate-bounce'} onClick={() => updateFields(el)}>
                                                <IconConfirm/></div>}

                                            {isEdit !== el._id ? <p>{el.description}</p> :
                                                <input className={' border pl-2 border-blue-600'} ref={descriptionRef}
                                                       onChange={(e) => setDescription(e.target.value)}
                                                       value={description} type={'text'}/>}

                                        </div>

                                        {showDate && <p>{el.date.slice(0, 5)}</p>}
                                        {isEdit !== el._id ? <p className={'justify-self-end'}>{el.amount}</p> :
                                            <input onChange={(e) => setAmount(+e.target.value)}
                                                   className={'w-[50px] border pl-2 border-blue-600'}
                                                   type={'number'} value={amount}/>}
                                    </div>
                                ))}
                                <div className={'flex justify-between items-center border-t-2'}>
                                    <p>????????:</p>
                                    <p>{getSummaryCategory(c.category)}</p>
                                </div>
                            </div>
                            }

                        </div>
                    ))}
                </div>

                <div className={'flex justify-end'}><p className={'text-fuchsia-700 text-2xl'}>???????????????? ????????
                    : {monthlySpending()}??????</p></div>
            </div>}
            {loading && <Spinner/>}
        </div>
    )
}
