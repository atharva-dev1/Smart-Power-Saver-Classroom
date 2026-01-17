import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Radio, Monitor, ToggleLeft, Zap, Cable } from 'lucide-react';

const components = [
  {
    name: 'ESP32 Development Module',
    description: 'The powerful brain of our system – an advanced ESP32 microcontroller with built-in Wi-Fi and Bluetooth, capable of high-speed processing, multitasking, and IoT connectivity.',
    icon: Cpu,
    specs: [
      'Dual-Core 32-bit Processor',
      'Up to 240 MHz Clock',
      '4MB Flash',
      '520KB SRAM',
      '34 GPIO Pins',
      '18 Analog Inputs',
      'Wi-Fi + Bluetooth (BLE)'
    ],
    color: 'bg-green-500/20 text-green-500'
  },

  {
    name: 'PIR Sensor (HC-SR501)',
    description: 'Passive Infrared sensor that detects human motion within a 7-meter range with 120° detection angle.',
    icon: Radio,
    specs: ['7m Range', '120° Angle', '3-5V DC', 'Adjustable Sensitivity'],
    color: 'bg-expo-emerald/20 text-expo-emerald'
  },
  {
    name: 'LCD Display (16x2)',
    description: 'Displays real-time system status, mode, and messages with I2C interface for easy communication.',
    icon: Monitor,
    specs: ['16x2 Characters', 'I2C Interface', 'Backlight Control', '5V Operation'],
    color: 'bg-expo-amber/20 text-expo-amber'
  },
  {
    name: 'Relay Module',
    description: 'Controls high-power AC loads (lights, fans) safely isolated from the low-voltage Arduino circuit.',
    icon: ToggleLeft,
    specs: ['5V Control', '10A Rating', 'Optocoupler Isolated', 'LED Indicators'],
    color: 'bg-red-500/20 text-red-400'
  },
  {
    name: 'Power Supply',
    description: 'Provides stable 5V DC power to the Arduino and peripherals from AC mains.',
    icon: Zap,
    specs: ['AC to DC', '5V Output', '1A Current', 'Regulated'],
    color: 'bg-purple-500/20 text-purple-400'
  },
  {
    name: 'Connecting Wires',
    description: 'Jumper wires connecting all components following proper circuit diagram for reliable operation.',
    icon: Cable,
    specs: ['Male-Male', 'Male-Female', 'Color Coded', 'Breadboard Compatible'],
    color: 'bg-blue-500/20 text-blue-400'
  }
];

const Components = () => {
  return (
    <>
      <Helmet>
        <title>Components | Smart Power Saver</title>
        <meta name="description" content="Detailed breakdown of all electronic components used in the Smart Power Saver system." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-expo-cyan hover:text-expo-cyan/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Simulation</span>
          </Link>

          <h1 className="expo-title text-3xl md:text-4xl mb-2">System Components</h1>
          <p className="text-expo-text-muted font-mono text-sm mb-8">
            Hardware components used in the Smart Power Saver system
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component, i) => (
              <div key={i} className="expo-panel p-6 hover:border-expo-cyan/50 transition-colors">
                <div className={`w-12 h-12 rounded-lg ${component.color} flex items-center justify-center mb-4`}>
                  <component.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-display text-lg mb-2">{component.name}</h3>
                <p className="text-expo-text-muted text-sm mb-4">{component.description}</p>
                <div className="flex flex-wrap gap-2">
                  {component.specs.map((spec, j) => (
                    <span key={j} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 font-mono">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Components;
