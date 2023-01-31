
const BASE_URL = 'https://homewallet.vercel.app';

export const fetchCategories =  `${BASE_URL}/category/getCategories`
export const addCategories =  `${BASE_URL}/category/addCategory`

export const addTransaction =  `${BASE_URL}/finances/addOperation`
export const fetchFinances =  `${BASE_URL}/finances/getOperation`
export const getOperationdByMonth =  `${BASE_URL}/finances/getOperationdByMonth`


