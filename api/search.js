export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { band } = req.body;
  if (!band) {
    return res.status(400).json({ error: 'Band name required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `You are Metal Encyclopedia AI. Return ONLY valid JSON about "${band}". No markdown, no backticks.
If NOT a real metal/rock band: {"error":"not_found"}
Otherwise: {"name":"","country":"","years":"","status":"Active/Disbanded/On Hold","genre":"","overview":"2-3 sentences","genreDetail":"2-3 sentences on sound","albums":[{"title":"","year":0,"note":"one line"}],"members":[{"name":"","role":"","contribution":"2-3 sentences"}],"similar":["5 bands"],"influences":{"inspired_by":["3-4 bands"],"influenced":["3-4 bands"]},"funfacts":["4 detailed facts"]}
Include 4-5 albums, all notable members, 5 similar bands, 4 fun facts. Be factual. Write like someone who lives metal.`
        }],
      }),
    });

    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'API error' });
    }

    const text = data.content?.filter(c => c.type === 'text').map(c => c.text).join('') || '';
    const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}