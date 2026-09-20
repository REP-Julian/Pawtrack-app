import{a as ne,d as H,Q,I as J,s as Pe,c as Ue}from"./appwrite-CRWyoAJa.js";const A="pawtrack_db",Z="pets",ee="applications",je="vet_appointments",Le="recycle_bin",xt="activity_logs",Se="pawtrack_storage";let $="",Ge="",F="",L={},te="",b=[],I=[],R=[],q=[],Ye=null,ye=[],k={};document.addEventListener("DOMContentLoaded",async()=>{var ht;const se=document.getElementById("btnThemeToggle"),Xe=document.querySelector('meta[name="color-scheme"]');function $e(e){document.documentElement.setAttribute("data-theme",e),Xe&&(Xe.content=e),se&&(se.setAttribute("title",e==="dark"?"Switch to Light Mode":"Switch to Dark Mode"),se.setAttribute("aria-label",e==="dark"?"Switch to Light Mode":"Switch to Dark Mode"))}const Et=localStorage.getItem("pawtrack_theme"),Bt=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;$e(Et||(Bt?"dark":"light")),se&&se.addEventListener("click",()=>{const a=(document.documentElement.getAttribute("data-theme")||"light")==="dark"?"light":"dark";localStorage.setItem("pawtrack_theme",a),$e(a)}),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{localStorage.getItem("pawtrack_theme")||$e(e.matches?"dark":"light")});try{const e=await ne.get();$=e.name,Ge=e.email,F=e.$id,L=e.prefs||{},te=((ht=e.prefs)==null?void 0:ht.phone)||"";const a=document.getElementById("userNameDisplay");if(a){const t=L.username||$;a.innerText=t?"Welcome, "+t+"!":"Welcome!"}try{b=(await H.listDocuments(A,Z)).documents.map(s=>({...s,id:s.$id})),I=(await H.listDocuments(A,ee,[Q.equal("user_id",F)])).documents.map(s=>({...s,id:s.$id})),R=(await H.listDocuments(A,je,[Q.equal("user_id",F)])).documents.map(s=>({...s,id:s.$id})),q=(await H.listDocuments(A,Le,[Q.equal("owner",$)])).documents.map(s=>({...s,id:s.$id}))}catch(t){console.warn("Database collections not fully setup yet. Using empty arrays.",t)}}catch(e){console.error("User not logged in",e),window.location.href="/PawTrackLogin.html";return}async function _(e,a,t){try{await H.createDocument(A,xt,J.unique(),{user_id:F,action:e||"Activity recorded",target:a||"",icon:t||"fa-paw",timestamp:Date.now().toString()})}catch(i){console.warn("Failed to persist activity log to Appwrite:",i)}}function Je(){document.body.style.zoom="1",document.body.style.width="100%",document.body.style.height="100%",navigator.userAgent.toLowerCase().includes("firefox")&&(document.body.style.transform="none")}let oe;function E(e,a,t=!1,i=null){const r=document.getElementById("customPopupOverlay"),n=document.getElementById("customPopupTitle"),s=document.getElementById("customPopupMessage"),o=document.getElementById("customPopupActions");n.innerText=e,s.innerText=a,n.className=t?"custom-popup-title title-error":"custom-popup-title title-success",o.style.display="none",r.style.display="flex",clearTimeout(oe),oe=setTimeout(()=>{V(i)},5e3),document.getElementById("customPopupClose").onclick=()=>{clearTimeout(oe),V(i)}}function Ze(e,a,t){const i=document.getElementById("customPopupOverlay"),r=document.getElementById("customPopupTitle"),n=document.getElementById("customPopupMessage"),s=document.getElementById("customPopupActions");r.innerText=e,r.className="custom-popup-title title-success",n.innerHTML=`<p style="margin-bottom:10px;">${a}</p><input type="text" id="customPromptInput" style="width:100%; padding:12px; border-radius:8px; border:2px solid #cbd5e1; outline:none; font-size:1rem; font-weight:600; color:#0f172a;" autocomplete="off">`,s.style.display="flex",i.style.display="flex",clearTimeout(oe),document.getElementById("btnPopupConfirm").innerText="Submit",document.getElementById("btnPopupConfirm").onclick=()=>{const o=document.getElementById("customPromptInput").value;V(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",o.trim()!==""&&t(o.trim())},document.getElementById("customPopupClose").onclick=()=>{V()},document.getElementById("btnPopupCancel").onclick=()=>{V(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure"}}function re(e,a,t){const i=document.getElementById("customPopupOverlay"),r=document.getElementById("customPopupTitle"),n=document.getElementById("customPopupMessage"),s=document.getElementById("customPopupActions");r.innerText=e,r.className="custom-popup-title title-error",n.innerHTML=`<p>${a}</p>`,s.style.display="flex",i.style.display="flex",clearTimeout(oe),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",document.getElementById("btnPopupConfirm").onclick=()=>{V(),t&&t()},document.getElementById("customPopupClose").onclick=()=>{V()},document.getElementById("btnPopupCancel").onclick=()=>{V()}}function V(e){document.getElementById("customPopupOverlay").style.display="none",e&&e()}window.addEventListener("resize",Je),Je();const le=[{initials:"MD",name:"Dr. Miguel Antonio Dela Cruz",specialty:"General Veterinary Practitioner",phone:"0917-555-0101",email:"mdelacruz@pawtrack.ph",schedule:"Mon-Fri: 8am-4pm",clinic:"Quezon City Main Clinic",exp:"15 yrs exp",rating:"4.8"},{initials:"JS",name:"Dr. Joanna Marie R. Santos",specialty:"Veterinary Surgeon",phone:"0917-555-0102",email:"jmsantos@pawtrack.ph",schedule:"Tue-Sat: 10am-6pm",clinic:"Makati Pet Hospital",exp:"12 yrs exp",rating:"4.9"},{initials:"PV",name:"Dr. Paulo C. Villanueva",specialty:"Veterinary Oncologist",phone:"0917-555-0103",email:"pvillanueva@pawtrack.ph",schedule:"Mon-Thu: 9am-5pm",clinic:"BGC Animal Center",exp:"8 yrs exp",rating:"4.7"}];let W=0,U=[],ae=[],j=0,z=null,ie=[],Ae=3;const G=document.querySelectorAll(".sidebar-nav .nav-btn"),v=document.getElementById("mainDisplayPanel"),Ke=document.getElementById("profileTemplate").innerHTML,Me=document.getElementById("cartItemsContainer"),Tt=document.getElementById("cartTotalDisplay"),de=(e,a,t)=>`
        <div class="page-header">
            <div>
                <h2><i class="${t}"></i> ${e}</h2>
                <p>${a}</p>
            </div>
        </div>
    `;function ce(){let e="";if(typeof b<"u"&&b.length>0){const a=b.filter(t=>t.status==="Available");a.length>0?a.forEach(t=>{const i=t.gender==="Female"?"gender-female":"gender-male",n=t.owner===$?`
                        <button class="btn-archive-pet" data-petid="${t.id}" title="Move to Bin" 
                            style="background: #fee2e2; color: #ef4444; border: 2px solid #fca5a5; border-radius: 10px; padding: 10px; cursor: pointer; transition: 0.3s;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    `:"",s=t.img||"https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";e+=`
                        <div class="pet-item-wrapper">
                            <div class="pet-card ${i}">
                                <img src="${s}" alt="${t.name}" class="pet-card-img">
                                <div class="pet-card-body">
                                    <h3 class="pet-name">${t.name}</h3>
                                    <p class="pet-breed">${t.breed}</p>
                                    <p class="pet-meta">${t.gender} • ${t.age}</p>
                                    <span class="status-badge">● ${t.status}</span>
                                    
                                    <div class="pet-actions" style="display: flex; gap: 8px;">
                                        <button class="btn-view-pet" data-target="pet-details-${t.id}" title="View Details" style="flex: 1;">
                                            Details <i class="fa-solid fa-chevron-down"></i>
                                        </button>
                                        
                                        ${n}

                                        <button class="btn-adopt" data-petid="${t.id}" data-petname="${t.name}" style="flex: 1;">Adopt Now</button>
                                    </div>
                                </div>
                            </div>
                            <div class="pet-details-dropdown ${i}" id="pet-details-${t.id}">
                                <div class="details-grid">
                                    <div class="detail-box"><label>Health Status</label><p>${t.health_status||"Healthy"}</p></div>
                                    <div class="detail-box"><label>Contact / Owner</label><p>@${t.owner||"PawTrack Caregiver"} <br><span style="font-size:0.85rem;">${t.contact_number||"0917-000-0000"}</span></p></div>
                                </div>
                                <div class="detail-box" style="margin-bottom: 15px;">
                                    <label>Personality Traits</label><p>${t.personal_traits||"Friendly and loving companion"}</p>
                                </div>
                                <div class="detail-box" style="margin-bottom: 25px;">
                                    <label>Background / Reason for Adoption</label><p>${t.reason_for_adoption||"Looking for a warm forever family."}</p>
                                </div>
                                <div style="text-align: right;">
                                    <button class="btn-close-pet" data-target="pet-details-${t.id}">Close Details</button>
                                </div>
                            </div>
                        </div>
                    `}):e='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available for adoption.</p>'}else e='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available in the system.</p>';return`
            <div class="page-container">
                ${de("Meet the Pets","Say hello to our furry friends currently waiting for a loving home.","fa-solid fa-paw")}
                <div class="pet-grid">
                    ${e}
                </div>
            </div>
        `}function pe(){let e="",a="";return typeof I<"u"&&I.length>0&&I.forEach(t=>{const i=t.status==="Approved",r=i?"var(--emerald-light, #D1FAE5)":"var(--amber-light, #FEF3C7)",n=i?"#065F46":"#92400E",o=`
                <div class="app-item-wrapper" style="margin-bottom: 18px;">
                    <div class="app-card" style="border: 1px solid ${i?"rgba(16, 185, 129, 0.3)":"rgba(217, 119, 6, 0.25)"}; border-radius: 18px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; box-shadow: 0 4px 16px rgba(45, 30, 20, 0.05); z-index: 2; position: relative;">
                        <div style="display: flex; gap: 16px; align-items: center;">
                            <img src="${t.img}" alt="${t.pet_name}" style="width: 64px; height: 64px; border-radius: 14px; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 2px solid white;">
                            <div>
                                <h3 style="margin: 0 0 4px 0; color: #1F2421; font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800;">${t.pet_name}</h3>
                                <small style="color: #6B7280; font-weight: 500;"><i class="fa-regular fa-calendar-check" style="margin-right: 4px; color: var(--primary);"></i> Applied: ${t.date}</small>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <span style="background: ${r}; color: ${n}; padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-circle" style="font-size: 0.45rem;"></i> ${t.status}
                            </span>
                            
                            <button class="${i?"btn-adopt":"btn-view-app"}" data-target="app-details-${t.id}" style="${i?"padding: 9px 20px;":"padding: 9px 18px; background: #FAF8F5; border: 1px solid rgba(45,49,46,0.12); color: #1F2421; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;"}">
                                ${i?'<i class="fa-solid fa-heart"></i> Finalize':'Details <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>'}
                            </button>
                        </div>
                    </div>

                    <div class="app-details-dropdown" id="app-details-${t.id}" style="display: none; background: #FFFFFF; border: 1px solid rgba(45, 49, 46, 0.08); border-top: 1px dashed rgba(45, 49, 46, 0.15); border-radius: 0 0 18px 18px; padding: 24px; margin-top: -12px; position: relative; z-index: 1; box-shadow: 0 8px 24px rgba(45,30,20,0.06);">
                        <div class="details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div class="detail-box">
                                <label>Pet Name</label>
                                <p>${t.pet_name}</p>
                            </div>
                            <div class="detail-box">
                                <label>Date Applied</label>
                                <p>${t.date}</p>
                            </div>
                            <div class="detail-box" style="grid-column: 1 / -1;">
                                <label>Adoption Status Message</label>
                                <p style="color: ${i?"#065F46":"#92400E"};">${i?"🎉 Congratulations! Your adoption request is approved. Get in touch with the shelter/owner to finalize handover.":"⏳ Your application is currently under thorough review by the caregiver. We will notify you promptly!"}</p>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
                            ${i?"":`<button class="btn-cancel-app" data-appid="${t.id}" style="padding: 10px 20px; background: white; color: #EF4444; border: 1px solid #FCA5A5; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-ban"></i> Withdraw Application</button>`}
                            <button class="btn-close-pet" data-target="app-details-${t.id}" style="padding: 10px 20px; background: #FAF8F5; border: 1px solid rgba(45, 49, 46, 0.12); border-radius: 12px; color: #4B5563; font-weight: 700; cursor: pointer;">Close Details</button>
                        </div>
                    </div>
                </div>
            `;i?a+=o:e+=o}),`
            <div class="page-container">
                ${de("My Applications","Track the journey of your adoption requests and welcome your new companion home.","fa-solid fa-clipboard-list")}
                
                <!-- Adoption Journey Stepper Banner -->
                <div style="background: linear-gradient(135deg, #FFFDF9 0%, #FBF7F0 100%); border: 1px solid rgba(224, 90, 71, 0.15); border-radius: 20px; padding: 24px 30px; margin-bottom: 28px; box-shadow: 0 4px 16px rgba(45,30,20,0.04);">
                    <h4 style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 800; color: #1F2421; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-route" style="color: var(--primary);"></i> The Adoption Journey
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px;">
                        <div style="background: white; border: 1px solid rgba(45,49,46,0.08); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 10px;">
                            <span style="width: 28px; height: 28px; border-radius: 50%; background: #FDF2F0; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">1</span>
                            <div><strong style="font-size: 0.85rem; display: block; color: #1F2421;">Submitted</strong><small style="color: #6B7280; font-size: 0.75rem;">Digital file sent</small></div>
                        </div>
                        <div style="background: white; border: 1px solid rgba(45,49,46,0.08); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 10px;">
                            <span style="width: 28px; height: 28px; border-radius: 50%; background: #FEF3C7; color: #D97706; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">2</span>
                            <div><strong style="font-size: 0.85rem; display: block; color: #1F2421;">Under Review</strong><small style="color: #6B7280; font-size: 0.75rem;">Caregiver review</small></div>
                        </div>
                        <div style="background: white; border: 1px solid rgba(45,49,46,0.08); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 10px;">
                            <span style="width: 28px; height: 28px; border-radius: 50%; background: #E0F2FE; color: #0284C7; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">3</span>
                            <div><strong style="font-size: 0.85rem; display: block; color: #1F2421;">Home Check</strong><small style="color: #6B7280; font-size: 0.75rem;">Safety verification</small></div>
                        </div>
                        <div style="background: white; border: 1px solid rgba(45,49,46,0.08); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 10px;">
                            <span style="width: 28px; height: 28px; border-radius: 50%; background: #D1FAE5; color: #065F46; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">4</span>
                            <div><strong style="font-size: 0.85rem; display: block; color: #1F2421;">Approved</strong><small style="color: #6B7280; font-size: 0.75rem;">Welcome home! 🐾</small></div>
                        </div>
                    </div>
                </div>

                <div class="applications-grid">
                    <div>
                        <h3 class="app-column-title" style="color: #B45309;"><i class="fa-solid fa-hourglass-half" style="color: #F59E0B;"></i> In Review</h3>
                        ${e||'<div class="glass-panel" style="text-align: center; padding: 40px; color: #9CA3AF;"><i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; color: #E5E7EB;"></i><p style="font-weight: 600;">No applications currently in review.</p></div>'}
                    </div>

                    <div>
                        <h3 class="app-column-title" style="color: #065F46;"><i class="fa-solid fa-circle-check" style="color: #10B981;"></i> Approved & Finalizing</h3>
                        ${a||'<div class="glass-panel" style="text-align: center; padding: 40px; color: #9CA3AF;"><i class="fa-solid fa-circle-check" style="font-size: 2.5rem; margin-bottom: 12px; color: #E5E7EB;"></i><p style="font-weight: 600;">No approved applications yet.</p></div>'}
                    </div>
                </div>
            </div>
        `}const He=()=>{let e="";return typeof q<"u"&&q.length>0?q.forEach(a=>{const t=a.gender==="Female"?"gender-female":"gender-male";e+=`
                    <div class="pet-item-wrapper">
                        <div class="pet-card ${t}" style="opacity: 0.85;">
                            <img src="${a.img}" alt="${a.name}" class="pet-card-img" style="filter: grayscale(40%);">
                            <div class="pet-card-body">
                                <h3 class="pet-name">${a.name}</h3>
                                <p class="pet-breed">${a.breed}</p>
                                <p class="pet-meta" style="color: #ef4444;"><i class="fa-solid fa-trash-can"></i> In Recycle Bin</p>
                                
                                <div class="pet-actions" style="margin-top: auto; padding-top: 15px;">
                                    <button class="btn-restore-pet" data-petid="${a.id}" style="width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s;">
                                        <i class="fa-solid fa-rotate-left"></i> Restore Pet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `}):e='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px; font-size: 1.1rem;">Your Recycle Bin is empty.</p>',`
            <div class="page-container">
                <div class="page-header" style="margin-bottom: 15px;">
                    <div>
                        <h2><i class="fa-solid fa-trash-can" style="color: #ef4444;"></i> Recycle Bin</h2>
                        <p>Pets here will be permanently deleted after 30 days.</p>
                    </div>
                    
                    <div style="display: flex; gap: 15px;">
                        <button class="btn-animated" id="btnEmptyBin" style="background: #ef4444; color: white; border: none; box-shadow: 0 4px 15px rgba(239,68,68,0.4);">
                            <i class="fa-solid fa-dumpster-fire"></i> Empty Bin
                        </button>
                        <button class="btn-animated" id="btnBackToProfile" style="background: white; color: #4f46e5; border: 2px solid #4f46e5;">
                            <i class="fa-solid fa-arrow-left"></i> Back to Profile
                        </button>
                    </div>
                    
                </div>
                <div class="pet-grid">
                    ${e}
                </div>
            </div>
        `},Qe=(e,a)=>`
        <div class="registration-wrapper">
            <div class="page-header" style="margin-bottom: 15px;">
                <div>
                    <h2><i class="fa-solid fa-house-chimney-user" style="color: #ec4899;"></i> Adopt ${a}</h2>
                    <p>Complete the form below to start your adoption journey.</p>
                </div>
                <button class="btn-animated" id="btnBackToPets" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Pets</button>
            </div>

            <form id="adoptionApplicationForm" class="reg-form-container" style="flex-direction: column; min-height: auto;">
                <input type="hidden" id="adoptPetId" value="${e}">
                <input type="hidden" id="adoptPetName" value="${a}">

                <h3 class="section-title" style="margin-top: 0;">👤 Personal Information</h3>
                <div class="reg-fields-section" style="gap: 15px; margin-bottom: 25px; justify-content: flex-start;">
                    <div class="reg-row">
                        <div class="reg-input"><label>First Name *</label><input type="text" id="adoptFName" required></div>
                        <div class="reg-input"><label>Last Name *</label><input type="text" id="adoptLName" required></div>
                        <div class="reg-input"><label>Middle Name</label><input type="text" id="adoptMName"></div>
                    </div>
                    <div class="reg-row">
                        <div class="reg-input"><label>Date of Birth</label><input type="date" id="adoptDOB" required></div>
                        <div class="reg-input"><label>Age</label><input type="number" id="adoptAge" required></div>
                        <div class="reg-input"><label>Gender</label>
                            <select id="adoptGender">
                                <option>Male</option><option>Female</option><option>Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                </div>

                <h3 class="section-title">📧 Contact & Location</h3>
                <div class="reg-fields-section" style="gap: 15px; margin-bottom: 25px; justify-content: flex-start;">
                    <div class="reg-row">
                        <div class="reg-input"><label>Email Address *</label><input type="email" id="adoptEmail" required></div>
                        <div class="reg-input"><label>Contact Number *</label><input type="tel" id="adoptContact" required></div>
                        <div class="reg-input"><label>Occupation</label><input type="text" id="adoptOccupation"></div>
                    </div>
                    <div class="reg-row">
                        <div class="reg-input"><label>Province</label><input type="text" id="adoptProvince"></div>
                        <div class="reg-input"><label>City</label><input type="text" id="adoptCity"></div>
                        <div class="reg-input"><label>Barangay</label><input type="text" id="adoptBarangay"></div>
                    </div>
                    <div class="reg-row">
                        <div class="reg-input"><label>Street Address</label><input type="text" id="adoptAddress" style="width: 100%;"></div>
                    </div>
                </div>

                <h3 class="section-title">🏠 Living Situation</h3>
                <div class="reg-fields-section" style="gap: 15px; margin-bottom: 25px; justify-content: flex-start;">
                    <div class="reg-row">
                        <div class="reg-input"><label>Residency Type</label>
                            <select id="adoptResidency">
                                <option>Single Family</option><option>Duplex</option><option>Condo</option><option>Apartment</option><option>Trailer</option>
                            </select>
                        </div>
                        <div class="reg-input"><label>Do you have other pets?</label>
                            <select id="adoptOtherPets">
                                <option>Yes</option><option>No</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="glass-panel" style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; margin-bottom: 20px; box-shadow: none;">
                    <h4 style="color: #0f172a; margin-bottom: 10px;">Terms & Conditions</h4>
                    <ul style="color: #475569; font-size: 0.9rem; padding-left: 20px; margin-bottom: 15px; line-height: 1.6;">
                        <li>Provide a safe and loving home for the pet</li>
                        <li>Cover all veterinary expenses and proper care</li>
                        <li>Allow home visits if required</li>
                        <li>Return the pet if unable to care for them</li>
                    </ul>
                    <label style="display: flex; align-items: center; gap: 10px; font-size: 1rem; color: #0f172a; cursor: pointer; font-weight: bold;">
                        <input type="checkbox" id="adoptTerms" required style="width: 20px; height: 20px; accent-color: #ec4899;">
                        I agree to the terms and conditions *
                    </label>
                </div>

                <div class="reg-actions">
                    <button type="submit" class="btn-animated" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 15px;"><i class="fa-solid fa-paper-plane"></i> Submit Application</button>
                </div>
            </form>
        </div>
    `;function Fe(){let e="";typeof R<"u"&&R.length>0?R.forEach(n=>{const s=n.status==="Approved",o=s?"appt-approved":"appt-pending",d=s?"badge-approved":"badge-pending",m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],p=n.date.split("-"),g=p.length===3?m[parseInt(p[1])-1]:"TBD",f=p.length===3?p[2]:"??";e+=`
                    <div class="appt-mini-card ${o}">
                        <div class="appt-date-box"><strong>${f}</strong><span>${g}</span></div>
                        <img src="${n.img}" alt="${n.pet_name}" class="appt-pet-avatar" style="object-fit: cover;">
                        <div class="appt-details">
                            <h4>${n.pet_name}'s Visit</h4>
                            <p>${n.vet_name}</p>
                            <span class="badge ${d}">${n.status} • ${n.time}</span>
                        </div>
                        
                        ${s?"":`
                            <div style="margin-left: auto;">
                                <button class="btn-cancel-vet" data-appid="${n.appt_id||n.id}" title="Cancel Appointment" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        `}
                    </div>
                `}):e='<p style="color: #64748b; margin-top: 10px; font-weight: 500;">No upcoming appointments.</p>';let a="";const t=b.filter(n=>n.owner===$);let i=[];typeof R<"u"&&(i=R.filter(n=>n.status!=="Cancelled"&&n.status!=="Completed").map(n=>n.pet_name));const r=t.filter(n=>!i.includes(n.name));return r.length>0?r.forEach(n=>{const s=n.gender&&n.gender.toLowerCase()==="female"?"gender-female":"gender-male";a+=`
                    <div class="pet-select-card ${s}" data-petid="${n.id}" data-pet="${n.id}">
                        <img src="${n.img}" alt="${n.name}">
                        <span>${n.name}</span>
                    </div>
                `}):t.length>0?a='<p style="color: #f59e0b; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-clock" style="margin-right: 5px;"></i> All your pets currently have scheduled appointments. You can book another once current visits are completed or cancelled.</p>':a=`<p style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> You don't have any registered pets yet! Please register a pet first.</p>`,`
            <div class="page-container">
                ${de("Veterinary Appointments","Schedule checkups, vaccinations, and consultations for your pets.","fa-solid fa-user-doctor")}
                <div class="vet-module-grid">
                    <div class="glass-panel">
                        <h3 class="section-title"><i class="fa-solid fa-calendar-plus" style="color: #ec4899;"></i> Book New Appointment</h3>
                        <form id="vetBookingForm">
                            <div class="reg-input" style="margin-bottom: 20px;">
                                <label>Select Registered Pet <span class="required">*</span></label>
                                
                                <div class="visual-pet-selector">
                                    ${a}
                                </div>
                                <input type="hidden" id="apptPetSelectorHidden">
                            </div>
                            
                            <div class="reg-row">
                                <div class="reg-input"><label>Owner Name</label><input type="text" id="apptOwner" placeholder="Auto-filled" readonly class="readonly-input"></div>
                                <div class="reg-input"><label>Contact Number <span class="required">*</span></label><input type="tel" id="apptContact" placeholder="+63 XXX-XXX-XXXX" required></div>
                            </div>
                            <div class="reg-row">
                                <div class="reg-input"><label>Pet Type</label><input type="text" id="apptPetType" placeholder="Auto-filled" readonly class="readonly-input"></div>
                                <div class="reg-input"><label>Breed</label><input type="text" id="apptBreed" placeholder="Auto-filled" readonly class="readonly-input"></div>
                            </div>
                            <div class="reg-row">
                                <div class="reg-input"><label>Gender</label><input type="text" id="apptGender" placeholder="Auto-filled" readonly class="readonly-input"></div>
                                <div class="reg-input"><label>Current Weight (kg)</label><input type="number" step="0.1" id="apptWeight" placeholder="Auto-filled"></div>
                            </div>
                            <div style="border-top: 2px solid #e2e8f0; margin: 20px 0;"></div>
                            <div class="reg-row">
                                <div class="reg-input" style="flex: 1;">
                                    <label>Selected Veterinarian <span class="required">*</span></label>
                                    <div style="display: flex; gap: 10px;">
                                        <input type="text" id="apptSelectedVetName" placeholder="⬅ Use the profile card on the right to select a doctor" readonly class="readonly-input" required>
                                        <input type="hidden" id="apptVetIdHidden">
                                    </div>
                                </div>
                            </div>
                            <div class="reg-row">
                                <div class="reg-input"><label>Preferred Date <span class="required">*</span></label><input type="date" required id="apptDate"></div>
                                <div class="reg-input"><label>Preferred Time <span class="required">*</span></label><input type="time" required id="apptTime"></div>
                            </div>
                            <div class="reg-input" style="margin-bottom: 15px;"><label>Reason for Visit</label><textarea id="apptReason" placeholder="Briefly describe the reason for your visit..."></textarea></div>
                            <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 25px;">
                                <button type="reset" style="padding: 12px 25px; background: #ffffff; color: #64748b; border: 2px solid #cbd5e1; border-radius: 10px; font-weight: bold; cursor: pointer;">Clear Form</button>
                                <button type="submit" class="btn-primary" style="padding: 12px 30px; font-size: 1.1rem;">Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                    <div class="vet-right-section">
                        <div class="glass-panel vet-profile-card">
                            <div class="vet-card-header"></div>
                            <div class="vet-avatar" id="vetInitials">MD</div>
                            <h3 class="vet-name-display" id="vetNameDisplay">Dr. Name</h3>
                            <p class="vet-specialty" id="vetSpecialtyDisplay">Specialty</p>
                            <p class="vet-rating" id="vetRatingDisplay">⭐ Rating</p>
                            <div class="vet-card-controls">
                                <button type="button" class="btn-vet-nav" id="btnPrevVet"><i class="fa-solid fa-chevron-left"></i></button>
                                <button type="button" class="btn-vet-select" id="btnSelectVet">Confirm</button>
                                <button type="button" class="btn-vet-nav" id="btnNextVet"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            <div class="vet-info-list">
                                <div class="vet-info-item"><i class="fa-solid fa-phone"></i><div><strong>Contact</strong><p id="vetPhoneDisplay">Phone</p></div></div>
                                <div class="vet-info-item"><i class="fa-solid fa-envelope"></i><div><strong>Email</strong><p id="vetEmailDisplay">Email</p></div></div>
                                <div class="vet-info-item"><i class="fa-solid fa-clock"></i><div><strong>Schedule</strong><p id="vetScheduleDisplay">Schedule</p></div></div>
                                <div class="vet-info-item"><i class="fa-solid fa-location-dot"></i><div><strong>Clinic Location</strong><p id="vetClinicDisplay">Location</p></div></div>
                            </div>
                        </div>
                        
                        <div class="glass-panel" style="padding: 25px;">
                            <h3 class="section-title"><i class="fa-solid fa-clipboard-check" style="color: #10b981;"></i> Scheduled Visits</h3>
                            ${e}
                        </div>
                    </div>
                </div>
            </div>
        `}const et=[{id:1,brand:"NaturePet",name:"Nutricare Organic Dry Cat Food (1kg)",price:250,category:"Cat Food",img:"/resources/shop/catfood.jpg"},{id:2,brand:"PawSource",name:"100g Real Beef Dog Biscuit Treats",price:150,category:"Dog Food & Treats",img:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400"},{id:3,brand:"KONG",name:"Classic Durable Rubber Dog Toy",price:450,category:"Toys",img:"/resources/shop/dog_toy.jpg"},{id:4,brand:"Paws & Pals",name:"Heavy Duty Reflective Leash",price:299,category:"Accessories",img:"/resources/shop/leash.jpg"},{id:5,brand:"PetSafe",name:"Ceramic Anti-Slip Pet Bowl",price:180,category:"Accessories",img:"/resources/shop/bowl.jpg"},{id:6,brand:"CozyPet",name:"Fluffy Calming Pet Bed (Medium)",price:550,category:"Accessories",img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400"},{id:7,brand:"Whiskas",name:"Tuna Flavor Wet Cat Food (12 Pouch)",price:540,category:"Cat Food",img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"},{id:8,brand:"Pedigree",name:"Adult Beef & Veg Dry Dog Food (1.5kg)",price:380,category:"Dog Food & Treats",img:"/resources/shop/dogfood.jpg"},{id:9,brand:"FelineFun",name:"Interactive Feather Teaser Wand",price:95,category:"Toys",img:"https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400"},{id:10,brand:"GroomPro",name:"Silicone Pet Bath Massage Brush",price:110,category:"Grooming",img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400"}];function tt(e){if(e.length===0)return'<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 50px; font-size: 1.2rem;">No items match your filters.</p>';let a="";return e.forEach(t=>{a+=`
                <div class="shop-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div class="shop-img-box" style="height: 200px; overflow: hidden; position: relative; background: #f8fafc;">
                        <img src="${t.img}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <span style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; color: #475569; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${t.category}</span>
                    </div>
                    <div style="padding: 15px; display: flex; flex-direction: column; flex: 1;">
                        <span class="shop-brand" style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">${t.brand}</span>
                        
                        <h3 class="shop-title" style="margin: 5px 0 10px 0; font-size: 1.1rem; color: #0f172a; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${t.name}</h3>
                        
                        <div style="margin-top: auto;">
                            <div class="shop-price" style="font-size: 1.4rem; font-weight: 900; color: #ec4899; margin-bottom: 15px;">₱ ${t.price.toFixed(2)}</div>
                            <button class="btn-shop-cart btn-add-cart" data-name="${t.name}" data-price="${t.price}" data-img="${t.img}" style="width: 100%; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; border: 2px solid #4f46e5; background: white; color: #4f46e5; transition: 0.3s;" onmouseover="this.style.background='#e0e7ff'" onmouseout="this.style.background='white'">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `}),a}function It(){return`
            <div class="shop-layout">
                <div class="shop-sidebar glass-panel">
                    <h3 class="shop-sidebar-title"><i class="fa-solid fa-sliders"></i> Filters</h3>
                    
                    <div class="filter-group">
                        <label class="filter-title">CATEGORY</label>
                        <select id="shopCategoryFilter" class="shop-select">
                            <option value="All Categories">All Categories</option>
                            <option value="Dog Food & Treats">Dog Food & Treats</option>
                            <option value="Cat Food">Cat Food</option>
                            <option value="Toys">Toys</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Grooming">Grooming</option>
                        </select>
                    </div>

                    <div class="filter-group" style="margin-top: 24px;">
                        <div class="filter-price-header">
                            <label class="filter-title">MAX PRICE</label>
                            <span id="shopPriceDisplay" class="filter-price-badge">₱1000</span>
                        </div>
                        <input type="range" id="shopPriceFilter" min="50" max="1000" step="10" value="1000" class="custom-range-slider">
                        <div class="range-scale"><span>₱50</span><span>₱1,000</span></div>
                    </div>
                </div>

                <div class="shop-main">
                    <div class="shop-banner">
                        <div>
                            <h1>PawShop Marketplace</h1>
                            <p>Discover premium quality nutrition, accessories, and toys for your beloved pets.</p>
                        </div>
                        <button class="btn-cart" id="btnOpenCart">
                            <i class="fa-solid fa-cart-shopping"></i> View Cart 
                            <span class="cart-count" id="cartBadge">0</span>
                        </button>
                    </div>
                    
                    <div id="shopGridContainer" class="product-grid">
                        ${tt(et)}
                    </div>
                </div>
            </div>
        `}const kt=`
        <div class="registration-wrapper">
            ${de("Register a Pet","Fill in the details below to add a new pet to the system.","fa-solid fa-shield-cat")}
            <form id="petRegistrationForm" class="reg-form-container">
                <div class="reg-photo-section">
                    <div class="image-drop-zone" id="imageDropZone">
                        <img src="" alt="Preview" id="imagePreview" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; border-radius: 12px; background-color: #f8fafc;">
                        <div class="drop-zone-text" id="dropZoneText">
                            <i class="fa-solid fa-camera"></i><p>Upload Photo</p>
                        </div>
                        <input type="file" id="petImageInput" accept="image/png, image/jpeg" hidden>
                    </div>
                </div>
                
                <div class="reg-fields-section" style="justify-content: flex-start; gap: 15px;">
                    
                    <div class="reg-row">
                        <div class="reg-input"><label>Pet Name *</label><input type="text" name="name" required></div>
                        <div class="reg-input"><label>Breed</label><input type="text" name="breed" placeholder="e.g., Beagle Mix"></div>
                    </div>
                    
                    <div class="reg-row">
                        <div class="reg-input"><label>Gender</label><select name="gender"><option>Male</option><option>Female</option></select></div>
                        <div class="reg-input"><label>Age</label><input type="text" name="age" placeholder="e.g., 2 yrs"></div>
                    </div>
                    
                    <div class="reg-row">
                        <div class="reg-input"><label>Health Status</label><input type="text" name="health_status" placeholder="e.g., Vaccinated, Spayed"></div>
                        <div class="reg-input"><label>Contact Number</label><input type="tel" name="contact_number" placeholder="Your phone number"></div>
                    </div>

                    <div class="reg-input">
                        <label>Personal Traits</label>
                        <textarea name="personal_traits" placeholder="e.g., Playful, Energetic, Great with Kids" style="min-height: 70px;"></textarea>
                    </div>

                    <div class="reg-input">
                        <label>Reason for Adoption</label>
                        <textarea name="reason_for_adoption" placeholder="Briefly describe the pet's background and why they need a new home..." style="min-height: 70px;"></textarea>
                    </div>
                    <div class="reg-row reg-adoption-box">
                        <div class="reg-input" style="flex-direction: row; align-items: center; gap: 15px;">
                            <label style="margin-bottom: 0; cursor: pointer;" for="regForAdoption">Put up for Adoption?</label>
                            <input type="checkbox" id="regForAdoption" style="width: 22px; height: 22px; cursor: pointer; accent-color: var(--primary);">
                            <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 500;">(Leave unchecked to save as a personal pet in your Roster)</span>
                        </div>
                    </div>

                    <div class="reg-actions">
                        <button type="button" class="btn-cancel-reg" id="btnCancelReg">Cancel</button>
                        <button type="submit" class="btn-primary btn-submit-reg">
                            <i class="fa-solid fa-paw"></i>
                            <span>Register Pet</span>
                        </button>
                    </div>
                    
                </div>
            </form>
        </div>
    `;function he(){const e=b.filter(t=>t.owner===$&&t.status==="Private");let a="";return e.length>0?e.forEach(t=>{const i=t.gender==="Female"?"gender-female":"gender-male",r=t.img||"https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b";a+=`
                    <div class="my-pet-card ${i}" data-petid="${t.id}">
                        <img src="${r}" alt="${t.name}">
                        <div class="my-pet-info">
                            <h4>${t.name}</h4>
                            <p>${t.gender} • ${t.breed}</p>
                        </div>
                    </div>
                `}):a=`
                <div class="empty-pets-state">
                    <div class="empty-pets-icon"><i class="fa-solid fa-paw"></i></div>
                    <h4>No Registered Pets</h4>
                    <p>Register your companion to begin scanning for verified matches and playdates.</p>
                    <button class="btn-primary" id="btnMatchRegisterPet" style="margin-top: 14px; width: 100%; justify-content: center; font-size: 0.92rem; padding: 11px 18px;">
                        <i class="fa-solid fa-plus"></i> Register a Pet
                    </button>
                </div>
            `,`
        <div class="match-page-container">
            <div class="page-header" style="margin-bottom: 24px;">
                <div>
                    <h2><i class="fa-solid fa-heart" style="color: var(--primary);"></i> Premium Match Maker</h2>
                    <p>Find the perfect verified partner or schedule a local playdate.</p>
                </div>
                <div style="display: flex; gap: 14px;">
                    <button class="btn-animated" id="btnOpenPrefs"><i class="fa-solid fa-sliders"></i> Preferences</button>
                    <button class="btn-animated" id="btnViewActivePairs" style="background: white; color: var(--primary); border: 2px solid var(--primary);"><i class="fa-solid fa-layer-group"></i> Match Dashboard</button>
                </div>
            </div>

            <div class="match-module-grid">
                <div class="glass-panel pets-list-panel">
                    <h3 class="panel-heading"><i class="fa-solid fa-paw"></i> Who is looking for love?</h3>
                    <div class="your-pets-selector">
                        ${a}
                    </div>
                </div>

                <div class="glass-panel dating-panel" id="datingPanelArea">
                    <div class="mode-toggle-container">
                        <div class="mode-toggle">
                            <button class="mode-btn active" id="modeBreeding"><i class="fa-solid fa-dna"></i> Lineage</button>
                            <button class="mode-btn" id="modePlaydate"><i class="fa-solid fa-baseball"></i> Playdate</button>
                        </div>
                    </div>
                    <div class="bg-orb-1"></div><div class="bg-orb-2"></div>

                    <div class="instruction-overlay" id="instructionOverlay">
                        <div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div>
                        <p>${e.length>0?"Select your pet on the left<br>to start scanning for nearby matches...":"Register your pet on the left<br>to start scanning for nearby matches..."}</p>
                    </div>

                    <div class="dating-content-layout" id="datingContentLayout" style="display:none;">
                        <div class="rewind-sidebar">
                            <div class="treat-inventory"><span><i class="fa-solid fa-bone"></i> Super Treats</span><div class="treat-count" id="treatCountDisplay">3 Left</div></div>
                            <h4 class="sidebar-title"><i class="fa-solid fa-heart" style="color: #ec4899;"></i> Liked You</h4>
                            <div class="liked-list">
                                <div class="liked-item"><img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100" class="admirer-avatar"><div class="liked-info"><strong>Buster</strong><span class="admirer-text">Liked your pet</span></div></div>
                            </div>
                            <h4 class="sidebar-title"><i class="fa-solid fa-clock-rotate-left"></i> Passed</h4>
                            <div class="rewind-list" id="rewindList"><p style="text-align:center; opacity:0.5; margin-top:20px;">History is empty</p></div>
                        </div>

                        <div class="candidate-wrapper">
                            <div class="candidate-card" id="candidateCard" style="display:block;">
                                <div class="candidate-img-box">
                                    <div class="main-photo-wrapper"><img src="" alt="Candidate" id="candImg"><div class="candidate-gradient"></div>
                                        <div class="candidate-basic-info">
                                            <div class="match-score-pill"><span class="match-score-text" id="candScoreText">90% Match</span><div class="match-bar-bg"><div class="match-bar-fill" id="candScoreBar"></div></div></div>
                                            <h3 id="candNameAge">Name, Age</h3><p id="candBreedGender"><i class="fa-solid fa-paw"></i> Breed • Gender</p>
                                        </div>
                                    </div>
                                    <div class="thumbnail-gallery" id="candThumbnails"></div>
                                </div>
                                <div class="candidate-details">
                                    <div class="verification-badges" id="candBadges"></div><div class="trait-tags" id="candTraits"></div><div class="candidate-desc" id="candDesc">Description</div>
                                </div>
                            </div>

                            <div class="action-buttons" id="actionButtons" style="display:flex;">
                                <button class="btn-pass" id="btnPassCandidate" title="Pass"><i class="fa-solid fa-xmark"></i></button>
                                <button class="btn-treat" id="btnTreatCandidate" title="Give a Treat (Super Like)"><i class="fa-solid fa-bone"></i></button>
                                <button class="btn-match" id="btnMatchCandidate" title="Request Match"><i class="fa-solid fa-heart"></i></button>
                            </div>
                        </div>

                        <div class="insights-sidebar">
                            <div class="insight-card">
                                <h5><i class="fa-solid fa-user-shield"></i> Verified Owner</h5>
                                <div class="owner-profile"><div class="owner-avatar" id="candOwnerInitial">S</div><div><p class="owner-name" id="candOwnerName">Sarah T.</p><p class="owner-rating" id="candOwnerRating">⭐ 4.9</p><p class="owner-stat" id="candOwnerPairs">4 Successful Pairs</p></div></div>
                            </div>
                            <div class="insight-card">
                                <h5><i class="fa-solid fa-chart-pie"></i> Match Breakdown</h5>
                                <div class="comp-bar"><label>Size Compatibility <span id="txtSize">90%</span></label><div class="bar-bg"><div class="bar-fill" id="barSize"></div></div></div>
                                <div class="comp-bar"><label>Energy Level <span id="txtEnergy">85%</span></label><div class="bar-bg"><div class="bar-fill" id="barEnergy"></div></div></div>
                                <div class="comp-bar"><label>Temperament <span id="txtTemp">95%</span></label><div class="bar-bg"><div class="bar-fill" id="barTemp"></div></div></div>
                            </div>
                            <div class="insight-card"><h5><i class="fa-solid fa-palette"></i> Litter Predictor</h5><div class="litter-colors" id="litterPredictor"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `}function be(){v.innerHTML=`
            <div class="page-container">
                ${de("Match Dashboard","Track pending requests and message approved matches.","fa-solid fa-mars-and-venus")}
                <div class="page-header" style="margin-top: -15px;">
                    <div></div>
                    <button class="btn-animated" id="btnBackToMatch" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Match Maker</button>
                </div>
                <div class="glass-panel" style="overflow-y: auto; flex:1;" id="matchDashboardContent">
                    <p style="text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">Loading matches...</p>
                </div>
            </div>
        `,Promise.resolve({status:"success",matches:ye}).then(e=>{if(e.status==="success"){let a='<div class="pairs-grid">';e.matches.length===0?a+='<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">You have no active matches or requests yet.</p>':e.matches.forEach(t=>{let i="",r="",n="";if(t.status==="pending"){const s=!t.is_sender,o=s?"Reject Match":"Cancel Request",d=s?"Are you sure you want to reject this match request?":"Are you sure you want to cancel your match request?";n=`
                                <button class="btn-delete-pair" data-matchid="${t.id}" data-title="${o}" data-msg="${d}" title="${s?"Reject":"Cancel Request"}" 
                                    style="position: absolute; top: 10px; right: 10px; z-index: 50; background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" 
                                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            `}t.status==="approved"?(r='<div class="pair-status approved">● Approved & Messaging</div>',i=`<button class="btn-animated btn-message-owner" data-owner="${t.ownerUsername}" style="width:100%; margin-top:10px; justify-content: center;"><i class="fa-regular fa-comment-dots"></i> Message Owner</button>`):t.status==="pending"&&t.is_sender?r='<div class="pair-status">● Pending Approval</div>':t.status==="pending"&&!t.is_sender&&(r='<div class="pair-status" style="color:#f59e0b; background:#fef3c7;">● Received Request!</div>',i=`<button class="btn-accept-match" data-matchid="${t.id}" style="width:100%; margin-top:10px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);"><i class="fa-solid fa-check"></i> Accept Match</button>`),a+=`
                            <div class="pair-card" style="position: relative; padding-top: 25px;">
                                ${n}
                                <div class="pair-images">
                                    <img src="${t.my_pet_img}" class="pair-img left">
                                    <div class="pair-heart-small"><i class="fa-solid fa-heart"></i></div>
                                    <img src="${t.their_pet_img}" class="pair-img right">
                                </div>
                                <div class="pair-names">${t.my_pet_name} & ${t.their_pet_name}</div>
                                ${r}
                                <div class="pair-date">@${t.ownerUsername}</div>
                                ${i}
                            </div>
                        `}),a+="</div>",document.getElementById("matchDashboardContent").innerHTML=a}})}function me(){const e=b.filter(o=>o.owner===$).length,a=typeof R<"u"?R.filter(o=>o.status!=="Cancelled"&&o.status!=="Completed").length:0;let t="None",i="#64748b";typeof I<"u"&&I.length>0&&(t=I[0].status,t==="Approved"?i="#10b981":t==="Pending Review"&&(i="#f59e0b"));let r="";typeof R<"u"&&R.filter(o=>o.status!=="Cancelled"&&o.status!=="Completed").forEach(o=>{r+=`<div class="reminder-item warning"><div class="rem-icon"><i class="fa-solid fa-user-doctor"></i></div><div class="rem-text"><strong>${o.pet_name}'s Vet Visit</strong><small>${o.date} at ${o.time}</small></div></div>`}),typeof I<"u"&&I.filter(o=>o.status==="Approved").forEach(o=>{r+=`<div class="reminder-item success"><div class="rem-icon"><i class="fa-solid fa-check"></i></div><div class="rem-text"><strong>Adoption Approved!</strong><small>You can now finalize ${o.pet_name}'s adoption.</small></div></div>`}),r===""&&(r=`<div style="text-align:center; color:#64748b; padding:20px; font-weight:600;"><i class="fa-solid fa-mug-hot" style="font-size:2rem; margin-bottom:10px; color:#cbd5e1;"></i><br>You're all caught up!</div>`);const n=b.filter(o=>o.status==="Available");let s="";if(n.length>0){const o=Math.floor(Math.random()*n.length),d=n[o],m=d.gender==="Female"?'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>':'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>';s=`
                <div class="home-card featured-pet-card" style="flex: 1;">
                    <div class="featured-badge"><i class="fa-solid fa-star"></i> Pet of the Day</div>
                    <img src="${d.img}" alt="${d.name}" class="featured-img">
                    <div class="featured-info">
                        <h3>${d.name} ${m}</h3>
                        <p class="breed">${d.breed} • ${d.age}</p>
                        <p class="bio">${d.reason_for_adoption||d.personal_traits||"Looking for a loving forever home!"}</p>
                        <button class="btn-animated btn-adopt-potd" data-petid="${d.id}" data-petname="${d.name}" style="width: 100%; justify-content: center; margin-top: 10px;">Meet ${d.name}</button>
                    </div>
                </div>
            `}else s=`
                <div class="home-card featured-pet-card" style="flex: 1; display:flex; justify-content:center; align-items:center; background:#1e293b;">
                    <div style="text-align:center; color:white; z-index:2; padding:20px;">
                        <i class="fa-solid fa-shield-cat" style="font-size:3rem; margin-bottom:15px; color:#64748b;"></i>
                        <h3>No Pets Available</h3><p style="color:#cbd5e1; font-size:0.9rem; margin-top:10px;">Check back later for new arrivals!</p>
                    </div>
                </div>
            `;v.innerHTML=`
            <div class="home-container">
                <div class="home-banner">
                    <div class="banner-text"><h1>Welcome back, ${$}! 👋</h1><p>Here is what's happening with your furry friends today.</p></div>
                    <div class="banner-icon"><i class="fa-solid fa-shield-cat"></i></div>
                </div>
                <div class="stats-row">
                    <div class="home-stat-card"><div class="stat-icon paw-bg"><i class="fa-solid fa-paw"></i></div><div><h3>My Pets</h3><h2>${e}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon health-bg"><i class="fa-solid fa-notes-medical"></i></div><div><h3>Upcoming Vets</h3><h2>${a}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon heart-bg"><i class="fa-solid fa-heart"></i></div><div><h3>Adoption Status</h3><h2 style="color:${i}; font-size: 1.3rem;">${t}</h2></div></div>
                </div>
                <div class="dashboard-grid">
                    <div class="dashboard-col">
                        <div class="home-card" style="flex: 1;">
                            <h2 class="card-title">Reminders & Alerts</h2>
                            <div class="reminders-list">
                                ${r}
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-col">
                        ${s}
                    </div>
                    <div class="dashboard-col">
                        <div class="home-card weather-card">
                            <div class="weather-header"><div><h3>Quezon City</h3><h2 id="weatherTemp">--°C</h2></div><i class="fa-solid fa-sun weather-icon" id="weatherIcon" style="color: #fef08a;"></i></div>
                            <div class="weather-recommendation"><i class="fa-solid fa-lightbulb"></i><p id="weatherText"><strong>Fetching weather...</strong><br>Looking at the sky right now.</p></div>
                        </div>
                        <div class="home-card" style="flex: 1;">
                            <h2 class="card-title" style="margin-bottom: 12px; border:none; padding-bottom:0;"><i class="fa-solid fa-heart-pulse" style="color:#ec4899;"></i> Match Alerts</h2>
                            <div id="homeMatchAlertsContainer" style="overflow-y:auto; flex:1; padding-right:5px;">
                                <p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">Loading matches...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,Promise.resolve({status:"success",matches:ye}).then(o=>{const d=document.getElementById("homeMatchAlertsContainer");if(d)if(o.status==="success"&&o.matches.length>0){let m="";o.matches.slice(0,3).forEach(p=>{let g=p.status==="approved"?"Approved Match!":"Pending Request",f=p.status==="approved"?"💌":"⏳";m+=`
                        <div class="match-alert-item" style="cursor:pointer;" onclick="document.querySelector('[data-target=\\'breeding\\']').click()">
                            <img src="${p.their_pet_img}" alt="Pet">
                            <div class="alert-text"><strong>${p.their_pet_name} ${f}</strong><span>${g}</span></div>
                            <button class="btn-small-view">View</button>
                        </div>
                    `}),d.innerHTML=m}else d.innerHTML='<p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">No recent match activity.</p>'}),fetch("https://api.open-meteo.com/v1/forecast?latitude=14.6488&longitude=121.0509&current_weather=true").then(o=>o.json()).then(o=>{const d=Math.round(o.current_weather.temperature),m=o.current_weather.weathercode,p=document.getElementById("weatherTemp"),g=document.getElementById("weatherIcon"),f=document.getElementById("weatherText");p&&g&&f&&(p.innerText=`${d}°C`,m<=3?(g.className="fa-solid fa-sun weather-icon",g.style.color="#fef08a",f.innerHTML="<strong>Perfect time for a walk!</strong><br>The weather is great today. Take your pets out before it gets too hot."):m>=51&&m<=67||m>=80?(g.className="fa-solid fa-cloud-rain weather-icon",g.style.color="#bae6fd",f.innerHTML="<strong>It's a bit rainy!</strong><br>Keep your pets dry indoors today. A good time for some indoor training!"):(g.className="fa-solid fa-cloud weather-icon",g.style.color="#e2e8f0",f.innerHTML="<strong>Nice and cool!</strong><br>A great day for some indoor play or a quick stroll around the neighborhood."))}).catch(o=>console.error("Weather fetch error:",o)),setTimeout(()=>{const o=document.querySelector(".btn-adopt-potd");o&&o.addEventListener("click",d=>{const m=d.target.getAttribute("data-petid"),p=d.target.getAttribute("data-petname");v.innerHTML=Qe(m,p),document.querySelectorAll(".sidebar-nav .nav-btn").forEach(g=>g.classList.remove("active")),document.querySelector('[data-target="pets"]').classList.add("active")})},100)}me();function Ct(){let e=document.getElementById("pawtrackToastContainer");return e||(e=document.createElement("div"),e.id="pawtrackToastContainer",e.className="pawtrack-toast-container",document.body.appendChild(e)),e}function Y(e,a,t="fa-paw",i=null,r="default"){const n=Ct(),s=document.createElement("div");s.className=`pawtrack-toast-card ${r==="app"?"toast-app":r==="info"?"toast-info":""}`,s.innerHTML=`
            <div class="toast-icon-bubble">
                <i class="fa-solid ${t}"></i>
            </div>
            <div class="toast-body">
                <div class="toast-title">
                    <span>${P(e)}</span>
                </div>
                <p class="toast-msg">${P(a)}</p>
            </div>
            <button class="toast-close" title="Dismiss">&times;</button>
        `;const o=s.querySelector(".toast-close");let d=null;const m=p=>{p&&p.stopPropagation(),d&&clearTimeout(d),s.style.animation="toastSlideOut 0.25s forwards",setTimeout(()=>{s.parentElement&&s.parentElement.removeChild(s)},250)};o.addEventListener("click",m),i&&s.addEventListener("click",()=>{m();const p=document.querySelector(`.sidebar-nav .nav-btn[data-target="${i}"]`);if(p)p.click();else if(i==="pets"){G.forEach(f=>f.classList.remove("active"));const g=document.querySelector('[data-target="pets"]');g&&g.classList.add("active"),v.innerHTML=ce()}else if(i==="applications"){G.forEach(f=>f.classList.remove("active"));const g=document.querySelector('[data-target="applications"]');g&&g.classList.add("active"),v.innerHTML=pe()}}),n.appendChild(s),d=setTimeout(m,7e3)}function Pt(){if(document.getElementById("adoptionApplicationForm"))return"adopt-form";if(document.getElementById("petRegistrationForm")||document.getElementById("registerPetForm"))return"register-pet";if(document.getElementById("profileFullName")||document.querySelector(".profile-container"))return"profile";const e=document.querySelector(".sidebar-nav .nav-btn.active");return e?e.getAttribute("data-target"):"home"}function ue(){const e=Pt();e==="home"?me():e==="pets"?v.innerHTML=ce():e==="applications"?v.innerHTML=pe():e==="profile"?xe():e==="breeding"&&typeof he=="function"&&!document.getElementById("matchDetailsOverlay")&&(v.innerHTML=he())}function Lt(e){if(!e||!e.payload)return;const a=e.events||[],t=e.payload,i=a.some(s=>s.includes(".create")),r=a.some(s=>s.includes(".update")),n=a.some(s=>s.includes(".delete"));if(t.$collectionId===Z||a.some(s=>s.includes(`.${Z}.`))){const s=t.$id,o={...t,id:t.$id};if(n){const d=b.find(m=>m.id===s);b=b.filter(m=>m.id!==s),d&&d.status==="Available"&&d.owner!==$&&Y("Pet Removed",`${d.name} is no longer listed for adoption.`,"fa-paw","pets","info")}else if(i){const d=b.findIndex(m=>m.id===s);d===-1?b.unshift(o):b[d]=o,o.status==="Available"&&o.owner!==$&&Y("New Pet for Adoption! 🐾",`@${o.owner||"A caregiver"} just listed ${o.name} (${o.breed||"Pet"}). Tap to meet them!`,"fa-heart","pets","default")}else if(r){const d=b.findIndex(p=>p.id===s),m=d!==-1?b[d]:null;d!==-1?b[d]=o:b.unshift(o),o.owner!==$&&(m&&m.status!=="Available"&&o.status==="Available"?Y("Pet Available for Adoption! 🐾",`${o.name} (${o.breed}) is now available for adoption! Tap to view.`,"fa-heart","pets","default"):m&&m.status==="Available"&&o.status!=="Available"&&Y("Pet Status Updated",`${o.name} is now ${o.status}.`,"fa-paw","pets","info"))}ue()}if(t.$collectionId===ee||a.some(s=>s.includes(`.${ee}.`))){const s=t.$id,o={...t,id:t.$id};if(o.user_id===F){if(n)I=I.filter(d=>d.id!==s);else if(i){const d=I.findIndex(m=>m.id===s);d===-1?I.unshift(o):I[d]=o}else if(r){const d=I.findIndex(p=>p.id===s),m=d!==-1?I[d].status:"";if(d!==-1?I[d]=o:I.unshift(o),m!==o.status){const p=o.status==="Approved";Y(p?"🎉 Application Approved!":"Application Status Updated",`Your adoption application for ${o.pet_name} is now: ${o.status}!`,p?"fa-circle-check":"fa-clock","applications","app")}}ue()}}}let De=!1;async function St(){if(!De){De=!0;try{const a=(await H.listDocuments(A,Z)).documents.map(n=>({...n,id:n.$id})),t=new Set(b.map(n=>n.id)),i=a.filter(n=>!t.has(n.id)&&n.status==="Available"&&n.owner!==$);if(a.length!==b.length||a.some((n,s)=>{var o,d;return((o=b[s])==null?void 0:o.id)!==n.id||((d=b[s])==null?void 0:d.status)!==n.status})){if(b=a,i.length>0){const n=i[0];Y("New Pet for Adoption! 🐾",`@${n.owner||"A caregiver"} just listed ${n.name} (${n.breed||"Pet"}). Tap to meet them!`,"fa-heart","pets","default")}ue()}if(F){const s=(await H.listDocuments(A,ee,[Q.equal("user_id",F)])).documents.map(d=>({...d,id:d.$id}));(s.length!==I.length||s.some((d,m)=>{var p,g;return((p=I[m])==null?void 0:p.id)!==d.id||((g=I[m])==null?void 0:g.status)!==d.status}))&&(I=s,ue())}}catch{}finally{De=!1}}}function $t(){try{if(Ue&&typeof Ue.subscribe=="function"){const e=`databases.${A}.collections.${Z}.documents`,a=`databases.${A}.collections.${ee}.documents`;Ue.subscribe([e,a],t=>{Lt(t)}),console.log("PawTrack: Appwrite Realtime connected for live adoption sync.")}}catch(e){console.warn("Realtime subscription fallback to polling:",e)}setInterval(St,8e3)}$t();function K(){const e=le[W],a=document.getElementById("vetInitials");if(!a)return;a.innerText=e.initials,document.getElementById("vetNameDisplay").innerText=e.name,document.getElementById("vetSpecialtyDisplay").innerText=e.specialty,document.getElementById("vetRatingDisplay").innerText=`⭐ ${e.rating} (${e.exp})`,document.getElementById("vetPhoneDisplay").innerText=e.phone,document.getElementById("vetEmailDisplay").innerText=e.email,document.getElementById("vetScheduleDisplay").innerText=e.schedule,document.getElementById("vetClinicDisplay").innerText=e.clinic;const t=document.getElementById("apptVetIdHidden").value,i=document.getElementById("btnSelectVet");t===W.toString()?(i.innerText="✅ Confirmed",i.classList.add("selected")):(i.innerText="Confirm",i.classList.remove("selected"))}function we(e){if(!e)return;const a=document.querySelector(`.pet-select-card[data-petid="${e}"]`)||document.querySelector(`.pet-select-card[data-pet="${e}"]`);document.querySelectorAll(".pet-select-card").forEach(r=>r.classList.remove("selected")),a&&a.classList.add("selected");const t=document.getElementById("apptPetSelectorHidden");t&&(t.value=e);const i=b.find(r=>{var n;return((n=r.id)==null?void 0:n.toString())===(e==null?void 0:e.toString())});if(i){const r=document.getElementById("apptOwner");r&&(r.value=i.owner||$||"");const n=document.getElementById("apptContact");n&&(n.value=i.contact_number||te||L&&L.phone||"");const s=document.getElementById("apptPetType");if(s){const p=(i.breed||"").toLowerCase(),g=(i.type||"").toLowerCase(),f=p.includes("cat")||p.includes("kitten")||p.includes("feline")||p.includes("persian")||p.includes("siamese")||g.includes("cat");s.value=i.type||(f?"Cat":"Dog")}const o=document.getElementById("apptBreed");o&&(o.value=i.breed||"Unknown");const d=document.getElementById("apptGender");d&&(d.value=i.gender||"Unknown");const m=document.getElementById("apptWeight");m&&(m.value=i.weight||"")}}function ge(){const e=document.getElementById("cartBadge");e&&(e.innerText=U.length),Me.innerHTML="";let a=0;U.length===0?Me.innerHTML='<p style="text-align:center; color:#64748b; font-weight:bold; margin-top: 50px;">Your cart is empty.</p>':U.forEach((t,i)=>{a+=parseFloat(t.price),Me.innerHTML+=`
                    <div class="cart-item-row">
                        <img src="${t.img}" class="cart-item-img" onerror="this.src='/resources/shop/bowl.jpg'" alt="${t.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${t.name}</div>
                            <div class="cart-item-price">₱ ${t.price}</div>
                        </div>
                        <div><button class="btn-remove-item" data-index="${i}" title="Remove item"><i class="fa-solid fa-trash-can"></i></button></div>
                    </div>
                `}),Tt.innerText=`₱ ${a.toFixed(2)}`}window.handleRewind=e=>{ie.splice(e,1),j=Math.max(0,j-1),_e()};function At(){const e=document.getElementById("rewindList");e&&(e.innerHTML="",ie.length===0?e.innerHTML=`
                <div style="text-align:center; padding: 20px; opacity:0.5;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="font-size:0.85rem; font-weight:600;">History is empty</p>
                </div>`:ie.forEach((a,t)=>{e.innerHTML+=`
                    <div class="rewind-item" data-index="${t}" onclick="handleRewind(${t})">
                        <img src="${a.imgs[0]}" alt="${a.name}">
                        <div class="rewind-info">
                            <strong>${a.name}</strong>
                            <span>${a.breed}</span>
                        </div>
                        <button class="btn-undo" title="Bring Back">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                `}))}function _e(){if(ae.length===0||j>=ae.length){document.getElementById("datingContentLayout").style.display="none";const s=document.getElementById("instructionOverlay");s.style.display="flex",s.innerHTML='<i class="fa-solid fa-face-frown-open" style="color: #cbd5e1; font-size: 4rem; margin-bottom: 15px;"></i><p>No more matches available<br>for this pet at the moment.</p>';return}const e=ae[j];currentPhotoIndex=0;const a=document.getElementById("candThumbnails");a.innerHTML="",e.imgs.forEach((s,o)=>{a.innerHTML+=`<img src="${s}" class="cand-thumb ${o===0?"active":""}" data-index="${o}" alt="Photo ${o+1}">`}),at(e,0);const t=e.gender==="Male"?'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>':'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>';document.getElementById("candNameAge").innerHTML=`${e.name}, ${e.age} ${t}`,document.getElementById("candBreedGender").innerHTML=`<i class="fa-solid fa-paw"></i> ${e.breed}`,document.getElementById("candDesc").innerText=e.desc,document.getElementById("candScoreText").innerText=`${e.score}% Match`,document.getElementById("candScoreBar").style.width=`${e.score}%`;const i=document.getElementById("candBadges");i.innerHTML="",e.badges.includes("vet")&&(i.innerHTML+='<span class="v-badge badge-vet"><i class="fa-solid fa-stethoscope"></i> Vet Verified</span>'),e.badges.includes("pedigree")&&(i.innerHTML+='<span class="v-badge badge-pedigree"><i class="fa-solid fa-dna"></i> Purebred</span>'),e.badges.includes("vax")&&(i.innerHTML+='<span class="v-badge badge-vax"><i class="fa-solid fa-syringe"></i> Vaccinated</span>');const r=document.getElementById("candTraits");r.innerHTML="",e.traits.forEach(s=>{r.innerHTML+=`<span class="trait-tag">${s}</span>`}),document.getElementById("candOwnerName").innerText=e.ownerName,document.getElementById("candOwnerInitial").innerText=e.ownerInitial,document.getElementById("candOwnerRating").innerText=`⭐ ${e.ownerRating}`,document.getElementById("candOwnerPairs").innerText=`${e.successPairs} Successful Pairs`,document.getElementById("barSize").style.width=`${e.compSize}%`,document.getElementById("txtSize").innerText=`${e.compSize}%`,document.getElementById("barEnergy").style.width=`${e.compEnergy}%`,document.getElementById("txtEnergy").innerText=`${e.compEnergy}%`,document.getElementById("barTemp").style.width=`${e.compTemp}%`,document.getElementById("txtTemp").innerText=`${e.compTemp}%`;const n=document.getElementById("litterPredictor");n.innerHTML="",e.litter.forEach(s=>{const o=s.c==="#FFFFFF"||s.c==="#FFF8DC"?"#0f172a":"white";n.innerHTML+=`<div class="color-swatch" style="background:${s.c}; color:${o};">${s.p}%</div>`}),document.getElementById("instructionOverlay").style.display="none",document.getElementById("datingContentLayout").style.display="grid",document.getElementById("treatCountDisplay").innerText=`${Ae} Left`,At()}function at(e,a){const t=document.getElementById("candImg");t.style.opacity=0,setTimeout(()=>{t.src=e.imgs[a],t.style.opacity=1},150),document.querySelectorAll(".cand-thumb").forEach((i,r)=>{r===parseInt(a)?i.classList.add("active"):i.classList.remove("active")})}G.forEach(e=>{e.addEventListener("click",function(){G.forEach(t=>t.classList.remove("active")),this.classList.add("active");const a=this.getAttribute("data-target");if(v.scrollTo({top:0,behavior:"smooth"}),a==="home")me();else if(a==="pets")v.innerHTML=ce();else if(a==="applications")v.innerHTML=pe();else if(a==="vet"){v.innerHTML=Fe(),K();const t=document.querySelector(".pet-select-card");t&&we(t.getAttribute("data-petid")||t.getAttribute("data-pet"))}else a==="shop"?(v.innerHTML=It(),ge()):a==="breeding"?(v.innerHTML=he(),z=null):a==="messages"&&(v.innerHTML=Re(),Ne())})}),document.getElementById("btnViewProfile").addEventListener("click",()=>{G.forEach(e=>e.classList.remove("active")),v.scrollTo({top:0,behavior:"smooth"}),v.innerHTML=Ke,xe()}),document.getElementById("btnRegisterPet").addEventListener("click",()=>{G.forEach(r=>r.classList.remove("active")),v.scrollTo({top:0,behavior:"smooth"}),v.innerHTML=kt;const e=document.getElementById("imageDropZone"),a=document.getElementById("petImageInput"),t=document.getElementById("imagePreview"),i=document.getElementById("dropZoneText");e.addEventListener("click",()=>a.click()),Ye=null,a.addEventListener("change",function(){if(this.files&&this.files[0]){Ye=this.files[0];const r=new FileReader;r.onload=function(n){t.src=n.target.result,t.style.display="block",i.style.display="none"},r.readAsDataURL(this.files[0])}}),document.getElementById("btnCancelReg").addEventListener("click",()=>{me(),G[0].classList.add("active")})}),v.addEventListener("click",async e=>{if(e.target.closest("#btnMatchRegisterPet")){document.getElementById("btnRegisterPet").click();return}if(e.target.classList.contains("profile-tab-btn")){document.querySelectorAll(".profile-tab-btn").forEach(c=>c.classList.remove("active")),document.querySelectorAll(".profile-tab-content").forEach(c=>c.classList.remove("active")),e.target.classList.add("active");const l=e.target.getAttribute("data-tab");document.getElementById(l).classList.add("active")}const t=e.target.closest(".btn-view-app")||e.target.closest(".btn-view-pet");if(t){const l=t.getAttribute("data-target"),c=document.getElementById(l),u=t.closest(".app-card")||t.closest(".pet-card");c.style.display==="block"?(c.style.display="none",u.classList.remove("dropdown-open")):(c.style.display="block",u.classList.add("dropdown-open"))}const i=e.target.closest(".btn-close-pet");if(i){const l=i.getAttribute("data-target"),c=document.getElementById(l),u=c.previousElementSibling;c.style.display="none",u.classList.remove("dropdown-open")}const r=e.target.closest(".btn-adopt");if(r){const l=r.getAttribute("data-petid"),c=r.getAttribute("data-petname");v.innerHTML=Qe(l,c)}e.target.closest("#btnBackToPets")&&(v.innerHTML=ce()),e.target.closest(".btn-edit-profile")&&(document.getElementById("editProfileModal").style.display="flex");const n=e.target.closest(".btn-archive-pet");if(n){const l=n.getAttribute("data-petid");re("Move to Bin?","Are you sure you want to move this pet to the Recycle Bin?",async()=>{const c=b.find(u=>u.id===l);if(!c){E("Error","Pet record not found.",!0);return}try{const u=await H.createDocument(A,Le,J.unique(),{name:c.name,breed:c.breed,gender:c.gender,owner:$,img:c.img||""});await H.deleteDocument(A,Z,l),b=b.filter(x=>x.id!==l),q.unshift({...u,id:u.$id}),await _("Moved a pet to the Recycle Bin",c.name,"fa-trash-can"),E("Moved to Bin","Pet successfully moved to Recycle Bin.",!1,()=>{ue()})}catch(u){console.error("Appwrite Move to Bin Error:",u),E("Error",u.message,!0)}})}e.target.closest("#btnViewBin")&&(v.innerHTML=He()),e.target.closest("#btnEmptyBin")&&re("Empty Bin?","WARNING: Are you sure you want to permanently delete ALL pets in the Recycle Bin? This cannot be undone!",async()=>{try{for(const l of q)await H.deleteDocument(A,Le,l.id);q=[],await _("Permanently emptied the Recycle Bin","","fa-dumpster-fire"),E("Bin Emptied","Recycle bin emptied successfully.",!1,()=>{v.innerHTML=He()})}catch(l){console.error("Appwrite Empty Bin Error:",l),E("Error",l.message,!0)}}),e.target.closest("#btnBackToProfile")&&(v.innerHTML=Ke,xe());const s=e.target.closest(".btn-restore-pet");if(s){const l=s.getAttribute("data-petid"),c=q.find(u=>u.id===l);if(c)try{const u=await H.createDocument(A,Z,J.unique(),{name:c.name,breed:c.breed,gender:c.gender,age:"1 yr",status:"Available",health_status:"Healthy",owner:$,contact_number:te||"0917-000-0000",personal_traits:"Friendly",reason_for_adoption:"Restored from Recycle Bin",img:c.img||""});await H.deleteDocument(A,Le,l),q=q.filter(x=>x.id!==l),b.unshift({...u,id:u.$id}),await _("Restored a pet from the Recycle Bin",c.name,"fa-rotate-left"),E("Restored!","Pet has been restored to the active board!",!1,()=>{v.innerHTML=He()})}catch(u){console.error("Appwrite Restore Error:",u),E("Error",u.message,!0)}}const o=e.target.closest(".btn-cancel-app");if(o){const l=o.getAttribute("data-appid");re("Cancel Application?","Are you sure you want to cancel this application?",async()=>{try{await H.deleteDocument(A,ee,l),I=I.filter(c=>c.id!==l),await _("Cancelled adoption application","","fa-file-circle-xmark"),E("Cancelled","Application successfully cancelled.",!1,()=>{v.innerHTML=pe()})}catch(c){console.error("Appwrite Cancel App Error:",c),E("Error",c.message,!0)}})}const d=e.target.closest(".btn-cancel-vet");if(d){const l=d.getAttribute("data-appid");re("Cancel Appointment?","Are you sure you want to cancel this veterinary appointment?",async()=>{try{await H.deleteDocument(A,je,l),R=R.filter(c=>c.id!==l),await _("Cancelled veterinary appointment","","fa-calendar-xmark"),E("Cancelled","Appointment successfully cancelled.",!1,()=>{v.innerHTML=Fe(),K();const c=document.querySelector(".pet-select-card");c&&we(c.getAttribute("data-petid")||c.getAttribute("data-pet"))})}catch(c){console.error("Appwrite Cancel Vet Error:",c),E("Error",c.message,!0)}})}const m=e.target.closest(".pet-select-card");if(m&&(document.getElementById("apptPetSelectorHidden")||document.getElementById("vetBookingForm"))){const l=m.getAttribute("data-petid")||m.getAttribute("data-pet");we(l)}if(e.target.closest("#btnPrevVet")&&(W=(W-1+le.length)%le.length,K()),e.target.closest("#btnNextVet")&&(W=(W+1)%le.length,K()),e.target.closest("#btnSelectVet")){const l=le[W];document.getElementById("apptVetIdHidden").value=W,document.getElementById("apptSelectedVetName").value=l.name,K()}if(e.target.classList.contains("btn-add-cart")){U.push({name:e.target.getAttribute("data-name"),price:e.target.getAttribute("data-price"),img:e.target.getAttribute("data-img")}),ge();const l=e.target.innerText;e.target.innerText="✓ Added",e.target.style.background="#10b981",e.target.style.color="white",e.target.style.borderColor="#10b981",setTimeout(()=>{e.target.innerText=l,e.target.style.background="white",e.target.style.color="#4f46e5",e.target.style.borderColor="#4f46e5"},1e3)}if(e.target.classList.contains("btn-buy-now")){const c=e.target.closest(".shop-card").querySelector(".btn-add-cart");U.push({name:c.getAttribute("data-name"),price:c.getAttribute("data-price"),img:c.getAttribute("data-img")}),ge(),document.getElementById("cartModalOverlay").style.display="flex"}e.target.closest("#btnOpenCart")&&(document.getElementById("cartModalOverlay").style.display="flex"),e.target.closest(".mode-btn")&&(document.querySelectorAll(".mode-btn").forEach(l=>l.classList.remove("active")),e.target.closest(".mode-btn").classList.add("active"),z&&document.querySelector(`[data-pet="${z}"]`).click());const p=e.target.closest(".my-pet-card");if(p&&!document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".my-pet-card").forEach(c=>c.classList.remove("active")),p.classList.add("active"),z=p.getAttribute("data-petid"),b.find(c=>c.id.toString()===z),document.getElementById("datingContentLayout").style.display="none";const l=document.getElementById("instructionOverlay");l.style.display="flex",l.innerHTML='<div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div><p>Scanning database for verified matches...</p>',Promise.resolve().then(()=>({status:"success",candidates:b.filter(u=>u.owner!==$).map(u=>({id:u.id,name:u.name,breed:u.breed,gender:u.gender,age:u.age,photos:[u.img],imgs:[u.img],owner:u.owner||"PawUser",ownerName:u.owner||"PawUser",score:94,traits:u.personal_traits?u.personal_traits.split(",").map(x=>x.trim()):["Playful","Friendly"],desc:u.reason_for_adoption||"Looking for a friend!",verified:!0}))})).then(c=>{c.status==="success"&&c.candidates.length>0?(ae=c.candidates,j=0,setTimeout(()=>{_e()},800)):l.innerHTML='<p style="color:#64748b; font-weight:bold; font-size:1.1rem;">No match candidates available right now. Invite friends or register more pets!</p>'})}const g=e.target.closest(".cand-thumb");if(g){const l=ae[j];at(l,g.getAttribute("data-index"))}const f=e.target.closest("#btnPassCandidate"),y=e.target.closest("#btnMatchCandidate"),w=e.target.closest("#btnTreatCandidate");if(f||y||w){const l=ae[j],c=b.find(x=>x.id.toString()===z);let u="pass";if(y&&(u="like"),w&&(u="super_like"),u==="super_like"&&Ae<=0){E("Out of Treats","You have used all your Super Treats for today! Come back tomorrow.",!0);return}Promise.resolve({status:"success",isMatch:!0}).then(x=>{if(x.status==="success"){if(u==="super_like"&&Ae--,ie.unshift(l),ie.length>5&&ie.pop(),u!=="pass"){_(u==="super_like"?"Sent a Super Treat to":"Sent a match request to",l.name,"fa-heart"),document.getElementById("matchImgLeft").src=c.img,document.getElementById("matchImgRight").src=l.imgs[0],document.getElementById("matchNameLeft").innerText=c.name,document.getElementById("matchNameRight").innerText=l.name;const M=x.isMatch?"✨ IT'S A MATCH! ✨":u==="super_like"?"Super Liked! 🦴 (Pending)":"Pending Owner Approval";document.getElementById("matchDateSpot").innerText="PawTrack Verified";const C=document.getElementById("matchIcebreaker");C.value=x.isMatch?"You matched! Let's plan a playdate!":"",C.placeholder=x.isMatch?"Type a message...":`Say hi to ${l.ownerName} while you wait...`,document.getElementById("btnContinueMatch").setAttribute("data-targetuser",l.ownerName),document.getElementById("matchOverlay").style.display="flex",activePairs.unshift({id:"p"+Date.now(),maleName:c.gender==="Male"?c.name:l.name,femaleName:c.gender==="Female"?c.name:l.name,maleImg:c.gender==="Male"?c.img:l.imgs[0],femaleImg:c.gender==="Female"?c.img:l.imgs[0],status:M,isApproved:x.isMatch,date:"Just Now",ownerUsername:l.ownerName})}j++,_e()}else E("Error",x.message,!0)}).catch(x=>console.error("Swipe Error:",x))}e.target.closest("#btnOpenPrefs")&&(document.getElementById("prefModal").style.display="flex"),e.target.closest("#btnViewActivePairs")&&be(),e.target.closest("#btnBackToMatch")&&(v.innerHTML=he(),z=null);const B=e.target.closest(".btn-accept-match"),h=e.target.closest(".btn-delete-pair");if(B||h){const l=B?"accept":"delete",c=(B||h).getAttribute("data-matchid");if(l==="delete"){const u=h.getAttribute("data-title")||"Cancel Request",x=h.getAttribute("data-msg")||"Are you sure you want to remove this match?";re(u,x,()=>{ye=ye.filter(M=>M.id!==c),be()})}else{const u=ye.find(x=>x.id===c);u&&(u.status="approved"),be()}}}),document.getElementById("btnCloseCart").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnContinueShopping").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnCheckout").addEventListener("click",()=>{if(U.length===0){E("Empty Cart","Your cart is empty! Please add some items first.",!0);return}_("Completed a Pet Shop checkout","","fa-bag-shopping"),U=[],ge(),document.getElementById("cartModalOverlay").style.display="none",E("Order Placed!","Order placed successfully! Thank you for shopping.",!1)}),document.getElementById("cartItemsContainer").addEventListener("click",e=>{const a=e.target.closest(".btn-remove-item");a&&(U.splice(parseInt(a.getAttribute("data-index")),1),ge())}),document.getElementById("btnContinueMatch").addEventListener("click",e=>{const a=e.target.getAttribute("data-targetuser"),t=document.getElementById("matchIcebreaker").value.trim();t&&a&&(k[a]||(k[a]=[]),k[a].push({text:t,type:"sent",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),_("Sent an Icebreaker message to",a,"fa-comment-dots")),document.getElementById("matchOverlay").style.display="none",be()}),document.getElementById("btnSavePrefs").addEventListener("click",()=>{document.getElementById("prefModal").style.display="none",z&&document.querySelector(`[data-pet="${z}"]`).click()}),document.getElementById("prefModal").addEventListener("click",e=>{e.target===document.getElementById("prefModal")&&(document.getElementById("prefModal").style.display="none")}),v.addEventListener("submit",e=>{if(e.target.id==="vetBookingForm"){e.preventDefault();const a=document.getElementById("apptPetSelectorHidden").value,t=document.getElementById("apptVetIdHidden").value;if(!a){E("Error","Please select a pet for the appointment by clicking their picture!",!0);return}if(!t){E("Error","Please choose a veterinarian by clicking 'Confirm' on the profile card!",!0);return}const i=b.find(o=>{var d;return((d=o.id)==null?void 0:d.toString())===(a==null?void 0:a.toString())}),r=document.querySelector(`.pet-select-card[data-petid="${a}"] span`)||document.querySelector(`.pet-select-card[data-pet="${a}"] span`),n=(i==null?void 0:i.name)||(r?r.innerText:"My Pet"),s=document.getElementById("apptSelectedVetName").value;(async()=>{try{const o=await H.createDocument(A,je,J.unique(),{pet_name:n,vet_name:s,status:"Upcoming",time:document.getElementById("apptTime").value||"",date:document.getElementById("apptDate").value||"",user_id:F,img:(i==null?void 0:i.img)||""});R.unshift({...o,id:o.$id}),await _("Booked vet visit for",n,"fa-user-doctor"),E("Request Sent!","Appointment scheduled successfully! It is now Upcoming.",!1,()=>{const d=document.querySelector('[data-target="vet"]');if(d)d.click();else{v.innerHTML=Fe(),K();const m=document.querySelector(".pet-select-card");m&&we(m.getAttribute("data-petid")||m.getAttribute("data-pet"))}})}catch(o){console.error("Appwrite Vet Booking Error:",o),E("Error",o.message,!0)}})()}if(e.target.id==="adoptionApplicationForm"){if(e.preventDefault(),!document.getElementById("adoptTerms").checked){E("Missing Requirement","You must agree to the terms and conditions.",!0);return}const a=document.getElementById("adoptPetId").value,t=document.getElementById("adoptPetName").value,i=b.find(r=>{var n;return((n=r.id)==null?void 0:n.toString())===(a==null?void 0:a.toString())});(async()=>{try{const r=await H.createDocument(A,ee,J.unique(),{pet_name:t,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status:"Pending Review",user_id:F,img:(i==null?void 0:i.img)||""});I.unshift({...r,id:r.$id}),await _("Applied to adopt",t,"fa-house-chimney-user"),E("Application Sent!","Successfully submitted! Status: PENDING REVIEW.",!1,()=>{const n=document.querySelector('[data-target="applications"]');n?n.click():v.innerHTML=pe()})}catch(r){console.error("Appwrite Adoption Application Error:",r),E("Error",r.message,!0)}})()}(e.target.id==="petRegistrationForm"||e.target.id==="registerPetForm")&&(e.preventDefault(),(async()=>{var d,m,p,g,f;const a=document.getElementById("petImageInput"),t=Ye||a&&a.files&&a.files[0];let i="";if(t)try{E("Uploading Photo","Saving pet photo to PawTrack Storage...",!1);const y=await Pe.createFile(Se,J.unique(),t);i=Pe.getFileView(Se,y.$id).toString()}catch(y){console.error("Storage upload failed:",y)}i||(i="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80");const r=document.getElementById("regForAdoption"),n=r?r.checked:!0,s=new FormData(e.target),o={name:s.get("name")||((d=document.getElementById("regPetName"))==null?void 0:d.value)||"Unnamed Pet",breed:s.get("breed")||((m=document.getElementById("regBreed"))==null?void 0:m.value)||"Mixed Breed",gender:s.get("gender")||((p=document.getElementById("regGender"))==null?void 0:p.value)||"Male",age:s.get("age")||((g=document.getElementById("regAge"))==null?void 0:g.value)||"1 yr",status:n?"Available":"Private",health_status:s.get("health_status")||"Healthy / Vaccinated",owner:$,contact_number:s.get("contact_number")||te||"0917-000-0000",personal_traits:s.get("personal_traits")||((f=document.getElementById("regDesc"))==null?void 0:f.value)||"Friendly",reason_for_adoption:s.get("reason_for_adoption")||(n?"Looking for a home":"Personal pet"),img:i};try{const y=await H.createDocument(A,Z,J.unique(),o),w={...y,id:y.$id};b.unshift(w),await _(n?"Listed pet for adoption":"Registered private pet",o.name,"fa-shield-cat"),E("Success!",n?"Pet Registered Successfully! Photo saved to PawTrack Storage and listed on the adoption board.":"Pet added to your personal roster! Photo saved to PawTrack Storage.",!1,()=>{if(n){const h=document.querySelector('[data-target="pets"]');h?h.click():v.innerHTML=ce()}else{const h=document.querySelector('[data-target="home"]');h?h.click():me()}})}catch(y){console.error("Appwrite Pet Registration Error:",y),E("Error","Could not register pet: "+y.message,!0)}})())}),v.addEventListener("reset",e=>{e.target.id==="vetBookingForm"&&(document.querySelectorAll(".pet-select-card").forEach(a=>a.classList.remove("selected")),document.getElementById("apptPetSelectorHidden")&&(document.getElementById("apptPetSelectorHidden").value=""),document.getElementById("apptVetIdHidden")&&(document.getElementById("apptVetIdHidden").value=""),setTimeout(()=>{K()},10))});const it=document.getElementById("editProfileForm");it&&it.addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("editFirstName").value,t=document.getElementById("editLastName").value,i=document.getElementById("editContact").value,r=`${a} ${t}`.trim();try{await ne.updatePrefs({...L,fullName:r,phone:i}),L.fullName=r,L.phone=i,te=i;const n=document.getElementById("userNameDisplay");if(n){const s=L.username||r;n.innerText=s?"Welcome, "+s+"!":"Welcome!"}await _("Updated profile settings & information","","fa-user-pen"),document.getElementById("editProfileModal").style.display="none",E("Profile Saved","Profile updated successfully!",!1,()=>{xe()})}catch(n){E("Error",n.message,!0)}}),v.addEventListener("input",e=>{e.target.id==="shopPriceFilter"&&(document.getElementById("shopPriceDisplay").innerText=`₱${e.target.value}`,nt())}),v.addEventListener("change",e=>{e.target.id==="shopCategoryFilter"&&nt()});function nt(){const e=document.getElementById("shopCategoryFilter").value,a=parseFloat(document.getElementById("shopPriceFilter").value),t=et.filter(i=>{const r=e==="All Categories"||i.category===e,n=i.price<=a;return r&&n});document.getElementById("shopGridContainer").innerHTML=tt(t)}async function xe(){const e=document.getElementById("mainProfilePic");e&&(e.src=L.avatarUrl||"/resources/avatar/Avatar 1.jpg");const a=document.getElementById("btnChangeAvatar")||document.querySelector(".btn-change-photo"),t=document.getElementById("avatarFileInput");a&&t&&(a.onclick=()=>t.click(),t.onchange=async function(){if(this.files&&this.files[0])try{E("Uploading","Uploading avatar to PawTrack Storage...",!1);const T=await Pe.createFile(Se,J.unique(),this.files[0]),D=Pe.getFileView(Se,T.$id).toString();await ne.updatePrefs({...L,avatarUrl:D}),L.avatarUrl=D,e&&(e.src=D),await _("Updated profile picture","Saved to PawTrack Storage","fa-camera"),E("Success","Profile photo uploaded to PawTrack Storage!")}catch(T){E("Error","Failed to upload photo: "+T.message,!0)}});const i=document.getElementById("profileFullName"),r=document.getElementById("profileUsername"),n=document.getElementById("profileEmail"),s=document.getElementById("profilePhone"),o=L.fullName||$,d=L.username||$;i&&(i.innerText=o),r&&(r.innerText="@"+d),n&&(n.innerText=Ge),s&&(s.innerText=te||"None");const[m="",...p]=(o||"").split(" "),g=p.join(" "),f=document.getElementById("editFirstName"),y=document.getElementById("editLastName"),w=document.getElementById("editContact"),B=document.getElementById("editEmail");f&&(f.value=m),y&&(y.value=g),w&&(w.value=te||""),B&&(B.value=Ge||"");const h=b.filter(T=>T.owner===$),l=I.filter(T=>T.status==="Approved").length,c=document.getElementById("countOwnedPets"),u=document.getElementById("countSuccessfulApps");c&&(c.innerText=h.length),u&&(u.innerText=l);const x=document.getElementById("privateRosterGrid"),M=document.getElementById("adoptionRosterGrid");x&&M&&(x.innerHTML="",M.innerHTML="",h.forEach(T=>{const D=`
                    <div class="roster-card">
                        <img src="${T.img}" class="roster-img">
                        <div class="roster-info"><h4>${T.name}</h4><p>${T.breed}</p></div>
                        <button class="btn-archive-pet" data-petid="${T.id}" title="Move to Bin" 
                            style="background: white; border: 2px solid #ef4444; color: #ef4444; padding: 6px 15px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s;" 
                            onmouseover="this.style.background='#ef4444'; this.style.color='white';" 
                            onmouseout="this.style.background='white'; this.style.color='#ef4444';">
                            <i class="fa-solid fa-trash-can"></i> Bin
                        </button>
                    </div>
                `;T.status==="Private"?x.innerHTML+=D:M.innerHTML+=D})),await st();const C=document.getElementById("btnRefreshActivityLogs");C&&(C.onclick=async()=>{C.classList.add("spinning"),C.disabled=!0,await st(),setTimeout(()=>{C.classList.remove("spinning"),C.disabled=!1},450)})}async function st(){const e=document.getElementById("recentActivityLogs");if(e){e.innerHTML='<div class="activity-loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading activity logs...</div>';try{const a=await H.listDocuments(A,xt,[Q.equal("user_id",F),Q.orderDesc("$createdAt"),Q.limit(20)]);e.innerHTML="";const t=a.documents;t&&t.length>0?t.forEach(i=>{const r=Mt(i.timestamp,i.$createdAt),n=Ft(r),s=Ht(i.action,i.icon),o=i.target?P(i.target):"",d=P(i.action||"Activity recorded");e.innerHTML+=`
                        <div class="activity-item">
                            <div class="activity-icon-bubble ${s.themeClass}">
                                <i class="fa-solid ${s.icon}"></i>
                            </div>
                            <div class="activity-details">
                                <div class="activity-row-main">
                                    <span class="activity-action-text">${d}</span>
                                    <span class="activity-category-pill ${s.tagClass}">${s.tagLabel}</span>
                                </div>
                                ${o?`
                                    <div class="activity-target-pill" title="${o}">
                                        <i class="fa-solid fa-quote-left"></i>
                                        <span>${o}</span>
                                    </div>
                                `:""}
                                <div class="activity-meta">
                                    <span class="activity-timestamp"><i class="fa-regular fa-clock"></i> ${n}</span>
                                    <span class="activity-verified-tag"><i class="fa-solid fa-circle-check"></i> Recorded</span>
                                </div>
                            </div>
                        </div>
                    `}):e.innerHTML=`
                    <div class="activity-empty-state">
                        <div class="empty-icon-circle"><i class="fa-solid fa-shield-halved"></i></div>
                        <h4>Security & Account Verified</h4>
                        <p>Your session is active. Actions like pet registrations, adoptions, and profile updates will appear here in real time.</p>
                    </div>
                `}catch(a){console.warn("Could not load activity logs:",a),e.innerHTML=`
                <div class="activity-empty-state">
                    <div class="empty-icon-circle"><i class="fa-solid fa-circle-info"></i></div>
                    <h4>No Activity Recorded</h4>
                    <p>No past logs found for your account yet.</p>
                </div>
            `}}}function Mt(e,a){if(e){const t=typeof e=="number"?e:parseInt(e,10);if(!isNaN(t)&&t>0)return t}if(a){const t=Date.parse(a);if(!isNaN(t)&&t>0)return t;const i=new Date(a).getTime();if(!isNaN(i)&&i>0)return i}return Date.now()}function P(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function Ht(e,a){const t=(e||"").toLowerCase();if(t.includes("log")||t.includes("auth")||t.includes("verified")||t.includes("session"))return{themeClass:"theme-emerald",icon:"fa-shield-halved",tagClass:"tag-emerald",tagLabel:"Security"};if(t.includes("bin")||t.includes("delet")||t.includes("dumpster")||t.includes("trash"))return{themeClass:"theme-rose",icon:"fa-trash-can",tagClass:"tag-rose",tagLabel:"Archive"};if(t.includes("pet")||t.includes("adopt")||t.includes("restor")||t.includes("breed"))return{themeClass:"theme-terracotta",icon:"fa-paw",tagClass:"tag-terracotta",tagLabel:"Pet Care"};if(t.includes("photo")||t.includes("avatar")||t.includes("profile")||t.includes("settings"))return{themeClass:"theme-honey",icon:"fa-user-pen",tagClass:"tag-honey",tagLabel:"Profile"};if(t.includes("shop")||t.includes("cart")||t.includes("item")||t.includes("buy"))return{themeClass:"theme-amber",icon:"fa-bag-shopping",tagClass:"tag-amber",tagLabel:"Shop"};let i=a||"fa-bell";return i==="fa-right-to-bracket"&&(i="fa-arrow-right-to-bracket"),{themeClass:"theme-sage",icon:i,tagClass:"tag-sage",tagLabel:"Activity"}}function Ft(e){if(!e||isNaN(e))return"Recently";const a=Date.now(),t=Math.max(0,a-e),i=60*1e3,r=60*i,n=24*r,s=new Date(e);if(isNaN(s.getTime()))return"Recently";const o=s.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return t<2*i?"Just now":t<60*i?`${Math.floor(t/i)}m ago`:t<24*r?`${Math.floor(t/r)}h ago (${o})`:new Date(a-n).toDateString()===s.toDateString()?`Yesterday at ${o}`:s.toLocaleDateString(void 0,{month:"short",day:"numeric"})+` at ${o}`}const ot=document.getElementById("btnLogout");ot&&ot.addEventListener("click",async()=>{try{await ne.deleteSession("current")}catch(e){console.warn(e)}window.location.href="/PawTrackLogin.html"});let S=null;Object.keys(k).length===0&&(k.PawTrackCommunity=[{text:"Welcome to PawTrack! Connect with pet lovers, adopters, and arrange playdates right here.",type:"received",time:"10:00 AM"}]);function Re(){return`
            <div class="messages-page-container">
                <div class="page-header" style="margin-bottom: 24px;">
                    <div>
                        <h2><i class="fa-solid fa-comments" style="color: var(--primary);"></i> PawTrack Messenger</h2>
                        <p>Direct real-time conversations with pet owners, adopters, and community members.</p>
                    </div>
                    <button class="btn-primary" id="btnPageNewChat">
                        <i class="fa-solid fa-plus"></i>
                        <span>New Conversation</span>
                    </button>
                </div>

                <div class="messenger-workspace">
                    <div class="messenger-sidebar-panel">
                        <div class="messenger-search-bar">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="messengerSearchInput" placeholder="Search conversations...">
                        </div>
                        <div class="messenger-inbox-list" id="messengerInboxList">
                            <!-- Populated dynamically -->
                        </div>
                    </div>

                    <div class="messenger-chat-panel" id="messengerChatPanel">
                        <!-- Active conversation stream -->
                    </div>
                </div>
            </div>
        `}function Ne(e=null){const a=document.getElementById("messengerInboxList"),t=document.getElementById("messengerChatPanel"),i=document.getElementById("btnPageNewChat"),r=document.getElementById("messengerSearchInput");if(!a||!t)return;function n(p=""){a.innerHTML="";const g=Object.keys(k).filter(f=>f.toLowerCase().includes(p.toLowerCase()));if(g.length===0){a.innerHTML=`
                    <div class="inbox-empty-state">
                        <i class="fa-solid fa-comments"></i>
                        <p>No conversations found.<br>Click "New Conversation" to start chatting!</p>
                    </div>
                `;return}g.forEach(f=>{const y=k[f]||[],w=y.length>0?y[y.length-1].text:"No messages yet",B=y.length>0?y[y.length-1].time:"",h=f===S?"active":"",l=document.createElement("div");l.className=`inbox-item ${h}`,l.setAttribute("data-user",f),l.innerHTML=`
                    <div class="inbox-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="inbox-info">
                        <div class="inbox-info-header">
                            <h4>@${P(f)}</h4>
                            <span class="inbox-time">${B}</span>
                        </div>
                        <p class="inbox-snippet">${P(w)}</p>
                    </div>
                `,l.onclick=()=>s(f),a.appendChild(l)})}function s(p){S=p,document.querySelectorAll(".inbox-item").forEach(h=>{h.classList.toggle("active",h.getAttribute("data-user")===p)});const g=k[p]||[];t.innerHTML=`
                <div class="chat-pane-header">
                    <div class="chat-header-user">
                        <div class="chat-header-avatar"><i class="fa-solid fa-user"></i></div>
                        <div>
                            <h3>@${P(p)}</h3>
                            <span class="chat-online-status"><span class="status-dot-green"></span> Active Conversation</span>
                        </div>
                    </div>
                </div>

                <div class="chat-pane-messages" id="activeChatStream">
                    ${g.length===0?'<div class="empty-stream"><p>This is the start of your message history with @'+P(p)+"</p></div>":""}
                </div>

                <div class="chat-pane-input-bar">
                    <div class="chat-input-pill">
                        <input type="text" id="activeChatInput" placeholder="Write a message to @${P(p)}...">
                    </div>
                    <button class="btn-chat-send" id="btnActiveSend">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            `;const f=document.getElementById("activeChatStream");g.forEach(h=>{o(f,h.text,h.type,h.time)}),f.scrollTop=f.scrollHeight;const y=document.getElementById("activeChatInput"),w=document.getElementById("btnActiveSend");function B(){const h=y.value.trim();if(!h||!S)return;const l=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});o(f,h,"sent",l),y.value="",f.scrollTop=f.scrollHeight,k[S]||(k[S]=[]),k[S].push({text:h,type:"sent",time:l}),n(r.value.trim()),S==="PawTrackCommunity"&&setTimeout(()=>{const c=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),u="We're glad to have you! Feel free to connect with pet owners across PawTrack.";k.PawTrackCommunity.push({text:u,type:"received",time:c}),S==="PawTrackCommunity"&&(o(f,u,"received",c),f.scrollTop=f.scrollHeight),n(r.value.trim())},1e3)}w.onclick=B,y.onkeypress=h=>{h.key==="Enter"&&B()},y.focus()}function o(p,g,f,y){const w=document.createElement("div");w.className=`stream-bubble-row row-${f}`,w.innerHTML=`
                <div class="stream-bubble bubble-${f}">
                    <div class="bubble-text">${P(g)}</div>
                    <div class="bubble-time">${P(y||"")}</div>
                </div>
            `,p.appendChild(w)}r.oninput=p=>{n(p.target.value.trim())},i.onclick=()=>{Ze("Start Conversation","Enter the PawTrack username you'd like to message:",p=>{if(p&&p.trim()){const g=p.trim().replace("@","");k[g]||(k[g]=[]),n(),s(g)}})};const d=Object.keys(k),m=e||(d.length>0?d[0]:null);n(),m?s(m):t.innerHTML=`
                <div class="empty-conversation-state">
                    <div class="empty-icon-circle"><i class="fa-solid fa-comments"></i></div>
                    <h3>Your Messages</h3>
                    <p>Select a conversation from the left or click "New Conversation" to start chatting.</p>
                </div>
            `}function Dt(){const e=document.getElementById("floatingChatWidget"),a=document.getElementById("floatingChatBubble"),t=document.getElementById("floatingChatWindow"),i=document.getElementById("floatingChatBody"),r=document.getElementById("btnFloatingChatBack"),n=document.getElementById("btnFloatingChatNew"),s=document.getElementById("btnFloatingChatExpand"),o=document.getElementById("btnFloatingChatClose"),d=document.getElementById("floatingChatHeaderTitle"),m=document.getElementById("floatingChatHeaderStatus"),p=document.getElementById("floatingChatHeaderAvatar"),g=document.getElementById("chatGlobalBadge");if(!e||!a||!t||!i)return;let f=!1;function y(l=0){g&&(l>0?(g.innerText=l>99?"99+":l,g.style.display="flex"):(g.innerText="0",g.style.display="none"))}function w(l=null){f=l!==null?l:!f,f?(e.classList.add("open"),t.setAttribute("aria-hidden","false"),y(0),S?h(S):B()):(e.classList.remove("open"),t.setAttribute("aria-hidden","true"))}function B(l=""){r&&(r.style.display="none"),d&&(d.innerText="PawTrack Messenger"),m&&(m.innerHTML='<span class="status-dot-green"></span> Online & Active'),p&&(p.innerHTML='<i class="fa-solid fa-comments"></i>'),i.innerHTML=`
                <div class="floating-inbox-wrapper">
                    <div class="floating-inbox-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="floatingInboxSearchInput" placeholder="Search conversations..." value="${P(l)}">
                    </div>
                    <div class="floating-inbox-list" id="floatingInboxList"></div>
                </div>
            `;const c=document.getElementById("floatingInboxList"),u=document.getElementById("floatingInboxSearchInput"),x=Object.keys(k).filter(M=>M.toLowerCase().includes(l.toLowerCase()));x.length===0?c.innerHTML=`
                    <div class="inbox-empty-state">
                        <i class="fa-solid fa-comments"></i>
                        <p>No conversations found.<br>Click <i class="fa-solid fa-pen-to-square"></i> above to start chatting!</p>
                    </div>
                `:x.forEach(M=>{const C=k[M]||[],T=C.length>0?C[C.length-1].text:"No messages yet",D=C.length>0?C[C.length-1].time:"",X=document.createElement("div");X.className="inbox-item",X.innerHTML=`
                        <div class="inbox-avatar">
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <div class="inbox-info">
                            <div class="inbox-info-header">
                                <h4>@${P(M)}</h4>
                                <span class="inbox-time">${D}</span>
                            </div>
                            <p class="inbox-snippet">${P(T)}</p>
                        </div>
                    `,X.onclick=()=>h(M),c.appendChild(X)}),u&&(u.oninput=M=>{B(M.target.value.trim());const C=document.getElementById("floatingInboxSearchInput");C&&(C.focus(),C.selectionStart=C.selectionEnd=C.value.length)})}function h(l){S=l,r&&(r.style.display="inline-flex"),d&&(d.innerText=`@${l}`),m&&(m.innerHTML='<span class="status-dot-green"></span> Active Conversation'),p&&(p.innerHTML='<i class="fa-solid fa-user"></i>');const c=k[l]||[];i.innerHTML=`
                <div class="floating-chat-stream-wrapper">
                    <div class="floating-chat-stream" id="floatingActiveStream">
                        ${c.length===0?'<div class="empty-stream"><p>This is the start of your message history with @'+P(l)+"</p></div>":""}
                    </div>
                    <div class="floating-chat-input-bar">
                        <input type="text" id="floatingChatInput" placeholder="Message @${P(l)}...">
                        <button class="btn-floating-chat-send" id="btnFloatingSend" title="Send Message" aria-label="Send Message">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;const u=document.getElementById("floatingActiveStream");c.forEach(T=>{const D=document.createElement("div");D.className=`stream-bubble-row row-${T.type}`,D.innerHTML=`
                    <div class="stream-bubble bubble-${T.type}">
                        <div class="bubble-text">${P(T.text)}</div>
                        <div class="bubble-time">${P(T.time||"")}</div>
                    </div>
                `,u.appendChild(D)}),u.scrollTop=u.scrollHeight;const x=document.getElementById("floatingChatInput"),M=document.getElementById("btnFloatingSend");function C(){const T=x.value.trim();if(!T||!S)return;const D=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),X=document.createElement("div");X.className="stream-bubble-row row-sent",X.innerHTML=`
                    <div class="stream-bubble bubble-sent">
                        <div class="bubble-text">${P(T)}</div>
                        <div class="bubble-time">${P(D)}</div>
                    </div>
                `,u.appendChild(X),x.value="",u.scrollTop=u.scrollHeight,k[S]||(k[S]=[]),k[S].push({text:T,type:"sent",time:D}),S==="PawTrackCommunity"&&setTimeout(()=>{const bt=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),wt="We're glad to have you! Feel free to connect with pet owners across PawTrack.";if(k.PawTrackCommunity.push({text:wt,type:"received",time:bt}),S==="PawTrackCommunity"&&document.getElementById("floatingActiveStream")){const We=document.createElement("div");We.className="stream-bubble-row row-received",We.innerHTML=`
                                <div class="stream-bubble bubble-received">
                                    <div class="bubble-text">${P(wt)}</div>
                                    <div class="bubble-time">${P(bt)}</div>
                                </div>
                            `;const Ce=document.getElementById("floatingActiveStream");Ce&&(Ce.appendChild(We),Ce.scrollTop=Ce.scrollHeight)}},800)}M&&(M.onclick=C),x&&(x.onkeypress=T=>{T.key==="Enter"&&C()},setTimeout(()=>x.focus(),150))}a.onclick=l=>{l.stopPropagation(),w()},o&&(o.onclick=l=>{l.stopPropagation(),w(!1)}),r&&(r.onclick=l=>{l.stopPropagation(),S=null,B()}),n&&(n.onclick=l=>{l.stopPropagation(),Ze("Start Conversation","Enter the PawTrack username you'd like to message:",c=>{if(c&&c.trim()){const u=c.trim().replace("@","");k[u]||(k[u]=[]),h(u)}})}),s&&(s.onclick=l=>{l.stopPropagation(),w(!1),G.forEach(c=>c.classList.remove("active")),v.scrollTo({top:0,behavior:"smooth"}),v.innerHTML=Re(),Ne(S)}),document.addEventListener("click",l=>{f&&!e.contains(l.target)&&w(!1)}),window.pawtrackOpenFloatingChat=function(l=null){w(!0),l?(k[l]||(k[l]=[]),h(l)):S?h(S):B()}}v.addEventListener("click",e=>{const a=e.target.closest(".btn-message-owner");if(a){const t=a.getAttribute("data-owner");window.pawtrackOpenFloatingChat?window.pawtrackOpenFloatingChat(t):(v.scrollTo({top:0,behavior:"smooth"}),v.innerHTML=Re(),Ne(t))}}),v.addEventListener("input",e=>{if(e.target.id==="radarDistanceRange"){const a=document.getElementById("radarDistanceValue");a&&(a.innerText=`${e.target.value} km`)}}),v.addEventListener("click",async e=>{var a,t,i,r,n;if(e.target.closest("#btnSaveAllSettings")){const s=((a=document.getElementById("notifVet"))==null?void 0:a.checked)??!0,o=((t=document.getElementById("notifMatch"))==null?void 0:t.checked)??!0,d=((i=document.getElementById("notifAdoption"))==null?void 0:i.checked)??!0,m=((r=document.getElementById("prefIncognito"))==null?void 0:r.checked)??!1,p=((n=document.getElementById("radarDistanceRange"))==null?void 0:n.value)||"25";try{await ne.updatePrefs({...L,notifVet:s,notifMatch:o,notifAdoption:d,incognito:m,radarDistance:p}),L.radarDistance=p,L.incognito=m,await _("Updated notification & discovery preferences","","fa-sliders"),E("Settings Saved","Your notification, privacy, and discovery preferences have been updated successfully!")}catch(g){E("Error",g.message,!0)}}});const N=[{title:"Your Care Dashboard 🏠",desc:"Welcome to PawTrack! From your Home dashboard, track registered pet counts, see active adoption statuses, review upcoming vet reminders, and get daily outdoor walk weather tips.",icon:"fa-house",targetSelector:".sidebar-nav [data-target='home']",tab:"home",placement:"right"},{title:"Live Adoption Board 🐾",desc:"Browse companions looking for a loving home! When other users register a pet for adoption, it shows up here in real-time without reloading. Click 'Details' to view medical notes, or 'Adopt Now' to send a digital application.",icon:"fa-paw",targetSelector:".sidebar-nav [data-target='pets']",tab:"pets",placement:"right"},{title:"Register Your Own Pet 📸",desc:"Add your furry family member with photo uploads to PawTrack Cloud Storage. Choose whether your companion is a private pet for health tracking or listed publicly for adoption.",icon:"fa-plus-circle",targetSelector:"#btnRegisterPet",tab:null,placement:"bottom"},{title:"Pet Matchmaker & Playdates ❤️",desc:"Find compatible playmates or breeding matches based on breed, age, and location. Give a Treat to express interest, or pass to browse more verified neighborhood companions.",icon:"fa-heart",targetSelector:".sidebar-nav [data-target='breeding']",tab:"breeding",placement:"right"},{title:"Verified Vet Appointments 🩺",desc:"Book check-ups and medical visits with licensed veterinarians. Select your preferred clinic and time slot, and manage upcoming appointments in one place.",icon:"fa-user-doctor",targetSelector:".sidebar-nav [data-target='vet']",tab:"vet",placement:"right"},{title:"Real-Time Messages & Alerts 💬",desc:"Chat directly with pet owners, caregivers, and adopters anytime via your floating messenger bubble! Real-time notification toasts keep you updated the moment an application is approved or a new pet is posted!",icon:"fa-comment-dots",targetSelector:"#floatingChatBubble",tab:null,placement:"left"}];let O=0,Ee=!1,fe=null;function qe(e){fe&&fe!==e&&fe.classList.remove("tour-target-elevated"),e?(e.classList.add("tour-target-elevated"),fe=e):fe=null}function Be(e){const a=document.getElementById("pawtrackTourOverlay"),t=document.getElementById("tourSpotlightBox"),i=document.getElementById("tourCard");if(!a||!t||!i)return;let r=e.targetSelector?document.querySelector(e.targetSelector):null;if(!r||r.offsetParent===null){t.style.display="none",a.classList.add("no-target"),qe(null),i.style.top="50%",i.style.left="50%",i.style.transform="translate(-50%, -50%)";return}a.classList.remove("no-target"),qe(r),t.style.display="block";const n=r.getBoundingClientRect(),s=6,o=Math.max(0,n.top-s),d=Math.max(0,n.left-s),m=n.width+s*2,p=n.height+s*2;t.style.top=`${o}px`,t.style.left=`${d}px`,t.style.width=`${m}px`,t.style.height=`${p}px`;try{const h=window.getComputedStyle(r),l=parseFloat(h.borderRadius)||12;t.style.borderRadius=`${Math.max(10,l+4)}px`}catch{t.style.borderRadius="14px"}if(window.innerWidth<=768){i.style.top="",i.style.left="",i.style.transform="";return}i.style.transform="none";const g=390,f=i.offsetHeight||220,y=16;let w,B;e.placement==="right"?(B=n.right+y,w=Math.max(20,n.top+n.height/2-f/2),B+g>window.innerWidth-20&&(B=Math.max(20,n.left-g-y))):e.placement==="bottom"?(w=n.bottom+y,B=n.left+n.width/2-g/2,B+g>window.innerWidth-20&&(B=window.innerWidth-g-24),B<20&&(B=20),w+f>window.innerHeight-20&&(w=Math.max(20,n.top-f-y))):e.placement==="left"?(B=Math.max(20,n.left-g-y),w=Math.max(20,n.top+n.height/2-f/2),w+f>window.innerHeight-20&&(w=window.innerHeight-f-20)):(w=Math.max(20,window.innerHeight/2-f/2),B=Math.max(20,window.innerWidth/2-g/2)),w=Math.min(Math.max(20,w),window.innerHeight-f-20),B=Math.min(Math.max(20,B),window.innerWidth-g-20),i.style.top=`${w}px`,i.style.left=`${B}px`}function ze(e){if(e<0||e>=N.length){Te();return}O=e;const a=N[e];if(a.tab){const m=document.querySelector(`.sidebar-nav [data-target="${a.tab}"]`);m&&!m.classList.contains("active")&&m.click()}const t=document.getElementById("tourStepBadge"),i=document.getElementById("tourStepTitle"),r=document.getElementById("tourStepDesc"),n=document.getElementById("tourIconBubble"),s=document.getElementById("tourDots"),o=document.getElementById("tourBtnPrev"),d=document.getElementById("tourBtnNext");t&&(t.innerText=`STEP ${e+1} OF ${N.length}`),i&&(i.innerText=a.title),r&&(r.innerText=a.desc),n&&(n.innerHTML=`<i class="fa-solid ${a.icon}"></i>`),s&&(s.innerHTML=N.map((m,p)=>`<div class="tour-dot ${p===e?"active":""}"></div>`).join("")),o&&(o.style.display=e>0?"inline-block":"none"),d&&(e===N.length-1?d.innerHTML='Finish Tour <i class="fa-solid fa-check"></i>':d.innerHTML='Next <i class="fa-solid fa-arrow-right"></i>'),setTimeout(()=>{Be(a)},60),setTimeout(()=>{Be(a)},220)}function Oe(e=0){const a=document.getElementById("tourWelcomeModal");a&&(a.style.display="none");const t=document.getElementById("howItWorksModal");t&&(t.style.display="none");const i=document.getElementById("pawtrackTourOverlay");i&&(i.style.display="block",Ee=!0,ze(e))}async function ve(){if(F)try{localStorage.setItem("pawtrack_tour_completed_"+F,"true"),localStorage.removeItem("pawtrack_is_new_user_"+F),sessionStorage.removeItem("pawtrack_just_registered_user"),sessionStorage.removeItem("pawtrack_is_new_registration"),L.tour_completed=!0,L.is_new_user=!1,await ne.updatePrefs({...L,tour_completed:!0,is_new_user:!1})}catch(e){console.warn("Could not persist tour completion to Appwrite:",e)}}function Te(e=!0){const a=document.getElementById("pawtrackTourOverlay");a&&(a.style.display="none"),Ee=!1,qe(null),e&&ve()}function _t(){O<N.length-1?ze(O+1):(Te(!0),Y("Tour Complete! 🌟","You're all set! Click 'Guide & Tour' anytime at the top of your screen to replay.","fa-circle-check",null,"app"))}function Rt(){O>0&&ze(O-1)}function Ie(){const e=document.getElementById("howItWorksModal");e&&(e.style.display="none")}function Nt(){try{if(!F)return;const e=L.is_new_user===!0||localStorage.getItem("pawtrack_is_new_user_"+F)==="true"||sessionStorage.getItem("pawtrack_just_registered_user")===F||sessionStorage.getItem("pawtrack_is_new_registration")==="true",a=L.tour_completed===!0||localStorage.getItem("pawtrack_tour_completed_"+F)==="true";if(e&&!a)setTimeout(()=>{const t=document.getElementById("tourWelcomeModal"),i=document.getElementById("welcomeTourHeading"),r=L.username||$;i&&r&&(i.innerText=`Welcome, ${r}! 👋`),t&&(t.style.display="flex"),ve()},1200);else{const t=document.getElementById("tourWelcomeModal");t&&(t.style.display="none")}}catch(e){console.warn("First-time tour check warning:",e)}}const rt=document.getElementById("btnStartTour");rt&&rt.addEventListener("click",()=>{Oe(0)});const lt=document.getElementById("btnSidebarAiAssistant");lt&&lt.addEventListener("click",()=>{Y("AI Assistant 🤖","This feature is still under development. Stay tuned for our AI-powered assistant!","fa-robot",null,"info")});const dt=document.getElementById("btnWelcomeTourStart");dt&&dt.addEventListener("click",()=>{ve(),Oe(0)});const ct=document.getElementById("btnWelcomeTourSkip");ct&&ct.addEventListener("click",()=>{const e=document.getElementById("tourWelcomeModal");e&&(e.style.display="none"),ve()});const pt=document.getElementById("tourBtnClose");pt&&pt.addEventListener("click",()=>Te(!0));const mt=document.getElementById("tourBtnSkip");mt&&mt.addEventListener("click",()=>Te(!0));const ut=document.getElementById("tourBtnNext");ut&&ut.addEventListener("click",_t);const gt=document.getElementById("tourBtnPrev");gt&&gt.addEventListener("click",Rt);const ft=document.getElementById("btnHiwClose");ft&&ft.addEventListener("click",Ie);const vt=document.getElementById("btnHiwDismiss");vt&&vt.addEventListener("click",Ie);const yt=document.getElementById("btnHiwStartInteractiveTour");yt&&yt.addEventListener("click",()=>{Ie(),Oe(0)});const Ve=document.getElementById("howItWorksModal");Ve&&Ve.addEventListener("click",e=>{e.target===Ve&&Ie()});const ke=document.getElementById("tourWelcomeModal");ke&&ke.addEventListener("click",e=>{e.target===ke&&(ke.style.display="none",ve())}),document.querySelectorAll(".hiw-tab-btn").forEach(e=>{e.addEventListener("click",function(){document.querySelectorAll(".hiw-tab-btn").forEach(i=>i.classList.remove("active")),document.querySelectorAll(".hiw-tab-content").forEach(i=>i.classList.remove("active")),this.classList.add("active");const a=this.getAttribute("data-tab"),t=document.getElementById(a);t&&t.classList.add("active")})}),window.addEventListener("resize",()=>{Ee&&N[O]&&Be(N[O])}),window.addEventListener("scroll",()=>{Ee&&N[O]&&Be(N[O])},!0);function qt(){const e=document.querySelector(".sidebar"),a=document.getElementById("sidebarTogglePill"),t=document.getElementById("btnHeaderSidebarToggle"),i=document.getElementById("sidebarLogoWrapper");if(!e)return;localStorage.getItem("pawtrack_sidebar_collapsed")==="true"&&window.innerWidth>768&&(e.classList.add("collapsed"),a&&(a.title="Maximize sidebar",a.setAttribute("aria-label","Maximize sidebar")),t&&(t.title="Maximize sidebar"));function n(s=null){if(window.innerWidth<=768)return;const o=s!==null?s:!e.classList.contains("collapsed");e.classList.toggle("collapsed",o);try{localStorage.setItem("pawtrack_sidebar_collapsed",o?"true":"false")}catch{}a&&(a.title=o?"Maximize sidebar":"Minimize sidebar",a.setAttribute("aria-label",o?"Maximize sidebar":"Minimize sidebar")),t&&(t.title=o?"Maximize sidebar":"Minimize sidebar"),setTimeout(()=>{window.dispatchEvent(new Event("resize"))},310)}a&&a.addEventListener("click",s=>{s.stopPropagation(),n()}),t&&t.addEventListener("click",s=>{s.stopPropagation(),n()}),i&&i.addEventListener("click",()=>{e.classList.contains("collapsed")&&n(!1)})}qt(),Dt(),Nt()});
