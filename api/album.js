export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { band, album } = req.body;
  if (!band || !album) return res.status(400).json({ error: 'Band and album required' });
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-opus-4-6', max_tokens: 3000,
        messages: [{ role: 'user', content: `You are Metal Encyclopedia AI. Return ONLY valid JSON about the album "${album}" by "${band}". No markdown, no backticks.
{"album":"","band":"","year":0,"label":"","producer":"","studio":"","tuning":"","length":"total runtime","tracks":[{"number":1,"title":"","duration":"4:32","writers":"songwriting credits","notes":"1 sentence about this track","personnel":"who plays what if notable"}],"lineup":[{"name":"","instrument":""}],"guestMusicians":[{"name":"","contribution":""}],"albumNotes":"2-3 sentences about recording/significance"}
Include ALL tracks. Be factual with durations and credits. If exact credits unknown, credit the band.` }],
      }),
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message || 'API error' });
    const text = data.content?.filter(c => c.type === 'text').map(c => c.text).join('') || '';
    return res.status(200).json(JSON.parse(text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()));
  } catch (err) { return res.status(500).json({ error: err.message || 'Server error' }); }
}
