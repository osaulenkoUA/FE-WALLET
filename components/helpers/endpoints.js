const BASE_URL = 'https://homewallet.vercel.app';


// export const BASE_URL_SUPABASE = 'https://supabase-wallet.vercel.app';
const BASE_URL_SUPABASE = process.env.NEXT_PUBLIC_BE_URL;
// const BASE_URL_SUPABASE = 'https://wallet-be.duckdns.org';
export const getOperationdByMonth = `${BASE_URL}/finances/getOperationdByMonth`;
export const updateItem = `${BASE_URL}/finances/updateFields`;


export const addTransactionSupabase = `${BASE_URL_SUPABASE}/finances`;
export const fetchCategoriesSupabase = `${BASE_URL_SUPABASE}/categories`;

export const urlSupabase = {
    OAuthGoogle: `${BASE_URL_SUPABASE}/auth/google`,
    checkAuth: `${BASE_URL_SUPABASE}/api/auth/check`,
    userProfile: `${BASE_URL_SUPABASE}/user-profile`,
};
export const urlSupabaseFinances = {
    addTransaction:`${BASE_URL_SUPABASE}/finances`,
    addCategories: `${BASE_URL_SUPABASE}/categories`,
    getCategories: `${BASE_URL_SUPABASE}/categories`,
    getFinances: `${BASE_URL_SUPABASE}/get-finances`,
    getFinanceGroup: `${BASE_URL_SUPABASE}/finances/groups`,
    addFinanceGroup: `${BASE_URL_SUPABASE}/finances/group-add`,
    joinFinanceGroup: `${BASE_URL_SUPABASE}/finances/group-join`,
    activateFinanceGroup: `${BASE_URL_SUPABASE}/finances/activate-group`,
};
