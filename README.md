# Luce Canvas (React + Vite + Framer Motion)
Pages: Home, Shop (+ product pages), Gallery, Sizes, Preview Studio, About, FAQ, Contact, Cart, 404.
Page text lives in src/content/ (see DRAFTS.md).

## Run in VS Code
1. Install Node.js 18+ from nodejs.org. Open this folder in VS Code (File > Open Folder).
2. Terminal (Ctrl+`): `npm install` then `npm run dev`. Open the link it prints (http://localhost:5173).
## Deploy
`npm run build` makes the `dist/` folder. Upload it to Netlify/Vercel/GitHub Pages, or push to GitHub and import the repo on Vercel (build `npm run build`, output `dist`).
Links use /#/ routes, so every page works on any host and on VS Code Live Server.

## Change colours
Edit `src/content/theme.js` (hex codes) or set `defaultTheme`. Visitors can also use the palette button (bottom-left).
