
const BASE_URL = 'https://homewallet.vercel.app';



const BASE_URL_SUPABASE = 'https://supabase-wallet.vercel.app';
// const BASE_URL_SUPABASE = 'http://localhost:3000';

export const fetchCategories =  `${BASE_URL}/category/getCategories`
export const addCategories =  `${BASE_URL}/category/addCategory`
export const addTransaction =  `${BASE_URL}/finances/addOperation`
export const fetchFinances =  `${BASE_URL}/finances/getOperation`
export const getOperationdByMonth =  `${BASE_URL}/finances/getOperationdByMonth`
export const updateItem =  `${BASE_URL}/finances/updateFields`


export const addTransactionSupabase =  `${BASE_URL_SUPABASE}/finances`
export const fetchCategoriesSupabase =  `${BASE_URL_SUPABASE}/categories`
export const fetchCategoriesSupabase2 =  `https://wallet-be.duckdns.org/categories`
