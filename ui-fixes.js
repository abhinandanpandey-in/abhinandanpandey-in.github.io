/* Mobile nav menu. External file so it works under the Cloudflare CSP (script-src 'self'). */
(function(){var n=document.querySelector('nav'),b=n&&n.querySelector('.nav-burger');if(!b)return;
function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false')}
b.addEventListener('click',function(){set(!n.classList.contains('open'))});
n.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.nav-links a:not([aria-haspopup])'))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
addEventListener('resize',function(){if(innerWidth>900)set(false)});})();
(function(){var c=document.getElementById('mobileBannerClose');if(c)c.addEventListener('click',function(){var b=document.getElementById('mobileBanner');if(b)b.style.display='none'})})();
document.addEventListener('click',function(e){var d=e.target.closest&&e.target.closest('.dl-link');if(!d)return;e.preventDefault();e.stopPropagation();window.open(d.getAttribute('data-href'),'_blank','noopener,noreferrer')},true);
(function(){var li=document.querySelector('.nav-dl');if(!li)return;var t=li.querySelector('a[aria-haspopup]'),tm=0,fine=matchMedia('(hover:hover) and (pointer:fine)');
function set(o){li.classList.toggle('open',o);t.setAttribute('aria-expanded',o?'true':'false')}
function hov(){return fine.matches&&innerWidth>900}
li.addEventListener('mouseenter',function(){if(hov()){clearTimeout(tm);set(true)}});
li.addEventListener('mouseleave',function(){if(hov()){tm=setTimeout(function(){set(false)},200)}});
t.addEventListener('click',function(e){e.preventDefault();set(!li.classList.contains('open'))});
document.addEventListener('click',function(e){if(!li.contains(e.target))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){set(false)}});
})();
/* Welcome voice: browsers block speech until the visitor interacts, so it speaks once per session on the first click, tap or key press. */
(function(){
 if(!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return;
 try{if(sessionStorage.getItem('welcomeSpoken'))return}catch(e){}
 var ev=['click','keydown','touchend'],done=false;
 function speak(e){
  if(done||(e&&e.type==='keydown'&&e.key==='Escape'))return;
  done=true;ev.forEach(function(t){document.removeEventListener(t,speak,true)});
  try{sessionStorage.setItem('welcomeSpoken','1')}catch(x){}
  var u=new SpeechSynthesisUtterance('Welcome');u.lang='en-US';u.rate=.95;u.pitch=1;u.volume=.9;
  var vs=speechSynthesis.getVoices(),v=vs.filter(function(x){return /^en[-_](US|IN|GB)/i.test(x.lang)&&/natural|google|neural|online/i.test(x.name)})[0]||vs.filter(function(x){return /^en/i.test(x.lang)})[0];
  if(v)u.voice=v;
  speechSynthesis.cancel();speechSynthesis.speak(u);
 }
 ev.forEach(function(t){document.addEventListener(t,speak,true)});
})();