import { AccountData } from "@/api/auth/types";
import { deleteCookie, setCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initData: AccountData = {
    name: "",
    email: "",
    token: "",
}

interface Action {
    updateAccount: (data: AccountData) => void;
    resetAccount: () => void;
}

export const AUTH_STORATE_KEY = "E-AI-AUTH";
export const AUTH_COOKIES_KEY = "E-AI-COOKIE-AUTH";

export const useAuthStore = create<AccountData & Action>()(
    persist(
        (set) => ({
            ...initData,
            updateAccount: (data: AccountData) => {
                set(data);
                setCookie(AUTH_COOKIES_KEY, data.token);
            },
            resetAccount: () => {
                set(initData);
                deleteCookie(AUTH_COOKIES_KEY);
                localStorage.removeItem(AUTH_STORATE_KEY);
            },
        }),
        {
            name: AUTH_STORATE_KEY
        },
    )
)
