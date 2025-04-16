import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import axios from "axios"
import {urlSupabase} from "../components/helpers/endpoints"

export type SessionState = {
    googleAuth: () => void;
    user: any | null;
    authenticated: false;
    authCheck: () => void
};


const useAuthStore = create(devtools(subscribeWithSelector<SessionState>((set) => ({
    user: null,
    authenticated: false,
    googleAuth: async () => {
        try {
            await axios.get(`https://supabase-wallet.vercel.app/auth/google`)
        } catch (err) {
            console.error(err)
        }
    },
    authCheck: async () => {
        try {
            const {data} = await axios.get(urlSupabase.checkAuth, {withCredentials: true})
            console.log(data)
            set({user: data.user || null, authenticated: data.authenticated})
            return data.authenticated
        } catch (err) {
            console.log(err)
        }
    }
})), {
    name: 'auth-store'
}));

export default useAuthStore
