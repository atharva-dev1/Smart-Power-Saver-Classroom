import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleDot, ArrowRight } from 'lucide-react';

const connections = [
  { from: 'PIR Sensor VCC', to: 'Arduino 5V', color: 'bg-red-500' },
  { from: 'PIR Sensor GND', to: 'Arduino GND', color: 'bg-gray-500' },
  { from: 'PIR Sensor OUT', to: 'Arduino Pin 2', color: 'bg-yellow-500' },
  { from: 'Relay IN1', to: 'Arduino Pin 3', color: 'bg-blue-500' },
  { from: 'Relay IN2', to: 'Arduino Pin 4', color: 'bg-green-500' },
  { from: 'LCD SDA', to: 'Arduino A4', color: 'bg-purple-500' },
  { from: 'LCD SCL', to: 'Arduino A5', color: 'bg-orange-500' },
  { from: 'Manual Switch', to: 'Arduino Pin 5', color: 'bg-cyan-500' },
];

const Circuit = () => {
  return (
    <>
      <Helmet>
        <title>Circuit Diagram | Smart Power Saver</title>
        <meta name="description" content="Complete circuit diagram and wiring guide for the Smart Power Saver system." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-expo-cyan hover:text-expo-cyan/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Simulation</span>
          </Link>

          <h1 className="expo-title text-3xl md:text-4xl mb-2">Circuit Diagram</h1>
          <p className="text-expo-text-muted font-mono text-sm mb-8">
            Wiring connections and circuit schematic
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Circuit visualization */}
            <div className="expo-panel p-6">
              <h2 className="text-white font-display text-xl mb-6">Connection Diagram</h2>
              <div className="relative aspect-square bg-slate-900 rounded-lg p-8 border border-slate-700">
                {/* Arduino representation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-48 bg-expo-cyan/20 border-2 border-expo-cyan rounded-lg flex items-center justify-center p-2">
                  <span className="text-expo-cyan font-mono text-xs text-center leading-tight">ESP32 Development Module</span>
                </div>

                {/* Connected components */}
                <div className="absolute top-4 left-4 p-3 bg-expo-emerald/20 border border-expo-emerald rounded-lg">
                  <span className="text-expo-emerald font-mono text-xs">PIR</span>
                </div>
                <div className="absolute top-4 right-4 p-3 bg-expo-amber/20 border border-expo-amber rounded-lg">
                  <span className="text-expo-amber font-mono text-xs">LCD</span>
                </div>
                <div className="absolute bottom-4 left-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                  <span className="text-red-400 font-mono text-xs">Relay</span>
                </div>
                <div className="absolute bottom-4 right-4 p-3 bg-purple-500/20 border border-purple-500 rounded-lg">
                  <span className="text-purple-400 font-mono text-xs">Switch</span>
                </div>
              </div>
            </div>

            {/* Connection list */}
            <div className="expo-panel p-6">
              <h2 className="text-white font-display text-xl mb-6">Pin Connections</h2>
              <div className="space-y-3">
                {connections.map((conn, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <CircleDot className={`w-4 h-4 ${conn.color.replace('bg-', 'text-')}`} />
                    <span className="text-slate-300 font-mono text-sm flex-1">{conn.from}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-300 font-mono text-sm flex-1">{conn.to}</span>
                    <div className={`w-3 h-3 rounded-full ${conn.color}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Safety notes */}
          <div className="mt-8 expo-panel p-6 border-expo-amber/30">
            <h2 className="text-expo-amber font-display text-xl mb-4">⚠️ Safety Notes</h2>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Always disconnect power before making connections</li>
              <li>• Use appropriate wire gauges for high-current connections</li>
              <li>• Ensure proper insulation on all AC connections</li>
              <li>• Follow color coding for easy identification</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Circuit;
