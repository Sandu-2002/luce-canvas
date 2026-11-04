// DRAFT: COLOURS. Change defaultTheme, or edit any colour below (hex codes).
// Visitors can also switch palettes with the colour button (bottom-left); remove <Theme/> in App.jsx to hide it.
export const defaultTheme='ember'
export const themes={
  ember:{name:'Ember',red:'#e0301e',gold:'#ffb627',bg:'#12060a',bg2:'#3a0d12',edge:'#3a0a10',txt:'#fff1dc'},
  crimson:{name:'Crimson Night',red:'#c1121f',gold:'#ffd166',bg:'#0a0305',bg2:'#2b060b',edge:'#2b060b',txt:'#fff4e6'},
  rose:{name:'Rose Dusk',red:'#ff4d6d',gold:'#ffb347',bg:'#140712',bg2:'#3b1247',edge:'#2a0d33',txt:'#fff0f5'},
  ocean:{name:'Ocean Gold',red:'#1fa2a6',gold:'#ffd166',bg:'#051418',bg2:'#0b3a42',edge:'#082a30',txt:'#eefcff'},
  olive:{name:'Olive Studio',red:'#8a9a2b',gold:'#f2c14e',bg:'#10120a',bg2:'#2c3410',edge:'#1f2509',txt:'#fbf7e6'}}
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)).join(',')
export function applyTheme(k){
  const t=themes[k]||themes[defaultTheme],s=document.documentElement.style
  s.setProperty('--red',t.red);s.setProperty('--gold',t.gold);s.setProperty('--bg',t.bg);s.setProperty('--bg2',t.bg2);s.setProperty('--edge',t.edge);s.setProperty('--txt',t.txt)
  s.setProperty('--acc',rgb(t.gold));s.setProperty('--bgc',rgb(t.bg));s.setProperty('--redc',rgb(t.red))
}
