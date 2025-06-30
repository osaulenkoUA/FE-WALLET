import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
    const [isAuthG, setIsAuth] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    return { isAuthG };
};
