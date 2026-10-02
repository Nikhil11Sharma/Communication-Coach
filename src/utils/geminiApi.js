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
    analytics: `${base} You are conducting a Data Analytics interview. Ask about SQL, Python, statistics, data visualization, A/B testing, KPIs, ETL pipelines, and data cleaning. Evaluate how clearly they explain analytical concepts and provide brief feedback.`,
    python: `${base} You are conducting a Python Developer interview. Ask about Python OOP, data structures, decorators, generators, libraries, and best practices. Evaluate their technical clarity.`,
    java: `${base} You are conducting a Java Developer interview. Ask about Java OOP, collections, multithreading, SOLID principles, design patterns, and frameworks.`,
    pharmacy: `${base} You are conducting a Pharmacy interview. Ask about pharmacology, drug interactions, patient counseling, prescription handling, and regulatory compliance.`,
    mechanical: `${base} You are conducting a Mechanical Engineering interview. Ask about thermodynamics, manufacturing processes, material science, CAD/CAM, and quality control.`,
    techsupport: `${base} You are conducting a Technical Support interview. Ask about troubleshooting, networking, operating systems, customer service skills, and ticketing systems.`,
    marketing: `${base} You are conducting a Digital Marketing interview. Ask about SEO, PPC, social media marketing, content strategy, Google Analytics, and campaign measurement.`,
    finance: `${base} You are conducting a Finance & Accounting interview. Ask about financial statements, budgeting, cash flow, ROI analysis, accounting principles, and financial forecasting.`,
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
