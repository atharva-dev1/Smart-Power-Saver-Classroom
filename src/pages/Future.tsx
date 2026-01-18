import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wifi, Smartphone, Sun, Brain, BarChart3, Battery } from 'lucide-react';

const enhancements = [
  {
    title: 'IoT Integration',
    description: 'Add WiFi module (ESP8266/ESP32) for remote monitoring and control via internet.',
    icon: Wifi,
    status: 'Planned',
    color: 'text-expo-cyan'
  },
  {
    title: 'Mobile App',
    description: 'Develop a mobile application for real-time monitoring and manual override from anywhere.',
    icon: Smartphone,
    status: 'In Design',
    color: 'text-expo-emerald'
  },
  {
    title: 'Light Sensing',
    description: 'Add LDR sensors to utilize natural daylight and reduce artificial lighting when possible.',
    icon: Sun,
    status: 'Planned',
    color: 'text-expo-amber'
  },
  {
    title: 'AI Integration',
    description: 'Implement machine learning to predict occupancy patterns and optimize energy usage.',
    icon: Brain,
    status: 'Research',
    color: 'text-purple-400'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Create a web dashboard showing energy consumption statistics and savings reports.',
    icon: BarChart3,
    status: 'Planned',
    color: 'text-blue-400'
  },
  {
    title: 'Battery Backup',
    description: 'Add battery backup system to maintain operation during power outages.',
    icon: Battery,
    status: 'Planned',
    color: 'text-red-400'
  }
];

const Future = () => {
  return (
    <>
      <Helmet>
        <title>Future Scope | Smart Power Saver</title>
        <meta name="description" content="Explore future enhancements and development roadmap for Smart Power Saver." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-expo-cyan hover:text-expo-cyan/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Simulation</span>
          </Link>
          
          <h1 className="expo-title text-3xl md:text-4xl mb-2">Future Scope</h1>
          <p className="text-expo-text-muted font-mono text-sm mb-8">
            Planned enhancements and development roadmap
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enhancements.map((item, i) => (
              <div key={i} className="expo-panel p-6 hover:border-expo-cyan/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-white font-display text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* Roadmap timeline */}
          <div className="mt-12 expo-panel p-8">
            <h2 className="text-white font-display text-xl mb-6">Development Roadmap</h2>
            <div className="space-y-4">
              {[
                { phase: 'Phase 1', title: 'Current Implementation', desc: 'Basic PIR-based automation', status: 'Complete', color: 'bg-expo-emerald' },
                { phase: 'Phase 2', title: 'IoT Integration', desc: 'WiFi connectivity & remote access', status: 'Q2 2025', color: 'bg-expo-cyan' },
                { phase: 'Phase 3', title: 'Smart Features', desc: 'AI prediction & analytics', status: 'Q4 2025', color: 'bg-expo-amber' },
                { phase: 'Phase 4', title: 'Campus-wide Deployment', desc: 'Centralized management system', status: '2026', color: 'bg-purple-500' }
              ].map((phase, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                  <div className="flex-1 flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                    <div>
                      <span className="text-slate-500 text-xs font-mono">{phase.phase}</span>
                      <h4 className="text-white font-display">{phase.title}</h4>
                      <p className="text-slate-400 text-sm">{phase.desc}</p>
                    </div>
                    <span className="text-slate-500 text-sm font-mono">{phase.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Future;
