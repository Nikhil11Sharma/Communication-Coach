import { useState, useCallback, useRef, useEffect } from 'react';

export default function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);
  const startTimeRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const shouldBeListeningRef = useRef(false);
  const lastFinalCountRef = useRef(0); // How many final results we've seen in this session
  const interimRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Speech recognition is not supported. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    // On mobile, continuous mode causes issues — use it only on desktop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let interim = '';
      let newFinalCount = 0;
      
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          newFinalCount++;
          // Only append if this is a NEW final result we haven't seen
          if (newFinalCount > lastFinalCountRef.current) {
            const text = event.results[i][0].transcript.trim();
            if (text) {
              // Check for duplicate — sometimes mobile sends the same text twice
              const existing = finalTranscriptRef.current.trim();
              if (!existing.endsWith(text)) {
                finalTranscriptRef.current += ' ' + text;
              }
            }
          }
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      
      lastFinalCountRef.current = newFinalCount;
      
      const trimmed = finalTranscriptRef.current.trim();
      setTranscript(trimmed);
      setInterimTranscript(interim);
      interimRef.current = interim;
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone in browser settings.');
      } else if (event.error === 'network') {
        setError('Network error. Speech recognition needs internet.');
      } else if (event.error === 'audio-capture') {
        setError('No microphone found.');
      } else {
        setError(`Mic error: ${event.error}`);
      }
      setIsListening(false);
      shouldBeListeningRef.current = false;
    };

    recognition.onend = () => {
      if (shouldBeListeningRef.current) {
        // Auto-restart — Chrome stops after ~60s
        // Reset the final count since new session gives fresh results
        lastFinalCountRef.current = 0;
        setTimeout(() => {
          if (shouldBeListeningRef.current && recognitionRef.current) {
            try { recognitionRef.current.start(); } catch (e) { /* ignore */ }
          }
        }, 200);
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldBeListeningRef.current = false;
      try { recognition.abort(); } catch (e) { /* ignore */ }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    lastFinalCountRef.current = 0;
    interimRef.current = '';
    startTimeRef.current = Date.now();
    shouldBeListeningRef.current = true;
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      try {
        recognitionRef.current.abort();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch (e2) {
            setError('Could not start mic. Please refresh.');
          }
        }, 250);
      } catch (e2) {
        setError('Could not start mic. Check permissions.');
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return Promise.resolve({ text: '', durationMs: 0 });
    shouldBeListeningRef.current = false;
    
    // Wait 400ms to capture the last words being processed
    return new Promise((resolve) => {
      setTimeout(() => {
        try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
        
        setIsListening(false);
        const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
        
        // Use accumulated final transcript; fallback to interim if stopped too quickly
        let finalText = finalTranscriptRef.current.trim();
        if (!finalText && interimRef.current) {
          finalText = interimRef.current.trim();
        }
        
        setInterimTranscript('');
        interimRef.current = '';
        resolve({ text: finalText, durationMs: duration });
      }, 400);
    });
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
  };
}
