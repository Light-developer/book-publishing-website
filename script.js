const header=document.getElementById("site-header");const menuButton=document.getElementById("menu-button");const mobileMenu=document.getElementById("mobile-menu");
const updateHeader=()=>header.classList.toggle("is-scrolled",window.scrollY>24);window.addEventListener("scroll",updateHeader,{passive:true});updateHeader();
menuButton?.addEventListener("click",()=>{const open=menuButton.classList.toggle("is-open");menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");mobileMenu.classList.toggle("hidden",!open)});
document.querySelectorAll(".mobile-link").forEach(link=>link.addEventListener("click",()=>{menuButton.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open menu");mobileMenu.classList.add("hidden")}));

document.querySelectorAll("[data-reveal]").forEach(item=>{const delay=item.dataset.delay;if(delay)item.style.setProperty("--reveal-delay",delay+"ms")});
const revealItems=document.querySelectorAll("[data-reveal]");
if("IntersectionObserver"in window){const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add("is-visible");obs.unobserve(entry.target)})},{threshold:.14,rootMargin:"0px 0px -40px"});revealItems.forEach(item=>observer.observe(item))}else revealItems.forEach(item=>item.classList.add("is-visible"));

const heroBook=document.querySelector(".book-stage");
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer=window.matchMedia("(hover: hover) and (pointer: fine)");

if(heroBook&&finePointer.matches&&!reduceMotion.matches){
  let frame=null;
  let targetX=0,targetY=0,currentX=0,currentY=0;
  const render=()=>{
    currentX+=(targetX-currentX)*0.08;
    currentY+=(targetY-currentY)*0.08;
    heroBook.style.setProperty("--book-tilt-x",currentY.toFixed(2)+"deg");
    heroBook.style.setProperty("--book-tilt-y",currentX.toFixed(2)+"deg");
    if(Math.abs(targetX-currentX)>.01||Math.abs(targetY-currentY)>.01) frame=requestAnimationFrame(render);
    else frame=null;
  };
  heroBook.addEventListener("pointermove",(event)=>{
    const rect=heroBook.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    targetX=Math.max(-2.2,Math.min(2.2,x*4.4));
    targetY=Math.max(-2.2,Math.min(2.2,-y*3.2));
    if(!frame)frame=requestAnimationFrame(render);
  });
  heroBook.addEventListener("pointerleave",()=>{
    targetX=0;targetY=0;
    if(!frame)frame=requestAnimationFrame(render);
  });
}

window.addEventListener("resize",()=>{if(window.innerWidth>=768){menuButton.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");mobileMenu.classList.add("hidden")}});
