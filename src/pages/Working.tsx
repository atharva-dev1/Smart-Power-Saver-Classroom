import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, User, Radio, Cpu, Lightbulb, Fan } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: 'Motion Detection',
    description: 'PIR sensor continuously monitors the room for human presence by detecting infrared radiation changes.',
    icon: Radio,
    color: 'text-expo-emerald'
  },
  {
    step: 2,
    title: 'Signal Processing',
    description: 'Arduino receives the digital signal (HIGH/LOW) from PIR sensor and processes it based on programmed logic.',
    icon: Cpu,
    color: 'text-expo-cyan'
  },
  {
    step: 3,
    title: 'Decision Making',
    description: 'If motion detected → Turn ON appliances. If no motion for 5 minutes → Turn OFF appliances.',
    icon: User,
    color: 'text-expo-amber'
  },
  {
    step: 4,
    title: 'Relay Control',
    description: 'Arduino sends control signals to relay module, which switches the AC loads (lights, fans) ON or OFF.',
    icon: Lightbulb,
    color: 'text-red-400'
  },
  {
    step: 5,
    title: 'Power Saving',
    description: 'Appliances automatically turn OFF when room is empty, saving electricity and reducing energy costs.',
    icon: Fan,
    color: 'text-purple-400'
  }
];

const Working = () => {
  return (
    <>
      <Helmet>
        <title>How It Works | Smart Power Saver</title>
        <meta name="description" content="Step-by-step explanation of how the Smart Power Saver system operates." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-expo-cyan hover:text-expo-cyan/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Simulation</span>
          </Link>
          
          <h1 className="expo-title text-3xl md:text-4xl mb-2">How It Works</h1>
          <p className="text-expo-text-muted font-mono text-sm mb-8">
            Step-by-step working principle of the Smart Power Saver
          </p>
          
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.step}>
                <div className="expo-panel p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <span className={`font-display text-xl ${step.color}`}>{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className={`w-5 h-5 ${step.color}`} />
                        <h3 className="text-white font-display text-lg">{step.title}</h3>
                      </div>
                      <p className="text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="w-5 h-5 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Modes explanation */}
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            <div className="expo-panel p-6 border-expo-emerald/30">
              <h3 className="text-expo-emerald font-display text-lg mb-3">Occupied Mode</h3>
              <p className="text-slate-300 text-sm">When motion is detected, all appliances turn ON and remain ON as long as there's activity.</p>
            </div>
            <div className="expo-panel p-6 border-expo-cyan/30">
              <h3 className="text-expo-cyan font-display text-lg mb-3">Empty Mode</h3>
              <p className="text-slate-300 text-sm">After 5 minutes of no motion, appliances automatically turn OFF to save energy.</p>
            </div>
            <div className="expo-panel p-6 border-expo-amber/30">
              <h3 className="text-expo-amber font-display text-lg mb-3">Override Mode</h3>
              <p className="text-slate-300 text-sm">Manual switch bypasses automatic control, keeping appliances ON regardless of motion.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Working;
