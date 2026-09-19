import React, { useState } from 'react';
import { X, Key, Volume2, Gauge } from 'lucide-react';

export default function Settings({ 
  isOpen, onClose, 
  apiKey, onApiKeyChange,
  voices, selectedVoice, onVoiceChange,
  rate, onRateChange,
  pitch, onPitchChange 
}) {
  const [tempKey, setTempKey] = useState(apiKey || '');
  
  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="settings-section">
          <h3><Key size={16} /> Gemini API Key (Optional)</h3>
          <p className="settings-desc">Add a Google Gemini API key for AI-powered dynamic conversations. Without it, the app uses built-in questions.</p>
          <div className="settings-row">
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="settings-input"
            />
            <button className="btn-save" onClick={() => { onApiKeyChange(tempKey); }}>Save</button>
          </div>
        </div>

        <div className="settings-section">
          <h3><Volume2 size={16} /> Voice</h3>
          <select 
            className="settings-select" 
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              if (voice) onVoiceChange(voice);
            }}
          >
            {voices.map(v => (
              <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
            ))}
          </select>
        </div>

        <div className="settings-section">
          <h3><Gauge size={16} /> Speech Speed: {rate.toFixed(1)}x</h3>
          <input 
            type="range" min="0.5" max="1.5" step="0.1" 
            value={rate} onChange={(e) => onRateChange(parseFloat(e.target.value))} 
            className="settings-slider"
          />
          <div className="slider-labels"><span>Slow</span><span>Normal</span><span>Fast</span></div>
        </div>

        <div className="settings-section">
          <h3>🎵 Pitch: {pitch.toFixed(1)}</h3>
          <input 
            type="range" min="0.5" max="1.5" step="0.1" 
            value={pitch} onChange={(e) => onPitchChange(parseFloat(e.target.value))} 
            className="settings-slider"
          />
          <div className="slider-labels"><span>Low</span><span>Normal</span><span>High</span></div>
        </div>

        <div className="settings-footer">
          <p>💡 Tip: Works best in Google Chrome or Microsoft Edge</p>
        </div>
      </div>
    </div>
  );
}
