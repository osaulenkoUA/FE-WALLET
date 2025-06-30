import React, {useEffect, useRef, useState} from "react";
import {Spinner} from "../Spinner/Spinner";
import date from 'date-and-time';
import axios from "axios";
import {getOperationdByMonth, updateItem} from "../helpers/endpoints";
import {IconEdit} from "../assets/Icons/icon-edit";
import {IconConfirm} from "../assets/Icons/icon-ok";
import {IconCARD, IconGrivna} from "../assets/Icons/icon-add";
import {IconMonth} from "../assets/Icons/icon-month";
import {useFinancesStore} from "../../stores"

export interface IFinnanceItem {
    _id: string
    category: string
    description: string
    amount: number
    balance?: number
    date: string
    isPayByCard: boolean
}


export const Analyze = () => {
    const descriptionRef = useRef(null);

    const [items, setItems] = useState<IFinnanceItem[]>([]);

    const financesStore = useFinancesStore()
    const categoryies = financesStore.category


    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState('');

    const [currentMonth, setCurrentMonth] = useState(+date.format(new Date(), 'M'));
    const [selectedYear, setSelectedYear] = useState(2025); // Default to 2023

    const [isEdit, setIsEdit] = useState('');

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string | number>(0);

    const getFinances = async () => {
        setLoading(true)
        try {
            const {data} = await axios.post(getOperationdByMonth, {
                date: `${currentMonth < 10 ? 0 : ''}` + currentMonth,
                year: selectedYear.toString()
            })

            const month = `${currentMonth < 10 ? 0 : ''}` + currentMonth
            const year = selectedYear.toString()
            financesStore.getFinances({month, year})

            setItems(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const updateFields = async (item: IFinnanceItem) => {

        if (description === item.description && +amount === item.amount) {
            setIsEdit('');
            return;
        }

        try {
            const data = await axios.put(updateItem, {
                id: item._id,
                ...(description !== item.description && {description: description}),
                ...(+amount !== item.amount && {amount: +amount}),
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
    }, [currentMonth, selectedYear])

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
    const monthlySpendingCard = () => {
        return items.filter(el => el.isPayByCard).reduce((acc, el) => {
            return acc + el.amount
        }, 0)

    }
    const monthlySpendingCash = () => {
        return items.filter(el => !el.isPayByCard).reduce((acc, el) => {
            return acc + el.amount
        }, 0)
    }

    const getSummaryCategory = (category: string) => {
        return items.filter(el => el.category === category).reduce((acc, el) => {
            return acc + el.amount
        }, 0)
    }

    const getColor = (el: any) => {
        const listDates = items.filter(f => f.category === el.name).map(m => m.date)
        const currDate = new Date().getDate()
        const color = listDates.some(d => d.slice(0, 2) === (currDate > 10 ? currDate.toFixed() : '0' + currDate))
        return color ? 'text-red font-black text-[22px]' : 'text-white'
    }


    const handleChange = (e: { target: { value: string; }; }) => {
        setCurrentMonth(parseInt(e.target.value));
    };


    const handleChangeYear = (e: { target: { value: string; }; }) => {
        setSelectedYear(parseInt(e.target.value));
    };

    return (
        <div>
            {!loading && <div className={'p-[16px]'}>

                <div className={'grid grid-cols-3 gap-4 items-center justify-end mb-2'}>
                    <div className="max-w-md mx-auto">
                        <select id="months"
                                name="months"
                                value={currentMonth}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3  py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" disabled>Select a Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <div className="w-max">
                        <select id="years"
                                name="years"
                                value={selectedYear}
                                onChange={handleChangeYear}
                                className="text-center mt-1 block w-full pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" disabled>Select a Year</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    <div className={'cursor-pointer w-[36px] h-[36px] justify-self-end'}
                         onClick={() => {

                             setCurrentMonth(+date.format(new Date(), 'M'))
                             setSelectedYear(+date.format(new Date(), 'YYYY'))
                         }}><IconMonth/>
                    </div>
                </div>

                <div className={'grid grid-cols-1 lg:grid-cols-3'}>
                    {categoryies.map(c => (
                        <div className={'mb-2'} key={c.id}>
                            <div
                                className={'flex bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl items-center shadow-lg hover:shadow-xl transition-shadow duration-300'}>
                                <p onClick={() => {
                                    if (category === c.name) {
                                        setCategory('')
                                        return
                                    }
                                    handleClickCategory(c.name)
                                    // Trigger animation
                                    const element = document.getElementById(`category-${c.name}`);
                                    if (element) {
                                        element.classList.add('animate-bounce');
                                        setTimeout(() => element.classList.remove('animate-bounce'), 500); // Remove after 0.5s
                                    }
                                }}
                                   id={`category-${c.name}`}
                                   className={'text-gray-100 w-full p-3 text-[18px] font-bold hover:text-white transition-colors duration-300 cursor-pointer'}>{c?.name}</p>
                                <p className={`p-3 text-[18px] font-bold bg-opacity-20 rounded-lg ${getColor(c)}`}>{getSummaryCategory(c.name)}</p>
                            </div>

                            {category === c.name && <div>
                                {getItemsByCategory(c.name).reverse().map(el => (
                                    <div
                                        className={'grid-cols-col3 grid items-center gap-4 mb-1'}
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

                                        <div className={'flex gap-3'}>
                                            <p>{el.date.slice(0, 5)}</p>
                                            {el.isPayByCard ? <IconCARD/> : <IconGrivna/>}

                                        </div>
                                        {isEdit !== el._id ? <p className={'justify-self-end'}>{el.amount}</p> :
                                            <input onChange={(e) => {
                                                setAmount(e.target.value)
                                            }}
                                                   className={'w-[50px] border pl-2 border-blue-600'}
                                                   type={'number'} value={amount}/>}
                                    </div>
                                ))}
                                <div className={'flex justify-between items-center border-t-2'}>
                                    <p>Сума:</p>
                                    <p>{getSummaryCategory(c.name)}</p>
                                </div>
                            </div>
                            }

                        </div>
                    ))}
                </div>

                <div className="space-y-2 bg-white p-6 rounded-lg shadow-md">
                    {/* Total Amount */}
                    <div
                        className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-lg">
                        <p className="text-white text-2xl font-semibold">Загальна сума</p>
                        <p className="text-white text-2xl font-bold">{monthlySpending()} грн</p>
                    </div>

                    {/* Card Amount */}
                    <div
                        className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                        <p className="text-gray-700 text-xl font-medium">Сума картка</p>
                        <p className="text-gray-700 text-xl font-semibold">{monthlySpendingCard()} грн</p>
                    </div>

                    {/* Cash Amount */}
                    <div
                        className="flex justify-between items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                        <p className="text-gray-700 text-xl font-medium">Сума готівка</p>
                        <p className="text-gray-700 text-xl font-semibold">{monthlySpendingCash()} грн</p>
                    </div>
                </div>
            </div>}
            {loading && <Spinner/>}
        </div>
    )
}
