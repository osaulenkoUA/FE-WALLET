import breakPoints from '../helpers/breakPoints';
import {useEffect} from "react";
import axios from "axios";
import {fetchCategories} from '../helpers/endpoints'


export function Header() {

    const screen = breakPoints();
    const isMobile = screen === 'desktop';

    const getCategories = async () => {
        try {
            const items = JSON.parse(localStorage.getItem('categories') || '[]');
            if (!!items.length) {
                return;
            }
            const {data} = await axios.get(fetchCategories)
            localStorage.setItem('categories', JSON.stringify(data));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCategories();

    }, [])


    return (
        <>
            <p className={'text-center'}>header</p>
        </>
    );
}
