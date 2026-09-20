import{a as ae,d as x,Q as j,I as R,s as de}from"./appwrite-BfOVdxfC.js";const w="pawtrack_db",ce="pets",Ee="applications",Be="vet_appointments",pe="recycle_bin",Ge="activity_logs",me="pawtrack_storage";let h="",ue="",N="",z={},G="",E=[],L=[],C=[],Y=[],Ie=null,ie=[],A={};document.addEventListener("DOMContentLoaded",async()=>{var Ue;try{const e=await ae.get();h=e.name,ue=e.email,N=e.$id,z=e.prefs||{},G=((Ue=e.prefs)==null?void 0:Ue.phone)||"";const a=document.getElementById("userNameDisplay");a&&(a.innerText=h?"Welcome, "+h+"!":"Welcome!");try{E=(await x.listDocuments(w,ce)).documents.map(o=>({...o,id:o.$id})),L=(await x.listDocuments(w,Ee,[j.equal("user_id",N)])).documents.map(o=>({...o,id:o.$id})),C=(await x.listDocuments(w,Be,[j.equal("user_id",N)])).documents.map(o=>({...o,id:o.$id})),Y=(await x.listDocuments(w,pe,[j.equal("owner",h)])).documents.map(o=>({...o,id:o.$id}))}catch(t){console.warn("Database collections not fully setup yet. Using empty arrays.",t)}}catch(e){console.error("User not logged in",e),window.location.href="/PawTrackLogin.html";return}async function B(e,a,t){try{await x.createDocument(w,Ge,R.unique(),{user_id:N,action:e||"Activity recorded",target:a||"",icon:t||"fa-paw",timestamp:Date.now().toString()})}catch(i){console.warn("Failed to persist activity log to Appwrite:",i)}}function Te(){document.body.style.zoom="1",document.body.style.width="100%",document.body.style.height="100%",navigator.userAgent.toLowerCase().includes("firefox")&&(document.body.style.transform="none")}let W;function u(e,a,t=!1,i=null){const l=document.getElementById("customPopupOverlay"),n=document.getElementById("customPopupTitle"),o=document.getElementById("customPopupMessage"),r=document.getElementById("customPopupActions");n.innerText=e,o.innerText=a,n.className=t?"custom-popup-title title-error":"custom-popup-title title-success",r.style.display="none",l.style.display="flex",clearTimeout(W),W=setTimeout(()=>{M(i)},5e3),document.getElementById("customPopupClose").onclick=()=>{clearTimeout(W),M(i)}}function Ye(e,a,t){const i=document.getElementById("customPopupOverlay"),l=document.getElementById("customPopupTitle"),n=document.getElementById("customPopupMessage"),o=document.getElementById("customPopupActions");l.innerText=e,l.className="custom-popup-title title-success",n.innerHTML=`<p style="margin-bottom:10px;">${a}</p><input type="text" id="customPromptInput" style="width:100%; padding:12px; border-radius:8px; border:2px solid #cbd5e1; outline:none; font-size:1rem; font-weight:600; color:#0f172a;" autocomplete="off">`,o.style.display="flex",i.style.display="flex",clearTimeout(W),document.getElementById("btnPopupConfirm").innerText="Submit",document.getElementById("btnPopupConfirm").onclick=()=>{const r=document.getElementById("customPromptInput").value;M(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",r.trim()!==""&&t(r.trim())},document.getElementById("customPopupClose").onclick=()=>{M()},document.getElementById("btnPopupCancel").onclick=()=>{M(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure"}}function X(e,a,t){const i=document.getElementById("customPopupOverlay"),l=document.getElementById("customPopupTitle"),n=document.getElementById("customPopupMessage"),o=document.getElementById("customPopupActions");l.innerText=e,l.className="custom-popup-title title-error",n.innerHTML=`<p>${a}</p>`,o.style.display="flex",i.style.display="flex",clearTimeout(W),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",document.getElementById("btnPopupConfirm").onclick=()=>{M(),t&&t()},document.getElementById("customPopupClose").onclick=()=>{M()},document.getElementById("btnPopupCancel").onclick=()=>{M()}}function M(e){document.getElementById("customPopupOverlay").style.display="none",e&&e()}window.addEventListener("resize",Te),Te();const J=[{initials:"MD",name:"Dr. Miguel Antonio Dela Cruz",specialty:"General Veterinary Practitioner",phone:"0917-555-0101",email:"mdelacruz@pawtrack.ph",schedule:"Mon-Fri: 8am-4pm",clinic:"Quezon City Main Clinic",exp:"15 yrs exp",rating:"4.8"},{initials:"JS",name:"Dr. Joanna Marie R. Santos",specialty:"Veterinary Surgeon",phone:"0917-555-0102",email:"jmsantos@pawtrack.ph",schedule:"Tue-Sat: 10am-6pm",clinic:"Makati Pet Hospital",exp:"12 yrs exp",rating:"4.9"},{initials:"PV",name:"Dr. Paulo C. Villanueva",specialty:"Veterinary Oncologist",phone:"0917-555-0103",email:"pvillanueva@pawtrack.ph",schedule:"Mon-Thu: 9am-5pm",clinic:"BGC Animal Center",exp:"8 yrs exp",rating:"4.7"}];let S=0,F=[],q=[],D=0,$=null,V=[],ge=3;const Z=document.querySelectorAll(".sidebar-nav .nav-btn"),g=document.getElementById("mainDisplayPanel"),Pe=document.getElementById("profileTemplate").innerHTML,fe=document.getElementById("cartItemsContainer"),We=document.getElementById("cartTotalDisplay"),K=(e,a,t)=>`
        <div class="page-header">
            <div>
                <h2><i class="${t}"></i> ${e}</h2>
                <p>${a}</p>
            </div>
        </div>
    `;let se="";if(typeof E<"u"&&E.length>0){const e=E.filter(a=>a.status==="Available");e.length>0?e.forEach(a=>{const t=a.gender==="Female"?"gender-female":"gender-male",l=a.owner===h?`
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
                                    
                                    ${l}

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
                `}):se='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available for adoption.</p>'}else se='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available in the system.</p>';const Le=`
        <div class="page-container">
            ${K("Meet the Pets","Say hello to our furry friends currently waiting for a loving home.","fa-solid fa-paw")}
            <div class="pet-grid">
                ${se}
            </div>
        </div>
    `;function Xe(){let e="",a="";return typeof L<"u"&&L.length>0&&L.forEach(t=>{const i=t.status==="Approved",l=i?"var(--emerald-light, #D1FAE5)":"var(--amber-light, #FEF3C7)",n=i?"#065F46":"#92400E",r=`
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
                            <span style="background: ${l}; color: ${n}; padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
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
            `;i?a+=r:e+=r}),`
            <div class="page-container">
                ${K("My Applications","Track the journey of your adoption requests and welcome your new companion home.","fa-solid fa-clipboard-list")}
                
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
        `}const Je=()=>{let e="";return typeof Y<"u"&&Y.length>0?Y.forEach(a=>{const t=a.gender==="Female"?"gender-female":"gender-male";e+=`
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
        `},Ce=(e,a)=>`
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
    `;function Ze(){let e="";typeof C<"u"&&C.length>0?C.forEach(n=>{const o=n.status==="Approved",r=o?"appt-approved":"appt-pending",p=o?"badge-approved":"badge-pending",y=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],f=n.date.split("-"),v=f.length===3?y[parseInt(f[1])-1]:"TBD",b=f.length===3?f[2]:"??";e+=`
                    <div class="appt-mini-card ${r}">
                        <div class="appt-date-box"><strong>${b}</strong><span>${v}</span></div>
                        <img src="${n.img}" alt="${n.pet_name}" class="appt-pet-avatar" style="object-fit: cover;">
                        <div class="appt-details">
                            <h4>${n.pet_name}'s Visit</h4>
                            <p>${n.vet_name}</p>
                            <span class="badge ${p}">${n.status} • ${n.time}</span>
                        </div>
                        
                        ${o?"":`
                            <div style="margin-left: auto;">
                                <button class="btn-cancel-vet" data-appid="${n.appt_id||n.id}" title="Cancel Appointment" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        `}
                    </div>
                `}):e='<p style="color: #64748b; margin-top: 10px; font-weight: 500;">No upcoming appointments.</p>';let a="";const t=E.filter(n=>n.owner===h);let i=[];typeof C<"u"&&(i=C.filter(n=>n.status!=="Cancelled"&&n.status!=="Completed").map(n=>n.pet_name));const l=t.filter(n=>!i.includes(n.name));return l.length>0?l.forEach(n=>{const o=n.gender&&n.gender.toLowerCase()==="female"?"gender-female":"gender-male";a+=`
                    <div class="pet-select-card ${o}" data-petid="${n.id}">
                        <img src="${n.img}" alt="${n.name}">
                        <span>${n.name}</span>
                    </div>
                `}):t.length>0?a='<p style="color: #f59e0b; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-clock" style="margin-right: 5px;"></i> All your pets currently have scheduled appointments. You can book another once current visits are completed or cancelled.</p>':a=`<p style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> You don't have any registered pets yet! Please register a pet first.</p>`,`
            <div class="page-container">
                ${K("Veterinary Appointments","Schedule checkups, vaccinations, and consultations for your pets.","fa-solid fa-user-doctor")}
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
        `}const $e=[{id:1,brand:"NaturePet",name:"Nutricare Organic Dry Cat Food (1kg)",price:250,category:"Cat Food",img:"/static/resources/shop/catfood.jpg"},{id:2,brand:"PawSource",name:"100g Real Beef Dog Biscuit Treats",price:150,category:"Dog Food & Treats",img:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400"},{id:3,brand:"KONG",name:"Classic Durable Rubber Dog Toy",price:450,category:"Toys",img:"/static/resources/shop/dog_toy.jpg"},{id:4,brand:"Paws & Pals",name:"Heavy Duty Reflective Leash",price:299,category:"Accessories",img:"/static/resources/shop/leash.jpg"},{id:5,brand:"PetSafe",name:"Ceramic Anti-Slip Pet Bowl",price:180,category:"Accessories",img:"/static/resources/shop/bowl.jpg"},{id:6,brand:"CozyPet",name:"Fluffy Calming Pet Bed (Medium)",price:550,category:"Accessories",img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400"},{id:7,brand:"Whiskas",name:"Tuna Flavor Wet Cat Food (12 Pouch)",price:540,category:"Cat Food",img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"},{id:8,brand:"Pedigree",name:"Adult Beef & Veg Dry Dog Food (1.5kg)",price:380,category:"Dog Food & Treats",img:"/static/resources/shop/dogfood.jpg"},{id:9,brand:"FelineFun",name:"Interactive Feather Teaser Wand",price:95,category:"Toys",img:"https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400"},{id:10,brand:"GroomPro",name:"Silicone Pet Bath Massage Brush",price:110,category:"Grooming",img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400"}];function ke(e){if(e.length===0)return'<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 50px; font-size: 1.2rem;">No items match your filters.</p>';let a="";return e.forEach(t=>{a+=`
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
            `}),a}function Ke(){return`
            <div class="shop-layout" style="display: grid; grid-template-columns: 260px 1fr; gap: 30px; padding: 20px;">
                <div class="shop-sidebar glass-panel" style="align-self: start; padding: 25px;">
                    <h3 style="margin-bottom: 25px; color: #0f172a; font-size: 1.3rem;"><i class="fa-solid fa-sliders"></i> Filters</h3>
                    
                    <div class="filter-group">
                        <label class="filter-title" style="display: block; font-size: 0.85rem; color: #64748b; font-weight: bold; margin-bottom: 10px;">CATEGORY</label>
                        <select id="shopCategoryFilter" class="shop-select" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; color: #1e293b; background: white; outline: none; font-size: 1rem;">
                            <option value="All Categories">All Categories</option>
                            <option value="Dog Food & Treats">Dog Food & Treats</option>
                            <option value="Cat Food">Cat Food</option>
                            <option value="Toys">Toys</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Grooming">Grooming</option>
                        </select>
                    </div>

                    <div class="filter-group" style="margin-top: 30px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <label class="filter-title" style="font-size: 0.85rem; color: #64748b; font-weight: bold;">MAX PRICE</label>
                            <span id="shopPriceDisplay" style="font-size: 0.9rem; font-weight: bold; color: #ec4899;">₱1000</span>
                        </div>
                        <input type="range" id="shopPriceFilter" min="50" max="1000" step="10" value="1000" style="width: 100%; accent-color: #ec4899;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; margin-top: 5px; font-weight: bold;"><span>₱50</span><span>₱1,000</span></div>
                    </div>
                </div>

                <div class="shop-main">
                    <div class="shop-banner" style="background: linear-gradient(135deg, #a855f7, #ec4899); border-radius: 16px; padding: 35px 40px; color: white; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(236, 72, 153, 0.3);">
                        <div>
                            <h2 style="font-size: 2.2rem; margin: 0 0 10px 0; font-weight: 900;">PawShop Marketplace</h2>
                            <p style="margin: 0; font-size: 1.1rem; opacity: 0.9;">Discover premium quality products for your beloved pets.</p>
                        </div>
                        <div>
                            <button class="btn-cart" id="btnOpenCart" style="background: white; color: #ec4899; border: none; padding: 15px 30px; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 10px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fa-solid fa-cart-shopping"></i> View Cart 
                                <span class="cart-count" id="cartBadge" style="background: #ef4444; color: white; padding: 3px 10px; border-radius: 12px; font-size: 0.85rem;">0</span>
                            </button>
                        </div>
                    </div>
                    
                    <div id="shopGridContainer" class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 25px;">
                        ${ke($e)}
                    </div>
                </div>
            </div>
        `}const Qe=`
        <div class="registration-wrapper">
            ${K("Register a Pet","Fill in the details below to add a new pet to the system.","fa-solid fa-shield-cat")}
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
                    <div class="reg-row" style="background: rgba(79, 70, 229, 0.05); padding: 15px; border-radius: 12px; border: 1px solid #cbd5e1;">
    <div class="reg-input" style="flex-direction: row; align-items: center; gap: 15px;">
        <label style="margin-bottom: 0;">Put up for Adoption?</label>
        <input type="checkbox" id="regForAdoption" style="width: 25px; height: 25px; cursor: pointer;">
        <span style="font-size: 0.9rem; color: #64748b; font-weight: 600;">(Leave unchecked to save as a personal pet in your Roster)</span>
    </div>
</div>

                    <div class="reg-actions" style="margin-top: 10px;">
                        <button type="button" class="btn-cancel" id="btnCancelReg">Cancel</button>
                        <button type="submit" class="btn-submit">Register Pet</button>
                    </div>
                    
                </div>
            </form>
        </div>
    `;function Ae(){const e=E.filter(t=>t.owner===h&&t.status==="Private");let a="";return e.length>0?e.forEach(t=>{const i=t.gender==="Female"?"gender-female":"gender-male",l=t.img||"https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b";a+=`
                    <div class="my-pet-card ${i}" data-petid="${t.id}">
                        <img src="${l}" alt="${t.name}">
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
        `}function ne(){g.innerHTML=`
            <div class="page-container">
                ${K("Match Dashboard","Track pending requests and message approved matches.","fa-solid fa-mars-and-venus")}
                <div class="page-header" style="margin-top: -15px;">
                    <div></div>
                    <button class="btn-animated" id="btnBackToMatch" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Match Maker</button>
                </div>
                <div class="glass-panel" style="overflow-y: auto; flex:1;" id="matchDashboardContent">
                    <p style="text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">Loading matches...</p>
                </div>
            </div>
        `,Promise.resolve({status:"success",matches:ie}).then(e=>{if(e.status==="success"){let a='<div class="pairs-grid">';e.matches.length===0?a+='<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">You have no active matches or requests yet.</p>':e.matches.forEach(t=>{let i="",l="",n="";if(t.status==="pending"){const o=!t.is_sender,r=o?"Reject Match":"Cancel Request",p=o?"Are you sure you want to reject this match request?":"Are you sure you want to cancel your match request?";n=`
                                <button class="btn-delete-pair" data-matchid="${t.id}" data-title="${r}" data-msg="${p}" title="${o?"Reject":"Cancel Request"}" 
                                    style="position: absolute; top: 10px; right: 10px; z-index: 50; background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" 
                                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            `}t.status==="approved"?(l='<div class="pair-status approved">● Approved & Messaging</div>',i=`<button class="btn-animated btn-message-owner" data-owner="${t.ownerUsername}" style="width:100%; margin-top:10px; justify-content: center;"><i class="fa-regular fa-comment-dots"></i> Message Owner</button>`):t.status==="pending"&&t.is_sender?l='<div class="pair-status">● Pending Approval</div>':t.status==="pending"&&!t.is_sender&&(l='<div class="pair-status" style="color:#f59e0b; background:#fef3c7;">● Received Request!</div>',i=`<button class="btn-accept-match" data-matchid="${t.id}" style="width:100%; margin-top:10px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);"><i class="fa-solid fa-check"></i> Accept Match</button>`),a+=`
                            <div class="pair-card" style="position: relative; padding-top: 25px;">
                                ${n}
                                <div class="pair-images">
                                    <img src="${t.my_pet_img}" class="pair-img left">
                                    <div class="pair-heart-small"><i class="fa-solid fa-heart"></i></div>
                                    <img src="${t.their_pet_img}" class="pair-img right">
                                </div>
                                <div class="pair-names">${t.my_pet_name} & ${t.their_pet_name}</div>
                                ${l}
                                <div class="pair-date">@${t.ownerUsername}</div>
                                ${i}
                            </div>
                        `}),a+="</div>",document.getElementById("matchDashboardContent").innerHTML=a}})}function ve(){const e=E.filter(r=>r.owner===h).length,a=typeof C<"u"?C.filter(r=>r.status!=="Cancelled"&&r.status!=="Completed").length:0;let t="None",i="#64748b";typeof L<"u"&&L.length>0&&(t=L[0].status,t==="Approved"?i="#10b981":t==="Pending Review"&&(i="#f59e0b"));let l="";typeof C<"u"&&C.filter(r=>r.status!=="Cancelled"&&r.status!=="Completed").forEach(r=>{l+=`<div class="reminder-item warning"><div class="rem-icon"><i class="fa-solid fa-user-doctor"></i></div><div class="rem-text"><strong>${r.pet_name}'s Vet Visit</strong><small>${r.date} at ${r.time}</small></div></div>`}),typeof L<"u"&&L.filter(r=>r.status==="Approved").forEach(r=>{l+=`<div class="reminder-item success"><div class="rem-icon"><i class="fa-solid fa-check"></i></div><div class="rem-text"><strong>Adoption Approved!</strong><small>You can now finalize ${r.pet_name}'s adoption.</small></div></div>`}),l===""&&(l=`<div style="text-align:center; color:#64748b; padding:20px; font-weight:600;"><i class="fa-solid fa-mug-hot" style="font-size:2rem; margin-bottom:10px; color:#cbd5e1;"></i><br>You're all caught up!</div>`);const n=E.filter(r=>r.status==="Available");let o="";if(n.length>0){const r=Math.floor(Math.random()*n.length),p=n[r],y=p.gender==="Female"?'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>':'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>';o=`
                <div class="home-card featured-pet-card" style="flex: 1;">
                    <div class="featured-badge"><i class="fa-solid fa-star"></i> Pet of the Day</div>
                    <img src="${p.img}" alt="${p.name}" class="featured-img">
                    <div class="featured-info">
                        <h3>${p.name} ${y}</h3>
                        <p class="breed">${p.breed} • ${p.age}</p>
                        <p class="bio">${p.reason_for_adoption||p.personal_traits||"Looking for a loving forever home!"}</p>
                        <button class="btn-animated btn-adopt-potd" data-petid="${p.id}" data-petname="${p.name}" style="width: 100%; justify-content: center; margin-top: 10px;">Meet ${p.name}</button>
                    </div>
                </div>
            `}else o=`
                <div class="home-card featured-pet-card" style="flex: 1; display:flex; justify-content:center; align-items:center; background:#1e293b;">
                    <div style="text-align:center; color:white; z-index:2; padding:20px;">
                        <i class="fa-solid fa-shield-cat" style="font-size:3rem; margin-bottom:15px; color:#64748b;"></i>
                        <h3>No Pets Available</h3><p style="color:#cbd5e1; font-size:0.9rem; margin-top:10px;">Check back later for new arrivals!</p>
                    </div>
                </div>
            `;g.innerHTML=`
            <div class="home-container">
                <div class="home-banner">
                    <div class="banner-text"><h1>Welcome back, ${h}! 👋</h1><p>Here is what's happening with your furry friends today.</p></div>
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
                                ${l}
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-col">
                        ${o}
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
        `,Promise.resolve({status:"success",matches:ie}).then(r=>{const p=document.getElementById("homeMatchAlertsContainer");if(p)if(r.status==="success"&&r.matches.length>0){let y="";r.matches.slice(0,3).forEach(f=>{let v=f.status==="approved"?"Approved Match!":"Pending Request",b=f.status==="approved"?"💌":"⏳";y+=`
                        <div class="match-alert-item" style="cursor:pointer;" onclick="document.querySelector('[data-target=\\'breeding\\']').click()">
                            <img src="${f.their_pet_img}" alt="Pet">
                            <div class="alert-text"><strong>${f.their_pet_name} ${b}</strong><span>${v}</span></div>
                            <button class="btn-small-view">View</button>
                        </div>
                    `}),p.innerHTML=y}else p.innerHTML='<p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">No recent match activity.</p>'}),fetch("https://api.open-meteo.com/v1/forecast?latitude=14.6488&longitude=121.0509&current_weather=true").then(r=>r.json()).then(r=>{const p=Math.round(r.current_weather.temperature),y=r.current_weather.weathercode,f=document.getElementById("weatherTemp"),v=document.getElementById("weatherIcon"),b=document.getElementById("weatherText");f&&v&&b&&(f.innerText=`${p}°C`,y<=3?(v.className="fa-solid fa-sun weather-icon",v.style.color="#fef08a",b.innerHTML="<strong>Perfect time for a walk!</strong><br>The weather is great today. Take your pets out before it gets too hot."):y>=51&&y<=67||y>=80?(v.className="fa-solid fa-cloud-rain weather-icon",v.style.color="#bae6fd",b.innerHTML="<strong>It's a bit rainy!</strong><br>Keep your pets dry indoors today. A good time for some indoor training!"):(v.className="fa-solid fa-cloud weather-icon",v.style.color="#e2e8f0",b.innerHTML="<strong>Nice and cool!</strong><br>A great day for some indoor play or a quick stroll around the neighborhood."))}).catch(r=>console.error("Weather fetch error:",r)),setTimeout(()=>{const r=document.querySelector(".btn-adopt-potd");r&&r.addEventListener("click",p=>{const y=p.target.getAttribute("data-petid"),f=p.target.getAttribute("data-petname");g.innerHTML=Ce(y,f),document.querySelectorAll(".sidebar-nav .nav-btn").forEach(v=>v.classList.remove("active")),document.querySelector('[data-target="pets"]').classList.add("active")})},100)}ve();function Q(){const e=J[S],a=document.getElementById("vetInitials");if(!a)return;a.innerText=e.initials,document.getElementById("vetNameDisplay").innerText=e.name,document.getElementById("vetSpecialtyDisplay").innerText=e.specialty,document.getElementById("vetRatingDisplay").innerText=`⭐ ${e.rating} (${e.exp})`,document.getElementById("vetPhoneDisplay").innerText=e.phone,document.getElementById("vetEmailDisplay").innerText=e.email,document.getElementById("vetScheduleDisplay").innerText=e.schedule,document.getElementById("vetClinicDisplay").innerText=e.clinic;const t=document.getElementById("apptVetIdHidden").value,i=document.getElementById("btnSelectVet");t===S.toString()?(i.innerText="✅ Confirmed",i.classList.add("selected")):(i.innerText="Confirm",i.classList.remove("selected"))}function ee(){const e=document.getElementById("cartBadge");e&&(e.innerText=F.length),fe.innerHTML="";let a=0;F.length===0?fe.innerHTML='<p style="text-align:center; color:#64748b; font-weight:bold; margin-top: 50px;">Your cart is empty.</p>':F.forEach((t,i)=>{a+=parseFloat(t.price),fe.innerHTML+=`
                    <div class="cart-item-row">
                        <img src="${t.img}" class="cart-item-img">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${t.name}</div>
                            <div class="cart-item-price">₱ ${t.price}</div>
                        </div>
                        <div><button class="btn-remove-item" data-index="${i}" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></div>
                    </div>
                `}),We.innerText=`₱ ${a.toFixed(2)}`}window.handleRewind=e=>{V.splice(e,1),D=Math.max(0,D-1),ye()};function et(){const e=document.getElementById("rewindList");e&&(e.innerHTML="",V.length===0?e.innerHTML=`
                <div style="text-align:center; padding: 20px; opacity:0.5;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="font-size:0.85rem; font-weight:600;">History is empty</p>
                </div>`:V.forEach((a,t)=>{e.innerHTML+=`
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
                `}))}function ye(){if(q.length===0||D>=q.length){document.getElementById("datingContentLayout").style.display="none";const o=document.getElementById("instructionOverlay");o.style.display="flex",o.innerHTML='<i class="fa-solid fa-face-frown-open" style="color: #cbd5e1; font-size: 4rem; margin-bottom: 15px;"></i><p>No more matches available<br>for this pet at the moment.</p>';return}const e=q[D];currentPhotoIndex=0;const a=document.getElementById("candThumbnails");a.innerHTML="",e.imgs.forEach((o,r)=>{a.innerHTML+=`<img src="${o}" class="cand-thumb ${r===0?"active":""}" data-index="${r}" alt="Photo ${r+1}">`}),Me(e,0);const t=e.gender==="Male"?'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>':'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>';document.getElementById("candNameAge").innerHTML=`${e.name}, ${e.age} ${t}`,document.getElementById("candBreedGender").innerHTML=`<i class="fa-solid fa-paw"></i> ${e.breed}`,document.getElementById("candDesc").innerText=e.desc,document.getElementById("candScoreText").innerText=`${e.score}% Match`,document.getElementById("candScoreBar").style.width=`${e.score}%`;const i=document.getElementById("candBadges");i.innerHTML="",e.badges.includes("vet")&&(i.innerHTML+='<span class="v-badge badge-vet"><i class="fa-solid fa-stethoscope"></i> Vet Verified</span>'),e.badges.includes("pedigree")&&(i.innerHTML+='<span class="v-badge badge-pedigree"><i class="fa-solid fa-dna"></i> Purebred</span>'),e.badges.includes("vax")&&(i.innerHTML+='<span class="v-badge badge-vax"><i class="fa-solid fa-syringe"></i> Vaccinated</span>');const l=document.getElementById("candTraits");l.innerHTML="",e.traits.forEach(o=>{l.innerHTML+=`<span class="trait-tag">${o}</span>`}),document.getElementById("candOwnerName").innerText=e.ownerName,document.getElementById("candOwnerInitial").innerText=e.ownerInitial,document.getElementById("candOwnerRating").innerText=`⭐ ${e.ownerRating}`,document.getElementById("candOwnerPairs").innerText=`${e.successPairs} Successful Pairs`,document.getElementById("barSize").style.width=`${e.compSize}%`,document.getElementById("txtSize").innerText=`${e.compSize}%`,document.getElementById("barEnergy").style.width=`${e.compEnergy}%`,document.getElementById("txtEnergy").innerText=`${e.compEnergy}%`,document.getElementById("barTemp").style.width=`${e.compTemp}%`,document.getElementById("txtTemp").innerText=`${e.compTemp}%`;const n=document.getElementById("litterPredictor");n.innerHTML="",e.litter.forEach(o=>{const r=o.c==="#FFFFFF"||o.c==="#FFF8DC"?"#0f172a":"white";n.innerHTML+=`<div class="color-swatch" style="background:${o.c}; color:${r};">${o.p}%</div>`}),document.getElementById("instructionOverlay").style.display="none",document.getElementById("datingContentLayout").style.display="flex",document.getElementById("treatCountDisplay").innerText=`${ge} Left`,et()}function Me(e,a){const t=document.getElementById("candImg");t.style.opacity=0,setTimeout(()=>{t.src=e.imgs[a],t.style.opacity=1},150),document.querySelectorAll(".cand-thumb").forEach((i,l)=>{l===parseInt(a)?i.classList.add("active"):i.classList.remove("active")})}Z.forEach(e=>{e.addEventListener("click",function(){Z.forEach(t=>t.classList.remove("active")),this.classList.add("active");const a=this.getAttribute("data-target");g.scrollTo({top:0,behavior:"smooth"}),a==="home"?ve():a==="pets"?g.innerHTML=Le:a==="applications"?g.innerHTML=Xe():a==="vet"?(g.innerHTML=Ze(),Q()):a==="shop"?(g.innerHTML=Ke(),ee()):a==="breeding"&&(g.innerHTML=Ae(),$=null)})}),document.getElementById("btnViewProfile").addEventListener("click",()=>{Z.forEach(e=>e.classList.remove("active")),g.scrollTo({top:0,behavior:"smooth"}),g.innerHTML=Pe,De()}),document.getElementById("btnRegisterPet").addEventListener("click",()=>{Z.forEach(l=>l.classList.remove("active")),g.scrollTo({top:0,behavior:"smooth"}),g.innerHTML=Qe;const e=document.getElementById("imageDropZone"),a=document.getElementById("petImageInput"),t=document.getElementById("imagePreview"),i=document.getElementById("dropZoneText");e.addEventListener("click",()=>a.click()),Ie=null,a.addEventListener("change",function(){if(this.files&&this.files[0]){Ie=this.files[0];const l=new FileReader;l.onload=function(n){t.src=n.target.result,t.style.display="block",i.style.display="none"},l.readAsDataURL(this.files[0])}}),document.getElementById("btnCancelReg").addEventListener("click",()=>{ve(),Z[0].classList.add("active")})}),g.addEventListener("click",async e=>{if(e.target.closest("#btnMatchRegisterPet")){document.getElementById("btnRegisterPet").click();return}if(e.target.classList.contains("profile-tab-btn")){document.querySelectorAll(".profile-tab-btn").forEach(s=>s.classList.remove("active")),document.querySelectorAll(".profile-tab-content").forEach(s=>s.classList.remove("active")),e.target.classList.add("active");const d=e.target.getAttribute("data-tab");document.getElementById(d).classList.add("active")}const t=e.target.closest(".btn-view-app")||e.target.closest(".btn-view-pet");if(t){const d=t.getAttribute("data-target"),s=document.getElementById(d),c=t.closest(".app-card")||t.closest(".pet-card");s.style.display==="block"?(s.style.display="none",c.classList.remove("dropdown-open")):(s.style.display="block",c.classList.add("dropdown-open"))}const i=e.target.closest(".btn-close-pet");if(i){const d=i.getAttribute("data-target"),s=document.getElementById(d),c=s.previousElementSibling;s.style.display="none",c.classList.remove("dropdown-open")}const l=e.target.closest(".btn-adopt");if(l){const d=l.getAttribute("data-petid"),s=l.getAttribute("data-petname");g.innerHTML=Ce(d,s)}e.target.closest("#btnBackToPets")&&(g.innerHTML=Le),e.target.closest(".btn-edit-profile")&&(document.getElementById("editProfileModal").style.display="flex");const n=e.target.closest(".btn-archive-pet");if(n){const d=n.getAttribute("data-petid");X("Move to Bin?","Are you sure you want to move this pet to the Recycle Bin?",async()=>{const s=E.find(c=>c.id===d);if(!s){u("Error","Pet record not found.",!0);return}try{await x.createDocument(w,pe,R.unique(),{name:s.name,breed:s.breed,gender:s.gender,owner:h,img:s.img||""}),await x.deleteDocument(w,ce,d),await B("Moved a pet to the Recycle Bin",s.name,"fa-trash-can"),u("Moved to Bin","Pet successfully moved to Recycle Bin.",!1,()=>{window.location.reload()})}catch(c){console.error("Appwrite Move to Bin Error:",c),u("Error",c.message,!0)}})}e.target.closest("#btnViewBin")&&(g.innerHTML=Je()),e.target.closest("#btnEmptyBin")&&X("Empty Bin?","WARNING: Are you sure you want to permanently delete ALL pets in the Recycle Bin? This cannot be undone!",async()=>{try{for(const d of Y)await x.deleteDocument(w,pe,d.id);await B("Permanently emptied the Recycle Bin","","fa-dumpster-fire"),u("Bin Emptied","Recycle bin emptied successfully.",!1,()=>{window.location.reload()})}catch(d){console.error("Appwrite Empty Bin Error:",d),u("Error",d.message,!0)}}),e.target.closest("#btnBackToProfile")&&(g.innerHTML=Pe,De());const o=e.target.closest(".btn-restore-pet");if(o){const d=o.getAttribute("data-petid"),s=Y.find(c=>c.id===d);if(s)try{await x.createDocument(w,ce,R.unique(),{name:s.name,breed:s.breed,gender:s.gender,age:"1 yr",status:"Available",health_status:"Healthy",owner:h,contact_number:G||"0917-000-0000",personal_traits:"Friendly",reason_for_adoption:"Restored from Recycle Bin",img:s.img||""}),await x.deleteDocument(w,pe,d),await B("Restored a pet from the Recycle Bin",s.name,"fa-rotate-left"),u("Restored!","Pet has been restored to the active board!",!1,()=>{window.location.reload()})}catch(c){console.error("Appwrite Restore Error:",c),u("Error",c.message,!0)}}const r=e.target.closest(".btn-cancel-app");if(r){const d=r.getAttribute("data-appid");X("Cancel Application?","Are you sure you want to cancel this application?",async()=>{try{await x.deleteDocument(w,Ee,d),await B("Cancelled adoption application","","fa-file-circle-xmark"),u("Cancelled","Application successfully cancelled.",!1,()=>{window.location.reload()})}catch(s){console.error("Appwrite Cancel App Error:",s),u("Error",s.message,!0)}})}const p=e.target.closest(".btn-cancel-vet");if(p){const d=p.getAttribute("data-appid");X("Cancel Appointment?","Are you sure you want to cancel this veterinary appointment?",async()=>{try{await x.deleteDocument(w,Be,d),await B("Cancelled veterinary appointment","","fa-calendar-xmark"),u("Cancelled","Appointment successfully cancelled.",!1,()=>{window.location.reload()})}catch(s){console.error("Appwrite Cancel Vet Error:",s),u("Error",s.message,!0)}})}const y=e.target.closest(".pet-select-card");if(y&&document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".pet-select-card").forEach(c=>c.classList.remove("selected")),y.classList.add("selected");const d=y.getAttribute("data-pet");document.getElementById("apptPetSelectorHidden").value=d;const s=myPetsDB[d];s&&(document.getElementById("apptOwner").value=s.owner,document.getElementById("apptPetType").value=s.type,document.getElementById("apptBreed").value=s.breed,document.getElementById("apptGender").value=s.gender,document.getElementById("apptWeight").value=s.weight)}if(e.target.closest("#btnPrevVet")&&(S=(S-1+J.length)%J.length,Q()),e.target.closest("#btnNextVet")&&(S=(S+1)%J.length,Q()),e.target.closest("#btnSelectVet")){const d=J[S];document.getElementById("apptVetIdHidden").value=S,document.getElementById("apptSelectedVetName").value=d.name,Q()}if(e.target.classList.contains("btn-add-cart")){F.push({name:e.target.getAttribute("data-name"),price:e.target.getAttribute("data-price"),img:e.target.getAttribute("data-img")}),ee();const d=e.target.innerText;e.target.innerText="✓ Added",e.target.style.background="#10b981",e.target.style.color="white",e.target.style.borderColor="#10b981",setTimeout(()=>{e.target.innerText=d,e.target.style.background="white",e.target.style.color="#4f46e5",e.target.style.borderColor="#4f46e5"},1e3)}if(e.target.classList.contains("btn-buy-now")){const s=e.target.closest(".shop-card").querySelector(".btn-add-cart");F.push({name:s.getAttribute("data-name"),price:s.getAttribute("data-price"),img:s.getAttribute("data-img")}),ee(),document.getElementById("cartModalOverlay").style.display="flex"}e.target.closest("#btnOpenCart")&&(document.getElementById("cartModalOverlay").style.display="flex"),e.target.closest(".mode-btn")&&(document.querySelectorAll(".mode-btn").forEach(d=>d.classList.remove("active")),e.target.closest(".mode-btn").classList.add("active"),$&&document.querySelector(`[data-pet="${$}"]`).click());const f=e.target.closest(".pet-select-card");if(f&&document.getElementById("vetBookingForm")){document.querySelectorAll(".pet-select-card").forEach(c=>c.classList.remove("selected")),f.classList.add("selected");const d=f.getAttribute("data-petid");document.getElementById("apptPetSelectorHidden").value=d;const s=E.find(c=>c.id.toString()===d);s&&(document.getElementById("apptOwner").value=h,document.getElementById("apptPetType").value=s.breed&&s.breed.toLowerCase().includes("cat")?"Cat":"Dog",document.getElementById("apptBreed").value=s.breed||"Unknown",document.getElementById("apptGender").value=s.gender||"Unknown")}const v=e.target.closest(".my-pet-card");if(v&&!document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".my-pet-card").forEach(s=>s.classList.remove("active")),v.classList.add("active"),$=v.getAttribute("data-petid"),E.find(s=>s.id.toString()===$),document.getElementById("datingContentLayout").style.display="none";const d=document.getElementById("instructionOverlay");d.style.display="flex",d.innerHTML='<div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div><p>Scanning database for verified matches...</p>',Promise.resolve().then(()=>({status:"success",candidates:E.filter(c=>c.owner!==h).map(c=>({id:c.id,name:c.name,breed:c.breed,gender:c.gender,age:c.age,photos:[c.img],imgs:[c.img],owner:c.owner||"PawUser",ownerName:c.owner||"PawUser",score:94,traits:c.personal_traits?c.personal_traits.split(",").map(m=>m.trim()):["Playful","Friendly"],desc:c.reason_for_adoption||"Looking for a friend!",verified:!0}))})).then(s=>{s.status==="success"&&s.candidates.length>0?(q=s.candidates,D=0,setTimeout(()=>{ye()},800)):d.innerHTML='<p style="color:#64748b; font-weight:bold; font-size:1.1rem;">No match candidates available right now. Invite friends or register more pets!</p>'})}const b=e.target.closest(".cand-thumb");if(b){const d=q[D];Me(d,b.getAttribute("data-index"))}const T=e.target.closest("#btnPassCandidate"),te=e.target.closest("#btnMatchCandidate"),re=e.target.closest("#btnTreatCandidate");if(T||te||re){const d=q[D],s=E.find(m=>m.id.toString()===$);let c="pass";if(te&&(c="like"),re&&(c="super_like"),c==="super_like"&&ge<=0){u("Out of Treats","You have used all your Super Treats for today! Come back tomorrow.",!0);return}Promise.resolve({status:"success",isMatch:!0}).then(m=>{if(m.status==="success"){if(c==="super_like"&&ge--,V.unshift(d),V.length>5&&V.pop(),c!=="pass"){B(c==="super_like"?"Sent a Super Treat to":"Sent a match request to",d.name,"fa-heart"),document.getElementById("matchImgLeft").src=s.img,document.getElementById("matchImgRight").src=d.imgs[0],document.getElementById("matchNameLeft").innerText=s.name,document.getElementById("matchNameRight").innerText=d.name;const I=m.isMatch?"✨ IT'S A MATCH! ✨":c==="super_like"?"Super Liked! 🦴 (Pending)":"Pending Owner Approval";document.getElementById("matchDateSpot").innerText="PawTrack Verified";const P=document.getElementById("matchIcebreaker");P.value=m.isMatch?"You matched! Let's plan a playdate!":"",P.placeholder=m.isMatch?"Type a message...":`Say hi to ${d.ownerName} while you wait...`,document.getElementById("btnContinueMatch").setAttribute("data-targetuser",d.ownerName),document.getElementById("matchOverlay").style.display="flex",activePairs.unshift({id:"p"+Date.now(),maleName:s.gender==="Male"?s.name:d.name,femaleName:s.gender==="Female"?s.name:d.name,maleImg:s.gender==="Male"?s.img:d.imgs[0],femaleImg:s.gender==="Female"?s.img:d.imgs[0],status:I,isApproved:m.isMatch,date:"Just Now",ownerUsername:d.ownerName})}D++,ye()}else u("Error",m.message,!0)}).catch(m=>console.error("Swipe Error:",m))}e.target.closest("#btnOpenPrefs")&&(document.getElementById("prefModal").style.display="flex"),e.target.closest("#btnViewActivePairs")&&ne(),e.target.closest("#btnBackToMatch")&&(g.innerHTML=Ae(),$=null);const U=e.target.closest(".btn-accept-match"),_=e.target.closest(".btn-delete-pair");if(U||_){const d=U?"accept":"delete",s=(U||_).getAttribute("data-matchid");if(d==="delete"){const c=_.getAttribute("data-title")||"Cancel Request",m=_.getAttribute("data-msg")||"Are you sure you want to remove this match?";X(c,m,()=>{ie=ie.filter(I=>I.id!==s),ne()})}else{const c=ie.find(m=>m.id===s);c&&(c.status="approved"),ne()}}}),document.getElementById("btnCloseCart").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnContinueShopping").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnCheckout").addEventListener("click",()=>{if(F.length===0){u("Empty Cart","Your cart is empty! Please add some items first.",!0);return}B("Completed a Pet Shop checkout","","fa-bag-shopping"),F=[],ee(),document.getElementById("cartModalOverlay").style.display="none",u("Order Placed!","Order placed successfully! Thank you for shopping.",!1)}),document.getElementById("cartItemsContainer").addEventListener("click",e=>{const a=e.target.closest(".btn-remove-item");a&&(F.splice(parseInt(a.getAttribute("data-index")),1),ee())}),document.getElementById("btnContinueMatch").addEventListener("click",e=>{const a=e.target.getAttribute("data-targetuser"),t=document.getElementById("matchIcebreaker").value.trim();t&&a&&(A[a]||(A[a]=[]),A[a].push({text:t,type:"sent",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),B("Sent an Icebreaker message to",a,"fa-comment-dots")),document.getElementById("matchOverlay").style.display="none",ne()}),document.getElementById("btnSavePrefs").addEventListener("click",()=>{document.getElementById("prefModal").style.display="none",$&&document.querySelector(`[data-pet="${$}"]`).click()}),document.getElementById("prefModal").addEventListener("click",e=>{e.target===document.getElementById("prefModal")&&(document.getElementById("prefModal").style.display="none")}),g.addEventListener("submit",e=>{if(e.target.id==="vetBookingForm"){e.preventDefault();const a=document.getElementById("apptPetSelectorHidden").value,t=document.getElementById("apptVetIdHidden").value;if(!a){u("Error","Please select a pet for the appointment by clicking their picture!",!0);return}if(!t){u("Error","Please choose a veterinarian by clicking 'Confirm' on the profile card!",!0);return}const i=document.querySelector(`.pet-select-card[data-petid="${a}"] span`).innerText,l=document.getElementById("apptSelectedVetName").value,n=E.find(o=>{var r;return((r=o.id)==null?void 0:r.toString())===(a==null?void 0:a.toString())});(async()=>{try{await x.createDocument(w,Be,R.unique(),{pet_name:i,vet_name:l,status:"Upcoming",time:document.getElementById("apptTime").value||"",date:document.getElementById("apptDate").value||"",user_id:N,img:(n==null?void 0:n.img)||""}),await B("Booked vet visit for",i,"fa-user-doctor"),u("Request Sent!","Appointment scheduled successfully! It is now Upcoming.",!1,()=>{window.location.reload()})}catch(o){console.error("Appwrite Vet Booking Error:",o),u("Error",o.message,!0)}})()}if(e.target.id==="adoptionApplicationForm"){if(e.preventDefault(),!document.getElementById("adoptTerms").checked){u("Missing Requirement","You must agree to the terms and conditions.",!0);return}const a=document.getElementById("adoptPetId").value,t=document.getElementById("adoptPetName").value,i=E.find(l=>{var n;return((n=l.id)==null?void 0:n.toString())===(a==null?void 0:a.toString())});(async()=>{try{await x.createDocument(w,Ee,R.unique(),{pet_name:t,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status:"Pending Review",user_id:N,img:(i==null?void 0:i.img)||""}),await B("Applied to adopt",t,"fa-house-chimney-user"),u("Application Sent!","Successfully submitted! Status: PENDING REVIEW.",!1,()=>{window.location.reload()})}catch(l){console.error("Appwrite Adoption Application Error:",l),u("Error",l.message,!0)}})()}(e.target.id==="petRegistrationForm"||e.target.id==="registerPetForm")&&(e.preventDefault(),(async()=>{var p,y,f,v,b;const a=document.getElementById("petImageInput"),t=Ie||a&&a.files&&a.files[0];let i="";if(t)try{u("Uploading Photo","Saving pet photo to PawTrack Storage...",!1);const T=await de.createFile(me,R.unique(),t);i=de.getFileView(me,T.$id).toString()}catch(T){console.error("Storage upload failed:",T)}i||(i="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80");const l=document.getElementById("regForAdoption"),n=l?l.checked:!0,o=new FormData(e.target),r={name:o.get("name")||((p=document.getElementById("regPetName"))==null?void 0:p.value)||"Unnamed Pet",breed:o.get("breed")||((y=document.getElementById("regBreed"))==null?void 0:y.value)||"Mixed Breed",gender:o.get("gender")||((f=document.getElementById("regGender"))==null?void 0:f.value)||"Male",age:o.get("age")||((v=document.getElementById("regAge"))==null?void 0:v.value)||"1 yr",status:n?"Available":"Private",health_status:o.get("health_status")||"Healthy / Vaccinated",owner:h,contact_number:o.get("contact_number")||G||"0917-000-0000",personal_traits:o.get("personal_traits")||((b=document.getElementById("regDesc"))==null?void 0:b.value)||"Friendly",reason_for_adoption:o.get("reason_for_adoption")||(n?"Looking for a home":"Personal pet"),img:i};try{await x.createDocument(w,ce,R.unique(),r),await B(n?"Listed pet for adoption":"Registered private pet",r.name,"fa-shield-cat"),u("Success!",n?"Pet Registered Successfully! Photo saved to PawTrack Storage and listed on the adoption board.":"Pet added to your personal roster! Photo saved to PawTrack Storage.",!1,()=>{window.location.reload()})}catch(T){console.error("Appwrite Pet Registration Error:",T),u("Error","Could not register pet: "+T.message,!0)}})())}),g.addEventListener("reset",e=>{e.target.id==="vetBookingForm"&&(document.querySelectorAll(".pet-select-card").forEach(a=>a.classList.remove("selected")),document.getElementById("apptPetSelectorHidden")&&(document.getElementById("apptPetSelectorHidden").value=""),document.getElementById("apptVetIdHidden")&&(document.getElementById("apptVetIdHidden").value=""),setTimeout(()=>{Q()},10))});const Se=document.getElementById("editProfileForm");Se&&Se.addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("editFirstName").value,t=document.getElementById("editLastName").value,i=document.getElementById("editContact").value,l=`${a} ${t}`.trim();try{l&&await ae.updateName(l),await ae.updatePrefs({...z,phone:i}),h=l,G=i,await B("Updated profile settings & information","","fa-user-pen"),document.getElementById("editProfileModal").style.display="none",u("Profile Saved","Profile updated successfully!",!1,()=>{window.location.reload()})}catch(n){u("Error",n.message,!0)}}),g.addEventListener("input",e=>{e.target.id==="shopPriceFilter"&&(document.getElementById("shopPriceDisplay").innerText=`₱${e.target.value}`,Fe())}),g.addEventListener("change",e=>{e.target.id==="shopCategoryFilter"&&Fe()});function Fe(){const e=document.getElementById("shopCategoryFilter").value,a=parseFloat(document.getElementById("shopPriceFilter").value),t=$e.filter(i=>{const l=e==="All Categories"||i.category===e,n=i.price<=a;return l&&n});document.getElementById("shopGridContainer").innerHTML=ke(t)}async function De(){const e=document.getElementById("mainProfilePic");e&&(e.src=z.avatarUrl||"/resources/avatar/Avatar 1.jpg");const a=document.getElementById("btnChangeAvatar")||document.querySelector(".btn-change-photo"),t=document.getElementById("avatarFileInput");a&&t&&(a.onclick=()=>t.click(),t.onchange=async function(){if(this.files&&this.files[0])try{u("Uploading","Uploading avatar to PawTrack Storage...",!1);const m=await de.createFile(me,R.unique(),this.files[0]),I=de.getFileView(me,m.$id).toString();await ae.updatePrefs({...z,avatarUrl:I}),z.avatarUrl=I,e&&(e.src=I),await B("Updated profile picture","Saved to PawTrack Storage","fa-camera"),u("Success","Profile photo uploaded to PawTrack Storage!")}catch(m){u("Error","Failed to upload photo: "+m.message,!0)}});const i=document.getElementById("profileFullName"),l=document.getElementById("profileUsername"),n=document.getElementById("profileEmail"),o=document.getElementById("profilePhone");i&&(i.innerText=h),l&&(l.innerText=z.username?"@"+z.username:"@"+ue.split("@")[0]),n&&(n.innerText=ue),o&&(o.innerText=G||"None");const[r="",...p]=(h||"").split(" "),y=p.join(" "),f=document.getElementById("editFirstName"),v=document.getElementById("editLastName"),b=document.getElementById("editContact"),T=document.getElementById("editEmail");f&&(f.value=r),v&&(v.value=y),b&&(b.value=G||""),T&&(T.value=ue||"");const te=E.filter(m=>m.owner===h),re=L.filter(m=>m.status==="Approved").length,U=document.getElementById("countOwnedPets"),_=document.getElementById("countSuccessfulApps");U&&(U.innerText=te.length),_&&(_.innerText=re);const d=document.getElementById("privateRosterGrid"),s=document.getElementById("adoptionRosterGrid");d&&s&&(d.innerHTML="",s.innerHTML="",te.forEach(m=>{const I=`
                    <div class="roster-card">
                        <img src="${m.img}" class="roster-img">
                        <div class="roster-info"><h4>${m.name}</h4><p>${m.breed}</p></div>
                        <button class="btn-archive-pet" data-petid="${m.id}" title="Move to Bin" 
                            style="background: white; border: 2px solid #ef4444; color: #ef4444; padding: 6px 15px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s;" 
                            onmouseover="this.style.background='#ef4444'; this.style.color='white';" 
                            onmouseout="this.style.background='white'; this.style.color='#ef4444';">
                            <i class="fa-solid fa-trash-can"></i> Bin
                        </button>
                    </div>
                `;m.status==="Private"?d.innerHTML+=I:s.innerHTML+=I}));const c=document.getElementById("recentActivityLogs");if(c){c.innerHTML='<div class="activity-loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading activity logs...</div>';try{const m=await x.listDocuments(w,Ge,[j.equal("user_id",N),j.orderDesc("$createdAt"),j.limit(20)]);c.innerHTML="";const I=m.documents;I.length>0?I.forEach(P=>{const nt=parseInt(P.timestamp)||new Date(P.$createdAt).getTime(),ot=at(nt),le=tt(P.action,P.icon),je=P.target?Re(P.target):"",rt=Re(P.action||"Activity recorded");c.innerHTML+=`
                            <div class="activity-item">
                                <div class="activity-icon-bubble ${le.themeClass}">
                                    <i class="fa-solid ${le.icon}"></i>
                                </div>
                                <div class="activity-details">
                                    <div class="activity-row-main">
                                        <span class="activity-action-text">${rt}</span>
                                        <span class="activity-category-pill ${le.tagClass}">${le.tagLabel}</span>
                                    </div>
                                    ${je?`
                                        <div class="activity-target-pill">
                                            <i class="fa-solid fa-quote-left"></i>
                                            <span>${je}</span>
                                        </div>
                                    `:""}
                                    <div class="activity-meta">
                                        <span class="activity-timestamp"><i class="fa-regular fa-clock"></i> ${ot}</span>
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
                    `}catch(m){console.warn("Could not load activity logs:",m),c.innerHTML=`
                    <div class="activity-empty-state">
                        <div class="empty-icon-circle"><i class="fa-solid fa-circle-info"></i></div>
                        <h4>No Activity Recorded</h4>
                        <p>No past logs found for your account yet.</p>
                    </div>
                `}}}function Re(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}function tt(e,a){const t=(e||"").toLowerCase();if(t.includes("log")||t.includes("auth")||t.includes("verified")||t.includes("session"))return{themeClass:"theme-emerald",icon:"fa-shield-halved",tagClass:"tag-emerald",tagLabel:"Security"};if(t.includes("bin")||t.includes("delet")||t.includes("dumpster")||t.includes("trash"))return{themeClass:"theme-rose",icon:"fa-trash-can",tagClass:"tag-rose",tagLabel:"Archive"};if(t.includes("pet")||t.includes("adopt")||t.includes("restor")||t.includes("breed"))return{themeClass:"theme-terracotta",icon:"fa-paw",tagClass:"tag-terracotta",tagLabel:"Pet Care"};if(t.includes("photo")||t.includes("avatar")||t.includes("profile")||t.includes("settings"))return{themeClass:"theme-honey",icon:"fa-user-pen",tagClass:"tag-honey",tagLabel:"Profile"};if(t.includes("shop")||t.includes("cart")||t.includes("item")||t.includes("buy"))return{themeClass:"theme-amber",icon:"fa-bag-shopping",tagClass:"tag-amber",tagLabel:"Shop"};let i=a||"fa-bell";return i==="fa-right-to-bracket"&&(i="fa-arrow-right-to-bracket"),{themeClass:"theme-sage",icon:i,tagClass:"tag-sage",tagLabel:"Activity"}}function at(e){const a=Date.now(),t=Math.max(0,a-e),i=60*1e3,l=60*i,n=24*l,o=new Date(e),r=o.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return t<2*i?"Just now":t<60*i?`${Math.floor(t/i)}m ago`:t<24*l?`${Math.floor(t/l)}h ago (${r})`:new Date(a-n).toDateString()===o.toDateString()?`Yesterday at ${r}`:o.toLocaleDateString(void 0,{month:"short",day:"numeric"})+` at ${r}`}const He=document.getElementById("chatFab"),oe=document.getElementById("chatWindow"),it=document.getElementById("chatCloseBtn"),he=document.getElementById("chatBackBtn"),be=document.getElementById("btnNewChat"),_e=document.getElementById("chatTitle"),H=document.getElementById("chatListView"),Ne=document.getElementById("chatConvoView"),k=document.getElementById("chatMessagesBox"),xe=document.getElementById("chatInputField"),st=document.getElementById("btnSendMsg");let O=null;He.addEventListener("click",()=>{oe.classList.toggle("active"),oe.classList.contains("active")&&qe()}),it.addEventListener("click",()=>oe.classList.remove("active"));const ze=document.getElementById("btnLogout");ze&&ze.addEventListener("click",async()=>{try{await ae.deleteSession("current")}catch(e){console.warn(e)}window.location.href="/PawTrackLogin.html"});function qe(){Ne.style.display="none",H.style.display="flex",he.style.display="none",be.style.display="flex",_e.innerHTML='<i class="fa-solid fa-messages"></i> Messages',O=null,H.innerHTML='<p style="text-align:center; margin-top:20px; color:#64748b;">Loading...</p>',Promise.resolve().then(()=>({status:"success",inbox:Object.keys(A).map(a=>{const t=A[a],i=t[t.length-1];return{contact:a,last_message:i.text,time:i.time,unread:0}})})).then(e=>{if(e.status==="success"){if(H.innerHTML="",e.inbox.length===0){H.innerHTML='<p style="text-align:center; margin-top:20px; color:#64748b; font-weight:bold;">No messages yet.<br><br>Click the + icon to start a chat with a username!</p>';return}e.inbox.forEach(a=>{const t=a.unread>0?`<span class="chat-unread">${a.unread}</span>`:"";H.innerHTML+=`
                        <div class="chat-list-item" data-chat="${a.contact}">
                            <div class="chat-avatar ai-avatar" style="background: linear-gradient(135deg, #4f46e5, #ec4899);"><i class="fa-solid fa-user"></i></div>
                            <div class="chat-list-info">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <h4>@${a.contact}</h4>
                                    <span style="font-size:0.7rem; color:#94a3b8;">${a.time}</span>
                                </div>
                                <p>${a.last_message}</p>
                            </div>
                            ${t}
                        </div>
                    `})}})}he.addEventListener("click",qe);function we(e){O=e,_e.innerHTML=`<i class="fa-solid fa-user"></i> @${e}`,he.style.display="flex",be.style.display="none",H.style.display="none",Ne.style.display="flex",k.innerHTML='<p style="text-align:center; color:#64748b; font-size:0.8rem;">Loading conversation...</p>',Promise.resolve().then(()=>({status:"success",messages:A[e]||[]})).then(a=>{a.status==="success"&&(k.innerHTML="",a.messages.length===0&&(k.innerHTML='<p style="text-align:center; color:#94a3b8; font-size:0.85rem; margin-top: 20px;">This is the beginning of your chat history.</p>'),a.messages.forEach(t=>Ve(t.text,t.type,t.time)))})}H.addEventListener("click",e=>{const a=e.target.closest(".chat-list-item");a&&we(a.getAttribute("data-chat"))}),be.addEventListener("click",()=>{Ye("Start a Chat","Enter the exact PawTrack username of the person you want to message:",e=>{we(e)})}),g.addEventListener("click",e=>{const a=e.target.closest(".btn-message-owner");if(a){const t=a.getAttribute("data-owner");oe.classList.add("active"),He.querySelector(".badge").style.display="none",we(t)}});function Ve(e,a,t){const i=document.createElement("div");i.className=`msg-bubble msg-${a}`,i.innerHTML=`${e}<div class="msg-time">${t}</div>`,k.appendChild(i),k.scrollTop=k.scrollHeight}function Oe(){const e=xe.value.trim();if(!e||!O)return;const a=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});Ve(e,"sent","Sending..."),xe.value="";const t=k.lastElementChild.querySelector(".msg-time");Promise.resolve().then(()=>(A[O]||(A[O]=[]),A[O].push({text:e,type:"sent",time:a}),{status:"success",time:a})).then(i=>{i.status==="success"?t&&(t.innerText=i.time):(u("Message Failed",i.message,!0),k.lastElementChild&&k.lastElementChild.remove())})}st.addEventListener("click",Oe),xe.addEventListener("keypress",e=>{e.key==="Enter"&&Oe()})});
