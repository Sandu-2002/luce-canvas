import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../content/shop.js'
import { Canvas, Hang } from '../ui.jsx'
const W=[200,260,180,240,220,280]
export default function Gallery(){
  const out=useRef(),inn=useRef(),[w,setW]=useState(0)
  useEffect(()=>{const f=()=>setW(Math.max(0,inn.current.scrollWidth-out.current.offsetWidth));f();window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f)},[])
  return <section className="sec"><h1 className="h1">Gallery</h1><p className="hint">Drag the wall sideways to walk through the exhibition →</p>
    <div className="gal" ref={out}><motion.div className="gal-track" ref={inn} drag="x" dragConstraints={{left:-w,right:0}} dragElastic={.15}>
      {products.map((a,i)=><Link key={a.id} to={'/shop/'+a.id} draggable={false} className="gal-i" style={{marginTop:i%2?70:0}}>
        <Hang delay={i*.12}><Canvas a={a} w={W[i%W.length]}/></Hang><div className="plaque"><b>{a.title}</b><small>{a.size} · ${a.price}</small></div></Link>)}</motion.div></div></section>
}
