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
