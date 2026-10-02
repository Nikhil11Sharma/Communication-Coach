import { useState, useCallback, useRef, useEffect } from 'react';

export default function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(0.95);
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
        // Pick the most human-sounding voice available
        // Priority: Natural > Online > Google > Microsoft > Any
        const preferred = 
          englishVoices.find(v => v.name.includes('Natural') && v.name.includes('en-US')) ||
          englishVoices.find(v => v.name.includes('Natural')) ||
          englishVoices.find(v => v.name.includes('Samantha')) || // macOS/iOS natural voice
          englishVoices.find(v => v.name.includes('Karen')) ||    // macOS/iOS
          englishVoices.find(v => v.name.includes('Daniel')) ||   // macOS/iOS male
          englishVoices.find(v => v.name.includes('Google US English')) ||
          englishVoices.find(v => v.name.includes('Google UK English')) ||
          englishVoices.find(v => v.name.includes('Microsoft Aria')) ||   // Windows 11 natural
          englishVoices.find(v => v.name.includes('Microsoft Jenny')) ||  // Windows 11 natural  
          englishVoices.find(v => v.name.includes('Microsoft Guy')) ||    // Windows 11 natural male
          englishVoices.find(v => !v.localService && v.lang === 'en-US') || // Any online US voice
          englishVoices.find(v => !v.localService) ||  // Any online voice
          englishVoices.find(v => v.lang === 'en-US') ||
          englishVoices[0];
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
      
      window.speechSynthesis.cancel();
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      
      // Split long text into sentences for more natural delivery
      // Chrome has a bug where long utterances cut off after ~15 seconds
      const sentences = splitIntoChunks(text);
      
      let currentIndex = 0;
      
      const speakNext = () => {
        if (currentIndex >= sentences.length) {
          setIsSpeaking(false);
          if (keepAliveRef.current) clearInterval(keepAliveRef.current);
          resolve();
          return;
        }
        
        const chunk = sentences[currentIndex];
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.voice = selectedVoice;
        
        // Add slight natural variation to pitch per sentence
        // Real humans don't speak in monotone — pitch varies slightly
        const pitchVariation = 0.97 + Math.random() * 0.06; // 0.97 to 1.03
        utterance.pitch = pitch * pitchVariation;
        
        // Slight rate variation too — humans speed up and slow down
        const rateVariation = 0.98 + Math.random() * 0.04; // 0.98 to 1.02
        utterance.rate = rate * rateVariation;
        utterance.volume = 1;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          currentIndex++;
          if (currentIndex < sentences.length) {
            // Small pause between sentences — like natural speech
            setTimeout(speakNext, 80 + Math.random() * 120); // 80-200ms pause
          } else {
            speakNext(); // Will hit the resolve above
          }
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
      };
      
      speakNext();
      
      // Chrome bug workaround: periodically resume to prevent freezing
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

// Split text into natural sentence chunks
// Each chunk should be short enough to avoid Chrome's cutoff bug
function splitIntoChunks(text) {
  if (text.length < 100) return [text]; // Short text — speak as one
  
  // Split on sentence boundaries
  const parts = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  
  const chunks = [];
  let current = '';
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    
    if ((current + ' ' + trimmed).length > 150) {
      // Current chunk is long enough, push it
      if (current) chunks.push(current.trim());
      current = trimmed;
    } else {
      current = current ? current + ' ' + trimmed : trimmed;
    }
  }
  
  if (current.trim()) chunks.push(current.trim());
  
  return chunks.length > 0 ? chunks : [text];
}
