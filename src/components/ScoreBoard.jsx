import React from 'react';
import { TrendingUp, Clock, MessageCircle, AlertTriangle, Award, BarChart3 } from 'lucide-react';

function CircularProgress({ value, label, color }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="circular-progress">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#2a2a3e" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="50" y="45" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">{value}</text>
        <text x="50" y="62" textAnchor="middle" fill="#8888aa" fontSize="10">{label}</text>
      </svg>
    </div>
  );
}

export default function ScoreBoard({ stats, onClose }) {
  if (!stats) return null;

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="scoreboard-overlay">
      <div className="scoreboard">
        <div className="scoreboard-header">
          <Award size={28} />
          <h2>Session Summary</h2>
        </div>

        <div className="score-circles">
          <CircularProgress 
            value={stats.overallScore} 
            label="Overall" 
            color={stats.overallScore >= 70 ? '#4ade80' : stats.overallScore >= 40 ? '#fbbf24' : '#f87171'} 
          />
          <CircularProgress value={stats.fluencyScore} label="Fluency" color="#60a5fa" />
          <CircularProgress value={stats.grammarScore} label="Grammar" color="#c084fc" />
        </div>

        <div className="score-stats">
          <div className="stat-item">
            <MessageCircle size={18} />
            <span>Responses: <strong>{stats.totalResponses}</strong></span>
          </div>
          <div className="stat-item">
            <BarChart3 size={18} />
            <span>Words spoken: <strong>{stats.totalWords}</strong></span>
          </div>
          <div className="stat-item">
            <TrendingUp size={18} />
            <span>Avg. speed: <strong>{stats.averageWpm} WPM</strong></span>
          </div>
          <div className="stat-item">
            <AlertTriangle size={18} />
            <span>Filler words: <strong>{stats.totalFillerWords}</strong></span>
          </div>
          <div className="stat-item">
            <AlertTriangle size={18} />
            <span>Grammar errors: <strong>{stats.totalErrors}</strong></span>
          </div>
          <div className="stat-item">
            <Clock size={18} />
            <span>Duration: <strong>{formatDuration(stats.sessionDuration)}</strong></span>
          </div>
        </div>

        {stats.commonFillerWords.length > 0 && (
          <div className="filler-section">
            <h3>Most used filler words:</h3>
            <div className="filler-tags">
              {stats.commonFillerWords.map((f, i) => (
                <span key={i} className="filler-tag">"{f.word}" × {f.count}</span>
              ))}
            </div>
          </div>
        )}

        <div className="score-tips">
          <h3>💡 Tips to improve:</h3>
          <ul>
            {stats.fluencyScore < 70 && <li>Try to reduce filler words like "um", "uh", "like". Pause silently instead.</li>}
            {stats.grammarScore < 70 && <li>Review the grammar corrections from this session and practice those patterns.</li>}
            {stats.averageWpm > 160 && <li>You're speaking quite fast. Try to slow down for better clarity.</li>}
            {stats.averageWpm < 80 && stats.averageWpm > 0 && <li>Try to speak a bit more fluently. Practice reading aloud to improve pace.</li>}
            {stats.overallScore >= 70 && <li>Great performance! Keep practicing to maintain and improve your skills.</li>}
          </ul>
        </div>

        <button className="btn-close-score" onClick={onClose}>Continue Practicing</button>
      </div>
    </div>
  );
}
