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
      let final = '';
      
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      
      if (final) {
        finalTranscriptRef.current = final;
        setTranscript(final);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') return; // Ignore no-speech errors
      if (event.error === 'aborted') return;
      console.error('Speech recognition error:', event.error);
      setError(`Microphone error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      // If we're supposed to be listening, restart (handles auto-stop)
      if (recognitionRef.current?._shouldBeListening) {
        try {
          recognition.start();
        } catch (e) {
          // Already started
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    startTimeRef.current = Date.now();
    recognitionRef.current._shouldBeListening = true;
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      // Might already be started
      if (e.message?.includes('already started')) {
        setIsListening(true);
      } else {
        setError('Could not start microphone. Please check permissions.');
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return { text: '', durationMs: 0 };
    recognitionRef.current._shouldBeListening = false;
    
    try {
      recognitionRef.current.stop();
    } catch (e) {
      // Already stopped
    }
    
    setIsListening(false);
    const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    const finalText = finalTranscriptRef.current || transcript;
    
    return { text: finalText, durationMs: duration };
  }, [transcript]);

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
