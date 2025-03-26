import React from "react";
import clsx from 'clsx'

export interface IProps {
    descriptions:  string[] | undefined
    setChosenDescription: (d: string) => void
    chosenDescription: string
}

export const CategoryItem = ({descriptions, setChosenDescription, chosenDescription}: IProps) => {

    return (
        <div className={'flex gap-2 mt-2'}>
            {descriptions?.map(d => <p onClick={() => setChosenDescription(d)}
                                      className={clsx('bg-amber-600 text-black pl-2 pr-2 rounded-2xl',d===chosenDescription&&'bg-gray-400')} key={d}>{d}</p>)}

        </div>

    )
}
