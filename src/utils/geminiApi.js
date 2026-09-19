const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function getAIResponse(apiKey, conversationHistory, userMessage, mode) {
  if (!apiKey) return null;

  const systemPrompt = getSystemPrompt(mode);
  
  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    { role: 'model', parts: [{ text: 'I understand. I will act as an English interview coach and help improve communication skills.' }] },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    })),
    { role: 'user', parts: [{ text: userMessage }] }
  ];

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 300,
        }
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return null;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error('Gemini API error:', error);
    return null;
  }
}

function getSystemPrompt(mode) {
  const base = `You are an English Interview Coach. Your role is to help the user practice English speaking for job interviews. Keep your responses concise (2-3 sentences max). Be encouraging but honest.`;
  
  const modePrompts = {
    hr: `${base} You are conducting an HR interview. Ask relevant HR questions and provide brief feedback on their answer quality. Then ask a follow-up question.`,
    behavioral: `${base} You are conducting a behavioral interview. Encourage the STAR method (Situation, Task, Action, Result). Ask follow-up questions about their experiences.`,
    technical: `${base} You are conducting a technical interview. Ask about technical concepts and evaluate how clearly they explain them. Keep it conversational.`,
    free: `${base} You are having a casual English conversation to help them practice fluency. Discuss everyday topics and gently correct any awkward phrasing.`,
  };

  return modePrompts[mode] || modePrompts.free;
}

export async function testApiKey(apiKey) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
        generationConfig: { maxOutputTokens: 10 }
      })
    });
    return response.ok;
  } catch {
    return false;
  }
}
