// DRAFT: wall-art panel sets. Each layout slices a 1000×600 scene into separate canvases (x,y,w,h).
export const layouts={
  three:[{x:0,y:110,w:300,h:380},{x:350,y:40,w:300,h:520},{x:700,y:110,w:300,h:380}],
  four:[{x:0,y:90,w:225,h:420},{x:258,y:50,w:225,h:500},{x:517,y:50,w:225,h:500},{x:775,y:90,w:225,h:420}],
  five:[{x:0,y:130,w:190,h:340},{x:202,y:90,w:190,h:420},{x:405,y:40,w:190,h:520},{x:607,y:90,w:190,h:420},{x:810,y:130,w:190,h:340}]
}
// To use your own artwork: save it in public/images/ and add  img:'images/my-set.jpg'  to a set (see IMAGES.md). Wide photos (5:3) cut best.
export const sets=[
 {id:'set-sunset-savanna',title:'Sunset Savanna',layout:'five',scene:'sav',pieces:5,size:'5 × 12×30 in',price:380,bg:'linear-gradient(160deg,#ffd23a,#ff7a1a 50%,#8a1a0c)'},
 {id:'set-blossom-moon',title:'Blossom Moon',layout:'three',scene:'moon',pieces:3,size:'3 × 16×32 in',price:260,bg:'linear-gradient(160deg,#6cc3bf,#e9a928)'},
 {id:'set-ember-waves',title:'Ember Waves',layout:'four',scene:'wave',pieces:4,size:'4 × 14×30 in',price:320,bg:'linear-gradient(160deg,#ffb627,#e0301e 60%,#3a0d12)'}]
export const panelText={title:'Panel Sets',hint:'Hover a set to spread the panels apart, like a real gallery wall.'}
