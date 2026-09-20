import{a as ge,d as L,Q,I as X,s as Te,c as Ne}from"./appwrite-BTLpE_3q.js";const k="pawtrack_db",J="pets",ee="applications",_e="vet_appointments",Pe="recycle_bin",mt="activity_logs",ke="pawtrack_storage";let T="",qe="",R="",S={},ie="",y=[],x=[],M=[],N=[],ze=null,fe=[],$={};document.addEventListener("DOMContentLoaded",async()=>{var ct;try{const e=await ge.get();T=e.name,qe=e.email,R=e.$id,S=e.prefs||{},ie=((ct=e.prefs)==null?void 0:ct.phone)||"";const a=document.getElementById("userNameDisplay");if(a){const t=S.username||T;a.innerText=t?"Welcome, "+t+"!":"Welcome!"}try{y=(await L.listDocuments(k,J)).documents.map(i=>({...i,id:i.$id})),x=(await L.listDocuments(k,ee,[Q.equal("user_id",R)])).documents.map(i=>({...i,id:i.$id})),M=(await L.listDocuments(k,_e,[Q.equal("user_id",R)])).documents.map(i=>({...i,id:i.$id})),N=(await L.listDocuments(k,Pe,[Q.equal("owner",T)])).documents.map(i=>({...i,id:i.$id}))}catch(t){console.warn("Database collections not fully setup yet. Using empty arrays.",t)}}catch(e){console.error("User not logged in",e),window.location.href="/PawTrackLogin.html";return}async function A(e,a,t){try{await L.createDocument(k,mt,X.unique(),{user_id:R,action:e||"Activity recorded",target:a||"",icon:t||"fa-paw",timestamp:Date.now().toString()})}catch(n){console.warn("Failed to persist activity log to Appwrite:",n)}}function Oe(){document.body.style.zoom="1",document.body.style.width="100%",document.body.style.height="100%",navigator.userAgent.toLowerCase().includes("firefox")&&(document.body.style.transform="none")}let se;function b(e,a,t=!1,n=null){const r=document.getElementById("customPopupOverlay"),s=document.getElementById("customPopupTitle"),i=document.getElementById("customPopupMessage"),o=document.getElementById("customPopupActions");s.innerText=e,i.innerText=a,s.className=t?"custom-popup-title title-error":"custom-popup-title title-success",o.style.display="none",r.style.display="flex",clearTimeout(se),se=setTimeout(()=>{O(n)},5e3),document.getElementById("customPopupClose").onclick=()=>{clearTimeout(se),O(n)}}function ut(e,a,t){const n=document.getElementById("customPopupOverlay"),r=document.getElementById("customPopupTitle"),s=document.getElementById("customPopupMessage"),i=document.getElementById("customPopupActions");r.innerText=e,r.className="custom-popup-title title-success",s.innerHTML=`<p style="margin-bottom:10px;">${a}</p><input type="text" id="customPromptInput" style="width:100%; padding:12px; border-radius:8px; border:2px solid #cbd5e1; outline:none; font-size:1rem; font-weight:600; color:#0f172a;" autocomplete="off">`,i.style.display="flex",n.style.display="flex",clearTimeout(se),document.getElementById("btnPopupConfirm").innerText="Submit",document.getElementById("btnPopupConfirm").onclick=()=>{const o=document.getElementById("customPromptInput").value;O(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",o.trim()!==""&&t(o.trim())},document.getElementById("customPopupClose").onclick=()=>{O()},document.getElementById("btnPopupCancel").onclick=()=>{O(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure"}}function ne(e,a,t){const n=document.getElementById("customPopupOverlay"),r=document.getElementById("customPopupTitle"),s=document.getElementById("customPopupMessage"),i=document.getElementById("customPopupActions");r.innerText=e,r.className="custom-popup-title title-error",s.innerHTML=`<p>${a}</p>`,i.style.display="flex",n.style.display="flex",clearTimeout(se),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",document.getElementById("btnPopupConfirm").onclick=()=>{O(),t&&t()},document.getElementById("customPopupClose").onclick=()=>{O()},document.getElementById("btnPopupCancel").onclick=()=>{O()}}function O(e){document.getElementById("customPopupOverlay").style.display="none",e&&e()}window.addEventListener("resize",Oe),Oe();const oe=[{initials:"MD",name:"Dr. Miguel Antonio Dela Cruz",specialty:"General Veterinary Practitioner",phone:"0917-555-0101",email:"mdelacruz@pawtrack.ph",schedule:"Mon-Fri: 8am-4pm",clinic:"Quezon City Main Clinic",exp:"15 yrs exp",rating:"4.8"},{initials:"JS",name:"Dr. Joanna Marie R. Santos",specialty:"Veterinary Surgeon",phone:"0917-555-0102",email:"jmsantos@pawtrack.ph",schedule:"Tue-Sat: 10am-6pm",clinic:"Makati Pet Hospital",exp:"12 yrs exp",rating:"4.9"},{initials:"PV",name:"Dr. Paulo C. Villanueva",specialty:"Veterinary Oncologist",phone:"0917-555-0103",email:"pvillanueva@pawtrack.ph",schedule:"Mon-Thu: 9am-5pm",clinic:"BGC Animal Center",exp:"8 yrs exp",rating:"4.7"}];let V=0,U=[],te=[],W=0,_=null,ae=[],Le=3;const j=document.querySelectorAll(".sidebar-nav .nav-btn"),v=document.getElementById("mainDisplayPanel"),Ve=document.getElementById("profileTemplate").innerHTML,Ce=document.getElementById("cartItemsContainer"),gt=document.getElementById("cartTotalDisplay"),re=(e,a,t)=>`
        <div class="page-header">
            <div>
                <h2><i class="${t}"></i> ${e}</h2>
                <p>${a}</p>
            </div>
        </div>
    `;function le(){let e="";if(typeof y<"u"&&y.length>0){const a=y.filter(t=>t.status==="Available");a.length>0?a.forEach(t=>{const n=t.gender==="Female"?"gender-female":"gender-male",s=t.owner===T?`
                        <button class="btn-archive-pet" data-petid="${t.id}" title="Move to Bin" 
                            style="background: #fee2e2; color: #ef4444; border: 2px solid #fca5a5; border-radius: 10px; padding: 10px; cursor: pointer; transition: 0.3s;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    `:"",i=t.img||"https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";e+=`
                        <div class="pet-item-wrapper">
                            <div class="pet-card ${n}">
                                <img src="${i}" alt="${t.name}" class="pet-card-img">
                                <div class="pet-card-body">
                                    <h3 class="pet-name">${t.name}</h3>
                                    <p class="pet-breed">${t.breed}</p>
                                    <p class="pet-meta">${t.gender} • ${t.age}</p>
                                    <span class="status-badge">● ${t.status}</span>
                                    
                                    <div class="pet-actions" style="display: flex; gap: 8px;">
                                        <button class="btn-view-pet" data-target="pet-details-${t.id}" title="View Details" style="flex: 1;">
                                            Details <i class="fa-solid fa-chevron-down"></i>
                                        </button>
                                        
                                        ${s}

                                        <button class="btn-adopt" data-petid="${t.id}" data-petname="${t.name}" style="flex: 1;">Adopt Now</button>
                                    </div>
                                </div>
                            </div>
                            <div class="pet-details-dropdown ${n}" id="pet-details-${t.id}">
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
                ${re("Meet the Pets","Say hello to our furry friends currently waiting for a loving home.","fa-solid fa-paw")}
                <div class="pet-grid">
                    ${e}
                </div>
            </div>
        `}function de(){let e="",a="";return typeof x<"u"&&x.length>0&&x.forEach(t=>{const n=t.status==="Approved",r=n?"var(--emerald-light, #D1FAE5)":"var(--amber-light, #FEF3C7)",s=n?"#065F46":"#92400E",o=`
                <div class="app-item-wrapper" style="margin-bottom: 18px;">
                    <div class="app-card" style="border: 1px solid ${n?"rgba(16, 185, 129, 0.3)":"rgba(217, 119, 6, 0.25)"}; border-radius: 18px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; box-shadow: 0 4px 16px rgba(45, 30, 20, 0.05); z-index: 2; position: relative;">
                        <div style="display: flex; gap: 16px; align-items: center;">
                            <img src="${t.img}" alt="${t.pet_name}" style="width: 64px; height: 64px; border-radius: 14px; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 2px solid white;">
                            <div>
                                <h3 style="margin: 0 0 4px 0; color: #1F2421; font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800;">${t.pet_name}</h3>
                                <small style="color: #6B7280; font-weight: 500;"><i class="fa-regular fa-calendar-check" style="margin-right: 4px; color: var(--primary);"></i> Applied: ${t.date}</small>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <span style="background: ${r}; color: ${s}; padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-circle" style="font-size: 0.45rem;"></i> ${t.status}
                            </span>
                            
                            <button class="${n?"btn-adopt":"btn-view-app"}" data-target="app-details-${t.id}" style="${n?"padding: 9px 20px;":"padding: 9px 18px; background: #FAF8F5; border: 1px solid rgba(45,49,46,0.12); color: #1F2421; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;"}">
                                ${n?'<i class="fa-solid fa-heart"></i> Finalize':'Details <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>'}
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
                                <p style="color: ${n?"#065F46":"#92400E"};">${n?"🎉 Congratulations! Your adoption request is approved. Get in touch with the shelter/owner to finalize handover.":"⏳ Your application is currently under thorough review by the caregiver. We will notify you promptly!"}</p>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
                            ${n?"":`<button class="btn-cancel-app" data-appid="${t.id}" style="padding: 10px 20px; background: white; color: #EF4444; border: 1px solid #FCA5A5; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-ban"></i> Withdraw Application</button>`}
                            <button class="btn-close-pet" data-target="app-details-${t.id}" style="padding: 10px 20px; background: #FAF8F5; border: 1px solid rgba(45, 49, 46, 0.12); border-radius: 12px; color: #4B5563; font-weight: 700; cursor: pointer;">Close Details</button>
                        </div>
                    </div>
                </div>
            `;n?a+=o:e+=o}),`
            <div class="page-container">
                ${re("My Applications","Track the journey of your adoption requests and welcome your new companion home.","fa-solid fa-clipboard-list")}
                
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
        `}const $e=()=>{let e="";return typeof N<"u"&&N.length>0?N.forEach(a=>{const t=a.gender==="Female"?"gender-female":"gender-male";e+=`
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
        `},Ue=(e,a)=>`
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
    `;function Ae(){let e="";typeof M<"u"&&M.length>0?M.forEach(s=>{const i=s.status==="Approved",o=i?"appt-approved":"appt-pending",l=i?"badge-approved":"badge-pending",u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],p=s.date.split("-"),g=p.length===3?u[parseInt(p[1])-1]:"TBD",f=p.length===3?p[2]:"??";e+=`
                    <div class="appt-mini-card ${o}">
                        <div class="appt-date-box"><strong>${f}</strong><span>${g}</span></div>
                        <img src="${s.img}" alt="${s.pet_name}" class="appt-pet-avatar" style="object-fit: cover;">
                        <div class="appt-details">
                            <h4>${s.pet_name}'s Visit</h4>
                            <p>${s.vet_name}</p>
                            <span class="badge ${l}">${s.status} • ${s.time}</span>
                        </div>
                        
                        ${i?"":`
                            <div style="margin-left: auto;">
                                <button class="btn-cancel-vet" data-appid="${s.appt_id||s.id}" title="Cancel Appointment" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        `}
                    </div>
                `}):e='<p style="color: #64748b; margin-top: 10px; font-weight: 500;">No upcoming appointments.</p>';let a="";const t=y.filter(s=>s.owner===T);let n=[];typeof M<"u"&&(n=M.filter(s=>s.status!=="Cancelled"&&s.status!=="Completed").map(s=>s.pet_name));const r=t.filter(s=>!n.includes(s.name));return r.length>0?r.forEach(s=>{const i=s.gender&&s.gender.toLowerCase()==="female"?"gender-female":"gender-male";a+=`
                    <div class="pet-select-card ${i}" data-petid="${s.id}">
                        <img src="${s.img}" alt="${s.name}">
                        <span>${s.name}</span>
                    </div>
                `}):t.length>0?a='<p style="color: #f59e0b; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-clock" style="margin-right: 5px;"></i> All your pets currently have scheduled appointments. You can book another once current visits are completed or cancelled.</p>':a=`<p style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> You don't have any registered pets yet! Please register a pet first.</p>`,`
            <div class="page-container">
                ${re("Veterinary Appointments","Schedule checkups, vaccinations, and consultations for your pets.","fa-solid fa-user-doctor")}
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
                                <div class="reg-input"><label>Contact Number <span class="required">*</span></label><input type="tel" placeholder="+63 XXX-XXX-XXXX" required></div>
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
        `}const We=[{id:1,brand:"NaturePet",name:"Nutricare Organic Dry Cat Food (1kg)",price:250,category:"Cat Food",img:"/resources/shop/catfood.jpg"},{id:2,brand:"PawSource",name:"100g Real Beef Dog Biscuit Treats",price:150,category:"Dog Food & Treats",img:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400"},{id:3,brand:"KONG",name:"Classic Durable Rubber Dog Toy",price:450,category:"Toys",img:"/resources/shop/dog_toy.jpg"},{id:4,brand:"Paws & Pals",name:"Heavy Duty Reflective Leash",price:299,category:"Accessories",img:"/resources/shop/leash.jpg"},{id:5,brand:"PetSafe",name:"Ceramic Anti-Slip Pet Bowl",price:180,category:"Accessories",img:"/resources/shop/bowl.jpg"},{id:6,brand:"CozyPet",name:"Fluffy Calming Pet Bed (Medium)",price:550,category:"Accessories",img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400"},{id:7,brand:"Whiskas",name:"Tuna Flavor Wet Cat Food (12 Pouch)",price:540,category:"Cat Food",img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"},{id:8,brand:"Pedigree",name:"Adult Beef & Veg Dry Dog Food (1.5kg)",price:380,category:"Dog Food & Treats",img:"/resources/shop/dogfood.jpg"},{id:9,brand:"FelineFun",name:"Interactive Feather Teaser Wand",price:95,category:"Toys",img:"https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400"},{id:10,brand:"GroomPro",name:"Silicone Pet Bath Massage Brush",price:110,category:"Grooming",img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400"}];function je(e){if(e.length===0)return'<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 50px; font-size: 1.2rem;">No items match your filters.</p>';let a="";return e.forEach(t=>{a+=`
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
            `}),a}function ft(){return`
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
                        ${je(We)}
                    </div>
                </div>
            </div>
        `}const vt=`
        <div class="registration-wrapper">
            ${re("Register a Pet","Fill in the details below to add a new pet to the system.","fa-solid fa-shield-cat")}
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
    `;function ve(){const e=y.filter(t=>t.owner===T&&t.status==="Private");let a="";return e.length>0?e.forEach(t=>{const n=t.gender==="Female"?"gender-female":"gender-male",r=t.img||"https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b";a+=`
                    <div class="my-pet-card ${n}" data-petid="${t.id}">
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
        `}function ye(){v.innerHTML=`
            <div class="page-container">
                ${re("Match Dashboard","Track pending requests and message approved matches.","fa-solid fa-mars-and-venus")}
                <div class="page-header" style="margin-top: -15px;">
                    <div></div>
                    <button class="btn-animated" id="btnBackToMatch" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Match Maker</button>
                </div>
                <div class="glass-panel" style="overflow-y: auto; flex:1;" id="matchDashboardContent">
                    <p style="text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">Loading matches...</p>
                </div>
            </div>
        `,Promise.resolve({status:"success",matches:fe}).then(e=>{if(e.status==="success"){let a='<div class="pairs-grid">';e.matches.length===0?a+='<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">You have no active matches or requests yet.</p>':e.matches.forEach(t=>{let n="",r="",s="";if(t.status==="pending"){const i=!t.is_sender,o=i?"Reject Match":"Cancel Request",l=i?"Are you sure you want to reject this match request?":"Are you sure you want to cancel your match request?";s=`
                                <button class="btn-delete-pair" data-matchid="${t.id}" data-title="${o}" data-msg="${l}" title="${i?"Reject":"Cancel Request"}" 
                                    style="position: absolute; top: 10px; right: 10px; z-index: 50; background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" 
                                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            `}t.status==="approved"?(r='<div class="pair-status approved">● Approved & Messaging</div>',n=`<button class="btn-animated btn-message-owner" data-owner="${t.ownerUsername}" style="width:100%; margin-top:10px; justify-content: center;"><i class="fa-regular fa-comment-dots"></i> Message Owner</button>`):t.status==="pending"&&t.is_sender?r='<div class="pair-status">● Pending Approval</div>':t.status==="pending"&&!t.is_sender&&(r='<div class="pair-status" style="color:#f59e0b; background:#fef3c7;">● Received Request!</div>',n=`<button class="btn-accept-match" data-matchid="${t.id}" style="width:100%; margin-top:10px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);"><i class="fa-solid fa-check"></i> Accept Match</button>`),a+=`
                            <div class="pair-card" style="position: relative; padding-top: 25px;">
                                ${s}
                                <div class="pair-images">
                                    <img src="${t.my_pet_img}" class="pair-img left">
                                    <div class="pair-heart-small"><i class="fa-solid fa-heart"></i></div>
                                    <img src="${t.their_pet_img}" class="pair-img right">
                                </div>
                                <div class="pair-names">${t.my_pet_name} & ${t.their_pet_name}</div>
                                ${r}
                                <div class="pair-date">@${t.ownerUsername}</div>
                                ${n}
                            </div>
                        `}),a+="</div>",document.getElementById("matchDashboardContent").innerHTML=a}})}function ce(){const e=y.filter(o=>o.owner===T).length,a=typeof M<"u"?M.filter(o=>o.status!=="Cancelled"&&o.status!=="Completed").length:0;let t="None",n="#64748b";typeof x<"u"&&x.length>0&&(t=x[0].status,t==="Approved"?n="#10b981":t==="Pending Review"&&(n="#f59e0b"));let r="";typeof M<"u"&&M.filter(o=>o.status!=="Cancelled"&&o.status!=="Completed").forEach(o=>{r+=`<div class="reminder-item warning"><div class="rem-icon"><i class="fa-solid fa-user-doctor"></i></div><div class="rem-text"><strong>${o.pet_name}'s Vet Visit</strong><small>${o.date} at ${o.time}</small></div></div>`}),typeof x<"u"&&x.filter(o=>o.status==="Approved").forEach(o=>{r+=`<div class="reminder-item success"><div class="rem-icon"><i class="fa-solid fa-check"></i></div><div class="rem-text"><strong>Adoption Approved!</strong><small>You can now finalize ${o.pet_name}'s adoption.</small></div></div>`}),r===""&&(r=`<div style="text-align:center; color:#64748b; padding:20px; font-weight:600;"><i class="fa-solid fa-mug-hot" style="font-size:2rem; margin-bottom:10px; color:#cbd5e1;"></i><br>You're all caught up!</div>`);const s=y.filter(o=>o.status==="Available");let i="";if(s.length>0){const o=Math.floor(Math.random()*s.length),l=s[o],u=l.gender==="Female"?'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>':'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>';i=`
                <div class="home-card featured-pet-card" style="flex: 1;">
                    <div class="featured-badge"><i class="fa-solid fa-star"></i> Pet of the Day</div>
                    <img src="${l.img}" alt="${l.name}" class="featured-img">
                    <div class="featured-info">
                        <h3>${l.name} ${u}</h3>
                        <p class="breed">${l.breed} • ${l.age}</p>
                        <p class="bio">${l.reason_for_adoption||l.personal_traits||"Looking for a loving forever home!"}</p>
                        <button class="btn-animated btn-adopt-potd" data-petid="${l.id}" data-petname="${l.name}" style="width: 100%; justify-content: center; margin-top: 10px;">Meet ${l.name}</button>
                    </div>
                </div>
            `}else i=`
                <div class="home-card featured-pet-card" style="flex: 1; display:flex; justify-content:center; align-items:center; background:#1e293b;">
                    <div style="text-align:center; color:white; z-index:2; padding:20px;">
                        <i class="fa-solid fa-shield-cat" style="font-size:3rem; margin-bottom:15px; color:#64748b;"></i>
                        <h3>No Pets Available</h3><p style="color:#cbd5e1; font-size:0.9rem; margin-top:10px;">Check back later for new arrivals!</p>
                    </div>
                </div>
            `;v.innerHTML=`
            <div class="home-container">
                <div class="home-banner">
                    <div class="banner-text"><h1>Welcome back, ${T}! 👋</h1><p>Here is what's happening with your furry friends today.</p></div>
                    <div class="banner-icon"><i class="fa-solid fa-shield-cat"></i></div>
                </div>
                <div class="stats-row">
                    <div class="home-stat-card"><div class="stat-icon paw-bg"><i class="fa-solid fa-paw"></i></div><div><h3>My Pets</h3><h2>${e}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon health-bg"><i class="fa-solid fa-notes-medical"></i></div><div><h3>Upcoming Vets</h3><h2>${a}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon heart-bg"><i class="fa-solid fa-heart"></i></div><div><h3>Adoption Status</h3><h2 style="color:${n}; font-size: 1.3rem;">${t}</h2></div></div>
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
                        ${i}
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
        `,Promise.resolve({status:"success",matches:fe}).then(o=>{const l=document.getElementById("homeMatchAlertsContainer");if(l)if(o.status==="success"&&o.matches.length>0){let u="";o.matches.slice(0,3).forEach(p=>{let g=p.status==="approved"?"Approved Match!":"Pending Request",f=p.status==="approved"?"💌":"⏳";u+=`
                        <div class="match-alert-item" style="cursor:pointer;" onclick="document.querySelector('[data-target=\\'breeding\\']').click()">
                            <img src="${p.their_pet_img}" alt="Pet">
                            <div class="alert-text"><strong>${p.their_pet_name} ${f}</strong><span>${g}</span></div>
                            <button class="btn-small-view">View</button>
                        </div>
                    `}),l.innerHTML=u}else l.innerHTML='<p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">No recent match activity.</p>'}),fetch("https://api.open-meteo.com/v1/forecast?latitude=14.6488&longitude=121.0509&current_weather=true").then(o=>o.json()).then(o=>{const l=Math.round(o.current_weather.temperature),u=o.current_weather.weathercode,p=document.getElementById("weatherTemp"),g=document.getElementById("weatherIcon"),f=document.getElementById("weatherText");p&&g&&f&&(p.innerText=`${l}°C`,u<=3?(g.className="fa-solid fa-sun weather-icon",g.style.color="#fef08a",f.innerHTML="<strong>Perfect time for a walk!</strong><br>The weather is great today. Take your pets out before it gets too hot."):u>=51&&u<=67||u>=80?(g.className="fa-solid fa-cloud-rain weather-icon",g.style.color="#bae6fd",f.innerHTML="<strong>It's a bit rainy!</strong><br>Keep your pets dry indoors today. A good time for some indoor training!"):(g.className="fa-solid fa-cloud weather-icon",g.style.color="#e2e8f0",f.innerHTML="<strong>Nice and cool!</strong><br>A great day for some indoor play or a quick stroll around the neighborhood."))}).catch(o=>console.error("Weather fetch error:",o)),setTimeout(()=>{const o=document.querySelector(".btn-adopt-potd");o&&o.addEventListener("click",l=>{const u=l.target.getAttribute("data-petid"),p=l.target.getAttribute("data-petname");v.innerHTML=Ue(u,p),document.querySelectorAll(".sidebar-nav .nav-btn").forEach(g=>g.classList.remove("active")),document.querySelector('[data-target="pets"]').classList.add("active")})},100)}ce();function yt(){let e=document.getElementById("pawtrackToastContainer");return e||(e=document.createElement("div"),e.id="pawtrackToastContainer",e.className="pawtrack-toast-container",document.body.appendChild(e)),e}function G(e,a,t="fa-paw",n=null,r="default"){const s=yt(),i=document.createElement("div");i.className=`pawtrack-toast-card ${r==="app"?"toast-app":r==="info"?"toast-info":""}`,i.innerHTML=`
            <div class="toast-icon-bubble">
                <i class="fa-solid ${t}"></i>
            </div>
            <div class="toast-body">
                <div class="toast-title">
                    <span>${D(e)}</span>
                </div>
                <p class="toast-msg">${D(a)}</p>
            </div>
            <button class="toast-close" title="Dismiss">&times;</button>
        `;const o=i.querySelector(".toast-close");let l=null;const u=p=>{p&&p.stopPropagation(),l&&clearTimeout(l),i.style.animation="toastSlideOut 0.25s forwards",setTimeout(()=>{i.parentElement&&i.parentElement.removeChild(i)},250)};o.addEventListener("click",u),n&&i.addEventListener("click",()=>{u();const p=document.querySelector(`.sidebar-nav .nav-btn[data-target="${n}"]`);if(p)p.click();else if(n==="pets"){j.forEach(f=>f.classList.remove("active"));const g=document.querySelector('[data-target="pets"]');g&&g.classList.add("active"),v.innerHTML=le()}else if(n==="applications"){j.forEach(f=>f.classList.remove("active"));const g=document.querySelector('[data-target="applications"]');g&&g.classList.add("active"),v.innerHTML=de()}}),s.appendChild(i),l=setTimeout(u,7e3)}function ht(){if(document.getElementById("adoptionApplicationForm"))return"adopt-form";if(document.getElementById("petRegistrationForm")||document.getElementById("registerPetForm"))return"register-pet";if(document.getElementById("profileFullName")||document.querySelector(".profile-container"))return"profile";const e=document.querySelector(".sidebar-nav .nav-btn.active");return e?e.getAttribute("data-target"):"home"}function pe(){const e=ht();e==="home"?ce():e==="pets"?v.innerHTML=le():e==="applications"?v.innerHTML=de():e==="profile"?he():e==="breeding"&&typeof ve=="function"&&!document.getElementById("matchDetailsOverlay")&&(v.innerHTML=ve())}function bt(e){if(!e||!e.payload)return;const a=e.events||[],t=e.payload,n=a.some(i=>i.includes(".create")),r=a.some(i=>i.includes(".update")),s=a.some(i=>i.includes(".delete"));if(t.$collectionId===J||a.some(i=>i.includes(`.${J}.`))){const i=t.$id,o={...t,id:t.$id};if(s){const l=y.find(u=>u.id===i);y=y.filter(u=>u.id!==i),l&&l.status==="Available"&&l.owner!==T&&G("Pet Removed",`${l.name} is no longer listed for adoption.`,"fa-paw","pets","info")}else if(n){const l=y.findIndex(u=>u.id===i);l===-1?y.unshift(o):y[l]=o,o.status==="Available"&&o.owner!==T&&G("New Pet for Adoption! 🐾",`@${o.owner||"A caregiver"} just listed ${o.name} (${o.breed||"Pet"}). Tap to meet them!`,"fa-heart","pets","default")}else if(r){const l=y.findIndex(p=>p.id===i),u=l!==-1?y[l]:null;l!==-1?y[l]=o:y.unshift(o),o.owner!==T&&(u&&u.status!=="Available"&&o.status==="Available"?G("Pet Available for Adoption! 🐾",`${o.name} (${o.breed}) is now available for adoption! Tap to view.`,"fa-heart","pets","default"):u&&u.status==="Available"&&o.status!=="Available"&&G("Pet Status Updated",`${o.name} is now ${o.status}.`,"fa-paw","pets","info"))}pe()}if(t.$collectionId===ee||a.some(i=>i.includes(`.${ee}.`))){const i=t.$id,o={...t,id:t.$id};if(o.user_id===R){if(s)x=x.filter(l=>l.id!==i);else if(n){const l=x.findIndex(u=>u.id===i);l===-1?x.unshift(o):x[l]=o}else if(r){const l=x.findIndex(p=>p.id===i),u=l!==-1?x[l].status:"";if(l!==-1?x[l]=o:x.unshift(o),u!==o.status){const p=o.status==="Approved";G(p?"🎉 Application Approved!":"Application Status Updated",`Your adoption application for ${o.pet_name} is now: ${o.status}!`,p?"fa-circle-check":"fa-clock","applications","app")}}pe()}}}let Se=!1;async function wt(){if(!Se){Se=!0;try{const a=(await L.listDocuments(k,J)).documents.map(s=>({...s,id:s.$id})),t=new Set(y.map(s=>s.id)),n=a.filter(s=>!t.has(s.id)&&s.status==="Available"&&s.owner!==T);if(a.length!==y.length||a.some((s,i)=>{var o,l;return((o=y[i])==null?void 0:o.id)!==s.id||((l=y[i])==null?void 0:l.status)!==s.status})){if(y=a,n.length>0){const s=n[0];G("New Pet for Adoption! 🐾",`@${s.owner||"A caregiver"} just listed ${s.name} (${s.breed||"Pet"}). Tap to meet them!`,"fa-heart","pets","default")}pe()}if(R){const i=(await L.listDocuments(k,ee,[Q.equal("user_id",R)])).documents.map(l=>({...l,id:l.$id}));(i.length!==x.length||i.some((l,u)=>{var p,g;return((p=x[u])==null?void 0:p.id)!==l.id||((g=x[u])==null?void 0:g.status)!==l.status}))&&(x=i,pe())}}catch{}finally{Se=!1}}}function xt(){try{if(Ne&&typeof Ne.subscribe=="function"){const e=`databases.${k}.collections.${J}.documents`,a=`databases.${k}.collections.${ee}.documents`;Ne.subscribe([e,a],t=>{bt(t)}),console.log("PawTrack: Appwrite Realtime connected for live adoption sync.")}}catch(e){console.warn("Realtime subscription fallback to polling:",e)}setInterval(wt,8e3)}xt();function Z(){const e=oe[V],a=document.getElementById("vetInitials");if(!a)return;a.innerText=e.initials,document.getElementById("vetNameDisplay").innerText=e.name,document.getElementById("vetSpecialtyDisplay").innerText=e.specialty,document.getElementById("vetRatingDisplay").innerText=`⭐ ${e.rating} (${e.exp})`,document.getElementById("vetPhoneDisplay").innerText=e.phone,document.getElementById("vetEmailDisplay").innerText=e.email,document.getElementById("vetScheduleDisplay").innerText=e.schedule,document.getElementById("vetClinicDisplay").innerText=e.clinic;const t=document.getElementById("apptVetIdHidden").value,n=document.getElementById("btnSelectVet");t===V.toString()?(n.innerText="✅ Confirmed",n.classList.add("selected")):(n.innerText="Confirm",n.classList.remove("selected"))}function me(){const e=document.getElementById("cartBadge");e&&(e.innerText=U.length),Ce.innerHTML="";let a=0;U.length===0?Ce.innerHTML='<p style="text-align:center; color:#64748b; font-weight:bold; margin-top: 50px;">Your cart is empty.</p>':U.forEach((t,n)=>{a+=parseFloat(t.price),Ce.innerHTML+=`
                    <div class="cart-item-row">
                        <img src="${t.img}" class="cart-item-img" onerror="this.src='/resources/shop/bowl.jpg'" alt="${t.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${t.name}</div>
                            <div class="cart-item-price">₱ ${t.price}</div>
                        </div>
                        <div><button class="btn-remove-item" data-index="${n}" title="Remove item"><i class="fa-solid fa-trash-can"></i></button></div>
                    </div>
                `}),gt.innerText=`₱ ${a.toFixed(2)}`}window.handleRewind=e=>{ae.splice(e,1),W=Math.max(0,W-1),Me()};function Et(){const e=document.getElementById("rewindList");e&&(e.innerHTML="",ae.length===0?e.innerHTML=`
                <div style="text-align:center; padding: 20px; opacity:0.5;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="font-size:0.85rem; font-weight:600;">History is empty</p>
                </div>`:ae.forEach((a,t)=>{e.innerHTML+=`
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
                `}))}function Me(){if(te.length===0||W>=te.length){document.getElementById("datingContentLayout").style.display="none";const i=document.getElementById("instructionOverlay");i.style.display="flex",i.innerHTML='<i class="fa-solid fa-face-frown-open" style="color: #cbd5e1; font-size: 4rem; margin-bottom: 15px;"></i><p>No more matches available<br>for this pet at the moment.</p>';return}const e=te[W];currentPhotoIndex=0;const a=document.getElementById("candThumbnails");a.innerHTML="",e.imgs.forEach((i,o)=>{a.innerHTML+=`<img src="${i}" class="cand-thumb ${o===0?"active":""}" data-index="${o}" alt="Photo ${o+1}">`}),Ge(e,0);const t=e.gender==="Male"?'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>':'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>';document.getElementById("candNameAge").innerHTML=`${e.name}, ${e.age} ${t}`,document.getElementById("candBreedGender").innerHTML=`<i class="fa-solid fa-paw"></i> ${e.breed}`,document.getElementById("candDesc").innerText=e.desc,document.getElementById("candScoreText").innerText=`${e.score}% Match`,document.getElementById("candScoreBar").style.width=`${e.score}%`;const n=document.getElementById("candBadges");n.innerHTML="",e.badges.includes("vet")&&(n.innerHTML+='<span class="v-badge badge-vet"><i class="fa-solid fa-stethoscope"></i> Vet Verified</span>'),e.badges.includes("pedigree")&&(n.innerHTML+='<span class="v-badge badge-pedigree"><i class="fa-solid fa-dna"></i> Purebred</span>'),e.badges.includes("vax")&&(n.innerHTML+='<span class="v-badge badge-vax"><i class="fa-solid fa-syringe"></i> Vaccinated</span>');const r=document.getElementById("candTraits");r.innerHTML="",e.traits.forEach(i=>{r.innerHTML+=`<span class="trait-tag">${i}</span>`}),document.getElementById("candOwnerName").innerText=e.ownerName,document.getElementById("candOwnerInitial").innerText=e.ownerInitial,document.getElementById("candOwnerRating").innerText=`⭐ ${e.ownerRating}`,document.getElementById("candOwnerPairs").innerText=`${e.successPairs} Successful Pairs`,document.getElementById("barSize").style.width=`${e.compSize}%`,document.getElementById("txtSize").innerText=`${e.compSize}%`,document.getElementById("barEnergy").style.width=`${e.compEnergy}%`,document.getElementById("txtEnergy").innerText=`${e.compEnergy}%`,document.getElementById("barTemp").style.width=`${e.compTemp}%`,document.getElementById("txtTemp").innerText=`${e.compTemp}%`;const s=document.getElementById("litterPredictor");s.innerHTML="",e.litter.forEach(i=>{const o=i.c==="#FFFFFF"||i.c==="#FFF8DC"?"#0f172a":"white";s.innerHTML+=`<div class="color-swatch" style="background:${i.c}; color:${o};">${i.p}%</div>`}),document.getElementById("instructionOverlay").style.display="none",document.getElementById("datingContentLayout").style.display="flex",document.getElementById("treatCountDisplay").innerText=`${Le} Left`,Et()}function Ge(e,a){const t=document.getElementById("candImg");t.style.opacity=0,setTimeout(()=>{t.src=e.imgs[a],t.style.opacity=1},150),document.querySelectorAll(".cand-thumb").forEach((n,r)=>{r===parseInt(a)?n.classList.add("active"):n.classList.remove("active")})}j.forEach(e=>{e.addEventListener("click",function(){j.forEach(t=>t.classList.remove("active")),this.classList.add("active");const a=this.getAttribute("data-target");v.scrollTo({top:0,behavior:"smooth"}),a==="home"?ce():a==="pets"?v.innerHTML=le():a==="applications"?v.innerHTML=de():a==="vet"?(v.innerHTML=Ae(),Z()):a==="shop"?(v.innerHTML=ft(),me()):a==="breeding"?(v.innerHTML=ve(),_=null):a==="messages"&&(v.innerHTML=Ze(),Ke())})}),document.getElementById("btnViewProfile").addEventListener("click",()=>{j.forEach(e=>e.classList.remove("active")),v.scrollTo({top:0,behavior:"smooth"}),v.innerHTML=Ve,he()}),document.getElementById("btnRegisterPet").addEventListener("click",()=>{j.forEach(r=>r.classList.remove("active")),v.scrollTo({top:0,behavior:"smooth"}),v.innerHTML=vt;const e=document.getElementById("imageDropZone"),a=document.getElementById("petImageInput"),t=document.getElementById("imagePreview"),n=document.getElementById("dropZoneText");e.addEventListener("click",()=>a.click()),ze=null,a.addEventListener("change",function(){if(this.files&&this.files[0]){ze=this.files[0];const r=new FileReader;r.onload=function(s){t.src=s.target.result,t.style.display="block",n.style.display="none"},r.readAsDataURL(this.files[0])}}),document.getElementById("btnCancelReg").addEventListener("click",()=>{ce(),j[0].classList.add("active")})}),v.addEventListener("click",async e=>{if(e.target.closest("#btnMatchRegisterPet")){document.getElementById("btnRegisterPet").click();return}if(e.target.classList.contains("profile-tab-btn")){document.querySelectorAll(".profile-tab-btn").forEach(d=>d.classList.remove("active")),document.querySelectorAll(".profile-tab-content").forEach(d=>d.classList.remove("active")),e.target.classList.add("active");const c=e.target.getAttribute("data-tab");document.getElementById(c).classList.add("active")}const t=e.target.closest(".btn-view-app")||e.target.closest(".btn-view-pet");if(t){const c=t.getAttribute("data-target"),d=document.getElementById(c),m=t.closest(".app-card")||t.closest(".pet-card");d.style.display==="block"?(d.style.display="none",m.classList.remove("dropdown-open")):(d.style.display="block",m.classList.add("dropdown-open"))}const n=e.target.closest(".btn-close-pet");if(n){const c=n.getAttribute("data-target"),d=document.getElementById(c),m=d.previousElementSibling;d.style.display="none",m.classList.remove("dropdown-open")}const r=e.target.closest(".btn-adopt");if(r){const c=r.getAttribute("data-petid"),d=r.getAttribute("data-petname");v.innerHTML=Ue(c,d)}e.target.closest("#btnBackToPets")&&(v.innerHTML=le()),e.target.closest(".btn-edit-profile")&&(document.getElementById("editProfileModal").style.display="flex");const s=e.target.closest(".btn-archive-pet");if(s){const c=s.getAttribute("data-petid");ne("Move to Bin?","Are you sure you want to move this pet to the Recycle Bin?",async()=>{const d=y.find(m=>m.id===c);if(!d){b("Error","Pet record not found.",!0);return}try{const m=await L.createDocument(k,Pe,X.unique(),{name:d.name,breed:d.breed,gender:d.gender,owner:T,img:d.img||""});await L.deleteDocument(k,J,c),y=y.filter(I=>I.id!==c),N.unshift({...m,id:m.$id}),await A("Moved a pet to the Recycle Bin",d.name,"fa-trash-can"),b("Moved to Bin","Pet successfully moved to Recycle Bin.",!1,()=>{pe()})}catch(m){console.error("Appwrite Move to Bin Error:",m),b("Error",m.message,!0)}})}e.target.closest("#btnViewBin")&&(v.innerHTML=$e()),e.target.closest("#btnEmptyBin")&&ne("Empty Bin?","WARNING: Are you sure you want to permanently delete ALL pets in the Recycle Bin? This cannot be undone!",async()=>{try{for(const c of N)await L.deleteDocument(k,Pe,c.id);N=[],await A("Permanently emptied the Recycle Bin","","fa-dumpster-fire"),b("Bin Emptied","Recycle bin emptied successfully.",!1,()=>{v.innerHTML=$e()})}catch(c){console.error("Appwrite Empty Bin Error:",c),b("Error",c.message,!0)}}),e.target.closest("#btnBackToProfile")&&(v.innerHTML=Ve,he());const i=e.target.closest(".btn-restore-pet");if(i){const c=i.getAttribute("data-petid"),d=N.find(m=>m.id===c);if(d)try{const m=await L.createDocument(k,J,X.unique(),{name:d.name,breed:d.breed,gender:d.gender,age:"1 yr",status:"Available",health_status:"Healthy",owner:T,contact_number:ie||"0917-000-0000",personal_traits:"Friendly",reason_for_adoption:"Restored from Recycle Bin",img:d.img||""});await L.deleteDocument(k,Pe,c),N=N.filter(I=>I.id!==c),y.unshift({...m,id:m.$id}),await A("Restored a pet from the Recycle Bin",d.name,"fa-rotate-left"),b("Restored!","Pet has been restored to the active board!",!1,()=>{v.innerHTML=$e()})}catch(m){console.error("Appwrite Restore Error:",m),b("Error",m.message,!0)}}const o=e.target.closest(".btn-cancel-app");if(o){const c=o.getAttribute("data-appid");ne("Cancel Application?","Are you sure you want to cancel this application?",async()=>{try{await L.deleteDocument(k,ee,c),x=x.filter(d=>d.id!==c),await A("Cancelled adoption application","","fa-file-circle-xmark"),b("Cancelled","Application successfully cancelled.",!1,()=>{v.innerHTML=de()})}catch(d){console.error("Appwrite Cancel App Error:",d),b("Error",d.message,!0)}})}const l=e.target.closest(".btn-cancel-vet");if(l){const c=l.getAttribute("data-appid");ne("Cancel Appointment?","Are you sure you want to cancel this veterinary appointment?",async()=>{try{await L.deleteDocument(k,_e,c),M=M.filter(d=>d.id!==c),await A("Cancelled veterinary appointment","","fa-calendar-xmark"),b("Cancelled","Appointment successfully cancelled.",!1,()=>{v.innerHTML=Ae(),Z()})}catch(d){console.error("Appwrite Cancel Vet Error:",d),b("Error",d.message,!0)}})}const u=e.target.closest(".pet-select-card");if(u&&document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".pet-select-card").forEach(m=>m.classList.remove("selected")),u.classList.add("selected");const c=u.getAttribute("data-pet");document.getElementById("apptPetSelectorHidden").value=c;const d=myPetsDB[c];d&&(document.getElementById("apptOwner").value=d.owner,document.getElementById("apptPetType").value=d.type,document.getElementById("apptBreed").value=d.breed,document.getElementById("apptGender").value=d.gender,document.getElementById("apptWeight").value=d.weight)}if(e.target.closest("#btnPrevVet")&&(V=(V-1+oe.length)%oe.length,Z()),e.target.closest("#btnNextVet")&&(V=(V+1)%oe.length,Z()),e.target.closest("#btnSelectVet")){const c=oe[V];document.getElementById("apptVetIdHidden").value=V,document.getElementById("apptSelectedVetName").value=c.name,Z()}if(e.target.classList.contains("btn-add-cart")){U.push({name:e.target.getAttribute("data-name"),price:e.target.getAttribute("data-price"),img:e.target.getAttribute("data-img")}),me();const c=e.target.innerText;e.target.innerText="✓ Added",e.target.style.background="#10b981",e.target.style.color="white",e.target.style.borderColor="#10b981",setTimeout(()=>{e.target.innerText=c,e.target.style.background="white",e.target.style.color="#4f46e5",e.target.style.borderColor="#4f46e5"},1e3)}if(e.target.classList.contains("btn-buy-now")){const d=e.target.closest(".shop-card").querySelector(".btn-add-cart");U.push({name:d.getAttribute("data-name"),price:d.getAttribute("data-price"),img:d.getAttribute("data-img")}),me(),document.getElementById("cartModalOverlay").style.display="flex"}e.target.closest("#btnOpenCart")&&(document.getElementById("cartModalOverlay").style.display="flex"),e.target.closest(".mode-btn")&&(document.querySelectorAll(".mode-btn").forEach(c=>c.classList.remove("active")),e.target.closest(".mode-btn").classList.add("active"),_&&document.querySelector(`[data-pet="${_}"]`).click());const p=e.target.closest(".pet-select-card");if(p&&document.getElementById("vetBookingForm")){document.querySelectorAll(".pet-select-card").forEach(m=>m.classList.remove("selected")),p.classList.add("selected");const c=p.getAttribute("data-petid");document.getElementById("apptPetSelectorHidden").value=c;const d=y.find(m=>m.id.toString()===c);d&&(document.getElementById("apptOwner").value=T,document.getElementById("apptPetType").value=d.breed&&d.breed.toLowerCase().includes("cat")?"Cat":"Dog",document.getElementById("apptBreed").value=d.breed||"Unknown",document.getElementById("apptGender").value=d.gender||"Unknown")}const g=e.target.closest(".my-pet-card");if(g&&!document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".my-pet-card").forEach(d=>d.classList.remove("active")),g.classList.add("active"),_=g.getAttribute("data-petid"),y.find(d=>d.id.toString()===_),document.getElementById("datingContentLayout").style.display="none";const c=document.getElementById("instructionOverlay");c.style.display="flex",c.innerHTML='<div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div><p>Scanning database for verified matches...</p>',Promise.resolve().then(()=>({status:"success",candidates:y.filter(m=>m.owner!==T).map(m=>({id:m.id,name:m.name,breed:m.breed,gender:m.gender,age:m.age,photos:[m.img],imgs:[m.img],owner:m.owner||"PawUser",ownerName:m.owner||"PawUser",score:94,traits:m.personal_traits?m.personal_traits.split(",").map(I=>I.trim()):["Playful","Friendly"],desc:m.reason_for_adoption||"Looking for a friend!",verified:!0}))})).then(d=>{d.status==="success"&&d.candidates.length>0?(te=d.candidates,W=0,setTimeout(()=>{Me()},800)):c.innerHTML='<p style="color:#64748b; font-weight:bold; font-size:1.1rem;">No match candidates available right now. Invite friends or register more pets!</p>'})}const f=e.target.closest(".cand-thumb");if(f){const c=te[W];Ge(c,f.getAttribute("data-index"))}const h=e.target.closest("#btnPassCandidate"),E=e.target.closest("#btnMatchCandidate"),B=e.target.closest("#btnTreatCandidate");if(h||E||B){const c=te[W],d=y.find(I=>I.id.toString()===_);let m="pass";if(E&&(m="like"),B&&(m="super_like"),m==="super_like"&&Le<=0){b("Out of Treats","You have used all your Super Treats for today! Come back tomorrow.",!0);return}Promise.resolve({status:"success",isMatch:!0}).then(I=>{if(I.status==="success"){if(m==="super_like"&&Le--,ae.unshift(c),ae.length>5&&ae.pop(),m!=="pass"){A(m==="super_like"?"Sent a Super Treat to":"Sent a match request to",c.name,"fa-heart"),document.getElementById("matchImgLeft").src=d.img,document.getElementById("matchImgRight").src=c.imgs[0],document.getElementById("matchNameLeft").innerText=d.name,document.getElementById("matchNameRight").innerText=c.name;const H=I.isMatch?"✨ IT'S A MATCH! ✨":m==="super_like"?"Super Liked! 🦴 (Pending)":"Pending Owner Approval";document.getElementById("matchDateSpot").innerText="PawTrack Verified";const P=document.getElementById("matchIcebreaker");P.value=I.isMatch?"You matched! Let's plan a playdate!":"",P.placeholder=I.isMatch?"Type a message...":`Say hi to ${c.ownerName} while you wait...`,document.getElementById("btnContinueMatch").setAttribute("data-targetuser",c.ownerName),document.getElementById("matchOverlay").style.display="flex",activePairs.unshift({id:"p"+Date.now(),maleName:d.gender==="Male"?d.name:c.name,femaleName:d.gender==="Female"?d.name:c.name,maleImg:d.gender==="Male"?d.img:c.imgs[0],femaleImg:d.gender==="Female"?d.img:c.imgs[0],status:H,isApproved:I.isMatch,date:"Just Now",ownerUsername:c.ownerName})}W++,Me()}else b("Error",I.message,!0)}).catch(I=>console.error("Swipe Error:",I))}e.target.closest("#btnOpenPrefs")&&(document.getElementById("prefModal").style.display="flex"),e.target.closest("#btnViewActivePairs")&&ye(),e.target.closest("#btnBackToMatch")&&(v.innerHTML=ve(),_=null);const w=e.target.closest(".btn-accept-match"),C=e.target.closest(".btn-delete-pair");if(w||C){const c=w?"accept":"delete",d=(w||C).getAttribute("data-matchid");if(c==="delete"){const m=C.getAttribute("data-title")||"Cancel Request",I=C.getAttribute("data-msg")||"Are you sure you want to remove this match?";ne(m,I,()=>{fe=fe.filter(H=>H.id!==d),ye()})}else{const m=fe.find(I=>I.id===d);m&&(m.status="approved"),ye()}}}),document.getElementById("btnCloseCart").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnContinueShopping").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnCheckout").addEventListener("click",()=>{if(U.length===0){b("Empty Cart","Your cart is empty! Please add some items first.",!0);return}A("Completed a Pet Shop checkout","","fa-bag-shopping"),U=[],me(),document.getElementById("cartModalOverlay").style.display="none",b("Order Placed!","Order placed successfully! Thank you for shopping.",!1)}),document.getElementById("cartItemsContainer").addEventListener("click",e=>{const a=e.target.closest(".btn-remove-item");a&&(U.splice(parseInt(a.getAttribute("data-index")),1),me())}),document.getElementById("btnContinueMatch").addEventListener("click",e=>{const a=e.target.getAttribute("data-targetuser"),t=document.getElementById("matchIcebreaker").value.trim();t&&a&&($[a]||($[a]=[]),$[a].push({text:t,type:"sent",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),A("Sent an Icebreaker message to",a,"fa-comment-dots")),document.getElementById("matchOverlay").style.display="none",ye()}),document.getElementById("btnSavePrefs").addEventListener("click",()=>{document.getElementById("prefModal").style.display="none",_&&document.querySelector(`[data-pet="${_}"]`).click()}),document.getElementById("prefModal").addEventListener("click",e=>{e.target===document.getElementById("prefModal")&&(document.getElementById("prefModal").style.display="none")}),v.addEventListener("submit",e=>{if(e.target.id==="vetBookingForm"){e.preventDefault();const a=document.getElementById("apptPetSelectorHidden").value,t=document.getElementById("apptVetIdHidden").value;if(!a){b("Error","Please select a pet for the appointment by clicking their picture!",!0);return}if(!t){b("Error","Please choose a veterinarian by clicking 'Confirm' on the profile card!",!0);return}const n=document.querySelector(`.pet-select-card[data-petid="${a}"] span`).innerText,r=document.getElementById("apptSelectedVetName").value,s=y.find(i=>{var o;return((o=i.id)==null?void 0:o.toString())===(a==null?void 0:a.toString())});(async()=>{try{const i=await L.createDocument(k,_e,X.unique(),{pet_name:n,vet_name:r,status:"Upcoming",time:document.getElementById("apptTime").value||"",date:document.getElementById("apptDate").value||"",user_id:R,img:(s==null?void 0:s.img)||""});M.unshift({...i,id:i.$id}),await A("Booked vet visit for",n,"fa-user-doctor"),b("Request Sent!","Appointment scheduled successfully! It is now Upcoming.",!1,()=>{const o=document.querySelector('[data-target="vet"]');o?o.click():(v.innerHTML=Ae(),Z())})}catch(i){console.error("Appwrite Vet Booking Error:",i),b("Error",i.message,!0)}})()}if(e.target.id==="adoptionApplicationForm"){if(e.preventDefault(),!document.getElementById("adoptTerms").checked){b("Missing Requirement","You must agree to the terms and conditions.",!0);return}const a=document.getElementById("adoptPetId").value,t=document.getElementById("adoptPetName").value,n=y.find(r=>{var s;return((s=r.id)==null?void 0:s.toString())===(a==null?void 0:a.toString())});(async()=>{try{const r=await L.createDocument(k,ee,X.unique(),{pet_name:t,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status:"Pending Review",user_id:R,img:(n==null?void 0:n.img)||""});x.unshift({...r,id:r.$id}),await A("Applied to adopt",t,"fa-house-chimney-user"),b("Application Sent!","Successfully submitted! Status: PENDING REVIEW.",!1,()=>{const s=document.querySelector('[data-target="applications"]');s?s.click():v.innerHTML=de()})}catch(r){console.error("Appwrite Adoption Application Error:",r),b("Error",r.message,!0)}})()}(e.target.id==="petRegistrationForm"||e.target.id==="registerPetForm")&&(e.preventDefault(),(async()=>{var l,u,p,g,f;const a=document.getElementById("petImageInput"),t=ze||a&&a.files&&a.files[0];let n="";if(t)try{b("Uploading Photo","Saving pet photo to PawTrack Storage...",!1);const h=await Te.createFile(ke,X.unique(),t);n=Te.getFileView(ke,h.$id).toString()}catch(h){console.error("Storage upload failed:",h)}n||(n="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80");const r=document.getElementById("regForAdoption"),s=r?r.checked:!0,i=new FormData(e.target),o={name:i.get("name")||((l=document.getElementById("regPetName"))==null?void 0:l.value)||"Unnamed Pet",breed:i.get("breed")||((u=document.getElementById("regBreed"))==null?void 0:u.value)||"Mixed Breed",gender:i.get("gender")||((p=document.getElementById("regGender"))==null?void 0:p.value)||"Male",age:i.get("age")||((g=document.getElementById("regAge"))==null?void 0:g.value)||"1 yr",status:s?"Available":"Private",health_status:i.get("health_status")||"Healthy / Vaccinated",owner:T,contact_number:i.get("contact_number")||ie||"0917-000-0000",personal_traits:i.get("personal_traits")||((f=document.getElementById("regDesc"))==null?void 0:f.value)||"Friendly",reason_for_adoption:i.get("reason_for_adoption")||(s?"Looking for a home":"Personal pet"),img:n};try{const h=await L.createDocument(k,J,X.unique(),o),E={...h,id:h.$id};y.unshift(E),await A(s?"Listed pet for adoption":"Registered private pet",o.name,"fa-shield-cat"),b("Success!",s?"Pet Registered Successfully! Photo saved to PawTrack Storage and listed on the adoption board.":"Pet added to your personal roster! Photo saved to PawTrack Storage.",!1,()=>{if(s){const w=document.querySelector('[data-target="pets"]');w?w.click():v.innerHTML=le()}else{const w=document.querySelector('[data-target="home"]');w?w.click():ce()}})}catch(h){console.error("Appwrite Pet Registration Error:",h),b("Error","Could not register pet: "+h.message,!0)}})())}),v.addEventListener("reset",e=>{e.target.id==="vetBookingForm"&&(document.querySelectorAll(".pet-select-card").forEach(a=>a.classList.remove("selected")),document.getElementById("apptPetSelectorHidden")&&(document.getElementById("apptPetSelectorHidden").value=""),document.getElementById("apptVetIdHidden")&&(document.getElementById("apptVetIdHidden").value=""),setTimeout(()=>{Z()},10))});const Ye=document.getElementById("editProfileForm");Ye&&Ye.addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("editFirstName").value,t=document.getElementById("editLastName").value,n=document.getElementById("editContact").value,r=`${a} ${t}`.trim();try{await ge.updatePrefs({...S,fullName:r,phone:n}),S.fullName=r,S.phone=n,ie=n;const s=document.getElementById("userNameDisplay");if(s){const i=S.username||r;s.innerText=i?"Welcome, "+i+"!":"Welcome!"}await A("Updated profile settings & information","","fa-user-pen"),document.getElementById("editProfileModal").style.display="none",b("Profile Saved","Profile updated successfully!",!1,()=>{he()})}catch(s){b("Error",s.message,!0)}}),v.addEventListener("input",e=>{e.target.id==="shopPriceFilter"&&(document.getElementById("shopPriceDisplay").innerText=`₱${e.target.value}`,Xe())}),v.addEventListener("change",e=>{e.target.id==="shopCategoryFilter"&&Xe()});function Xe(){const e=document.getElementById("shopCategoryFilter").value,a=parseFloat(document.getElementById("shopPriceFilter").value),t=We.filter(n=>{const r=e==="All Categories"||n.category===e,s=n.price<=a;return r&&s});document.getElementById("shopGridContainer").innerHTML=je(t)}async function he(){const e=document.getElementById("mainProfilePic");e&&(e.src=S.avatarUrl||"/resources/avatar/Avatar 1.jpg");const a=document.getElementById("btnChangeAvatar")||document.querySelector(".btn-change-photo"),t=document.getElementById("avatarFileInput");a&&t&&(a.onclick=()=>t.click(),t.onchange=async function(){if(this.files&&this.files[0])try{b("Uploading","Uploading avatar to PawTrack Storage...",!1);const P=await Te.createFile(ke,X.unique(),this.files[0]),z=Te.getFileView(ke,P.$id).toString();await ge.updatePrefs({...S,avatarUrl:z}),S.avatarUrl=z,e&&(e.src=z),await A("Updated profile picture","Saved to PawTrack Storage","fa-camera"),b("Success","Profile photo uploaded to PawTrack Storage!")}catch(P){b("Error","Failed to upload photo: "+P.message,!0)}});const n=document.getElementById("profileFullName"),r=document.getElementById("profileUsername"),s=document.getElementById("profileEmail"),i=document.getElementById("profilePhone"),o=S.fullName||T,l=S.username||T;n&&(n.innerText=o),r&&(r.innerText="@"+l),s&&(s.innerText=qe),i&&(i.innerText=ie||"None");const[u="",...p]=(o||"").split(" "),g=p.join(" "),f=document.getElementById("editFirstName"),h=document.getElementById("editLastName"),E=document.getElementById("editContact"),B=document.getElementById("editEmail");f&&(f.value=u),h&&(h.value=g),E&&(E.value=ie||""),B&&(B.value=qe||"");const w=y.filter(P=>P.owner===T),C=x.filter(P=>P.status==="Approved").length,c=document.getElementById("countOwnedPets"),d=document.getElementById("countSuccessfulApps");c&&(c.innerText=w.length),d&&(d.innerText=C);const m=document.getElementById("privateRosterGrid"),I=document.getElementById("adoptionRosterGrid");m&&I&&(m.innerHTML="",I.innerHTML="",w.forEach(P=>{const z=`
                    <div class="roster-card">
                        <img src="${P.img}" class="roster-img">
                        <div class="roster-info"><h4>${P.name}</h4><p>${P.breed}</p></div>
                        <button class="btn-archive-pet" data-petid="${P.id}" title="Move to Bin" 
                            style="background: white; border: 2px solid #ef4444; color: #ef4444; padding: 6px 15px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s;" 
                            onmouseover="this.style.background='#ef4444'; this.style.color='white';" 
                            onmouseout="this.style.background='white'; this.style.color='#ef4444';">
                            <i class="fa-solid fa-trash-can"></i> Bin
                        </button>
                    </div>
                `;P.status==="Private"?m.innerHTML+=z:I.innerHTML+=z}));const H=document.getElementById("recentActivityLogs");if(H){H.innerHTML='<div class="activity-loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading activity logs...</div>';try{const P=await L.listDocuments(k,mt,[Q.equal("user_id",R),Q.orderDesc("$createdAt"),Q.limit(20)]);H.innerHTML="";const z=P.documents;z.length>0?z.forEach(K=>{const Ct=parseInt(K.timestamp)||new Date(K.$createdAt).getTime(),$t=It(Ct),Ie=Bt(K.action,K.icon),pt=K.target?D(K.target):"",At=D(K.action||"Activity recorded");H.innerHTML+=`
                            <div class="activity-item">
                                <div class="activity-icon-bubble ${Ie.themeClass}">
                                    <i class="fa-solid ${Ie.icon}"></i>
                                </div>
                                <div class="activity-details">
                                    <div class="activity-row-main">
                                        <span class="activity-action-text">${At}</span>
                                        <span class="activity-category-pill ${Ie.tagClass}">${Ie.tagLabel}</span>
                                    </div>
                                    ${pt?`
                                        <div class="activity-target-pill">
                                            <i class="fa-solid fa-quote-left"></i>
                                            <span>${pt}</span>
                                        </div>
                                    `:""}
                                    <div class="activity-meta">
                                        <span class="activity-timestamp"><i class="fa-regular fa-clock"></i> ${$t}</span>
                                        <span class="activity-verified-tag"><i class="fa-solid fa-circle-check"></i> Recorded</span>
                                    </div>
                                </div>
                            </div>
                        `}):H.innerHTML=`
                        <div class="activity-empty-state">
                            <div class="empty-icon-circle"><i class="fa-solid fa-shield-halved"></i></div>
                            <h4>Security & Account Verified</h4>
                            <p>Your session is active. Actions like pet registrations, adoptions, and profile updates will appear here in real time.</p>
                        </div>
                    `}catch(P){console.warn("Could not load activity logs:",P),H.innerHTML=`
                    <div class="activity-empty-state">
                        <div class="empty-icon-circle"><i class="fa-solid fa-circle-info"></i></div>
                        <h4>No Activity Recorded</h4>
                        <p>No past logs found for your account yet.</p>
                    </div>
                `}}}function D(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function Bt(e,a){const t=(e||"").toLowerCase();if(t.includes("log")||t.includes("auth")||t.includes("verified")||t.includes("session"))return{themeClass:"theme-emerald",icon:"fa-shield-halved",tagClass:"tag-emerald",tagLabel:"Security"};if(t.includes("bin")||t.includes("delet")||t.includes("dumpster")||t.includes("trash"))return{themeClass:"theme-rose",icon:"fa-trash-can",tagClass:"tag-rose",tagLabel:"Archive"};if(t.includes("pet")||t.includes("adopt")||t.includes("restor")||t.includes("breed"))return{themeClass:"theme-terracotta",icon:"fa-paw",tagClass:"tag-terracotta",tagLabel:"Pet Care"};if(t.includes("photo")||t.includes("avatar")||t.includes("profile")||t.includes("settings"))return{themeClass:"theme-honey",icon:"fa-user-pen",tagClass:"tag-honey",tagLabel:"Profile"};if(t.includes("shop")||t.includes("cart")||t.includes("item")||t.includes("buy"))return{themeClass:"theme-amber",icon:"fa-bag-shopping",tagClass:"tag-amber",tagLabel:"Shop"};let n=a||"fa-bell";return n==="fa-right-to-bracket"&&(n="fa-arrow-right-to-bracket"),{themeClass:"theme-sage",icon:n,tagClass:"tag-sage",tagLabel:"Activity"}}function It(e){const a=Date.now(),t=Math.max(0,a-e),n=60*1e3,r=60*n,s=24*r,i=new Date(e),o=i.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return t<2*n?"Just now":t<60*n?`${Math.floor(t/n)}m ago`:t<24*r?`${Math.floor(t/r)}h ago (${o})`:new Date(a-s).toDateString()===i.toDateString()?`Yesterday at ${o}`:i.toLocaleDateString(void 0,{month:"short",day:"numeric"})+` at ${o}`}const Je=document.getElementById("btnLogout");Je&&Je.addEventListener("click",async()=>{try{await ge.deleteSession("current")}catch(e){console.warn(e)}window.location.href="/PawTrackLogin.html"});let Y=null;Object.keys($).length===0&&($.PawTrackCommunity=[{text:"Welcome to PawTrack! Connect with pet lovers, adopters, and arrange playdates right here.",type:"received",time:"10:00 AM"}]);function Ze(){return`
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
        `}function Ke(e=null){const a=document.getElementById("messengerInboxList"),t=document.getElementById("messengerChatPanel"),n=document.getElementById("btnPageNewChat"),r=document.getElementById("messengerSearchInput");if(!a||!t)return;function s(p=""){a.innerHTML="";const g=Object.keys($).filter(f=>f.toLowerCase().includes(p.toLowerCase()));if(g.length===0){a.innerHTML=`
                    <div class="inbox-empty-state">
                        <i class="fa-solid fa-comments"></i>
                        <p>No conversations found.<br>Click "New Conversation" to start chatting!</p>
                    </div>
                `;return}g.forEach(f=>{const h=$[f]||[],E=h.length>0?h[h.length-1].text:"No messages yet",B=h.length>0?h[h.length-1].time:"",w=f===Y?"active":"",C=document.createElement("div");C.className=`inbox-item ${w}`,C.setAttribute("data-user",f),C.innerHTML=`
                    <div class="inbox-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="inbox-info">
                        <div class="inbox-info-header">
                            <h4>@${D(f)}</h4>
                            <span class="inbox-time">${B}</span>
                        </div>
                        <p class="inbox-snippet">${D(E)}</p>
                    </div>
                `,C.onclick=()=>i(f),a.appendChild(C)})}function i(p){Y=p,document.querySelectorAll(".inbox-item").forEach(w=>{w.classList.toggle("active",w.getAttribute("data-user")===p)});const g=$[p]||[];t.innerHTML=`
                <div class="chat-pane-header">
                    <div class="chat-header-user">
                        <div class="chat-header-avatar"><i class="fa-solid fa-user"></i></div>
                        <div>
                            <h3>@${D(p)}</h3>
                            <span class="chat-online-status"><span class="status-dot-green"></span> Active Conversation</span>
                        </div>
                    </div>
                </div>

                <div class="chat-pane-messages" id="activeChatStream">
                    ${g.length===0?'<div class="empty-stream"><p>This is the start of your message history with @'+D(p)+"</p></div>":""}
                </div>

                <div class="chat-pane-input-bar">
                    <div class="chat-input-pill">
                        <input type="text" id="activeChatInput" placeholder="Write a message to @${D(p)}...">
                    </div>
                    <button class="btn-chat-send" id="btnActiveSend">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            `;const f=document.getElementById("activeChatStream");g.forEach(w=>{o(f,w.text,w.type,w.time)}),f.scrollTop=f.scrollHeight;const h=document.getElementById("activeChatInput"),E=document.getElementById("btnActiveSend");function B(){const w=h.value.trim();if(!w||!Y)return;const C=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});o(f,w,"sent",C),h.value="",f.scrollTop=f.scrollHeight,$[Y]||($[Y]=[]),$[Y].push({text:w,type:"sent",time:C}),s(r.value.trim()),Y==="PawTrackCommunity"&&setTimeout(()=>{const c=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),d="We're glad to have you! Feel free to connect with pet owners across PawTrack.";$.PawTrackCommunity.push({text:d,type:"received",time:c}),Y==="PawTrackCommunity"&&(o(f,d,"received",c),f.scrollTop=f.scrollHeight),s(r.value.trim())},1e3)}E.onclick=B,h.onkeypress=w=>{w.key==="Enter"&&B()},h.focus()}function o(p,g,f,h){const E=document.createElement("div");E.className=`stream-bubble bubble-${f}`,E.innerHTML=`
                <div class="bubble-text">${D(g)}</div>
                <div class="bubble-time">${h}</div>
            `,p.appendChild(E)}r.oninput=p=>{s(p.target.value.trim())},n.onclick=()=>{ut("Start Conversation","Enter the PawTrack username you'd like to message:",p=>{if(p&&p.trim()){const g=p.trim().replace("@","");$[g]||($[g]=[]),s(),i(g)}})};const l=Object.keys($),u=e||(l.length>0?l[0]:null);s(),u?i(u):t.innerHTML=`
                <div class="empty-conversation-state">
                    <div class="empty-icon-circle"><i class="fa-solid fa-comments"></i></div>
                    <h3>Your Messages</h3>
                    <p>Select a conversation from the left or click "New Conversation" to start chatting.</p>
                </div>
            `}v.addEventListener("click",e=>{const a=e.target.closest(".btn-message-owner");if(a){const t=a.getAttribute("data-owner"),n=document.querySelector('.sidebar-nav .nav-btn[data-target="messages"]');n&&(j.forEach(r=>r.classList.remove("active")),n.classList.add("active")),v.scrollTo({top:0,behavior:"smooth"}),v.innerHTML=Ze(),Ke(t)}}),v.addEventListener("input",e=>{if(e.target.id==="radarDistanceRange"){const a=document.getElementById("radarDistanceValue");a&&(a.innerText=`${e.target.value} km`)}}),v.addEventListener("click",async e=>{var a,t,n,r,s;if(e.target.closest("#btnSaveAllSettings")){const i=((a=document.getElementById("notifVet"))==null?void 0:a.checked)??!0,o=((t=document.getElementById("notifMatch"))==null?void 0:t.checked)??!0,l=((n=document.getElementById("notifAdoption"))==null?void 0:n.checked)??!0,u=((r=document.getElementById("prefIncognito"))==null?void 0:r.checked)??!1,p=((s=document.getElementById("radarDistanceRange"))==null?void 0:s.value)||"25";try{await ge.updatePrefs({...S,notifVet:i,notifMatch:o,notifAdoption:l,incognito:u,radarDistance:p}),S.radarDistance=p,S.incognito=u,await A("Updated notification & discovery preferences","","fa-sliders"),b("Settings Saved","Your notification, privacy, and discovery preferences have been updated successfully!")}catch(g){b("Error",g.message,!0)}}});const F=[{title:"Your Care Dashboard 🏠",desc:"Welcome to PawTrack! From your Home dashboard, track registered pet counts, see active adoption statuses, review upcoming vet reminders, and get daily outdoor walk weather tips.",icon:"fa-house",targetSelector:".sidebar-nav [data-target='home']",tab:"home",placement:"right"},{title:"Live Adoption Board 🐾",desc:"Browse companions looking for a loving home! When other users register a pet for adoption, it shows up here in real-time without reloading. Click 'Details' to view medical notes, or 'Adopt Now' to send a digital application.",icon:"fa-paw",targetSelector:".sidebar-nav [data-target='pets']",tab:"pets",placement:"right"},{title:"Register Your Own Pet 📸",desc:"Add your furry family member with photo uploads to PawTrack Cloud Storage. Choose whether your companion is a private pet for health tracking or listed publicly for adoption.",icon:"fa-plus-circle",targetSelector:"#btnRegisterPet",tab:null,placement:"bottom"},{title:"Pet Matchmaker & Playdates ❤️",desc:"Find compatible playmates or breeding matches based on breed, age, and location. Give a Treat to express interest, or pass to browse more verified neighborhood companions.",icon:"fa-heart",targetSelector:".sidebar-nav [data-target='breeding']",tab:"breeding",placement:"right"},{title:"Verified Vet Appointments 🩺",desc:"Book check-ups and medical visits with licensed veterinarians. Select your preferred clinic and time slot, and manage upcoming appointments in one place.",icon:"fa-user-doctor",targetSelector:".sidebar-nav [data-target='vet']",tab:"vet",placement:"right"},{title:"Real-Time Messages & Alerts 💬",desc:"Chat directly with pet owners, caregivers, and adopters. Real-time notification toasts keep you updated the moment an application is approved or a new pet is posted!",icon:"fa-comment-dots",targetSelector:"#navMessagesBtn",tab:"messages",placement:"right"}];let q=0,be=!1,ue=null;function De(e){ue&&ue!==e&&ue.classList.remove("tour-target-elevated"),e?(e.classList.add("tour-target-elevated"),ue=e):ue=null}function we(e){const a=document.getElementById("pawtrackTourOverlay"),t=document.getElementById("tourSpotlightBox"),n=document.getElementById("tourCard");if(!a||!t||!n)return;let r=e.targetSelector?document.querySelector(e.targetSelector):null;if(!r||r.offsetParent===null){t.style.display="none",a.classList.add("no-target"),De(null),n.style.top="50%",n.style.left="50%",n.style.transform="translate(-50%, -50%)";return}a.classList.remove("no-target"),De(r),t.style.display="block";const s=r.getBoundingClientRect(),i=6,o=Math.max(0,s.top-i),l=Math.max(0,s.left-i),u=s.width+i*2,p=s.height+i*2;t.style.top=`${o}px`,t.style.left=`${l}px`,t.style.width=`${u}px`,t.style.height=`${p}px`;try{const w=window.getComputedStyle(r),C=parseFloat(w.borderRadius)||12;t.style.borderRadius=`${Math.max(10,C+4)}px`}catch{t.style.borderRadius="14px"}if(window.innerWidth<=768){n.style.top="",n.style.left="",n.style.transform="";return}n.style.transform="none";const g=390,f=n.offsetHeight||220,h=16;let E,B;e.placement==="right"?(B=s.right+h,E=Math.max(20,s.top+s.height/2-f/2),B+g>window.innerWidth-20&&(B=Math.max(20,s.left-g-h))):e.placement==="bottom"?(E=s.bottom+h,B=s.left+s.width/2-g/2,B+g>window.innerWidth-20&&(B=window.innerWidth-g-24),B<20&&(B=20),E+f>window.innerHeight-20&&(E=Math.max(20,s.top-f-h))):(E=Math.max(20,window.innerHeight/2-f/2),B=Math.max(20,window.innerWidth/2-g/2)),E=Math.min(Math.max(20,E),window.innerHeight-f-20),B=Math.min(Math.max(20,B),window.innerWidth-g-20),n.style.top=`${E}px`,n.style.left=`${B}px`}function Fe(e){if(e<0||e>=F.length){xe();return}q=e;const a=F[e];if(a.tab){const u=document.querySelector(`.sidebar-nav [data-target="${a.tab}"]`);u&&!u.classList.contains("active")&&u.click()}const t=document.getElementById("tourStepBadge"),n=document.getElementById("tourStepTitle"),r=document.getElementById("tourStepDesc"),s=document.getElementById("tourIconBubble"),i=document.getElementById("tourDots"),o=document.getElementById("tourBtnPrev"),l=document.getElementById("tourBtnNext");t&&(t.innerText=`STEP ${e+1} OF ${F.length}`),n&&(n.innerText=a.title),r&&(r.innerText=a.desc),s&&(s.innerHTML=`<i class="fa-solid ${a.icon}"></i>`),i&&(i.innerHTML=F.map((u,p)=>`<div class="tour-dot ${p===e?"active":""}"></div>`).join("")),o&&(o.style.display=e>0?"inline-block":"none"),l&&(e===F.length-1?l.innerHTML='Finish Tour <i class="fa-solid fa-check"></i>':l.innerHTML='Next <i class="fa-solid fa-arrow-right"></i>'),setTimeout(()=>{we(a)},60),setTimeout(()=>{we(a)},220)}function He(e=0){const a=document.getElementById("tourWelcomeModal");a&&(a.style.display="none");const t=document.getElementById("howItWorksModal");t&&(t.style.display="none");const n=document.getElementById("pawtrackTourOverlay");n&&(n.style.display="block",be=!0,Fe(e))}function xe(e=!0){const a=document.getElementById("pawtrackTourOverlay");if(a&&(a.style.display="none"),be=!1,De(null),e)try{localStorage.setItem("pawtrack_tour_completed","true")}catch{}}function Tt(){q<F.length-1?Fe(q+1):(xe(!0),G("Tour Complete! 🌟","You're all set! Click 'Guide & Tour' anytime at the top of your screen to replay.","fa-circle-check",null,"app"))}function Pt(){q>0&&Fe(q-1)}function Ee(){const e=document.getElementById("howItWorksModal");e&&(e.style.display="none")}function kt(){try{localStorage.getItem("pawtrack_tour_completed")||setTimeout(()=>{const a=document.getElementById("tourWelcomeModal"),t=document.getElementById("welcomeTourHeading");t&&T&&(t.innerText=`Welcome, ${T}! 👋`),a&&(a.style.display="flex")},1400)}catch{}}const Qe=document.getElementById("btnStartTour");Qe&&Qe.addEventListener("click",()=>{He(0)});const et=document.getElementById("btnSidebarAiAssistant");et&&et.addEventListener("click",()=>{G("AI Assistant 🤖","This feature is still under development. Stay tuned for our AI-powered assistant!","fa-robot",null,"info")});const tt=document.getElementById("btnWelcomeTourStart");tt&&tt.addEventListener("click",()=>{He(0)});const at=document.getElementById("btnWelcomeTourSkip");at&&at.addEventListener("click",()=>{const e=document.getElementById("tourWelcomeModal");e&&(e.style.display="none");try{localStorage.setItem("pawtrack_tour_completed","true")}catch{}});const it=document.getElementById("tourBtnClose");it&&it.addEventListener("click",()=>xe(!0));const st=document.getElementById("tourBtnSkip");st&&st.addEventListener("click",()=>xe(!0));const nt=document.getElementById("tourBtnNext");nt&&nt.addEventListener("click",Tt);const ot=document.getElementById("tourBtnPrev");ot&&ot.addEventListener("click",Pt);const rt=document.getElementById("btnHiwClose");rt&&rt.addEventListener("click",Ee);const lt=document.getElementById("btnHiwDismiss");lt&&lt.addEventListener("click",Ee);const dt=document.getElementById("btnHiwStartInteractiveTour");dt&&dt.addEventListener("click",()=>{Ee(),He(0)});const Re=document.getElementById("howItWorksModal");Re&&Re.addEventListener("click",e=>{e.target===Re&&Ee()});const Be=document.getElementById("tourWelcomeModal");Be&&Be.addEventListener("click",e=>{e.target===Be&&(Be.style.display="none")}),document.querySelectorAll(".hiw-tab-btn").forEach(e=>{e.addEventListener("click",function(){document.querySelectorAll(".hiw-tab-btn").forEach(n=>n.classList.remove("active")),document.querySelectorAll(".hiw-tab-content").forEach(n=>n.classList.remove("active")),this.classList.add("active");const a=this.getAttribute("data-tab"),t=document.getElementById(a);t&&t.classList.add("active")})}),window.addEventListener("resize",()=>{be&&F[q]&&we(F[q])}),window.addEventListener("scroll",()=>{be&&F[q]&&we(F[q])},!0);function Lt(){const e=document.querySelector(".sidebar"),a=document.getElementById("sidebarTogglePill"),t=document.getElementById("btnHeaderSidebarToggle"),n=document.getElementById("sidebarLogoWrapper");if(!e)return;localStorage.getItem("pawtrack_sidebar_collapsed")==="true"&&window.innerWidth>768&&(e.classList.add("collapsed"),a&&(a.title="Maximize sidebar",a.setAttribute("aria-label","Maximize sidebar")),t&&(t.title="Maximize sidebar"));function s(i=null){if(window.innerWidth<=768)return;const o=i!==null?i:!e.classList.contains("collapsed");e.classList.toggle("collapsed",o);try{localStorage.setItem("pawtrack_sidebar_collapsed",o?"true":"false")}catch{}a&&(a.title=o?"Maximize sidebar":"Minimize sidebar",a.setAttribute("aria-label",o?"Maximize sidebar":"Minimize sidebar")),t&&(t.title=o?"Maximize sidebar":"Minimize sidebar"),setTimeout(()=>{window.dispatchEvent(new Event("resize"))},310)}a&&a.addEventListener("click",i=>{i.stopPropagation(),s()}),t&&t.addEventListener("click",i=>{i.stopPropagation(),s()}),n&&n.addEventListener("click",()=>{e.classList.contains("collapsed")&&s(!1)})}Lt(),kt()});
