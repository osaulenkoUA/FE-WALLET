import React, {useEffect, useState} from "react";
import {ICategory} from "../../pages";
import clsx from "clsx";
import {Spinner} from "../Spinner/Spinner";
import date from 'date-and-time';
import axios from "axios";
import {getOperationdByMonth} from "../helpers/endpoints";

export interface IFinnanceItem {
    _id: string
    category: string
    description: string
    amount: number
    balance?: number
    date: string
}


export const Analyze = () => {

    const [items, setItems] = useState<IFinnanceItem[]>([]);
    const [categoryies, setCategoryies] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState('');

    const [showDate, setShowDate] = useState(true);

    const [currentMonth, setCurrentMonth] = useState(+date.format(new Date(), 'M'));


    const getFinances = async () => {
        setLoading(true)
        try {
            const {data} = await axios.post(getOperationdByMonth, {
                date: '0' + currentMonth
            })
            setItems(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
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

    return (
        <div>
            {!loading && <div className={'p-[16px]'}>

              <div className={'flex gap-4 items-center justify-end mb-2'}>
                <p className={'cursor-pointer text-[12px]'} onClick={() => {
                    currentMonth > 1 && setCurrentMonth(currentMonth - 1)
                }
                }>Previous Month</p>
                <p className={'cursor-pointer text-[12px]'}
                   onClick={() => setCurrentMonth(+date.format(new Date(), 'M'))}>Current Month - <b>{date.transform('0'+currentMonth,'MM','MMMM')}</b></p>
                <label className={'text-[12px] flex items-center justify-end '}>
                  Показувати дату операцій
                  <input checked={showDate} onChange={() => setShowDate(!showDate)} type={'checkbox'}
                         className={'ml-2'}/>
                </label>
              </div>

              <div className={'grid grid-cols-1 lg:grid-cols-3'}>
                  {categoryies.map(c => (
                      <div className={'mb-2'} key={c._id}>
                          <div className={'flex bg-blue-500 rounded-2xl items-center'}>
                              <p onClick={() => {
                                  console.log('dd')
                                  if (category===c.category) {
                                      setCategory('')
                                      return
                                  }
                                  handleClickCategory(c.category)
                              }}
                                 className={'text-white w-full  p-3 text-[18px] font-bold '}>{c?.category}</p>
                              <p className={'text-white p-3 text-[18px] font-bold'}>{getSummaryCategory(c.category)}</p>
                          </div>

                          {category === c.category && <div>
                              {getItemsByCategory(c.category).map(el => (
                                  <div
                                      className={clsx(!showDate && 'grid-cols-col2', showDate && 'grid-cols-col3', 'grid items-center gap-4')}
                                      key={el._id}>
                                      <p>{el.description}</p>
                                      {showDate && <p>{el.date.slice(0, 5)}</p>}
                                      <p className={'justify-self-end'}>{el.amount}</p>
                                  </div>
                              ))}
                            <div className={'flex justify-between items-center border-t-2'}>
                              <p>Сума:</p>
                              <p>{getSummaryCategory(c.category)}</p>
                            </div>
                          </div>
                          }

                      </div>
                  ))}
              </div>

              <div className={'flex justify-end'}><p className={'text-fuchsia-700 text-2xl'}>Загальна сума
                : {monthlySpending()}грн</p></div>
            </div>}
            {loading && <Spinner/>}
        </div>
    )
}
