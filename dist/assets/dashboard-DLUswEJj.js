import{a as ae,d as w,Q as j,I as R,s as le}from"./appwrite-BfOVdxfC.js";const E="pawtrack_db",de="pets",we="applications",Ee="vet_appointments",ce="recycle_bin",Ue="activity_logs",pe="pawtrack_storage";let h="",me="",F="",z={},G="",B=[],L=[],$=[],Y=[],Be=null,ie=[],A={};document.addEventListener("DOMContentLoaded",async()=>{var Oe;try{const e=await ae.get();h=e.name,me=e.email,F=e.$id,z=e.prefs||{},G=((Oe=e.prefs)==null?void 0:Oe.phone)||"";const t=document.getElementById("userNameDisplay");t&&(t.innerText=h?"Welcome, "+h+"!":"Welcome!");try{B=(await w.listDocuments(E,de)).documents.map(o=>({...o,id:o.$id})),L=(await w.listDocuments(E,we,[j.equal("user_id",F)])).documents.map(o=>({...o,id:o.$id})),$=(await w.listDocuments(E,Ee,[j.equal("user_id",F)])).documents.map(o=>({...o,id:o.$id})),Y=(await w.listDocuments(E,ce,[j.equal("owner",h)])).documents.map(o=>({...o,id:o.$id}))}catch(a){console.warn("Database collections not fully setup yet. Using empty arrays.",a)}}catch(e){console.error("User not logged in",e),window.location.href="/PawTrackLogin.html";return}async function I(e,t,a){try{await w.createDocument(E,Ue,R.unique(),{user_id:F,action:e||"Activity recorded",target:t||"",icon:a||"fa-paw",timestamp:Date.now().toString()})}catch(i){console.warn("Failed to persist activity log to Appwrite:",i)}}function Ie(){const e=window.innerWidth;if(e<=768){document.body.style.zoom="1",document.body.style.width="100vw",document.body.style.height="100vh",navigator.userAgent.toLowerCase().includes("firefox")&&(document.body.style.transform="none");return}const a=e/1920;document.body.style.zoom=a,document.body.style.width=`${100/a}vw`,document.body.style.height=`${100/a}vh`,navigator.userAgent.toLowerCase().includes("firefox")&&(document.body.style.zoom="1",document.body.style.transform=`scale(${a})`,document.body.style.transformOrigin="top left")}let W;function m(e,t,a=!1,i=null){const l=document.getElementById("customPopupOverlay"),n=document.getElementById("customPopupTitle"),o=document.getElementById("customPopupMessage"),r=document.getElementById("customPopupActions");n.innerText=e,o.innerText=t,n.className=a?"custom-popup-title title-error":"custom-popup-title title-success",r.style.display="none",l.style.display="flex",clearTimeout(W),W=setTimeout(()=>{M(i)},5e3),document.getElementById("customPopupClose").onclick=()=>{clearTimeout(W),M(i)}}function je(e,t,a){const i=document.getElementById("customPopupOverlay"),l=document.getElementById("customPopupTitle"),n=document.getElementById("customPopupMessage"),o=document.getElementById("customPopupActions");l.innerText=e,l.className="custom-popup-title title-success",n.innerHTML=`<p style="margin-bottom:10px;">${t}</p><input type="text" id="customPromptInput" style="width:100%; padding:12px; border-radius:8px; border:2px solid #cbd5e1; outline:none; font-size:1rem; font-weight:600; color:#0f172a;" autocomplete="off">`,o.style.display="flex",i.style.display="flex",clearTimeout(W),document.getElementById("btnPopupConfirm").innerText="Submit",document.getElementById("btnPopupConfirm").onclick=()=>{const r=document.getElementById("customPromptInput").value;M(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",r.trim()!==""&&a(r.trim())},document.getElementById("customPopupClose").onclick=()=>{M()},document.getElementById("btnPopupCancel").onclick=()=>{M(),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure"}}function X(e,t,a){const i=document.getElementById("customPopupOverlay"),l=document.getElementById("customPopupTitle"),n=document.getElementById("customPopupMessage"),o=document.getElementById("customPopupActions");l.innerText=e,l.className="custom-popup-title title-error",n.innerHTML=`<p>${t}</p>`,o.style.display="flex",i.style.display="flex",clearTimeout(W),document.getElementById("btnPopupConfirm").innerText="Yes, I'm sure",document.getElementById("btnPopupConfirm").onclick=()=>{M(),a&&a()},document.getElementById("customPopupClose").onclick=()=>{M()},document.getElementById("btnPopupCancel").onclick=()=>{M()}}function M(e){document.getElementById("customPopupOverlay").style.display="none",e&&e()}window.addEventListener("resize",Ie),Ie();const J=[{initials:"MD",name:"Dr. Miguel Antonio Dela Cruz",specialty:"General Veterinary Practitioner",phone:"0917-555-0101",email:"mdelacruz@pawtrack.ph",schedule:"Mon-Fri: 8am-4pm",clinic:"Quezon City Main Clinic",exp:"15 yrs exp",rating:"4.8"},{initials:"JS",name:"Dr. Joanna Marie R. Santos",specialty:"Veterinary Surgeon",phone:"0917-555-0102",email:"jmsantos@pawtrack.ph",schedule:"Tue-Sat: 10am-6pm",clinic:"Makati Pet Hospital",exp:"12 yrs exp",rating:"4.9"},{initials:"PV",name:"Dr. Paulo C. Villanueva",specialty:"Veterinary Oncologist",phone:"0917-555-0103",email:"pvillanueva@pawtrack.ph",schedule:"Mon-Thu: 9am-5pm",clinic:"BGC Animal Center",exp:"8 yrs exp",rating:"4.7"}];let S=0,D=[],q=[],H=0,k=null,O=[],ue=3;const Z=document.querySelectorAll(".sidebar-nav .nav-btn"),y=document.getElementById("mainDisplayPanel"),Te=document.getElementById("profileTemplate").innerHTML,ge=document.getElementById("cartItemsContainer"),Ge=document.getElementById("cartTotalDisplay"),se=(e,t,a)=>`
        <div class="page-header">
            <div>
                <h2><i class="${a}"></i> ${e}</h2>
                <p>${t}</p>
            </div>
        </div>
    `;let ne="";if(typeof B<"u"&&B.length>0){const e=B.filter(t=>t.status==="Available");e.length>0?e.forEach(t=>{const a=t.gender==="Female"?"gender-female":"gender-male",l=t.owner===h?`
                    <button class="btn-archive-pet" data-petid="${t.id}" title="Move to Bin" 
                        style="background: #fee2e2; color: #ef4444; border: 2px solid #fca5a5; border-radius: 10px; padding: 10px; cursor: pointer; transition: 0.3s;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `:"";ne+=`
                    <div class="pet-item-wrapper">
                        <div class="pet-card ${a}">
                            <img src="${t.img}" alt="${t.name}" class="pet-card-img">
                            <div class="pet-card-body">
                                <h3 class="pet-name">${t.name}</h3>
                                <p class="pet-breed">${t.breed}</p>
                                <p class="pet-meta">${t.gender} • ${t.age}</p>
                                <span class="status-badge">● ${t.status}</span>
                                
                                <div class="pet-actions" style="display: flex; gap: 8px;">
                                    <button class="btn-view-pet" data-target="pet-details-${t.id}" title="View Details" style="flex: 1;">
                                        Details <i class="fa-solid fa-chevron-down"></i>
                                    </button>
                                    
                                    ${l}

                                    <button class="btn-adopt" data-petid="${t.id}" data-petname="${t.name}" style="flex: 1;">Adopt Now</button>
                                </div>
                            </div>
                        </div>
                        <div class="pet-details-dropdown ${a}" id="pet-details-${t.id}">
                            <div class="details-grid">
                                <div class="detail-box"><label>Health Status</label><p>${t.health_status}</p></div>
                                <div class="detail-box"><label>Contact / Owner</label><p>@${t.owner} <br><span style="font-size:0.85rem;">${t.contact_number}</span></p></div>
                            </div>
                            <div class="detail-box" style="margin-bottom: 15px;">
                                <label>Personality Traits</label><p>${t.personal_traits}</p>
                            </div>
                            <div class="detail-box" style="margin-bottom: 25px;">
                                <label>Background / Reason for Adoption</label><p>${t.reason_for_adoption}</p>
                            </div>
                            <div style="text-align: right;">
                                <button class="btn-close-pet" data-target="pet-details-${t.id}">Close Details</button>
                            </div>
                        </div>
                    </div>
                `}):ne='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available for adoption.</p>'}else ne='<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available in the system.</p>';const Pe=`
        <div class="page-container">
            ${se("Meet the Pets","Say hello to our furry friends currently waiting for a loving home.","fa-solid fa-paw")}
            <div class="pet-grid">
                ${ne}
            </div>
        </div>
    `;function Ye(){let e="",t="";return typeof L<"u"&&L.length>0&&L.forEach(a=>{const i=`
                <div class="app-item-wrapper" style="margin-bottom: 15px;">
                    <div class="app-card" style="border: 1px solid ${a.status==="Approved"?"#fca5a5":"#bfdbfe"}; border-radius: 12px; padding: 15px; display: flex; justify-content: space-between; align-items: center; background: white; z-index: 2; position: relative;">
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <img src="${a.img}" alt="${a.pet_name}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <div>
                                <h3 style="margin: 0; color: #1e293b;">${a.pet_name}</h3>
                                <small style="color: #64748b;">Applied on: ${a.date}</small>
                            </div>
                        </div>
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <span style="background: ${a.status==="Approved"?"#dcfce7":"#fef3c7"}; color: ${a.status==="Approved"?"#166534":"#b45309"}; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">
                                ● ${a.status}
                            </span>
                            
                            <button class="${a.status==="Approved"?"btn-primary":"btn-view-app"}" data-target="app-details-${a.id}" style="background: ${a.status==="Approved"?"#ec4899":"white"}; color: ${a.status==="Approved"?"white":"#4f46e5"}; border: ${a.status==="Approved"?"none":"1px solid #cbd5e1"}; padding: 8px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                                ${a.status==="Approved"?"Finalize":'View <i class="fa-solid fa-chevron-down"></i>'}
                            </button>
                        </div>
                    </div>

                    <div class="app-details-dropdown" id="app-details-${a.id}" style="display: none; background: white; border: 1px solid #cbd5e1; border-top: 1px dashed #cbd5e1; border-radius: 0 0 12px 12px; padding: 25px 20px 20px 20px; margin-top: -10px; position: relative; z-index: 1;">
                        <div class="details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="detail-box">
                                <label style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;">Pet Name</label>
                                <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 1rem;">${a.pet_name}</p>
                            </div>
                            <div class="detail-box">
                                <label style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;">Date Applied</label>
                                <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 1rem;">${a.date}</p>
                            </div>
                            <div class="detail-box" style="grid-column: 1 / -1;">
                                <label style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;">Application Status</label>
                                <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 1rem;">Your application is currently being reviewed by our team.</p>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px;">
                            ${a.status!=="Approved"?`<button class="btn-cancel-app" data-appid="${a.id}" style="padding: 10px 20px; background: white; color: #ef4444; border: 1px solid #fca5a5; border-radius: 8px; font-weight: bold; cursor: pointer;">Cancel Application</button>`:""}
                            <button class="btn-close-pet" data-target="app-details-${a.id}" style="padding: 10px 20px; background: white; border: 1px solid #cbd5e1; border-radius: 8px; color: #475569; font-weight: bold; cursor: pointer;">Close Details</button>
                        </div>
                    </div>
                </div>
            `;a.status==="Approved"?t+=i:e+=i}),`
            <div style="padding: 20px;">
                <h1 style="margin-bottom: 5px; color: #0f172a;"><i class="fa-solid fa-clipboard-list"></i> My Applications</h1>
                <p style="color: #64748b; margin-bottom: 30px;">Track the status of your adoption requests.</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        <h3 style="color: #b45309; margin-bottom: 20px;"><i class="fa-solid fa-hourglass-half"></i> In Review</h3>
                        ${e||'<p style="color: #94a3b8;">No applications currently in review.</p>'}
                    </div>

                    <div>
                        <h3 style="color: #10b981; margin-bottom: 20px;"><i class="fa-solid fa-circle-check"></i> Approved</h3>
                        ${t||'<p style="color: #94a3b8;">No approved applications yet.</p>'}
                    </div>
                </div>
            </div>
        `}const We=()=>{let e="";return typeof Y<"u"&&Y.length>0?Y.forEach(t=>{const a=t.gender==="Female"?"gender-female":"gender-male";e+=`
                    <div class="pet-item-wrapper">
                        <div class="pet-card ${a}" style="opacity: 0.85;">
                            <img src="${t.img}" alt="${t.name}" class="pet-card-img" style="filter: grayscale(40%);">
                            <div class="pet-card-body">
                                <h3 class="pet-name">${t.name}</h3>
                                <p class="pet-breed">${t.breed}</p>
                                <p class="pet-meta" style="color: #ef4444;"><i class="fa-solid fa-trash-can"></i> In Recycle Bin</p>
                                
                                <div class="pet-actions" style="margin-top: auto; padding-top: 15px;">
                                    <button class="btn-restore-pet" data-petid="${t.id}" style="width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s;">
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
        `},Le=(e,t)=>`
        <div class="registration-wrapper">
            <div class="page-header" style="margin-bottom: 15px;">
                <div>
                    <h2><i class="fa-solid fa-house-chimney-user" style="color: #ec4899;"></i> Adopt ${t}</h2>
                    <p>Complete the form below to start your adoption journey.</p>
                </div>
                <button class="btn-animated" id="btnBackToPets" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Pets</button>
            </div>

            <form id="adoptionApplicationForm" class="reg-form-container" style="flex-direction: column; min-height: auto;">
                <input type="hidden" id="adoptPetId" value="${e}">
                <input type="hidden" id="adoptPetName" value="${t}">

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
    `;function Xe(){let e="";typeof $<"u"&&$.length>0?$.forEach(n=>{const o=n.status==="Approved",r=o?"appt-approved":"appt-pending",p=o?"badge-approved":"badge-pending",f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],u=n.date.split("-"),v=u.length===3?f[parseInt(u[1])-1]:"TBD",x=u.length===3?u[2]:"??";e+=`
                    <div class="appt-mini-card ${r}">
                        <div class="appt-date-box"><strong>${x}</strong><span>${v}</span></div>
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
                `}):e='<p style="color: #64748b; margin-top: 10px; font-weight: 500;">No upcoming appointments.</p>';let t="";const a=B.filter(n=>n.owner===h);let i=[];typeof $<"u"&&(i=$.filter(n=>n.status!=="Cancelled"&&n.status!=="Completed").map(n=>n.pet_name));const l=a.filter(n=>!i.includes(n.name));return l.length>0?l.forEach(n=>{const o=n.gender&&n.gender.toLowerCase()==="female"?"gender-female":"gender-male";t+=`
                    <div class="pet-select-card ${o}" data-petid="${n.id}">
                        <img src="${n.img}" alt="${n.name}">
                        <span>${n.name}</span>
                    </div>
                `}):a.length>0?t='<p style="color: #f59e0b; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-clock" style="margin-right: 5px;"></i> All your pets currently have scheduled appointments. You can book another once current visits are completed or cancelled.</p>':t=`<p style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> You don't have any registered pets yet! Please register a pet first.</p>`,`
            <div class="page-container">
                ${se("Veterinary Appointments","Schedule checkups, vaccinations, and consultations for your pets.","fa-solid fa-user-doctor")}
                <div class="vet-module-grid">
                    <div class="glass-panel">
                        <h3 class="section-title"><i class="fa-solid fa-calendar-plus" style="color: #ec4899;"></i> Book New Appointment</h3>
                        <form id="vetBookingForm">
                            <div class="reg-input" style="margin-bottom: 20px;">
                                <label>Select Registered Pet <span class="required">*</span></label>
                                
                                <div class="visual-pet-selector">
                                    ${t}
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
        `}const $e=[{id:1,brand:"NaturePet",name:"Nutricare Organic Dry Cat Food (1kg)",price:250,category:"Cat Food",img:"/static/resources/shop/catfood.jpg"},{id:2,brand:"PawSource",name:"100g Real Beef Dog Biscuit Treats",price:150,category:"Dog Food & Treats",img:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400"},{id:3,brand:"KONG",name:"Classic Durable Rubber Dog Toy",price:450,category:"Toys",img:"/static/resources/shop/dog_toy.jpg"},{id:4,brand:"Paws & Pals",name:"Heavy Duty Reflective Leash",price:299,category:"Accessories",img:"/static/resources/shop/leash.jpg"},{id:5,brand:"PetSafe",name:"Ceramic Anti-Slip Pet Bowl",price:180,category:"Accessories",img:"/static/resources/shop/bowl.jpg"},{id:6,brand:"CozyPet",name:"Fluffy Calming Pet Bed (Medium)",price:550,category:"Accessories",img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400"},{id:7,brand:"Whiskas",name:"Tuna Flavor Wet Cat Food (12 Pouch)",price:540,category:"Cat Food",img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"},{id:8,brand:"Pedigree",name:"Adult Beef & Veg Dry Dog Food (1.5kg)",price:380,category:"Dog Food & Treats",img:"/static/resources/shop/dogfood.jpg"},{id:9,brand:"FelineFun",name:"Interactive Feather Teaser Wand",price:95,category:"Toys",img:"https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400"},{id:10,brand:"GroomPro",name:"Silicone Pet Bath Massage Brush",price:110,category:"Grooming",img:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400"}];function ke(e){if(e.length===0)return'<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 50px; font-size: 1.2rem;">No items match your filters.</p>';let t="";return e.forEach(a=>{t+=`
                <div class="shop-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div class="shop-img-box" style="height: 200px; overflow: hidden; position: relative; background: #f8fafc;">
                        <img src="${a.img}" alt="${a.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <span style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; color: #475569; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${a.category}</span>
                    </div>
                    <div style="padding: 15px; display: flex; flex-direction: column; flex: 1;">
                        <span class="shop-brand" style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">${a.brand}</span>
                        
                        <h3 class="shop-title" style="margin: 5px 0 10px 0; font-size: 1.1rem; color: #0f172a; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${a.name}</h3>
                        
                        <div style="margin-top: auto;">
                            <div class="shop-price" style="font-size: 1.4rem; font-weight: 900; color: #ec4899; margin-bottom: 15px;">₱ ${a.price.toFixed(2)}</div>
                            <button class="btn-shop-cart btn-add-cart" data-name="${a.name}" data-price="${a.price}" data-img="${a.img}" style="width: 100%; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; border: 2px solid #4f46e5; background: white; color: #4f46e5; transition: 0.3s;" onmouseover="this.style.background='#e0e7ff'" onmouseout="this.style.background='white'">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `}),t}function Je(){return`
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
        `}const Ze=`
        <div class="registration-wrapper">
            ${se("Register a Pet","Fill in the details below to add a new pet to the system.","fa-solid fa-shield-cat")}
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
    `;function Ce(){const e=B.filter(a=>a.owner===h&&a.status==="Private");let t="";return e.length>0?e.forEach(a=>{const i=a.gender==="Female"?"gender-female":"gender-male",l=a.img||"https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b";t+=`
                    <div class="my-pet-card ${i}" data-petid="${a.id}">
                        <img src="${l}" alt="${a.name}">
                        <div class="my-pet-info">
                            <h4>${a.name}</h4>
                            <p>${a.gender} • ${a.breed}</p>
                        </div>
                    </div>
                `}):t='<p style="padding: 15px; color: #64748b; font-size: 0.95rem; text-align: center; font-weight: bold;">You need to register a pet first to use the Match Maker!</p>',`
        <div class="match-page-container">
            <div class="page-header" style="margin-bottom: 15px;">
                <div>
                    <h2><i class="fa-solid fa-heart" style="color: #ec4899;"></i> Premium Match Maker</h2>
                    <p>Find the perfect verified partner or schedule a local playdate.</p>
                </div>
                <div style="display: flex; gap: 15px;">
                    <button class="btn-animated" id="btnOpenPrefs"><i class="fa-solid fa-sliders"></i> Preferences</button>
                    <button class="btn-animated" id="btnViewActivePairs" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-layer-group"></i> Match Dashboard</button>
                </div>
            </div>

            <div class="match-module-grid">
                <div class="glass-panel pets-list-panel">
                    <h3 style="color: #0f172a; font-size: 1.2rem; font-weight: 900; margin-bottom: 15px; border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 10px;">Who is looking for love?</h3>
                    <div class="your-pets-selector">
                        ${t}
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
                        <p>Select your pet on the left<br>to start scanning for nearby matches...</p>
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
        `}function oe(){y.innerHTML=`
            <div class="page-container">
                ${se("Match Dashboard","Track pending requests and message approved matches.","fa-solid fa-mars-and-venus")}
                <div class="page-header" style="margin-top: -15px;">
                    <div></div>
                    <button class="btn-animated" id="btnBackToMatch" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Match Maker</button>
                </div>
                <div class="glass-panel" style="overflow-y: auto; flex:1;" id="matchDashboardContent">
                    <p style="text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">Loading matches...</p>
                </div>
            </div>
        `,Promise.resolve({status:"success",matches:ie}).then(e=>{if(e.status==="success"){let t='<div class="pairs-grid">';e.matches.length===0?t+='<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">You have no active matches or requests yet.</p>':e.matches.forEach(a=>{let i="",l="",n="";if(a.status==="pending"){const o=!a.is_sender,r=o?"Reject Match":"Cancel Request",p=o?"Are you sure you want to reject this match request?":"Are you sure you want to cancel your match request?";n=`
                                <button class="btn-delete-pair" data-matchid="${a.id}" data-title="${r}" data-msg="${p}" title="${o?"Reject":"Cancel Request"}" 
                                    style="position: absolute; top: 10px; right: 10px; z-index: 50; background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" 
                                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            `}a.status==="approved"?(l='<div class="pair-status approved">● Approved & Messaging</div>',i=`<button class="btn-animated btn-message-owner" data-owner="${a.ownerUsername}" style="width:100%; margin-top:10px; justify-content: center;"><i class="fa-regular fa-comment-dots"></i> Message Owner</button>`):a.status==="pending"&&a.is_sender?l='<div class="pair-status">● Pending Approval</div>':a.status==="pending"&&!a.is_sender&&(l='<div class="pair-status" style="color:#f59e0b; background:#fef3c7;">● Received Request!</div>',i=`<button class="btn-accept-match" data-matchid="${a.id}" style="width:100%; margin-top:10px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);"><i class="fa-solid fa-check"></i> Accept Match</button>`),t+=`
                            <div class="pair-card" style="position: relative; padding-top: 25px;">
                                ${n}
                                <div class="pair-images">
                                    <img src="${a.my_pet_img}" class="pair-img left">
                                    <div class="pair-heart-small"><i class="fa-solid fa-heart"></i></div>
                                    <img src="${a.their_pet_img}" class="pair-img right">
                                </div>
                                <div class="pair-names">${a.my_pet_name} & ${a.their_pet_name}</div>
                                ${l}
                                <div class="pair-date">@${a.ownerUsername}</div>
                                ${i}
                            </div>
                        `}),t+="</div>",document.getElementById("matchDashboardContent").innerHTML=t}})}function fe(){const e=B.filter(r=>r.owner===h).length,t=typeof $<"u"?$.filter(r=>r.status!=="Cancelled"&&r.status!=="Completed").length:0;let a="None",i="#64748b";typeof L<"u"&&L.length>0&&(a=L[0].status,a==="Approved"?i="#10b981":a==="Pending Review"&&(i="#f59e0b"));let l="";typeof $<"u"&&$.filter(r=>r.status!=="Cancelled"&&r.status!=="Completed").forEach(r=>{l+=`<div class="reminder-item warning"><div class="rem-icon"><i class="fa-solid fa-user-doctor"></i></div><div class="rem-text"><strong>${r.pet_name}'s Vet Visit</strong><small>${r.date} at ${r.time}</small></div></div>`}),typeof L<"u"&&L.filter(r=>r.status==="Approved").forEach(r=>{l+=`<div class="reminder-item success"><div class="rem-icon"><i class="fa-solid fa-check"></i></div><div class="rem-text"><strong>Adoption Approved!</strong><small>You can now finalize ${r.pet_name}'s adoption.</small></div></div>`}),l===""&&(l=`<div style="text-align:center; color:#64748b; padding:20px; font-weight:600;"><i class="fa-solid fa-mug-hot" style="font-size:2rem; margin-bottom:10px; color:#cbd5e1;"></i><br>You're all caught up!</div>`);const n=B.filter(r=>r.status==="Available");let o="";if(n.length>0){const r=Math.floor(Math.random()*n.length),p=n[r],f=p.gender==="Female"?'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>':'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>';o=`
                <div class="home-card featured-pet-card" style="flex: 1;">
                    <div class="featured-badge"><i class="fa-solid fa-star"></i> Pet of the Day</div>
                    <img src="${p.img}" alt="${p.name}" class="featured-img">
                    <div class="featured-info">
                        <h3>${p.name} ${f}</h3>
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
            `;y.innerHTML=`
            <div class="home-container">
                <div class="home-banner">
                    <div class="banner-text"><h1>Welcome back, ${h}! 👋</h1><p>Here is what's happening with your furry friends today.</p></div>
                    <div class="banner-icon"><i class="fa-solid fa-shield-cat"></i></div>
                </div>
                <div class="stats-row">
                    <div class="home-stat-card"><div class="stat-icon paw-bg"><i class="fa-solid fa-paw"></i></div><div><h3>My Pets</h3><h2>${e}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon health-bg"><i class="fa-solid fa-notes-medical"></i></div><div><h3>Upcoming Vets</h3><h2>${t}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon heart-bg"><i class="fa-solid fa-heart"></i></div><div><h3>Adoption Status</h3><h2 style="color:${i}; font-size: 1.3rem;">${a}</h2></div></div>
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
        `,Promise.resolve({status:"success",matches:ie}).then(r=>{const p=document.getElementById("homeMatchAlertsContainer");if(p)if(r.status==="success"&&r.matches.length>0){let f="";r.matches.slice(0,3).forEach(u=>{let v=u.status==="approved"?"Approved Match!":"Pending Request",x=u.status==="approved"?"💌":"⏳";f+=`
                        <div class="match-alert-item" style="cursor:pointer;" onclick="document.querySelector('[data-target=\\'breeding\\']').click()">
                            <img src="${u.their_pet_img}" alt="Pet">
                            <div class="alert-text"><strong>${u.their_pet_name} ${x}</strong><span>${v}</span></div>
                            <button class="btn-small-view">View</button>
                        </div>
                    `}),p.innerHTML=f}else p.innerHTML='<p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">No recent match activity.</p>'}),fetch("https://api.open-meteo.com/v1/forecast?latitude=14.6488&longitude=121.0509&current_weather=true").then(r=>r.json()).then(r=>{const p=Math.round(r.current_weather.temperature),f=r.current_weather.weathercode,u=document.getElementById("weatherTemp"),v=document.getElementById("weatherIcon"),x=document.getElementById("weatherText");u&&v&&x&&(u.innerText=`${p}°C`,f<=3?(v.className="fa-solid fa-sun weather-icon",v.style.color="#fef08a",x.innerHTML="<strong>Perfect time for a walk!</strong><br>The weather is great today. Take your pets out before it gets too hot."):f>=51&&f<=67||f>=80?(v.className="fa-solid fa-cloud-rain weather-icon",v.style.color="#bae6fd",x.innerHTML="<strong>It's a bit rainy!</strong><br>Keep your pets dry indoors today. A good time for some indoor training!"):(v.className="fa-solid fa-cloud weather-icon",v.style.color="#e2e8f0",x.innerHTML="<strong>Nice and cool!</strong><br>A great day for some indoor play or a quick stroll around the neighborhood."))}).catch(r=>console.error("Weather fetch error:",r)),setTimeout(()=>{const r=document.querySelector(".btn-adopt-potd");r&&r.addEventListener("click",p=>{const f=p.target.getAttribute("data-petid"),u=p.target.getAttribute("data-petname");y.innerHTML=Le(f,u),document.querySelectorAll(".sidebar-nav .nav-btn").forEach(v=>v.classList.remove("active")),document.querySelector('[data-target="pets"]').classList.add("active")})},100)}fe();function K(){const e=J[S],t=document.getElementById("vetInitials");if(!t)return;t.innerText=e.initials,document.getElementById("vetNameDisplay").innerText=e.name,document.getElementById("vetSpecialtyDisplay").innerText=e.specialty,document.getElementById("vetRatingDisplay").innerText=`⭐ ${e.rating} (${e.exp})`,document.getElementById("vetPhoneDisplay").innerText=e.phone,document.getElementById("vetEmailDisplay").innerText=e.email,document.getElementById("vetScheduleDisplay").innerText=e.schedule,document.getElementById("vetClinicDisplay").innerText=e.clinic;const a=document.getElementById("apptVetIdHidden").value,i=document.getElementById("btnSelectVet");a===S.toString()?(i.innerText="✅ Confirmed",i.classList.add("selected")):(i.innerText="Confirm",i.classList.remove("selected"))}function Q(){const e=document.getElementById("cartBadge");e&&(e.innerText=D.length),ge.innerHTML="";let t=0;D.length===0?ge.innerHTML='<p style="text-align:center; color:#64748b; font-weight:bold; margin-top: 50px;">Your cart is empty.</p>':D.forEach((a,i)=>{t+=parseFloat(a.price),ge.innerHTML+=`
                    <div class="cart-item-row">
                        <img src="${a.img}" class="cart-item-img">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${a.name}</div>
                            <div class="cart-item-price">₱ ${a.price}</div>
                        </div>
                        <div><button class="btn-remove-item" data-index="${i}" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></div>
                    </div>
                `}),Ge.innerText=`₱ ${t.toFixed(2)}`}window.handleRewind=e=>{O.splice(e,1),H=Math.max(0,H-1),ve()};function Ke(){const e=document.getElementById("rewindList");e&&(e.innerHTML="",O.length===0?e.innerHTML=`
                <div style="text-align:center; padding: 20px; opacity:0.5;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="font-size:0.85rem; font-weight:600;">History is empty</p>
                </div>`:O.forEach((t,a)=>{e.innerHTML+=`
                    <div class="rewind-item" data-index="${a}" onclick="handleRewind(${a})">
                        <img src="${t.imgs[0]}" alt="${t.name}">
                        <div class="rewind-info">
                            <strong>${t.name}</strong>
                            <span>${t.breed}</span>
                        </div>
                        <button class="btn-undo" title="Bring Back">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                `}))}function ve(){if(q.length===0||H>=q.length){document.getElementById("datingContentLayout").style.display="none";const o=document.getElementById("instructionOverlay");o.style.display="flex",o.innerHTML='<i class="fa-solid fa-face-frown-open" style="color: #cbd5e1; font-size: 4rem; margin-bottom: 15px;"></i><p>No more matches available<br>for this pet at the moment.</p>';return}const e=q[H];currentPhotoIndex=0;const t=document.getElementById("candThumbnails");t.innerHTML="",e.imgs.forEach((o,r)=>{t.innerHTML+=`<img src="${o}" class="cand-thumb ${r===0?"active":""}" data-index="${r}" alt="Photo ${r+1}">`}),Ae(e,0);const a=e.gender==="Male"?'<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>':'<i class="fa-solid fa-venus" style="color: #f472b6;"></i>';document.getElementById("candNameAge").innerHTML=`${e.name}, ${e.age} ${a}`,document.getElementById("candBreedGender").innerHTML=`<i class="fa-solid fa-paw"></i> ${e.breed}`,document.getElementById("candDesc").innerText=e.desc,document.getElementById("candScoreText").innerText=`${e.score}% Match`,document.getElementById("candScoreBar").style.width=`${e.score}%`;const i=document.getElementById("candBadges");i.innerHTML="",e.badges.includes("vet")&&(i.innerHTML+='<span class="v-badge badge-vet"><i class="fa-solid fa-stethoscope"></i> Vet Verified</span>'),e.badges.includes("pedigree")&&(i.innerHTML+='<span class="v-badge badge-pedigree"><i class="fa-solid fa-dna"></i> Purebred</span>'),e.badges.includes("vax")&&(i.innerHTML+='<span class="v-badge badge-vax"><i class="fa-solid fa-syringe"></i> Vaccinated</span>');const l=document.getElementById("candTraits");l.innerHTML="",e.traits.forEach(o=>{l.innerHTML+=`<span class="trait-tag">${o}</span>`}),document.getElementById("candOwnerName").innerText=e.ownerName,document.getElementById("candOwnerInitial").innerText=e.ownerInitial,document.getElementById("candOwnerRating").innerText=`⭐ ${e.ownerRating}`,document.getElementById("candOwnerPairs").innerText=`${e.successPairs} Successful Pairs`,document.getElementById("barSize").style.width=`${e.compSize}%`,document.getElementById("txtSize").innerText=`${e.compSize}%`,document.getElementById("barEnergy").style.width=`${e.compEnergy}%`,document.getElementById("txtEnergy").innerText=`${e.compEnergy}%`,document.getElementById("barTemp").style.width=`${e.compTemp}%`,document.getElementById("txtTemp").innerText=`${e.compTemp}%`;const n=document.getElementById("litterPredictor");n.innerHTML="",e.litter.forEach(o=>{const r=o.c==="#FFFFFF"||o.c==="#FFF8DC"?"#0f172a":"white";n.innerHTML+=`<div class="color-swatch" style="background:${o.c}; color:${r};">${o.p}%</div>`}),document.getElementById("instructionOverlay").style.display="none",document.getElementById("datingContentLayout").style.display="flex",document.getElementById("treatCountDisplay").innerText=`${ue} Left`,Ke()}function Ae(e,t){const a=document.getElementById("candImg");a.style.opacity=0,setTimeout(()=>{a.src=e.imgs[t],a.style.opacity=1},150),document.querySelectorAll(".cand-thumb").forEach((i,l)=>{l===parseInt(t)?i.classList.add("active"):i.classList.remove("active")})}Z.forEach(e=>{e.addEventListener("click",function(){Z.forEach(a=>a.classList.remove("active")),this.classList.add("active");const t=this.getAttribute("data-target");t==="home"?fe():t==="pets"?y.innerHTML=Pe:t==="applications"?y.innerHTML=Ye():t==="vet"?(y.innerHTML=Xe(),K()):t==="shop"?(y.innerHTML=Je(),Q()):t==="breeding"&&(y.innerHTML=Ce(),k=null)})}),document.getElementById("btnViewProfile").addEventListener("click",()=>{Z.forEach(e=>e.classList.remove("active")),y.innerHTML=Te,De()}),document.getElementById("btnRegisterPet").addEventListener("click",()=>{Z.forEach(l=>l.classList.remove("active")),y.innerHTML=Ze;const e=document.getElementById("imageDropZone"),t=document.getElementById("petImageInput"),a=document.getElementById("imagePreview"),i=document.getElementById("dropZoneText");e.addEventListener("click",()=>t.click()),Be=null,t.addEventListener("change",function(){if(this.files&&this.files[0]){Be=this.files[0];const l=new FileReader;l.onload=function(n){a.src=n.target.result,a.style.display="block",i.style.display="none"},l.readAsDataURL(this.files[0])}}),document.getElementById("btnCancelReg").addEventListener("click",()=>{fe(),Z[0].classList.add("active")})}),y.addEventListener("click",async e=>{if(e.target.classList.contains("profile-tab-btn")){document.querySelectorAll(".profile-tab-btn").forEach(s=>s.classList.remove("active")),document.querySelectorAll(".profile-tab-content").forEach(s=>s.classList.remove("active")),e.target.classList.add("active");const d=e.target.getAttribute("data-tab");document.getElementById(d).classList.add("active")}const t=e.target.closest(".btn-view-app")||e.target.closest(".btn-view-pet");if(t){const d=t.getAttribute("data-target"),s=document.getElementById(d),c=t.closest(".app-card")||t.closest(".pet-card");s.style.display==="block"?(s.style.display="none",c.classList.remove("dropdown-open")):(s.style.display="block",c.classList.add("dropdown-open"))}const a=e.target.closest(".btn-close-pet");if(a){const d=a.getAttribute("data-target"),s=document.getElementById(d),c=s.previousElementSibling;s.style.display="none",c.classList.remove("dropdown-open")}const i=e.target.closest(".btn-adopt");if(i){const d=i.getAttribute("data-petid"),s=i.getAttribute("data-petname");y.innerHTML=Le(d,s)}e.target.closest("#btnBackToPets")&&(y.innerHTML=Pe),e.target.closest(".btn-edit-profile")&&(document.getElementById("editProfileModal").style.display="flex");const l=e.target.closest(".btn-archive-pet");if(l){const d=l.getAttribute("data-petid");X("Move to Bin?","Are you sure you want to move this pet to the Recycle Bin?",async()=>{const s=B.find(c=>c.id===d);if(!s){m("Error","Pet record not found.",!0);return}try{await w.createDocument(E,ce,R.unique(),{name:s.name,breed:s.breed,gender:s.gender,owner:h,img:s.img||""}),await w.deleteDocument(E,de,d),await I("Moved a pet to the Recycle Bin",s.name,"fa-trash-can"),m("Moved to Bin","Pet successfully moved to Recycle Bin.",!1,()=>{window.location.reload()})}catch(c){console.error("Appwrite Move to Bin Error:",c),m("Error",c.message,!0)}})}e.target.closest("#btnViewBin")&&(y.innerHTML=We()),e.target.closest("#btnEmptyBin")&&X("Empty Bin?","WARNING: Are you sure you want to permanently delete ALL pets in the Recycle Bin? This cannot be undone!",async()=>{try{for(const d of Y)await w.deleteDocument(E,ce,d.id);await I("Permanently emptied the Recycle Bin","","fa-dumpster-fire"),m("Bin Emptied","Recycle bin emptied successfully.",!1,()=>{window.location.reload()})}catch(d){console.error("Appwrite Empty Bin Error:",d),m("Error",d.message,!0)}}),e.target.closest("#btnBackToProfile")&&(y.innerHTML=Te,De());const n=e.target.closest(".btn-restore-pet");if(n){const d=n.getAttribute("data-petid"),s=Y.find(c=>c.id===d);if(s)try{await w.createDocument(E,de,R.unique(),{name:s.name,breed:s.breed,gender:s.gender,age:"1 yr",status:"Available",health_status:"Healthy",owner:h,contact_number:G||"0917-000-0000",personal_traits:"Friendly",reason_for_adoption:"Restored from Recycle Bin",img:s.img||""}),await w.deleteDocument(E,ce,d),await I("Restored a pet from the Recycle Bin",s.name,"fa-rotate-left"),m("Restored!","Pet has been restored to the active board!",!1,()=>{window.location.reload()})}catch(c){console.error("Appwrite Restore Error:",c),m("Error",c.message,!0)}}const o=e.target.closest(".btn-cancel-app");if(o){const d=o.getAttribute("data-appid");X("Cancel Application?","Are you sure you want to cancel this application?",async()=>{try{await w.deleteDocument(E,we,d),await I("Cancelled adoption application","","fa-file-circle-xmark"),m("Cancelled","Application successfully cancelled.",!1,()=>{window.location.reload()})}catch(s){console.error("Appwrite Cancel App Error:",s),m("Error",s.message,!0)}})}const r=e.target.closest(".btn-cancel-vet");if(r){const d=r.getAttribute("data-appid");X("Cancel Appointment?","Are you sure you want to cancel this veterinary appointment?",async()=>{try{await w.deleteDocument(E,Ee,d),await I("Cancelled veterinary appointment","","fa-calendar-xmark"),m("Cancelled","Appointment successfully cancelled.",!1,()=>{window.location.reload()})}catch(s){console.error("Appwrite Cancel Vet Error:",s),m("Error",s.message,!0)}})}const p=e.target.closest(".pet-select-card");if(p&&document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".pet-select-card").forEach(c=>c.classList.remove("selected")),p.classList.add("selected");const d=p.getAttribute("data-pet");document.getElementById("apptPetSelectorHidden").value=d;const s=myPetsDB[d];s&&(document.getElementById("apptOwner").value=s.owner,document.getElementById("apptPetType").value=s.type,document.getElementById("apptBreed").value=s.breed,document.getElementById("apptGender").value=s.gender,document.getElementById("apptWeight").value=s.weight)}if(e.target.closest("#btnPrevVet")&&(S=(S-1+J.length)%J.length,K()),e.target.closest("#btnNextVet")&&(S=(S+1)%J.length,K()),e.target.closest("#btnSelectVet")){const d=J[S];document.getElementById("apptVetIdHidden").value=S,document.getElementById("apptSelectedVetName").value=d.name,K()}if(e.target.classList.contains("btn-add-cart")){D.push({name:e.target.getAttribute("data-name"),price:e.target.getAttribute("data-price"),img:e.target.getAttribute("data-img")}),Q();const d=e.target.innerText;e.target.innerText="✓ Added",e.target.style.background="#10b981",e.target.style.color="white",e.target.style.borderColor="#10b981",setTimeout(()=>{e.target.innerText=d,e.target.style.background="white",e.target.style.color="#4f46e5",e.target.style.borderColor="#4f46e5"},1e3)}if(e.target.classList.contains("btn-buy-now")){const s=e.target.closest(".shop-card").querySelector(".btn-add-cart");D.push({name:s.getAttribute("data-name"),price:s.getAttribute("data-price"),img:s.getAttribute("data-img")}),Q(),document.getElementById("cartModalOverlay").style.display="flex"}e.target.closest("#btnOpenCart")&&(document.getElementById("cartModalOverlay").style.display="flex"),e.target.closest(".mode-btn")&&(document.querySelectorAll(".mode-btn").forEach(d=>d.classList.remove("active")),e.target.closest(".mode-btn").classList.add("active"),k&&document.querySelector(`[data-pet="${k}"]`).click());const f=e.target.closest(".pet-select-card");if(f&&document.getElementById("vetBookingForm")){document.querySelectorAll(".pet-select-card").forEach(c=>c.classList.remove("selected")),f.classList.add("selected");const d=f.getAttribute("data-petid");document.getElementById("apptPetSelectorHidden").value=d;const s=B.find(c=>c.id.toString()===d);s&&(document.getElementById("apptOwner").value=h,document.getElementById("apptPetType").value=s.breed&&s.breed.toLowerCase().includes("cat")?"Cat":"Dog",document.getElementById("apptBreed").value=s.breed||"Unknown",document.getElementById("apptGender").value=s.gender||"Unknown")}const u=e.target.closest(".my-pet-card");if(u&&!document.getElementById("apptPetSelectorHidden")){document.querySelectorAll(".my-pet-card").forEach(s=>s.classList.remove("active")),u.classList.add("active"),k=u.getAttribute("data-petid"),B.find(s=>s.id.toString()===k),document.getElementById("datingContentLayout").style.display="none";const d=document.getElementById("instructionOverlay");d.style.display="flex",d.innerHTML='<div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div><p>Scanning database for verified matches...</p>',Promise.resolve().then(()=>({status:"success",candidates:B.filter(c=>c.owner!==h).map(c=>({id:c.id,name:c.name,breed:c.breed,gender:c.gender,age:c.age,photos:[c.img],imgs:[c.img],owner:c.owner||"PawUser",ownerName:c.owner||"PawUser",score:94,traits:c.personal_traits?c.personal_traits.split(",").map(g=>g.trim()):["Playful","Friendly"],desc:c.reason_for_adoption||"Looking for a friend!",verified:!0}))})).then(s=>{s.status==="success"&&s.candidates.length>0?(q=s.candidates,H=0,setTimeout(()=>{ve()},800)):d.innerHTML='<p style="color:#64748b; font-weight:bold; font-size:1.1rem;">No match candidates available right now. Invite friends or register more pets!</p>'})}const v=e.target.closest(".cand-thumb");if(v){const d=q[H];Ae(d,v.getAttribute("data-index"))}const x=e.target.closest("#btnPassCandidate"),T=e.target.closest("#btnMatchCandidate"),ee=e.target.closest("#btnTreatCandidate");if(x||T||ee){const d=q[H],s=B.find(g=>g.id.toString()===k);let c="pass";if(T&&(c="like"),ee&&(c="super_like"),c==="super_like"&&ue<=0){m("Out of Treats","You have used all your Super Treats for today! Come back tomorrow.",!0);return}Promise.resolve({status:"success",isMatch:!0}).then(g=>{if(g.status==="success"){if(c==="super_like"&&ue--,O.unshift(d),O.length>5&&O.pop(),c!=="pass"){I(c==="super_like"?"Sent a Super Treat to":"Sent a match request to",d.name,"fa-heart"),document.getElementById("matchImgLeft").src=s.img,document.getElementById("matchImgRight").src=d.imgs[0],document.getElementById("matchNameLeft").innerText=s.name,document.getElementById("matchNameRight").innerText=d.name;const b=g.isMatch?"✨ IT'S A MATCH! ✨":c==="super_like"?"Super Liked! 🦴 (Pending)":"Pending Owner Approval";document.getElementById("matchDateSpot").innerText="PawTrack Verified";const P=document.getElementById("matchIcebreaker");P.value=g.isMatch?"You matched! Let's plan a playdate!":"",P.placeholder=g.isMatch?"Type a message...":`Say hi to ${d.ownerName} while you wait...`,document.getElementById("btnContinueMatch").setAttribute("data-targetuser",d.ownerName),document.getElementById("matchOverlay").style.display="flex",activePairs.unshift({id:"p"+Date.now(),maleName:s.gender==="Male"?s.name:d.name,femaleName:s.gender==="Female"?s.name:d.name,maleImg:s.gender==="Male"?s.img:d.imgs[0],femaleImg:s.gender==="Female"?s.img:d.imgs[0],status:b,isApproved:g.isMatch,date:"Just Now",ownerUsername:d.ownerName})}H++,ve()}else m("Error",g.message,!0)}).catch(g=>console.error("Swipe Error:",g))}e.target.closest("#btnOpenPrefs")&&(document.getElementById("prefModal").style.display="flex"),e.target.closest("#btnViewActivePairs")&&oe(),e.target.closest("#btnBackToMatch")&&(y.innerHTML=Ce(),k=null);const te=e.target.closest(".btn-accept-match"),N=e.target.closest(".btn-delete-pair");if(te||N){const d=te?"accept":"delete",s=(te||N).getAttribute("data-matchid");if(d==="delete"){const c=N.getAttribute("data-title")||"Cancel Request",g=N.getAttribute("data-msg")||"Are you sure you want to remove this match?";X(c,g,()=>{ie=ie.filter(b=>b.id!==s),oe()})}else{const c=ie.find(g=>g.id===s);c&&(c.status="approved"),oe()}}}),document.getElementById("btnCloseCart").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnContinueShopping").addEventListener("click",()=>document.getElementById("cartModalOverlay").style.display="none"),document.getElementById("btnCheckout").addEventListener("click",()=>{if(D.length===0){m("Empty Cart","Your cart is empty! Please add some items first.",!0);return}I("Completed a Pet Shop checkout","","fa-bag-shopping"),D=[],Q(),document.getElementById("cartModalOverlay").style.display="none",m("Order Placed!","Order placed successfully! Thank you for shopping.",!1)}),document.getElementById("cartItemsContainer").addEventListener("click",e=>{const t=e.target.closest(".btn-remove-item");t&&(D.splice(parseInt(t.getAttribute("data-index")),1),Q())}),document.getElementById("btnContinueMatch").addEventListener("click",e=>{const t=e.target.getAttribute("data-targetuser"),a=document.getElementById("matchIcebreaker").value.trim();a&&t&&(A[t]||(A[t]=[]),A[t].push({text:a,type:"sent",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),I("Sent an Icebreaker message to",t,"fa-comment-dots")),document.getElementById("matchOverlay").style.display="none",oe()}),document.getElementById("btnSavePrefs").addEventListener("click",()=>{document.getElementById("prefModal").style.display="none",k&&document.querySelector(`[data-pet="${k}"]`).click()}),document.getElementById("prefModal").addEventListener("click",e=>{e.target===document.getElementById("prefModal")&&(document.getElementById("prefModal").style.display="none")}),y.addEventListener("submit",e=>{if(e.target.id==="vetBookingForm"){e.preventDefault();const t=document.getElementById("apptPetSelectorHidden").value,a=document.getElementById("apptVetIdHidden").value;if(!t){m("Error","Please select a pet for the appointment by clicking their picture!",!0);return}if(!a){m("Error","Please choose a veterinarian by clicking 'Confirm' on the profile card!",!0);return}const i=document.querySelector(`.pet-select-card[data-petid="${t}"] span`).innerText,l=document.getElementById("apptSelectedVetName").value,n=B.find(o=>{var r;return((r=o.id)==null?void 0:r.toString())===(t==null?void 0:t.toString())});(async()=>{try{await w.createDocument(E,Ee,R.unique(),{pet_name:i,vet_name:l,status:"Upcoming",time:document.getElementById("apptTime").value||"",date:document.getElementById("apptDate").value||"",user_id:F,img:(n==null?void 0:n.img)||""}),await I("Booked vet visit for",i,"fa-user-doctor"),m("Request Sent!","Appointment scheduled successfully! It is now Upcoming.",!1,()=>{window.location.reload()})}catch(o){console.error("Appwrite Vet Booking Error:",o),m("Error",o.message,!0)}})()}if(e.target.id==="adoptionApplicationForm"){if(e.preventDefault(),!document.getElementById("adoptTerms").checked){m("Missing Requirement","You must agree to the terms and conditions.",!0);return}const t=document.getElementById("adoptPetId").value,a=document.getElementById("adoptPetName").value,i=B.find(l=>{var n;return((n=l.id)==null?void 0:n.toString())===(t==null?void 0:t.toString())});(async()=>{try{await w.createDocument(E,we,R.unique(),{pet_name:a,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),status:"Pending Review",user_id:F,img:(i==null?void 0:i.img)||""}),await I("Applied to adopt",a,"fa-house-chimney-user"),m("Application Sent!","Successfully submitted! Status: PENDING REVIEW.",!1,()=>{window.location.reload()})}catch(l){console.error("Appwrite Adoption Application Error:",l),m("Error",l.message,!0)}})()}(e.target.id==="petRegistrationForm"||e.target.id==="registerPetForm")&&(e.preventDefault(),(async()=>{var p,f,u,v,x;const t=document.getElementById("petImageInput"),a=Be||t&&t.files&&t.files[0];let i="";if(a)try{m("Uploading Photo","Saving pet photo to PawTrack Storage...",!1);const T=await le.createFile(pe,R.unique(),a);i=le.getFileView(pe,T.$id).toString()}catch(T){console.error("Storage upload failed:",T)}i||(i="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80");const l=document.getElementById("regForAdoption"),n=l?l.checked:!0,o=new FormData(e.target),r={name:o.get("name")||((p=document.getElementById("regPetName"))==null?void 0:p.value)||"Unnamed Pet",breed:o.get("breed")||((f=document.getElementById("regBreed"))==null?void 0:f.value)||"Mixed Breed",gender:o.get("gender")||((u=document.getElementById("regGender"))==null?void 0:u.value)||"Male",age:o.get("age")||((v=document.getElementById("regAge"))==null?void 0:v.value)||"1 yr",status:n?"Available":"Private",health_status:o.get("health_status")||"Healthy / Vaccinated",owner:h,contact_number:o.get("contact_number")||G||"0917-000-0000",personal_traits:o.get("personal_traits")||((x=document.getElementById("regDesc"))==null?void 0:x.value)||"Friendly",reason_for_adoption:o.get("reason_for_adoption")||(n?"Looking for a home":"Personal pet"),img:i};try{await w.createDocument(E,de,R.unique(),r),await I(n?"Listed pet for adoption":"Registered private pet",r.name,"fa-shield-cat"),m("Success!",n?"Pet Registered Successfully! Photo saved to PawTrack Storage and listed on the adoption board.":"Pet added to your personal roster! Photo saved to PawTrack Storage.",!1,()=>{window.location.reload()})}catch(T){console.error("Appwrite Pet Registration Error:",T),m("Error","Could not register pet: "+T.message,!0)}})())}),y.addEventListener("reset",e=>{e.target.id==="vetBookingForm"&&(document.querySelectorAll(".pet-select-card").forEach(t=>t.classList.remove("selected")),document.getElementById("apptPetSelectorHidden")&&(document.getElementById("apptPetSelectorHidden").value=""),document.getElementById("apptVetIdHidden")&&(document.getElementById("apptVetIdHidden").value=""),setTimeout(()=>{K()},10))});const Me=document.getElementById("editProfileForm");Me&&Me.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("editFirstName").value,a=document.getElementById("editLastName").value,i=document.getElementById("editContact").value,l=`${t} ${a}`.trim();try{l&&await ae.updateName(l),await ae.updatePrefs({...z,phone:i}),h=l,G=i,await I("Updated profile settings & information","","fa-user-pen"),document.getElementById("editProfileModal").style.display="none",m("Profile Saved","Profile updated successfully!",!1,()=>{window.location.reload()})}catch(n){m("Error",n.message,!0)}}),y.addEventListener("input",e=>{e.target.id==="shopPriceFilter"&&(document.getElementById("shopPriceDisplay").innerText=`₱${e.target.value}`,Se())}),y.addEventListener("change",e=>{e.target.id==="shopCategoryFilter"&&Se()});function Se(){const e=document.getElementById("shopCategoryFilter").value,t=parseFloat(document.getElementById("shopPriceFilter").value),a=$e.filter(i=>{const l=e==="All Categories"||i.category===e,n=i.price<=t;return l&&n});document.getElementById("shopGridContainer").innerHTML=ke(a)}async function De(){const e=document.getElementById("mainProfilePic");e&&(e.src=z.avatarUrl||"/resources/avatar/Avatar 1.jpg");const t=document.getElementById("btnChangeAvatar")||document.querySelector(".btn-change-photo"),a=document.getElementById("avatarFileInput");t&&a&&(t.onclick=()=>a.click(),a.onchange=async function(){if(this.files&&this.files[0])try{m("Uploading","Uploading avatar to PawTrack Storage...",!1);const b=await le.createFile(pe,R.unique(),this.files[0]),P=le.getFileView(pe,b.$id).toString();await ae.updatePrefs({...z,avatarUrl:P}),z.avatarUrl=P,e&&(e.src=P),await I("Updated profile picture","Saved to PawTrack Storage","fa-camera"),m("Success","Profile photo uploaded to PawTrack Storage!")}catch(b){m("Error","Failed to upload photo: "+b.message,!0)}});const i=document.getElementById("profileFullName"),l=document.getElementById("profileUsername"),n=document.getElementById("profileEmail"),o=document.getElementById("profilePhone");i&&(i.innerText=h),l&&(l.innerText=z.username?"@"+z.username:"@"+me.split("@")[0]),n&&(n.innerText=me),o&&(o.innerText=G||"None");const[r="",...p]=(h||"").split(" "),f=p.join(" "),u=document.getElementById("editFirstName"),v=document.getElementById("editLastName"),x=document.getElementById("editContact"),T=document.getElementById("editEmail");u&&(u.value=r),v&&(v.value=f),x&&(x.value=G||""),T&&(T.value=me||"");const ee=B.filter(b=>b.owner===h),te=L.filter(b=>b.status==="Approved").length,N=document.getElementById("countOwnedPets"),d=document.getElementById("countSuccessfulApps");N&&(N.innerText=ee.length),d&&(d.innerText=te);const s=document.getElementById("privateRosterGrid"),c=document.getElementById("adoptionRosterGrid");s&&c&&(s.innerHTML="",c.innerHTML="",ee.forEach(b=>{const P=`
                    <div class="roster-card">
                        <img src="${b.img}" class="roster-img">
                        <div class="roster-info"><h4>${b.name}</h4><p>${b.breed}</p></div>
                        <button class="btn-archive-pet" data-petid="${b.id}" title="Move to Bin" 
                            style="background: white; border: 2px solid #ef4444; color: #ef4444; padding: 6px 15px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s;" 
                            onmouseover="this.style.background='#ef4444'; this.style.color='white';" 
                            onmouseout="this.style.background='white'; this.style.color='#ef4444';">
                            <i class="fa-solid fa-trash-can"></i> Bin
                        </button>
                    </div>
                `;b.status==="Private"?s.innerHTML+=P:c.innerHTML+=P}));const g=document.getElementById("recentActivityLogs");if(g){g.innerHTML='<p style="text-align:center; color:#94a3b8; padding:15px;">Loading activity logs...</p>';try{const b=await w.listDocuments(E,Ue,[j.equal("user_id",F),j.orderDesc("$createdAt"),j.limit(20)]);g.innerHTML="";const P=b.documents;P.length>0?P.forEach(U=>{const tt=parseInt(U.timestamp)||new Date(U.$createdAt).getTime(),Ve=new Date(tt),at=Ve.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});g.innerHTML+=`
                            <div class="activity-item">
                                <div class="activity-icon"><i class="fa-solid ${U.icon}"></i></div>
                                <div class="activity-details">
                                    <p><strong>${U.action}</strong> ${U.target?'"'+U.target+'"':""}</p>
                                    <small>${Ve.toLocaleDateString()} at ${at}</small>
                                </div>
                            </div>
                        `}):g.innerHTML=`
                        <div class="activity-item">
                            <div class="activity-icon"><i class="fa-solid fa-user-check"></i></div>
                            <div class="activity-details">
                                <p><strong>Account verified</strong> and ready to use!</p>
                                <small>System Log</small>
                            </div>
                        </div>
                    `}catch(b){console.warn("Could not load activity logs:",b),g.innerHTML='<p style="text-align:center; color:#94a3b8; padding:15px;">No activity recorded yet.</p>'}}}const He=document.getElementById("chatFab"),re=document.getElementById("chatWindow"),Qe=document.getElementById("chatCloseBtn"),ye=document.getElementById("chatBackBtn"),be=document.getElementById("btnNewChat"),Re=document.getElementById("chatTitle"),_=document.getElementById("chatListView"),_e=document.getElementById("chatConvoView"),C=document.getElementById("chatMessagesBox"),he=document.getElementById("chatInputField"),et=document.getElementById("btnSendMsg");let V=null;He.addEventListener("click",()=>{re.classList.toggle("active"),re.classList.contains("active")&&Fe()}),Qe.addEventListener("click",()=>re.classList.remove("active"));const Ne=document.getElementById("btnLogout");Ne&&Ne.addEventListener("click",async()=>{try{await ae.deleteSession("current")}catch(e){console.warn(e)}window.location.href="/PawTrackLogin.html"});function Fe(){_e.style.display="none",_.style.display="flex",ye.style.display="none",be.style.display="flex",Re.innerHTML='<i class="fa-solid fa-messages"></i> Messages',V=null,_.innerHTML='<p style="text-align:center; margin-top:20px; color:#64748b;">Loading...</p>',Promise.resolve().then(()=>({status:"success",inbox:Object.keys(A).map(t=>{const a=A[t],i=a[a.length-1];return{contact:t,last_message:i.text,time:i.time,unread:0}})})).then(e=>{if(e.status==="success"){if(_.innerHTML="",e.inbox.length===0){_.innerHTML='<p style="text-align:center; margin-top:20px; color:#64748b; font-weight:bold;">No messages yet.<br><br>Click the + icon to start a chat with a username!</p>';return}e.inbox.forEach(t=>{const a=t.unread>0?`<span class="chat-unread">${t.unread}</span>`:"";_.innerHTML+=`
                        <div class="chat-list-item" data-chat="${t.contact}">
                            <div class="chat-avatar ai-avatar" style="background: linear-gradient(135deg, #4f46e5, #ec4899);"><i class="fa-solid fa-user"></i></div>
                            <div class="chat-list-info">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <h4>@${t.contact}</h4>
                                    <span style="font-size:0.7rem; color:#94a3b8;">${t.time}</span>
                                </div>
                                <p>${t.last_message}</p>
                            </div>
                            ${a}
                        </div>
                    `})}})}ye.addEventListener("click",Fe);function xe(e){V=e,Re.innerHTML=`<i class="fa-solid fa-user"></i> @${e}`,ye.style.display="flex",be.style.display="none",_.style.display="none",_e.style.display="flex",C.innerHTML='<p style="text-align:center; color:#64748b; font-size:0.8rem;">Loading conversation...</p>',Promise.resolve().then(()=>({status:"success",messages:A[e]||[]})).then(t=>{t.status==="success"&&(C.innerHTML="",t.messages.length===0&&(C.innerHTML='<p style="text-align:center; color:#94a3b8; font-size:0.85rem; margin-top: 20px;">This is the beginning of your chat history.</p>'),t.messages.forEach(a=>ze(a.text,a.type,a.time)))})}_.addEventListener("click",e=>{const t=e.target.closest(".chat-list-item");t&&xe(t.getAttribute("data-chat"))}),be.addEventListener("click",()=>{je("Start a Chat","Enter the exact PawTrack username of the person you want to message:",e=>{xe(e)})}),y.addEventListener("click",e=>{const t=e.target.closest(".btn-message-owner");if(t){const a=t.getAttribute("data-owner");re.classList.add("active"),He.querySelector(".badge").style.display="none",xe(a)}});function ze(e,t,a){const i=document.createElement("div");i.className=`msg-bubble msg-${t}`,i.innerHTML=`${e}<div class="msg-time">${a}</div>`,C.appendChild(i),C.scrollTop=C.scrollHeight}function qe(){const e=he.value.trim();if(!e||!V)return;const t=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});ze(e,"sent","Sending..."),he.value="";const a=C.lastElementChild.querySelector(".msg-time");Promise.resolve().then(()=>(A[V]||(A[V]=[]),A[V].push({text:e,type:"sent",time:t}),{status:"success",time:t})).then(i=>{i.status==="success"?a&&(a.innerText=i.time):(m("Message Failed",i.message,!0),C.lastElementChild&&C.lastElementChild.remove())})}et.addEventListener("click",qe),he.addEventListener("keypress",e=>{e.key==="Enter"&&qe()})});
