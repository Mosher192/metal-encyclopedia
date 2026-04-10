import React, { useState, useRef } from "react";

const THEMES = { 
  blood: { accent: "#c41e1e", accentGlow: "rgba(196,30,30,0.4)", accentBg: "rgba(196,30,30,0.08)", name: "Blood" }, 
  frost: { accent: "#1e7ec4", accentGlow: "rgba(30,126,196,0.4)", accentBg: "rgba(30,126,196,0.08)", name: "Frost" } 
};

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
    </div>
    {open&&<div style={{marginLeft:"24px",marginTop:"4px",marginBottom:"12px",animation:"slideUp 0.2s ease"}}>
      {loading&&<div style={{padding:"16px",textAlign:"center"}}><div style={{width:"24px",height:"24px",border:"2px solid #222",borderTop:`2px solid ${accent}`,borderRadius:"50%",margin:"0 auto 8px",animation:"spin .8s linear infinite"}}/><div style={{color:"#666",fontSize:"12px",fontFamily:"'Oswald',sans-serif",letterSpacing:"2px"}}>LOADING...</div></div>}
      {cached&&<div style={{fontSize:"13px",color:"#aaa",padding:"8px",background:"rgba(0,0,0,0.2)",borderRadius:"4px",border:"1px solid #222"}}>
          {cached.tracks?.map((tr, idx) => (
            <div key={idx} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:idx < cached.tracks.length-1 ? "1px solid #111" : "none"}}>
              <span>{tr.number}. {tr.title}</span>
              <span style={{color:"#555"}}>{tr.duration}</span>
            </div>
          ))}
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

function VersusMode({bandCache,accent,onSearch}){
  const[leftQ,setLeftQ]=useState("");const[rightQ,setRightQ]=useState("");
  const[leftBand,setLeftBand]=useState(null);const[rightBand,setRightBand]=useState(null);
  const[leftLoading,setLeftLoading]=useState(false);const[rightLoading,setRightLoading]=useState(false);

  const doSearch=async(side,name)=>{
    const q=name.trim();if(!q)return;
    const key=q.toLowerCase();
    const setB=side==="left"?setLeftBand:setRightBand;
    const setL=side==="left"?setLeftLoading:setRightLoading;
    if(bandCache[key]){setB(bandCache[key]);return;}
    setL(true);try{const data=await searchBandBackend(q);setB(data);if(onSearch)onSearch(key,data);}catch(e){}setL(false);
  };

  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"12px",alignItems:"center",marginBottom:"20px"}}>
      <input value={leftQ} onChange={e=>setLeftQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch("left",leftQ)} placeholder="Band 1..." style={{background:"#151515",border:"1px solid #333",padding:"10px",color:"#fff",borderRadius:"4px"}}/>
      <div style={{color:accent,fontFamily:"'Metal Mania'",fontSize:"24px"}}>VS</div>
      <input value={rightQ} onChange={e=>setRightQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch("right",rightQ)} placeholder="Band 2..." style={{background:"#151515",border:"1px solid #333",padding:"10px",color:"#fff",borderRadius:"4px"}}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
      <div style={{background:"#111",padding:"15px",borderRadius:"4px",border:"1px solid #222"}}>
        {leftBand ? <div><h3 style={{color:accent,fontFamily:"'Oswald'"}}>{leftBand.name}</h3><p style={{fontSize:"12px"}}>{leftBand.genre}</p></div> : "..."}
      </div>
      <div style={{background:"#111",padding:"15px",borderRadius:"4px",border:"1px solid #222"}}>
        {rightBand ? <div><h3 style={{color:accent,fontFamily:"'Oswald'"}}>{rightBand.name}</h3><p style={{fontSize:"12px"}}>{rightBand.genre}</p></div> : "..."}
      </div>
    </div>
  </div>);
}

function InfluenceMap({bandCache,accent,onSearch}){
  const[input,setInput]=useState("");const[band,setBand]=useState(null);
  const doSearch=async()=>{const q=input.trim();if(!q)return;if(bandCache[q.toLowerCase()]){setBand(bandCache[q.toLowerCase()]);return;}try{const d=await searchBandBackend(q);setBand(d);onSearch(q.toLowerCase(),d);}catch(e){}};
  return(<div>
    <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()} placeholder="Map influences..." style={{flex:1,background:"#151515",border:"1px solid #333",padding:"10px",color:"#fff",borderRadius:"4px"}}/>
      <button onClick={doSearch} style={{background:accent,border:"none",padding:"10px 20px",color:"#fff",borderRadius:"4px",fontFamily:"'Oswald'"}}>GO</button>
    </div>
    {band?.influences && <div style={{textAlign:"center"}}>
       <div style={{color:"#555",fontSize:"10px"}}>INSPIRED BY</div>
       <div style={{display:"flex",justifyContent:"center",gap:"8px",margin:"10px 0"}}>{band.influences.inspired_by?.map(b=><span key={b} style={{fontSize:"12px",color:"#888"}}>{b}</span>)}</div>
       <div style={{fontSize:"24px",color:accent,fontFamily:"'Metal Mania'"}}>{band.name}</div>
       <div style={{color:"#555",fontSize:"10px",marginTop:"10px"}}>INFLUENCED</div>
       <div style={{display:"flex",justifyContent:"center",gap:"8px",margin:"10px 0"}}>{band.influences.influenced?.map(b=><span key={b} style={{fontSize:"12px",color:"#888"}}>{b}</span>)}</div>
    </div>}
  </div>);
}

const TABS=[{id:"search",label:"Search"},{id:"genres",label:"Genre Tree"},{id:"versus",label:"Versus"},{id:"influence",label:"Influences"}];

export default function App(){
  const[theme,setTheme]=useState("blood");const[tab,setTab]=useState("search");const[query,setQuery]=useState("");const[result,setResult]=useState(null);const[loading,setLoading]=useState(false);const[notFound,setNotFound]=useState(false);const[suggestions,setSuggestions]=useState([]);const[showSug,setShowSug]=useState(false);const[genreExp,setGenreExp]=useState({"roots":true});const[bandCache,setBandCache]=useState({...LOCAL_BANDS});const[albumCache,setAlbumCache]=useState({});const t=THEMES[theme];const allNames=Object.values(bandCache).map(b=>b.name);

  const search=async(bn)=>{const q=(bn||query).trim();if(!q)return;setQuery(q);setShowSug(false);setNotFound(false);setTab("search");const key=q.toLowerCase();if(bandCache[key]){setResult(bandCache[key]);return;}setLoading(true);setResult(null);try{const data=await searchBandBackend(q);if(data.error==="not_found"){setNotFound(true);}else{setBandCache(prev=>({...prev,[key]:data}));setResult(data);}}catch(e){}setLoading(false);};
  const handleInput=(v)=>{setQuery(v);if(v.length>=2){setSuggestions(getSuggestions(v,allNames));setShowSug(true);}else setShowSug(false);};
  const handleRandom=()=>{const b=["Death","Slayer","Bathory","Carcass","Mayhem","Emperor"];search(b[Math.floor(Math.random()*b.length)]);};

  return(
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#eee",fontFamily:"'Source Sans 3',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&family=Metal+Mania&display=swap');
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
      <div style={{maxWidth:"780px",margin:"0 auto",padding:"32px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"32px"}}>
          <div>
            <h1 style={{fontFamily:"'Metal Mania'",fontSize:"42px",color:t.accent,margin:0}}>METAL ENCYCLOPEDIA</h1>
            <p style={{fontSize:"10px",letterSpacing:"3px",color:"#555"}}>AI-POWERED ARCHIVE</p>
          </div>
          <div style={{display:"flex",gap:"10px"}}>
             <button onClick={handleRandom} style={{background:"#151515",border:`1px solid ${t.accent}`,color:t.accent,padding:"8px 12px",borderRadius:"4px",cursor:"pointer",fontSize:"18px"}}>🤘</button>
             <button onClick={()=>setTheme(theme==="blood"?"frost":"blood")} style={{background:"#151515",border:`1px solid ${t.accent}`,color:t.accent,padding:"8px 12px",borderRadius:"4px",cursor:"pointer",fontFamily:"'Oswald'",fontSize:"12px"}}>{theme.toUpperCase()}</button>
          </div>
        </div>

        <div style={{display:"flex",gap:"10px",marginBottom:"24px",borderBottom:"1px solid #222",paddingBottom:"12px"}}>
          {TABS.map(tb=><div key={tb.id} onClick={()=>setTab(tb.id)} style={{cursor:"pointer",fontFamily:"'Oswald'",fontSize:"13px",color:tab===tb.id?t.accent:"#555",borderBottom:tab===tb.id?`2px solid ${t.accent}`:"none",paddingBottom:"10px"}}>{tb.label}</div>)}
        </div>

        {tab==="search"&&<div>
          <div style={{position:"relative",display:"flex",gap:"8px",marginBottom:"24px"}}>
            <input value={query} onChange={e=>handleInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder="Search band..." style={{flex:1,background:"#151515",border:"1px solid #333",padding:"14px",color:"#fff",borderRadius:"4px"}}/>
            <button onClick={()=>search()} style={{background:t.accent,border:"none",padding:"0 24px",color:"#fff",borderRadius:"4px",fontFamily:"'Oswald'"}}>SEARCH</button>
            {showSug&&suggestions.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#151515",zIndex:10,border:"1px solid #333"}}>{suggestions.map(s=><div key={s} onMouseDown={()=>search(s)} style={{padding:"10px",cursor:"pointer",borderBottom:"1px solid #222"}}>{s}</div>)}</div>}
          </div>

          {loading&&<div style={{textAlign:"center",padding:"40px"}}><div style={{width:"30px",height:"30px",border:"3px solid #222",borderTop:`3px solid ${t.accent}`,borderRadius:"50%",margin:"0 auto",animation:"spin .8s linear infinite"}}/></div>}
          {result&&!loading&&<div style={{animation:"slideUp 0.3s ease"}}>
              <h2 style={{fontFamily:"'Oswald'",fontSize:"32px",borderBottom:`2px solid ${t.accent}`,display:"inline-block",marginBottom:"20px"}}>{result.name}</h2>
              <SectionCard title="Overview" icon="📖" delay={0.1} accent={t.accent}>{result.overview}</SectionCard>
              <SectionCard title="Discography" icon="💿" delay={0.2} accent={t.accent}>
                {result.albums?.map((a,i)=><AlbumItem key={i} a={a} accent={t.accent} bandName={result.name} albumCache={albumCache} setAlbumCache={setAlbumCache}/>)}
              </SectionCard>
              <div style={{marginTop:"40px",fontSize:"10px",color:"#444",textAlign:"center"}}>AI-GENERATED CONTENT. DATA MAY VARY.</div>
          </div>}
        </div>}

        {tab==="genres"&&<div style={{background:"#111",padding:"20px",borderRadius:"4px"}}><GenreNode node={GENRE_TREE} depth={0} accent={t.accent} expanded={genreExp} toggleExpand={(id)=>setGenreExp(prev=>({...prev,[id]:!prev[id]}))} onBandClick={search}/></div>}
        {tab==="versus"&&<VersusMode bandCache={bandCache} accent={t.accent} onSearch={(k,d)=>setBandCache(p=>({...p,[k]:d}))}/>}
        {tab==="influence"&&<InfluenceMap bandCache={bandCache} accent={t.accent} onSearch={(k,d)=>setBandCache(p=>({...p,[k]:d}))}/>}
      </div>
    </div>
  );
}