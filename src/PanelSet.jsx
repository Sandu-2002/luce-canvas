import { motion } from 'framer-motion'
import { layouts } from './content/panels.js'
import { scenes } from './scenes.js'
// Hidden once in App: holds every scene so panels can slice them with <use>
export const Scenes=()=><svg width="0" height="0" style={{position:'absolute'}} aria-hidden="true">{Object.entries(scenes).map(([k,v])=><g key={k} id={'sc-'+k} dangerouslySetInnerHTML={{__html:v}}/>)}</svg>
// A wall-art set: one picture split into separate canvases. Hover spreads the panels apart.
export default function PanelSet({layout='five',scene='sav',img,delay=0,width='100%'}){
  return <motion.div className="pset" style={{width}} initial={{gap:'1.2%'}} whileHover={{gap:'3.4%'}} transition={{type:'spring',stiffness:120,damping:16}}>
    {layouts[layout].map((p,i)=><motion.div key={i} className="pp" style={{flex:`${p.w} 1 0`,aspectRatio:`${p.w}/${p.h}`}}
      initial={{opacity:0,y:-90,rotate:i%2?5:-5}} whileInView={{opacity:1,y:0,rotate:0}} viewport={{once:true,margin:'-40px'}} transition={{delay:delay+i*.12,type:'spring',stiffness:70,damping:12}}>
      <svg viewBox={`${p.x} ${p.y} ${p.w} ${p.h}`} preserveAspectRatio="none" style={{width:'100%',height:'100%',display:'block'}}>
        {img?<image href={img} x="0" y="0" width="1000" height="600" preserveAspectRatio="xMidYMid slice"/>:<use href={'#sc-'+scene}/>}</svg>
      <div className="weave"/></motion.div>)}
  </motion.div>
}
