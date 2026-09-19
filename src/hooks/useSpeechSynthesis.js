import { useState, useCallback, useRef, useEffect } from 'react';

export default function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.0);
  const utteranceRef = useRef(null);
  const resolveRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      const englishVoices = available.filter(v => v.lang.startsWith('en'));
      setVoices(englishVoices);
      
      if (!selectedVoice && englishVoices.length > 0) {
        // Prefer natural/premium voices
        const preferred = englishVoices.find(v => 
          v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha')
        ) || englishVoices.find(v => !v.localService) || englishVoices[0];
        setSelectedVoice(preferred);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text) => {
    return new Promise((resolve) => {
      if (!text) { resolve(); return; }
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = (e) => {
        if (e.error !== 'canceled') console.error('Speech error:', e);
        setIsSpeaking(false);
        resolve();
      };

      utteranceRef.current = utterance;
      resolveRef.current = resolve;
      
      // Chrome bug workaround: resume if paused
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    });
  }, [selectedVoice, rate, pitch]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
  };
}
