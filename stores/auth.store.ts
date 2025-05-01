import {create} from 'zustand';
import {devtools, subscribeWithSelector} from 'zustand/middleware';
import axios from "axios"
import {urlSupabase} from "../components/helpers/endpoints"

export interface IUser {
    "id": string;
    "email": string;
    "name": string;
    "googleId": string;
    "createdAt": string;
    "updatedAt": string;
    "password": string;
    "financeGroupId": string;
}

export type SessionState = {
    user: IUser
    authenticated: false;
    googleAuth: () => void;
    authCheck: () => void
    getUserProfile: () => void
};


const useAuthStore = create(devtools(subscribeWithSelector<SessionState>((set) => ({
    user: {} as IUser,
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
            set({user: data.user || null, authenticated: data.authenticated})
            return data.authenticated
        } catch (err) {
            console.log(err)
        }
    },
    getUserProfile: async () => {
        try {
            const {data} = await axios.get(urlSupabase.userProfile, {withCredentials: true})
            set({user: data.user})
            return data.authenticated
        } catch (err) {
            console.log(err)
        }
    }
})), {
    name: 'auth-store'
}));

export default useAuthStore
