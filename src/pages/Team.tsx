import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Award, GraduationCap } from 'lucide-react';

const teamMembers = [
  { name: 'Atharva Sharma', role: 'Project Lead', contribution: 'System Design & Integration' },
  { name: 'Aryan Sachan', role: 'Hardware Engineer', contribution: 'Circuit Design & Assembly' },
  { name: 'Ashwin Jauhary', role: 'Software Developer', contribution: 'Arduino Programming' },
  { name: 'Aviral Mishra', role: 'Documentation', contribution: 'Research & Documentation' },
  { name: 'Arpit Bajpai ', role: 'Documentation', contribution: 'Research & Documentation' },
];

const Team = () => {
  return (
    <>
      <Helmet>
        <title>Team | Smart Power Saver</title>
        <meta name="description" content="Meet the PowerSyncers team behind the Smart Power Saver project." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-expo-cyan hover:text-expo-cyan/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Simulation</span>
          </Link>

          <h1 className="expo-title text-3xl md:text-4xl mb-2">Team PowerSyncers</h1>
          <p className="text-expo-text-muted font-mono text-sm mb-8">
            The brilliant minds behind this project
          </p>

          {/* Team intro */}
          <div className="expo-panel p-8 mb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-expo-cyan/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-expo-cyan" />
            </div>
            <h2 className="text-white font-display text-2xl mb-2">PowerSyncers</h2>
            <p className="text-slate-300 max-w-lg mx-auto">
              A team of passionate engineering students from PSIT-CHE, dedicated to creating
              innovative solutions for energy conservation in educational institutions.
            </p>
          </div>

          {/* Team members */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="expo-panel p-6 hover:border-expo-cyan/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-expo-cyan to-expo-emerald flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-display text-lg">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-display text-lg">{member.name}</h3>
                    <p className="text-expo-cyan text-sm">{member.role}</p>
                    <p className="text-slate-400 text-sm mt-1">{member.contribution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* College info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="expo-panel p-6">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-6 h-6 text-expo-amber" />
                <h3 className="text-white font-display text-lg">Institution</h3>
              </div>
              <p className="text-slate-300">PSIT College of Higher Education</p>
              <p className="text-slate-400 text-sm mt-1">Department of Computer Application</p>
            </div>
            <div className="expo-panel p-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-expo-amber" />
                <h3 className="text-white font-display text-lg">Event</h3>
              </div>
              <p className="text-slate-300">TECH_EXPO 2K25</p>
              <p className="text-slate-400 text-sm mt-1">Innovation Showcase</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
