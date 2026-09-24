const menuBtn=document.querySelector(".menuBtn"),nav=document.querySelector("#nav");
menuBtn?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn?.setAttribute("aria-expanded","false")}));

const slides=[...document.querySelectorAll(".slide")],dots=document.querySelector("#dots");let current=0;
slides.forEach((_,i)=>{const d=document.createElement("button");d.className="dot"+(i===0?" active":"");d.setAttribute("aria-label",`Show image ${i+1}`);d.addEventListener("click",()=>show(i));dots?.appendChild(d)});
function show(i){if(!slides.length)return;current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle("active",n===current));[...document.querySelectorAll(".dot")].forEach((d,n)=>d.classList.toggle("active",n===current))}
document.querySelector("#prev")?.addEventListener("click",()=>show(current-1));
document.querySelector("#next")?.addEventListener("click",()=>show(current+1));

const modal=document.querySelector("#memberModal");
document.querySelector("#openMember")?.addEventListener("click",()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false")});
document.querySelector("#closeMember")?.addEventListener("click",closeModal);
modal?.addEventListener("click",e=>{if(e.target===modal)closeModal()});
function closeModal(){modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true")}

const toast=document.querySelector("#toast");
function say(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600)}
document.querySelector("#memberForm")?.addEventListener("submit",e=>{e.preventDefault();const name=document.querySelector("#memberName").value.trim(),email=document.querySelector("#memberEmail").value.trim();localStorage.setItem("suDemoMember",JSON.stringify({name,email}));document.querySelector("#memberStatus").textContent=`Demo membership saved for ${name}.`;say("Demo membership created.")});
document.querySelector("#contactForm")?.addEventListener("submit",e=>{e.preventDefault();say("Demo message received.");e.target.reset()});
document.querySelectorAll(".temp").forEach(b=>b.addEventListener("click",()=>say("This feature will be connected in Stage 2.")));
document.querySelectorAll(".protected").forEach(b=>b.addEventListener("click",()=>{const m=localStorage.getItem("suDemoMember");if(m)say("Member preview unlocked.");else{modal.classList.add("open");modal.setAttribute("aria-hidden","false")}}));
