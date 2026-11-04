import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
export const Canvas=({a,w=220,className='',style,...p})=><motion.div className={'canvas '+className} style={{width:w,background:a.img?`url(${a.img}) center/cover`:a.bg,...style}} {...p}><div className="weave"/></motion.div>
// A canvas hanging from a wire: swings like a pendulum when it appears and when hovered
export const Hang=({children,delay=0,className='',style})=><motion.div className={'hang '+className} style={{transformOrigin:'50% 0',...style}}
  initial={{rotate:-9,y:-60,opacity:0}} animate={{rotate:0,y:0,opacity:1}} transition={{type:'spring',stiffness:35,damping:4,delay}}
  whileHover={{rotate:[0,3,-3,1.5,0],transition:{duration:1.2}}}><svg className="wire" viewBox="0 0 100 40"><path d="M50 0 L12 40 M50 0 L88 40"/></svg>{children}</motion.div>
export const Reveal=({children,d=0,y=50,className})=><motion.div className={className} initial={{opacity:0,y}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.8,delay:d,ease:[.2,.8,.2,1]}}>{children}</motion.div>
export function Magnet({children}){
  const x=useMotionValue(0),y=useMotionValue(0),sx=useSpring(x,{stiffness:200,damping:15}),sy=useSpring(y,{stiffness:200,damping:15})
  return <motion.span style={{x:sx,y:sy,display:'inline-block'}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.3);y.set((e.clientY-r.top-r.height/2)*.4)}} onMouseLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.span>
}
// Hand-painted brush underline that draws itself
export const Brush=({d=.6})=><svg className="brush" viewBox="0 0 300 20" preserveAspectRatio="none"><defs><linearGradient id="bg"><stop offset="0" stopColor="#e0301e"/><stop offset="1" stopColor="#ffb627"/></linearGradient></defs>
  <motion.path d="M4 12 C 60 2, 120 18, 190 8 S 270 6, 296 11" fill="none" stroke="url(#bg)" strokeWidth="8" strokeLinecap="round" initial={{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:1.2,delay:d}}/></svg>

// A painting that paints itself with brush strokes. Click to repaint.
const STROKES=[['M20 310 C 80 250,140 330,200 260 S 280 240,292 210','var(--edge)',50,.2],['M8 230 C 90 170,160 270,300 160','var(--red)',36,.8],['M26 140 C 100 80,190 150,282 66','var(--gold)',26,1.4],['M54 340 C 120 300,200 360,276 310','var(--txt)',16,2]]
export function LivePainting({w=260}){
  const [k,setK]=useState(0)
  return <div className="canvas live" style={{width:w}} onClick={()=>setK(k+1)} title="Click to repaint"><svg key={k} viewBox="0 0 300 400" style={{display:'block',width:'100%'}}>
    <rect width="300" height="400" style={{fill:'var(--bg)'}}/>
    <motion.circle cx="215" cy="115" r="48" style={{fill:'var(--gold)',transformBox:'fill-box',transformOrigin:'center'}} initial={{scale:0}} animate={{scale:1}} transition={{delay:2.5,type:'spring',stiffness:80}}/>
    {STROKES.map(([d,c,sw,dl],i)=><motion.path key={i} d={d} fill="none" strokeLinecap="round" strokeWidth={sw} style={{stroke:c}} initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.1,delay:dl,ease:'easeInOut'}}/>)}
  </svg><div className="weave"/><small className="repaint">click to repaint</small></div>
}
