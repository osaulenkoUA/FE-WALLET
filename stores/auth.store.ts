import axios from "axios";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { urlSupabase } from "../components/helpers/endpoints";

export interface IUser {
	id: string;
	email: string;
	name: string;
	googleId: string;
	createdAt: string;
	updatedAt: string;
	password: string;
	financeGroupId: string;
}

export type SessionState = {
	user: IUser;
	authenticated: boolean;
	getUserProfile: (config: any) => void;
	setAuth: () => void;
};

const useAuthStore = create(
	devtools(
		subscribeWithSelector<SessionState>((set) => ({
			user: {} as IUser,
			authenticated: false,
			setAuth: () => {
				set({ authenticated: true });
			},
			getUserProfile: async (config) => {
				try {
					const { data } = await axios.get(urlSupabase.userProfile, config);
					console.log(data);
					set({ user: data.user });
				} catch (err) {
					console.log(err);
				}
			},
		})),
		{
			name: "auth-store",
		},
	),
);

export default useAuthStore;
