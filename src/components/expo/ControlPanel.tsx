import { UserCheck, UserX, Hand, RotateCcw } from 'lucide-react';
import { SystemMode } from '@/hooks/useSystemState';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface ControlPanelProps {
  currentMode: SystemMode;
  autoPlay: boolean;
  onModeChange: (mode: SystemMode) => void;
  onToggleAutoPlay: () => void;
}

export function ControlPanel({ currentMode, autoPlay, onModeChange, onToggleAutoPlay }: ControlPanelProps) {
  const controls = [
    {
      mode: 'occupied' as SystemMode,
      icon: <UserCheck className="w-5 h-5" />,
      label: 'Room Occupied',
      color: 'emerald',
    },
    {
      mode: 'empty' as SystemMode,
      icon: <UserX className="w-5 h-5" />,
      label: 'Room Empty',
      color: 'default',
    },
    {
      mode: 'override' as SystemMode,
      icon: <Hand className="w-5 h-5" />,
      label: 'Manual Override',
      color: 'red',
    },
  ];

  return (
    <div className="expo-panel p-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        {/* Control Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {controls.map((control) => (
            <button
              key={control.mode}
              onClick={() => {
                if (autoPlay) onToggleAutoPlay();
                onModeChange(control.mode);
              }}
              className={cn(
                "control-button flex items-center gap-2 group",
                currentMode === control.mode
                  ? control.color === 'emerald'
                    ? "control-button-active"
                    : control.color === 'red'
                    ? "control-button-override"
                    : "border-expo-text text-expo-text bg-expo-text/10"
                  : "control-button-inactive"
              )}
            >
              <span className={cn(
                "transition-transform duration-300 group-hover:scale-110",
                currentMode === control.mode && control.color === 'emerald' && "animate-pulse-glow"
              )}>
                {control.icon}
              </span>
              <span className="hidden sm:inline">{control.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-expo-border" />
        <div className="sm:hidden w-full h-px bg-expo-border" />

        {/* Auto-play Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <RotateCcw className={cn(
              "w-4 h-4 transition-all duration-300",
              autoPlay ? "text-expo-cyan animate-[fan-spin_3s_linear_infinite]" : "text-expo-text-muted"
            )} />
            <span className="font-mono text-sm text-expo-text">Auto-Play</span>
          </div>
          <Switch
            checked={autoPlay}
            onCheckedChange={onToggleAutoPlay}
            className={cn(
              "data-[state=checked]:bg-expo-cyan",
              autoPlay && "shadow-glow-cyan"
            )}
          />
        </div>
      </div>

      {/* Mode description */}
      <p className="text-center font-mono text-xs text-expo-text-muted mt-3">
        {currentMode === 'occupied' && "Simulating: Person detected in classroom"}
        {currentMode === 'empty' && "Simulating: Classroom vacated, initiating power-save"}
        {currentMode === 'override' && "Simulating: Teacher manual control active"}
      </p>
    </div>
  );
}
