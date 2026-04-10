export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { band } = req.body;
  if (!band) return res.status(400).json({ error: 'Band name required' });
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-opus-4-6', max_tokens: 4000,
        messages: [{ role: 'user', content: `You are Music Encyclopedia AI — an expert covering ALL music that connects to the heavy metal family tree. This includes blues, jazz, rock and roll, psychedelic rock, progressive rock, punk, hardcore, and every subgenre of metal. Treat every artist equally — Robert Johnson gets the same depth as Slayer.

Return ONLY valid JSON about "${band}". No markdown, no backticks.
If NOT a real band/artist: {"error":"not_found"}
Otherwise: {"name":"","country":"","years":"","status":"Active/Disbanded/Deceased/On Hold","genre":"","overview":"2-3 sentences","genreDetail":"2-3 sentences on sound","scene":"2-3 sentences on scene/context","albums":[{"title":"","year":0,"note":"one line","producer":"","studio":"","tuning":"if applicable","type":"Studio/Live/Compilation/EP/Demo"}],"members":[{"name":"","role":"instrument (years)","contribution":"2-3 sentences","gear":"specific equipment if known"}],"sideProjects":[{"member":"","projects":""}],"similar":["5 similar artists"],"influences":{"inspired_by":["3-4 artists"],"influenced":["3-4 artists"]},"startHere":{"newcomer":"album — why","deep":"album — why"},"deepCuts":[{"track":"","album":"","why":"1 sentence"}],"moodPicks":{"aggressive":"","atmospheric":"","technical":"","melancholic":""},"timeline":[{"year":0,"event":""}],"controversies":["if any"],"historicalContext":"2-3 sentences","funfacts":["4 facts"]}

IMPORTANT: Include ALL notable releases: 4-5 key studio albums PLUS notable live albums, compilations, EPs, and demos (mark each with type). All notable members with gear where known, 8-12 timeline events, 3-4 deep cuts, side projects. For blues/jazz/early rock artists, gear means their instrument of choice. Be factual and detailed.` }],
      }),
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message || 'API error' });
    const text = data.content?.filter(c => c.type === 'text').map(c => c.text).join('') || '';
    return res.status(200).json(JSON.parse(text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()));
  } catch (err) { return res.status(500).json({ error: err.message || 'Server error' }); }
}
