import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import c from './content/site.js' 
import { products } from './content/shop.js'
import PanelSet from './PanelSet.jsx'
import { Canvas, Hang, Reveal, Magnet, Brush, LivePainting } from '../ui.jsx'

function Float({ mx, my, d, children, style }) {
  const x = useTransform(mx, [-.5, .5], [-d, d])
  const y = useTransform(my, [-.5, .5], [-d, d])
  return <motion.div style={{ x, y, ...style }}>{children}</motion.div>
}

function Quotes() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % c.quotes.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="quote">
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: .5 }}>
          <p>“{c.quotes[i][0]}”</p>
          <small>{c.quotes[i][1]}</small>
        </motion.div>
      </AnimatePresence>
      <div className="dots">
        {c.quotes.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} />)}
      </div>
    </div>
  )
}

export default function Home() {
  const b = window.__booted ? 2 : 2
  const mx = useMotionValue(0), my = useMotionValue(0)
  const move = e => {
    mx.set(e.clientX / window.innerWidth - .5)
    my.set(e.clientY / window.innerHeight - .5)
  }

  return (
    <>
      <section className="hero" onMouseMove={move}>
        <motion.div className="blob b1" animate={{ borderRadius: ['40% 60% 60% 40%', '60% 40% 40% 60%', '40% 60% 60% 40%'], scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity }} />
        <motion.div className="blob b2" animate={{ borderRadius: ['60% 40% 40% 60%', '40% 60% 60% 40%', '60% 40% 40% 60%'], scale: [1.1, .9, 1.1] }} transition={{ duration: 11, repeat: Infinity }} />
        
        <div className="hero-txt">
          <motion.span className="kick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: b }}>
            {c.hero.kicker}
          </motion.span>
          <h1>
            {c.hero.title.map((w, i) => (
              <span className="ln" key={i}>
                <motion.span className={i === 2 ? 'grad' : ''} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: b + i * .15, duration: .9, ease: [.2, .8, .2, 1] }}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <p>{c.hero.text}</p>
          <div className="row">
            <Magnet><Link className="btn" to="/shop">{c.hero.cta1}</Link></Magnet>
            <Magnet><Link className="btn ghost" to="/studio">{c.hero.cta2}</Link></Magnet>
          </div>
        </div>

        <div className="hero-art">
          <Float mx={mx} my={my} d={18} style={{ marginTop: 90 }}>
            <Hang delay={b + .2}><Canvas a={products[1]} w="clamp(100px,11vw,160px)" /></Hang>
            <div className="plaque"><b>{products[1].title}</b><small>${products[1].price}</small></div>
          </Float>
          
          <Float mx={mx} my={my} d={-12}>
            <Hang delay={b + .4}>
              <LivePainting w="clamp(170px,19vw,270px)" />
            </Hang>
            <div className="plaque"><b>Paint it live</b><small>click the canvas</small></div>
          </Float>
          
          <Float mx={mx} my={my} d={26} style={{ marginTop: 150 }}>
            <Hang delay={b + .6}><Canvas a={products[2]} w="clamp(110px,12vw,180px)" /></Hang>
            <div className="plaque"><b>{products[2].title}</b><small>${products[2].price}</small></div>
          </Float>
        </div>
      </section>

      <div className="marquee">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
          {Array(8).fill(c.marquee).map((t, i) => <span key={i}>{t}</span>)}
        </motion.div>
      </div>

      <section className="sec">
        <Reveal><h2>{c.featuredTitle}<Brush /></h2></Reveal>
        <div className="rail">
          {products.slice(0, 4).map((a, i) => (
            <Reveal key={a.id} d={i * .12} className="rail-i">
              <div style={{ marginTop: i % 2 ? 60 : 0 }}>
                <Link to={'/shop/' + a.id}>
                  <Hang><Canvas a={a} w={200} /></Hang>
                  <h3>{a.title}</h3>
                </Link>
                <p>{a.collection} · ${a.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec">
        <Reveal><h2>{c.panelsTitle}<Brush /></h2><p className="lead">{c.panelsText}</p></Reveal>
        <PanelSet layout="five" scene="sav" width="min(100%,820px)" />
        <div style={{ marginTop: 30 }}><Magnet><Link className="btn ghost" to="/panels">{c.panelsCta}</Link></Magnet></div>
      </section>

      <section className="sec">
        <Reveal><h2>{c.stepsTitle}<Brush /></h2></Reveal>
        <div className="steps">
          {c.steps.map(([n, t, d], i) => (
            <Reveal key={n} d={i * .15}>
              <motion.div className="step" whileHover={{ y: -10, rotate: -1 }}>
                <b>{n}</b><h3>{t}</h3><p>{d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec"><Reveal><h2>{c.quotesTitle}<Brush /></h2></Reveal><Quotes /></section>
      
      <section className="sec cta">
        <Reveal>
          <h2>{c.cta.title}</h2>
          <p>{c.cta.text}</p>
          <Magnet><Link className="btn" to="/studio">{c.cta.button}</Link></Magnet>
        </Reveal>
      </section>
    </>
  )
}