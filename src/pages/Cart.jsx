import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../cart.jsx'
import site from '../content/site.js'
export default function Cart(){
  const {items,remove,clear,total}=useCart(),body=encodeURIComponent(items.map(a=>`${a.title} (${a.size}) $${a.price}`).join('\n')+`\nTotal $${total}`)
  return <section className="sec narrow"><h1 className="h1">Cart</h1>
    {!items.length?<p>Your cart is empty. <Link to="/shop" style={{color:'var(--gold)'}}>Browse paintings</Link></p>:<>
    <AnimatePresence>{items.map((a,i)=><motion.div layout className="line" key={a.id+'-'+i} initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:80}}>
      <span className="dot" style={{background:a.img?`url(${a.img}) center/cover`:a.bg}}/><span>{a.title}</span><span>${a.price}</span><button className="x" onClick={()=>remove(i)}>Remove</button></motion.div>)}</AnimatePresence>
    <p className="price">Total ${total}</p><div className="row"><a className="btn" href={`mailto:${site.email}?subject=Order&body=${body}`}>Checkout by email</a><button className="btn ghost" onClick={clear}>Clear cart</button></div></>}</section>
}
