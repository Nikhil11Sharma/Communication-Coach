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
  const interimRef = useRef('');
  const isMobileRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Speech recognition is not supported. Please use Chrome or Edge.');
      return;
    }

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    isMobileRef.current = isMobile;

    const recognition = new SpeechRecognition();
    // KEY FIX: On mobile, DON'T use continuous mode — it causes repeating
    recognition.continuous = !isMobile;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let interim = '';
      
      // Get the latest result only
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          const text = result[0].transcript.trim();
          if (text) {
            // Deduplication: don't add if the exact same text was just added
            const existing = finalTranscriptRef.current.trim();
            const lastSentence = existing.split(/[.!?]\s*/).pop() || '';
            if (text !== lastSentence.trim() && !existing.endsWith(text)) {
              finalTranscriptRef.current = (existing ? existing + ' ' : '') + text;
            }
          }
        } else {
          interim += result[0].transcript;
        }
      }
      
      const trimmed = finalTranscriptRef.current.trim();
      if (trimmed) setTranscript(trimmed);
      setInterimTranscript(interim);
      interimRef.current = interim;
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Allow microphone in browser settings.');
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
        // Auto-restart — on mobile this fires after each phrase
        // On desktop this fires after Chrome's ~60s timeout
        setTimeout(() => {
          if (shouldBeListeningRef.current && recognitionRef.current) {
            try { recognitionRef.current.start(); } catch (e) { /* ignore */ }
          }
        }, 250);
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
        }, 300);
      } catch (e2) {
        setError('Could not start mic. Check permissions.');
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return Promise.resolve({ text: '', durationMs: 0 });
    shouldBeListeningRef.current = false;
    
    return new Promise((resolve) => {
      // Wait to capture the last words being processed
      setTimeout(() => {
        try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
        
        setIsListening(false);
        const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
        
        let finalText = finalTranscriptRef.current.trim();
        if (!finalText && interimRef.current) {
          finalText = interimRef.current.trim();
        }
        
        setInterimTranscript('');
        interimRef.current = '';
        resolve({ text: finalText, durationMs: duration });
      }, 500);
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
