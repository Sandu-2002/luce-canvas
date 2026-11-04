import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
// Draws ANY svg file stroke-by-stroke (outline traces itself, then the colour fills in).
const GEO='path,circle,ellipse,rect,line,polyline,polygon',cache={}
export default function DrawSvg({src,delay=0,duration=3}){
  const box=useRef(),[html,setHtml]=useState(cache[src]||null)
  useEffect(()=>{if(cache[src])return;let live=true
    fetch(src).then(r=>r.text()).then(t=>{const doc=new DOMParser().parseFromString(t,'image/svg+xml'),svg=doc.documentElement
      if(svg.nodeName!=='svg'||doc.querySelector('parsererror')) throw 0
      const w=parseFloat(svg.getAttribute('width')),h=parseFloat(svg.getAttribute('height'))
      if(!svg.getAttribute('viewBox')&&w&&h) svg.setAttribute('viewBox',`0 0 ${w} ${h}`)
      svg.removeAttribute('width');svg.removeAttribute('height');svg.setAttribute('preserveAspectRatio','xMidYMid slice')
      cache[src]=svg.outerHTML;if(live)setHtml(cache[src])}).catch(()=>live&&setHtml(false))
    return()=>{live=false}},[src])
  useEffect(()=>{
    const svg=box.current&&box.current.querySelector('svg'); if(!html||!svg) return
    svg.style.cssText+=';width:100%;height:100%;display:block'
    const vb=(svg.getAttribute('viewBox')||'0 0 300 300').split(/[ ,]+/).map(Number),sw=(vb[2]||300)/220
    const els=[...svg.querySelectorAll(GEO)].filter(e=>!e.closest('defs,clipPath,mask,pattern,symbol,marker')),run=[]
    els.forEach((el,i)=>{let len=0;try{len=el.getTotalLength()}catch{} if(!len)return
      const cs=getComputedStyle(el),hasS=cs.stroke&&cs.stroke!=='none',fill=cs.fill,hasF=fill&&fill!=='none'
      if(!hasS&&!hasF)return
      const fo=parseFloat(cs.fillOpacity||1),st=el.style
      if(!hasS){st.stroke=hasF?fill:'currentColor';st.strokeWidth=sw}
      st.strokeDasharray=len;st.strokeDashoffset=len;st.fillOpacity=0
      const d=delay+(i/els.length)*duration*.55,t=duration*.45
      run.push(animate(0,1,{duration:t,delay:d,ease:'easeInOut',onUpdate:v=>{st.strokeDashoffset=len*(1-v)}}))
      run.push(animate(0,1,{duration:.7,delay:d+t*.7,onUpdate:v=>{st.fillOpacity=fo*v;if(!hasS)st.strokeOpacity=1-v},onComplete:()=>{st.strokeDasharray='none'}}))})
    return()=>run.forEach(c=>c.stop())},[html])
  if(html===false) return <img src={src} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
  return <div ref={box} style={{width:'100%',height:'100%'}} dangerouslySetInnerHTML={{__html:html||''}}/>
}
