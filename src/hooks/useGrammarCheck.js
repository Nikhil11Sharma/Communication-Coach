import { useState, useCallback, useRef } from 'react';
import { analyzeGrammar, applyCorrectionToText, generateErrorSummary } from '../utils/grammarAnalyzer.js';

const LANGUAGE_TOOL_URL = 'https://api.languagetool.org/v2/check';

export default function useGrammarCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const checkGrammar = useCallback(async (text) => {
    if (!text || text.trim().length < 3) {
      return { corrections: [], correctedText: text, summary: 'Too short to check.' };
    }

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsChecking(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        text: text,
        language: 'en-US',
        enabledOnly: 'false',
      });

      const response = await fetch(LANGUAGE_TOOL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`LanguageTool API error: ${response.status}`);
      }

      const data = await response.json();
      const corrections = analyzeGrammar(data);
      const correctedText = applyCorrectionToText(text, corrections);
      const summary = generateErrorSummary(corrections);

      const result = { corrections, correctedText, summary, originalText: text };
      setLastResult(result);
      setIsChecking(false);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') return null;
      console.error('Grammar check error:', err);
      setError('Grammar check failed. Will retry on next response.');
      setIsChecking(false);
      return { corrections: [], correctedText: text, summary: 'Could not check grammar.', originalText: text };
    }
  }, []);

  return {
    checkGrammar,
    isChecking,
    lastResult,
    error,
  };
}
