"use client";

import { useRouter } from "next/router";
import { type ReactNode, useEffect, useState } from "react";
import useAuthStore from "../../stores/auth.store"

export function AuthGuard({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [isAuthorized, setIsAuthorized] = useState(false);
	const { getUserProfile } = useAuthStore();

	useEffect(() => {
		// 1. Чекаємо, поки Next.js ініціалізує роутер і розпарсить query параметри
		if (!router.isReady) return;

		const checkAuth = async () => {
			// 2. Беремо токен з URL (якщо він там є)
			const tokenFromQuery = router.query.token;

			if (tokenFromQuery && typeof tokenFromQuery === "string") {
				localStorage.setItem("token", tokenFromQuery);

				// Опціонально: видаляємо токен з URL, щоб він не "світився" в адресному рядку
				const { token, ...restQuery } = router.query;
				router.replace(
					{ pathname: router.pathname, query: restQuery },
					undefined,
					{ shallow: true },
				);
			}
			// 3. Перевіряємо наявність токена в localStorage
			const token = localStorage.getItem("token");

			if (!token) {
				// Якщо токена немає — на логін
				await router.push("/login");
			} else {
				// Якщо токен є — дозволяємо рендер children
				setIsAuthorized(true);
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				void getUserProfile(config);

			}
		};

		void checkAuth();
	}, [router.isReady, router.query]);

	if (!isAuthorized) {
		return null;
	}

	return <>{children}</>;
}
