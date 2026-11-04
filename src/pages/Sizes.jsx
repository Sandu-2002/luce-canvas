import { useState } from 'react'
import { motion } from 'framer-motion'
import sizes from '../content/sizes.js'
import { products } from '../content/shop.js'
const PX=4 // pixels per inch on the demo wall
export default function Sizes(){
  const [s,setS]=useState(sizes[2])
  return <section className="sec"><h1 className="h1">Sizes</h1><p className="hint">Pick a size to see it above a 7 ft sofa.</p>
    <div className="chips" style={{marginBottom:30}}>{sizes.map(z=><button key={z.l} className={s===z?'on':''} onClick={()=>setS(z)}>{z.l}</button>)}</div>
    <div className="swall"><motion.div className="canvas" animate={{width:s.w*PX,height:s.h*PX}} transition={{type:'spring',stiffness:120,damping:14}} style={{aspectRatio:'auto',background:products[0].img?`url(${products[0].img}) center/cover`:products[0].bg,position:'absolute',bottom:150,left:'50%',x:'-50%'}}><div className="weave"/></motion.div>
      <div className="sofa2" style={{width:84*PX,height:32*PX}}/></div>
    <p className="price">${s.p} <small>· {s.use}</small></p>
    <table className="tbl"><tbody>{sizes.map(z=><motion.tr key={z.l} animate={{background:z===s?'rgba(255,182,39,.18)':'rgba(0,0,0,0)'}} onClick={()=>setS(z)}><td>{z.l}</td><td>{z.use}</td><td>${z.p}</td></motion.tr>)}</tbody></table></section>
}
