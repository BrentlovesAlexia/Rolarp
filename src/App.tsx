import React, { useEffect, useMemo, useState } from 'react';
import {
  User, Home, Shirt, ShoppingBag, CreditCard, Search, Settings, Bell,
  Menu, X, Check, ExternalLink, RefreshCw, Image, Plus, Trash2, Save,
  UserRound, BadgeCheck, Sparkles, History, Wallet, Globe, Pencil
} from 'lucide-react';

type Tab = 'profile'|'avatar'|'inventory'|'marketplace'|'transactions'|'settings';
type Item = { id:string; name:string; image:string; category:string; source:'demo'|'roblox'; price?:string };
type Profile = { username:string; displayName:string; bio:string; robux:number; friends:string; followers:string; following:string; badge:'none'|'plus'|'pro'; userId?:number; avatarUrl?:string; headshotUrl?:string; bannerUrl?:string };
const STORAGE='rolarp-v2';
const thumb=(id:string)=>`https://thumbnails.roblox.com/v1/assets?assetIds=${encodeURIComponent(id)}&size=420x420&format=Png`;
const assetThumb=(id:string)=>`https://www.roblox.com/asset-thumbnail/image?assetId=${encodeURIComponent(id)}&width=420&height=420&format=png`;
const starter:Profile={username:'matelarps',displayName:'matelarps',bio:'yoo zlarp',robux:55488,friends:'1',followers:'5.6M',following:'0',badge:'pro'};
const starterItems:Item[]=[
 {id:'1285307',name:'Sparkle Time Fedora',image:assetThumb('1285307'),category:'Head',source:'demo',price:'Demo item'},
 {id:'215718515',name:'Fiery Horns of the Nether',image:assetThumb('215718515'),category:'Accessory',source:'demo',price:'Demo item'},
 {id:'398633812',name:'Checkered Shirt',image:assetThumb('398633812'),category:'Clothing',source:'demo',price:'Free'}
];
const safeLoad=()=>{try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')}catch{return {}}};

export function App(){
 const saved=safeLoad();
 const [tab,setTab]=useState<Tab>('profile');
 const [profile,setProfile]=useState<Profile>(saved.profile||starter);
 const [items,setItems]=useState<Item[]>(saved.items||starterItems);
 const [transactions,setTransactions]=useState<any[]>(saved.transactions||[
  {id:'a',type:'Incoming Robux',details:'Demo stipend',amount:2222,date:new Date().toLocaleDateString()}
 ]);
 const [mode,setMode]=useState<'simulator'|'roblox'>('simulator');
 const [username,setUsername]=useState('');
 const [lookupBusy,setLookupBusy]=useState(false);
 const [notice,setNotice]=useState('');
 const [edit,setEdit]=useState(false);
 const [assetId,setAssetId]=useState('');
 const [assetName,setAssetName]=useState('');
 const [search,setSearch]=useState('');
 const [catalog,setCatalog]=useState<any[]>([]);
 const [catalogBusy,setCatalogBusy]=useState(false);
 const [mobileMenu,setMobileMenu]=useState(false);
 const [robuxInput,setRobuxInput]=useState('1000');

 useEffect(()=>{localStorage.setItem(STORAGE,JSON.stringify({profile,items,transactions}))},[profile,items,transactions]);
 const say=(s:string)=>{setNotice(s);window.setTimeout(()=>setNotice(''),3500)};
 const nav:[Tab,string,any][]=[
  ['profile','Profile',User],['avatar','Avatar',Shirt],['inventory','Inventory',ShoppingBag],
  ['marketplace','Marketplace',Search],['transactions','Transactions',CreditCard],['settings','Settings',Settings]
 ];
 async function lookupUser(){
  const name=username.trim(); if(!name)return say('Enter a Roblox username first.');
  setLookupBusy(true);
  try{
   const r=await fetch('https://users.roblox.com/v1/usernames/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({usernames:[name],excludeBannedUsers:false})});
   if(!r.ok) throw new Error('Roblox username lookup is unavailable right now.');
   const j=await r.json(); const u=j.data?.[0]; if(!u)throw new Error('No public Roblox account found with that username.');
   const [pr,tr]=await Promise.all([
    fetch(`https://users.roblox.com/v1/users/${u.id}`),
    fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${u.id}&size=420x420&format=Png&isCircular=false`)
   ]);
   const p=pr.ok?await pr.json():{}; const t=tr.ok?await tr.json():{};
   const avatar=t.data?.[0]?.imageUrl||'';
   setProfile(old=>({...old,username:u.name,displayName:p.displayName||u.displayName||u.name,bio:p.description||'',userId:u.id,avatarUrl:avatar,headshotUrl:avatar}));
   setMode('roblox'); setTab('profile'); say(`Loaded public profile: ${u.name}`);
  }catch(e:any){say(e.message||'Could not load this profile.');}
  finally{setLookupBusy(false)}
 }
 async function searchCatalog(){
  if(!search.trim())return;
  setCatalogBusy(true); setCatalog([]);
  try{
   const url=`https://catalog.roblox.com/v1/search/items/details?Keyword=${encodeURIComponent(search)}&Limit=20&SortType=0`;
   const r=await fetch(url); if(!r.ok)throw new Error();
   const j=await r.json(); setCatalog(j.data||[]);
   if(!j.data?.length)say('No catalog results found.');
  }catch{say('Catalog search may be blocked by browser access. Try an item ID instead.')}
  finally{setCatalogBusy(false)}
 }
 function addItem(id:string,name?:string,image?:string){
  if(!/^\d+$/.test(id))return say('Item ID must contain numbers only.');
  const item:Item={id,name:name||`Roblox item ${id}`,image:image||assetThumb(id),category:'Accessory',source:'roblox'};
  setItems(old=>[item,...old.filter(x=>x.id!==id)]); say(`${item.name} added to your demo outfit.`);
 }
 function addRobux(){
  const n=Math.max(0,Math.floor(Number(robuxInput)||0)); if(!n)return;
  setProfile(p=>({...p,robux:p.robux+n}));
  setTransactions(t=>[{id:Date.now().toString(),type:'Incoming Robux',details:'Simulator balance adjustment',amount:n,date:new Date().toLocaleDateString()},...t]);
  say(`${n.toLocaleString()} demo Robux added.`);
 }
 const shownItems=useMemo(()=>items.filter(x=>(x.name+' '+x.id+' '+x.category).toLowerCase().includes(search.toLowerCase())),[items,search]);
 const avatar=profile.avatarUrl||'';
 const TabButton=({id,label,Icon}:any)=><button className={`navitem ${tab===id?'active':''}`} onClick={()=>{setTab(id);setMobileMenu(false)}}><Icon size={18}/><span>{label}</span></button>;
 return <div className="app-shell">
  <header className="topbar">
   <button className="mobile-toggle iconbtn" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Menu"><Menu/></button>
   <button className="brand" onClick={()=>setTab('profile')}>ROLARP</button>
   <nav className="toplinks"><button onClick={()=>setTab('profile')}>Charts</button><button onClick={()=>setTab('marketplace')}>Marketplace</button><button onClick={()=>setTab('avatar')}>Create</button></nav>
   <div className="top-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Rolarp"/></div>
   <button className="balance" onClick={()=>setTab('transactions')}>◉ {profile.robux.toLocaleString()}</button>
  </header>
  <div className="layout">
   <aside className={`sidebar ${mobileMenu?'open':''}`}>
    <div className="side-user"><div className="mini-avatar">{avatar?<img src={avatar}/>:<User/>}</div><div><b>{profile.displayName}</b><small>@{profile.username}</small></div></div>
    {nav.map(([id,label,Icon])=><TabButton key={id} id={id} label={label} Icon={Icon}/>)}
    <div className="side-note"><Sparkles size={17}/><b>Rolarp Studio</b><p>Explore a Roblox-style interface with a real public profile lookup and a customizable demo mode.</p></div>
   </aside>
   <main className="content">
    <div className="modebar"><div><span className={`dot ${mode==='roblox'?'green':''}`}></span><b>{mode==='roblox'?'Roblox public data':'Simulator mode'}</b><small>{mode==='roblox'?'Public account details where available':'Changes are saved on this device'}</small></div><div className="mode-actions"><button className={mode==='simulator'?'selected':''} onClick={()=>setMode('simulator')}>Simulator</button><button className={mode==='roblox'?'selected':''} onClick={()=>setMode('roblox')}>Roblox data</button></div></div>
    {tab==='profile'&&<section className="page">
     <div className="profile-hero">
      <div className="cover"><div className="cover-label">ROLARP PROFILE</div>{avatar&&<img className="cover-avatar" src={avatar} alt="Roblox avatar"/>}</div>
      <div className="profile-main">
       <div className="profile-head"><div className="big-avatar">{avatar?<img src={avatar} alt="Avatar"/>:<div className="avatar-placeholder"><UserRound size={48}/></div>}</div>
        <div className="profile-names"><h1>{profile.displayName} {profile.badge!=='none'&&<BadgeCheck className="verified" size={22}/>}</h1><p>@{profile.username}{profile.userId?` · ID ${profile.userId}`:''}</p></div>
        <div className="profile-buttons"><button className="primary" onClick={()=>setTab('avatar')}>Edit appearance</button><button onClick={()=>setEdit(true)}>Edit profile</button></div>
       </div>
       <div className="stats"><span>{profile.friends} <small>Friends</small></span><span>{profile.followers} <small>Followers</small></span><span>{profile.following} <small>Following</small></span></div>
       <p className="bio">{profile.bio||'No bio yet.'}</p>
      </div>
     </div>
     <div className="section-title"><h2>Currently Wearing</h2><button className="textbtn" onClick={()=>setTab('avatar')}>Edit outfit <Pencil size={14}/></button></div>
     <div className="item-grid">{items.slice(0,8).map(i=><ItemCard key={i.id} item={i} onRemove={()=>setItems(old=>old.filter(x=>x.id!==i.id))}/>)}</div>
    </section>}
    {tab==='avatar'&&<section className="page"><div className="page-heading"><div><h1>Avatar Editor</h1><p>Preview items and build a demo outfit.</p></div><span className="pill">CUSTOMIZE</span></div>
     <div className="avatar-editor"><div className="avatar-stage">{avatar?<img src={avatar} alt="Roblox avatar preview"/>:<div className="avatar-placeholder large"><UserRound size={90}/></div>}<p>{profile.displayName}</p><small>Public avatar preview</small></div>
      <div className="editor-tools"><h3>Add an item by catalog ID</h3><p>Paste the number from a Roblox catalog item URL. This adds it to your Rolarp demo outfit.</p><div className="input-row"><input value={assetId} onChange={e=>setAssetId(e.target.value)} placeholder="Item ID, e.g. 171650..." inputMode="numeric"/><button className="primary" onClick={()=>{addItem(assetId);setAssetId('')}}><Plus size={16}/> Add & wear</button></div>
       <h3>Currently wearing</h3><div className="wear-list">{items.map(i=><div className="wear-row" key={i.id}><img src={i.image} onError={e=>{(e.currentTarget as HTMLImageElement).src=assetThumb(i.id)}}/><div><b>{i.name}</b><small>{i.id} · {i.source==='demo'?'Sample item':'Catalog ID'}</small></div><button className="lightbtn" onClick={()=>setItems(old=>old.filter(x=>x.id!==i.id))}>Take off</button></div>)}</div>
      </div></div>
    </section>}
    {tab==='inventory'&&<section className="page"><div className="page-heading"><div><h1>My Inventory</h1><p>Items saved in this Rolarp browser profile.</p></div><span className="pill">{items.length} ITEMS</span></div><div className="filter-row"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search inventory"/></div><div className="item-grid">{shownItems.map(i=><ItemCard key={i.id} item={i} onRemove={()=>setItems(old=>old.filter(x=>x.id!==i.id))}/>)}</div></section>}
    {tab==='marketplace'&&<section className="page"><div className="page-heading"><div><h1>Marketplace</h1><p>Search public Roblox catalog listings when the Roblox API allows browser access.</p></div><Globe size={25}/></div><div className="catalog-search"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search catalog, e.g. classic shirt"/><button className="primary" onClick={searchCatalog} disabled={catalogBusy}>{catalogBusy?'Searching...':'Search'}</button></div><div className="catalog-grid">{catalog.map((c:any)=><div className="catalog-card" key={c.id}><img src={assetThumb(String(c.id))}/><b>{c.name}</b><small>Item ID: {c.id}</small><button onClick={()=>addItem(String(c.id),c.name)}>Add to outfit</button></div>)}</div><div className="api-note"><Globe size={18}/><div><b>Real Roblox data note</b><p>Catalog search and public profile lookup use Roblox public endpoints. Some requests can fail because of Roblox rate limits, privacy settings, or browser CORS rules. Rolarp never asks for your Roblox password.</p><a href="https://www.roblox.com/catalog" target="_blank" rel="noreferrer">Open official Roblox catalog <ExternalLink size={13}/></a></div></div></section>}
    {tab==='transactions'&&<section className="page"><div className="page-heading"><div><h1>My Transactions</h1><p>Simulator-only Robux balance and activity.</p></div><Wallet size={26}/></div><div className="balance-card"><div><small>DEMO BALANCE</small><h2>◉ {profile.robux.toLocaleString()}</h2></div><div className="adjust"><input type="number" min="1" value={robuxInput} onChange={e=>setRobuxInput(e.target.value)}/><button className="primary" onClick={addRobux}>Add demo Robux</button></div></div><div className="section-title"><h2>Transaction history</h2><span className="pill">SIMULATED</span></div><div className="table-wrap"><table><thead><tr><th>Type</th><th>Details</th><th>Date</th><th>Amount</th></tr></thead><tbody>{transactions.map(t=><tr key={t.id}><td>{t.type}</td><td>{t.details}</td><td>{t.date||'—'}</td><td className="green-text">+ {Number(t.amount).toLocaleString()}</td></tr>)}</tbody></table></div><p className="muted">This is a local demo balance. It does not change your actual Roblox Robux.</p></section>}
    {tab==='settings'&&<section className="page"><div className="page-heading"><div><h1>Settings</h1><p>Connect a public Roblox profile or reset your local demo.</p></div><Settings size={26}/></div><div className="settings-card"><h3>Load a Roblox profile</h3><p>Enter a public Roblox username. Rolarp will look up the account and its public avatar thumbnail.</p><div className="input-row"><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Roblox username"/><button className="primary" disabled={lookupBusy} onClick={lookupUser}>{lookupBusy?'Loading...':'Find profile'}</button></div><p className="muted">Only public profile information is requested. Never enter your password, cookie, or authentication token.</p></div><div className="settings-card"><h3>Profile data</h3><p>Current mode: <b>{mode==='roblox'?'Roblox public data':'Simulator'}</b></p><button className="lightbtn" onClick={()=>{setProfile(starter);setItems(starterItems);setTransactions([]);setMode('simulator');say('Demo data restored.')}}><RefreshCw size={15}/> Reset demo data</button></div><div className="settings-card"><h3>Official Roblox links</h3><a href="https://www.roblox.com/" target="_blank" rel="noreferrer">Roblox home <ExternalLink size={14}/></a><a href="https://www.roblox.com/users" target="_blank" rel="noreferrer">Roblox profiles <ExternalLink size={14}/></a><a href="https://www.roblox.com/catalog" target="_blank" rel="noreferrer">Roblox marketplace <ExternalLink size={14}/></a></div></section>}
   </main>
  </div>
  <nav className="mobile-nav">{nav.slice(0,5).map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><Icon size={19}/><span>{label}</span></button>)}</nav>
  {notice&&<div className="toast"><Check size={16}/>{notice}</div>}
  {edit&&<div className="modal-backdrop" onClick={()=>setEdit(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={e=>{e.preventDefault();setEdit(false);say('Profile saved on this device.')}}><div className="modal-head"><h2>Edit — Profile</h2><button type="button" className="iconbtn" onClick={()=>setEdit(false)}><X/></button></div>
   <label>Username<input value={profile.username} onChange={e=>setProfile(p=>({...p,username:e.target.value}))}/></label><label>Display name<input value={profile.displayName} onChange={e=>setProfile(p=>({...p,displayName:e.target.value}))}/></label><label>Bio<textarea value={profile.bio} maxLength={1000} onChange={e=>setProfile(p=>({...p,bio:e.target.value}))}/></label><div className="form-grid"><label>Friends<input value={profile.friends} onChange={e=>setProfile(p=>({...p,friends:e.target.value}))}/></label><label>Followers<input value={profile.followers} onChange={e=>setProfile(p=>({...p,followers:e.target.value}))}/></label><label>Following<input value={profile.following} onChange={e=>setProfile(p=>({...p,following:e.target.value}))}/></label></div><label>Demo Robux balance<input type="number" value={profile.robux} onChange={e=>setProfile(p=>({...p,robux:Number(e.target.value)}))}/></label><label>Profile badge<select value={profile.badge} onChange={e=>setProfile(p=>({...p,badge:e.target.value as Profile['badge']}))}><option value="none">No badge</option><option value="plus">Plus</option><option value="pro">Pro</option></select></label><button className="primary full" type="submit"><Save size={16}/> Save profile</button></form></div>}
 </div>
}
function ItemCard({item,onRemove}:{item:Item,onRemove:()=>void}){
 return <article className="item-card"><div className="item-image"><img src={item.image} alt={item.name} onError={e=>{(e.currentTarget as HTMLImageElement).src=assetThumb(item.id)}}/></div><b>{item.name}</b><small>{item.price||item.category}</small><button className="remove-btn" onClick={onRemove}><Trash2 size={13}/> Remove</button></article>
    }
