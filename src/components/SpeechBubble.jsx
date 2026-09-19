import React from 'react';

export default function SpeechBubble({ message }) {
  const isAI = message.role === 'ai';
  const isSystem = message.role === 'system';
  
  if (isSystem) {
    return (
      <div className="bubble-system">
        <span>{message.text}</span>
      </div>
    );
  }

  return (
    <div className={`bubble-row ${isAI ? 'bubble-row-ai' : 'bubble-row-user'}`}>
      <div className={`bubble-avatar ${isAI ? 'avatar-ai' : 'avatar-user'}`}>
        {isAI ? '🤖' : '👤'}
      </div>
      <div className={`bubble ${isAI ? 'bubble-ai' : 'bubble-user'}`}>
        <div className="bubble-text">{message.text}</div>
        {message.timestamp && (
          <div className="bubble-time">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
}
