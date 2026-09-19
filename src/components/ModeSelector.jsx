import React from 'react';
import { Briefcase, Users, Code, MessageSquare, Mic, BarChart3 } from 'lucide-react';

const modes = [
  {
    id: 'hr',
    title: 'HR Interview',
    description: 'Practice common HR questions like "Tell me about yourself", strengths, weaknesses, and career goals.',
    icon: Briefcase,
    color: '#60a5fa',
    gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
  },
  {
    id: 'behavioral',
    title: 'Behavioral',
    description: 'Practice STAR method responses for situational questions about teamwork, leadership, and challenges.',
    icon: Users,
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, #3b1f5e, #7c3aed)',
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'Explain technical concepts clearly. Practice answering coding, system design, and tech questions.',
    icon: Code,
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, #14532d, #16a34a)',
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    description: 'Practice SQL, statistics, A/B testing, data visualization, KPIs, and Python for data analysis interviews.',
    icon: BarChart3,
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #831843, #db2777)',
  },
  {
    id: 'free',
    title: 'Free Talk',
    description: 'Open conversation practice. Talk about any topic to improve your everyday English fluency.',
    icon: MessageSquare,
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)',
  },
];

export default function ModeSelector({ onSelectMode }) {
  return (
    <div className="mode-selector">
      <div className="mode-header">
        <div className="mode-logo">
          <Mic size={40} />
        </div>
        <h1>English Interview Coach</h1>
        <p className="mode-subtitle">Practice speaking English with AI-powered feedback. Choose a mode to begin.</p>
      </div>

      <div className="mode-grid">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              className="mode-card"
              onClick={() => onSelectMode(mode.id)}
              style={{ background: mode.gradient }}
            >
              <div className="mode-card-icon" style={{ color: mode.color }}>
                <Icon size={32} />
              </div>
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mode-features">
        <div className="feature">
          <span>🎙️</span>
          <span>Voice Recognition</span>
        </div>
        <div className="feature">
          <span>📝</span>
          <span>Grammar Correction</span>
        </div>
        <div className="feature">
          <span>🔊</span>
          <span>Spoken Feedback</span>
        </div>
        <div className="feature">
          <span>📊</span>
          <span>Performance Score</span>
        </div>
      </div>
    </div>
  );
}
