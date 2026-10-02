import { useState, useCallback, useRef, useEffect } from 'react';

export default function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1.0); // Increased from 0.9 — faster feedback
  const [pitch, setPitch] = useState(1.0);
  const utteranceRef = useRef(null);
  const resolveRef = useRef(null);
  const keepAliveRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      const englishVoices = available.filter(v => v.lang.startsWith('en'));
      setVoices(englishVoices);
      
      if (!selectedVoice && englishVoices.length > 0) {
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
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };
  }, []);

  const speak = useCallback((text) => {
    return new Promise((resolve) => {
      if (!text) { resolve(); return; }
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (keepAliveRef.current) clearInterval(keepAliveRef.current);
        resolve();
      };
      utterance.onerror = (e) => {
        if (e.error !== 'canceled') console.error('Speech error:', e);
        setIsSpeaking(false);
        if (keepAliveRef.current) clearInterval(keepAliveRef.current);
        resolve();
      };

      utteranceRef.current = utterance;
      resolveRef.current = resolve;
      
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
      
      // Chrome bug: speech stops on long text after ~15s if tab is not focused
      // Workaround: periodically call resume()
      keepAliveRef.current = setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.resume();
        } else {
          clearInterval(keepAliveRef.current);
        }
      }, 5000);
    });
  }, [selectedVoice, rate, pitch]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    if (keepAliveRef.current) clearInterval(keepAliveRef.current);
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
