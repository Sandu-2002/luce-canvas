import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { themes, defaultTheme, applyTheme } from './content/theme.js'
const get=()=>{try{return localStorage.getItem('luce-theme')||defaultTheme}catch{return defaultTheme}}
export default function Theme(){
  const [k,setK]=useState(get),[o,setO]=useState(false)
  useEffect(()=>{applyTheme(k);try{localStorage.setItem('luce-theme',k)}catch{}},[k])
  return <div className="tsw"><AnimatePresence>{o&&<motion.div className="tpanel" initial={{opacity:0,y:20,scale:.9}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20}}>
    {Object.entries(themes).map(([id,t])=><button key={id} className={id===k?'on':''} onClick={()=>setK(id)}><i style={{background:`linear-gradient(100deg,${t.red},${t.gold})`}}/>{t.name}</button>)}</motion.div>}</AnimatePresence>
    <motion.button className="tbtn" onClick={()=>setO(!o)} whileHover={{scale:1.1,rotate:20}} whileTap={{scale:.9}} aria-label="Change colours">🎨</motion.button></div>
}
