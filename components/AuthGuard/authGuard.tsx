"use client";

import { useRouter } from "next/router";
import { type ReactNode, useEffect } from "react";
import useAuthStore from "../../stores/auth.store";

export function AuthGuard({ children }: { children: ReactNode }) {
	const authStore = useAuthStore();
	const router = useRouter();

	const checkAuth = async () => {
		const isAuth = await authStore.authCheck();
		if (!isAuth) {
			await router.push("/login");
		}
	};
	useEffect(() => {
		void checkAuth();
	}, []);

	return <>{children}</>;
}
