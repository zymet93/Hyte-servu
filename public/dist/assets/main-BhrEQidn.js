import{f as i}from"./fetch-hDQBONsW.js";/* empty css              */document.addEventListener("DOMContentLoaded",function(){const o=document.createElement("img");o.src="./img/relax.jpg";const n=document.querySelector("h3");n.parentNode.insertBefore(o,n),document.getElementById("loginButton").addEventListener("click",function(){document.getElementById("loginDialog").showModal()}),document.querySelector(".loginuser").addEventListener("click",async c=>{c.preventDefault(),console.log("Nyt logataan sisään");const l="hyte-servuu.northeurope.cloudapp.azure.com/api/auth/login",s=document.querySelector(".login_form"),e={username:s.querySelector("input[name=username]").value,password:s.querySelector("input[name=password]").value},r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};i(l,r).then(t=>{console.log(t),console.log(t.token),localStorage.setItem("token",t.token),t.token===void 0?alert("Unauth user: Käyttäjänimi tai salasana ei oikein"):(alert("Logged in successfully"),window.location.href="start-api-harjoituspohja.html"),logResponse("loginResponse",`localStorage set with token value: ${t.token}`)})}),document.getElementById("closeDialogButton").addEventListener("click",function(){document.getElementById("loginDialog").close()})});document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("loginDialog"),n=document.getElementById("register_dialog");document.getElementById("switchToRegister").addEventListener("click",function(){o.close(),n.showModal()}),document.querySelector(".createuser").addEventListener("click",async l=>{l.preventDefault(),console.log("Nyt luodaan käyttäjä");const s="hyte-servuu.northeurope.cloudapp.azure.com/api/users",e=document.querySelector(".create_user_form"),r=e.querySelector("input[name=username]").value;if(!e.checkValidity()){e.reportValidity();return}const t={username:r,password:e.querySelector("input[name=password]").value,email:e.querySelector("input[name=email]").value},u={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};i(s,u).then(d=>{console.log(d)}),n.close(),o.showModal()}),document.getElementById("closeRegisterButton").addEventListener("click",function(){document.getElementById("register_dialog").close(),document.getElementById("loginDialog").showModal()})});
