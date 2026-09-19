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
      let finalText = '';
      
      // Accumulate ALL final results (not just the latest batch)
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      
      // Trim and store accumulated final transcript
      const trimmedFinal = finalText.trim();
      if (trimmedFinal) {
        finalTranscriptRef.current = trimmedFinal;
        setTranscript(trimmedFinal);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      // Ignore harmless errors
      if (event.error === 'no-speech') {
        // No speech detected — auto-restart will handle this
        return;
      }
      if (event.error === 'aborted') return;
      
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone permission in your browser settings.');
      } else if (event.error === 'network') {
        setError('Network error. Speech recognition requires an internet connection in Chrome.');
      } else if (event.error === 'audio-capture') {
        setError('No microphone found. Please connect a microphone and try again.');
      } else {
        console.error('Speech recognition error:', event.error);
        setError(`Microphone error: ${event.error}`);
      }
      setIsListening(false);
      shouldBeListeningRef.current = false;
    };

    recognition.onend = () => {
      // Auto-restart if we're supposed to still be listening
      // This handles Chrome's auto-stop after ~60 seconds of continuous listening
      if (shouldBeListeningRef.current) {
        try {
          // Small delay before restarting to avoid rapid restart loops
          setTimeout(() => {
            if (shouldBeListeningRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                // Already started or other error — ignore
              }
            }
          }, 100);
        } catch (e) {
          // Ignore restart errors
        }
      } else {
        setIsListening(false);
      }
    };

    // Chrome workaround: speech synthesis can interrupt recognition
    // Keep recognition alive when synthesis plays
    recognition.onspeechend = () => {
      // Don't do anything special — let onend handle restart
    };

    recognitionRef.current = recognition;

    return () => {
      shouldBeListeningRef.current = false;
      try {
        recognition.abort();
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    startTimeRef.current = Date.now();
    shouldBeListeningRef.current = true;
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      // Might already be started — try abort + restart
      try {
        recognitionRef.current.abort();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch (e2) {
            setError('Could not start microphone. Please refresh the page and try again.');
          }
        }, 200);
      } catch (e2) {
        setError('Could not start microphone. Please check permissions.');
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return { text: '', durationMs: 0 };
    shouldBeListeningRef.current = false;
    
    try {
      recognitionRef.current.stop();
    } catch (e) {
      // Already stopped
    }
    
    setIsListening(false);
    const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    
    // Use the accumulated final transcript, or fall back to interim if user stopped quickly
    const finalText = finalTranscriptRef.current || interimTranscript || transcript;
    
    // Clear interim
    setInterimTranscript('');
    
    return { text: finalText.trim(), durationMs: duration };
  }, [transcript, interimTranscript]);

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
