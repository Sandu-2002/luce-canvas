import { createContext, useContext, useEffect, useState } from 'react'
const Ctx=createContext(); export const useCart=()=>useContext(Ctx)
const load=()=>{try{return JSON.parse(localStorage.getItem('luce-cart'))||[]}catch{return[]}}
export function CartProvider({children}){
  const [items,setItems]=useState(load),[toast,setToast]=useState(null)
  useEffect(()=>{try{localStorage.setItem('luce-cart',JSON.stringify(items))}catch{}},[items])
  const add=p=>{setItems(i=>[...i,p]);setToast(p.title);clearTimeout(window.__t);window.__t=setTimeout(()=>setToast(null),2000)}
  return <Ctx.Provider value={{items,toast,add,remove:n=>setItems(i=>i.filter((_,k)=>k!==n)),clear:()=>setItems([]),total:items.reduce((s,a)=>s+a.price,0)}}>{children}</Ctx.Provider>
}
