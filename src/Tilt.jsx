import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
export default function Tilt({children,className=''}){
  const mx=useMotionValue(0),my=useMotionValue(0)
  const rx=useSpring(useTransform(my,[-.5,.5],[12,-12]),{stiffness:150,damping:15}),ry=useSpring(useTransform(mx,[-.5,.5],[-14,14]),{stiffness:150,damping:15})
  return <div className={className} style={{perspective:900}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();mx.set((e.clientX-r.left)/r.width-.5);my.set((e.clientY-r.top)/r.height-.5)}} onMouseLeave={()=>{mx.set(0);my.set(0)}}>
    <motion.div style={{rotateX:rx,rotateY:ry,transformStyle:'preserve-3d'}} whileHover={{scale:1.04}}>{children}</motion.div></div>
}
