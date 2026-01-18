
import { useState, useEffect } from "react";
import { Zap, ArrowRight, ExternalLink, Activity, ShieldCheck, BatteryCharging, ChevronDown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
    onEnter: () => void;
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const handleStart = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            onEnter();
            setIsVisible(false);
        }, 800);
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden transition-opacity duration-1000 ${isAnimatingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-950 to-background" />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-expo-cyan/5 blur-[120px] rounded-full transform -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-expo-emerald/5 blur-[100px] rounded-full transform translate-x-1/2 translate-y-1/4" />

                {/* Animated Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(hsl(var(--expo-cyan)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--expo-cyan)) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
                        transformOrigin: 'top center',
                    }}
                />

                {/* Particles / Stars */}
                <div className="absolute inset-0 animate-pulse-glow opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 2 + 1}px`,
                                height: `${Math.random() * 2 + 1}px`,
                                opacity: Math.random() * 0.5 + 0.2,
                                animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-center">

                {/* Logo / Badge */}
                <div className={`mb-8 p-4 rounded-2xl bg-slate-900/50 border border-expo-border backdrop-blur-md animate-fade-in opacity-0`} style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-expo-cyan/10 border border-expo-cyan/30 text-expo-cyan animate-pulse-glow">
                            <Zap className="w-8 h-8" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-expo-cyan">Project</span>
                            <span className="font-display font-bold text-white tracking-wider">SMART POWER SAVER</span>
                        </div>
                    </div>
                </div>

                {/* Main Title */}
                <h1 className="max-w-4xl mx-auto mb-6">
                    <span className="block font-display text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 animate-slide-in-left opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        Next-Gen Classroom
                    </span>
                    <span className="block font-display text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-expo-cyan via-white to-expo-emerald animate-slide-in-right opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                        Energy Automation
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-slate-400 font-light leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                    Experience the future of sustainable education with our IoT-powered automated solution.
                    Seamlessly managing power consumption for a greener tomorrow.
                </p>

                {/* Feature Highlights */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                    {[
                        { icon: Activity, label: "Real-time Detection" },
                        { icon: ShieldCheck, label: "Automatic Control" },
                        { icon: BatteryCharging, label: "Power Efficiency" }
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-sm text-slate-300">
                            <feature.icon className="w-4 h-4 text-expo-cyan" />
                            <span>{feature.label}</span>
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-center gap-6 animate-scale-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                    <Button
                        size="lg"
                        onClick={handleStart}
                        className="group relative px-8 py-8 text-lg bg-expo-cyan hover:bg-expo-cyan/90 text-slate-950 font-bold tracking-wide rounded-full shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.8)] transition-all duration-500 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Initialize System...
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                    </Button>

                    {/* Team Credit */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Designed & Developed By</span>
                        <div className="flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-expo-amber animate-bounce" />
                            <span className="font-display font-medium text-white tracking-wider">TEAM POWERSYNCERS</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 animate-bounce opacity-50">
                    <ChevronDown className="w-6 h-6 text-slate-500" />
                </div>

            </div>
        </div>
    );
}
