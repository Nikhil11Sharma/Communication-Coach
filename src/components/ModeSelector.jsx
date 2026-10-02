import React, { useState } from 'react';
import { Briefcase, Users, Code, MessageSquare, Mic, BarChart3, ChevronDown, ChevronUp, Terminal, Coffee, FlaskConical, Wrench, Headphones, Megaphone, DollarSign } from 'lucide-react';

const mainModes = [
  {
    id: 'hr',
    title: 'HR Interview',
    description: 'Tell me about yourself, strengths, weaknesses, salary, and career goals.',
    icon: Briefcase,
    color: '#60a5fa',
    gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
  },
  {
    id: 'behavioral',
    title: 'Behavioral',
    description: 'STAR method questions about teamwork, leadership, and challenges.',
    icon: Users,
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, #3b1f5e, #7c3aed)',
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'Coding concepts, system design, and technical problem-solving.',
    icon: Code,
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, #14532d, #16a34a)',
  },
  {
    id: 'free',
    title: 'Free Talk',
    description: 'Open conversation to improve your everyday English fluency.',
    icon: MessageSquare,
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)',
  },
];

const moreModes = [
  {
    id: 'analytics',
    title: 'Data Analytics',
    description: 'SQL, Python/Pandas, Excel, Power BI, and data visualization.',
    icon: BarChart3,
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #831843, #db2777)',
  },
  {
    id: 'python',
    title: 'Python Developer',
    description: 'Python OOP, decorators, generators, data structures, and frameworks.',
    icon: Terminal,
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #064e3b, #059669)',
  },
  {
    id: 'java',
    title: 'Java Developer',
    description: 'Java OOP, collections, multithreading, SOLID principles, and streams.',
    icon: Coffee,
    color: '#fb923c',
    gradient: 'linear-gradient(135deg, #7c2d12, #ea580c)',
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    description: 'Pharmacology, drug interactions, patient care, and prescriptions.',
    icon: FlaskConical,
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
  },
  {
    id: 'mechanical',
    title: 'Mechanical Engg.',
    description: 'Thermodynamics, manufacturing, CAD/CAM, and material science.',
    icon: Wrench,
    color: '#94a3b8',
    gradient: 'linear-gradient(135deg, #1e293b, #475569)',
  },
  {
    id: 'techsupport',
    title: 'Technical Support',
    description: 'Troubleshooting, networking, OS, Active Directory, and customer handling.',
    icon: Headphones,
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0c4a6e, #0284c7)',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'SEO, Google Ads, social media, content marketing, and analytics.',
    icon: Megaphone,
    color: '#fb7185',
    gradient: 'linear-gradient(135deg, #881337, #e11d48)',
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    description: 'Financial statements, budgeting, ROI, depreciation, and forecasting.',
    icon: DollarSign,
    color: '#a3e635',
    gradient: 'linear-gradient(135deg, #365314, #65a30d)',
  },
];

export default function ModeSelector({ onSelectMode }) {
  const [showMore, setShowMore] = useState(false);

  const renderCard = (mode) => {
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
  };

  return (
    <div className="mode-selector">
      <div className="mode-header">
        <div className="mode-logo">
          <Mic size={40} />
        </div>
        <h1>SpeakReady</h1>
        <p className="mode-subtitle">AI-Powered Interview & Communication Coach. Practice speaking with real-time feedback.</p>
      </div>

      <div className="mode-grid">
        {mainModes.map(renderCard)}
      </div>

      <button 
        className="more-interviews-toggle" 
        onClick={() => setShowMore(!showMore)}
      >
        <span>More Interviews</span>
        {showMore ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {showMore && (
        <div className="mode-grid mode-grid-more">
          {moreModes.map(renderCard)}
        </div>
      )}

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
