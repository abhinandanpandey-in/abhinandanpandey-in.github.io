/* Mobile nav menu. External file so it works under the Cloudflare CSP (script-src 'self'). */
(function(){var n=document.querySelector('nav'),b=n&&n.querySelector('.nav-burger');if(!b)return;
function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false')}
b.addEventListener('click',function(){set(!n.classList.contains('open'))});
n.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.nav-links a'))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
addEventListener('resize',function(){if(innerWidth>900)set(false)});})();
(function(){var c=document.getElementById('mobileBannerClose');if(c)c.addEventListener('click',function(){var b=document.getElementById('mobileBanner');if(b)b.style.display='none'})})();
document.addEventListener('click',function(e){var d=e.target.closest&&e.target.closest('.dl-link');if(!d)return;e.preventDefault();e.stopPropagation();window.open(d.getAttribute('data-href'),'_blank','noopener,noreferrer')},true);
