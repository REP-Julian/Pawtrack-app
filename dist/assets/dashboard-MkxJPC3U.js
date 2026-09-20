import{a as Y,d as B,Q as W,I as O,s as re}from"./appwrite-BfOVdxfC.js";const I="pawtrack_db",le="pets",fe="applications",ye="vet_appointments",de="recycle_bin",De="activity_logs",ce="pawtrack_storage";let w="",pe="",V="",A={},X="",T=[],M=[],S=[],J=[],he=null,ie=[],P={};document.addEventListener("DOMContentLoaded",async()=>{var Se;try{const e=await Y.get();w=e.name,pe=e.email,V=e.$id,A=e.prefs||{},X=((Se=e.prefs)==null?void 0:Se.phone)||"";const a=document.getElementById("userNameDisplay");a&&(a.innerText=w?"Welcome, "+w+"!":"Welcome!");try{T=(await B.listDocuments(I,le)).documents.map(r=>({...r,id:r.$id})),M=(await B.listDocuments(I,fe,[W.equal("user_id",V)])).documents.map(r=>({...r,id:r.$id})),S=(await B.listDocuments(I,ye,[W.equal("user_id",V)])).documents.map(r=>({...r,id:r.$id})),J=(await B.listDocuments(I,de,[W.equal("owner",w)])).documents.map(r=>({...r,id:r.$id}))}catch(t){console.warn("Database collections not fully setup yet. Using empty arrays.",t)}}catch(e){console.error("User not logged in",e),window.location.href="/PawTrackLogin.html";return}async function C(e,a,t){try{await B.createDocument(I,De,O.unique(),{user_id:V,action:e||"Activity recorded",target:a||"",icon:t||"fa-paw",timestamp:Date.now().toString()})}catch(i){console.warn("Failed to persist activity log to Appwrite:",i)}}function be(){document.body.style.zoom="1",document.body.style.width="100%",document.body.style.height="100%",navigator.userAgent.toLowerCase().includes("firefox")&&(document.body.style.transform="none")}let Z;function f(e,a,t=!1,i=null){const o=document.getElementById("customPopupOverlay"),s=document.getElementById("customPopupTitle"),r=document.getElementById("customPopupMessage"),l=document.getElementById("customPopupActions");s.innerText=e,r.innerText=a,s.className=t?"custom-popup-title title-error":"custom-popup-title title-success",l.style.display="none",o.style.display="flex",clearTimeout(Z),Z=setTimeout(()=>{R(i)},5e3),document.getElementById("customPopupClose").onclick=()=>{clearTimeout(Z),R(i)}}function Re(e,a,t){const i=document.getElementById("customPopupOverlay"),o=document.getElementById("customPopupTitle"),s=document.getElementById("customPopupMessage"),r=document.getElementById("customPopupActions");o.innerText=e,o.className="custom-popup-title title-success",s.innerHTML=`<p style="margin-bottom:10px;">${a}</p><input type="text" id="customPromptInput" style="width:100%; padding:12px; border-radius:8px; border:2px solid #cbd5e1; outline:none; font-size:1rem; font-weight:600; color:#0f172a;" autocomplete="off">`,r.style.display="flex",i.style.display="flex",clearTimeout(Z),document.getElementById("btnPopupConfirm").innerText="Submit",document.getElementById("btnPopupConfirm").onclick=()=>{const l=document.getElementById("customPromptInput").value;R(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",l.trim()!==""&&t(l.trim())},document.getElementById("customPopupClose").onclick=()=>{R()},document.getElementById("btnPopupCancel").onclick=()=>{R(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure"}}function K(e,a,t){const i=document.getElementById("customPopupOverlay"),o=document.getElementById("customPopupTitle"),s=document.getElementById("customPopupMessage"),r=document.getElementById("customPopupActions");o.innerText=e,o.className="custom-popup-title title-error",s.innerHTML=`<p>${a}</p>`,r.style.display="flex",i.style.display="flex",clearTimeout(Z),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",document.getElementById("btnPopupConfirm").onclick=()=>{R(),t&&t()},document.getElementById("customPopupClose").onclick=()=>{R()},document.getElementById("btnPopupCancel").onclick=()=>{R()}}function R(e){document.getElementById("customPopupOverlay").style.display="none",e&&e()}window.addEventListener("resize",be),be();const Q=[{initials:"MD",name:"Dr. Miguel Antonio Dela Cruz",specialty:"General Veterinary Practitioner",phone:"0917-555-0101",email:"mdelacruz@pawtrack.ph",schedule:"Mon-Fri: 8am-4pm",clinic:"Quezon City Main Clinic",exp:"15 yrs exp",rating:"4.8"},{initials:"JS",name:"Dr. Joanna Marie R. Santos",specialty:"Veterinary Surgeon",phone:"0917-555-0102",email:"jmsantos@pawtrack.ph",schedule:"Tue-Sat: 10am-6pm",clinic:"Makati Pet Hospital",exp:"12 yrs exp",rating:"4.9"},{initials:"PV",name:"Dr. Paulo C. Villanueva",specialty:"Veterinary Oncologist",phone:"0917-555-0103",email:"pvillanueva@pawtrack.ph",schedule:"Mon-Thu: 9am-5pm",clinic:"BGC Animal Center",exp:"8 yrs exp",rating:"4.7"}];let H=0,N=[],U=[],_=0,F=null,j=[],me=3;const G=document.querySelectorAll(".sidebar-nav .nav-btn"),y=document.getElementById("mainDisplayPanel"),xe=document.getElementById("profileTemplate").innerHTML,ue=document.getElementById("cartItemsContainer"),He=document.getElementById("cartTotalDisplay"),ee=(e,a,t)=>`
        <div class="page-header">
            <div>
                <h2><i class="${t}"></i> ${e}</h2>
                <p>${a}</p>
            </div>
        </div>
    `;let se="";if(typeof T<"u"&&T.length>0){const e=T.filter(a=>a.status==="Available");e.length>0?e.forEach(a=>{const t=a.gender==="Female"?"gender-female":"gender-male",o=a.owner===w?`
                    <button class="btn-archive-pet" data-petid="${a.id}" title="Move to Bin" 
                        style="background: #fee2e2; color: #ef4444; border: 2px solid #fca5a5; border-radius: 10px; padding: 10px; cursor: pointer; transition: 0.3s;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `:"";se+=`
                    <div class="pet-item-wrapper">
                        <div class="pet-card ${t}">
                            <img src="${a.img}" alt="${a.name}" class="pet-card-img">
                            <div class="pet-card-body">
                                <h3 class="pet-name">${a.name}</h3>
                                <p class="pet-breed">${a.breed}</p>
                                <p class="pet-meta">${a.gender} • ${a.age}</p>
                                <span class="status-badge">● ${a.status}</span>
                                
                                <div class="pet-actions" style="display: flex; gap: 8px;">
                                    <button class="btn-view-pet" data-target="pet-details-${a.id}" title="View Details" style="flex: 1;">
                                        Details <i class="fa-solid fa-chevron-down"></i>
                                    </button>
                                    
                                    ${o}

                                    <button class="btn-adopt" data-petid="${a.id}" data-petname="${a.name}" style="flex: 1;">Adopt Now</button>
                                </div>
                            </div>
                        </div>
                        <div class="pet-details-dropdown ${t}" id="pet-details-${a.id}">
                            <div class="details-grid">
                                <div class="detail-box"><label>Health Status</label><p>${a.health_status}</p></div>
                                <div class="detail-box"><label>Contact / Owner</label><p>@${a.owner} <br><span style="font-size:0.85rem;">${a.contact_number}</span></p></div>
                            </div>
                            <div class="detail-box" style="margin-bottom: 15px;">
                                <label>Personality Traits</label><p>${a.personal_traits}</p>
                            </div>
                            <div class="detail-box" style="margin-bottom: 25px;">
                                <label>Background / Reason for Adoption</label><p>${a.reason_for_adoption}</p>
                            </div>
                            <div style="text-align: right;">
                                <button class="btn-close-pet" data-target="pet-details-${a.id}">Close Details</button>
                            </div>
                        </div>
                    </div>
                `}):se='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available for adoption.</p>'}else se='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available in the system.</p>';const we=`
        <div class="page-container">
            ${ee("Meet the Pets","Say hello to our furry friends currently waiting for a loving home.","fa-solid fa-paw")}
            <div class="pet-grid">
                ${se}
            </div>
        </div>
    `;function Ne(){let e="",a="";return typeof M<"u"&&M.length>0&&M.forEach(t=>{const i=t.status==="Approved",o=i?"var(--emerald-light, #D1FAE5)":"var(--amber-light, #FEF3C7)",s=i?"#065F46":"#92400E",l=`
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
                            <span style="background: ${o}; color: ${s}; padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
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
            `;i?a+=l:e+=l}),`
            <div class="page-container">
                ${ee("My Applications","Track the journey of your adoption requests and welcome your new companion home.","fa-solid fa-clipboard-list")}
                
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
        `}const _e=()=>{let e="";return typeof J<"u"&&J.length>0?J.forEach(a=>{const t=a.gender==="Female"?"gender-female":"gender-male";e+=`
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
        `},Ee=(e,a)=>`
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
    `;function qe(){let e="";typeof S<"u"&&S.length>0?S.forEach(s=>{const r=s.status==="Approved",l=r?"appt-approved":"appt-pending",m=r?"badge-approved":"badge-pending",h=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],p=s.date.split("-"),u=p.length===3?h[parseInt(p[1])-1]:"TBD",g=p.length===3?p[2]:"??";e+=`
                    <div class="appt-mini-card ${l}">
                        <div class="appt-date-box"><strong>${g}</strong><span>${u}</span></div>
                        <img src="${s.img}" alt="${s.pet_name}" class="appt-pet-avatar" style="object-fit: cover;">
                        <div class="appt-details">
                            <h4>${s.pet_name}'s Visit</h4>
                            <p>${s.vet_name}</p>
                            <span class="badge ${m}">${s.status} • ${s.time}</span>
                        </div>
                        
                        ${r?"":`
                            <div style="margin-left: auto;">
                                <button class="btn-cancel-vet" data-appid="${s.appt_id||s.id}" title="Cancel Appointment" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        `}
                    </div>
                `}):e='<p style="color: #64748b; margin-top: 10px; font-weight: 500;">No upcoming appointments.</p>';let a="";const t=T.filter(s=>s.owner===w);let i=[];typeof S<"u"&&(i=S.filter(s=>s.status!=="Cancelled"&&s.status!=="Completed").map(s=>s.pet_name));const o=t.filter(s=>!i.includes(s.name));return o.length>0?o.forEach(s=>{const r=s.gender&&s.gender.toLowerCase()==="female"?"gender-female":"gender-male";a+=`
                    <div class="pet-select-card ${r}" data-petid="${s.id}">
                        <img src="${s.img}" alt="${s.name}">
                        <span>${s.name}</span>
                    </div>
                `}):t.length>0?a='<p style="color: #f59e0b; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-clock" style="margin-right: 5px;"></i> All your pets currently have scheduled appointments. You can book another once current visits are completed or cancelled.</p>':a=`<p style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> You don't have any registered pets yet! Please register a pet first.</p>`,`
            <div class="page-container">
                ${ee("Veterinary Appointments","Schedule checkups, vaccinations, and consultations for your pets.","fa-solid fa-user-doctor")}
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
        `}const Be=[{id:1,brand:"NaturePet",name:"Nutricare Organic Dry Cat Food (1kg)",price:250,category:"Cat Food",img:"/resources/shop/catfood.jpg"},{id:2,brand:"PawSource",name:"100g Real Beef Dog Biscuit Treats",price:150,category:"Dog Food & Treats",img:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400"},{id:3,brand:"KONG",name:"Classic Durable Rubber Dog Toy",price:450,category:"Toys",img:"/resources/shop/dog_toy.jpg"},{id:4,brand:"Paws & Pals",name:"Heavy Duty Reflective Leash",price:299,category:"Accessories",img:"/resources/shop/leash.jpg"},{id:5,brand:"PetSafe",name:"Ceramic Anti-Slip Pet Bowl",price:180,category:"Accessories",img:"/resources/shop/bowl.jpg"},{id:6,brand:"CozyPet",name:"Fluffy Calming Pet Bed (Medium)",price:550,category:"Accessories",img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400"},{id:7,brand:"Whiskas",name:"Tuna Flavor Wet Cat Food (12 Pouch)",price:540,category:"Cat Food",img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"},{id:8,brand:"Pedigree",name:"Adult Beef & Veg Dry Dog Food (1.5kg)",price:380,category:"Dog Food & Treats",img:"/resources/shop/dogfood.jpg"},{id:9,brand:"FelineFun",name:"Interactive Feather Teaser Wand",price:95,category:"Toys",img:"https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400"},{id:10,brand:"GroomPro",name:"Silicone Pet Bath Massage Brush",price:110,category:"Grooming",img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400"}];function Ie(e){if(e.length===0)return'<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 50px; font-size: 1.2rem;">No items match your filters.</p>';let a="";return e.forEach(t=>{a+=`
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
            `}),a}function ze(){return`
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
                        ${Ie(Be)}
                    </div>
                </div>
            </div>
        `}const Oe=`
        <div class="registration-wrapper">
            ${ee("Register a Pet","Fill in the details below to add a new pet to the system.","fa-solid fa-shield-cat")}
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
    `;function Te(){const e=T.filter(t=>t.owner===w&&t.status==="Private");let a="";return e.length>0?e.forEach(t=>{const i=t.gender==="Female"?"gender-female":"gender-male",o=t.img||"https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b";a+=`
                    <div class="my-pet-card ${i}" data-petid="${t.id}">
                        <img src="${o}" alt="${t.name}">
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
        `}function ne(){y.innerHTML=`
            <div class="page-container">
                ${ee("Match Dashboard","Track pending requests and message approved matches.","fa-solid fa-mars-and-venus")}
                <div class="page-header" style="margin-top: -15px;">
                    <div></div>
                    <button class="btn-animated" id="btnBackToMatch" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Match Maker</button>
                </div>
                <div class="glass-panel" style="overflow-y: auto; flex:1;" id="matchDashboardContent">
                    <p style="text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">Loading matches...</p>
                </div>
            </div>
        `,Promise.resolve({status:"success",matches:ie}).then(e=>{if(e.status==="success"){let a='<div class="pairs-grid">';e.matches.length===0?a+='<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">You have no active matches or requests yet.</p>':e.matches.forEach(t=>{let i="",o="",s="";if(t.status==="pending"){const r=!t.is_sender,l=r?"Reject Match":"Cancel Request",m=r?"Are you sure you want to reject this match request?":"Are you sure you want to cancel your match request?";s=`
                                <button class="btn-delete-pair" data-matchid="${t.id}" data-title="${l}" data-msg="${m}" title="${r?"Reject":"Cancel Request"}" 
                                    style="position: absolute; top: 10px; right: 10px; z-index: 50; background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" 
                                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            `}t.status==="approved"?(o='<div class="pair-status approved">● Approved & Messaging</div>',i=`<button class="btn-animated btn-message-owner" data-owner="${t.ownerUsername}" style="width:100%; margin-top:10px; justify-content: center;"><i class="fa-regular fa-comment-dots"></i> Message Owner</button>`):t.status==="pending"&&t.is_sender?o='<div class="pair-status">● Pending Approval</div>':t.status==="pending"&&!t.is_sender&&(o='<div class="pair-status" style="color:#f59e0b; background:#fef3c7;">● Received Request!</div>',i=`<button class="btn-accept-match" data-matchid="${t.id}" style="width:100%; margin-top:10px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);"><i class="fa-solid fa-check"></i> Accept Match</button>`),a+=`
                            <div class="pair-card" style="position: relative; padding-top: 25px;">
                                ${s}
                                <div class="pair-images">
                                    <img src="${t.my_pet_img}" class="pair-img left">
                                    <div class="pair-heart-small"><i class="fa-solid fa-heart"></i></div>
                                    <img src="${t.their_pet_img}" class="pair-img right">
                                </div>
                                <div class="pair-names">${t.my_pet_name} & ${t.their_pet_name}</div>
                                ${o}
                                <div class="pair-date">@${t.ownerUsername}</div>
                                ${i}
                            </div>
                        `}),a+="</div>",document.getElementById("matchDashboardContent").innerHTML=a}})}function ge(){const e=T.filter(l=>l.owner===w).length,a=typeof S<"u"?S.filter(l=>l.status!=="Cancelled"&&l.status!=="Completed").length:0;let t="None",i="#64748b";typeof M<"u"&&M.length>0&&(t=M[0].status,t==="Approved"?i="#10b981":t==="Pending Review"&&(i="#f59e0b"));let o="";typeof S<"u"&&S.filter(l=>l.status!=="Cancelled"&&l.status!=="Completed").forEach(l=>{o+=`<div class="reminder-item warning"><div class="rem-icon"><i class="fa-solid fa-user-doctor"></i></div><div class="rem-text"><strong>${l.pet_name}'s Vet Visit</strong><small>${l.date} at ${l.time}</small></div></div>`}),typeof M<"u"&&M.filter(l=>l.status==="Approved").forEach(l=>{o+=`<div class="reminder-item success"><div class="rem-icon"><i class="fa-solid fa-check"></i></div><div class="rem-text"><strong>Adoption Approved!</strong><small>You can now finalize ${l.pet_name}'s adoption.</small></div></div>`}),o===""&&(o=`<div style="text-align:center; color:#64748b; padding:20px; font-weight:600;"><i class="fa-solid fa-mug-hot" style="font-size:2rem; margin-bottom:10px; color:#cbd5e1;"></i><br>You're all caught up!</div>`);const s=T.filter(l=>l.status==="Available");let r="";if(s.length>0){const l=Math.floor(Math.random()*s.length),m=s[l],h=m.gender==="Female"?'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>':'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>';r=`
                <div class="home-card featured-pet-card" style="flex: 1;">
                    <div class="featured-badge"><i class="fa-solid fa-star"></i> Pet of the Day</div>
                    <img src="${m.img}" alt="${m.name}" class="featured-img">
                    <div class="featured-info">
                        <h3>${m.name} ${h}</h3>
                        <p class="breed">${m.breed} • ${m.age}</p>
                        <p class="bio">${m.reason_for_adoption||m.personal_traits||"Looking for a loving forever home!"}</p>
                        <button class="btn-animated btn-adopt-potd" data-petid="${m.id}" data-petname="${m.name}" style="width: 100%; justify-content: center; margin-top: 10px;">Meet ${m.name}</button>
                    </div>
                </div>
            `}else r=`
                <div class="home-card featured-pet-card" style="flex: 1; display:flex; justify-content:center; align-items:center; background:#1e293b;">
                    <div style="text-align:center; color:white; z-index:2; padding:20px;">
                        <i class="fa-solid fa-shield-cat" style="font-size:3rem; margin-bottom:15px; color:#64748b;"></i>
                        <h3>No Pets Available</h3><p style="color:#cbd5e1; font-size:0.9rem; margin-top:10px;">Check back later for new arrivals!</p>
                    </div>
                </div>
            `;y.innerHTML=`
            <div class="home-container">
                <div class="home-banner">
                    <div class="banner-text"><h1>Welcome back, ${w}! 👋</h1><p>Here is what's happening with your furry friends today.</p></div>
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
                                ${o}
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-col">
                        ${r}
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
        `,Promise.resolve({status:"success",matches:ie}).then(l=>{const m=document.getElementById("homeMatchAlertsContainer");if(m)if(l.status==="success"&&l.matches.length>0){let h="";l.matches.slice(0,3).forEach(p=>{let u=p.status==="approved"?"Approved Match!":"Pending Request",g=p.status==="approved"?"💌":"⏳";h+=`
                        <div class="match-alert-item" style="cursor:pointer;" onclick="document.querySelector('[data-target=\\'breeding\\']').click()">
                            <img src="${p.their_pet_img}" alt="Pet">
                            <div class="alert-text"><strong>${p.their_pet_name} ${g}</strong><span>${u}</span></div>
                            <button class="btn-small-view">View</button>
                        </div>
                    `}),m.innerHTML=h}else m.innerHTML='<p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">No recent match activity.</p>'}),fetch("https://api.open-meteo.com/v1/forecast?latitude=14.6488&longitude=121.0509&current_weather=true").then(l=>l.json()).then(l=>{const m=Math.round(l.current_weather.temperature),h=l.current_weather.weathercode,p=document.getElementById("weatherTemp"),u=document.getElementById("weatherIcon"),g=document.getElementById("weatherText");p&&u&&g&&(p.innerText=`${m}°C`,h<=3?(u.className="fa-solid fa-sun weather-icon",u.style.color="#fef08a",g.innerHTML="<strong>Perfect time for a walk!</strong><br>The weather is great today. Take your pets out before it gets too hot."):h>=51&&h<=67||h>=80?(u.className="fa-solid fa-cloud-rain weather-icon",u.style.color="#bae6fd",g.innerHTML="<strong>It's a bit rainy!</strong><br>Keep your pets dry indoors today. A good time for some indoor training!"):(u.className="fa-solid fa-cloud weather-icon",u.style.color="#e2e8f0",g.innerHTML="<strong>Nice and cool!</strong><br>A great day for some indoor play or a quick stroll around the neighborhood."))}).catch(l=>console.error("Weather fetch error:",l)),setTimeout(()=>{const l=document.querySelector(".btn-adopt-potd");l&&l.addEventListener("click",m=>{const h=m.target.getAttribute("data-petid"),p=m.target.getAttribute("data-petname");y.innerHTML=Ee(h,p),document.querySelectorAll(".sidebar-nav .nav-btn").forEach(u=>u.classList.remove("active")),document.querySelector('[data-target="pets"]').classList.add("active")})},100)}ge();function te(){const e=Q[H],a=document.getElementById("vetInitials");if(!a)return;a.innerText=e.initials,document.getElementById("vetNameDisplay").innerText=e.name,document.getElementById("vetSpecialtyDisplay").innerText=e.specialty,document.getElementById("vetRatingDisplay").innerText=`⭐ ${e.rating} (${e.exp})`,document.getElementById("vetPhoneDisplay").innerText=e.phone,document.getElementById("vetEmailDisplay").innerText=e.email,document.getElementById("vetScheduleDisplay").innerText=e.schedule,document.getElementById("vetClinicDisplay").innerText=e.clinic;const t=document.getElementById("apptVetIdHidden").value,i=document.getElementById("btnSelectVet");t===H.toString()?(i.innerText="✅ Confirmed",i.classList.add("selected")):(i.innerText="Confirm",i.classList.remove("selected"))}function ae(){const e=document.getElementById("cartBadge");e&&(e.innerText=N.length),ue.innerHTML="";let a=0;N.length===0?ue.innerHTML='<p style="text-align:center; color:#64748b; font-weight:bold; margin-top: 50px;">Your cart is empty.</p>':N.forEach((t,i)=>{a+=parseFloat(t.price),ue.innerHTML+=`
                    <div class="cart-item-row">
                        <img src="${t.img}" class="cart-item-img" onerror="this.src='/resources/shop/bowl.jpg'" alt="${t.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${t.name}</div>
                            <div class="cart-item-price">₱ ${t.price}</div>
                        </div>
                        <div><button class="btn-remove-item" data-index="${i}" title="Remove item"><i class="fa-solid fa-trash-can"></i></button></div>
                    </div>
                `}),He.innerText=`₱ ${a.toFixed(2)}`}window.handleRewind=e=>{j.splice(e,1),_=Math.max(0,_-1),ve()};function Ve(){const e=document.getElementById("rewindList");e&&(e.innerHTML="",j.length===0?e.innerHTML=`
                <div style="text-align:center; padding: 20px; opacity:0.5;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="font-size:0.85rem; font-weight:600;">History is empty</p>
                </div>`:j.forEach((a,t)=>{e.innerHTML+=`
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
                `}))}function ve(){if(U.length===0||_>=U.length){document.getElementById("datingContentLayout").style.display="none";const r=document.getElementById("instructionOverlay");r.style.display="flex",r.innerHTML='<i class="fa-solid fa-face-frown-open" style="color: #cbd5e1; font-size: 4rem; margin-bottom: 15px;"></i><p>No more matches available<br>for this pet at the moment.</p>';return}const e=U[_];currentPhotoIndex=0;const a=document.getElementById("candThumbnails");a.innerHTML="",e.imgs.forEach((r,l)=>{a.innerHTML+=`<img src="${r}" class="cand-thumb ${l===0?"active":""}" data-index="${l}" alt="Photo ${l+1}">`}),Pe(e,0);const t=e.gender==="Male"?'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>':'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>';document.getElementById("candNameAge").innerHTML=`${e.name}, ${e.age} ${t}`,document.getElementById("candBreedGender").innerHTML=`<i class="fa-solid fa-paw"></i> ${e.breed}`,document.getElementById("candDesc").innerText=e.desc,document.getElementById("candScoreText").innerText=`${e.score}% Match`,document.getElementById("candScoreBar").style.width=`${e.score}%`;const i=document.getElementById("candBadges");i.innerHTML="",e.badges.includes("vet")&&(i.innerHTML+='<span class="v-badge badge-vet"><i class="fa-solid fa-stethoscope"></i> Vet Verified</span>'),e.badges.includes("pedigree")&&(i.innerHTML+='<span class="v-badge badge-pedigree"><i class="fa-solid fa-dna"></i> Purebred</span>'),e.badges.includes("vax")&&(i.innerHTML+='<span class="v-badge badge-vax"><i class="fa-solid fa-syringe"></i> Vaccinated</span>');const o=document.getElementById("candTraits");o.innerHTML="",e.traits.forEach(r=>{o.innerHTML+=`<span class="trait-tag">${r}</span>`}),document.getElementById("candOwnerName").innerText=e.ownerName,document.getElementById("candOwnerInitial").innerText=e.ownerInitial,document.getElementById("candOwnerRating").innerText=`⭐ ${e.ownerRating}`,document.getElementById("candOwnerPairs").innerText=`${e.successPairs} Successful Pairs`,document.getElementById("barSize").style.width=`${e.compSize}%`,document.getElementById("txtSize").innerText=`${e.compSize}%`,document.getElementById("barEnergy").style.width=`${e.compEnergy}%`,document.getElementById("txtEnergy").innerText=`${e.compEnergy}%`,document.getElementById("barTemp").style.width=`${e.compTemp}%`,document.getElementById("txtTemp").innerText=`${e.compTemp}%`;const s=document.getElementById("litterPredictor");s.innerHTML="",e.litter.forEach(r=>{const l=r.c==="#FFFFFF"||r.c==="#FFF8DC"?"#0f172a":"white";s.innerHTML+=`<div class="color-swatch" style="background:${r.c}; color:${l};">${r.p}%</div>`}),document.getElementById("instructionOverlay").style.display="none",document.getElementById("datingContentLayout").style.display="flex",document.getElementById("treatCountDisplay").innerText=`${me} Left`,Ve()}function Pe(e,a){const t=document.getElementById("candImg");t.style.opacity=0,setTimeout(()=>{t.src=e.imgs[a],t.style.opacity=1},150),document.querySelectorAll(".cand-thumb").forEach((i,o)=>{o===parseInt(a)?i.classList.add("active"):i.classList.remove("active")})}G.forEach(e=>{e.addEventListener("click",function(){G.forEach(t=>t.classList.remove("active")),this.classList.add("active");const a=this.getAttribute("data-target");y.scrollTo({top:0,behavior:"smooth"}),a==="home"?ge():a==="pets"?y.innerHTML=we:a==="applications"?y.innerHTML=Ne():a==="vet"?(y.innerHTML=qe(),te()):a==="shop"?(y.innerHTML=ze(),ae()):a==="breeding"?(y.innerHTML=Te(),F=null):a==="messages"&&(y.innerHTML=Ae(),Me())})}),document.getElementById("btnViewProfile").addEventListener("click",()=>{G.forEach(e=>e.classList.remove("active")),y.scrollTo({top:0,behavior:"smooth"}),y.innerHTML=xe,Le()}),document.getElementById("btnRegisterPet").addEventListener("click",()=>{G.forEach(o=>o.classList.remove("active")),y.scrollTo({top:0,behavior:"smooth"}),y.innerHTML=Oe;const e=document.getElementById("imageDropZone"),a=document.getElementById("petImageInput"),t=document.getElementById("imagePreview"),i=document.getElementById("dropZoneText");e.addEventListener("click",()=>a.click()),he=null,a.addEventListener("change",function(){if(this.files&&this.files[0]){he=this.files[0];const o=new FileReader;o.onload=function(s){t.src=s.target.result,t.style.display="block",i.style.display="none"},o.readAsDataURL(this.files[0])}}),document.getElementById("btnCancelReg").addEventListener("click",()=>{ge(),G[0].classList.add("active")})}),y.addEventListener("click",async e=>{if(e.target.closest("#btnMatchRegisterPet")){document.getElementById("btnRegisterPet").click();return}if(e.target.classList.contains("profile-tab-btn")){document.querySelectorAll(".profile-tab-btn").forEach(n=>n.classList.remove("active")),document.querySelectorAll(".profile-tab-content").forEach(n=>n.classList.remove("active")),e.target.classList.add("active");const d=e.target.getAttribute("data-tab");document.getElementById(d).classList.add("active")}const t=e.target.closest(".btn-view-app")||e.target.closest(".btn-view-pet");if(t){const d=t.getAttribute("data-target"),n=document.getElementById(d),c=t.closest(".app-card")||t.closest(".pet-card");n.style.display==="block"?(n.style.display="none",c.classList.remove("dropdown-open")):(n.style.display="block",c.classList.add("dropdown-open"))}const i=e.target.closest(".btn-close-pet");if(i){const d=i.getAttribute("data-target"),n=document.getElementById(d),c=n.previousElementSibling;n.style.display="none",c.classList.remove("dropdown-open")}const o=e.target.closest(".btn-adopt");if(o){const d=o.getAttribute("data-petid"),n=o.getAttribute("data-petname");y.innerHTML=Ee(d,n)}e.target.closest("#btnBackToPets")&&(y.innerHTML=we),e.target.closest(".btn-edit-profile")&&(document.getElementById("editProfileModal").style.display="flex");const s=e.target.closest(".btn-archive-pet");if(s){const d=s.getAttribute("data-petid");K("Move to Bin?","Are you sure you want to move this pet to the Recycle Bin?",async()=>{const n=T.find(c=>c.id===d);if(!n){f("Error","Pet record not found.",!0);return}try{await B.createDocument(I,de,O.unique(),{name:n.name,breed:n.breed,gender:n.gender,owner:w,img:n.img||""}),await B.deleteDocument(I,le,d),await C("Moved a pet to the Recycle Bin",n.name,"fa-trash-can"),f("Moved to Bin","Pet successfully moved to Recycle Bin.",!1,()=>{window.location.reload()})}catch(c){console.error("Appwrite Move to Bin Error:",c),f("Error",c.message,!0)}})}e.target.closest("#btnViewBin")&&(y.innerHTML=_e()),e.target.closest("#btnEmptyBin")&&K("Empty Bin?","WARNING: Are you sure you want to permanently delete ALL pets in the Recycle Bin? This cannot be undone!",async()=>{try{for(const d of J)await B.deleteDocument(I,de,d.id);await C("Permanently emptied the Recycle Bin","","fa-dumpster-fire"),f("Bin Emptied","Recycle bin emptied successfully.",!1,()=>{window.location.reload()})}catch(d){console.error("Appwrite Empty Bin Error:",d),f("Error",d.message,!0)}}),e.target.closest("#btnBackToProfile")&&(y.innerHTML=xe,Le());const r=e.target.closest(".btn-restore-pet");if(r){const d=r.getAttribute("data-petid"),n=J.find(c=>c.id===d);if(n)try{await B.createDocument(I,le,O.unique(),{name:n.name,breed:n.breed,gender:n.gender,age:"1 yr",status:"Available",health_status:"Healthy",owner:w,contact_number:X||"0917-000-0000",personal_traits:"Friendly",reason_for_adoption:"Restored from Recycle Bin",img:n.img||""}),await B.deleteDocument(I,de,d),await C("Restored a pet from the Recycle Bin",n.name,"fa-rotate-left"),f("Restored!","Pet has been restored to the active board!",!1,()=>{window.location.reload()})}catch(c){console.error("Appwrite Restore Error:",c),f("Error",c.message,!0)}}const l=e.target.closest(".btn-cancel-app");if(l){const d=l.getAttribute("data-appid");K("Cancel Application?","Are you sure you want to cancel this application?",async()=>{try{await B.deleteDocument(I,fe,d),await C("Cancelled adoption application","","fa-file-circle-xmark"),f("Cancelled","Application successfully cancelled.",!1,()=>{window.location.reload()})}catch(n){console.error("Appwrite Cancel App Error:",n),f("Error",n.message,!0)}})}const m=e.target.closest(".btn-cancel-vet");if(m){const d=m.getAttribute("data-appid");K("Cancel Appointment?","Are you sure you want to cancel this veterinary appointment?",async()=>{try{await B.deleteDocument(I,ye,d),await C("Cancelled veterinary appointment","","fa-calendar-xmark"),f("Cancelled","Appointment successfully cancelled.",!1,()=>{window.location.reload()})}catch(n){console.error("Appwrite Cancel Vet Error:",n),f("Error",n.message,!0)}})}const h=e.target.closest(".pet-select-card");if(h&&document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".pet-select-card").forEach(c=>c.classList.remove("selected")),h.classList.add("selected");const d=h.getAttribute("data-pet");document.getElementById("apptPetSelectorHidden").value=d;const n=myPetsDB[d];n&&(document.getElementById("apptOwner").value=n.owner,document.getElementById("apptPetType").value=n.type,document.getElementById("apptBreed").value=n.breed,document.getElementById("apptGender").value=n.gender,document.getElementById("apptWeight").value=n.weight)}if(e.target.closest("#btnPrevVet")&&(H=(H-1+Q.length)%Q.length,te()),e.target.closest("#btnNextVet")&&(H=(H+1)%Q.length,te()),e.target.closest("#btnSelectVet")){const d=Q[H];document.getElementById("apptVetIdHidden").value=H,document.getElementById("apptSelectedVetName").value=d.name,te()}if(e.target.classList.contains("btn-add-cart")){N.push({name:e.target.getAttribute("data-name"),price:e.target.getAttribute("data-price"),img:e.target.getAttribute("data-img")}),ae();const d=e.target.innerText;e.target.innerText="✓ Added",e.target.style.background="#10b981",e.target.style.color="white",e.target.style.borderColor="#10b981",setTimeout(()=>{e.target.innerText=d,e.target.style.background="white",e.target.style.color="#4f46e5",e.target.style.borderColor="#4f46e5"},1e3)}if(e.target.classList.contains("btn-buy-now")){const n=e.target.closest(".shop-card").querySelector(".btn-add-cart");N.push({name:n.getAttribute("data-name"),price:n.getAttribute("data-price"),img:n.getAttribute("data-img")}),ae(),document.getElementById("cartModalOverlay").style.display="flex"}e.target.closest("#btnOpenCart")&&(document.getElementById("cartModalOverlay").style.display="flex"),e.target.closest(".mode-btn")&&(document.querySelectorAll(".mode-btn").forEach(d=>d.classList.remove("active")),e.target.closest(".mode-btn").classList.add("active"),F&&document.querySelector(`[data-pet="${F}"]`).click());const p=e.target.closest(".pet-select-card");if(p&&document.getElementById("vetBookingForm")){document.querySelectorAll(".pet-select-card").forEach(c=>c.classList.remove("selected")),p.classList.add("selected");const d=p.getAttribute("data-petid");document.getElementById("apptPetSelectorHidden").value=d;const n=T.find(c=>c.id.toString()===d);n&&(document.getElementById("apptOwner").value=w,document.getElementById("apptPetType").value=n.breed&&n.breed.toLowerCase().includes("cat")?"Cat":"Dog",document.getElementById("apptBreed").value=n.breed||"Unknown",document.getElementById("apptGender").value=n.gender||"Unknown")}const u=e.target.closest(".my-pet-card");if(u&&!document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".my-pet-card").forEach(n=>n.classList.remove("active")),u.classList.add("active"),F=u.getAttribute("data-petid"),T.find(n=>n.id.toString()===F),document.getElementById("datingContentLayout").style.display="none";const d=document.getElementById("instructionOverlay");d.style.display="flex",d.innerHTML='<div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div><p>Scanning database for verified matches...</p>',Promise.resolve().then(()=>({status:"success",candidates:T.filter(c=>c.owner!==w).map(c=>({id:c.id,name:c.name,breed:c.breed,gender:c.gender,age:c.age,photos:[c.img],imgs:[c.img],owner:c.owner||"PawUser",ownerName:c.owner||"PawUser",score:94,traits:c.personal_traits?c.personal_traits.split(",").map(v=>v.trim()):["Playful","Friendly"],desc:c.reason_for_adoption||"Looking for a friend!",verified:!0}))})).then(n=>{n.status==="success"&&n.candidates.length>0?(U=n.candidates,_=0,setTimeout(()=>{ve()},800)):d.innerHTML='<p style="color:#64748b; font-weight:bold; font-size:1.1rem;">No match candidates available right now. Invite friends or register more pets!</p>'})}const g=e.target.closest(".cand-thumb");if(g){const d=U[_];Pe(d,g.getAttribute("data-index"))}const b=e.target.closest("#btnPassCandidate"),k=e.target.closest("#btnMatchCandidate"),D=e.target.closest("#btnTreatCandidate");if(b||k||D){const d=U[_],n=T.find(v=>v.id.toString()===F);let c="pass";if(k&&(c="like"),D&&(c="super_like"),c==="super_like"&&me<=0){f("Out of Treats","You have used all your Super Treats for today! Come back tomorrow.",!0);return}Promise.resolve({status:"success",isMatch:!0}).then(v=>{if(v.status==="success"){if(c==="super_like"&&me--,j.unshift(d),j.length>5&&j.pop(),c!=="pass"){C(c==="super_like"?"Sent a Super Treat to":"Sent a match request to",d.name,"fa-heart"),document.getElementById("matchImgLeft").src=n.img,document.getElementById("matchImgRight").src=d.imgs[0],document.getElementById("matchNameLeft").innerText=n.name,document.getElementById("matchNameRight").innerText=d.name;const L=v.isMatch?"✨ IT'S A MATCH! ✨":c==="super_like"?"Super Liked! 🦴 (Pending)":"Pending Owner Approval";document.getElementById("matchDateSpot").innerText="PawTrack Verified";const $=document.getElementById("matchIcebreaker");$.value=v.isMatch?"You matched! Let's plan a playdate!":"",$.placeholder=v.isMatch?"Type a message...":`Say hi to ${d.ownerName} while you wait...`,document.getElementById("btnContinueMatch").setAttribute("data-targetuser",d.ownerName),document.getElementById("matchOverlay").style.display="flex",activePairs.unshift({id:"p"+Date.now(),maleName:n.gender==="Male"?n.name:d.name,femaleName:n.gender==="Female"?n.name:d.name,maleImg:n.gender==="Male"?n.img:d.imgs[0],femaleImg:n.gender==="Female"?n.img:d.imgs[0],status:L,isApproved:v.isMatch,date:"Just Now",ownerUsername:d.ownerName})}_++,ve()}else f("Error",v.message,!0)}).catch(v=>console.error("Swipe Error:",v))}e.target.closest("#btnOpenPrefs")&&(document.getElementById("prefModal").style.display="flex"),e.target.closest("#btnViewActivePairs")&&ne(),e.target.closest("#btnBackToMatch")&&(y.innerHTML=Te(),F=null);const x=e.target.closest(".btn-accept-match"),E=e.target.closest(".btn-delete-pair");if(x||E){const d=x?"accept":"delete",n=(x||E).getAttribute("data-matchid");if(d==="delete"){const c=E.getAttribute("data-title")||"Cancel Request",v=E.getAttribute("data-msg")||"Are you sure you want to remove this match?";K(c,v,()=>{ie=ie.filter(L=>L.id!==n),ne()})}else{const c=ie.find(v=>v.id===n);c&&(c.status="approved"),ne()}}}),document.getElementById("btnCloseCart").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnContinueShopping").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnCheckout").addEventListener("click",()=>{if(N.length===0){f("Empty Cart","Your cart is empty! Please add some items first.",!0);return}C("Completed a Pet Shop checkout","","fa-bag-shopping"),N=[],ae(),document.getElementById("cartModalOverlay").style.display="none",f("Order Placed!","Order placed successfully! Thank you for shopping.",!1)}),document.getElementById("cartItemsContainer").addEventListener("click",e=>{const a=e.target.closest(".btn-remove-item");a&&(N.splice(parseInt(a.getAttribute("data-index")),1),ae())}),document.getElementById("btnContinueMatch").addEventListener("click",e=>{const a=e.target.getAttribute("data-targetuser"),t=document.getElementById("matchIcebreaker").value.trim();t&&a&&(P[a]||(P[a]=[]),P[a].push({text:t,type:"sent",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),C("Sent an Icebreaker message to",a,"fa-comment-dots")),document.getElementById("matchOverlay").style.display="none",ne()}),document.getElementById("btnSavePrefs").addEventListener("click",()=>{document.getElementById("prefModal").style.display="none",F&&document.querySelector(`[data-pet="${F}"]`).click()}),document.getElementById("prefModal").addEventListener("click",e=>{e.target===document.getElementById("prefModal")&&(document.getElementById("prefModal").style.display="none")}),y.addEventListener("submit",e=>{if(e.target.id==="vetBookingForm"){e.preventDefault();const a=document.getElementById("apptPetSelectorHidden").value,t=document.getElementById("apptVetIdHidden").value;if(!a){f("Error","Please select a pet for the appointment by clicking their picture!",!0);return}if(!t){f("Error","Please choose a veterinarian by clicking 'Confirm' on the profile card!",!0);return}const i=document.querySelector(`.pet-select-card[data-petid="${a}"] span`).innerText,o=document.getElementById("apptSelectedVetName").value,s=T.find(r=>{var l;return((l=r.id)==null?void 0:l.toString())===(a==null?void 0:a.toString())});(async()=>{try{await B.createDocument(I,ye,O.unique(),{pet_name:i,vet_name:o,status:"Upcoming",time:document.getElementById("apptTime").value||"",date:document.getElementById("apptDate").value||"",user_id:V,img:(s==null?void 0:s.img)||""}),await C("Booked vet visit for",i,"fa-user-doctor"),f("Request Sent!","Appointment scheduled successfully! It is now Upcoming.",!1,()=>{window.location.reload()})}catch(r){console.error("Appwrite Vet Booking Error:",r),f("Error",r.message,!0)}})()}if(e.target.id==="adoptionApplicationForm"){if(e.preventDefault(),!document.getElementById("adoptTerms").checked){f("Missing Requirement","You must agree to the terms and conditions.",!0);return}const a=document.getElementById("adoptPetId").value,t=document.getElementById("adoptPetName").value,i=T.find(o=>{var s;return((s=o.id)==null?void 0:s.toString())===(a==null?void 0:a.toString())});(async()=>{try{await B.createDocument(I,fe,O.unique(),{pet_name:t,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status:"Pending Review",user_id:V,img:(i==null?void 0:i.img)||""}),await C("Applied to adopt",t,"fa-house-chimney-user"),f("Application Sent!","Successfully submitted! Status: PENDING REVIEW.",!1,()=>{window.location.reload()})}catch(o){console.error("Appwrite Adoption Application Error:",o),f("Error",o.message,!0)}})()}(e.target.id==="petRegistrationForm"||e.target.id==="registerPetForm")&&(e.preventDefault(),(async()=>{var m,h,p,u,g;const a=document.getElementById("petImageInput"),t=he||a&&a.files&&a.files[0];let i="";if(t)try{f("Uploading Photo","Saving pet photo to PawTrack Storage...",!1);const b=await re.createFile(ce,O.unique(),t);i=re.getFileView(ce,b.$id).toString()}catch(b){console.error("Storage upload failed:",b)}i||(i="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80");const o=document.getElementById("regForAdoption"),s=o?o.checked:!0,r=new FormData(e.target),l={name:r.get("name")||((m=document.getElementById("regPetName"))==null?void 0:m.value)||"Unnamed Pet",breed:r.get("breed")||((h=document.getElementById("regBreed"))==null?void 0:h.value)||"Mixed Breed",gender:r.get("gender")||((p=document.getElementById("regGender"))==null?void 0:p.value)||"Male",age:r.get("age")||((u=document.getElementById("regAge"))==null?void 0:u.value)||"1 yr",status:s?"Available":"Private",health_status:r.get("health_status")||"Healthy / Vaccinated",owner:w,contact_number:r.get("contact_number")||X||"0917-000-0000",personal_traits:r.get("personal_traits")||((g=document.getElementById("regDesc"))==null?void 0:g.value)||"Friendly",reason_for_adoption:r.get("reason_for_adoption")||(s?"Looking for a home":"Personal pet"),img:i};try{await B.createDocument(I,le,O.unique(),l),await C(s?"Listed pet for adoption":"Registered private pet",l.name,"fa-shield-cat"),f("Success!",s?"Pet Registered Successfully! Photo saved to PawTrack Storage and listed on the adoption board.":"Pet added to your personal roster! Photo saved to PawTrack Storage.",!1,()=>{window.location.reload()})}catch(b){console.error("Appwrite Pet Registration Error:",b),f("Error","Could not register pet: "+b.message,!0)}})())}),y.addEventListener("reset",e=>{e.target.id==="vetBookingForm"&&(document.querySelectorAll(".pet-select-card").forEach(a=>a.classList.remove("selected")),document.getElementById("apptPetSelectorHidden")&&(document.getElementById("apptPetSelectorHidden").value=""),document.getElementById("apptVetIdHidden")&&(document.getElementById("apptVetIdHidden").value=""),setTimeout(()=>{te()},10))});const Ce=document.getElementById("editProfileForm");Ce&&Ce.addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("editFirstName").value,t=document.getElementById("editLastName").value,i=document.getElementById("editContact").value,o=`${a} ${t}`.trim();try{o&&await Y.updateName(o),await Y.updatePrefs({...A,phone:i}),w=o,X=i,await C("Updated profile settings & information","","fa-user-pen"),document.getElementById("editProfileModal").style.display="none",f("Profile Saved","Profile updated successfully!",!1,()=>{window.location.reload()})}catch(s){f("Error",s.message,!0)}}),y.addEventListener("input",e=>{e.target.id==="shopPriceFilter"&&(document.getElementById("shopPriceDisplay").innerText=`₱${e.target.value}`,ke())}),y.addEventListener("change",e=>{e.target.id==="shopCategoryFilter"&&ke()});function ke(){const e=document.getElementById("shopCategoryFilter").value,a=parseFloat(document.getElementById("shopPriceFilter").value),t=Be.filter(i=>{const o=e==="All Categories"||i.category===e,s=i.price<=a;return o&&s});document.getElementById("shopGridContainer").innerHTML=Ie(t)}async function Le(){const e=document.getElementById("mainProfilePic");e&&(e.src=A.avatarUrl||"/resources/avatar/Avatar 1.jpg");const a=document.getElementById("btnChangeAvatar")||document.querySelector(".btn-change-photo"),t=document.getElementById("avatarFileInput");a&&t&&(a.onclick=()=>t.click(),t.onchange=async function(){if(this.files&&this.files[0])try{f("Uploading","Uploading avatar to PawTrack Storage...",!1);const v=await re.createFile(ce,O.unique(),this.files[0]),L=re.getFileView(ce,v.$id).toString();await Y.updatePrefs({...A,avatarUrl:L}),A.avatarUrl=L,e&&(e.src=L),await C("Updated profile picture","Saved to PawTrack Storage","fa-camera"),f("Success","Profile photo uploaded to PawTrack Storage!")}catch(v){f("Error","Failed to upload photo: "+v.message,!0)}});const i=document.getElementById("profileFullName"),o=document.getElementById("profileUsername"),s=document.getElementById("profileEmail"),r=document.getElementById("profilePhone");i&&(i.innerText=w),o&&(o.innerText=A.username?"@"+A.username:"@"+pe.split("@")[0]),s&&(s.innerText=pe),r&&(r.innerText=X||"None");const[l="",...m]=(w||"").split(" "),h=m.join(" "),p=document.getElementById("editFirstName"),u=document.getElementById("editLastName"),g=document.getElementById("editContact"),b=document.getElementById("editEmail");p&&(p.value=l),u&&(u.value=h),g&&(g.value=X||""),b&&(b.value=pe||"");const k=T.filter(v=>v.owner===w),D=M.filter(v=>v.status==="Approved").length,x=document.getElementById("countOwnedPets"),E=document.getElementById("countSuccessfulApps");x&&(x.innerText=k.length),E&&(E.innerText=D);const d=document.getElementById("privateRosterGrid"),n=document.getElementById("adoptionRosterGrid");d&&n&&(d.innerHTML="",n.innerHTML="",k.forEach(v=>{const L=`
                    <div class="roster-card">
                        <img src="${v.img}" class="roster-img">
                        <div class="roster-info"><h4>${v.name}</h4><p>${v.breed}</p></div>
                        <button class="btn-archive-pet" data-petid="${v.id}" title="Move to Bin" 
                            style="background: white; border: 2px solid #ef4444; color: #ef4444; padding: 6px 15px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s;" 
                            onmouseover="this.style.background='#ef4444'; this.style.color='white';" 
                            onmouseout="this.style.background='white'; this.style.color='#ef4444';">
                            <i class="fa-solid fa-trash-can"></i> Bin
                        </button>
                    </div>
                `;v.status==="Private"?d.innerHTML+=L:n.innerHTML+=L}));const c=document.getElementById("recentActivityLogs");if(c){c.innerHTML='<div class="activity-loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading activity logs...</div>';try{const v=await B.listDocuments(I,De,[W.equal("user_id",V),W.orderDesc("$createdAt"),W.limit(20)]);c.innerHTML="";const L=v.documents;L.length>0?L.forEach($=>{const Ge=parseInt($.timestamp)||new Date($.$createdAt).getTime(),Ye=je(Ge),oe=Ue($.action,$.icon),Fe=$.target?q($.target):"",We=q($.action||"Activity recorded");c.innerHTML+=`
                            <div class="activity-item">
                                <div class="activity-icon-bubble ${oe.themeClass}">
                                    <i class="fa-solid ${oe.icon}"></i>
                                </div>
                                <div class="activity-details">
                                    <div class="activity-row-main">
                                        <span class="activity-action-text">${We}</span>
                                        <span class="activity-category-pill ${oe.tagClass}">${oe.tagLabel}</span>
                                    </div>
                                    ${Fe?`
                                        <div class="activity-target-pill">
                                            <i class="fa-solid fa-quote-left"></i>
                                            <span>${Fe}</span>
                                        </div>
                                    `:""}
                                    <div class="activity-meta">
                                        <span class="activity-timestamp"><i class="fa-regular fa-clock"></i> ${Ye}</span>
                                        <span class="activity-verified-tag"><i class="fa-solid fa-circle-check"></i> Recorded</span>
                                    </div>
                                </div>
                            </div>
                        `}):c.innerHTML=`
                        <div class="activity-empty-state">
                            <div class="empty-icon-circle"><i class="fa-solid fa-shield-halved"></i></div>
                            <h4>Security & Account Verified</h4>
                            <p>Your session is active. Actions like pet registrations, adoptions, and profile updates will appear here in real time.</p>
                        </div>
                    `}catch(v){console.warn("Could not load activity logs:",v),c.innerHTML=`
                    <div class="activity-empty-state">
                        <div class="empty-icon-circle"><i class="fa-solid fa-circle-info"></i></div>
                        <h4>No Activity Recorded</h4>
                        <p>No past logs found for your account yet.</p>
                    </div>
                `}}}function q(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function Ue(e,a){const t=(e||"").toLowerCase();if(t.includes("log")||t.includes("auth")||t.includes("verified")||t.includes("session"))return{themeClass:"theme-emerald",icon:"fa-shield-halved",tagClass:"tag-emerald",tagLabel:"Security"};if(t.includes("bin")||t.includes("delet")||t.includes("dumpster")||t.includes("trash"))return{themeClass:"theme-rose",icon:"fa-trash-can",tagClass:"tag-rose",tagLabel:"Archive"};if(t.includes("pet")||t.includes("adopt")||t.includes("restor")||t.includes("breed"))return{themeClass:"theme-terracotta",icon:"fa-paw",tagClass:"tag-terracotta",tagLabel:"Pet Care"};if(t.includes("photo")||t.includes("avatar")||t.includes("profile")||t.includes("settings"))return{themeClass:"theme-honey",icon:"fa-user-pen",tagClass:"tag-honey",tagLabel:"Profile"};if(t.includes("shop")||t.includes("cart")||t.includes("item")||t.includes("buy"))return{themeClass:"theme-amber",icon:"fa-bag-shopping",tagClass:"tag-amber",tagLabel:"Shop"};let i=a||"fa-bell";return i==="fa-right-to-bracket"&&(i="fa-arrow-right-to-bracket"),{themeClass:"theme-sage",icon:i,tagClass:"tag-sage",tagLabel:"Activity"}}function je(e){const a=Date.now(),t=Math.max(0,a-e),i=60*1e3,o=60*i,s=24*o,r=new Date(e),l=r.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return t<2*i?"Just now":t<60*i?`${Math.floor(t/i)}m ago`:t<24*o?`${Math.floor(t/o)}h ago (${l})`:new Date(a-s).toDateString()===r.toDateString()?`Yesterday at ${l}`:r.toLocaleDateString(void 0,{month:"short",day:"numeric"})+` at ${l}`}const $e=document.getElementById("btnLogout");$e&&$e.addEventListener("click",async()=>{try{await Y.deleteSession("current")}catch(e){console.warn(e)}window.location.href="/PawTrackLogin.html"});let z=null;Object.keys(P).length===0&&(P.PawTrackCommunity=[{text:"Welcome to PawTrack! Connect with pet lovers, adopters, and arrange playdates right here.",type:"received",time:"10:00 AM"}]);function Ae(){return`
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
        `}function Me(e=null){const a=document.getElementById("messengerInboxList"),t=document.getElementById("messengerChatPanel"),i=document.getElementById("btnPageNewChat"),o=document.getElementById("messengerSearchInput");if(!a||!t)return;function s(p=""){a.innerHTML="";const u=Object.keys(P).filter(g=>g.toLowerCase().includes(p.toLowerCase()));if(u.length===0){a.innerHTML=`
                    <div class="inbox-empty-state">
                        <i class="fa-solid fa-comments"></i>
                        <p>No conversations found.<br>Click "New Conversation" to start chatting!</p>
                    </div>
                `;return}u.forEach(g=>{const b=P[g]||[],k=b.length>0?b[b.length-1].text:"No messages yet",D=b.length>0?b[b.length-1].time:"",x=g===z?"active":"",E=document.createElement("div");E.className=`inbox-item ${x}`,E.setAttribute("data-user",g),E.innerHTML=`
                    <div class="inbox-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="inbox-info">
                        <div class="inbox-info-header">
                            <h4>@${q(g)}</h4>
                            <span class="inbox-time">${D}</span>
                        </div>
                        <p class="inbox-snippet">${q(k)}</p>
                    </div>
                `,E.onclick=()=>r(g),a.appendChild(E)})}function r(p){z=p,document.querySelectorAll(".inbox-item").forEach(x=>{x.classList.toggle("active",x.getAttribute("data-user")===p)});const u=P[p]||[];t.innerHTML=`
                <div class="chat-pane-header">
                    <div class="chat-header-user">
                        <div class="chat-header-avatar"><i class="fa-solid fa-user"></i></div>
                        <div>
                            <h3>@${q(p)}</h3>
                            <span class="chat-online-status"><span class="status-dot-green"></span> Active Conversation</span>
                        </div>
                    </div>
                </div>

                <div class="chat-pane-messages" id="activeChatStream">
                    ${u.length===0?'<div class="empty-stream"><p>This is the start of your message history with @'+q(p)+"</p></div>":""}
                </div>

                <div class="chat-pane-input-bar">
                    <div class="chat-input-pill">
                        <input type="text" id="activeChatInput" placeholder="Write a message to @${q(p)}...">
                    </div>
                    <button class="btn-chat-send" id="btnActiveSend">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            `;const g=document.getElementById("activeChatStream");u.forEach(x=>{l(g,x.text,x.type,x.time)}),g.scrollTop=g.scrollHeight;const b=document.getElementById("activeChatInput"),k=document.getElementById("btnActiveSend");function D(){const x=b.value.trim();if(!x||!z)return;const E=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});l(g,x,"sent",E),b.value="",g.scrollTop=g.scrollHeight,P[z]||(P[z]=[]),P[z].push({text:x,type:"sent",time:E}),s(o.value.trim()),z==="PawTrackCommunity"&&setTimeout(()=>{const d=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),n="We're glad to have you! Feel free to connect with pet owners across PawTrack.";P.PawTrackCommunity.push({text:n,type:"received",time:d}),z==="PawTrackCommunity"&&(l(g,n,"received",d),g.scrollTop=g.scrollHeight),s(o.value.trim())},1e3)}k.onclick=D,b.onkeypress=x=>{x.key==="Enter"&&D()},b.focus()}function l(p,u,g,b){const k=document.createElement("div");k.className=`stream-bubble bubble-${g}`,k.innerHTML=`
                <div class="bubble-text">${q(u)}</div>
                <div class="bubble-time">${b}</div>
            `,p.appendChild(k)}o.oninput=p=>{s(p.target.value.trim())},i.onclick=()=>{Re("Start Conversation","Enter the PawTrack username you'd like to message:",p=>{if(p&&p.trim()){const u=p.trim().replace("@","");P[u]||(P[u]=[]),s(),r(u)}})};const m=Object.keys(P),h=e||(m.length>0?m[0]:null);s(),h?r(h):t.innerHTML=`
                <div class="empty-conversation-state">
                    <div class="empty-icon-circle"><i class="fa-solid fa-comments"></i></div>
                    <h3>Your Messages</h3>
                    <p>Select a conversation from the left or click "New Conversation" to start chatting.</p>
                </div>
            `}y.addEventListener("click",e=>{const a=e.target.closest(".btn-message-owner");if(a){const t=a.getAttribute("data-owner"),i=document.querySelector('.sidebar-nav .nav-btn[data-target="messages"]');i&&(G.forEach(o=>o.classList.remove("active")),i.classList.add("active")),y.scrollTo({top:0,behavior:"smooth"}),y.innerHTML=Ae(),Me(t)}}),y.addEventListener("input",e=>{if(e.target.id==="radarDistanceRange"){const a=document.getElementById("radarDistanceValue");a&&(a.innerText=`${e.target.value} km`)}}),y.addEventListener("click",async e=>{var a,t,i,o,s;if(e.target.closest("#btnSaveAllSettings")){const r=((a=document.getElementById("notifVet"))==null?void 0:a.checked)??!0,l=((t=document.getElementById("notifMatch"))==null?void 0:t.checked)??!0,m=((i=document.getElementById("notifAdoption"))==null?void 0:i.checked)??!0,h=((o=document.getElementById("prefIncognito"))==null?void 0:o.checked)??!1,p=((s=document.getElementById("radarDistanceRange"))==null?void 0:s.value)||"25";try{await Y.updatePrefs({...A,notifVet:r,notifMatch:l,notifAdoption:m,incognito:h,radarDistance:p}),A.radarDistance=p,A.incognito=h,await C("Updated notification & discovery preferences","","fa-sliders"),f("Settings Saved","Your notification, privacy, and discovery preferences have been updated successfully!")}catch(u){f("Error",u.message,!0)}}})});
