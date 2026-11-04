import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, animate, useInView } from 'framer-motion'
import about from '../content/about.js'
import ct from '../content/contact.js'
import site from '../content/site.js'
import { Reveal, Brush } from '../ui.jsx'
function Count({n}){
  const r=useRef(),v=useInView(r,{once:true}),[x,setX]=useState(0)
  useEffect(()=>{if(v){const c=animate(0,n,{duration:2,onUpdate:l=>setX(Math.round(l))});return()=>c.stop()}},[v])
  return <b ref={r}>{x.toLocaleString()}+</b>
}
export function About(){
  return <section className="sec narrow"><h1 className="h1">{about.title}</h1>
    {about.paragraphs.map((t,i)=><Reveal key={i} y={30}><p className="lead">{t}</p></Reveal>)}
    <div className="stats">{about.stats.map(([n,l])=><div key={l}><Count n={n}/><small>{l}</small></div>)}</div><Brush/></section>
}
export function Contact(){
  const go=e=>{e.preventDefault();const f=new FormData(e.target);window.location.href=`mailto:${site.email}?subject=${encodeURIComponent('Message from '+f.get('n'))}&body=${encodeURIComponent(f.get('m')+'\n\n'+f.get('e'))}`}
  return <section className="sec narrow"><h1 className="h1">{ct.title}</h1>
    <form onSubmit={go}><input name="n" required placeholder={ct.placeholders.name}/><input name="e" required type="email" placeholder={ct.placeholders.email}/>
    <textarea name="m" required rows="5" placeholder={ct.placeholders.message}/><motion.button className="btn" whileTap={{scale:.95}}>{ct.button}</motion.button></form>
    <p className="note">{ct.note}<br/>{site.email} · {site.location}<br/>{ct.hours}</p></section>
}
export function NotFound(){return <section className="sec narrow"><h1 className="h1">404</h1><p>This wall is empty. <Link to="/" style={{color:'var(--gold)'}}>Back home</Link></p></section>}
