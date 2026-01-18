import { Lightbulb, Fan, Activity, CheckCircle2, Circle, Gauge } from 'lucide-react';
import { SystemState } from '@/hooks/useSystemState';
import { cn } from '@/lib/utils';

interface StatusPanelProps {
  state: SystemState;
}

export function StatusPanel({ state }: StatusPanelProps) {
  const checklist = [
    { label: 'PIR detects occupancy', active: state.pirDetecting },
    { label: 'Relay activated', active: state.relayActive },
    { label: 'Light & Fan ON', active: state.lightOn && state.fanOn },
  ];

  const energySaving = state.mode === 'empty' ? 100 : state.mode === 'occupied' ? 0 : 50;

  return (
    <div className="expo-panel p-4 h-full flex flex-col gap-4 animate-slide-in-left">
      <h2 className="font-display text-sm text-expo-cyan tracking-wider flex items-center gap-2">
        <Activity className="w-4 h-4" />
        SYSTEM STATUS
      </h2>

      {/* Status indicators */}
      <div className="flex flex-col gap-3">
        {/* Light Status */}
        <StatusItem
          icon={<Lightbulb className="w-4 h-4" />}
          label="Light Status"
          value={state.lightOn ? 'ON' : 'OFF'}
          active={state.lightOn}
          activeColor="amber"
        />

        {/* Fan Status */}
        <StatusItem
          icon={<Fan className={cn("w-4 h-4", state.fanOn && "animate-fan-spin")} />}
          label="Fan Status"
          value={state.fanOn ? 'ON' : 'OFF'}
          active={state.fanOn}
          activeColor="cyan"
        />

        {/* Power Mode */}
        <StatusItem
          icon={<Gauge className="w-4 h-4" />}
          label="Power Mode"
          value={state.powerMode}
          active={state.powerMode === 'Active'}
          activeColor="emerald"
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-expo-border" />

      {/* Current State Checklist */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-expo-text-muted uppercase tracking-wider">
          Current State
        </span>
        {checklist.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-2 text-xs font-mono transition-all duration-300",
              item.active ? "text-expo-emerald" : "text-expo-text-muted"
            )}
          >
            {item.active ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Circle className="w-3.5 h-3.5" />
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-expo-border" />

      {/* Energy Saving Indicator */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-expo-text-muted uppercase tracking-wider">
          Energy Saving
        </span>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-expo-dark rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                energySaving >= 75 ? "bg-expo-emerald shadow-glow-emerald" :
                energySaving >= 25 ? "bg-expo-amber shadow-glow-amber" :
                "bg-expo-red shadow-glow-red"
              )}
              style={{ width: `${energySaving}%` }}
            />
          </div>
          <span className={cn(
            "font-display text-sm font-bold",
            energySaving >= 75 ? "text-expo-emerald text-glow-emerald" :
            energySaving >= 25 ? "text-expo-amber text-glow-amber" :
            "text-expo-red"
          )}>
            {energySaving}%
          </span>
        </div>
      </div>

      {/* Countdown (visible in empty mode) */}
      {state.mode === 'empty' && state.countdown > 0 && (
        <div className="mt-auto pt-2 border-t border-expo-border">
          <div className="text-center">
            <span className="font-mono text-xs text-expo-text-muted">Shutting down in</span>
            <div className="font-display text-2xl text-expo-amber text-glow-amber">
              {state.countdown}s
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  active: boolean;
  activeColor: 'cyan' | 'emerald' | 'amber';
}

function StatusItem({ icon, label, value, active, activeColor }: StatusItemProps) {
  const colorClasses = {
    cyan: { text: 'text-expo-cyan', glow: 'text-glow-cyan', bg: 'bg-expo-cyan' },
    emerald: { text: 'text-expo-emerald', glow: 'text-glow-emerald', bg: 'bg-expo-emerald' },
    amber: { text: 'text-expo-amber', glow: 'text-glow-amber', bg: 'bg-expo-amber' },
  };

  const colors = colorClasses[activeColor];

  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-expo-dark/50 border border-expo-border/50">
      <div className="flex items-center gap-2">
        <div className={cn(
          "transition-colors duration-300",
          active ? colors.text : "text-expo-text-muted"
        )}>
          {icon}
        </div>
        <span className="font-mono text-xs text-expo-text">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          active ? cn(colors.bg, "animate-pulse-glow") : "bg-expo-text-muted"
        )} />
        <span className={cn(
          "font-display text-xs font-bold transition-all duration-300",
          active ? cn(colors.text, colors.glow) : "text-expo-text-muted"
        )}>
          {value}
        </span>
      </div>
    </div>
  );
}
