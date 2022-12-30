import Link from 'next/link'

export interface ICategory {
    category: string
    _id: string
    description?: [string]
}

export function Header() {

     return (
        <div className={'w-full h-[40px] bg-amber-500 flex gap-8 items-center justify-center'}>

            <Link className={'text-white font-bold'} href={'/'}> Добавити </Link>
            <Link className={'text-white font-bold'} href={'/analyze'}> Витрати </Link>
            <Link className={'text-white font-bold'} href={'/settings'}> Налаштування </Link>


        </div>
    );
}
