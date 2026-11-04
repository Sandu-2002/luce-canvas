// Original artwork drawn as SVG (1000×600 scenes). Panel sets slice these scenes into separate canvases.
const bez=(p,t)=>{const u=1-t;return [0,1].map(i=>u*u*u*p[0][i]+3*u*u*t*p[1][i]+3*u*t*t*p[2][i]+t*t*t*p[3][i])}
const blossoms=(p,n,seed)=>{let s='';const cols=['#b3182b','#d9452a','#e8822a','#f2c14e'];for(let i=0;i<n;i++){const t=i/n,[x,y]=bez(p,t),a=Math.sin(i*2.7+seed)*34,b=Math.cos(i*1.9+seed)*30,r=8+(i*7%5)*2.2
  s+=`<line x1="${x}" y1="${y}" x2="${x+a}" y2="${y+b}" stroke="#3d1612" stroke-width="3"/><circle cx="${x+a}" cy="${y+b}" r="${r}" fill="${cols[i%4]}"/><circle cx="${x+a}" cy="${y+b}" r="${r/3}" fill="#fff3cf" opacity=".7"/>`}return s}
const A=[[-10,90],[300,40],[550,330],[1010,200]],B=[[-10,590],[250,500],[600,560],[1010,400]]
export const scenes={
sav:`<defs><linearGradient id="sv-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8230f"/><stop offset=".5" stop-color="#ff7a1a"/><stop offset="1" stop-color="#ffd23a"/></linearGradient>
<radialGradient id="sv-sun"><stop offset="0" stop-color="#fffbe0"/><stop offset=".35" stop-color="#fff0a0" stop-opacity=".8"/><stop offset="1" stop-color="#ffd23a" stop-opacity="0"/></radialGradient>
<linearGradient id="sv-wat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a2a"/><stop offset="1" stop-color="#8a1a0c"/></linearGradient></defs>
<rect width="1000" height="600" fill="url(#sv-sky)"/><circle cx="900" cy="330" r="290" fill="url(#sv-sun)"/><circle cx="900" cy="330" r="62" fill="#fffbe0"/>
<g fill="#6e1008" opacity=".55"><ellipse cx="260" cy="150" rx="300" ry="26"/><ellipse cx="430" cy="218" rx="260" ry="15"/><ellipse cx="650" cy="105" rx="230" ry="20"/><ellipse cx="110" cy="295" rx="190" ry="11"/><ellipse cx="640" cy="300" rx="150" ry="9"/></g>
<rect y="395" width="1000" height="44" fill="#140403"/><rect y="439" width="1000" height="161" fill="url(#sv-wat)"/>
<g fill="#140403" stroke="#140403" stroke-linecap="round"><path d="M112 398 C 120 340 104 300 130 236 M130 240 C 100 262 78 258 62 250 M126 262 C 150 270 170 262 186 252" fill="none" stroke-width="11"/>
<ellipse cx="124" cy="222" rx="98" ry="13"/><ellipse cx="66" cy="244" rx="58" ry="9"/><ellipse cx="184" cy="246" rx="52" ry="9"/>
<path d="M470 398 C 474 372 468 356 480 336" fill="none" stroke-width="7"/><ellipse cx="482" cy="330" rx="48" ry="8"/>
<path d="M560 125 q12 -14 24 0 q12 -14 24 0 M640 190 q9 -11 18 0 q9 -11 18 0 M720 140 q8 -10 16 0 q8 -10 16 0" fill="none" stroke-width="3"/></g>
<g fill="#ffe27a" opacity=".55"><rect x="850" y="450" width="110" height="7"/><rect x="835" y="470" width="130" height="6"/><rect x="860" y="492" width="95" height="8"/><rect x="845" y="520" width="120" height="6"/><rect x="870" y="548" width="80" height="7"/></g>
<g fill="#140403" opacity=".6"><rect x="95" y="446" width="40" height="9"/><rect x="82" y="470" width="66" height="8"/><rect x="100" y="500" width="30" height="7"/><rect x="465" y="446" width="30" height="7"/></g>
<g fill="#ffc34a" opacity=".3"><rect x="150" y="452" width="260" height="4"/><rect x="520" y="480" width="240" height="4"/><rect x="250" y="520" width="300" height="4"/><rect x="600" y="560" width="220" height="4"/></g>`,
moon:`<defs><linearGradient id="mn-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f8f99"/><stop offset=".6" stop-color="#6cc3bf"/><stop offset="1" stop-color="#f6e3b0"/></linearGradient>
<linearGradient id="mn-lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4bb0b3"/><stop offset="1" stop-color="#17636d"/></linearGradient></defs>
<rect width="1000" height="600" fill="url(#mn-sky)"/><g fill="#fff3cf" opacity=".5"><ellipse cx="190" cy="125" rx="170" ry="11"/><ellipse cx="780" cy="95" rx="190" ry="12"/><ellipse cx="640" cy="330" rx="200" ry="9"/><ellipse cx="260" cy="320" rx="150" ry="8"/></g>
<circle cx="500" cy="250" r="138" fill="#e9a928"/><circle cx="470" cy="225" r="95" fill="#ffd25a" opacity=".45"/>
<path d="M0 396 L0 352 L110 322 L230 370 L330 396Z M640 396 L760 348 L880 372 L1000 328 L1000 396Z" fill="#5a2f1f"/>
<rect y="396" width="1000" height="204" fill="url(#mn-lake)"/><ellipse cx="500" cy="470" rx="125" ry="13" fill="#f2c14e" opacity=".45"/><ellipse cx="500" cy="505" rx="75" ry="8" fill="#f2c14e" opacity=".35"/>
<path d="M-10 90 C 300 40, 550 330, 1010 200 M-10 590 C 250 500, 600 560, 1010 400" fill="none" stroke="#3d1612" stroke-width="15" stroke-linecap="round"/>${blossoms(A,26,1)}${blossoms(B,26,4)}
<path d="M320 120 q9 -10 18 0 q9 -10 18 0 M680 170 q8 -9 16 0 q8 -9 16 0" fill="none" stroke="#1d1d22" stroke-width="3"/>`,
wave:`<rect width="1000" height="600" style="fill:var(--bg2)"/><circle cx="640" cy="240" r="150" style="fill:var(--gold)"/><circle cx="640" cy="240" r="210" style="fill:var(--gold)" opacity=".18"/>
<path d="M0 330 C 150 270,300 390,500 330 S 850 270,1000 340 L1000 600 L0 600Z" style="fill:var(--red)"/><path d="M0 400 C 200 350,350 450,550 400 S 850 350,1000 420 L1000 600 L0 600Z" style="fill:var(--gold)" opacity=".4"/>
<path d="M0 470 C 220 420,380 520,600 470 S 880 440,1000 490 L1000 600 L0 600Z" style="fill:var(--edge)"/><path d="M0 540 C 250 500,450 580,700 535 S 900 520,1000 550 L1000 600 L0 600Z" style="fill:var(--bg)"/>`
}
