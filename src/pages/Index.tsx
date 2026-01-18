import { useSystemState } from '@/hooks/useSystemState';
import { ExpoHeader } from '@/components/expo/ExpoHeader';
import { StatusPanel } from '@/components/expo/StatusPanel';
import { ClassroomScene } from '@/components/expo/ClassroomScene';
import { SystemFlowPanel } from '@/components/expo/SystemFlowPanel';
import { ControlPanel } from '@/components/expo/ControlPanel';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const { state, setMode, toggleAutoPlay } = useSystemState();

  return (
    <>
      <Helmet>
        <title>Smart Power Saver for Classrooms | TECH_EXPO 2K25</title>
        <meta
          name="description"
          content="IoT-Based Automated Energy Management System by PowerSyncers. Interactive 3D simulation demonstrating Arduino-based smart classroom power management."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col overflow-hidden">
        {/* Animated background grid */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--expo-cyan)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--expo-cyan)) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-expo-cyan/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-expo-emerald/10 to-transparent" />
        </div>

        {/* Header */}
        <ExpoHeader />

        {/* Main content grid */}
        <main className="flex-1 flex flex-col lg:flex-row gap-4 p-2 md:p-4 relative">
          {/* Left Panel - Status */}
          <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <StatusPanel state={state} />
          </aside>

          {/* Center - 3D Scene */}
          <section className="flex-1 min-h-[300px] lg:min-h-0">
            <div className="h-full expo-panel p-2 animate-scale-in">
              <ClassroomScene state={state} />
            </div>
          </section>

          {/* Right Panel - System Flow */}
          <aside className="w-full lg:w-56 xl:w-64 flex-shrink-0">
            <SystemFlowPanel state={state} />
          </aside>
        </main>

        {/* Bottom - Control Panel */}
        <footer className="p-2 md:p-4">
          <ControlPanel
            currentMode={state.mode}
            autoPlay={state.autoPlay}
            onModeChange={setMode}
            onToggleAutoPlay={toggleAutoPlay}
          />

          {/* Explanation line */}
          <p className="text-center font-mono text-[10px] text-expo-text-muted mt-4 max-w-3xl mx-auto px-4">
            This 3D animated simulation demonstrates the real-time working of our Arduino-based Smart Power Saver system
            exactly as it would operate in a real classroom before physical deployment.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;
