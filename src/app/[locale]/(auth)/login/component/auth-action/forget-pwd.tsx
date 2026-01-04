"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthActionState } from ".";

import { useScopedI18n } from "@/locales";

interface Props {
    setState: (state: AuthActionState) => void;
}

const ForgetPwd = ({ setState }: Props) => {
    const t = useScopedI18n("pages.auth.forgotPassword");

    const forgetPwdSchema = z.object({
        email: z.string().email(t("invalidEmail")),
        code: z.string().min(6, t("codeMinLength")),
    });

    type ForgetPwdSchema = z.infer<typeof forgetPwdSchema>;

    const form = useForm<ForgetPwdSchema>({
        resolver: zodResolver(forgetPwdSchema),
        defaultValues: {
            email: "",
            code: "",
        },
    });

    const onSubmit = async (data: ForgetPwdSchema) => {
        console.log(data);
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
                                            <div className="flex gap-2">
                                                <Input
                                                    {...field}
                                                    placeholder={t("emailPlaceholder")}
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                                                />
                                                <Button type="button" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white whitespace-nowrap">
                                                    {t("getCodeButton")}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel className="text-slate-200">{t("codeLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t("codePlaceholder")}
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
                            {t("verifyButton")}
                        </Button>
                    </form>
                </Form>

                <div className="text-center text-sm text-slate-400">
                    {t("rememberPassword")}{" "}
                    <div className="cursor-pointer text-indigo-400 hover:text-indigo-300 inline-block" onClick={() => setState("login")}>
                        {t("signInLink")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPwd;