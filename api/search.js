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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `You are Metal Encyclopedia AI — the most knowledgeable metal expert alive. Return ONLY valid JSON about "${band}". No markdown, no backticks, no explanation before or after.

If NOT a real metal/rock band or artist: {"error":"not_found"}

Otherwise return this exact JSON structure with ALL fields filled:
{
  "name": "Band Name",
  "country": "Country",
  "years": "YYYY-present or YYYY-YYYY",
  "status": "Active / Disbanded / On Hold / Reunited",
  "genre": "Primary genre(s)",
  "overview": "2-3 sentence summary of significance",
  "genreDetail": "Detailed sound description, 2-3 sentences",
  "scene": "Scene affiliation and geographic context, e.g. Tampa death metal scene, Bergen black metal circle, Bay Area thrash movement. 2-3 sentences about the scene and the band's role in it.",
  "albums": [
    {"title": "Album", "year": 2000, "note": "One line", "producer": "Producer name", "studio": "Studio name", "tuning": "Guitar tuning used, e.g. E Standard, Drop D, C Standard"}
  ],
  "members": [
    {"name": "Name", "role": "Instrument (years)", "contribution": "2-3 sentences about specific contribution", "gear": "Key equipment: guitars, amps, pedals, drums, etc. Be specific with models."}
  ],
  "sideProjects": [
    {"member": "Member name", "projects": "List of notable side projects/other bands with brief description"}
  ],
  "similar": ["Band1", "Band2", "Band3", "Band4", "Band5"],
  "influences": {
    "inspired_by": ["3-4 bands that influenced them"],
    "influenced": ["3-4 bands they influenced"]
  },
  "startHere": {
    "newcomer": "Album name — one sentence why this is the best entry point for someone new to the band",
    "deep": "Album name — one sentence why this is the deeper cut for someone who already knows the basics"
  },
  "deepCuts": [
    {"track": "Song name", "album": "From album", "why": "Why this track is an overlooked gem, 1 sentence"}
  ],
  "moodPicks": {
    "aggressive": "Album or song for when you want maximum aggression",
    "atmospheric": "Album or song for atmosphere and mood",
    "technical": "Album or song showcasing technical skill",
    "melancholic": "Album or song for dark/sad/introspective mood"
  },
  "timeline": [
    {"year": 1990, "event": "Brief description of key event: formation, album release, member change, controversy, etc."}
  ],
  "controversies": ["1-2 sentences per controversy or notable drama, if any exist. Be factual and honest."],
  "historicalContext": "What was happening in metal when this band emerged? What did they change? 2-3 sentences.",
  "funfacts": ["4 detailed, obscure, interesting facts that only a real fan would know"]
}

IMPORTANT GUIDELINES:
- Include 4-5 essential albums with producer, studio, and tuning for each
- Include ALL notable members with detailed gear information (specific guitar models, amp heads, pedal setups, drum kits)
- Include 8-12 timeline events covering the band's full history
- Include 3-4 deep cut track recommendations
- Include side projects for all members who have them
- Mood picks should be specific album or song names
- Be factual, detailed, and knowledgeable
- Write like someone who genuinely lives and breathes metal
- If gear info is unknown, give your best educated answer based on era and genre`
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
