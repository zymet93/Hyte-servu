import{f as p}from"./fetch-hDQBONsW.js";/* empty css              */async function y(){const n="hyte-servuu.northeurope.cloudapp.azure.com/api/auth/me",o={method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};try{const e=await fetch(n,o);if(!e.ok)throw new Error("Failed to fetch user data. Status: "+e.status);const r=await e.json();if(!r.user||!r.user.user_id)throw new Error("Invalid response format. User ID not found.");return r.user.user_id}catch(e){return console.error("Error fetching user ID:",e.message),null}}const E=document.querySelector(".get_users");E.addEventListener("click",h);async function h(){console.log("Haetaan kaikki entriet");const n="hyte-servuu.northeurope.cloudapp.azure.com/api/entries",o={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};p(n,o).then(e=>{console.log(e),f(e)})}function f(n){const t=document.querySelector(".tbody");t.innerHTML="",n.forEach(o=>{const e=document.createElement("tr"),r=document.createElement("td");r.innerText=g(o.entry_date),e.appendChild(r);const l=document.createElement("td");l.innerText=o.mood,e.appendChild(l);const d=document.createElement("td");d.innerText=o.sleep_hours,e.appendChild(d);const c=document.createElement("td"),s=document.createElement("button");s.className="check",s.innerText="Notes",s.addEventListener("click",function(){const u=o.notes;k(u)}),c.appendChild(s),e.appendChild(c);const i=document.createElement("td"),a=document.createElement("button");a.className="del",a.dataset.id=o.entry_id,a.textContent="Delete",i.appendChild(a),a.addEventListener("click",S);const m=document.createElement("td");m.innerText=o.entry_id,e.appendChild(i),e.appendChild(m),t.appendChild(e)})}function k(n){const t=document.getElementById("notesDialog"),o=document.getElementById("dialogText");o.innerText=n,t.showModal()}document.getElementById("closeNotes").addEventListener("click",function(){document.getElementById("notesDialog").close()});function S(n){console.log("klikkasit delete nappulaa",n);const t=n.target.attributes["data-id"].value;console.log(t);const o=n.target.parentElement.nextElementSibling.textContent;console.log("toinen tapa",o);const e="hyte-servuu.northeurope.cloudapp.azure.com/api/entries/"+t,l={method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};confirm("Oletko varma, että haluat poistaa entryn:"+t)&&p(e,l).then(c=>{console.log(c),h()})}const T=document.querySelector(".creatediary");T.addEventListener("click",async n=>{n.preventDefault(),console.log("Nyt luodaan Diary entry");const t=document.querySelector(".addform");if(!t.checkValidity()){t.reportValidity();return}const o=t.querySelector("input[name=entry_date]").value,e=t.querySelector("select[name=mood]").value,r=t.querySelector("input[name=weight]").value,l=t.querySelector("input[name=sleep_hours]").value,d=t.querySelector("textarea[name=notes]").value,c=await y();console.log(c),g(o);const s="hyte-servuu.northeurope.cloudapp.azure.com/api/entries";let i=localStorage.getItem("token");const a={user_id:c,entry_date:o,mood:e,weight:r,sleep_hours:l,notes:d};console.log(a);const m={method:"POST",headers:{Authorization:"Bearer: "+i,"Content-Type":"application/json"},body:JSON.stringify(a)};p(s,m).then(u=>{console.log(u),h(),t.reset()}).catch(u=>{console.error("Error:",u)})});function g(n){const t=new Date(n),o=t.getDate().toString().padStart(2,"0"),e=(t.getMonth()+1).toString().padStart(2,"0"),r=t.getFullYear();return`${o}.${e}.${r}`}async function w(){console.log("Täällä ollaan!");const n="hyte-servuu.northeurope.cloudapp.azure.com/api/auth/me",o={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};p(n,o).then(e=>{console.log(e),document.getElementById("name").innerHTML=e.user.username})}document.querySelector(".logout").addEventListener("click",D);function D(n){n.preventDefault(),localStorage.removeItem("token"),console.log("logginout"),window.location.href="index.html"}w();
