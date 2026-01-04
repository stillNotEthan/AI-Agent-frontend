"use client";

import { useState, useEffect } from "react";
import ParticlesBackground from "@/components/ui/particles-background";

const slides = [
    {
        id: 1,
        title: "Unlock the Power of AI",
        description: "Experience the next generation of intelligent agents.",
        color: "from-violet-600 via-indigo-600 to-purple-800",
    },
    {
        id: 2,
        title: "Seamless Integration",
        description: "Connect your workflows with ease and efficiency.",
        color: "from-blue-600 via-cyan-600 to-teal-700",
    },
    {
        id: 3,
        title: "Secure & Reliable",
        description: "Enterprise-grade security for your peace of mind.",
        color: "from-emerald-600 via-green-600 to-lime-700",
    },
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hidden w-1/2 relative overflow-hidden lg:flex flex-col justify-between p-16">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-br ${slide.color} ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

                        {/* Animated Blobs */}
                        <div className="absolute -left-[20%] -top-[20%] h-[800px] w-[800px] rounded-full bg-white/10 blur-[100px] animate-pulse duration-7000" />
                        <div className="absolute -right-[20%] top-[30%] h-[600px] w-[600px] rounded-full bg-black/20 blur-[120px] animate-pulse duration-10000 delay-1000" />
                        <div className="absolute left-[20%] -bottom-[20%] h-[700px] w-[700px] rounded-full bg-white/5 blur-[80px] animate-pulse duration-12000 delay-2000" />

                        {/* Mesh Grid Overlay */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    </div>
                ))}
                {/* Gradient Overlay for Smooth Transition */}
                <div className="absolute top-0 right-0 bottom-0 w-64 bg-gradient-to-l from-slate-950 to-transparent z-10" />
            </div>

            {/* Interactive Particles */}
            <ParticlesBackground />

            {/* Content */}
            <div className="relative z-10 mt-auto mb-20 space-y-8 max-w-xl">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`transition-all duration-1000 ease-out absolute bottom-0 left-0 w-full ${index === currentSlide
                            ? "opacity-100 translate-y-0 blur-0"
                            : "opacity-0 translate-y-12 blur-sm"
                            }`}
                    >
                        <h1 className="text-6xl font-bold tracking-tight mb-6 leading-tight drop-shadow-lg">
                            {slide.title}
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed max-w-md drop-shadow-md">
                            {slide.description}
                        </p>
                    </div>
                ))}
                {/* Spacer to hold height */}
                <div className="invisible pointer-events-none select-none">
                    <h1 className="text-6xl font-bold tracking-tight mb-6 leading-tight">Placeholder</h1>
                    <p className="text-xl text-white/80 leading-relaxed max-w-md">Placeholder</p>
                </div>
            </div>

            {/* Indicators */}
            <div className="relative z-10 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ease-out ${index === currentSlide
                            ? "w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            : "w-2 bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;