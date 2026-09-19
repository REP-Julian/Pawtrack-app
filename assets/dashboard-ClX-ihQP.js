import{a as e,i as t,n,r,t as i}from"./appwrite-u4vOtEVH.js";import"./modulepreload-polyfill-P2Xu9kJm.js";var a=`pawtrack_db`,o=`pets`,s=`applications`,c=`vet_appointments`,l=`recycle_bin`,u=`activity_logs`,d=`pawtrack_storage`,f=``,p=``,m=``,h={},g=``,_=[],v=[],y=[],b=[],x=null,S=[],C={};document.addEventListener(`DOMContentLoaded`,async()=>{try{let t=await i.get();f=t.name,p=t.email,m=t.$id,h=t.prefs||{},g=t.prefs?.phone||``;let r=document.getElementById(`userNameDisplay`);r&&(r.innerText=f?`Welcome, `+f+`!`:`Welcome!`);try{_=(await n.listDocuments(a,o)).documents.map(e=>({...e,id:e.$id})),v=(await n.listDocuments(a,s,[e.equal(`user_id`,m)])).documents.map(e=>({...e,id:e.$id})),y=(await n.listDocuments(a,c,[e.equal(`user_id`,m)])).documents.map(e=>({...e,id:e.$id})),b=(await n.listDocuments(a,l,[e.equal(`owner`,f)])).documents.map(e=>({...e,id:e.$id}))}catch(e){console.warn(`Database collections not fully setup yet. Using empty arrays.`,e)}}catch(e){console.error(`User not logged in`,e),window.location.href=`/PawTrackLogin.html`;return}async function w(e,r,i){try{await n.createDocument(a,u,t.unique(),{user_id:m,action:e||`Activity recorded`,target:r||``,icon:i||`fa-paw`,timestamp:Date.now().toString()})}catch(e){console.warn(`Failed to persist activity log to Appwrite:`,e)}}function T(){let e=window.innerWidth;if(e<=768){document.body.style.zoom=`1`,document.body.style.width=`100vw`,document.body.style.height=`100vh`,navigator.userAgent.toLowerCase().includes(`firefox`)&&(document.body.style.transform=`none`);return}let t=e/1920;document.body.style.zoom=t,document.body.style.width=`${100/t}vw`,document.body.style.height=`${100/t}vh`,navigator.userAgent.toLowerCase().includes(`firefox`)&&(document.body.style.zoom=`1`,document.body.style.transform=`scale(${t})`,document.body.style.transformOrigin=`top left`)}let E;function D(e,t,n=!1,r=null){let i=document.getElementById(`customPopupOverlay`),a=document.getElementById(`customPopupTitle`),o=document.getElementById(`customPopupMessage`),s=document.getElementById(`customPopupActions`);a.innerText=e,o.innerText=t,a.className=n?`custom-popup-title title-error`:`custom-popup-title title-success`,s.style.display=`none`,i.style.display=`flex`,clearTimeout(E),E=setTimeout(()=>{A(r)},5e3),document.getElementById(`customPopupClose`).onclick=()=>{clearTimeout(E),A(r)}}function O(e,t,n){let r=document.getElementById(`customPopupOverlay`),i=document.getElementById(`customPopupTitle`),a=document.getElementById(`customPopupMessage`),o=document.getElementById(`customPopupActions`);i.innerText=e,i.className=`custom-popup-title title-success`,a.innerHTML=`<p style="margin-bottom:10px;">${t}</p><input type="text" id="customPromptInput" style="width:100%; padding:12px; border-radius:8px; border:2px solid #cbd5e1; outline:none; font-size:1rem; font-weight:600; color:#0f172a;" autocomplete="off">`,o.style.display=`flex`,r.style.display=`flex`,clearTimeout(E),document.getElementById(`btnPopupConfirm`).innerText=`Submit`,document.getElementById(`btnPopupConfirm`).onclick=()=>{let e=document.getElementById(`customPromptInput`).value;A(),document.getElementById(`btnPopupConfirm`).innerText=`Yes, I'm sure`,e.trim()!==``&&n(e.trim())},document.getElementById(`customPopupClose`).onclick=()=>{A()},document.getElementById(`btnPopupCancel`).onclick=()=>{A(),document.getElementById(`btnPopupConfirm`).innerText=`Yes, I'm sure`}}function k(e,t,n){let r=document.getElementById(`customPopupOverlay`),i=document.getElementById(`customPopupTitle`),a=document.getElementById(`customPopupMessage`),o=document.getElementById(`customPopupActions`);i.innerText=e,i.className=`custom-popup-title title-error`,a.innerHTML=`<p>${t}</p>`,o.style.display=`flex`,r.style.display=`flex`,clearTimeout(E),document.getElementById(`btnPopupConfirm`).innerText=`Yes, I'm sure`,document.getElementById(`btnPopupConfirm`).onclick=()=>{A(),n&&n()},document.getElementById(`customPopupClose`).onclick=()=>{A()},document.getElementById(`btnPopupCancel`).onclick=()=>{A()}}function A(e){document.getElementById(`customPopupOverlay`).style.display=`none`,e&&e()}window.addEventListener(`resize`,T),T();let j=[{initials:`MD`,name:`Dr. Miguel Antonio Dela Cruz`,specialty:`General Veterinary Practitioner`,phone:`0917-555-0101`,email:`mdelacruz@pawtrack.ph`,schedule:`Mon-Fri: 8am-4pm`,clinic:`Quezon City Main Clinic`,exp:`15 yrs exp`,rating:`4.8`},{initials:`JS`,name:`Dr. Joanna Marie R. Santos`,specialty:`Veterinary Surgeon`,phone:`0917-555-0102`,email:`jmsantos@pawtrack.ph`,schedule:`Tue-Sat: 10am-6pm`,clinic:`Makati Pet Hospital`,exp:`12 yrs exp`,rating:`4.9`},{initials:`PV`,name:`Dr. Paulo C. Villanueva`,specialty:`Veterinary Oncologist`,phone:`0917-555-0103`,email:`pvillanueva@pawtrack.ph`,schedule:`Mon-Thu: 9am-5pm`,clinic:`BGC Animal Center`,exp:`8 yrs exp`,rating:`4.7`}],M=0,N=[],P=[],F=0,I=null,L=[],R=3,z=document.querySelectorAll(`.sidebar-nav .nav-btn`),B=document.getElementById(`mainDisplayPanel`),ee=document.getElementById(`profileTemplate`).innerHTML,V=document.getElementById(`cartItemsContainer`),te=document.getElementById(`cartTotalDisplay`),H=(e,t,n)=>`
        <div class="page-header">
            <div>
                <h2><i class="${n}"></i> ${e}</h2>
                <p>${t}</p>
            </div>
        </div>
    `,U=``;if(_!==void 0&&_.length>0){let e=_.filter(e=>e.status===`Available`);e.length>0?e.forEach(e=>{let t=e.gender===`Female`?`gender-female`:`gender-male`,n=e.owner===f?`
                    <button class="btn-archive-pet" data-petid="${e.id}" title="Move to Bin" 
                        style="background: #fee2e2; color: #ef4444; border: 2px solid #fca5a5; border-radius: 10px; padding: 10px; cursor: pointer; transition: 0.3s;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `:``;U+=`
                    <div class="pet-item-wrapper">
                        <div class="pet-card ${t}">
                            <img src="${e.img}" alt="${e.name}" class="pet-card-img">
                            <div class="pet-card-body">
                                <h3 class="pet-name">${e.name}</h3>
                                <p class="pet-breed">${e.breed}</p>
                                <p class="pet-meta">${e.gender} • ${e.age}</p>
                                <span class="status-badge">● ${e.status}</span>
                                
                                <div class="pet-actions" style="display: flex; gap: 8px;">
                                    <button class="btn-view-pet" data-target="pet-details-${e.id}" title="View Details" style="flex: 1;">
                                        Details <i class="fa-solid fa-chevron-down"></i>
                                    </button>
                                    
                                    ${n}

                                    <button class="btn-adopt" data-petid="${e.id}" data-petname="${e.name}" style="flex: 1;">Adopt Now</button>
                                </div>
                            </div>
                        </div>
                        <div class="pet-details-dropdown ${t}" id="pet-details-${e.id}">
                            <div class="details-grid">
                                <div class="detail-box"><label>Health Status</label><p>${e.health_status}</p></div>
                                <div class="detail-box"><label>Contact / Owner</label><p>@${e.owner} <br><span style="font-size:0.85rem;">${e.contact_number}</span></p></div>
                            </div>
                            <div class="detail-box" style="margin-bottom: 15px;">
                                <label>Personality Traits</label><p>${e.personal_traits}</p>
                            </div>
                            <div class="detail-box" style="margin-bottom: 25px;">
                                <label>Background / Reason for Adoption</label><p>${e.reason_for_adoption}</p>
                            </div>
                            <div style="text-align: right;">
                                <button class="btn-close-pet" data-target="pet-details-${e.id}">Close Details</button>
                            </div>
                        </div>
                    </div>
                `}):U=`<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available for adoption.</p>`}else U=`<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available in the system.</p>`;let ne=`
        <div class="page-container">
            ${H(`Meet the Pets`,`Say hello to our furry friends currently waiting for a loving home.`,`fa-solid fa-paw`)}
            <div class="pet-grid">
                ${U}
            </div>
        </div>
    `;function re(){let e=``,t=``;return v!==void 0&&v.length>0&&v.forEach(n=>{let r=`
                <div class="app-item-wrapper" style="margin-bottom: 15px;">
                    <div class="app-card" style="border: 1px solid ${n.status===`Approved`?`#fca5a5`:`#bfdbfe`}; border-radius: 12px; padding: 15px; display: flex; justify-content: space-between; align-items: center; background: white; z-index: 2; position: relative;">
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <img src="${n.img}" alt="${n.pet_name}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <div>
                                <h3 style="margin: 0; color: #1e293b;">${n.pet_name}</h3>
                                <small style="color: #64748b;">Applied on: ${n.date}</small>
                            </div>
                        </div>
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <span style="background: ${n.status===`Approved`?`#dcfce7`:`#fef3c7`}; color: ${n.status===`Approved`?`#166534`:`#b45309`}; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">
                                ● ${n.status}
                            </span>
                            
                            <button class="${n.status===`Approved`?`btn-primary`:`btn-view-app`}" data-target="app-details-${n.id}" style="background: ${n.status===`Approved`?`#ec4899`:`white`}; color: ${n.status===`Approved`?`white`:`#4f46e5`}; border: ${n.status===`Approved`?`none`:`1px solid #cbd5e1`}; padding: 8px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                                ${n.status===`Approved`?`Finalize`:`View <i class="fa-solid fa-chevron-down"></i>`}
                            </button>
                        </div>
                    </div>

                    <div class="app-details-dropdown" id="app-details-${n.id}" style="display: none; background: white; border: 1px solid #cbd5e1; border-top: 1px dashed #cbd5e1; border-radius: 0 0 12px 12px; padding: 25px 20px 20px 20px; margin-top: -10px; position: relative; z-index: 1;">
                        <div class="details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="detail-box">
                                <label style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;">Pet Name</label>
                                <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 1rem;">${n.pet_name}</p>
                            </div>
                            <div class="detail-box">
                                <label style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;">Date Applied</label>
                                <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 1rem;">${n.date}</p>
                            </div>
                            <div class="detail-box" style="grid-column: 1 / -1;">
                                <label style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;">Application Status</label>
                                <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 1rem;">Your application is currently being reviewed by our team.</p>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px;">
                            ${n.status===`Approved`?``:`<button class="btn-cancel-app" data-appid="${n.id}" style="padding: 10px 20px; background: white; color: #ef4444; border: 1px solid #fca5a5; border-radius: 8px; font-weight: bold; cursor: pointer;">Cancel Application</button>`}
                            <button class="btn-close-pet" data-target="app-details-${n.id}" style="padding: 10px 20px; background: white; border: 1px solid #cbd5e1; border-radius: 8px; color: #475569; font-weight: bold; cursor: pointer;">Close Details</button>
                        </div>
                    </div>
                </div>
            `;n.status===`Approved`?t+=r:e+=r}),`
            <div style="padding: 20px;">
                <h1 style="margin-bottom: 5px; color: #0f172a;"><i class="fa-solid fa-clipboard-list"></i> My Applications</h1>
                <p style="color: #64748b; margin-bottom: 30px;">Track the status of your adoption requests.</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        <h3 style="color: #b45309; margin-bottom: 20px;"><i class="fa-solid fa-hourglass-half"></i> In Review</h3>
                        ${e||`<p style="color: #94a3b8;">No applications currently in review.</p>`}
                    </div>

                    <div>
                        <h3 style="color: #10b981; margin-bottom: 20px;"><i class="fa-solid fa-circle-check"></i> Approved</h3>
                        ${t||`<p style="color: #94a3b8;">No approved applications yet.</p>`}
                    </div>
                </div>
            </div>
        `}let ie=()=>{let e=``;return b!==void 0&&b.length>0?b.forEach(t=>{let n=t.gender===`Female`?`gender-female`:`gender-male`;e+=`
                    <div class="pet-item-wrapper">
                        <div class="pet-card ${n}" style="opacity: 0.85;">
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
                `}):e=`<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px; font-size: 1.1rem;">Your Recycle Bin is empty.</p>`,`
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
        `},ae=(e,t)=>`
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
    `;`${H(`My Applications`,`Track the status of your adoption requests.`,`fa-solid fa-clipboard-list`)}`;function oe(){let e=``;y!==void 0&&y.length>0?y.forEach(t=>{let n=t.status===`Approved`,r=n?`appt-approved`:`appt-pending`,i=n?`badge-approved`:`badge-pending`,a=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],o=t.date.split(`-`),s=o.length===3?a[parseInt(o[1])-1]:`TBD`,c=o.length===3?o[2]:`??`;e+=`
                    <div class="appt-mini-card ${r}">
                        <div class="appt-date-box"><strong>${c}</strong><span>${s}</span></div>
                        <img src="${t.img}" alt="${t.pet_name}" class="appt-pet-avatar" style="object-fit: cover;">
                        <div class="appt-details">
                            <h4>${t.pet_name}'s Visit</h4>
                            <p>${t.vet_name}</p>
                            <span class="badge ${i}">${t.status} • ${t.time}</span>
                        </div>
                        
                        ${n?``:`
                            <div style="margin-left: auto;">
                                <button class="btn-cancel-vet" data-appid="${t.appt_id||t.id}" title="Cancel Appointment" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        `}
                    </div>
                `}):e=`<p style="color: #64748b; margin-top: 10px; font-weight: 500;">No upcoming appointments.</p>`;let t=``,n=_.filter(e=>e.owner===f),r=[];y!==void 0&&(r=y.filter(e=>e.status!==`Cancelled`&&e.status!==`Completed`).map(e=>e.pet_name));let i=n.filter(e=>!r.includes(e.name));return i.length>0?i.forEach(e=>{let n=e.gender&&e.gender.toLowerCase()===`female`?`gender-female`:`gender-male`;t+=`
                    <div class="pet-select-card ${n}" data-petid="${e.id}">
                        <img src="${e.img}" alt="${e.name}">
                        <span>${e.name}</span>
                    </div>
                `}):t=n.length>0?`<p style="color: #f59e0b; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-clock" style="margin-right: 5px;"></i> All your pets currently have scheduled appointments. You can book another once current visits are completed or cancelled.</p>`:`<p style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> You don't have any registered pets yet! Please register a pet first.</p>`,`
            <div class="page-container">
                ${H(`Veterinary Appointments`,`Schedule checkups, vaccinations, and consultations for your pets.`,`fa-solid fa-user-doctor`)}
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
        `}let se=[{id:1,brand:`NaturePet`,name:`Nutricare Organic Dry Cat Food (1kg)`,price:250,category:`Cat Food`,img:`/static/resources/shop/catfood.jpg`},{id:2,brand:`PawSource`,name:`100g Real Beef Dog Biscuit Treats`,price:150,category:`Dog Food & Treats`,img:`https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400`},{id:3,brand:`KONG`,name:`Classic Durable Rubber Dog Toy`,price:450,category:`Toys`,img:`/static/resources/shop/dog_toy.jpg`},{id:4,brand:`Paws & Pals`,name:`Heavy Duty Reflective Leash`,price:299,category:`Accessories`,img:`/static/resources/shop/leash.jpg`},{id:5,brand:`PetSafe`,name:`Ceramic Anti-Slip Pet Bowl`,price:180,category:`Accessories`,img:`/static/resources/shop/bowl.jpg`},{id:6,brand:`CozyPet`,name:`Fluffy Calming Pet Bed (Medium)`,price:550,category:`Accessories`,img:`https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400`},{id:7,brand:`Whiskas`,name:`Tuna Flavor Wet Cat Food (12 Pouch)`,price:540,category:`Cat Food`,img:`https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400`},{id:8,brand:`Pedigree`,name:`Adult Beef & Veg Dry Dog Food (1.5kg)`,price:380,category:`Dog Food & Treats`,img:`/static/resources/shop/dogfood.jpg`},{id:9,brand:`FelineFun`,name:`Interactive Feather Teaser Wand`,price:95,category:`Toys`,img:`https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400`},{id:10,brand:`GroomPro`,name:`Silicone Pet Bath Massage Brush`,price:110,category:`Grooming`,img:`https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400`}];function ce(e){if(e.length===0)return`<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 50px; font-size: 1.2rem;">No items match your filters.</p>`;let t=``;return e.forEach(e=>{t+=`
                <div class="shop-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div class="shop-img-box" style="height: 200px; overflow: hidden; position: relative; background: #f8fafc;">
                        <img src="${e.img}" alt="${e.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <span style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; color: #475569; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${e.category}</span>
                    </div>
                    <div style="padding: 15px; display: flex; flex-direction: column; flex: 1;">
                        <span class="shop-brand" style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">${e.brand}</span>
                        
                        <h3 class="shop-title" style="margin: 5px 0 10px 0; font-size: 1.1rem; color: #0f172a; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${e.name}</h3>
                        
                        <div style="margin-top: auto;">
                            <div class="shop-price" style="font-size: 1.4rem; font-weight: 900; color: #ec4899; margin-bottom: 15px;">₱ ${e.price.toFixed(2)}</div>
                            <button class="btn-shop-cart btn-add-cart" data-name="${e.name}" data-price="${e.price}" data-img="${e.img}" style="width: 100%; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; border: 2px solid #4f46e5; background: white; color: #4f46e5; transition: 0.3s;" onmouseover="this.style.background='#e0e7ff'" onmouseout="this.style.background='white'">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `}),t}function le(){return`
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
                        ${ce(se)}
                    </div>
                </div>
            </div>
        `}let ue=`
        <div class="registration-wrapper">
            ${H(`Register a Pet`,`Fill in the details below to add a new pet to the system.`,`fa-solid fa-shield-cat`)}
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
    `;function de(){let e=_.filter(e=>e.owner===f&&e.status===`Private`),t=``;return e.length>0?e.forEach(e=>{let n=e.gender===`Female`?`gender-female`:`gender-male`,r=e.img||`https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b`;t+=`
                    <div class="my-pet-card ${n}" data-petid="${e.id}">
                        <img src="${r}" alt="${e.name}">
                        <div class="my-pet-info">
                            <h4>${e.name}</h4>
                            <p>${e.gender} • ${e.breed}</p>
                        </div>
                    </div>
                `}):t=`<p style="padding: 15px; color: #64748b; font-size: 0.95rem; text-align: center; font-weight: bold;">You need to register a pet first to use the Match Maker!</p>`,`
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
        `}function W(){B.innerHTML=`
            <div class="page-container">
                ${H(`Match Dashboard`,`Track pending requests and message approved matches.`,`fa-solid fa-mars-and-venus`)}
                <div class="page-header" style="margin-top: -15px;">
                    <div></div>
                    <button class="btn-animated" id="btnBackToMatch" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Match Maker</button>
                </div>
                <div class="glass-panel" style="overflow-y: auto; flex:1;" id="matchDashboardContent">
                    <p style="text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">Loading matches...</p>
                </div>
            </div>
        `,Promise.resolve({status:`success`,matches:S}).then(e=>{if(e.status===`success`){let t=`<div class="pairs-grid">`;e.matches.length===0?t+=`<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">You have no active matches or requests yet.</p>`:e.matches.forEach(e=>{let n=``,r=``,i=``;if(e.status===`pending`){let t=!e.is_sender,n=t?`Reject Match`:`Cancel Request`,r=t?`Are you sure you want to reject this match request?`:`Are you sure you want to cancel your match request?`;i=`
                                <button class="btn-delete-pair" data-matchid="${e.id}" data-title="${n}" data-msg="${r}" title="${t?`Reject`:`Cancel Request`}" 
                                    style="position: absolute; top: 10px; right: 10px; z-index: 50; background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" 
                                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            `}e.status===`approved`?(r=`<div class="pair-status approved">● Approved & Messaging</div>`,n=`<button class="btn-animated btn-message-owner" data-owner="${e.ownerUsername}" style="width:100%; margin-top:10px; justify-content: center;"><i class="fa-regular fa-comment-dots"></i> Message Owner</button>`):e.status===`pending`&&e.is_sender?r=`<div class="pair-status">● Pending Approval</div>`:e.status===`pending`&&!e.is_sender&&(r=`<div class="pair-status" style="color:#f59e0b; background:#fef3c7;">● Received Request!</div>`,n=`<button class="btn-accept-match" data-matchid="${e.id}" style="width:100%; margin-top:10px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);"><i class="fa-solid fa-check"></i> Accept Match</button>`),t+=`
                            <div class="pair-card" style="position: relative; padding-top: 25px;">
                                ${i}
                                <div class="pair-images">
                                    <img src="${e.my_pet_img}" class="pair-img left">
                                    <div class="pair-heart-small"><i class="fa-solid fa-heart"></i></div>
                                    <img src="${e.their_pet_img}" class="pair-img right">
                                </div>
                                <div class="pair-names">${e.my_pet_name} & ${e.their_pet_name}</div>
                                ${r}
                                <div class="pair-date">@${e.ownerUsername}</div>
                                ${n}
                            </div>
                        `}),t+=`</div>`,document.getElementById(`matchDashboardContent`).innerHTML=t}})}function G(){let e=_.filter(e=>e.owner===f).length,t=y===void 0?0:y.filter(e=>e.status!==`Cancelled`&&e.status!==`Completed`).length,n=`None`,r=`#64748b`;v!==void 0&&v.length>0&&(n=v[0].status,n===`Approved`?r=`#10b981`:n===`Pending Review`&&(r=`#f59e0b`));let i=``;y!==void 0&&y.filter(e=>e.status!==`Cancelled`&&e.status!==`Completed`).forEach(e=>{i+=`<div class="reminder-item warning"><div class="rem-icon"><i class="fa-solid fa-user-doctor"></i></div><div class="rem-text"><strong>${e.pet_name}'s Vet Visit</strong><small>${e.date} at ${e.time}</small></div></div>`}),v!==void 0&&v.filter(e=>e.status===`Approved`).forEach(e=>{i+=`<div class="reminder-item success"><div class="rem-icon"><i class="fa-solid fa-check"></i></div><div class="rem-text"><strong>Adoption Approved!</strong><small>You can now finalize ${e.pet_name}'s adoption.</small></div></div>`}),i===``&&(i=`<div style="text-align:center; color:#64748b; padding:20px; font-weight:600;"><i class="fa-solid fa-mug-hot" style="font-size:2rem; margin-bottom:10px; color:#cbd5e1;"></i><br>You're all caught up!</div>`);let a=_.filter(e=>e.status===`Available`),o=``;if(a.length>0){let e=a[Math.floor(Math.random()*a.length)],t=e.gender===`Female`?`<i class="fa-solid fa-venus" style="color: #f472b6;"></i>`:`<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>`;o=`
                <div class="home-card featured-pet-card" style="flex: 1;">
                    <div class="featured-badge"><i class="fa-solid fa-star"></i> Pet of the Day</div>
                    <img src="${e.img}" alt="${e.name}" class="featured-img">
                    <div class="featured-info">
                        <h3>${e.name} ${t}</h3>
                        <p class="breed">${e.breed} • ${e.age}</p>
                        <p class="bio">${e.reason_for_adoption||e.personal_traits||`Looking for a loving forever home!`}</p>
                        <button class="btn-animated btn-adopt-potd" data-petid="${e.id}" data-petname="${e.name}" style="width: 100%; justify-content: center; margin-top: 10px;">Meet ${e.name}</button>
                    </div>
                </div>
            `}else o=`
                <div class="home-card featured-pet-card" style="flex: 1; display:flex; justify-content:center; align-items:center; background:#1e293b;">
                    <div style="text-align:center; color:white; z-index:2; padding:20px;">
                        <i class="fa-solid fa-shield-cat" style="font-size:3rem; margin-bottom:15px; color:#64748b;"></i>
                        <h3>No Pets Available</h3><p style="color:#cbd5e1; font-size:0.9rem; margin-top:10px;">Check back later for new arrivals!</p>
                    </div>
                </div>
            `;B.innerHTML=`
            <div class="home-container">
                <div class="home-banner">
                    <div class="banner-text"><h1>Welcome back, ${f}! 👋</h1><p>Here is what's happening with your furry friends today.</p></div>
                    <div class="banner-icon"><i class="fa-solid fa-shield-cat"></i></div>
                </div>
                <div class="stats-row">
                    <div class="home-stat-card"><div class="stat-icon paw-bg"><i class="fa-solid fa-paw"></i></div><div><h3>My Pets</h3><h2>${e}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon health-bg"><i class="fa-solid fa-notes-medical"></i></div><div><h3>Upcoming Vets</h3><h2>${t}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon heart-bg"><i class="fa-solid fa-heart"></i></div><div><h3>Adoption Status</h3><h2 style="color:${r}; font-size: 1.3rem;">${n}</h2></div></div>
                </div>
                <div class="dashboard-grid">
                    <div class="dashboard-col">
                        <div class="home-card" style="flex: 1;">
                            <h2 class="card-title">Reminders & Alerts</h2>
                            <div class="reminders-list">
                                ${i}
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
        `,Promise.resolve({status:`success`,matches:S}).then(e=>{let t=document.getElementById(`homeMatchAlertsContainer`);if(t){if(e.status===`success`&&e.matches.length>0){let n=``;e.matches.slice(0,3).forEach(e=>{let t=e.status===`approved`?`Approved Match!`:`Pending Request`,r=e.status===`approved`?`💌`:`⏳`;n+=`
                        <div class="match-alert-item" style="cursor:pointer;" onclick="document.querySelector('[data-target=\\'breeding\\']').click()">
                            <img src="${e.their_pet_img}" alt="Pet">
                            <div class="alert-text"><strong>${e.their_pet_name} ${r}</strong><span>${t}</span></div>
                            <button class="btn-small-view">View</button>
                        </div>
                    `}),t.innerHTML=n}else t.innerHTML=`<p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">No recent match activity.</p>`}}),fetch(`https://api.open-meteo.com/v1/forecast?latitude=14.6488&longitude=121.0509&current_weather=true`).then(e=>e.json()).then(e=>{let t=Math.round(e.current_weather.temperature),n=e.current_weather.weathercode,r=document.getElementById(`weatherTemp`),i=document.getElementById(`weatherIcon`),a=document.getElementById(`weatherText`);r&&i&&a&&(r.innerText=`${t}°C`,n<=3?(i.className=`fa-solid fa-sun weather-icon`,i.style.color=`#fef08a`,a.innerHTML=`<strong>Perfect time for a walk!</strong><br>The weather is great today. Take your pets out before it gets too hot.`):n>=51&&n<=67||n>=80?(i.className=`fa-solid fa-cloud-rain weather-icon`,i.style.color=`#bae6fd`,a.innerHTML=`<strong>It's a bit rainy!</strong><br>Keep your pets dry indoors today. A good time for some indoor training!`):(i.className=`fa-solid fa-cloud weather-icon`,i.style.color=`#e2e8f0`,a.innerHTML=`<strong>Nice and cool!</strong><br>A great day for some indoor play or a quick stroll around the neighborhood.`))}).catch(e=>console.error(`Weather fetch error:`,e)),setTimeout(()=>{let e=document.querySelector(`.btn-adopt-potd`);e&&e.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-petid`),n=e.target.getAttribute(`data-petname`);B.innerHTML=ae(t,n),document.querySelectorAll(`.sidebar-nav .nav-btn`).forEach(e=>e.classList.remove(`active`)),document.querySelector(`[data-target="pets"]`).classList.add(`active`)})},100)}G();function K(){let e=j[M],t=document.getElementById(`vetInitials`);if(!t)return;t.innerText=e.initials,document.getElementById(`vetNameDisplay`).innerText=e.name,document.getElementById(`vetSpecialtyDisplay`).innerText=e.specialty,document.getElementById(`vetRatingDisplay`).innerText=`⭐ ${e.rating} (${e.exp})`,document.getElementById(`vetPhoneDisplay`).innerText=e.phone,document.getElementById(`vetEmailDisplay`).innerText=e.email,document.getElementById(`vetScheduleDisplay`).innerText=e.schedule,document.getElementById(`vetClinicDisplay`).innerText=e.clinic;let n=document.getElementById(`apptVetIdHidden`).value,r=document.getElementById(`btnSelectVet`);n===M.toString()?(r.innerText=`✅ Confirmed`,r.classList.add(`selected`)):(r.innerText=`Confirm`,r.classList.remove(`selected`))}function q(){let e=document.getElementById(`cartBadge`);e&&(e.innerText=N.length),V.innerHTML=``;let t=0;N.length===0?V.innerHTML=`<p style="text-align:center; color:#64748b; font-weight:bold; margin-top: 50px;">Your cart is empty.</p>`:N.forEach((e,n)=>{t+=parseFloat(e.price),V.innerHTML+=`
                    <div class="cart-item-row">
                        <img src="${e.img}" class="cart-item-img">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${e.name}</div>
                            <div class="cart-item-price">₱ ${e.price}</div>
                        </div>
                        <div><button class="btn-remove-item" data-index="${n}" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></div>
                    </div>
                `}),te.innerText=`₱ ${t.toFixed(2)}`}window.handleRewind=e=>{L[e],L.splice(e,1),F=Math.max(0,F-1),J()};function fe(){let e=document.getElementById(`rewindList`);e&&(e.innerHTML=``,L.length===0?e.innerHTML=`
                <div style="text-align:center; padding: 20px; opacity:0.5;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="font-size:0.85rem; font-weight:600;">History is empty</p>
                </div>`:L.forEach((t,n)=>{e.innerHTML+=`
                    <div class="rewind-item" data-index="${n}" onclick="handleRewind(${n})">
                        <img src="${t.imgs[0]}" alt="${t.name}">
                        <div class="rewind-info">
                            <strong>${t.name}</strong>
                            <span>${t.breed}</span>
                        </div>
                        <button class="btn-undo" title="Bring Back">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                `}))}function J(){if(P.length===0||F>=P.length){document.getElementById(`datingContentLayout`).style.display=`none`;let e=document.getElementById(`instructionOverlay`);e.style.display=`flex`,e.innerHTML=`<i class="fa-solid fa-face-frown-open" style="color: #cbd5e1; font-size: 4rem; margin-bottom: 15px;"></i><p>No more matches available<br>for this pet at the moment.</p>`;return}let e=P[F];currentPhotoIndex=0;let t=document.getElementById(`candThumbnails`);t.innerHTML=``,e.imgs.forEach((e,n)=>{t.innerHTML+=`<img src="${e}" class="cand-thumb ${n===0?`active`:``}" data-index="${n}" alt="Photo ${n+1}">`}),pe(e,0);let n=e.gender===`Male`?`<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>`:`<i class="fa-solid fa-venus" style="color: #f472b6;"></i>`;document.getElementById(`candNameAge`).innerHTML=`${e.name}, ${e.age} ${n}`,document.getElementById(`candBreedGender`).innerHTML=`<i class="fa-solid fa-paw"></i> ${e.breed}`,document.getElementById(`candDesc`).innerText=e.desc,document.getElementById(`candScoreText`).innerText=`${e.score}% Match`,document.getElementById(`candScoreBar`).style.width=`${e.score}%`;let r=document.getElementById(`candBadges`);r.innerHTML=``,e.badges.includes(`vet`)&&(r.innerHTML+=`<span class="v-badge badge-vet"><i class="fa-solid fa-stethoscope"></i> Vet Verified</span>`),e.badges.includes(`pedigree`)&&(r.innerHTML+=`<span class="v-badge badge-pedigree"><i class="fa-solid fa-dna"></i> Purebred</span>`),e.badges.includes(`vax`)&&(r.innerHTML+=`<span class="v-badge badge-vax"><i class="fa-solid fa-syringe"></i> Vaccinated</span>`);let i=document.getElementById(`candTraits`);i.innerHTML=``,e.traits.forEach(e=>{i.innerHTML+=`<span class="trait-tag">${e}</span>`}),document.getElementById(`candOwnerName`).innerText=e.ownerName,document.getElementById(`candOwnerInitial`).innerText=e.ownerInitial,document.getElementById(`candOwnerRating`).innerText=`⭐ ${e.ownerRating}`,document.getElementById(`candOwnerPairs`).innerText=`${e.successPairs} Successful Pairs`,document.getElementById(`barSize`).style.width=`${e.compSize}%`,document.getElementById(`txtSize`).innerText=`${e.compSize}%`,document.getElementById(`barEnergy`).style.width=`${e.compEnergy}%`,document.getElementById(`txtEnergy`).innerText=`${e.compEnergy}%`,document.getElementById(`barTemp`).style.width=`${e.compTemp}%`,document.getElementById(`txtTemp`).innerText=`${e.compTemp}%`;let a=document.getElementById(`litterPredictor`);a.innerHTML=``,e.litter.forEach(e=>{let t=e.c===`#FFFFFF`||e.c===`#FFF8DC`?`#0f172a`:`white`;a.innerHTML+=`<div class="color-swatch" style="background:${e.c}; color:${t};">${e.p}%</div>`}),document.getElementById(`instructionOverlay`).style.display=`none`,document.getElementById(`datingContentLayout`).style.display=`flex`,document.getElementById(`treatCountDisplay`).innerText=`${R} Left`,fe()}function pe(e,t){let n=document.getElementById(`candImg`);n.style.opacity=0,setTimeout(()=>{n.src=e.imgs[t],n.style.opacity=1},150),document.querySelectorAll(`.cand-thumb`).forEach((e,n)=>{n===parseInt(t)?e.classList.add(`active`):e.classList.remove(`active`)})}z.forEach(e=>{e.addEventListener(`click`,function(){z.forEach(e=>e.classList.remove(`active`)),this.classList.add(`active`);let e=this.getAttribute(`data-target`);e===`home`?G():e===`pets`?B.innerHTML=ne:e===`applications`?B.innerHTML=re():e===`vet`?(B.innerHTML=oe(),K()):e===`shop`?(B.innerHTML=le(),q()):e===`breeding`&&(B.innerHTML=de(),I=null)})}),document.getElementById(`btnViewProfile`).addEventListener(`click`,()=>{z.forEach(e=>e.classList.remove(`active`)),B.innerHTML=ee,ge()}),document.getElementById(`btnRegisterPet`).addEventListener(`click`,()=>{z.forEach(e=>e.classList.remove(`active`)),B.innerHTML=ue;let e=document.getElementById(`imageDropZone`),t=document.getElementById(`petImageInput`),n=document.getElementById(`imagePreview`),r=document.getElementById(`dropZoneText`);e.addEventListener(`click`,()=>t.click()),x=null,t.addEventListener(`change`,function(){if(this.files&&this.files[0]){x=this.files[0];let e=new FileReader;e.onload=function(e){n.src=e.target.result,n.style.display=`block`,r.style.display=`none`},e.readAsDataURL(this.files[0])}}),document.getElementById(`btnCancelReg`).addEventListener(`click`,()=>{G(),z[0].classList.add(`active`)})}),B.addEventListener(`click`,async e=>{if(e.target.classList.contains(`profile-tab-btn`)){document.querySelectorAll(`.profile-tab-btn`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.profile-tab-content`).forEach(e=>e.classList.remove(`active`)),e.target.classList.add(`active`);let t=e.target.getAttribute(`data-tab`);document.getElementById(t).classList.add(`active`)}let r=e.target.closest(`.btn-view-app`)||e.target.closest(`.btn-view-pet`);if(r){let e=r.getAttribute(`data-target`),t=document.getElementById(e),n=r.closest(`.app-card`)||r.closest(`.pet-card`);t.style.display===`block`?(t.style.display=`none`,n.classList.remove(`dropdown-open`)):(t.style.display=`block`,n.classList.add(`dropdown-open`))}let i=e.target.closest(`.btn-close-pet`);if(i){let e=i.getAttribute(`data-target`),t=document.getElementById(e),n=t.previousElementSibling;t.style.display=`none`,n.classList.remove(`dropdown-open`)}let u=e.target.closest(`.btn-adopt`);if(u){let e=u.getAttribute(`data-petid`),t=u.getAttribute(`data-petname`);B.innerHTML=ae(e,t)}e.target.closest(`#btnBackToPets`)&&(B.innerHTML=ne),e.target.closest(`.btn-edit-profile`)&&(document.getElementById(`editProfileModal`).style.display=`flex`);let d=e.target.closest(`.btn-archive-pet`);if(d){let e=d.getAttribute(`data-petid`);k(`Move to Bin?`,`Are you sure you want to move this pet to the Recycle Bin?`,async()=>{let r=_.find(t=>t.id===e);if(!r){D(`Error`,`Pet record not found.`,!0);return}try{await n.createDocument(a,l,t.unique(),{name:r.name,breed:r.breed,gender:r.gender,owner:f,img:r.img||``}),await n.deleteDocument(a,o,e),await w(`Moved a pet to the Recycle Bin`,r.name,`fa-trash-can`),D(`Moved to Bin`,`Pet successfully moved to Recycle Bin.`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Move to Bin Error:`,e),D(`Error`,e.message,!0)}})}e.target.closest(`#btnViewBin`)&&(B.innerHTML=ie()),e.target.closest(`#btnEmptyBin`)&&k(`Empty Bin?`,`WARNING: Are you sure you want to permanently delete ALL pets in the Recycle Bin? This cannot be undone!`,async()=>{try{for(let e of b)await n.deleteDocument(a,l,e.id);await w(`Permanently emptied the Recycle Bin`,``,`fa-dumpster-fire`),D(`Bin Emptied`,`Recycle bin emptied successfully.`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Empty Bin Error:`,e),D(`Error`,e.message,!0)}}),e.target.closest(`#btnBackToProfile`)&&(B.innerHTML=ee,ge());let p=e.target.closest(`.btn-restore-pet`);if(p){let e=p.getAttribute(`data-petid`),r=b.find(t=>t.id===e);if(r)try{await n.createDocument(a,o,t.unique(),{name:r.name,breed:r.breed,gender:r.gender,age:`1 yr`,status:`Available`,health_status:`Healthy`,owner:f,contact_number:g||`0917-000-0000`,personal_traits:`Friendly`,reason_for_adoption:`Restored from Recycle Bin`,img:r.img||``}),await n.deleteDocument(a,l,e),await w(`Restored a pet from the Recycle Bin`,r.name,`fa-rotate-left`),D(`Restored!`,`Pet has been restored to the active board!`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Restore Error:`,e),D(`Error`,e.message,!0)}}let m=e.target.closest(`.btn-cancel-app`);if(m){let e=m.getAttribute(`data-appid`);k(`Cancel Application?`,`Are you sure you want to cancel this application?`,async()=>{try{await n.deleteDocument(a,s,e),await w(`Cancelled adoption application`,``,`fa-file-circle-xmark`),D(`Cancelled`,`Application successfully cancelled.`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Cancel App Error:`,e),D(`Error`,e.message,!0)}})}let h=e.target.closest(`.btn-cancel-vet`);if(h){let e=h.getAttribute(`data-appid`);k(`Cancel Appointment?`,`Are you sure you want to cancel this veterinary appointment?`,async()=>{try{await n.deleteDocument(a,c,e),await w(`Cancelled veterinary appointment`,``,`fa-calendar-xmark`),D(`Cancelled`,`Appointment successfully cancelled.`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Cancel Vet Error:`,e),D(`Error`,e.message,!0)}})}let v=e.target.closest(`.pet-select-card`);if(v&&document.getElementById(`apptPetSelectorHidden`)){document.querySelectorAll(`.pet-select-card`).forEach(e=>e.classList.remove(`selected`)),v.classList.add(`selected`);let e=v.getAttribute(`data-pet`);document.getElementById(`apptPetSelectorHidden`).value=e;let t=myPetsDB[e];t&&(document.getElementById(`apptOwner`).value=t.owner,document.getElementById(`apptPetType`).value=t.type,document.getElementById(`apptBreed`).value=t.breed,document.getElementById(`apptGender`).value=t.gender,document.getElementById(`apptWeight`).value=t.weight)}if(e.target.closest(`#btnPrevVet`)&&(M=(M-1+j.length)%j.length,K()),e.target.closest(`#btnNextVet`)&&(M=(M+1)%j.length,K()),e.target.closest(`#btnSelectVet`)){let e=j[M];document.getElementById(`apptVetIdHidden`).value=M,document.getElementById(`apptSelectedVetName`).value=e.name,K()}if(e.target.classList.contains(`btn-add-cart`)){N.push({name:e.target.getAttribute(`data-name`),price:e.target.getAttribute(`data-price`),img:e.target.getAttribute(`data-img`)}),q();let t=e.target.innerText;e.target.innerText=`✓ Added`,e.target.style.background=`#10b981`,e.target.style.color=`white`,e.target.style.borderColor=`#10b981`,setTimeout(()=>{e.target.innerText=t,e.target.style.background=`white`,e.target.style.color=`#4f46e5`,e.target.style.borderColor=`#4f46e5`},1e3)}if(e.target.classList.contains(`btn-buy-now`)){let t=e.target.closest(`.shop-card`).querySelector(`.btn-add-cart`);N.push({name:t.getAttribute(`data-name`),price:t.getAttribute(`data-price`),img:t.getAttribute(`data-img`)}),q(),document.getElementById(`cartModalOverlay`).style.display=`flex`}e.target.closest(`#btnOpenCart`)&&(document.getElementById(`cartModalOverlay`).style.display=`flex`),e.target.closest(`.mode-btn`)&&(document.querySelectorAll(`.mode-btn`).forEach(e=>e.classList.remove(`active`)),e.target.closest(`.mode-btn`).classList.add(`active`),I&&document.querySelector(`[data-pet="${I}"]`).click());let y=e.target.closest(`.pet-select-card`);if(y&&document.getElementById(`vetBookingForm`)){document.querySelectorAll(`.pet-select-card`).forEach(e=>e.classList.remove(`selected`)),y.classList.add(`selected`);let e=y.getAttribute(`data-petid`);document.getElementById(`apptPetSelectorHidden`).value=e;let t=_.find(t=>t.id.toString()===e);t&&(document.getElementById(`apptOwner`).value=f,document.getElementById(`apptPetType`).value=t.breed&&t.breed.toLowerCase().includes(`cat`)?`Cat`:`Dog`,document.getElementById(`apptBreed`).value=t.breed||`Unknown`,document.getElementById(`apptGender`).value=t.gender||`Unknown`)}let x=e.target.closest(`.my-pet-card`);if(x&&!document.getElementById(`apptPetSelectorHidden`)){document.querySelectorAll(`.my-pet-card`).forEach(e=>e.classList.remove(`active`)),x.classList.add(`active`),I=x.getAttribute(`data-petid`),_.find(e=>e.id.toString()===I),document.getElementById(`datingContentLayout`).style.display=`none`;let e=document.getElementById(`instructionOverlay`);e.style.display=`flex`,e.innerHTML=`<div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div><p>Scanning database for verified matches...</p>`,Promise.resolve().then(()=>({status:`success`,candidates:_.filter(e=>e.owner!==f).map(e=>({id:e.id,name:e.name,breed:e.breed,gender:e.gender,age:e.age,photos:[e.img],imgs:[e.img],owner:e.owner||`PawUser`,ownerName:e.owner||`PawUser`,score:94,traits:e.personal_traits?e.personal_traits.split(`,`).map(e=>e.trim()):[`Playful`,`Friendly`],desc:e.reason_for_adoption||`Looking for a friend!`,verified:!0}))})).then(t=>{t.status===`success`&&t.candidates.length>0?(P=t.candidates,F=0,setTimeout(()=>{J()},800)):e.innerHTML=`<p style="color:#64748b; font-weight:bold; font-size:1.1rem;">No match candidates available right now. Invite friends or register more pets!</p>`})}let C=e.target.closest(`.cand-thumb`);if(C){let e=P[F];pe(e,C.getAttribute(`data-index`))}let T=e.target.closest(`#btnPassCandidate`),E=e.target.closest(`#btnMatchCandidate`),O=e.target.closest(`#btnTreatCandidate`);if(T||E||O){let e=P[F],t=_.find(e=>e.id.toString()===I),n=`pass`;if(E&&(n=`like`),O&&(n=`super_like`),n===`super_like`&&R<=0){D(`Out of Treats`,`You have used all your Super Treats for today! Come back tomorrow.`,!0);return}Promise.resolve({status:`success`,isMatch:!0}).then(r=>{if(r.status===`success`){if(n===`super_like`&&R--,L.unshift(e),L.length>5&&L.pop(),n!==`pass`){w(n===`super_like`?`Sent a Super Treat to`:`Sent a match request to`,e.name,`fa-heart`),document.getElementById(`matchImgLeft`).src=t.img,document.getElementById(`matchImgRight`).src=e.imgs[0],document.getElementById(`matchNameLeft`).innerText=t.name,document.getElementById(`matchNameRight`).innerText=e.name;let i=r.isMatch?`✨ IT'S A MATCH! ✨`:n===`super_like`?`Super Liked! 🦴 (Pending)`:`Pending Owner Approval`;document.getElementById(`matchDateSpot`).innerText=`PawTrack Verified`;let a=document.getElementById(`matchIcebreaker`);a.value=r.isMatch?`You matched! Let's plan a playdate!`:``,a.placeholder=r.isMatch?`Type a message...`:`Say hi to ${e.ownerName} while you wait...`,document.getElementById(`btnContinueMatch`).setAttribute(`data-targetuser`,e.ownerName),document.getElementById(`matchOverlay`).style.display=`flex`,activePairs.unshift({id:`p`+Date.now(),maleName:t.gender===`Male`?t.name:e.name,femaleName:t.gender===`Female`?t.name:e.name,maleImg:t.gender===`Male`?t.img:e.imgs[0],femaleImg:t.gender===`Female`?t.img:e.imgs[0],status:i,isApproved:r.isMatch,date:`Just Now`,ownerUsername:e.ownerName})}F++,J()}else D(`Error`,r.message,!0)}).catch(e=>console.error(`Swipe Error:`,e))}e.target.closest(`#btnOpenPrefs`)&&(document.getElementById(`prefModal`).style.display=`flex`),e.target.closest(`#btnViewActivePairs`)&&W(),e.target.closest(`#btnBackToMatch`)&&(B.innerHTML=de(),I=null);let A=e.target.closest(`.btn-accept-match`),z=e.target.closest(`.btn-delete-pair`);if(A||z){let e=A?`accept`:`delete`,t=(A||z).getAttribute(`data-matchid`);if(e===`delete`)k(z.getAttribute(`data-title`)||`Cancel Request`,z.getAttribute(`data-msg`)||`Are you sure you want to remove this match?`,()=>{S=S.filter(e=>e.id!==t),W()});else{let e=S.find(e=>e.id===t);e&&(e.status=`approved`),W()}}}),document.getElementById(`btnCloseCart`).addEventListener(`click`,()=>document.getElementById(`cartModalOverlay`).style.display=`none`),document.getElementById(`btnContinueShopping`).addEventListener(`click`,()=>document.getElementById(`cartModalOverlay`).style.display=`none`),document.getElementById(`btnCheckout`).addEventListener(`click`,()=>{if(N.length===0){D(`Empty Cart`,`Your cart is empty! Please add some items first.`,!0);return}w(`Completed a Pet Shop checkout`,``,`fa-bag-shopping`),N=[],q(),document.getElementById(`cartModalOverlay`).style.display=`none`,D(`Order Placed!`,`Order placed successfully! Thank you for shopping.`,!1)}),document.getElementById(`cartItemsContainer`).addEventListener(`click`,e=>{let t=e.target.closest(`.btn-remove-item`);t&&(N.splice(parseInt(t.getAttribute(`data-index`)),1),q())}),document.getElementById(`btnContinueMatch`).addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-targetuser`),n=document.getElementById(`matchIcebreaker`).value.trim();n&&t&&(C[t]||(C[t]=[]),C[t].push({text:n,type:`sent`,time:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}),w(`Sent an Icebreaker message to`,t,`fa-comment-dots`)),document.getElementById(`matchOverlay`).style.display=`none`,W()}),document.getElementById(`btnSavePrefs`).addEventListener(`click`,()=>{document.getElementById(`prefModal`).style.display=`none`,I&&document.querySelector(`[data-pet="${I}"]`).click()}),document.getElementById(`prefModal`).addEventListener(`click`,e=>{e.target===document.getElementById(`prefModal`)&&(document.getElementById(`prefModal`).style.display=`none`)}),B.addEventListener(`submit`,e=>{if(e.target.id===`vetBookingForm`){e.preventDefault();let r=document.getElementById(`apptPetSelectorHidden`).value,i=document.getElementById(`apptVetIdHidden`).value;if(!r){D(`Error`,`Please select a pet for the appointment by clicking their picture!`,!0);return}if(!i){D(`Error`,`Please choose a veterinarian by clicking 'Confirm' on the profile card!`,!0);return}let o=document.querySelector(`.pet-select-card[data-petid="${r}"] span`).innerText,s=document.getElementById(`apptSelectedVetName`).value,l=_.find(e=>e.id?.toString()===r?.toString());(async()=>{try{await n.createDocument(a,c,t.unique(),{pet_name:o,vet_name:s,status:`Upcoming`,time:document.getElementById(`apptTime`).value||``,date:document.getElementById(`apptDate`).value||``,user_id:m,img:l?.img||``}),await w(`Booked vet visit for`,o,`fa-user-doctor`),D(`Request Sent!`,`Appointment scheduled successfully! It is now Upcoming.`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Vet Booking Error:`,e),D(`Error`,e.message,!0)}})()}if(e.target.id===`adoptionApplicationForm`){if(e.preventDefault(),!document.getElementById(`adoptTerms`).checked){D(`Missing Requirement`,`You must agree to the terms and conditions.`,!0);return}let r=document.getElementById(`adoptPetId`).value,i=document.getElementById(`adoptPetName`).value,o=_.find(e=>e.id?.toString()===r?.toString());(async()=>{try{await n.createDocument(a,s,t.unique(),{pet_name:i,date:new Date().toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}),status:`Pending Review`,user_id:m,img:o?.img||``}),await w(`Applied to adopt`,i,`fa-house-chimney-user`),D(`Application Sent!`,`Successfully submitted! Status: PENDING REVIEW.`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Adoption Application Error:`,e),D(`Error`,e.message,!0)}})()}(e.target.id===`petRegistrationForm`||e.target.id===`registerPetForm`)&&(e.preventDefault(),(async()=>{let i=document.getElementById(`petImageInput`),s=x||i&&i.files&&i.files[0],c=``;if(s)try{D(`Uploading Photo`,`Saving pet photo to PawTrack Storage...`,!1);let e=await r.createFile(d,t.unique(),s);c=r.getFileView(d,e.$id).toString()}catch(e){console.error(`Storage upload failed:`,e)}c||=`https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80`;let l=document.getElementById(`regForAdoption`),u=!l||l.checked,p=new FormData(e.target),m={name:p.get(`name`)||document.getElementById(`regPetName`)?.value||`Unnamed Pet`,breed:p.get(`breed`)||document.getElementById(`regBreed`)?.value||`Mixed Breed`,gender:p.get(`gender`)||document.getElementById(`regGender`)?.value||`Male`,age:p.get(`age`)||document.getElementById(`regAge`)?.value||`1 yr`,status:u?`Available`:`Private`,health_status:p.get(`health_status`)||`Healthy / Vaccinated`,owner:f,contact_number:p.get(`contact_number`)||g||`0917-000-0000`,personal_traits:p.get(`personal_traits`)||document.getElementById(`regDesc`)?.value||`Friendly`,reason_for_adoption:p.get(`reason_for_adoption`)||(u?`Looking for a home`:`Personal pet`),img:c};try{await n.createDocument(a,o,t.unique(),m),await w(u?`Listed pet for adoption`:`Registered private pet`,m.name,`fa-shield-cat`),D(`Success!`,u?`Pet Registered Successfully! Photo saved to PawTrack Storage and listed on the adoption board.`:`Pet added to your personal roster! Photo saved to PawTrack Storage.`,!1,()=>{window.location.reload()})}catch(e){console.error(`Appwrite Pet Registration Error:`,e),D(`Error`,`Could not register pet: `+e.message,!0)}})())}),B.addEventListener(`reset`,e=>{e.target.id===`vetBookingForm`&&(document.querySelectorAll(`.pet-select-card`).forEach(e=>e.classList.remove(`selected`)),document.getElementById(`apptPetSelectorHidden`)&&(document.getElementById(`apptPetSelectorHidden`).value=``),document.getElementById(`apptVetIdHidden`)&&(document.getElementById(`apptVetIdHidden`).value=``),setTimeout(()=>{K()},10))});let me=document.getElementById(`editProfileForm`);me&&me.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`editFirstName`).value,n=document.getElementById(`editLastName`).value,r=document.getElementById(`editContact`).value,a=`${t} ${n}`.trim();try{a&&await i.updateName(a),await i.updatePrefs({...h,phone:r}),f=a,g=r,await w(`Updated profile settings & information`,``,`fa-user-pen`),document.getElementById(`editProfileModal`).style.display=`none`,D(`Profile Saved`,`Profile updated successfully!`,!1,()=>{window.location.reload()})}catch(e){D(`Error`,e.message,!0)}}),B.addEventListener(`input`,e=>{e.target.id===`shopPriceFilter`&&(document.getElementById(`shopPriceDisplay`).innerText=`₱${e.target.value}`,he())}),B.addEventListener(`change`,e=>{e.target.id===`shopCategoryFilter`&&he()});function he(){let e=document.getElementById(`shopCategoryFilter`).value,t=parseFloat(document.getElementById(`shopPriceFilter`).value),n=se.filter(n=>{let r=e===`All Categories`||n.category===e,i=n.price<=t;return r&&i});document.getElementById(`shopGridContainer`).innerHTML=ce(n)}async function ge(){let o=document.getElementById(`mainProfilePic`);o&&(o.src=h.avatarUrl||`/resources/avatar/Avatar 1.jpg`);let s=document.getElementById(`btnChangeAvatar`)||document.querySelector(`.btn-change-photo`),c=document.getElementById(`avatarFileInput`);s&&c&&(s.onclick=()=>c.click(),c.onchange=async function(){if(this.files&&this.files[0])try{D(`Uploading`,`Uploading avatar to PawTrack Storage...`,!1);let e=await r.createFile(d,t.unique(),this.files[0]),n=r.getFileView(d,e.$id).toString();await i.updatePrefs({...h,avatarUrl:n}),h.avatarUrl=n,o&&(o.src=n),await w(`Updated profile picture`,`Saved to PawTrack Storage`,`fa-camera`),D(`Success`,`Profile photo uploaded to PawTrack Storage!`)}catch(e){D(`Error`,`Failed to upload photo: `+e.message,!0)}});let l=document.getElementById(`profileFullName`),y=document.getElementById(`profileUsername`),b=document.getElementById(`profileEmail`),x=document.getElementById(`profilePhone`);l&&(l.innerText=f),y&&(y.innerText=h.username?`@`+h.username:`@`+p.split(`@`)[0]),b&&(b.innerText=p),x&&(x.innerText=g||`None`);let[S=``,...C]=(f||``).split(` `),T=C.join(` `),E=document.getElementById(`editFirstName`),O=document.getElementById(`editLastName`),k=document.getElementById(`editContact`),A=document.getElementById(`editEmail`);E&&(E.value=S),O&&(O.value=T),k&&(k.value=g||``),A&&(A.value=p||``);let j=_.filter(e=>e.owner===f),M=v.filter(e=>e.status===`Approved`).length,N=document.getElementById(`countOwnedPets`),P=document.getElementById(`countSuccessfulApps`);N&&(N.innerText=j.length),P&&(P.innerText=M);let F=document.getElementById(`privateRosterGrid`),I=document.getElementById(`adoptionRosterGrid`);F&&I&&(F.innerHTML=``,I.innerHTML=``,j.forEach(e=>{let t=`
                    <div class="roster-card">
                        <img src="${e.img}" class="roster-img">
                        <div class="roster-info"><h4>${e.name}</h4><p>${e.breed}</p></div>
                        <button class="btn-archive-pet" data-petid="${e.id}" title="Move to Bin" 
                            style="background: white; border: 2px solid #ef4444; color: #ef4444; padding: 6px 15px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s;" 
                            onmouseover="this.style.background='#ef4444'; this.style.color='white';" 
                            onmouseout="this.style.background='white'; this.style.color='#ef4444';">
                            <i class="fa-solid fa-trash-can"></i> Bin
                        </button>
                    </div>
                `;e.status===`Private`?F.innerHTML+=t:I.innerHTML+=t}));let L=document.getElementById(`recentActivityLogs`);if(L){L.innerHTML=`<p style="text-align:center; color:#94a3b8; padding:15px;">Loading activity logs...</p>`;try{let t=await n.listDocuments(a,u,[e.equal(`user_id`,m),e.orderDesc(`$createdAt`),e.limit(20)]);L.innerHTML=``;let r=t.documents;r.length>0?r.forEach(e=>{let t=parseInt(e.timestamp)||new Date(e.$createdAt).getTime(),n=new Date(t),r=n.toLocaleTimeString([],{hour:`numeric`,minute:`2-digit`});L.innerHTML+=`
                            <div class="activity-item">
                                <div class="activity-icon"><i class="fa-solid ${e.icon}"></i></div>
                                <div class="activity-details">
                                    <p><strong>${e.action}</strong> ${e.target?`"`+e.target+`"`:``}</p>
                                    <small>${n.toLocaleDateString()} at ${r}</small>
                                </div>
                            </div>
                        `}):L.innerHTML=`
                        <div class="activity-item">
                            <div class="activity-icon"><i class="fa-solid fa-user-check"></i></div>
                            <div class="activity-details">
                                <p><strong>Account verified</strong> and ready to use!</p>
                                <small>System Log</small>
                            </div>
                        </div>
                    `}catch(e){console.warn(`Could not load activity logs:`,e),L.innerHTML=`<p style="text-align:center; color:#94a3b8; padding:15px;">No activity recorded yet.</p>`}}}let _e=document.getElementById(`chatFab`),Y=document.getElementById(`chatWindow`),ve=document.getElementById(`chatCloseBtn`),ye=document.getElementById(`chatBackBtn`),be=document.getElementById(`btnNewChat`),xe=document.getElementById(`chatTitle`),X=document.getElementById(`chatListView`),Se=document.getElementById(`chatConvoView`),Z=document.getElementById(`chatMessagesBox`),Ce=document.getElementById(`chatInputField`),we=document.getElementById(`btnSendMsg`),Q=null;_e.addEventListener(`click`,()=>{Y.classList.toggle(`active`),Y.classList.contains(`active`)&&Ee()}),ve.addEventListener(`click`,()=>Y.classList.remove(`active`));let Te=document.getElementById(`btnLogout`);Te&&Te.addEventListener(`click`,async()=>{try{await i.deleteSession(`current`)}catch(e){console.warn(e)}window.location.href=`/PawTrackLogin.html`});function Ee(){Se.style.display=`none`,X.style.display=`flex`,ye.style.display=`none`,be.style.display=`flex`,xe.innerHTML=`<i class="fa-solid fa-messages"></i> Messages`,Q=null,X.innerHTML=`<p style="text-align:center; margin-top:20px; color:#64748b;">Loading...</p>`,Promise.resolve().then(()=>({status:`success`,inbox:Object.keys(C).map(e=>{let t=C[e],n=t[t.length-1];return{contact:e,last_message:n.text,time:n.time,unread:0}})})).then(e=>{if(e.status===`success`){if(X.innerHTML=``,e.inbox.length===0){X.innerHTML=`<p style="text-align:center; margin-top:20px; color:#64748b; font-weight:bold;">No messages yet.<br><br>Click the + icon to start a chat with a username!</p>`;return}e.inbox.forEach(e=>{let t=e.unread>0?`<span class="chat-unread">${e.unread}</span>`:``;X.innerHTML+=`
                        <div class="chat-list-item" data-chat="${e.contact}">
                            <div class="chat-avatar ai-avatar" style="background: linear-gradient(135deg, #4f46e5, #ec4899);"><i class="fa-solid fa-user"></i></div>
                            <div class="chat-list-info">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <h4>@${e.contact}</h4>
                                    <span style="font-size:0.7rem; color:#94a3b8;">${e.time}</span>
                                </div>
                                <p>${e.last_message}</p>
                            </div>
                            ${t}
                        </div>
                    `})}})}ye.addEventListener(`click`,Ee);function $(e){Q=e,xe.innerHTML=`<i class="fa-solid fa-user"></i> @${e}`,ye.style.display=`flex`,be.style.display=`none`,X.style.display=`none`,Se.style.display=`flex`,Z.innerHTML=`<p style="text-align:center; color:#64748b; font-size:0.8rem;">Loading conversation...</p>`,Promise.resolve().then(()=>({status:`success`,messages:C[e]||[]})).then(e=>{e.status===`success`&&(Z.innerHTML=``,e.messages.length===0&&(Z.innerHTML=`<p style="text-align:center; color:#94a3b8; font-size:0.85rem; margin-top: 20px;">This is the beginning of your chat history.</p>`),e.messages.forEach(e=>De(e.text,e.type,e.time)))})}X.addEventListener(`click`,e=>{let t=e.target.closest(`.chat-list-item`);t&&$(t.getAttribute(`data-chat`))}),be.addEventListener(`click`,()=>{O(`Start a Chat`,`Enter the exact PawTrack username of the person you want to message:`,e=>{$(e)})}),B.addEventListener(`click`,e=>{let t=e.target.closest(`.btn-message-owner`);if(t){let e=t.getAttribute(`data-owner`);Y.classList.add(`active`),_e.querySelector(`.badge`).style.display=`none`,$(e)}});function De(e,t,n){let r=document.createElement(`div`);r.className=`msg-bubble msg-${t}`,r.innerHTML=`${e}<div class="msg-time">${n}</div>`,Z.appendChild(r),Z.scrollTop=Z.scrollHeight}function Oe(){let e=Ce.value.trim();if(!e||!Q)return;let t=new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`});De(e,`sent`,`Sending...`),Ce.value=``;let n=Z.lastElementChild.querySelector(`.msg-time`);Promise.resolve().then(()=>(C[Q]||(C[Q]=[]),C[Q].push({text:e,type:`sent`,time:t}),{status:`success`,time:t})).then(e=>{e.status===`success`?n&&(n.innerText=e.time):(D(`Message Failed`,e.message,!0),Z.lastElementChild&&Z.lastElementChild.remove())})}we.addEventListener(`click`,Oe),Ce.addEventListener(`keypress`,e=>{e.key===`Enter`&&Oe()})});