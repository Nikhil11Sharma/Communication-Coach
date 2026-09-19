// Parses LanguageTool API response into structured corrections
export function analyzeGrammar(languageToolResponse) {
  if (!languageToolResponse || !languageToolResponse.matches) return [];
  
  return languageToolResponse.matches.map(match => ({
    message: match.message,
    shortMessage: match.shortMessage || match.rule?.description || 'Grammar issue',
    offset: match.offset,
    length: match.length,
    replacements: match.replacements?.slice(0, 3).map(r => r.value) || [],
    ruleId: match.rule?.id || '',
    category: match.rule?.category?.name || 'Grammar',
    severity: getSeverity(match),
    context: match.context?.text || '',
    contextOffset: match.context?.offset || 0,
    contextLength: match.context?.length || 0,
  }));
}

function getSeverity(match) {
  const cat = match.rule?.category?.id || '';
  if (cat.includes('GRAMMAR') || cat.includes('TYPOS')) return 'error';
  if (cat.includes('STYLE') || cat.includes('REDUNDANCY')) return 'warning';
  return 'suggestion';
}

// Apply corrections to original text
export function applyCorrectionToText(originalText, corrections) {
  if (!corrections.length) return originalText;
  
  let correctedText = originalText;
  // Apply corrections in reverse order to preserve offsets
  const sorted = [...corrections]
    .filter(c => c.replacements.length > 0)
    .sort((a, b) => b.offset - a.offset);
  
  for (const correction of sorted) {
    const before = correctedText.slice(0, correction.offset);
    const after = correctedText.slice(correction.offset + correction.length);
    correctedText = before + correction.replacements[0] + after;
  }
  
  return correctedText;
}

// Generate a human-readable summary of errors
export function generateErrorSummary(corrections) {
  if (!corrections.length) return 'Great job! No grammar errors detected.';
  
  const errorCount = corrections.filter(c => c.severity === 'error').length;
  const warningCount = corrections.filter(c => c.severity === 'warning').length;
  const suggestionCount = corrections.filter(c => c.severity === 'suggestion').length;
  
  const parts = [];
  if (errorCount) parts.push(`${errorCount} grammar error${errorCount > 1 ? 's' : ''}`);
  if (warningCount) parts.push(`${warningCount} style warning${warningCount > 1 ? 's' : ''}`);
  if (suggestionCount) parts.push(`${suggestionCount} suggestion${suggestionCount > 1 ? 's' : ''}`);
  
  return `Found ${parts.join(', ')}.`;
}
