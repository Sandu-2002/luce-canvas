import { motion } from 'framer-motion'
import PanelSet from '../PanelSet.jsx'
import { sets, panelText } from '../content/panels.js'
import { useCart } from '../cart.jsx'
import { Reveal } from '../ui.jsx'
export default function Panels(){
  const {add}=useCart()
  return <section className="sec"><h1 className="h1">{panelText.title}</h1><p className="hint">{panelText.hint}</p>
    <div className="sets">{sets.map((s,i)=><Reveal key={s.id} d={i*.1}><div className="setcard"><PanelSet layout={s.layout} scene={s.scene} delay={.1}/>
      <h3>{s.title}</h3><p>{s.pieces} panels · {s.size} · ${s.price}</p>
      <motion.button className="btn sm" whileTap={{scale:.94}} onClick={()=>add({id:s.id,title:s.title+' (set)',size:s.size,price:s.price,bg:s.bg})}>Add set to cart</motion.button></div></Reveal>)}</div></section>
}
