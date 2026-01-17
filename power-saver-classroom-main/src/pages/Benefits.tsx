import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Leaf, Clock, Shield, TrendingDown, Settings } from 'lucide-react';

const benefits = [
  {
    title: 'Energy Savings',
    description: 'Reduces electricity consumption by up to 40% by automatically turning off appliances in unoccupied rooms.',
    icon: Zap,
    stat: '40%',
    statLabel: 'Energy Saved',
    color: 'text-expo-amber'
  },
  {
    title: 'Environmental Impact',
    description: 'Lower energy consumption means reduced carbon footprint and contribution to a greener environment.',
    icon: Leaf,
    stat: '30%',
    statLabel: 'CO₂ Reduction',
    color: 'text-expo-emerald'
  },
  {
    title: 'Cost Effective',
    description: 'Significant reduction in monthly electricity bills for educational institutions.',
    icon: TrendingDown,
    stat: '₹5000+',
    statLabel: 'Monthly Savings',
    color: 'text-expo-cyan'
  },
  {
    title: 'Automatic Operation',
    description: 'No manual intervention required. The system works autonomously 24/7.',
    icon: Clock,
    stat: '24/7',
    statLabel: 'Auto Operation',
    color: 'text-purple-400'
  },
  {
    title: 'Equipment Protection',
    description: 'Prevents unnecessary wear and tear on electrical appliances by reducing operating hours.',
    icon: Shield,
    stat: '2x',
    statLabel: 'Lifespan Increase',
    color: 'text-red-400'
  },
  {
    title: 'Easy Maintenance',
    description: 'Simple design with readily available components makes maintenance quick and affordable.',
    icon: Settings,
    stat: 'Low',
    statLabel: 'Maintenance',
    color: 'text-blue-400'
  }
];

const Benefits = () => {
  return (
    <>
      <Helmet>
        <title>Benefits | Smart Power Saver</title>
        <meta name="description" content="Discover the benefits and advantages of the Smart Power Saver system." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-expo-cyan hover:text-expo-cyan/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Simulation</span>
          </Link>
          
          <h1 className="expo-title text-3xl md:text-4xl mb-2">Benefits & Advantages</h1>
          <p className="text-expo-text-muted font-mono text-sm mb-8">
            Why Smart Power Saver is the future of classroom energy management
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="expo-panel p-6 group hover:border-expo-cyan/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-display ${benefit.color}`}>{benefit.stat}</div>
                    <div className="text-xs text-slate-500">{benefit.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-white font-display text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          {/* Summary card */}
          <div className="mt-12 expo-panel p-8 border-expo-emerald/30">
            <div className="text-center max-w-2xl mx-auto">
              <Leaf className="w-12 h-12 text-expo-emerald mx-auto mb-4" />
              <h2 className="text-white font-display text-2xl mb-4">Sustainable Future</h2>
              <p className="text-slate-300">
                By implementing Smart Power Saver in classrooms across an institution, 
                we can save thousands of units of electricity annually, contributing to 
                both cost savings and environmental sustainability. Every small step 
                towards energy conservation makes a big difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;
