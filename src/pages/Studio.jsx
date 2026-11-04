import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sizes } from '../data.js'
import Tilt from '../Tilt.jsx'
import PanelSet from '../PanelSet.jsx'
const walls=['#2a0d12','#3d1a0f','#14090b','#4a2c1a','#10222a']
const layouts=[['Single canvas','single',1],['3 panels','three',1.6],['4 panels','four',1.9],['5 panels','five',2.1]]
export default function Studio(){
  const [img,setImg]=useState(null),[s,setS]=useState(sizes[1]),[wall,setWall]=useState(walls[0]),[edge,setEdge]=useState('wrap'),[lay,setLay]=useState(layouts[0])
  const pick=e=>{const f=e.target.files[0]; if(f) setImg(URL.createObjectURL(f))}
  const price=Math.round(s.p*lay[2])+(edge==='gold'?25:0)
  return <section className="sec studio"><h1 className="h1">Preview Studio</h1>
    <div className="studio-grid">
      <div className="ctrl">
        <label className="drop">{img?'Change image':'Upload your image'}<input type="file" accept="image/*" hidden onChange={pick}/></label>
        <h4>Layout</h4><div className="chips">{layouts.map(l=><button key={l[1]} className={lay===l?'on':''} onClick={()=>setLay(l)}>{l[0]}</button>)}</div>
        <h4>Size</h4><div className="chips">{sizes.map(z=><button key={z.l} className={s===z?'on':''} onClick={()=>setS(z)}>{z.l}</button>)}</div>
        <h4>Wall colour</h4><div className="chips">{walls.map(w=><button key={w} className={wall===w?'on':''} style={{background:w,width:40,height:40}} onClick={()=>setWall(w)}/>)}</div>
        <h4>Edges</h4><div className="chips">{['wrap','black','gold'].map(e=><button key={e} className={edge===e?'on':''} onClick={()=>setEdge(e)}>{e}</button>)}</div>
        <p className="price">${price}</p>
        <a className={'btn'+(img?'':' off')} href={`mailto:hello@lucecanvas.com?subject=Custom canvas ${lay[0]} ${s.l}&body=Layout ${lay[0]}, size ${s.l}, edges ${edge}. I will attach my image.`}>Order this canvas</a>
        <small>Your image stays in your browser. Nothing is uploaded until you order.</small>
      </div>
      <div className="wall" style={{background:`radial-gradient(circle at 50% 30%,${wall},#000)`}}>
        <Tilt>{lay[1]==='single'
          ?<AnimatePresence mode="wait"><motion.div key={s.l+edge} className={'canvas user '+edge} style={{width:s.w*1.5,height:s.h*1.5,backgroundImage:img?`url(${img})`:undefined}} initial={{scale:.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{opacity:0}}>
            {!img&&<span className="ph">Your image here</span>}<div className="weave"/></motion.div></AnimatePresence>
          :<div style={{width:Math.min(s.w*7,560),maxWidth:'80vw'}}><PanelSet key={lay[1]+(img||'')} layout={lay[1]} scene="wave" img={img}/></div>}</Tilt>
        <div className="sofa"/></div>
    </div></section>
}
