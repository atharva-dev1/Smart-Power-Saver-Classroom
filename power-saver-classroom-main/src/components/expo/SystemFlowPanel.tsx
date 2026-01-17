import { Eye, Cpu, ToggleRight, Lightbulb, Monitor, ArrowRight, ChevronRight } from 'lucide-react';
import { SystemState } from '@/hooks/useSystemState';
import { cn } from '@/lib/utils';

interface SystemFlowPanelProps {
  state: SystemState;
}

export function SystemFlowPanel({ state }: SystemFlowPanelProps) {
  const flowSteps = [
    {
      icon: <Eye className="w-5 h-5" />,
      label: 'Input',
      component: 'PIR Sensor',
      active: state.pirDetecting,
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      label: 'Process',
      component: 'ESP32 Development Module',
      active: state.pirDetecting || state.mode === 'override',
    },
    {
      icon: <ToggleRight className="w-5 h-5" />,
      label: 'Control',
      component: 'Relay Module',
      active: state.relayActive,
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      label: 'Output',
      component: 'Light & Fan',
      active: state.lightOn,
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      label: 'Display',
      component: 'LCD Screen',
      active: true,
    },
  ];

  return (
    <div className="expo-panel p-4 h-full flex flex-col gap-4 animate-slide-in-right">
      <h2 className="font-display text-sm text-expo-cyan tracking-wider flex items-center gap-2">
        <ArrowRight className="w-4 h-4" />
        SYSTEM FLOW
      </h2>

      {/* Flow diagram */}
      <div className="flex flex-col gap-2 flex-1">
        {flowSteps.map((step, index) => (
          <div key={index} className="relative">
            <FlowStep
              icon={step.icon}
              label={step.label}
              component={step.component}
              active={step.active}
              delay={index * 100}
            />

            {/* Arrow between steps */}
            {index < flowSteps.length - 1 && (
              <div className="flex justify-center py-1">
                <ChevronRight
                  className={cn(
                    "w-4 h-4 rotate-90 transition-colors duration-300",
                    step.active ? "text-expo-cyan flow-arrow" : "text-expo-text-muted"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* LCD Message Display */}
      <div className="mt-auto pt-3 border-t border-expo-border">
        <div className="bg-expo-dark rounded-lg p-3 border border-expo-cyan/30">
          <span className="font-mono text-[10px] text-expo-text-muted uppercase tracking-wider block mb-1">
            LCD Output
          </span>
          <div className="font-mono text-sm text-expo-cyan text-glow-cyan text-center py-1 bg-expo-dark/50 rounded border border-expo-cyan/20">
            {state.lcdMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FlowStepProps {
  icon: React.ReactNode;
  label: string;
  component: string;
  active: boolean;
  delay: number;
}

function FlowStep({ icon, label, component, active, delay }: FlowStepProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg transition-all duration-300 border",
        active
          ? "bg-expo-cyan/10 border-expo-cyan/40"
          : "bg-expo-dark/30 border-expo-border/30"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div
        className={cn(
          "p-1.5 rounded-md transition-all duration-300",
          active
            ? "bg-expo-cyan/20 text-expo-cyan"
            : "bg-expo-dark text-expo-text-muted"
        )}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={cn(
          "font-mono text-[10px] uppercase tracking-wider transition-colors duration-300",
          active ? "text-expo-cyan" : "text-expo-text-muted"
        )}>
          {label}
        </span>
        <span className={cn(
          "font-sans text-xs font-medium transition-colors duration-300",
          active ? "text-expo-text" : "text-expo-text-muted"
        )}>
          {component}
        </span>
      </div>

      {/* Active indicator */}
      <div className="ml-auto">
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            active
              ? "bg-expo-cyan animate-pulse-glow shadow-glow-cyan"
              : "bg-expo-text-muted/30"
          )}
        />
      </div>
    </div>
  );
}
