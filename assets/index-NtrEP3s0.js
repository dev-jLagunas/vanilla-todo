(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function l(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(s){if(s.ep)return;s.ep=!0;const c=l(s);fetch(s.href,c)}})();const u=document.body,d=document.querySelector(".theme-icon"),p=document.querySelector(".todo-form"),m=document.querySelector(".todo-input"),r=document.querySelector(".todo-list"),h=document.querySelectorAll("input[name='filter']"),y=document.getElementById("list-length"),L=document.querySelector(".clearall-btn");let g=JSON.parse(localStorage.getItem("taskList"))||[];g.forEach(t=>f(t));d.addEventListener("click",()=>{const t=u.classList.toggle("light-theme");d.src=t?"public/icon-moon.svg":"public/sun.svg",d.alt=t?"Dark Icon":"Light Icon"});p.addEventListener("submit",E);h.forEach(t=>{t.addEventListener("change",v)});L.addEventListener("click",I);function E(t){t.preventDefault();const e=m.value;f({name:e,completed:!1}),m.value="",i(),n()}function f(t){const e=document.createElement("li");e.classList.add("list-item");const l=document.createElement("span");l.innerText=t.name,e.appendChild(l),t.completed&&e.firstElementChild.classList.add("completed");const o=document.createElement("i");o.className="fa-regular fa-circle",o.addEventListener("click",()=>{e.firstElementChild.classList.toggle("completed"),e.firstElementChild.classList.contains("completed")?(o.classList.remove("fa-regular","fa-circle"),o.classList.add("fa-solid","fa-circle-check")):(o.classList.remove("fa-solid","fa-circle-check"),o.classList.add("fa-regular","fa-circle")),i(),n()});const s=document.createElement("i");s.className="fas fa-times",s.addEventListener("click",()=>{e.remove(),i(),n()}),l.prepend(o),e.appendChild(s),r.appendChild(e)}function i(){const t=Array.from(document.querySelectorAll("li")).map(e=>({name:e.innerText,completed:e.firstElementChild.classList.contains("completed")}));localStorage.setItem("taskList",JSON.stringify(t))}function v(t){const e=t.target.value;Array.from(r.children).forEach(o=>{switch(e){case"all":o.style.display="flex";break;case"completed":o.firstElementChild.classList.contains("completed")?o.style.display="flex":o.style.display="none";break;case"active":o.firstElementChild.classList.contains("completed")?o.style.display="none":o.style.display="flex";break}})}function n(){let t=0;for(let e of r.children)e.firstElementChild.classList.contains("completed")||t++;y.innerText=t}function I(){Array.from(r.children).forEach(e=>{e.firstElementChild.classList.contains("completed")&&e.remove()}),i(),n()}n();
