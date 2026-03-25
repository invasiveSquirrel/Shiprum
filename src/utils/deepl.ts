export async function translateDeepL(text: string, targetLang: string = 'EN-US') {
  try {
    const apiKey = await globalThis.electronAPI.getDeepLKey();
    if (!apiKey) throw new Error('DeepL API key not found. Please add it in Settings.');

    const isFree = !apiKey.endsWith(':fx');
    const baseUrl = isFree 
      ? 'https://api-free.deepl.com/v2/translate' 
      : 'https://api.deepl.com/v2/translate';

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        target_lang: targetLang,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'DeepL Translation failed');
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (err) {
    console.error('DeepL Error:', err);
    return `Error: ${err instanceof Error ? err.message : 'Unknown error'}`;
  }
}
