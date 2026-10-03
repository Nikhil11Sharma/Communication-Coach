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

const MODE_NAMES = { hr: 'HR Interview', behavioral: 'Behavioral Interview', technical: 'Technical Interview', analytics: 'Data Analytics Interview', python: 'Python Developer Interview', java: 'Java Developer Interview', pharmacy: 'Pharmacy Interview', mechanical: 'Mechanical Engineering Interview', techsupport: 'Technical Support Interview', marketing: 'Digital Marketing Interview', finance: 'Finance & Accounting Interview', free: 'Free Conversation' };

// Analyze answer quality by comparing to expected answer keywords
function analyzeAnswerContent(userAnswer, question) {
  const lower = userAnswer.toLowerCase();
  const words = lower.split(/\s+/);
  const wordCount = words.length;
  
  // Check answer length
  const isTooShort = wordCount < 8;
  const isGoodLength = wordCount >= 15;
  
  // Extract key topics from sampleAnswer or tip
  const reference = (question.sampleAnswer || question.tip || '').toLowerCase();
  const refWords = reference.split(/\s+/).filter(w => w.length > 4);
  const uniqueRefWords = [...new Set(refWords)];
  
  // Find which key concepts the user mentioned
  const mentionedTopics = [];
  const missedTopics = [];
  
  // Extract important phrases from the reference
  const importantWords = uniqueRefWords.filter(w => 
    !['about', 'would', 'could', 'should', 'their', 'there', 'these', 'those', 'which', 'where', 'while', 'being', 'having', 'other', 'after', 'before', 'between', 'through', 'because', 'every', 'still', 'might'].includes(w)
  ).slice(0, 15);
  
  for (const word of importantWords) {
    if (lower.includes(word)) {
      mentionedTopics.push(word);
    } else {
      missedTopics.push(word);
    }
  }
  
  const coveragePercent = importantWords.length > 0 
    ? Math.round((mentionedTopics.length / importantWords.length) * 100) 
    : 50;
  
  // Build feedback
  let rating = '';
  let feedback = '';
  
  if (isTooShort) {
    rating = '⚠️ Too Brief';
    feedback = 'Your answer is too short. In interviews, aim for 30-60 seconds of speaking. Add specific examples and details.';
  } else if (coveragePercent >= 60) {
    rating = '✅ Good Answer';
    feedback = 'Nice! You covered the key points well.';
  } else if (coveragePercent >= 30) {
    rating = '🔶 Decent Attempt';
    feedback = 'You touched on some points but missed important concepts.';
  } else {
    rating = '🔸 Needs Improvement';
    feedback = 'Your answer missed most of the key points. Study the better answer below.';
  }
  
  return { rating, feedback, coveragePercent, isTooShort, wordCount, missedTopics: missedTopics.slice(0, 5) };
}

// Check if user is asking a question or making a request (not answering)
function isUserAskingForHelp(text) {
  const lower = text.toLowerCase().trim();
  const helpPhrases = [
    "i don't know", "i dont know", "i do not know", "no idea", 
    "not sure", "i'm not sure", "im not sure", "skip", "pass",
    "next question", "can't answer", "cant answer",
    "tell me the answer", "what is the answer", "give me the answer",
    "give me answer", "give me a better answer", "give me better answer",
    "better answer", "can you answer", "answer this for me",
    "what should i say", "how to answer", "how should i answer",
    "how do i answer", "how would you answer",
    "help me", "i need help", "please help",
    "tell me", "can you tell me", "give me some answer",
    "give me some better answer", "can you give me",
    "what's the answer", "whats the answer",
    "don't know", "dont know", "no clue", "i have no idea",
    "suggestion", "suggest me", "give me suggestion",
    "what is the correct", "correct answer"
  ];
  return helpPhrases.some(phrase => lower.includes(phrase));
}

// Check if user is talking to the AI (not answering the interview question)
function isUserTalkingToAI(text) {
  const lower = text.toLowerCase().trim();
  const conversationalPhrases = [
    "why did you", "why are you", "what are you", "you are",
    "this app", "this is not", "that's wrong", "thats wrong",
    "not working", "doesn't work", "change", "improve",
    "grammar", "correction", "you said", "you just",
    "what do you mean", "explain", "why is that",
    "i was asking", "i asked", "i said",
    "nothing changed", "no change", "same thing",
    "repeat", "repeating", "again"
  ];
  return conversationalPhrases.some(phrase => lower.includes(phrase));
}

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
  const [betterAnswer, setBetterAnswer] = useState(null);
  
  const recognition = useSpeechRecognition();
  const synthesis = useSpeechSynthesis();
  const grammar = useGrammarCheck();
  const trackerRef = useRef(createFluencyTracker());
  const chatEndRef = useRef(null);
  const questionListRef = useRef([...questions[mode]].sort(() => Math.random() - 0.5));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, grammarResult, betterAnswer]);

  useEffect(() => {
    if (apiKey) localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);

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
      questionListRef.current = [...questions[mode]].sort(() => Math.random() - 0.5);
      index = 0;
    }
    
    const q = questionListRef.current[index];
    setCurrentQuestion(q);
    setQuestionIndex(index);
    setShowTip(false);
    
    addMessage('ai', q.question);
    await synthesis.speak(q.question);
  }, [mode, synthesis, addMessage]);

  const handleStartListening = useCallback(async () => {
    if (synthesis.isSpeaking) synthesis.stop();
    setGrammarResult(null);
    setBetterAnswer(null);
    await new Promise(r => setTimeout(r, 500));
    recognition.startListening();
  }, [recognition, synthesis]);

  const handleStopListening = useCallback(async () => {
    const { text, durationMs } = await recognition.stopListening();
    
    if (!text || text.trim().length < 2) {
      addMessage('system', "I couldn't hear you clearly. Please try again.");
      return;
    }

    setIsProcessing(true);
    addMessage('user', text);
    const lowerText = text.toLowerCase().trim();

    // ============================================
    // CASE 1: User is asking for help / wants the answer
    // ============================================
    if (isUserAskingForHelp(lowerText) && currentQuestion) {
      if (currentQuestion.sampleAnswer) {
        addMessage('ai', `Sure! Here's a strong answer for this question:\n\n"${currentQuestion.sampleAnswer}"\n\n💡 Tip: ${currentQuestion.tip}`);
        await synthesis.speak(`Sure! Here's a strong answer. ${currentQuestion.sampleAnswer}`);
      } else {
        addMessage('ai', `Here's how to approach this:\n\n💡 ${currentQuestion.tip}\n\n📝 Use the STAR method: describe the Situation, your Task, the Action you took, and the Result.`);
        await synthesis.speak(`Here's how to approach this. ${currentQuestion.tip}`);
      }
      
      trackerRef.current.addResponse(text, 0, durationMs);
      await new Promise(r => setTimeout(r, 500));
      await askQuestion(questionIndex + 1);
      setIsProcessing(false);
      return;
    }

    // ============================================
    // CASE 2: User is talking TO the AI (not answering)
    // ============================================
    if (isUserTalkingToAI(lowerText) && currentQuestion) {
      addMessage('ai', `I understand your concern! Let me help you with the current question.\n\n📋 Question: "${currentQuestion.question}"\n\n💡 Tip: ${currentQuestion.tip}\n\n${currentQuestion.sampleAnswer ? `✅ A good answer would be:\n"${currentQuestion.sampleAnswer}"` : 'Try using specific examples from your experience.'}`);
      await synthesis.speak(`I understand. Let me help you with this question. ${currentQuestion.tip}`);
      
      trackerRef.current.addResponse(text, 0, durationMs);
      setIsProcessing(false);
      return; // Don't move to next question — let them try again
    }

    // ============================================
    // CASE 3: User gave a real answer — give full feedback
    // ============================================
    
    // Step 1: Grammar check (run in background, show briefly)
    const grammarPromise = grammar.checkGrammar(text);
    
    // Step 2: Content analysis — how good is the answer?
    const contentAnalysis = analyzeAnswerContent(text, currentQuestion);
    
    // Wait for grammar
    const result = await grammarPromise;
    if (result) {
      setGrammarResult(result);
      trackerRef.current.addResponse(text, result.corrections.length, durationMs);
    } else {
      trackerRef.current.addResponse(text, 0, durationMs);
    }
    
    // Step 3: Build comprehensive feedback message
    let feedbackParts = [];
    
    // Answer quality rating
    feedbackParts.push(`${contentAnalysis.rating} (${contentAnalysis.wordCount} words)`);
    feedbackParts.push(contentAnalysis.feedback);
    
    // Grammar feedback (only mention if there are actual errors)
    if (result && result.corrections.length > 0 && result.correctedText !== result.originalText) {
      feedbackParts.push(`\n📝 Grammar: ${result.corrections.length} correction${result.corrections.length > 1 ? 's' : ''} found. Check the correction box above.`);
    } else {
      feedbackParts.push(`\n📝 Grammar: ✅ No errors!`);
    }
    
    // What was missing
    if (contentAnalysis.missedTopics.length > 0 && !contentAnalysis.isTooShort) {
      feedbackParts.push(`\n🔑 You could also mention: ${contentAnalysis.missedTopics.join(', ')}`);
    }
    
    // Better answer
    if (currentQuestion?.sampleAnswer) {
      feedbackParts.push(`\n\n✅ A stronger answer:\n"${currentQuestion.sampleAnswer}"`);
    } else if (currentQuestion?.tip) {
      feedbackParts.push(`\n\n💡 To improve: ${currentQuestion.tip}`);
      if (currentQuestion.followUp) {
        feedbackParts.push(`\n🔄 Also think about: "${currentQuestion.followUp}"`);
      }
    }
    
    const fullFeedback = feedbackParts.join('\n');
    setBetterAnswer(fullFeedback);
    addMessage('ai', fullFeedback);
    
    // Short spoken summary — don't read everything
    if (contentAnalysis.isTooShort) {
      await synthesis.speak('Your answer was too short. Try to speak for at least 30 seconds with specific examples. Check the better answer on screen.');
    } else if (contentAnalysis.coveragePercent >= 60) {
      await synthesis.speak('Good answer! You covered the key points. Check screen for a model answer to compare.');
    } else {
      await synthesis.speak(`${contentAnalysis.feedback} Check the screen for a stronger answer and tips.`);
    }

    // AI follow-up if API key is set
    if (apiKey) {
      const aiResponse = await getAIResponse(apiKey, messages.filter(m => m.role !== 'system'), text, mode);
      if (aiResponse) {
        addMessage('ai', aiResponse);
        await synthesis.speak(aiResponse);
        setIsProcessing(false);
        return;
      }
    }

    // Move to next question — feedback stays on screen until user taps mic
    await new Promise(r => setTimeout(r, 500));
    await askQuestion(questionIndex + 1);
    
    setIsProcessing(false);
  }, [recognition, grammar, synthesis, apiKey, messages, mode, currentQuestion, questionIndex, addMessage, askQuestion]);

  const handleSkipQuestion = useCallback(async () => {
    if (synthesis.isSpeaking) synthesis.stop();
    if (recognition.isListening) recognition.stopListening();
    setGrammarResult(null);
    setBetterAnswer(null);
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
    setGrammarResult(null);
    setBetterAnswer(null);
    setQuestionIndex(0);
    questionListRef.current = [...questions[mode]].sort(() => Math.random() - 0.5);
    setTimeout(() => askQuestion(0), 500);
  }, [mode, askQuestion]);

  return (
    <div className="coach-container">
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

      <div className="chat-area">
        {messages.map((msg) => (
          <SpeechBubble key={msg.id} message={msg} />
        ))}
        
        {recognition.isListening && (
          <div className="bubble-row bubble-row-user">
            <div className="bubble-avatar avatar-user">👤</div>
            <div className="bubble bubble-user bubble-live">
              <div className="bubble-text">
                {recognition.transcript}
                <span className="interim-text"> {recognition.interimTranscript}</span>
              </div>
              <div className="live-indicator">● Listening...</div>
            </div>
          </div>
        )}

        {grammarResult && (
          <GrammarFeedback result={grammarResult} onSpeak={(text) => synthesis.speak(text)} />
        )}

        {isProcessing && (
          <div className="processing-indicator">
            <Loader size={16} className="spinner" />
            <span>Analyzing your answer...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {currentQuestion?.tip && showTip && (
        <div className="tip-bar">
          <Lightbulb size={16} />
          <span>{currentQuestion.tip}</span>
          <button className="btn-icon-small" onClick={() => setShowTip(false)}>✕</button>
        </div>
      )}

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

      {recognition.error && (
        <div className="error-toast">{recognition.error}</div>
      )}

      {showScore && <ScoreBoard stats={sessionStats} onClose={handleCloseScore} />}

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
