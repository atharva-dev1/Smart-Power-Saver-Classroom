import { Zap, Cpu, Boxes, CircuitBoard, FileCode, Settings, Users, Leaf, Rocket, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navTabs = [
  { label: 'Components', href: '/components', icon: Boxes },
  { label: 'Circuit', href: '/circuit', icon: CircuitBoard },
  { label: 'Code', href: '/code', icon: FileCode },
  { label: 'Working', href: '/working', icon: Settings },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Benefits', href: '/benefits', icon: Leaf },
  { label: 'Future', href: '/future', icon: Rocket },
];

export function ExpoHeader() {
  return (
    <header className="relative py-6 px-8 animate-fade-in">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-expo-cyan/5 to-transparent pointer-events-none" />

      <div className="relative flex flex-col items-center gap-3">
        {/* Main title */}
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-expo-cyan/10 border border-expo-cyan/30">
            <Zap className="w-8 h-8 text-expo-cyan animate-pulse-glow" />
          </div>

          <h1 className="expo-title text-3xl md:text-4xl lg:text-5xl">
            Smart Power Saver
          </h1>

          <div className="p-2 rounded-lg bg-expo-cyan/10 border border-expo-cyan/30">
            <Cpu className="w-8 h-8 text-expo-cyan animate-pulse-glow" />
          </div>
        </div>

        {/* Expo badge - below title */}
        <div className="flex items-center gap-2">
          <span className="font-display text-expo-amber text-sm font-bold tracking-wider">
            TECH_EXPO 2K25
          </span>
          <span className="w-1 h-1 rounded-full bg-expo-amber" />
          <span className="font-mono text-expo-amber text-xs">
            PSIT_CHE
          </span>
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-3">
          <span className="expo-subtitle text-sm">for Classrooms</span>
          <span className="w-1 h-1 rounded-full bg-expo-cyan" />
          <span className="expo-subtitle text-sm">Built by PowerSyncers</span>
        </div>

        {/* Navigation Tabs */}
        {/* Desktop Navigation */}
        <nav className="hidden md:flex mt-4 flex-wrap justify-center gap-2">
          {navTabs.map((tab) => (
            <Link
              key={tab.href}
              to={tab.href}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-expo-cyan/50 hover:bg-slate-800 transition-all"
            >
              <tab.icon className="w-4 h-4 text-slate-400 group-hover:text-expo-cyan transition-colors" />
              <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">
                {tab.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden absolute top-6 right-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-slate-800 border-slate-700 text-expo-cyan hover:bg-slate-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-expo-dark border-expo-border w-64">
              <div className="flex flex-col gap-4 mt-8">
                {navTabs.map((tab) => (
                  <Link
                    key={tab.href}
                    to={tab.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-expo-cyan transition-colors"
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-mono text-sm">{tab.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tagline */}
        <p className="font-mono text-xs text-expo-text-muted tracking-wider mt-1">
          IoT-Based Automated Energy Management System
        </p>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-expo-cyan/50 to-transparent" />
    </header>
  );
}
