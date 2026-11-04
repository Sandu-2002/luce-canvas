# How to change canvas images
1. Save your photo in `public/images/` (e.g. `sunset.jpg`). Keep files under ~500 KB; use JPG or WebP. No spaces in file names.
2. Single paintings: open `src/content/shop.js`, find the painting, add one line:
   `{id:'ember-tide', title:'Ember Tide', ..., img:'images/sunset.jpg'},`
   It then appears on Home, Shop, product page, Gallery, Sizes and Cart.
3. Panel sets: open `src/content/panels.js`, add `img:'images/my-set.jpg'` to a set. The photo is cut across the panels automatically.
   Best results: a wide photo (about 5:3). Change `layout` to 'three', 'four' or 'five'.
4. Add a new painting: copy one block in shop.js, give it a new unique `id`, title, price and `img`.
5. Save the file; the browser updates by itself (`npm run dev`). Always use `images/...` without a leading slash.

## Hero middle canvas (the "Paint it live" one)
Save your SVG as `public/images/my-art.svg`, then in `src/content/home.js` set:
`art:'images/my-art.svg', artRatio:'3/4', artTitle:'Your title', artNote:'your caption'`
Set `artRatio` to the SVG's width/height (e.g. '4/5' or '1/1') so nothing is cropped. Leave `art:''` to get the self-painting demo back.
