const header=document.getElementById("site-header");const menuButton=document.getElementById("menu-button");const mobileMenu=document.getElementById("mobile-menu");
const updateHeader=()=>header.classList.toggle("is-scrolled",window.scrollY>24);window.addEventListener("scroll",updateHeader,{passive:true});updateHeader();
menuButton?.addEventListener("click",()=>{const open=menuButton.classList.toggle("is-open");menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");mobileMenu.classList.toggle("hidden",!open)});
document.querySelectorAll(".mobile-link").forEach(link=>link.addEventListener("click",()=>{menuButton.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open menu");mobileMenu.classList.add("hidden")}));

document.querySelectorAll("[data-reveal]").forEach(item=>{const delay=item.dataset.delay;if(delay)item.style.setProperty("--reveal-delay",delay+"ms")});
const revealItems=document.querySelectorAll("[data-reveal]");
if("IntersectionObserver"in window){const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add("is-visible");obs.unobserve(entry.target)})},{threshold:.14,rootMargin:"0px 0px -40px"});revealItems.forEach(item=>observer.observe(item))}else revealItems.forEach(item=>item.classList.add("is-visible"));

window.addEventListener("resize",()=>{if(window.innerWidth>=768){menuButton.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");mobileMenu.classList.add("hidden")}});
