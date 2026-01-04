"use client";

import { useState } from "react";
import { useCurrentLocale } from "@/locales";
import AuthAction from "./component/auth-action";
import { AuthActionState } from "./component/auth-action";
import Carousel from "./component/carousel";

const Client = () => {
    const [state, setState] = useState<AuthActionState>("login");
    const lang = useCurrentLocale();

    return (
        <div className="flex min-h-screen w-full bg-slate-950 text-white selection:bg-indigo-500/30">
            {/* Left Side - Carousel */}
            <Carousel />

            {/* Right Side - Login Form */}
            <div className="flex w-full items-center justify-center lg:w-1/2 px-4 py-12 sm:px-6 lg:px-8 relative bg-slate-950">
                {/* Subtle Background Pattern for Right Side */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />
                    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse duration-7000" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse duration-10000 delay-1000" />
                </div>

                <AuthAction state={state} setState={setState} />
            </div>
        </div>
    );
};

export default Client;
