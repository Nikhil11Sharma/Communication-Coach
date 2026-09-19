import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Square, ArrowLeft, Settings as SettingsIcon, BarChart3, SkipForward, Volume2, Loader, Lightbulb } from 'lucide-react';
import useSpeechRecognition from '../hooks/useSpeechRecognition.js';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis.js';
import useGrammarCheck from '../hooks/useGrammarCheck.js';
import { createFluencyTracker } from '../utils/fluencyTracker.js';
import { getAIResponse } from '../utils/geminiApi.js';
import questions from '../data/questions.js';
import SpeechBubble from './SpeechBubble.jsx';
import GrammarFeedback from './GrammarFeedback.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import Settings from './Settings.jsx';

const MODE_NAMES = { hr: 'HR Interview', behavioral: 'Behavioral Interview', technical: 'Technical Interview', analytics: 'Data Analytics Interview', free: 'Free Conversation' };

export default function InterviewCoach({ mode, onBack }) {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [grammarResult, setGrammarResult] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionStats, setSessionStats] = useState(null);
  
  const recognition = useSpeechRecognition();
  const synthesis = useSpeechSynthesis();
  const grammar = useGrammarCheck();
  const trackerRef = useRef(createFluencyTracker());
  const chatEndRef = useRef(null);
  const questionListRef = useRef([...questions[mode]].sort(() => Math.random() - 0.5));

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, grammarResult]);

  // Save API key
  useEffect(() => {
    if (apiKey) localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);

  // Start the first question
  useEffect(() => {
    const timer = setTimeout(() => askQuestion(0), 500);
    return () => clearTimeout(timer);
  }, []);

  const addMessage = useCallback((role, text) => {
    const msg = { role, text, timestamp: Date.now(), id: Date.now() + Math.random() };
    setMessages(prev => [...prev, msg]);
    return msg;
  }, []);

  const askQuestion = useCallback(async (index) => {
    const questionList = questionListRef.current;
    if (index >= questionList.length) {
      // Wrap around
      questionListRef.current = [...questions[mode]].sort(() => Math.random() - 0.5);
      index = 0;
    }
    
    const q = questionListRef.current[index];
    setCurrentQuestion(q);
    setQuestionIndex(index);
    setGrammarResult(null);
    setShowTip(false);
    
    addMessage('ai', q.question);
    await synthesis.speak(q.question);
  }, [mode, synthesis, addMessage]);

  const handleStartListening = useCallback(() => {
    if (synthesis.isSpeaking) synthesis.stop();
    setGrammarResult(null);
    recognition.startListening();
  }, [recognition, synthesis]);

  const handleStopListening = useCallback(async () => {
    const { text, durationMs } = recognition.stopListening();
    
    if (!text || text.trim().length < 2) {
      addMessage('system', "I couldn't hear you clearly. Please try again.");
      return;
    }

    setIsProcessing(true);
    addMessage('user', text);

    // Check if user said "I don't know" or similar phrases
    const dontKnowPhrases = [
      "i don't know", "i dont know", "i do not know", "no idea", 
      "not sure", "i'm not sure", "im not sure", "i am not sure",
      "skip", "pass", "next question", "can't answer", "cant answer",
      "don't know", "dont know", "no clue", "i have no idea",
      "tell me the answer", "what is the answer", "give me the answer",
      "help me", "i need help"
    ];
    
    const lowerText = text.toLowerCase().trim();
    const userDontKnow = dontKnowPhrases.some(phrase => lowerText.includes(phrase));

    if (userDontKnow && currentQuestion) {
      // Provide the sample answer
      if (currentQuestion.sampleAnswer) {
        const helpMessage = `No worries! Here's a good answer you can learn:\n\n${currentQuestion.sampleAnswer}`;
        addMessage('ai', helpMessage);
        await synthesis.speak(`No worries! Here's a good answer you can learn. ${currentQuestion.sampleAnswer}`);
      } else {
        const tipMessage = `Here's a tip to help you: ${currentQuestion.tip}`;
        addMessage('ai', tipMessage);
        await synthesis.speak(tipMessage);
      }
      
      trackerRef.current.addResponse(text, 0, durationMs);
      
      // Move to next question after showing the answer
      await new Promise(r => setTimeout(r, 1500));
      addMessage('system', "Let's try the next question. Listen carefully!");
      await askQuestion(questionIndex + 1);
      setIsProcessing(false);
      return;
    }

    // Grammar check
    const result = await grammar.checkGrammar(text);
    if (result) {
      setGrammarResult(result);
      trackerRef.current.addResponse(text, result.corrections.length, durationMs);

      // Speak grammar feedback
      if (result.corrections.length > 0 && result.correctedText !== result.originalText) {
        await synthesis.speak(`I noticed some improvements. The better way to say it is: ${result.correctedText}`);
      } else {
        await synthesis.speak('Great job! Your grammar was perfect.');
      }
    } else {
      trackerRef.current.addResponse(text, 0, durationMs);
    }

    // AI follow-up or next question
    if (apiKey) {
      const aiResponse = await getAIResponse(apiKey, messages.filter(m => m.role !== 'system'), text, mode);
      if (aiResponse) {
        addMessage('ai', aiResponse);
        await synthesis.speak(aiResponse);
        setIsProcessing(false);
        return;
      }
    }

    // Use built-in follow-up
    if (currentQuestion?.followUp && Math.random() > 0.4) {
      await new Promise(r => setTimeout(r, 800));
      addMessage('ai', currentQuestion.followUp);
      await synthesis.speak(currentQuestion.followUp);
    } else {
      await new Promise(r => setTimeout(r, 1000));
      await askQuestion(questionIndex + 1);
    }
    
    setIsProcessing(false);
  }, [recognition, grammar, synthesis, apiKey, messages, mode, currentQuestion, questionIndex, addMessage, askQuestion]);

  const handleSkipQuestion = useCallback(async () => {
    if (synthesis.isSpeaking) synthesis.stop();
    if (recognition.isListening) recognition.stopListening();
    setGrammarResult(null);
    await askQuestion(questionIndex + 1);
  }, [synthesis, recognition, questionIndex, askQuestion]);

  const handleEndSession = useCallback(() => {
    if (synthesis.isSpeaking) synthesis.stop();
    if (recognition.isListening) recognition.stopListening();
    const stats = trackerRef.current.getSessionStats();
    setSessionStats(stats);
    setShowScore(true);
  }, [synthesis, recognition]);

  const handleCloseScore = useCallback(() => {
    setShowScore(false);
    trackerRef.current.reset();
    setMessages([]);
    setQuestionIndex(0);
    questionListRef.current = [...questions[mode]].sort(() => Math.random() - 0.5);
    setTimeout(() => askQuestion(0), 500);
  }, [mode, askQuestion]);

  return (
    <div className="coach-container">
      {/* Header */}
      <div className="coach-header">
        <button className="btn-icon" onClick={onBack} title="Back to modes">
          <ArrowLeft size={20} />
        </button>
        <div className="header-title">
          <h2>{MODE_NAMES[mode]}</h2>
          <span className="header-question-count">Question {questionIndex + 1}</span>
        </div>
        <div className="header-actions">
          <button className="btn-icon" onClick={() => setShowSettings(true)} title="Settings">
            <SettingsIcon size={20} />
          </button>
          <button className="btn-icon" onClick={handleEndSession} title="End session & see score">
            <BarChart3 size={20} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {messages.map((msg) => (
          <SpeechBubble key={msg.id} message={msg} />
        ))}
        
        {/* Live transcript */}
        {recognition.isListening && (recognition.transcript || recognition.interimTranscript) && (
          <div className="bubble-row bubble-row-user">
            <div className="bubble-avatar avatar-user">👤</div>
            <div className="bubble bubble-user bubble-live">
              <div className="bubble-text">
                {recognition.transcript}
                <span className="interim-text">{recognition.interimTranscript}</span>
              </div>
              <div className="live-indicator">● Listening...</div>
            </div>
          </div>
        )}

        {/* Grammar Feedback */}
        {grammarResult && (
          <GrammarFeedback result={grammarResult} onSpeak={(text) => synthesis.speak(text)} />
        )}

        {/* Processing indicator */}
        {isProcessing && (
          <div className="processing-indicator">
            <Loader size={16} className="spinner" />
            <span>Processing your response...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Tip Bar */}
      {currentQuestion?.tip && showTip && (
        <div className="tip-bar">
          <Lightbulb size={16} />
          <span>{currentQuestion.tip}</span>
          <button className="btn-icon-small" onClick={() => setShowTip(false)}>✕</button>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="controls-bar">
        <button className="btn-secondary" onClick={handleSkipQuestion} disabled={isProcessing || recognition.isListening}>
          <SkipForward size={16} />
          <span>Skip</span>
        </button>

        {!recognition.isListening ? (
          <button 
            className={`btn-mic ${isProcessing ? 'btn-disabled' : ''}`}
            onClick={handleStartListening}
            disabled={isProcessing || synthesis.isSpeaking}
          >
            <Mic size={28} />
            <span className="mic-label">{synthesis.isSpeaking ? 'Speaking...' : 'Tap to Answer'}</span>
          </button>
        ) : (
          <button className="btn-mic btn-mic-active" onClick={handleStopListening}>
            <MicOff size={28} />
            <span className="mic-label">Tap to Stop</span>
          </button>
        )}

        <button className="btn-secondary" onClick={() => setShowTip(!showTip)} disabled={!currentQuestion?.tip}>
          <Lightbulb size={16} />
          <span>Tip</span>
        </button>
      </div>

      {/* Recognition Error */}
      {recognition.error && (
        <div className="error-toast">{recognition.error}</div>
      )}

      {/* Score Board */}
      {showScore && <ScoreBoard stats={sessionStats} onClose={handleCloseScore} />}

      {/* Settings */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        voices={synthesis.voices}
        selectedVoice={synthesis.selectedVoice}
        onVoiceChange={synthesis.setSelectedVoice}
        rate={synthesis.rate}
        onRateChange={synthesis.setRate}
        pitch={synthesis.pitch}
        onPitchChange={synthesis.setPitch}
      />
    </div>
  );
}
