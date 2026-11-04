import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../content/shop.js'
import { useCart } from '../cart.jsx'
import Tilt from '../Tilt.jsx'
import { Canvas, Magnet } from '../ui.jsx'
import { NotFound } from './Info.jsx'
export default function Product(){
  const [wall,setWall]=useState(false),{id}=useParams(),{add}=useCart(),i=products.findIndex(p=>p.id===id)
  if(i<0) return <NotFound/>
  const a=products[i],nx=products[(i+1)%products.length]
  return <section className="sec prod"><div>{wall?<div className="swall"><Canvas a={a} w={110} layoutId="pc" style={{position:'absolute',bottom:160,left:'50%',marginLeft:-55}}/><div className="sofa2" style={{width:336,height:128}}/></div>
      :<Tilt><Canvas a={a} w="min(340px,75vw)" layoutId="pc"/></Tilt>}
      <button className="btn ghost sm" style={{marginTop:24}} onClick={()=>setWall(!wall)}>{wall?'Close-up view':'See it on a wall'}</button></div>
    <div><Link to="/shop">← Back to shop</Link><h1 className="h1">{a.title}</h1><p>{a.desc}</p><p>{a.collection} collection · {a.size}</p><p className="price">${a.price}</p>
      <div className="row"><Magnet><button className="btn" onClick={()=>add(a)}>Add to cart</button></Magnet><Link className="btn ghost" to={'/shop/'+nx.id}>Next: {nx.title}</Link></div></div></section>
}
