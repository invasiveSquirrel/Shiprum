export async function askGemini(prompt: string, context: string = '') {
  try {
    const apiKey = await globalThis.electronAPI.getGeminiKey();
    if (!apiKey) throw new Error('Gemini API key not found');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${context}\n\nQuestion: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from intelligence.';
  } catch (err) {
    console.error('Gemini Error:', err);
    return `Error: ${err instanceof Error ? err.message : 'Unknown error'}`;
  }
}
