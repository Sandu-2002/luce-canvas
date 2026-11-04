import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { products, shopText } from '../content/shop.js'
import { useCart } from '../cart.jsx'
import { Canvas } from '../ui.jsx'
export default function Shop(){
  const {add}=useCart(),[f,setF]=useState('All'),[open,setOpen]=useState(null),cols=['All',...new Set(products.map(p=>p.collection))]
  const list=products.filter(p=>f==='All'||p.collection===f)
  return <section className="sec"><h1 className="h1">{shopText.title}</h1>
    <div className="chips" style={{marginBottom:40}}>{cols.map(c=><button key={c} className={f===c?'on':''} onClick={()=>setF(c)}>{c}</button>)}</div>
    <LayoutGroup><motion.div layout className="grid">{list.map(a=><motion.div layout key={a.id} initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>
      <Canvas a={a} w="100%" layoutId={'cv'+a.id} onClick={()=>setOpen(a)} whileHover={{y:-10,rotate:-1.5}} style={{cursor:'zoom-in'}}/>
      <h3>{a.title}</h3><p>{a.size} · ${a.price}</p><button className="btn sm" onClick={()=>add(a)}>Add to cart</button></motion.div>)}</motion.div>
    <AnimatePresence>{open&&<motion.div className="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(null)}>
      <Canvas a={open} w="min(300px,70vw)" layoutId={'cv'+open.id}/>
      <div onClick={e=>e.stopPropagation()}><h2>{open.title}</h2><p>{open.desc}</p><p>{open.size} · ${open.price}</p>
        <div className="row" style={{justifyContent:'center'}}><button className="btn" onClick={()=>add(open)}>Add to cart</button><Link className="btn ghost" to={'/shop/'+open.id}>Full page</Link></div></div></motion.div>}</AnimatePresence></LayoutGroup>
  </section>
}
