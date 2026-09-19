import React, { useState } from 'react';
import ModeSelector from './components/ModeSelector.jsx';
import InterviewCoach from './components/InterviewCoach.jsx';

export default function App() {
  const [selectedMode, setSelectedMode] = useState(null);

  if (!selectedMode) {
    return <ModeSelector onSelectMode={setSelectedMode} />;
  }

  return (
    <InterviewCoach 
      key={selectedMode} 
      mode={selectedMode} 
      onBack={() => setSelectedMode(null)} 
    />
  );
}
