import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll } from 'framer-motion'
import site from './content/site.js'
import { useCart } from './cart.jsx'
import Theme from './Theme.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import Panels from './pages/Panels.jsx'
import { Scenes } from './PanelSet.jsx'
import Gallery from './pages/Gallery.jsx'
import Sizes from './pages/Sizes.jsx'
import Studio from './pages/Studio.jsx'
import Faq from './pages/Faq.jsx'
import Cart from './pages/Cart.jsx'
import { About, Contact, NotFound } from './pages/Info.jsx'

function Spotlight(){
  const x=useMotionValue(-400),y=useMotionValue(-400),sx=useSpring(x,{stiffness:80,damping:20}),sy=useSpring(y,{stiffness:80,damping:20})
  useEffect(()=>{const m=e=>{x.set(e.clientX-250);y.set(e.clientY-250)};window.addEventListener('mousemove',m);return()=>window.removeEventListener('mousemove',m)},[])
  return <motion.div className="spot" style={{x:sx,y:sy}}/>
}
function Loader(){
  return <motion.div className="loader" exit={{opacity:0}} transition={{duration:.6}}>
    <svg viewBox="0 0 400 60" width="min(80vw,420px)"><defs><linearGradient id="lg"><stop offset="0" stopColor="#e0301e"/><stop offset="1" stopColor="#ffb627"/></linearGradient></defs>
      <motion.path d="M5 50 C 100 10, 200 70, 395 20" fill="none" stroke="url(#lg)" strokeWidth="10" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.4}}/></svg>
    <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.7,duration:.8}}>Luce <i>Canvas</i></motion.h1></motion.div>
}
export default function App(){
  const loc=useLocation(),{scrollYProgress}=useScroll(),{items,toast}=useCart(),[loading,setLoading]=useState(true),[open,setOpen]=useState(false)
  useEffect(()=>{const t=setTimeout(()=>{window.__booted=true;setLoading(false)},1900);return()=>clearTimeout(t)},[])
  useEffect(()=>{window.scrollTo(0,0);setOpen(false)},[loc.pathname])
  return <>
    <AnimatePresence>{loading&&<Loader key="l"/>}</AnimatePresence>
    <Scenes/><Spotlight/><Theme/><motion.div className="progress" style={{scaleX:scrollYProgress}}/>
    <header className="nav">
      <Link to="/" className="logo">Luce<i>Canvas</i></Link>
      <button className="burger" onClick={()=>setOpen(!open)} aria-label="Menu">{open?'✕':'☰'}</button>
      <nav className={open?'open':''}>{site.nav.map(([p,t])=><NavLink key={p} to={p} end={p==='/'}>{t}</NavLink>)}
        <NavLink to="/cart">Cart <b className="badge">{items.length}</b></NavLink></nav>
    </header>
    {/* CSS-driven page transition: pages are always visible even if an animation fails */}
    <div key={'c'+loc.pathname} className="curtain"/>
    <main key={loc.pathname} className="page">
      <Routes>
        <Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/shop/:id" element={<Product/>}/>
        <Route path="/panels" element={<Panels/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/sizes" element={<Sizes/>}/><Route path="/studio" element={<Studio/>}/>
        <Route path="/about" element={<About/>}/><Route path="/faq" element={<Faq/>}/><Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<Cart/>}/><Route path="*" element={<NotFound/>}/>
      </Routes>
      <footer className="foot"><b>{site.brand}</b><span>{site.footer}</span><span>{site.email}</span></footer>
    </main>
    <AnimatePresence>{toast&&<motion.div className="toast" initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}}>“{toast}” added to cart</motion.div>}</AnimatePresence>
  </>
}
