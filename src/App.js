import React, { useState, useRef } from "react";
const THEMES = { blood:{accent:"#c41e1e",accentGlow:"rgba(196,30,30,0.4)",accentBg:"rgba(196,30,30,0.08)",name:"Blood"}, frost:{accent:"#1e7ec4",accentGlow:"rgba(30,126,196,0.4)",accentBg:"rgba(30,126,196,0.08)",name:"Frost"} };

const GENRE_TREE = {id:"roots",label:"The Roots",year:"1900s-1960s",bands:["Robert Johnson","Howlin' Wolf","Muddy Waters","Blind Willie McTell"],children:[
{id:"early-rock",label:"Early Rock & Roll",year:"1950s",bands:["Chuck Berry","Little Richard","Elvis Presley","Buddy Holly"],children:[
{id:"british-invasion",label:"British Invasion",year:"1962-66",bands:["The Beatles","The Rolling Stones","The Kinks","The Who","The Yardbirds"],children:[
{id:"psychedelic",label:"Psychedelic Rock",year:"1966-71",bands:["Jimi Hendrix","Pink Floyd","Jefferson Airplane","Cream"],children:[
{id:"prog-rock",label:"Progressive Rock",year:"1969+",bands:["King Crimson","Yes","Genesis","Jethro Tull","Camel"],children:[
{id:"prog-metal",label:"Progressive Metal",year:"1988+",bands:["Dream Theater","Fates Warning","Queensryche"],children:[
{id:"djent",label:"Djent",year:"2002+",bands:["Meshuggah","Periphery","Animals as Leaders"],children:[]},
{id:"post-metal",label:"Post-Metal",year:"2000+",bands:["Isis","Cult of Luna","Neurosis"],children:[]}]}]},
{id:"hard-rock",label:"Hard Rock",year:"1968+",bands:["Led Zeppelin","Deep Purple","Uriah Heep","Blue Cheer"],children:[
{id:"proto-metal",label:"Proto-Metal",year:"1970-79",bands:["Black Sabbath","Motorhead","Budgie","Sir Lord Baltimore"],children:[
{id:"heavy-metal",label:"Heavy Metal / NWOBHM",year:"1979-85",bands:["Iron Maiden","Judas Priest","Diamond Head","Saxon"],children:[
{id:"power-metal",label:"Power Metal",year:"1984+",bands:["Helloween","Blind Guardian","Stratovarius"],children:[
{id:"symphonic-power",label:"Symphonic Power",year:"1995+",bands:["Nightwish","Rhapsody","Epica"],children:[]}]},
{id:"speed-metal",label:"Speed Metal",year:"1982+",bands:["Exciter","Agent Steel","Razor"],children:[]},
{id:"thrash",label:"Thrash Metal",year:"1983+",bands:["Metallica","Slayer","Kreator","Megadeth","Anthrax","Exodus"],children:[
{id:"death-metal",label:"Death Metal",year:"1987+",bands:["Death","Morbid Angel","Obituary","Cannibal Corpse"],children:[
{id:"brutal-death",label:"Brutal Death",year:"1991+",bands:["Suffocation","Cryptopsy","Devourment"],children:[]},
{id:"tech-death",label:"Technical Death",year:"1991+",bands:["Atheist","Necrophagist","Obscura"],children:[]},
{id:"melodic-death",label:"Melodic Death",year:"1993+",bands:["At the Gates","In Flames","Dark Tranquillity"],children:[]},
{id:"prog-death",label:"Progressive Death",year:"1991+",bands:["Opeth","Death","Edge of Sanity","Ne Obliviscaris"],children:[]},
{id:"death-doom",label:"Death/Doom",year:"1990+",bands:["Paradise Lost","My Dying Bride","Bolt Thrower"],children:[]},
{id:"deathgrind",label:"Deathgrind",year:"1987+",bands:["Carcass","Napalm Death","Terrorizer"],children:[]}]},
{id:"groove",label:"Groove Metal",year:"1990+",bands:["Pantera","Lamb of God","Machine Head","Exhorder"],children:[
{id:"nu-metal",label:"Nu Metal",year:"1994+",bands:["Korn","Deftones","Slipknot","System of a Down"],children:[]}]},
{id:"crossover",label:"Crossover Thrash",year:"1985+",bands:["Suicidal Tendencies","D.R.I.","Municipal Waste"],children:[]}]},
{id:"doom",label:"Doom Metal",year:"1982+",bands:["Candlemass","Saint Vitus","Pentagram","Trouble"],children:[
{id:"stoner",label:"Stoner/Sludge",year:"1990+",bands:["Eyehategod","Sleep","Electric Wizard","Acid Bath"],children:[]},
{id:"funeral-doom",label:"Funeral Doom",year:"1992+",bands:["Thergothon","Skepticism","Bell Witch"],children:[]},
{id:"drone",label:"Drone Metal",year:"1993+",bands:["Earth","Sunn O)))","Boris"],children:[]}]}]}]}]}]},
{id:"garage-punk",label:"Garage / Proto-Punk",year:"1965-74",bands:["The Stooges","MC5","The Sonics","New York Dolls"],children:[
{id:"punk",label:"Punk Rock",year:"1976+",bands:["Ramones","Sex Pistols","The Clash","Dead Kennedys"],children:[
{id:"hardcore",label:"Hardcore Punk",year:"1980+",bands:["Black Flag","Minor Threat","Bad Brains","Discharge"],children:[
{id:"grindcore",label:"Grindcore",year:"1985+",bands:["Napalm Death","Repulsion","Terrorizer","Brutal Truth"],children:[]},
{id:"powerviolence",label:"Powerviolence",year:"1990+",bands:["Infest","Crossed Out","Man Is the Bastard"],children:[]}]},
{id:"crust",label:"Crust Punk",year:"1984+",bands:["Amebix","Antisect","Nausea"],children:[]}]}]}]},
{id:"blues-rock",label:"Blues Rock",year:"1960s",bands:["The Rolling Stones","Fleetwood Mac","John Mayall","Savoy Brown"],children:[]}]},
{id:"first-wave-bm",label:"First Wave Black Metal",year:"1982+",bands:["Venom","Bathory","Celtic Frost","Hellhammer","Mercyful Fate"],children:[
{id:"second-wave-bm",label:"Second Wave Black Metal",year:"1991+",bands:["Mayhem","Darkthrone","Burzum","Immortal","Emperor"],children:[
{id:"symphonic-bm",label:"Symphonic Black Metal",year:"1994+",bands:["Emperor","Dimmu Borgir","Cradle of Filth"],children:[]},
{id:"atmospheric-bm",label:"Atmospheric Black Metal",year:"1996+",bands:["Wolves in the Throne Room","Alcest","Agalloch"],children:[]},
{id:"depressive-bm",label:"DSBM",year:"1998+",bands:["Xasthur","Leviathan","Shining"],children:[]},
{id:"war-metal",label:"War Metal",year:"1990+",bands:["Blasphemy","Conqueror","Revenge"],children:[]}]},
{id:"viking",label:"Viking Metal",year:"1988+",bands:["Bathory","Enslaved","Moonsorrow","Falkenbach"],children:[]},
{id:"black-thrash",label:"Black/Thrash",year:"1983+",bands:["Sodom","Destroyer 666","Desaster"],children:[]}]}
]};

const LOCAL_BANDS={"slayer":{name:"Slayer",country:"USA",years:"1981-2019",status:"Disbanded",genre:"Thrash Metal",overview:"One of thrash metal's Big Four. Defined extreme thrash with raw aggression and occult themes.",genreDetail:"Blistering speed, chaotic solos, screaming vocals. The heaviest of the Big Four.",scene:"Los Angeles thrash scene.",albums:[{title:"Reign in Blood",year:1986,note:"Thrash's holy grail.",producer:"Rick Rubin",studio:"Def Jam",tuning:"E Standard"},{title:"South of Heaven",year:1988,note:"Slower, darker.",producer:"Rick Rubin",studio:"Def Jam",tuning:"Eb"},{title:"Seasons in the Abyss",year:1990,note:"Perfect balance.",producer:"Rick Rubin",studio:"Def American",tuning:"Eb"}],members:[{name:"Tom Araya",role:"Bass & Vocals",contribution:"Iconic scream.",gear:"BC Rich Bass, Ampeg"},{name:"Kerry King",role:"Guitar",contribution:"Chaotic solos.",gear:"BC Rich, Marshall JCM800"},{name:"Jeff Hanneman",role:"Guitar (d. 2013)",contribution:"Wrote the classics.",gear:"ESP, Marshall"},{name:"Dave Lombardo",role:"Drums",contribution:"Invented thrash drumming.",gear:"Tama, Paiste"}],similar:["Kreator","Exodus","Sodom","Dark Angel","Demolition Hammer"],influences:{inspired_by:["Venom","Iron Maiden","Judas Priest"],influenced:["Cannibal Corpse","Lamb of God","Machine Head"]},startHere:{newcomer:"Reign in Blood",deep:"Hell Awaits"},deepCuts:[{track:"Necrophiliac",album:"Hell Awaits",why:"Overlooked crusher"}],moodPicks:{aggressive:"Reign in Blood",atmospheric:"South of Heaven",technical:"Hell Awaits",melancholic:"Seasons in the Abyss"},timeline:[{year:1981,event:"Formed"},{year:1986,event:"Reign in Blood"},{year:2013,event:"Hanneman dies"},{year:2019,event:"Final show"}],controversies:["Angel of Death Nazi accusations — unfounded."],historicalContext:"Chose extremity while Metallica went mainstream.",funfacts:["Araya is Catholic.","Lombardo fired via fax."]}};

function fuzzyMatch(q,t){q=q.toLowerCase();t=t.toLowerCase();if(t.includes(q))return 1;if(t.startsWith(q))return 0.9;let qi=0,s=0;for(let i=0;i<t.length&&qi<q.length;i++){if(t[i]===q[qi]){s++;qi++}}return qi===q.length?s/q.length*0.7:0;}
function getSuggestions(query,names){if(!query||query.length<2)return[];return names.map(n=>({n,s:fuzzyMatch(query,n)})).filter(x=>x.s>0.3).sort((a,b)=>b.s-a.s).slice(0,5).map(x=>x.n);}

async function searchBandBackend(bandName){const r=await fetch('/api/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({band:bandName})});if(!r.ok){const err=await r.json().catch(()=>({}));throw new Error(err.error||'Server error');}return r.json();}
async function fetchAlbumDetails(band,album){const r=await fetch('/api/album',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({band,album})});if(!r.ok){const err=await r.json().catch(()=>({}));throw new Error(err.error||'Server error');}return r.json();}

function SectionCard({title,children,icon,delay,accent}){return(<div style={{background:"linear-gradient(135deg,rgba(20,20,20,0.95),rgba(30,30,30,0.9))",border:"1px solid #333",borderLeft:`3px solid ${accent}`,borderRadius:"4px",padding:"16px 20px",marginBottom:"12px",animation:`slideUp 0.4s ease ${delay}s both`}}><div style={{fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:accent,marginBottom:"10px",fontFamily:"'Oswald',sans-serif",fontWeight:600}}>{icon} {title}</div><div style={{color:"#ccc",fontSize:"14px",lineHeight:"1.7",fontFamily:"'Source Sans 3',sans-serif"}}>{children}</div></div>);}

function AlbumItem({a,accent,bandName,albumCache,setAlbumCache}){
  const key=`${bandName}|||${a.title}`.toLowerCase();
  const cached=albumCache[key];
  const[open,setOpen]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const toggle=async()=>{if(open){setOpen(false);return;}setOpen(true);if(cached)return;setLoading(true);setError("");try{const data=await fetchAlbumDetails(bandName,a.title);setAlbumCache(prev=>({...prev,[key]:data}));}catch(e){setError(e.message);}setLoading(false);};
  return(<div style={{marginBottom:"4px"}}>
    <div onClick={toggle} style={{cursor:"pointer",padding:"10px 10px 10px 24px",borderRadius:"4px",background:open?"rgba(255,255,255,0.03)":"transparent",position:"relative",transition:"background 0.15s"}}>
      <span style={{color:accent,position:"absolute",left:"6px",top:"12px",fontWeight:700,fontSize:"12px",transition:"transform 0.2s",display:"inline-block",transform:open?"rotate(90deg)":"rotate(0deg)"}}>▶</span>
      <strong style={{color:"#fff"}}>{a.title}</strong> <span style={{color:"#555"}}>({a.year})</span> — {a.note}
      <div style={{display:"flex",gap:"16px",marginTop:"4px",fontSize:"12px",color:"#666",flexWrap:"wrap"}}>
        {a.producer&&<span>Producer: <span style={{color:"#999"}}>{a.producer}</span></span>}
        {a.studio&&<span>Studio: <span style={{color:"#999"}}>{a.studio}</span></span>}
        {a.tuning&&<span>Tuning: <span style={{color:"#999"}}>{a.tuning}</span></span>}
      </div>
    </div>
    {open&&<div style={{marginLeft:"24px",marginTop:"4px",marginBottom:"12px",animation:"slideUp 0.2s ease"}}>
      {loading&&<div style={{padding:"16px",textAlign:"center"}}><div style={{width:"24px",height:"24px",border:"2px solid #222",borderTop:`2px solid ${accent}`,borderRadius:"50%",margin:"0 auto 8px",animation:"spin .8s linear infinite"}}/><div style={{color:"#666",fontSize:"12px",fontFamily:"'Oswald',sans-serif",letterSpacing:"2px"}}>LOADING TRACKLIST...</div></div>}
      {error&&<div style={{color:"#c41e1e",fontSize:"13px",padding:"8px"}}>Could not load tracklist.</div>}
      {cached&&<div>
        {cached.lineup?.length>0&&<div style={{marginBottom:"12px",padding:"10px",background:"rgba(10,10,10,0.5)",borderRadius:"4px",border:"1px solid #1a1a1a"}}>
          <div style={{color:accent,fontSize:"10px",letterSpacing:"2px",fontFamily:"'Oswald',sans-serif",marginBottom:"6px"}}>LINEUP</div>
          {cached.lineup.map((l,j)=><div key={j} style={{fontSize:"12px",color:"#999",marginBottom:"2px"}}><span style={{color:"#ccc"}}>{l.name}</span> — {l.instrument}</div>)}
          {cached.guestMusicians?.filter(g=>g.name).length>0&&<div style={{marginTop:"6px",paddingTop:"6px",borderTop:"1px solid #1a1a1a"}}>{cached.guestMusicians.map((g,j)=><div key={j} style={{fontSize:"12px",color:"#777"}}><span style={{color:"#999"}}>{g.name}</span> — {g.contribution}</div>)}</div>}
        </div>}
        {cached.albumNotes&&<div style={{fontSize:"13px",color:"#888",marginBottom:"12px",padding:"8px 10px",background:"rgba(10,10,10,0.3)",borderRadius:"4px",fontStyle:"italic"}}>{cached.albumNotes}</div>}
        <div style={{border:"1px solid #1a1a1a",borderRadius:"4px",overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"36px 1fr 50px",padding:"6px 10px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid #1a1a1a"}}><span style={{color:"#555",fontSize:"10px",fontFamily:"'Oswald',sans-serif"}}>#</span><span style={{color:"#555",fontSize:"10px",fontFamily:"'Oswald',sans-serif"}}>TRACK</span><span style={{color:"#555",fontSize:"10px",fontFamily:"'Oswald',sans-serif",textAlign:"right"}}>TIME</span></div>
          {cached.tracks?.map((tr,j)=><div key={j} style={{borderBottom:j<cached.tracks.length-1?"1px solid #111":"none"}}>
            <div style={{display:"grid",gridTemplateColumns:"36px 1fr 50px",padding:"8px 10px",alignItems:"center"}}><span style={{color:"#555",fontSize:"13px"}}>{tr.number}</span><span style={{color:"#ddd",fontSize:"13px"}}>{tr.title}</span><span style={{color:"#555",fontSize:"12px",textAlign:"right"}}>{tr.duration}</span></div>
            <div style={{padding:"0 10px 8px 46px",fontSize:"12px"}}>
              {tr.writers&&<div style={{color:"#666"}}><span style={{color:"#555"}}>Written by:</span> {tr.writers}</div>}
              {tr.personnel&&<div style={{color:"#666",marginTop:"2px"}}><span style={{color:"#555"}}>Personnel:</span> {tr.personnel}</div>}
              {tr.notes&&<div style={{color:"#777",marginTop:"2px",fontStyle:"italic"}}>{tr.notes}</div>}
            </div>
          </div>)}
        </div>
        {cached.length&&<div style={{textAlign:"right",fontSize:"12px",color:"#555",marginTop:"6px"}}>Total: {cached.length}</div>}
      </div>}
    </div>}
  </div>);
}

function GenreNode({node,depth,accent,expanded,toggleExpand,onBandClick}){
  const has=node.children?.length>0;const open=expanded[node.id];
  return(<div style={{marginLeft:depth*20}}>
    <div onClick={()=>has&&toggleExpand(node.id)} style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"8px 12px",marginBottom:"4px",borderRadius:"4px",background:depth===0?"rgba(255,255,255,0.05)":"transparent",border:`1px solid ${depth===0?"#333":"transparent"}`,cursor:has?"pointer":"default"}}>
      {has?<span style={{color:accent,fontSize:"12px",display:"inline-block",transform:open?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s",marginTop:"3px"}}>▶</span>:<span style={{color:"#333",fontSize:"12px",marginTop:"3px"}}>•</span>}
      <div><span style={{color:"#fff",fontFamily:"'Oswald',sans-serif",fontSize:"14px",letterSpacing:"1px"}}>{node.label}</span><span style={{color:"#555",fontSize:"11px",marginLeft:"8px"}}>{node.year}</span>
        <div style={{display:"flex",flexWrap:"wrap",gap:"2px",marginTop:"4px"}}>{(node.bands||[]).map((b,i)=><span key={i}><span onClick={e=>{e.stopPropagation();onBandClick(b);}} style={{color:"#888",fontSize:"12px",cursor:"pointer",textDecoration:"underline",textDecorationColor:"#444",textUnderlineOffset:"2px"}} onMouseEnter={e=>e.target.style.color=accent} onMouseLeave={e=>e.target.style.color="#888"}>{b}</span>{i<node.bands.length-1&&<span style={{color:"#444",fontSize:"12px"}}>, </span>}</span>)}</div>
      </div>
    </div>
    {open&&has&&node.children.map(c=><GenreNode key={c.id} node={c} depth={depth+1} accent={accent} expanded={expanded} toggleExpand={toggleExpand} onBandClick={onBandClick}/>)}
  </div>);
}

function VersusMode({bandCache,accent}){const[left,setLeft]=useState("");const[right,setRight]=useState("");const names=Object.values(bandCache).map(b=>b.name);const bL=bandCache[left.toLowerCase()],bR=bandCache[right.toLowerCase()];const ss={flex:1,minWidth:"140px",background:"#151515",border:"1px solid #333",borderRadius:"4px",padding:"10px 14px",color:"#eee",fontSize:"14px",fontFamily:"'Source Sans 3',sans-serif",outline:"none",cursor:"pointer",appearance:"none"};return(<div><div style={{color:"#555",fontSize:"13px",marginBottom:"16px"}}>Pick two bands to compare.</div><div style={{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap",alignItems:"center"}}><select value={left} onChange={e=>setLeft(e.target.value)} style={ss}><option value="">Band 1...</option>{names.map(n=><option key={n} value={n}>{n}</option>)}</select><div style={{color:accent,fontFamily:"'Metal Mania',system-ui",fontSize:"24px"}}>VS</div><select value={right} onChange={e=>setRight(e.target.value)} style={ss}><option value="">Band 2...</option>{names.map(n=><option key={n} value={n}>{n}</option>)}</select></div>{bL&&bR&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>{[bL,bR].map((b,i)=>(<div key={i} style={{background:"#111",border:"1px solid #282828",borderRadius:"4px",padding:"16px",animation:`slideUp 0.3s ease ${i*0.1}s both`}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:"20px",color:"#fff",textTransform:"uppercase",letterSpacing:"2px",marginBottom:"12px",borderBottom:`2px solid ${accent}`,paddingBottom:"8px"}}>{b.name}</div>{[["Country",b.country],["Years",b.years],["Status",b.status],["Genre",b.genre],["Albums",String(b.albums?.length||0)]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:"6px",fontSize:"13px"}}><span style={{color:"#666"}}>{l}</span><span style={{color:"#ccc"}}>{v}</span></div>)}<div style={{marginTop:"12px"}}><div style={{color:"#555",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Oswald',sans-serif",marginBottom:"6px"}}>Key Albums</div>{(b.albums||[]).slice(0,3).map((a,j)=><div key={j} style={{color:"#999",fontSize:"12px",marginBottom:"2px"}}><span style={{color:"#fff"}}>{a.title}</span> <span style={{color:"#555"}}>({a.year})</span></div>)}</div></div>))}</div>}</div>);}

function InfluenceMap({bandCache,accent,onSearch}){
  const[input,setInput]=useState("");
  const[band,setBand]=useState(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const doSearch=async(name)=>{const q=(name||input).trim();if(!q)return;setInput(q);setError("");const key=q.toLowerCase();if(bandCache[key]){setBand(bandCache[key]);return;}setLoading(true);setBand(null);try{const data=await searchBandBackend(q);if(data.error==="not_found"){setError("Band not found.");} else{setBand(data);if(onSearch)onSearch(key,data);}}catch(e){setError(e.message);}setLoading(false);};
  return(<div>
    <div style={{color:"#555",fontSize:"13px",marginBottom:"16px"}}>Search any band to see who inspired them and who they influenced.</div>
    <div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")doSearch();}} placeholder="Type a band name..." style={{flex:1,background:"#151515",border:"1px solid #333",borderRadius:"4px",padding:"10px 14px",color:"#eee",fontSize:"14px",fontFamily:"'Source Sans 3',sans-serif",outline:"none"}}/>
      <button onClick={()=>doSearch()} disabled={loading} style={{background:accent,color:"#fff",border:"none",borderRadius:"4px",padding:"10px 20px",fontFamily:"'Oswald',sans-serif",fontSize:"13px",letterSpacing:"2px",cursor:loading?"wait":"pointer"}}>{loading?"...":"MAP"}</button>
    </div>
    {error&&<div style={{color:"#c41e1e",fontSize:"13px",marginBottom:"8px"}}>{error}</div>}
    {loading&&<div style={{textAlign:"center",padding:"30px"}}><div style={{width:"30px",height:"30px",border:"2px solid #222",borderTop:`2px solid ${accent}`,borderRadius:"50%",margin:"0 auto",animation:"spin .8s linear infinite"}}/></div>}
    {band?.influences&&<div style={{marginTop:"12px",animation:"slideUp 0.3s ease"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
        <div style={{color:"#555",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Oswald',sans-serif"}}>Inspired by</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px",justifyContent:"center",marginBottom:"12px"}}>{(band.influences.inspired_by||[]).map((b,i)=><span key={i} onClick={()=>doSearch(b)} style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:"3px",padding:"4px 12px",fontSize:"12px",color:"#999",fontFamily:"'Oswald',sans-serif",cursor:"pointer"}}>{b}</span>)}</div>
        <div style={{fontSize:"18px",color:"#555"}}>↓</div>
        <div style={{background:accent,color:"#fff",padding:"10px 24px",borderRadius:"4px",fontFamily:"'Oswald',sans-serif",fontSize:"18px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",boxShadow:`0 0 30px ${accent}44`}}>{band.name}</div>
        <div style={{fontSize:"18px",color:"#555"}}>↓</div>
        <div style={{color:"#555",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Oswald',sans-serif",marginTop:"4px"}}>Influenced</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px",justifyContent:"center"}}>{(band.influences.influenced||[]).map((b,i)=><span key={i} onClick={()=>doSearch(b)} style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:"3px",padding:"4px 12px",fontSize:"12px",color:"#999",fontFamily:"'Oswald',sans-serif",cursor:"pointer"}}>{b}</span>)}</div>
      </div>
    </div>}
  </div>);
}

const TABS=[{id:"search",label:"Search"},{id:"genres",label:"Genre Tree"},{id:"versus",label:"Versus"},{id:"influence",label:"Influences"}];

function App(){
  const[theme,setTheme]=useState("blood");const[tab,setTab]=useState("search");const[query,setQuery]=useState("");const[result,setResult]=useState(null);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const[notFound,setNotFound]=useState(false);const[suggestions,setSuggestions]=useState([]);const[showSug,setShowSug]=useState(false);const[genreExp,setGenreExp]=useState({"roots":true});const[bandCache,setBandCache]=useState({...LOCAL_BANDS});const[albumCache,setAlbumCache]=useState({});const inputRef=useRef(null);const t=THEMES[theme];const allNames=Object.values(bandCache).map(b=>b.name);

  const search=async(bn)=>{const q=(bn||query).trim();if(!q)return;setQuery(q);setShowSug(false);setError("");setNotFound(false);setTab("search");const key=q.toLowerCase();if(bandCache[key]){setResult(bandCache[key]);window.scrollTo({top:0,behavior:'smooth'});return;}setLoading(true);setResult(null);try{const data=await searchBandBackend(q);if(data.error==="not_found"){setNotFound(true);}else{setBandCache(prev=>({...prev,[key]:data}));setResult(data);}}catch(e){setError(e.message||"Search failed.");}setLoading(false);window.scrollTo({top:0,behavior:'smooth'});};
  const handleInput=(v)=>{setQuery(v);if(v.length>=2){setSuggestions(getSuggestions(v,allNames));setShowSug(true);}else setShowSug(false);};
  const addToCache=(key,data)=>{setBandCache(prev=>({...prev,[key]:data}));};

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
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:"10px",letterSpacing:"5px",textTransform:"uppercase",color:"#555",marginTop:"4px"}}>AI-Powered • From Blues to Brutal Death • No Posers</div>
          </div>
          <button onClick={()=>setTheme(theme==="blood"?"frost":"blood")} style={{background:"#151515",border:`1px solid ${t.accent}`,borderRadius:"4px",padding:"6px 14px",color:t.accent,fontSize:"11px",cursor:"pointer",fontFamily:"'Oswald',sans-serif",letterSpacing:"2px",textTransform:"uppercase"}}>{THEMES[theme==="blood"?"frost":"blood"].name}</button>
        </div>
        <div style={{display:"flex",gap:"4px",marginBottom:"24px",borderBottom:"1px solid #222",paddingBottom:"12px",overflowX:"auto"}}>
          {TABS.map(tb=><div key={tb.id} className="tt" onClick={()=>setTab(tb.id)} style={{padding:"8px 16px",borderRadius:"4px 4px 0 0",fontFamily:"'Oswald',sans-serif",fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",color:tab===tb.id?"#fff":"#555",whiteSpace:"nowrap",background:tab===tb.id?`${t.accent}22`:"transparent",borderBottom:tab===tb.id?`2px solid ${t.accent}`:"2px solid transparent"}}>{tb.label}</div>)}
        </div>

        {tab==="search"&&<div>
          <div style={{position:"relative",marginBottom:"16px"}}>
            <div style={{display:"flex",gap:"8px"}}>
              <input ref={inputRef} className="si" value={query} onChange={e=>handleInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")search()}} onFocus={()=>query.length>=2&&setShowSug(true)} onBlur={()=>setTimeout(()=>setShowSug(false),200)} placeholder="Search any band or artist..." style={{flex:1,background:"#151515",border:"1px solid #333",borderRadius:"4px",padding:"14px 18px",color:"#eee",fontSize:"16px",fontFamily:"'Source Sans 3',sans-serif"}}/>
              <button onClick={()=>search()} disabled={loading} style={{background:t.accent,color:"#fff",border:"none",borderRadius:"4px",padding:"14px 24px",fontFamily:"'Oswald',sans-serif",fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase",cursor:loading?"wait":"pointer",fontWeight:600}}>{loading?"...":"SEARCH"}</button>
            </div>
            {showSug&&suggestions.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:"90px",zIndex:10,background:"#151515",border:"1px solid #333",borderRadius:"0 0 4px 4px"}}>{suggestions.map((s,i)=><div key={i} className="sg" onMouseDown={()=>search(s)} style={{padding:"10px 18px",fontSize:"14px",color:"#aaa",borderBottom:i<suggestions.length-1?"1px solid #222":"none"}}>{s}</div>)}</div>}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"24px"}}>{allNames.map(b=><span key={b} className="tb" onClick={()=>search(b)} style={{background:result?.name===b?t.accent:"#1a1a1a",border:`1px solid ${result?.name===b?t.accent:"#2a2a2a"}`,borderRadius:"3px",padding:"5px 12px",fontSize:"12px",color:result?.name===b?"#fff":"#777",fontFamily:"'Oswald',sans-serif",letterSpacing:"1px"}}>{b}</span>)}</div>
          {loading&&<div style={{textAlign:"center",padding:"60px 0"}}><div style={{width:"40px",height:"40px",border:"3px solid #222",borderTop:`3px solid ${t.accent}`,borderRadius:"50%",margin:"0 auto 20px",animation:"spin .8s linear infinite"}}/><div style={{fontFamily:"'Oswald',sans-serif",letterSpacing:"3px",fontSize:"12px",textTransform:"uppercase",color:"#666"}}>Digging through the archives...</div></div>}
          {error&&<div style={{background:"rgba(196,30,30,0.1)",border:"1px solid #c41e1e",borderRadius:"4px",padding:"16px",color:"#c41e1e",fontSize:"14px",marginBottom:"16px"}}>Could not find that band. Try another search.</div>}
          {notFound&&!loading&&<div style={{background:t.accentBg,border:"1px solid #333",borderRadius:"4px",padding:"24px",textAlign:"center",animation:"slideUp .3s ease"}}><div style={{fontSize:"32px",marginBottom:"8px"}}>🤘</div><div style={{color:"#888",fontSize:"14px",fontFamily:"'Oswald',sans-serif"}}><strong style={{color:"#eee"}}>"{query}"</strong> — not recognized.</div></div>}
          {result&&!loading&&<div key={result.name} style={{animation:"slideUp .3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"20px",paddingBottom:"12px",borderBottom:`2px solid ${t.accent}`,flexWrap:"wrap",gap:"8px"}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:"28px",fontWeight:700,color:"#fff",textTransform:"uppercase",letterSpacing:"2px"}}>{result.name}</div><div style={{display:"flex",gap:"12px",fontSize:"12px",color:"#555",fontFamily:"'Oswald',sans-serif"}}>{result.country&&<span>{result.country}</span>}{result.years&&<span>{result.years}</span>}{result.status&&<span style={{color:result.status==="Active"?"#4a4":"#666"}}>{result.status}</span>}</div></div>
            {result.overview&&<SectionCard title="Overview" icon="⚡" delay={0.05} accent={t.accent}>{result.overview}</SectionCard>}
            {result.genreDetail&&<SectionCard title="Genre & Style" icon="🎸" delay={0.08} accent={t.accent}>{result.genreDetail}</SectionCard>}
            {result.scene&&<SectionCard title="Scene & Context" icon="📍" delay={0.1} accent={t.accent}>{result.scene}</SectionCard>}
            {result.historicalContext&&<SectionCard title="Historical Context" icon="📜" delay={0.12} accent={t.accent}>{result.historicalContext}</SectionCard>}
            {result.startHere&&<SectionCard title="Start Here" icon="▶" delay={0.14} accent={t.accent}><div style={{marginBottom:"8px"}}><span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"11px",letterSpacing:"2px"}}>NEW TO THIS BAND</span><div style={{marginTop:"4px"}}>{result.startHere.newcomer}</div></div><div><span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"11px",letterSpacing:"2px"}}>GOING DEEPER</span><div style={{marginTop:"4px"}}>{result.startHere.deep}</div></div></SectionCard>}
            {result.albums?.length>0&&<SectionCard title="Discography — Click to Expand" icon="💿" delay={0.16} accent={t.accent}>{result.albums.map((a,i)=><AlbumItem key={i} a={a} accent={t.accent} bandName={result.name} albumCache={albumCache} setAlbumCache={setAlbumCache}/>)}</SectionCard>}
            {result.members?.length>0&&<SectionCard title="Members & Gear" icon="🤘" delay={0.2} accent={t.accent}>{result.members.map((m,i)=><div key={i} className="mc" style={{background:"rgba(15,15,15,0.8)",border:"1px solid #222",borderRadius:"4px",padding:"12px 14px",marginBottom:"10px",transition:"border-color .2s"}}><div style={{marginBottom:"4px"}}><strong style={{color:"#fff",fontSize:"15px"}}>{m.name}</strong><span style={{color:t.accent,fontSize:"11px",marginLeft:"8px",fontFamily:"'Oswald',sans-serif",letterSpacing:"1px"}}>{m.role}</span></div><div style={{color:"#999",fontSize:"13px",lineHeight:"1.6"}}>{m.contribution}</div>{m.gear&&<div style={{color:"#777",fontSize:"12px",marginTop:"6px",paddingTop:"6px",borderTop:"1px solid #1a1a1a"}}><span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"10px",letterSpacing:"2px"}}>GEAR</span> <span style={{marginLeft:"8px"}}>{m.gear}</span></div>}</div>)}</SectionCard>}
            {result.sideProjects?.length>0&&<SectionCard title="Side Projects" icon="🔀" delay={0.22} accent={t.accent}>{result.sideProjects.map((sp,i)=><div key={i} style={{marginBottom:"8px",paddingLeft:"14px",position:"relative"}}><span style={{color:t.accent,position:"absolute",left:0,fontWeight:700}}>›</span><strong style={{color:"#fff"}}>{sp.member}</strong> <span style={{color:"#999"}}>— {sp.projects}</span></div>)}</SectionCard>}
            {result.deepCuts?.length>0&&<SectionCard title="Deep Cuts" icon="💎" delay={0.24} accent={t.accent}>{result.deepCuts.map((dc,i)=><div key={i} style={{marginBottom:"10px",paddingLeft:"14px",position:"relative"}}><span style={{color:t.accent,position:"absolute",left:0,fontWeight:700}}>›</span><strong style={{color:"#fff"}}>{dc.track}</strong> <span style={{color:"#555"}}>from {dc.album}</span><div style={{color:"#999",fontSize:"13px",marginTop:"2px"}}>{dc.why}</div></div>)}</SectionCard>}
            {result.moodPicks&&<SectionCard title="Mood Picks" icon="🎧" delay={0.26} accent={t.accent}>{[["aggressive","🔥 Aggression"],["atmospheric","🌫 Atmosphere"],["technical","⚙ Technical"],["melancholic","🖤 Introspective"]].map(([k,l])=>result.moodPicks[k]&&<div key={k} style={{marginBottom:"8px"}}><span style={{color:t.accent,fontSize:"12px"}}>{l}:</span> <span style={{color:"#ccc",marginLeft:"4px"}}>{result.moodPicks[k]}</span></div>)}</SectionCard>}
            {result.timeline?.length>0&&<SectionCard title="Timeline" icon="📅" delay={0.28} accent={t.accent}><div style={{borderLeft:`2px solid ${t.accent}33`,paddingLeft:"16px",marginLeft:"4px"}}>{result.timeline.map((ev,i)=><div key={i} style={{marginBottom:"10px",position:"relative"}}><div style={{position:"absolute",left:"-22px",top:"4px",width:"10px",height:"10px",borderRadius:"50%",background:t.accent,border:"2px solid #0a0a0a"}}/><span style={{color:t.accent,fontFamily:"'Oswald',sans-serif",fontSize:"13px",fontWeight:600}}>{ev.year}</span><div style={{color:"#999",fontSize:"13px",marginTop:"2px"}}>{ev.event}</div></div>)}</div></SectionCard>}
            {result.similar?.length>0&&<SectionCard title="Similar Bands" icon="→" delay={0.3} accent={t.accent}>{result.similar.map((s,i)=><span key={i} className="tb" onClick={()=>search(s)} style={{display:"inline-block",background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:"3px",padding:"4px 12px",fontSize:"12px",marginRight:"6px",marginBottom:"6px",color:"#fff",cursor:"pointer"}}>{s}</span>)}</SectionCard>}
            {result.controversies?.length>0&&<SectionCard title="Controversies" icon="⚠" delay={0.32} accent={t.accent}>{result.controversies.map((c,i)=><div key={i} style={{marginBottom:i<result.controversies.length-1?"10px":"0",paddingBottom:i<result.controversies.length-1?"10px":"0",borderBottom:i<result.controversies.length-1?"1px solid #1a1a1a":"none",paddingLeft:"14px",position:"relative"}}><span style={{color:t.accent,position:"absolute",left:0}}>!</span>{c}</div>)}</SectionCard>}
            {result.funfacts?.length>0&&<SectionCard title="Fun Facts" icon="💀" delay={0.34} accent={t.accent}>{result.funfacts.map((f,i)=><div key={i} style={{marginBottom:i<result.funfacts.length-1?"12px":"0",paddingBottom:i<result.funfacts.length-1?"12px":"0",borderBottom:i<result.funfacts.length-1?"1px solid #1a1a1a":"none",paddingLeft:"18px",position:"relative"}}><span style={{color:t.accent,position:"absolute",left:0,fontFamily:"'Oswald',sans-serif",fontSize:"11px"}}>0{i+1}</span>{f}</div>)}</SectionCard>}
          </div>}
        </div>}

        {tab==="genres"&&<div style={{animation:"slideUp .3s ease"}}><div style={{color:"#555",fontSize:"13px",marginBottom:"16px"}}>The complete evolution of heavy music — from Delta blues to modern metal. Click ▶ to expand. Click any band name to look them up.</div><GenreNode node={GENRE_TREE} depth={0} accent={t.accent} expanded={genreExp} toggleExpand={id=>setGenreExp(p=>({...p,[id]:!p[id]}))} onBandClick={b=>search(b)}/></div>}
        {tab==="versus"&&<div style={{animation:"slideUp .3s ease"}}><VersusMode bandCache={bandCache} accent={t.accent}/></div>}
        {tab==="influence"&&<div style={{animation:"slideUp .3s ease"}}><InfluenceMap bandCache={bandCache} accent={t.accent} onSearch={(k,d)=>addToCache(k,d)}/></div>}

        <div style={{marginTop:"60px",textAlign:"center",fontSize:"10px",color:"#222",letterSpacing:"2px",fontFamily:"'Oswald',sans-serif",textTransform:"uppercase"}}>Metal Encyclopedia • AI-Powered</div>
      </div>
    </div>
  );
}
export default App;
