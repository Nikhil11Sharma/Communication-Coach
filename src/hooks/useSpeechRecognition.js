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
  const processedUpToRef = useRef(0); // Track which results we already processed

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let interim = '';
      
      // Only process NEW final results (avoid re-reading old ones that cause repeating)
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          if (i >= processedUpToRef.current) {
            // New final result — append to our accumulated text
            finalTranscriptRef.current += result[0].transcript + ' ';
            processedUpToRef.current = i + 1;
          }
          // Already processed — skip
        } else {
          interim += result[0].transcript;
        }
      }
      
      const trimmed = finalTranscriptRef.current.trim();
      setTranscript(trimmed);
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone in browser settings.');
      } else if (event.error === 'network') {
        setError('Network error. Speech recognition needs internet in Chrome.');
      } else if (event.error === 'audio-capture') {
        setError('No microphone found. Please connect a microphone.');
      } else {
        setError(`Microphone error: ${event.error}`);
      }
      setIsListening(false);
      shouldBeListeningRef.current = false;
    };

    recognition.onend = () => {
      if (shouldBeListeningRef.current) {
        // Auto-restart (Chrome stops after ~60s)
        // Reset the processed counter since Chrome gives fresh results on restart
        processedUpToRef.current = 0;
        setTimeout(() => {
          if (shouldBeListeningRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) { /* ignore */ }
          }
        }, 150);
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
    processedUpToRef.current = 0;
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
            setError('Could not start microphone. Please refresh and try again.');
          }
        }, 200);
      } catch (e2) {
        setError('Could not start microphone. Check permissions.');
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return Promise.resolve({ text: '', durationMs: 0 });
    shouldBeListeningRef.current = false;
    
    // Give a tiny delay to capture the last bit of speech before stopping
    return new Promise((resolve) => {
      setTimeout(() => {
        try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
        
        setIsListening(false);
        const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
        
        // Use final transcript, fallback to interim if user stopped too quickly
        let finalText = finalTranscriptRef.current.trim();
        if (!finalText) {
          // Grab whatever interim we had
          finalText = interimTranscriptRef.current || '';
        }
        
        setInterimTranscript('');
        resolve({ text: finalText.trim(), durationMs: duration });
      }, 300); // 300ms delay to capture last words
    });
  }, []);

  // Keep a ref to interimTranscript for the stop fallback
  const interimTranscriptRef = useRef('');
  useEffect(() => {
    interimTranscriptRef.current = interimTranscript;
  }, [interimTranscript]);

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
