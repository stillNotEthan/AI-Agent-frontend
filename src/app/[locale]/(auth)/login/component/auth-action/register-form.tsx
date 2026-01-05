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
import { useScopedI18n } from "@/locales";
import { createAccountAPI } from "@/api/auth";
import { ResponseStatusCode } from "@/api/types";
import { toast } from "sonner";

interface Props {
    setState: (state: AuthActionState) => void;
}

const RegisterForm = ({ setState }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const t = useScopedI18n("pages.auth.register");

    const registerSchema = z.object({
        name: z.string().min(2, t("nameMinLength")),
        email: z.string().email(t("invalidEmail")),
        password: z.string().min(6, t("passwordMinLength")),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: t("passwordMismatch"),
        path: ["confirmPassword"],
    });

    type RegisterSchema = z.infer<typeof registerSchema>;

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterSchema) => {
        const { code, message } = await createAccountAPI(data);
        if (code !== ResponseStatusCode.OPERATING_SUCCESSFULLY) {
            toast(message);
            return;
        }
        toast("Register successfully");
        setState("login");
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel className="text-slate-200">{t("nameLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t("namePlaceholder")}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel className="text-slate-200">{t("confirmPasswordLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                                placeholder={t("confirmPasswordPlaceholder")}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                            {t("signUpButton")}
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
                    {t("hasAccount")}{" "}
                    <div className="cursor-pointer text-indigo-400 hover:text-indigo-300 inline-block" onClick={() => setState("login")}>
                        {t("signInLink")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;