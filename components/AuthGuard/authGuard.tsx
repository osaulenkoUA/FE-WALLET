'use client'

import useAuthStore from "../../stores/auth.store";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

export function AuthGuard({ children }: { children: ReactNode }) {
    const authStore = useAuthStore();
    const router = useRouter();


    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authStore.authCheck();
            if (!isAuth) {
                router.push("/login");
            }
        };

        void checkAuth();
    }, []);



    return <>{children}</>;
}
