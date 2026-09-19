import React from 'react';
import { AlertCircle, CheckCircle, Info, Volume2 } from 'lucide-react';

export default function GrammarFeedback({ result, onSpeak }) {
  if (!result || !result.corrections || result.corrections.length === 0) {
    return (
      <div className="grammar-feedback grammar-success">
        <CheckCircle size={20} />
        <span>Perfect! No grammar errors found. 🎉</span>
      </div>
    );
  }

  const severityIcon = (severity) => {
    switch (severity) {
      case 'error': return <AlertCircle size={16} className="severity-error" />;
      case 'warning': return <Info size={16} className="severity-warning" />;
      default: return <Info size={16} className="severity-suggestion" />;
    }
  };

  return (
    <div className="grammar-feedback">
      <div className="grammar-header">
        <AlertCircle size={18} />
        <span className="grammar-summary">{result.summary}</span>
      </div>
      
      {result.originalText !== result.correctedText && (
        <div className="grammar-correction-block">
          <div className="correction-row">
            <span className="correction-label">❌ You said:</span>
            <span className="correction-original">{result.originalText}</span>
          </div>
          <div className="correction-row">
            <span className="correction-label">✅ Better:</span>
            <span className="correction-fixed">{result.correctedText}</span>
            {onSpeak && (
              <button className="btn-speak-correction" onClick={() => onSpeak(result.correctedText)} title="Hear the corrected version">
                <Volume2 size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grammar-details">
        {result.corrections.map((c, i) => (
          <div key={i} className={`grammar-item severity-${c.severity}`}>
            {severityIcon(c.severity)}
            <div className="grammar-item-content">
              <span className="grammar-item-message">{c.message}</span>
              {c.replacements.length > 0 && (
                <span className="grammar-item-suggestion">
                  Suggestion: <strong>{c.replacements.join(' / ')}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
