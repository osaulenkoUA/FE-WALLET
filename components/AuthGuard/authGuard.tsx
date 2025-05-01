'use client'

import useAuthStore from "../../stores/auth.store";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

export function AuthGuard({ children }: { children: ReactNode }) {
    const authStore = useAuthStore();
    const router = useRouter();

    const checkAuth = async () => {
        const isAuth = authStore.authCheck();
        if (!isAuth) {
            router.push("/login");
        }
    };
    useEffect(() => {
        void checkAuth();
    }, []);



    return <>{children}</>;
}
