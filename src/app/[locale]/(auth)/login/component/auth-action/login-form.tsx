"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import { AuthActionState } from ".";
import { useRouter } from "next/navigation";
import { useCurrentLocale, useScopedI18n } from "@/locales";
import { useAuthStore } from "@/store/authStore";

interface Props {
    setState: (state: AuthActionState) => void;
}

const mockUser = {
    email: "ethanwang627@gmail.com",
    password: "123456",
}

const LoginForm = ({ setState }: Props) => {
    const { updateAccount } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const locale = useCurrentLocale();
    const t = useScopedI18n("pages.auth.login");

    const loginSchema = z.object({
        email: z.string().email(t("invalidEmail")),
        password: z.string().min(6, t("passwordMinLength")),
    });

    type LoginSchema = z.infer<typeof loginSchema>;

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginSchema) => {
        console.log(data);
        if (data.email === mockUser.email && data.password === mockUser.password) {
            updateAccount({
                name: "Ethan Wang",
                email: "ethanwang627@gmail.com",
                token: "aaabbb",
            });
            router.push(`/${locale}/dashboard`);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8 relative z-10 border border-slate-800 p-10 rounded-lg backdrop-blur-lg">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                    {t("title")}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                    {t("subtitle")}
                </p>
            </div>

            <div className="mt-8 space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel className="text-slate-200">{t("emailLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t("emailPlaceholder")}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel className="text-slate-200">{t("passwordLabel")}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                    placeholder={t("passwordPlaceholder")}
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <LuEyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <LuEye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-slate-400"
                                >
                                    {t("rememberMe")}
                                </label>
                            </div>

                            <div className="text-sm">
                                <div
                                    className="cursor-pointer font-medium text-indigo-400 hover:text-indigo-300"
                                    onClick={() => setState("forget-pwd")}
                                >
                                    {t("forgotPassword")}
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                            {t("signInButton")}
                        </Button>
                    </form>
                </Form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-slate-950 px-2 text-slate-400">
                            {t("orContinueWith")}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                        <FaGoogle className="mr-2 h-4 w-4" />
                        {t("googleButton")}
                    </Button>
                    <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                        <FaGithub className="mr-2 h-4 w-4" />
                        {t("githubButton")}
                    </Button>
                </div>

                <div className="text-center text-sm text-slate-400">
                    {t("noAccount")}{" "}
                    <div className="cursor-pointer text-indigo-400 hover:text-indigo-300" onClick={() => setState("register")}>
                        {t("signUpLink")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;