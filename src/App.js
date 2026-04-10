import React, { useState, useRef } from "react";

const THEMES = {
  blood: { accent: "#c41e1e", accentGlow: "rgba(196,30,30,0.4)", accentBg: "rgba(196,30,30,0.08)", name: "Blood" },
  frost: { accent: "#1e7ec4", accentGlow: "rgba(30,126,196,0.4)", accentBg: "rgba(30,126,196,0.08)", name: "Frost" },
};

const GENRE_TREE = {
  id: "heavy-metal", label: "Heavy Metal", year: "1970s", bands: "Black Sabbath, Judas Priest, Iron Maiden",
  children: [
    { id: "nwobhm", label: "NWOBHM", year: "1979-85", bands: "Iron Maiden, Diamond Head, Saxon", children: [
      { id: "power-metal", label: "Power Metal", year: "1984+", bands: "Helloween, Blind Guardian, Stratovarius", children: [
        { id: "symphonic-power", label: "Symphonic Power", year: "1995+", bands: "Nightwish, Rhapsody, Epica", children: [] },
      ]},
      { id: "speed-metal", label: "Speed Metal", year: "1982+", bands: "Exciter, Agent Steel, Razor", children: [] },
    ]},
    { id: "thrash", label: "Thrash Metal", year: "1983+", bands: "Metallica, Slayer, Kreator, Exodus", children: [
      { id: "death-metal", label: "Death Metal", year: "1987+", bands: "Death, Morbid Angel, Obituary", children: [
        { id: "brutal-death", label: "Brutal Death", year: "1991+", bands: "Suffocation, Cannibal Corpse, Cryptopsy", children: [] },
        { id: "tech-death", label: "Technical Death", year: "1991+", bands: "Atheist, Necrophagist, Obscura", children: [] },
        { id: "melodic-death", label: "Melodic Death", year: "1993+", bands: "At the Gates, In Flames, Dark Tranquillity", children: [] },
        { id: "prog-death", label: "Progressive Death", year: "1991+", bands: "Opeth, Death (later), Edge of Sanity", children: [] },
        { id: "death-doom", label: "Death/Doom", year: "1990+", bands: "Paradise Lost, My Dying Bride, Bolt Thrower", children: [] },
      ]},
      { id: "groove", label: "Groove Metal", year: "1990+", bands: "Pantera, Lamb of God, Machine Head", children: [
        { id: "nu-metal", label: "Nu Metal", year: "1994+", bands: "Korn, Deftones, Slipknot", children: [] },
      ]},
      { id: "crossover", label: "Crossover Thrash", year: "1985+", bands: "Suicidal Tendencies, D.R.I., Municipal Waste", children: [] },
    ]},
    { id: "first-wave-bm", label: "First Wave Black Metal", year: "1982+", bands: "Venom, Bathory, Celtic Frost", children: [
      { id: "second-wave-bm", label: "Second Wave Black Metal", year: "1991+", bands: "Mayhem, Darkthrone, Burzum", children: [
        { id: "symphonic-bm", label: "Symphonic Black Metal", year: "1994+", bands: "Emperor, Dimmu Borgir, Cradle of Filth", children: [] },
        { id: "atmospheric-bm", label: "Atmospheric Black Metal", year: "1996+", bands: "Wolves in the Throne Room, Alcest, Agalloch", children: [] },
        { id: "depressive-bm", label: "DSBM", year: "1998+", bands: "Xasthur, Leviathan, Shining", children: [] },
      ]},
      { id: "viking", label: "Viking Metal", year: "1988+", bands: "Bathory, Enslaved, Moonsorrow", children: [] },
    ]},
    { id: "doom", label: "Doom Metal", year: "1982+", bands: "Candlemass, Saint Vitus, Pentagram", children: [
      { id: "stoner", label: "Stoner/Sludge", year: "1990+", bands: "Eyehategod, Sleep, Electric Wizard", children: [] },
      { id: "funeral-doom", label: "Funeral Doom", year: "1992+", bands: "Thergothon, Skepticism, Bell Witch", children: [] },
      { id: "drone", label: "Drone Metal", year: "1993+", bands: "Earth, Sunn O))), Boris", children: [] },
    ]},
    { id: "prog-metal", label: "Progressive Metal", year: "1988+", bands: "Dream Theater, Fates Warning, Queensryche", children: [
      { id: "djent", label: "Djent", year: "2002+", bands: "Meshuggah, Periphery, Animals as Leaders", children: [] },
      { id: "post-metal", label: "Post-Metal", year: "2000+", bands: "Isis, Cult of Luna, Neurosis", children: [] },
    ]},
  ],
};

const LOCAL_BANDS = {
  "slayer": { name: "Slayer", country: "USA", years: "1981-2019", status: "Disbanded", genre: "Thrash Metal", overview: "One of thrash metal's Big Four. Defined extreme thrash with raw aggression and occult themes.", genreDetail: "Blistering speed, chaotic solos, screaming vocals, war-inspired lyrics. The heaviest of the Big Four.", scene: "Los Angeles thrash scene alongside Metallica, Megadeth, and Suicidal Tendencies. While the Bay Area had Exodus and Testament, LA bred the darker, more extreme side of thrash.", albums: [{ title: "Reign in Blood", year: 1986, note: "29 minutes of pure aggression.", producer: "Rick Rubin", studio: "Def Jam Studios", tuning: "E Standard" },{ title: "South of Heaven", year: 1988, note: "Slower, darker, atmospheric.", producer: "Rick Rubin", studio: "Def Jam Studios", tuning: "Eb Standard" },{ title: "Seasons in the Abyss", year: 1990, note: "Perfect balance.", producer: "Rick Rubin & Andy Wallace", studio: "Def American Studios", tuning: "Eb Standard" }], members: [{ name: "Tom Araya", role: "Bass & Vocals (1981-2019)", contribution: "Iconic scream. Most underrated bassist in thrash.", gear: "BC Rich Mockingbird Bass, various Ampeg and Hartke amp setups" },{ name: "Kerry King", role: "Guitar (1981-2019)", contribution: "Chaotic solos. Wrote majority of later material.", gear: "BC Rich guitars (KKV, Mockingbird), Marshall JCM800, Kahler tremolo systems" },{ name: "Jeff Hanneman", role: "Guitar (1981-2013, d. 2013)", contribution: "Wrote Angel of Death, Raining Blood, South of Heaven.", gear: "ESP Hanneman signature, Marshall JCM800, later Mesa Boogie" },{ name: "Dave Lombardo", role: "Drums (1981-92, 2001-13)", contribution: "Invented thrash drumming. Godfather of double bass.", gear: "Tama drums, Paiste cymbals, Pearl double bass pedals" }], similar: ["Kreator","Exodus","Sodom","Dark Angel","Demolition Hammer"], influences: { inspired_by: ["Venom","Iron Maiden","Judas Priest","Black Flag"], influenced: ["Cannibal Corpse","Lamb of God","Machine Head","Trivium"] }, startHere: { newcomer: "Reign in Blood — 29 minutes, zero filler, the definitive thrash album", deep: "Hell Awaits — proto-death metal complexity that rewards repeat listens" }, deepCuts: [{ track: "Necrophiliac", album: "Hell Awaits", why: "Overlooked mid-tempo crusher with some of Hanneman's best riffing" },{ track: "Mandatory Suicide", album: "South of Heaven", why: "Haunting atmosphere that shows Slayer's range beyond pure speed" },{ track: "Expendable Youth", album: "Seasons in the Abyss", why: "Social commentary disguised as thrash brutality" }], moodPicks: { aggressive: "Reign in Blood — pure unrelenting violence", atmospheric: "South of Heaven — slow burn dread", technical: "Hell Awaits — complex arrangements", melancholic: "Seasons in the Abyss — title track's brooding intro" }, timeline: [{ year: 1981, event: "Formed in Huntington Park, California" },{ year: 1983, event: "Debut Show No Mercy released on Metal Blade" },{ year: 1986, event: "Reign in Blood released — thrash metal redefined" },{ year: 1990, event: "Seasons in the Abyss brings mainstream attention" },{ year: 2006, event: "Christ Illusion marks a return to form" },{ year: 2013, event: "Jeff Hanneman dies of liver failure" },{ year: 2019, event: "Final show at The Forum, LA" }], controversies: ["Angel of Death lyrics about Mengele led to accusations of Nazi sympathism — unfounded but persistent.","Dave Lombardo fired multiple times over royalty disputes."], historicalContext: "Emerged alongside Metallica and Megadeth in the early 80s LA scene but chose extremity over accessibility. While Metallica went mainstream, Slayer stayed brutal.", funfacts: ["Hanneman wrote Angel of Death from historical research. Araya is Chilean Catholic, King is half Latino.","Rick Rubin produced Reign in Blood but Columbia refused to distribute it.","Lombardo fired mid-tour via fax machine.","Araya is a devout Catholic who goes to church Sundays."] },
};

function fuzzyMatch(q, t) { q=q.toLowerCase();t=t.toLowerCase(); if(t.includes(q))return 1;if(t.startsWith(q))return 0.9;let qi=0,s=0;for(let i=0;i<t.length&&qi<q.length;i++){if(t[i]===q[qi]){s++;qi++}}return qi===q.length?s/q.length*0.7:0; }
function getSuggestions(query, names) { if(!query||query.length<2)return[];return names.map(n=>({n,s:fuzzyMatch(query,n)})).filter(x=>x.s>0.3).sort((a,b)=>b.s-a.s).slice(0,5).map(x=>x.n); }

async function searchBandBackend(bandName) {
  const r = await fetch('/api/search', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({band:bandName}) });
  if(!r.ok){ const err=await r.json().catch(()=>({})); throw new Error(err.error||`Server error ${r.status}`); }
  return r.json();
}

function SectionCard({ title, children, icon, delay, accent }) {
  return (<div style={{ background:"linear-gradient(135deg,rgba(20,20,20,0.95),rgba(30,30,30,0.9))", border:"1px solid #333", borderLeft:`3px solid ${accent}`, borderRadius:"4px", padding:"16px 20px", marginBottom:"12px", animation:`slideUp 0.4s ease ${delay}s both` }}>
    <div style={{ fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:accent, marginBottom:"10px", fontFamily:"'Oswald',sans-serif", fontWeight:600 }}>{icon} {title}</div>
    <div style={{ color:"#ccc", fontSize:"14px", lineHeight:"1.7", fontFamily:"'Source Sans 3',sans-serif" }}>{children}</div>
  </div>);
}

function GenreNode({ node, depth, accent, expanded, toggleExpand }) {
  const has=node.children?.length>0; const open=expanded[node.id];
  return (<div style={{marginLeft:depth*20}}>
    <div onClick={()=>has&&toggleExpand(node.id)} style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",marginBottom:"4px",borderRadius:"4px",background:depth===0?"rgba(255,255,255,0.05)":"transparent",border:`1px solid ${depth===0?"#333":"transparent"}`,cursor:has?"pointer":"default"}}>
      {has?<span style={{color:accent,fontSize:"12px",display:"inline-block",transform:open?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s"}}>▶</span>:<span style={{color:"#333",fontSize:"12px"}}>•</span>}
      <div><span style={{color:"#fff",fontFamily:"'Oswald',sans-serif",fontSize:"14px",letterSpacing:"1px"}}>{node.label}</span><span style={{color:"#555",fontSize:"11px",marginLeft:"8px"}}>{node.year}</span><div style={{color:"#666",fontSize:"12px",marginTop:"2px"}}>{node.bands}</div></div>
    </div>
    {open&&has&&node.children.map(c=><GenreNode key={c.id} node={c} depth={depth+1} accent={accent} expanded={expanded} toggleExpand={toggleExpand}/>)}
  </div>);
}

function VersusMode({bandCache,accent}){const[left,setLeft]=useState("");const[right,setRight]=useState("");const names=Object.values(bandCache).map(b=>b.name);const bL=bandCache[left.toLowerCase()],bR=bandCache[right.toLowerCase()];const ss={flex:1,minWidth:"140px",background:"#151515",border:"1px solid #333",borderRadius:"4px",padding:"10px 14px",color:"#eee",fontSize:"14px",fontFamily:"'Source Sans 3',sans-serif",outline:"none",cursor:"pointer",appearance:"none"};return(<div><div style={{color:"#555",fontSize:"13px",marginBottom:"16px"}}>Pick two bands to compare side by side.</div><div style={{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap",alignItems:"center"}}><select value={left} onChange={e=>setLeft(e.target.value)} style={ss}><option value="">Band 1...</option>{names.map(n=><option key={n} value={n}>{n}</option>)}</select><div style={{color:accent,fontFamily:"'Metal Mania',system-ui",fontSize:"24px"}}>VS</div><select value={right} onChange={e=>setRight(e.target.value)} style={ss}><option value="">Band 2...</option>{names.map(n=><option key={n} value={n}>{n}</option>)}</select></div>{bL&&bR&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>{[bL,bR].map((b,i)=>(<div key={i} style={{background:"#111",border:"1px solid #282828",borderRadius:"4px",padding:"16px",animation:`slideUp 0.3s ease ${i*0.1}s both`}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:"20px",color:"#fff",textTransform:"uppercase",letterSpacing:"2px",marginBottom:"12px",borderBottom:`2px solid ${accent}`,paddingBottom:"8px"}}>{b.name}</div>{[["Country",b.country],["Years",b.years],["Status",b.status],["Genre",b.genre],["Albums",String(b.albums?.length||0)],["Members",String(b.members?.length||0)]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"}}><span style={{color:"#666"}}>{l}</span><span style={{color:"#ccc"}}>{v}</span></div>)}<div style={{marginTop:"12px"}}><div style={{color:"#555",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Oswald',sans-serif",marginBottom:"6px"}}>Key Albums</div>{(b.albums||[]).slice(0,3).map((a,j)=><div key={j} style={{color:"#999",fontSize:"12px",marginBottom:"2px"}}><span style={{color:"#fff"}}>{a.title}</span> <span style={{color:"#555"}}>({a.year})</span></div>)}</div></div>))}</div>}</div>);}

function InfluenceMap({bandCache,accent}){const[sel,setSel]=useState("");const names=Object.values(bandCache).map(b=>b.name);const band=bandCache[sel.toLowerCase()];const ss={flex:1,minWidth:"140px",background:"#151515",border:"1px solid #333",borderRadius:"4px",padding:"10px 14px",color:"#eee",fontSize:"14px",fontFamily:"'Source Sans 3',sans-serif",outline:"none",cursor:"pointer",appearance:"none"};return(<div><div style={{color:"#555",fontSize:"13px",marginBottom:"16px"}}>Select a band to see who inspired them and who they influenced.</div><select value={sel} onChange={e=>setSel(e.target.value)} style={ss}><option value="">Select...</option>{names.map(n=><option key={n} value={n}>{n}</option>)}</select>{band?.influences&&<div style={{marginTop:"20px",animation:"slideUp 0.3s ease"}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}><div style={{color:"#555",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Oswald',sans-serif"}}>Inspired by</div><div style={{display:"flex",flexWrap:"wrap",gap:"6px",justifyContent:"center",marginBottom:"12px"}}>{(band.influences.inspired_by||[]).map((b,i)=><span key={i} style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:"3px",padding:"4px 12px",fontSize:"12px",color:"#999",fontFamily:"'Oswald',sans-serif"}}>{b}</span>)}</div><div style={{fontSize:"18px",color:"#555"}}>↓</div><div style={{background:accent,color:"#fff",padding:"10px 24px",borderRadius:"4px",fontFamily:"'Oswald',sans-serif",fontSize:"18px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",boxShadow:`0 0 30px ${accent}44`}}>{band.name}</div><div style={{fontSize:"18px",color:"#555"}}>↓</div><div style={{color:"#555",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Oswald',sans-serif",marginTop:"4px"}}>Influenced</div><div style={{display:"flex",flexWrap:"wrap",gap:"6px",justifyContent:"center"}}>{(band.influences.influenced||[]).map((b,i)=><span key={i} style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:"3px",padding:"4px 12px",fontSize:"12px",color:"#999",fontFamily:"'Oswald',sans-serif"}}>{b}</span>)}</div></div></div>}</div>);}

const TABS=[{id:"search",label:"Search"},{id:"genres",label:"Genre Tree"},{id:"versus",label:"Versus"},{id:"influence",label:"Influences"}];

function App(){
  const[theme,setTheme]=useState("blood");
  const[tab,setTab]=useState("search");
  const[query,setQuery]=useState("");
  const[result,setResult]=useState(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[notFound,setNotFound]=useState(false);
  const[suggestions,setSuggestions]=useState([]);
  const[showSug,setShowSug]=useState(false);
  const[genreExp,setGenreExp]=useState({"heavy-metal":true});
  const[bandCache,setBandCache]=useState({...LOCAL_BANDS});
  const inputRef=useRef(null);
  const t=THEMES[theme];
  const allNames=Object.values(bandCache).map(b=>b.name);

  const search=async(bn)=>{const q=(bn||query).trim();if(!q)return;setQuery(q);setShowSug(false);setError("");setNotFound(false);const key=q.toLowerCase();if(bandCache[key]){setResult(bandCache[key]);return;}setLoading(true);setResult(null);try{const data=await searchBandBackend(q);if(data.error==="not_found"){setNotFound(true);}else{setBandCache(prev=>({...prev,[key]:data}));setResult(data);}}catch(e){setError(e.message||"Search failed.");}setLoading(false);};
  const handleInput=(v)=>{setQuery(v);if(v.length>=2){setSuggestions(getSuggestions(v,allNames));setShowSug(true);}else setShowSug(false);};

  return(
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#eee",fontFamily:"'Source Sans 3',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&family=Metal+Mania&display=swap');
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .si:focus{outline:none;border-color:${t.accent}!important;box-shadow:0 0 20px ${t.accent}33}
        .tb{cursor:pointer;transition:all .15s;user-select:none}.tb:hover{background:${t.accent}!important;color:#fff!important}.tb:active{transform:scale(.96)}
        .mc:hover{border-color:${t.accent}!important}
        .tt{cursor:pointer;transition:all .15s;user-select:none}.tt:hover{color:#fff!important}
        .sg{cursor:pointer;transition:background .1s}.sg:hover{background:${t.accent}!important;color:#fff!important}
        body{margin:0;background:#0a0a0a}select{appearance:none}select option{background:#151515;color:#eee}
      `}</style>

      <div style={{position:"fixed",inset:0,zIndex:0,opacity:0.03,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}/>

      <div style={{position:"relative",zIndex:1,maxWidth:"780px",margin:"0 auto",padding:"32px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"32px",flexWrap:"wrap",gap:"12px"}}>
          <div>
            <div style={{fontFamily:"'Metal Mania',system-ui",fontSize:"clamp(28px,7vw,48px)",color:t.accent,letterSpacing:"2px",lineHeight:1.1,textShadow:`0 0 40px ${t.accentGlow},0 2px 0 #000`}}>METAL ENCYCLOPEDIA</div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:"10px",letterSpacing:"5px",textTransform:"uppercase",color:"#555",marginTop:"4px"}}>AI-Powered • Every Subgenre • No Posers</div>
          </div>
          <button onClick={()=>setTheme(theme==="blood"?"frost":"blood")} style={{background:"#151515",border:`1px solid ${t.accent}`,borderRadius:"4px",padding:"6px 14px",color:t.accent,fontSize:"11px",cursor:"pointer",fontFamily:"'Oswald',sans-serif",letterSpacing:"2px",textTransform:"uppercase"}}>{THEMES[theme==="blood"?"frost":"blood"].name}</button>
        </div>

        <div style={{display:"flex",gap:"4px",marginBottom:"24px",borderBottom:"1px solid #222",paddingBottom:"12px",overflowX:"auto"}}>
          {TABS.map(tb=><div key={tb.id} className="tt" onClick={()=>setTab(tb.id)} style={{padding:"8px 16px",borderRadius:"4px 4px 0 0",fontFamily:"'Oswald',sans-serif",fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",color:tab===tb.id?"#fff":"#555",whiteSpace:"nowrap",background:tab===tb.id?`${t.accent}22`:"transparent",borderBottom:tab===tb.id?`2px solid ${t.accent}`:"2px solid transparent"}}>{tb.label}</div>)}
        </div>

        {tab==="search"&&<div>
          <div style={{position:"relative",marginBottom:"16px"}}>
            <div style={{display:"flex",gap:"8px"}}>
              <input ref={inputRef} className="si" value={query} onChange={e=>handleInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")search()}} onFocus={()=>query.length>=2&&setShowSug(true)} onBlur={()=>setTimeout(()=>setShowSug(false),200)} placeholder="Search any band..." style={{flex:1,background:"#151515",border:"1px solid #333",borderRadius:"4px",padding:"14px 18px",color:"#eee",fontSize:"16px",fontFamily:"'Source Sans 3',sans-serif"}}/>
              <button onClick={()=>search()} disabled={loading} style={{background:t.accent,color:"#fff",border:"none",borderRadius:"4px",padding:"14px 24px",fontFamily:"'Oswald',sans-serif",fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase",cursor:loading?"wait":"pointer",fontWeight:600}}>{loading?"...":"SEARCH"}</button>
            </div>
            {showSug&&suggestions.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:"90px",zIndex:10,background:"#151515",border:"1px solid #333",borderRadius:"0 0 4px 4px"}}>{suggestions.map((s,i)=><div key={i} className="sg" onMouseDown={()=>search(s)} style={{padding:"10px 18px",fontSize:"14px",color:"#aaa",borderBottom:i<suggestions.length-1?"1px solid #222":"none"}}>{s}</div>)}</div>}
          </div>

          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"24px"}}>
            {allNames.map(b=><span key={b} className="tb" onClick={()=>search(b)} style={{background:result?.name===b?t.accent:"#1a1a1a",border:`1px solid ${result?.name===b?t.accent:"#2a2a2a"}`,borderRadius:"3px",padding:"5px 12px",fontSize:"12px",color:result?.name===b?"#fff":"#777",fontFamily:"'Oswald',sans-serif",letterSpacing:"1px"}}>{b}</span>)}
          </div>

          {loading&&<div style={{textAlign:"center",padding:"60px 0"}}><div style={{width:"40px",height:"40px",border:"3px solid #222",borderTop:`3px solid ${t.accent}`,borderRadius:"50%",margin:"0 auto 20px",animation:"spin .8s linear infinite"}}/><div style={{fontFamily:"'Oswald',sans-serif",letterSpacing:"3px",fontSize:"12px",textTransform:"uppercase",color:"#666"}}>Digging through the archives...</div></div>}

          {error&&<div style={{background:"rgba(196,30,30,0.1)",border:"1px solid #c41e1e",borderRadius:"4px",padding:"16px",color:"#c41e1e",fontSize:"14px",marginBottom:"16px"}}>Could not find that band. Try another search.</div>}

          {notFound&&!loading&&<div style={{background:t.accentBg,border:"1px solid #333",borderRadius:"4px",padding:"24px",textAlign:"center",animation:"slideUp .3s ease"}}><div style={{fontSize:"32px",marginBottom:"8px"}}>🤘</div><div style={{color:"#888",fontSize:"14px",fontFamily:"'Oswald',sans-serif"}}><strong style={{color:"#eee"}}>"{query}"</strong> — not a recognized metal/rock band.</div></div>}

          {result&&!loading&&<div key={result.name} style={{animation:"slideUp .3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"20px",paddingBottom:"12px",borderBottom:`2px solid ${t.accent}`,flexWrap:"wrap",gap:"8px"}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:"28px",fontWeight:700,color:"#fff",textTransform:"uppercase",letterSpacing:"2px"}}>{result.name}</div>
              <div style={{display:"flex",gap:"12px",fontSize:"12px",color:"#555",fontFamily:"'Oswald',sans-serif"}}>{result.country&&<span>{result.country}</span>}{result.years&&<span>{result.years}</span>}{result.status&&<span style={{color:result.status==="Active"?"#4a4":"#666"}}>{result.status}</span>}</div>
            </div>

            {result.overview&&<SectionCard title="Overview" icon="⚡" delay={0.05} accent={t.accent}>{result.overview}</SectionCard>}
            {result.genreDetail&&<SectionCard title="Genre & Style" icon="🎸" delay={0.08} accent={t.accent}>{result.genreDetail}</SectionCard>}
            {result.scene&&<SectionCard title="Scene & Context" icon="📍" delay={0.1} accent={t.accent}>{result.scene}</SectionCard>}
            {result.historicalContext&&<SectionCard title="Historical Context" icon="📜" delay={0.12} accent={t.accent}>{result.historicalContext}</SectionCard>}

            {result.startHere&&<SectionCard title="Start Here" icon="▶" delay={0.14} accent={t.accent}>
              <div style={{marginBottom:"8px"}}><span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"11px",letterSpacing:"2px"}}>NEW TO THIS BAND</span><div style={{marginTop:"4px"}}>{result.startHere.newcomer}</div></div>
              <div><span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"11px",letterSpacing:"2px"}}>GOING DEEPER</span><div style={{marginTop:"4px"}}>{result.startHere.deep}</div></div>
            </SectionCard>}

            {result.albums?.length>0&&<SectionCard title="Essential Albums" icon="💿" delay={0.16} accent={t.accent}>
              {result.albums.map((a,i)=><div key={i} style={{marginBottom:"12px",paddingLeft:"14px",position:"relative",paddingBottom:i<result.albums.length-1?"12px":"0",borderBottom:i<result.albums.length-1?"1px solid #1a1a1a":"none"}}>
                <span style={{color:t.accent,position:"absolute",left:0,fontWeight:700}}>›</span>
                <strong style={{color:"#fff"}}>{a.title}</strong> <span style={{color:"#555"}}>({a.year})</span> — {a.note}
                <div style={{display:"flex",gap:"16px",marginTop:"4px",fontSize:"12px",color:"#666",flexWrap:"wrap"}}>
                  {a.producer&&<span>Producer: <span style={{color:"#999"}}>{a.producer}</span></span>}
                  {a.studio&&<span>Studio: <span style={{color:"#999"}}>{a.studio}</span></span>}
                  {a.tuning&&<span>Tuning: <span style={{color:"#999"}}>{a.tuning}</span></span>}
                </div>
              </div>)}
            </SectionCard>}

            {result.members?.length>0&&<SectionCard title="Members & Gear" icon="🤘" delay={0.2} accent={t.accent}>
              {result.members.map((m,i)=><div key={i} className="mc" style={{background:"rgba(15,15,15,0.8)",border:"1px solid #222",borderRadius:"4px",padding:"12px 14px",marginBottom:"10px",transition:"border-color .2s"}}>
                <div style={{marginBottom:"4px"}}><strong style={{color:"#fff",fontSize:"15px"}}>{m.name}</strong><span style={{color:t.accent,fontSize:"11px",marginLeft:"8px",fontFamily:"'Oswald',sans-serif",letterSpacing:"1px"}}>{m.role}</span></div>
                <div style={{color:"#999",fontSize:"13px",lineHeight:"1.6"}}>{m.contribution}</div>
                {m.gear&&<div style={{color:"#777",fontSize:"12px",marginTop:"6px",paddingTop:"6px",borderTop:"1px solid #1a1a1a"}}><span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"10px",letterSpacing:"2px"}}>GEAR</span> <span style={{marginLeft:"8px"}}>{m.gear}</span></div>}
              </div>)}
            </SectionCard>}

            {result.sideProjects?.length>0&&<SectionCard title="Side Projects" icon="🔀" delay={0.22} accent={t.accent}>
              {result.sideProjects.map((sp,i)=><div key={i} style={{marginBottom:"8px",paddingLeft:"14px",position:"relative"}}>
                <span style={{color:t.accent,position:"absolute",left:0,fontWeight:700}}>›</span>
                <strong style={{color:"#fff"}}>{sp.member}</strong> <span style={{color:"#999"}}>— {sp.projects}</span>
              </div>)}
            </SectionCard>}

            {result.deepCuts?.length>0&&<SectionCard title="Deep Cuts — Tracks You Might Have Missed" icon="💎" delay={0.24} accent={t.accent}>
              {result.deepCuts.map((dc,i)=><div key={i} style={{marginBottom:"10px",paddingLeft:"14px",position:"relative"}}>
                <span style={{color:t.accent,position:"absolute",left:0,fontWeight:700}}>›</span>
                <strong style={{color:"#fff"}}>{dc.track}</strong> <span style={{color:"#555"}}>from {dc.album}</span>
                <div style={{color:"#999",fontSize:"13px",marginTop:"2px"}}>{dc.why}</div>
              </div>)}
            </SectionCard>}

            {result.moodPicks&&<SectionCard title="Mood Picks — What To Play When..." icon="🎧" delay={0.26} accent={t.accent}>
              {[["aggressive","🔥 Maximum Aggression"],["atmospheric","🌫 Atmosphere & Mood"],["technical","⚙ Technical Showcase"],["melancholic","🖤 Dark & Introspective"]].map(([key,label])=>result.moodPicks[key]&&<div key={key} style={{marginBottom:"8px"}}><span style={{color:t.accent,fontSize:"12px"}}>{label}:</span> <span style={{color:"#ccc",marginLeft:"4px"}}>{result.moodPicks[key]}</span></div>)}
            </SectionCard>}

            {result.timeline?.length>0&&<SectionCard title="Timeline" icon="📅" delay={0.28} accent={t.accent}>
              <div style={{borderLeft:`2px solid ${t.accent}33`,paddingLeft:"16px",marginLeft:"4px"}}>
                {result.timeline.map((ev,i)=><div key={i} style={{marginBottom:"10px",position:"relative"}}>
                  <div style={{position:"absolute",left:"-22px",top:"4px",width:"10px",height:"10px",borderRadius:"50%",background:t.accent,border:"2px solid #0a0a0a"}}/>
                  <span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"13px",fontWeight:600}}>{ev.year}</span>
                  <div style={{color:"#999",fontSize:"13px",marginTop:"2px"}}>{ev.event}</div>
                </div>)}
              </div>
            </SectionCard>}

            {result.similar?.length>0&&<SectionCard title="Similar Bands" icon="→" delay={0.3} accent={t.accent}>
              {result.similar.map((s,i)=><span key={i} className="tb" onClick={()=>search(s)} style={{display:"inline-block",background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:"3px",padding:"4px 12px",fontSize:"12px",marginRight:"6px",marginBottom:"6px",color:"#fff",cursor:"pointer"}}>{s}</span>)}
            </SectionCard>}

            {result.controversies?.length>0&&<SectionCard title="Controversies & Drama" icon="⚠" delay={0.32} accent={t.accent}>
              {result.controversies.map((c,i)=><div key={i} style={{marginBottom:i<result.controversies.length-1?"10px":"0",paddingBottom:i<result.controversies.length-1?"10px":"0",borderBottom:i<result.controversies.length-1?"1px solid #1a1a1a":"none",paddingLeft:"14px",position:"relative"}}>
                <span style={{color:t.accent,position:"absolute",left:0,fontFamily:"'Oswald',sans-serif",fontSize:"11px"}}>!</span>{c}
              </div>)}
            </SectionCard>}

            {result.funfacts?.length>0&&<SectionCard title="Fun Facts & Deep Cuts" icon="💀" delay={0.34} accent={t.accent}>
              {result.funfacts.map((f,i)=><div key={i} style={{marginBottom:i<result.funfacts.length-1?"12px":"0",paddingBottom:i<result.funfacts.length-1?"12px":"0",borderBottom:i<result.funfacts.length-1?"1px solid #1a1a1a":"none",paddingLeft:"18px",position:"relative"}}><span style={{color:t.accent,position:"absolute",left:0,fontFamily:"'Oswald',sans-serif",fontSize:"11px"}}>0{i+1}</span>{f}</div>)}
            </SectionCard>}
          </div>}
        </div>}

        {tab==="genres"&&<div style={{animation:"slideUp .3s ease"}}><div style={{color:"#555",fontSize:"13px",marginBottom:"16px"}}>Click ▶ to expand. Trace metal's full evolution.</div><GenreNode node={GENRE_TREE} depth={0} accent={t.accent} expanded={genreExp} toggleExpand={id=>setGenreExp(p=>({...p,[id]:!p[id]}))}/></div>}
        {tab==="versus"&&<div style={{animation:"slideUp .3s ease"}}><VersusMode bandCache={bandCache} accent={t.accent}/></div>}
        {tab==="influence"&&<div style={{animation:"slideUp .3s ease"}}><InfluenceMap bandCache={bandCache} accent={t.accent}/></div>}

        <div style={{marginTop:"60px",textAlign:"center",fontSize:"10px",color:"#222",letterSpacing:"2px",fontFamily:"'Oswald',sans-serif",textTransform:"uppercase"}}>Metal Encyclopedia • AI-Powered</div>
      </div>
    </div>
  );
}

export default App;