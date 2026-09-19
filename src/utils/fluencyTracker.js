const FILLER_WORDS = ['um', 'uh', 'er', 'ah', 'like', 'you know', 'basically', 'actually', 'literally', 'right', 'so', 'well', 'hmm', 'okay so', 'i mean'];

export function createFluencyTracker() {
  const sessionData = {
    responses: [],
    startTime: Date.now(),
    totalWords: 0,
    totalFillerWords: 0,
    totalErrors: 0,
    totalResponses: 0,
  };

  return {
    addResponse(text, errorCount = 0, durationMs = 0) {
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      const wordCount = words.length;
      const fillerCount = countFillerWords(text);
      const wpm = durationMs > 0 ? Math.round((wordCount / durationMs) * 60000) : 0;
      const uniqueWords = new Set(words.map(w => w.toLowerCase()));
      const vocabularyDiversity = wordCount > 0 ? Math.round((uniqueWords.size / wordCount) * 100) : 0;

      const response = {
        text,
        wordCount,
        fillerCount,
        fillerWords: findFillerWords(text),
        errorCount,
        wpm,
        vocabularyDiversity,
        timestamp: Date.now(),
        durationMs,
      };

      sessionData.responses.push(response);
      sessionData.totalWords += wordCount;
      sessionData.totalFillerWords += fillerCount;
      sessionData.totalErrors += errorCount;
      sessionData.totalResponses += 1;

      return response;
    },

    getSessionStats() {
      const elapsed = Date.now() - sessionData.startTime;
      const avgWpm = sessionData.responses.length > 0
        ? Math.round(sessionData.responses.reduce((sum, r) => sum + r.wpm, 0) / sessionData.responses.length)
        : 0;

      const fluencyScore = calculateFluencyScore(sessionData);
      const grammarScore = calculateGrammarScore(sessionData);
      const overallScore = Math.round((fluencyScore + grammarScore) / 2);

      return {
        totalResponses: sessionData.totalResponses,
        totalWords: sessionData.totalWords,
        totalFillerWords: sessionData.totalFillerWords,
        totalErrors: sessionData.totalErrors,
        averageWpm: avgWpm,
        fluencyScore,
        grammarScore,
        overallScore,
        sessionDuration: elapsed,
        commonFillerWords: getMostCommonFillers(sessionData.responses),
        responses: sessionData.responses,
      };
    },

    reset() {
      sessionData.responses = [];
      sessionData.startTime = Date.now();
      sessionData.totalWords = 0;
      sessionData.totalFillerWords = 0;
      sessionData.totalErrors = 0;
      sessionData.totalResponses = 0;
    },
  };
}

function countFillerWords(text) {
  const lower = text.toLowerCase();
  let count = 0;
  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) count += matches.length;
  }
  return count;
}

function findFillerWords(text) {
  const found = [];
  const lower = text.toLowerCase();
  for (const filler of FILLER_WORDS) {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) {
      found.push({ word: filler, count: matches.length });
    }
  }
  return found.sort((a, b) => b.count - a.count);
}

function calculateFluencyScore(data) {
  if (data.totalResponses === 0) return 100;
  const fillerRatio = data.totalWords > 0 ? data.totalFillerWords / data.totalWords : 0;
  // Penalty: 0% fillers = 100, 20%+ fillers = 0
  const score = Math.max(0, Math.round(100 - (fillerRatio * 500)));
  return Math.min(100, score);
}

function calculateGrammarScore(data) {
  if (data.totalResponses === 0) return 100;
  const errorRatio = data.totalErrors / data.totalResponses;
  // 0 errors per response = 100, 5+ errors per response = 0
  const score = Math.max(0, Math.round(100 - (errorRatio * 20)));
  return Math.min(100, score);
}

function getMostCommonFillers(responses) {
  const fillerMap = {};
  for (const r of responses) {
    for (const f of r.fillerWords) {
      fillerMap[f.word] = (fillerMap[f.word] || 0) + f.count;
    }
  }
  return Object.entries(fillerMap)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export default createFluencyTracker;
