import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import faq from '../content/faq.js'
export default function Faq(){
  const [o,setO]=useState(0)
  return <section className="sec narrow"><h1 className="h1">{faq.title}</h1>
    {faq.items.map(([q,a],i)=><div className="faq" key={i}><button onClick={()=>setO(o===i?-1:i)}>{q}<motion.span animate={{rotate:o===i?45:0}}>+</motion.span></button>
      <AnimatePresence initial={false}>{o===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} style={{overflow:'hidden'}}>{a}</motion.p>}</AnimatePresence></div>)}</section>
}
