import { client, account, databases, storage } from './appwrite.js';
import { Query, ID } from 'appwrite';

// Appwrite Configuration
const DB_ID = 'pawtrack_db';
const COLL_PETS = 'pets';
const COLL_APPS = 'applications';
const COLL_VET = 'vet_appointments';
const COLL_BIN = 'recycle_bin';
const COLL_LOGS = 'activity_logs';
const BUCKET_ID = 'pawtrack_storage';

let CURRENT_USER = '';
let CURRENT_USER_EMAIL = '';
let CURRENT_USER_ID = '';
let CURRENT_USER_PREFS = {};
let CURRENT_USER_PHONE = '';
let REAL_DB_PETS = [];
let USER_APPS = [];
let USER_VET_APPS = [];
let BIN_PETS = [];
let selectedPetFile = null;
let ACTIVE_MATCHES = [];
let CHATS_STORE = {};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await account.get();
        CURRENT_USER = user.name;
        CURRENT_USER_EMAIL = user.email;
        CURRENT_USER_ID = user.$id;
        
        CURRENT_USER_PREFS = user.prefs || {};
        CURRENT_USER_PHONE = user.prefs?.phone || '';

        const nameDisplay = document.getElementById('userNameDisplay');
        if (nameDisplay) {
            nameDisplay.innerText = CURRENT_USER ? 'Welcome, ' + CURRENT_USER + '!' : 'Welcome!';
        }

        try {
            const petsRes = await databases.listDocuments(DB_ID, COLL_PETS);
            REAL_DB_PETS = petsRes.documents.map(d => ({ ...d, id: d.$id }));
            
            const appsRes = await databases.listDocuments(DB_ID, COLL_APPS, [
                Query.equal('user_id', CURRENT_USER_ID)
            ]);
            USER_APPS = appsRes.documents.map(d => ({ ...d, id: d.$id }));
            
            const vetRes = await databases.listDocuments(DB_ID, COLL_VET, [
                Query.equal('user_id', CURRENT_USER_ID)
            ]);
            USER_VET_APPS = vetRes.documents.map(d => ({ ...d, id: d.$id }));
            
            const binRes = await databases.listDocuments(DB_ID, COLL_BIN, [
                Query.equal('owner', CURRENT_USER)
            ]);
            BIN_PETS = binRes.documents.map(d => ({ ...d, id: d.$id }));
        } catch(dbErr) {
            console.warn("Database collections not fully setup yet. Using empty arrays.", dbErr);
        }

    } catch (e) {
        console.error("User not logged in", e);
        window.location.href = '/PawTrackLogin.html';
        return;
    }
    async function addActivityLog(actionText, petName, iconClass) {
        try {
            await databases.createDocument(DB_ID, COLL_LOGS, ID.unique(), {
                user_id: CURRENT_USER_ID,
                action: actionText || 'Activity recorded',
                target: petName || '',
                icon: iconClass || 'fa-paw',
                timestamp: Date.now().toString()
            });
        } catch (err) {
            console.warn("Failed to persist activity log to Appwrite:", err);
        }
    }

    function lockDashboardScale() {
        // Natural fluid responsiveness handled purely by modern CSS Grid & Flexbox!
        document.body.style.zoom = '1';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        if (navigator.userAgent.toLowerCase().includes('firefox')) {
            document.body.style.transform = 'none';
        }
    }
   
    let popupTimer;
    
    function showCustomPopup(title, message, isError = false, callback = null) {
        const overlay = document.getElementById('customPopupOverlay');
        const titleEl = document.getElementById('customPopupTitle');
        const messageEl = document.getElementById('customPopupMessage');
        const actionsEl = document.getElementById('customPopupActions');

        titleEl.innerText = title;
        messageEl.innerText = message;
        titleEl.className = isError ? 'custom-popup-title title-error' : 'custom-popup-title title-success';
        
        actionsEl.style.display = 'none'; // Hide buttons for normal alerts
        overlay.style.display = 'flex';

        clearTimeout(popupTimer);
        popupTimer = setTimeout(() => { closePopup(callback); }, 5000);

        document.getElementById('customPopupClose').onclick = () => {
            clearTimeout(popupTimer);
            closePopup(callback);
        };
    }

    // NEW: Function specifically for Yes/No confirmations!
    function showCustomPrompt(title, message, onSubmitCallback) {
        const overlay = document.getElementById('customPopupOverlay');
        const titleEl = document.getElementById('customPopupTitle');
        const messageEl = document.getElementById('customPopupMessage');
        const actionsEl = document.getElementById('customPopupActions');

        titleEl.innerText = title;
        titleEl.className = 'custom-popup-title title-success'; 
        
        // Inject an input field into the message area
        messageEl.innerHTML = `<p style="margin-bottom:10px;">${message}</p><input type="text" id="customPromptInput" style="width:100%; padding:12px; border-radius:8px; border:2px solid #cbd5e1; outline:none; font-size:1rem; font-weight:600; color:#0f172a;" autocomplete="off">`;

        actionsEl.style.display = 'flex'; 
        overlay.style.display = 'flex';
        clearTimeout(popupTimer);

        document.getElementById('btnPopupConfirm').innerText = "Submit";
        document.getElementById('btnPopupConfirm').onclick = () => {
            const val = document.getElementById('customPromptInput').value;
            closePopup();
            document.getElementById('btnPopupConfirm').innerText = "Yes, I'm sure"; // Reset text
            if(val.trim() !== "") onSubmitCallback(val.trim()); 
        };

        document.getElementById('customPopupClose').onclick = () => { closePopup(); };

        document.getElementById('btnPopupCancel').onclick = () => {
            closePopup();
            document.getElementById('btnPopupConfirm').innerText = "Yes, I'm sure";
        };
    }

    function showCustomConfirm(title, message, onConfirmCallback) {
        const overlay = document.getElementById('customPopupOverlay');
        const titleEl = document.getElementById('customPopupTitle');
        const messageEl = document.getElementById('customPopupMessage');
        const actionsEl = document.getElementById('customPopupActions');

        titleEl.innerText = title;
        titleEl.className = 'custom-popup-title title-error'; 
        messageEl.innerHTML = `<p>${message}</p>`; 

        actionsEl.style.display = 'flex'; 
        overlay.style.display = 'flex';
        clearTimeout(popupTimer);

        document.getElementById('btnPopupConfirm').innerText = "Yes, I'm sure";
        document.getElementById('btnPopupConfirm').onclick = () => {
            closePopup();
            if(onConfirmCallback) onConfirmCallback();
        };

        document.getElementById('customPopupClose').onclick = () => { closePopup(); };

        document.getElementById('btnPopupCancel').onclick = () => {
            closePopup();
        };
    }

    function closePopup(callback) {
        document.getElementById('customPopupOverlay').style.display = 'none';
        if (callback) callback(); 
    }

    window.addEventListener('resize', lockDashboardScale);
    lockDashboardScale();
    // ==========================================



    const doctorsDB = [
        { initials: "MD", name: "Dr. Miguel Antonio Dela Cruz", specialty: "General Veterinary Practitioner", phone: "0917-555-0101", email: "mdelacruz@pawtrack.ph", schedule: "Mon-Fri: 8am-4pm", clinic: "Quezon City Main Clinic", exp: "15 yrs exp", rating: "4.8" },
        { initials: "JS", name: "Dr. Joanna Marie R. Santos", specialty: "Veterinary Surgeon", phone: "0917-555-0102", email: "jmsantos@pawtrack.ph", schedule: "Tue-Sat: 10am-6pm", clinic: "Makati Pet Hospital", exp: "12 yrs exp", rating: "4.9" },
        { initials: "PV", name: "Dr. Paulo C. Villanueva", specialty: "Veterinary Oncologist", phone: "0917-555-0103", email: "pvillanueva@pawtrack.ph", schedule: "Mon-Thu: 9am-5pm", clinic: "BGC Animal Center", exp: "8 yrs exp", rating: "4.7" }
    ];


    let currentVetIndex = 0;
    let cartItems = [];
    let currentFilteredCandidates = [];
    let currentCandidateIndex = 0;
    let selectedMyPetId = null;
    let passedPetsHistory = [];
    let treatsLeft = 3; 
    

    const navButtons = document.querySelectorAll('.sidebar-nav .nav-btn');
    const mainDisplayPanel = document.getElementById('mainDisplayPanel');
    const profileHTML = document.getElementById('profileTemplate').innerHTML;
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalDisplay = document.getElementById('cartTotalDisplay');

    const getPageHeader = (title, subtitle, icon) => `
        <div class="page-header">
            <div>
                <h2><i class="${icon}"></i> ${title}</h2>
                <p>${subtitle}</p>
            </div>
        </div>
    `;

    // --- DYNAMIC DATABASE FUNCTION (MEET THE PETS) ---
    function renderAvailablePetsHTML() {
        let petGridContent = "";

        if (typeof REAL_DB_PETS !== 'undefined' && REAL_DB_PETS.length > 0) {
            // Exclude Private pets from the public adoption board
            const publicPets = REAL_DB_PETS.filter(p => p.status === 'Available');
            
            if (publicPets.length > 0) {
                publicPets.forEach(pet => {
                    const genderClass = pet.gender === 'Female' ? 'gender-female' : 'gender-male';
                    
                    const isOwner = pet.owner === CURRENT_USER;
                    const deleteButtonHTML = isOwner ? `
                        <button class="btn-archive-pet" data-petid="${pet.id}" title="Move to Bin" 
                            style="background: #fee2e2; color: #ef4444; border: 2px solid #fca5a5; border-radius: 10px; padding: 10px; cursor: pointer; transition: 0.3s;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : '';

                    const petImgSrc = pet.img || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';

                    petGridContent += `
                        <div class="pet-item-wrapper">
                            <div class="pet-card ${genderClass}">
                                <img src="${petImgSrc}" alt="${pet.name}" class="pet-card-img">
                                <div class="pet-card-body">
                                    <h3 class="pet-name">${pet.name}</h3>
                                    <p class="pet-breed">${pet.breed}</p>
                                    <p class="pet-meta">${pet.gender} • ${pet.age}</p>
                                    <span class="status-badge">● ${pet.status}</span>
                                    
                                    <div class="pet-actions" style="display: flex; gap: 8px;">
                                        <button class="btn-view-pet" data-target="pet-details-${pet.id}" title="View Details" style="flex: 1;">
                                            Details <i class="fa-solid fa-chevron-down"></i>
                                        </button>
                                        
                                        ${deleteButtonHTML}

                                        <button class="btn-adopt" data-petid="${pet.id}" data-petname="${pet.name}" style="flex: 1;">Adopt Now</button>
                                    </div>
                                </div>
                            </div>
                            <div class="pet-details-dropdown ${genderClass}" id="pet-details-${pet.id}">
                                <div class="details-grid">
                                    <div class="detail-box"><label>Health Status</label><p>${pet.health_status || 'Healthy'}</p></div>
                                    <div class="detail-box"><label>Contact / Owner</label><p>@${pet.owner || 'PawTrack Caregiver'} <br><span style="font-size:0.85rem;">${pet.contact_number || '0917-000-0000'}</span></p></div>
                                </div>
                                <div class="detail-box" style="margin-bottom: 15px;">
                                    <label>Personality Traits</label><p>${pet.personal_traits || 'Friendly and loving companion'}</p>
                                </div>
                                <div class="detail-box" style="margin-bottom: 25px;">
                                    <label>Background / Reason for Adoption</label><p>${pet.reason_for_adoption || 'Looking for a warm forever family.'}</p>
                                </div>
                                <div style="text-align: right;">
                                    <button class="btn-close-pet" data-target="pet-details-${pet.id}">Close Details</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                petGridContent = `<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available for adoption.</p>`;
            }
        } else {
            petGridContent = `<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px;">There are no pets currently available in the system.</p>`;
        }

        return `
            <div class="page-container">
                ${getPageHeader("Meet the Pets", "Say hello to our furry friends currently waiting for a loving home.", "fa-solid fa-paw")}
                <div class="pet-grid">
                    ${petGridContent}
                </div>
            </div>
        `;
    }
    const availablePetsHTML = renderAvailablePetsHTML;
    function renderMyApplicationsHTML() {
        let inReviewCards = '';
        let approvedCards = '';

        if (typeof USER_APPS !== 'undefined' && USER_APPS.length > 0) {
            USER_APPS.forEach(app => {
                const isApproved = app.status === 'Approved';
                const statusBadgeBg = isApproved ? 'var(--emerald-light, #D1FAE5)' : 'var(--amber-light, #FEF3C7)';
                const statusBadgeColor = isApproved ? '#065F46' : '#92400E';
                const cardBorderColor = isApproved ? 'rgba(16, 185, 129, 0.3)' : 'rgba(217, 119, 6, 0.25)';

                const cardHTML = `
                <div class="app-item-wrapper" style="margin-bottom: 18px;">
                    <div class="app-card" style="border: 1px solid ${cardBorderColor}; border-radius: 18px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; box-shadow: 0 4px 16px rgba(45, 30, 20, 0.05); z-index: 2; position: relative;">
                        <div style="display: flex; gap: 16px; align-items: center;">
                            <img src="${app.img}" alt="${app.pet_name}" style="width: 64px; height: 64px; border-radius: 14px; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 2px solid white;">
                            <div>
                                <h3 style="margin: 0 0 4px 0; color: #1F2421; font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800;">${app.pet_name}</h3>
                                <small style="color: #6B7280; font-weight: 500;"><i class="fa-regular fa-calendar-check" style="margin-right: 4px; color: var(--primary);"></i> Applied: ${app.date}</small>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <span style="background: ${statusBadgeBg}; color: ${statusBadgeColor}; padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
                                <i class="fa-solid fa-circle" style="font-size: 0.45rem;"></i> ${app.status}
                            </span>
                            
                            <button class="${isApproved ? 'btn-adopt' : 'btn-view-app'}" data-target="app-details-${app.id}" style="${isApproved ? 'padding: 9px 20px;' : 'padding: 9px 18px; background: #FAF8F5; border: 1px solid rgba(45,49,46,0.12); color: #1F2421; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;'}">
                                ${isApproved ? '<i class="fa-solid fa-heart"></i> Finalize' : 'Details <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem;"></i>'}
                            </button>
                        </div>
                    </div>

                    <div class="app-details-dropdown" id="app-details-${app.id}" style="display: none; background: #FFFFFF; border: 1px solid rgba(45, 49, 46, 0.08); border-top: 1px dashed rgba(45, 49, 46, 0.15); border-radius: 0 0 18px 18px; padding: 24px; margin-top: -12px; position: relative; z-index: 1; box-shadow: 0 8px 24px rgba(45,30,20,0.06);">
                        <div class="details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div class="detail-box">
                                <label>Pet Name</label>
                                <p>${app.pet_name}</p>
                            </div>
                            <div class="detail-box">
                                <label>Date Applied</label>
                                <p>${app.date}</p>
                            </div>
                            <div class="detail-box" style="grid-column: 1 / -1;">
                                <label>Adoption Status Message</label>
                                <p style="color: ${isApproved ? '#065F46' : '#92400E'};">${isApproved ? '🎉 Congratulations! Your adoption request is approved. Get in touch with the shelter/owner to finalize handover.' : '⏳ Your application is currently under thorough review by the caregiver. We will notify you promptly!'}</p>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
                            ${!isApproved ? `<button class="btn-cancel-app" data-appid="${app.id}" style="padding: 10px 20px; background: white; color: #EF4444; border: 1px solid #FCA5A5; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-ban"></i> Withdraw Application</button>` : ''}
                            <button class="btn-close-pet" data-target="app-details-${app.id}" style="padding: 10px 20px; background: #FAF8F5; border: 1px solid rgba(45, 49, 46, 0.12); border-radius: 12px; color: #4B5563; font-weight: 700; cursor: pointer;">Close Details</button>
                        </div>
                    </div>
                </div>
            `;

                if (isApproved) {
                    approvedCards += cardHTML;
                } else {
                    inReviewCards += cardHTML;
                }
            });
        }

        return `
            <div class="page-container">
                ${getPageHeader("My Applications", "Track the journey of your adoption requests and welcome your new companion home.", "fa-solid fa-clipboard-list")}
                
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
                        ${inReviewCards || '<div class="glass-panel" style="text-align: center; padding: 40px; color: #9CA3AF;"><i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; color: #E5E7EB;"></i><p style="font-weight: 600;">No applications currently in review.</p></div>'}
                    </div>

                    <div>
                        <h3 class="app-column-title" style="color: #065F46;"><i class="fa-solid fa-circle-check" style="color: #10B981;"></i> Approved & Finalizing</h3>
                        ${approvedCards || '<div class="glass-panel" style="text-align: center; padding: 40px; color: #9CA3AF;"><i class="fa-solid fa-circle-check" style="font-size: 2.5rem; margin-bottom: 12px; color: #E5E7EB;"></i><p style="font-weight: 600;">No approved applications yet.</p></div>'}
                    </div>
                </div>
            </div>
        `;
    }

    // --- RECYCLE BIN PAGE TEMPLATE ---
    const renderRecycleBinHTML = () => {
        let binContent = "";
        if (typeof BIN_PETS !== 'undefined' && BIN_PETS.length > 0) {
            BIN_PETS.forEach(pet => {
                const genderClass = pet.gender === 'Female' ? 'gender-female' : 'gender-male';
                binContent += `
                    <div class="pet-item-wrapper">
                        <div class="pet-card ${genderClass}" style="opacity: 0.85;">
                            <img src="${pet.img}" alt="${pet.name}" class="pet-card-img" style="filter: grayscale(40%);">
                            <div class="pet-card-body">
                                <h3 class="pet-name">${pet.name}</h3>
                                <p class="pet-breed">${pet.breed}</p>
                                <p class="pet-meta" style="color: #ef4444;"><i class="fa-solid fa-trash-can"></i> In Recycle Bin</p>
                                
                                <div class="pet-actions" style="margin-top: auto; padding-top: 15px;">
                                    <button class="btn-restore-pet" data-petid="${pet.id}" style="width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s;">
                                        <i class="fa-solid fa-rotate-left"></i> Restore Pet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            binContent = `<p style="text-align:center; grid-column: 1/-1; color:#64748b; font-weight:bold; margin-top: 30px; font-size: 1.1rem;">Your Recycle Bin is empty.</p>`;
        }

       return `
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
                    ${binContent}
                </div>
            </div>
        `;
    };


    const generateAdoptionFormHTML = (petId, petName) => `
        <div class="registration-wrapper">
            <div class="page-header" style="margin-bottom: 15px;">
                <div>
                    <h2><i class="fa-solid fa-house-chimney-user" style="color: #ec4899;"></i> Adopt ${petName}</h2>
                    <p>Complete the form below to start your adoption journey.</p>
                </div>
                <button class="btn-animated" id="btnBackToPets" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Pets</button>
            </div>

            <form id="adoptionApplicationForm" class="reg-form-container" style="flex-direction: column; min-height: auto;">
                <input type="hidden" id="adoptPetId" value="${petId}">
                <input type="hidden" id="adoptPetName" value="${petName}">

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
    `;

    const applicationsHTML = `
        <div class="page-container">
            ${getPageHeader("My Applications", "Track the status of your adoption requests.", "fa-solid fa-clipboard-list")}
            <div class="applications-grid">
                <div class="app-column">
                    <h3 class="app-column-title"><i class="fa-solid fa-hourglass-half" style="color: #f59e0b;"></i> In Review</h3>
                    <div class="app-list">
                        <div class="app-item-wrapper">
                            <div class="app-card gender-male">
                                <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Maximus" class="app-img">
                                <div class="app-info"><h3 class="app-pet-name">Maximus</h3><p class="app-date">Applied on: Oct 14, 2025</p></div>
                                <span class="status-badge status-pending">● In Review</span>
                                <button class="btn-status btn-view-app" data-target="app-details-1">View <i class="fa-solid fa-chevron-down"></i></button>
                            </div>
                            <div class="app-details-dropdown gender-male" id="app-details-1">
                                <h3 style="margin-bottom: 15px; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Submitted Application Details</h3>
                                <div class="details-grid">
                                    <div class="detail-box"><label>Pet Name</label><p>Maximus</p></div>
                                    <div class="detail-box"><label>Breed</label><p>Beagle Mix</p></div>
                                    <div class="detail-box"><label>Gender</label><p>Male</p></div>
                                    <div class="detail-box"><label>Age</label><p>2 yrs</p></div>
                                </div>
                                <div class="detail-box" style="margin-bottom: 25px;">
                                    <label>Description & Story</label>
                                    <p>We have a large, fenced-in backyard and are looking for an active dog to join our family.</p>
                                </div>
                                <div style="display: flex; justify-content: flex-end; gap: 15px;">
                                    <button class="btn-close-pet" data-target="app-details-1">Close Details</button>
                                    <button class="btn-cancel-app">Cancel Application</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="app-column">
                    <h3 class="app-column-title"><i class="fa-solid fa-check-circle" style="color: #10b981;"></i> Approved</h3>
                    <div class="app-list">
                        <div class="app-item-wrapper">
                            <div class="app-card gender-female">
                                <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Luna" class="app-img">
                                <div class="app-info"><h3 class="app-pet-name">Luna</h3><p class="app-date">Applied on: Sep 28, 2025</p></div>
                                <span class="status-badge status-approved">● Approved</span>
                                <button class="btn-adopt" style="flex: none; padding: 10px 20px;">Finalize</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    function renderVetAppointmentsHTML() {
        let scheduledVisitsHTML = '';
        
        if (typeof USER_VET_APPS !== 'undefined' && USER_VET_APPS.length > 0) {
            USER_VET_APPS.forEach(app => {
                const isApproved = app.status === 'Approved';
                const statusClass = isApproved ? 'appt-approved' : 'appt-pending';
                const badgeClass = isApproved ? 'badge-approved' : 'badge-pending';
                
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const parts = app.date.split('-');
                const monthStr = parts.length === 3 ? months[parseInt(parts[1]) - 1] : 'TBD';
                const dayStr = parts.length === 3 ? parts[2] : '??';

                scheduledVisitsHTML += `
                    <div class="appt-mini-card ${statusClass}">
                        <div class="appt-date-box"><strong>${dayStr}</strong><span>${monthStr}</span></div>
                        <img src="${app.img}" alt="${app.pet_name}" class="appt-pet-avatar" style="object-fit: cover;">
                        <div class="appt-details">
                            <h4>${app.pet_name}'s Visit</h4>
                            <p>${app.vet_name}</p>
                            <span class="badge ${badgeClass}">${app.status} • ${app.time}</span>
                        </div>
                        
                        ${!isApproved ? `
                            <div style="margin-left: auto;">
                                <button class="btn-cancel-vet" data-appid="${app.appt_id || app.id}" title="Cancel Appointment" style="background: #fee2e2; border: 1px solid #fca5a5; color: #ef4444; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                `;
            });
        } else {
            scheduledVisitsHTML = '<p style="color: #64748b; margin-top: 10px; font-weight: 500;">No upcoming appointments.</p>';
        }

        // ---> NEW: DYNAMIC PET SELECTOR LOGIC
        let petSelectorHTML = '';
        
        // 1. Get ALL of the user's pets
        const allMyPets = REAL_DB_PETS.filter(pet => pet.owner === CURRENT_USER);

        // 2. Get the names of pets that ALREADY have an appointment
        // 2. Get the names of pets that ALREADY have an ACTIVE appointment
        let bookedPetNames = [];
        if (typeof USER_VET_APPS !== 'undefined') {
            // FIXED: We now ignore appointments that are Cancelled or Completed!
            bookedPetNames = USER_VET_APPS
                .filter(app => app.status !== 'Cancelled' && app.status !== 'Completed')
                .map(app => app.pet_name);
        }

        // 3. Filter the list to ONLY show pets that are NOT booked
        const availablePets = allMyPets.filter(pet => !bookedPetNames.includes(pet.name));

        if (availablePets.length > 0) {
            // Show the available pets
            availablePets.forEach(pet => {
                const genderClass = pet.gender && pet.gender.toLowerCase() === 'female' ? 'gender-female' : 'gender-male';
                petSelectorHTML += `
                    <div class="pet-select-card ${genderClass}" data-petid="${pet.id}">
                        <img src="${pet.img}" alt="${pet.name}">
                        <span>${pet.name}</span>
                    </div>
                `;
            });
        } else if (allMyPets.length > 0) {
            // NEW: The user has pets, but they are ALL currently booked
            petSelectorHTML = `<p style="color: #f59e0b; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-clock" style="margin-right: 5px;"></i> All your pets currently have scheduled appointments. You can book another once current visits are completed or cancelled.</p>`;
        } else {
            // The user has zero registered pets
            petSelectorHTML = `<p style="color: #ef4444; font-weight: 800; font-size: 0.95rem; margin-top: 10px;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> You don't have any registered pets yet! Please register a pet first.</p>`;
        }
        return `
            <div class="page-container">
                ${getPageHeader("Veterinary Appointments", "Schedule checkups, vaccinations, and consultations for your pets.", "fa-solid fa-user-doctor")}
                <div class="vet-module-grid">
                    <div class="glass-panel">
                        <h3 class="section-title"><i class="fa-solid fa-calendar-plus" style="color: #ec4899;"></i> Book New Appointment</h3>
                        <form id="vetBookingForm">
                            <div class="reg-input" style="margin-bottom: 20px;">
                                <label>Select Registered Pet <span class="required">*</span></label>
                                
                                <div class="visual-pet-selector">
                                    ${petSelectorHTML}
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
                            ${scheduledVisitsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
   
    // ==========================================
    // 🛒 DYNAMIC PET SHOP SYSTEM
    // ==========================================
    const SHOP_ITEMS = [
        { id: 1, brand: "NaturePet", name: "Nutricare Organic Dry Cat Food (1kg)", price: 250.00, category: "Cat Food", img: "/resources/shop/catfood.jpg" },
        { id: 2, brand: "PawSource", name: "100g Real Beef Dog Biscuit Treats", price: 150.00, category: "Dog Food & Treats", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400" },
        { id: 3, brand: "KONG", name: "Classic Durable Rubber Dog Toy", price: 450.00, category: "Toys", img: "/resources/shop/dog_toy.jpg" },
        { id: 4, brand: "Paws & Pals", name: "Heavy Duty Reflective Leash", price: 299.00, category: "Accessories", img: "/resources/shop/leash.jpg" },
        { id: 5, brand: "PetSafe", name: "Ceramic Anti-Slip Pet Bowl", price: 180.00, category: "Accessories", img: "/resources/shop/bowl.jpg" },
        { id: 6, brand: "CozyPet", name: "Fluffy Calming Pet Bed (Medium)", price: 550.00, category: "Accessories", img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400" },
        { id: 7, brand: "Whiskas", name: "Tuna Flavor Wet Cat Food (12 Pouch)", price: 540.00, category: "Cat Food", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400" },
        { id: 8, brand: "Pedigree", name: "Adult Beef & Veg Dry Dog Food (1.5kg)", price: 380.00, category: "Dog Food & Treats", img: "/resources/shop/dogfood.jpg" },
        { id: 9, brand: "FelineFun", name: "Interactive Feather Teaser Wand", price: 95.00, category: "Toys", img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400" },
        { id: 10, brand: "GroomPro", name: "Silicone Pet Bath Massage Brush", price: 110.00, category: "Grooming", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400" }
    ];

    // Helper function that dynamically draws the filtered cards!
    function renderShopGrid(items) {
        if (items.length === 0) return `<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 50px; font-size: 1.2rem;">No items match your filters.</p>`;
        
        let html = '';
        items.forEach(item => {
            html += `
                <div class="shop-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div class="shop-img-box" style="height: 200px; overflow: hidden; position: relative; background: #f8fafc;">
                        <img src="${item.img}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <span style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; color: #475569; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${item.category}</span>
                    </div>
                    <div style="padding: 15px; display: flex; flex-direction: column; flex: 1;">
                        <span class="shop-brand" style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">${item.brand}</span>
                        
                        <h3 class="shop-title" style="margin: 5px 0 10px 0; font-size: 1.1rem; color: #0f172a; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${item.name}</h3>
                        
                        <div style="margin-top: auto;">
                            <div class="shop-price" style="font-size: 1.4rem; font-weight: 900; color: #ec4899; margin-bottom: 15px;">₱ ${item.price.toFixed(2)}</div>
                            <button class="btn-shop-cart btn-add-cart" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}" style="width: 100%; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; border: 2px solid #4f46e5; background: white; color: #4f46e5; transition: 0.3s;" onmouseover="this.style.background='#e0e7ff'" onmouseout="this.style.background='white'">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    }

    function renderPetShopHTML() {
        return `
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
                        ${renderShopGrid(SHOP_ITEMS)}
                    </div>
                </div>
            </div>
        `;
    }
    const registerPetHTML = `
        <div class="registration-wrapper">
            ${getPageHeader("Register a Pet", "Fill in the details below to add a new pet to the system.", "fa-solid fa-shield-cat")}
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
    `;

    function renderMatchMakerHTML() {
        // Find all pets owned by the current user!
        const myPets = REAL_DB_PETS.filter(pet => pet.owner === CURRENT_USER && pet.status === 'Private');
        let myPetsListHTML = '';

        if (myPets.length > 0) {
            myPets.forEach(pet => {
                const genderClass = pet.gender === 'Female' ? 'gender-female' : 'gender-male';
                // Use their uploaded image or a fallback
                const petImage = pet.img || "https://ui-avatars.com/api/?name=Pet&background=e2e8f0&color=64748b";
                
                myPetsListHTML += `
                    <div class="my-pet-card ${genderClass}" data-petid="${pet.id}">
                        <img src="${petImage}" alt="${pet.name}">
                        <div class="my-pet-info">
                            <h4>${pet.name}</h4>
                            <p>${pet.gender} • ${pet.breed}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            myPetsListHTML = `
                <div class="empty-pets-state">
                    <div class="empty-pets-icon"><i class="fa-solid fa-paw"></i></div>
                    <h4>No Registered Pets</h4>
                    <p>Register your companion to begin scanning for verified matches and playdates.</p>
                    <button class="btn-primary" id="btnMatchRegisterPet" style="margin-top: 14px; width: 100%; justify-content: center; font-size: 0.92rem; padding: 11px 18px;">
                        <i class="fa-solid fa-plus"></i> Register a Pet
                    </button>
                </div>
            `;
        }

        return `
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
                        ${myPetsListHTML}
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
                        <p>${myPets.length > 0 ? 'Select your pet on the left<br>to start scanning for nearby matches...' : 'Register your pet on the left<br>to start scanning for nearby matches...'}</p>
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
        `;
    }
    function loadMatchDashboard() {
        mainDisplayPanel.innerHTML = `
            <div class="page-container">
                ${getPageHeader("Match Dashboard", "Track pending requests and message approved matches.", "fa-solid fa-mars-and-venus")}
                <div class="page-header" style="margin-top: -15px;">
                    <div></div>
                    <button class="btn-animated" id="btnBackToMatch" style="background: white; color: #ec4899; border: 2px solid #ec4899;"><i class="fa-solid fa-arrow-left"></i> Back to Match Maker</button>
                </div>
                <div class="glass-panel" style="overflow-y: auto; flex:1;" id="matchDashboardContent">
                    <p style="text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">Loading matches...</p>
                </div>
            </div>
        `;

        Promise.resolve({ status: 'success', matches: ACTIVE_MATCHES })
        .then(data => {
            if (data.status === 'success') {
                let html = '<div class="pairs-grid">';
                if (data.matches.length === 0) {
                    html += `<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-weight: bold; margin-top: 30px;">You have no active matches or requests yet.</p>`;
                } else {
                    data.matches.forEach(match => {
                        let actionButtons = '';
                        let statusUI = '';
                        let topCancelBtn = '';

                        // ---> FIXED: Top right 'X' button for Rejecting or Canceling! <---
                        // ---> FIXED: High Z-Index so it is fully clickable, plus dynamic popup text! <---
                        if (match.status === 'pending') {
                            const isReject = !match.is_sender;
                            const popupTitle = isReject ? "Reject Match" : "Cancel Request";
                            const popupMsg = isReject ? "Are you sure you want to reject this match request?" : "Are you sure you want to cancel your match request?";

                            topCancelBtn = `
                                <button class="btn-delete-pair" data-matchid="${match.id}" data-title="${popupTitle}" data-msg="${popupMsg}" title="${isReject ? 'Reject' : 'Cancel Request'}" 
                                    style="position: absolute; top: 10px; right: 10px; z-index: 50; background: #fee2e2; color: #ef4444; border: 1px solid #fca5a5; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 2px 5px rgba(239,68,68,0.2);" 
                                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            `;
                        }

                        if (match.status === 'approved') {
                            statusUI = `<div class="pair-status approved">● Approved & Messaging</div>`;
                            actionButtons = `<button class="btn-animated btn-message-owner" data-owner="${match.ownerUsername}" style="width:100%; margin-top:10px; justify-content: center;"><i class="fa-regular fa-comment-dots"></i> Message Owner</button>`;
                        } else if (match.status === 'pending' && match.is_sender) {
                            statusUI = `<div class="pair-status">● Pending Approval</div>`;
                        } else if (match.status === 'pending' && !match.is_sender) {
                            statusUI = `<div class="pair-status" style="color:#f59e0b; background:#fef3c7;">● Received Request!</div>`;
                            actionButtons = `<button class="btn-accept-match" data-matchid="${match.id}" style="width:100%; margin-top:10px; padding:10px; border-radius:10px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);"><i class="fa-solid fa-check"></i> Accept Match</button>`;
                        }

                        html += `
                            <div class="pair-card" style="position: relative; padding-top: 25px;">
                                ${topCancelBtn}
                                <div class="pair-images">
                                    <img src="${match.my_pet_img}" class="pair-img left">
                                    <div class="pair-heart-small"><i class="fa-solid fa-heart"></i></div>
                                    <img src="${match.their_pet_img}" class="pair-img right">
                                </div>
                                <div class="pair-names">${match.my_pet_name} & ${match.their_pet_name}</div>
                                ${statusUI}
                                <div class="pair-date">@${match.ownerUsername}</div>
                                ${actionButtons}
                            </div>
                        `;
                    });
                }
                html += '</div>';
                document.getElementById('matchDashboardContent').innerHTML = html;
            }
        });
    }

    function loadHome() {
        // 1. CALCULATE REAL-TIME STATS
        const myPetsCount = REAL_DB_PETS.filter(p => p.owner === CURRENT_USER).length;
        const upcomingVetsCount = (typeof USER_VET_APPS !== 'undefined') ? USER_VET_APPS.filter(a => a.status !== 'Cancelled' && a.status !== 'Completed').length : 0;
        
        let adoptionStatus = "None";
        let statusColor = "#64748b"; 
        if (typeof USER_APPS !== 'undefined' && USER_APPS.length > 0) {
            adoptionStatus = USER_APPS[0].status; // Gets the most recent application
            if (adoptionStatus === 'Approved') statusColor = '#10b981';
            else if (adoptionStatus === 'Pending Review') statusColor = '#f59e0b';
        }

        // 2. GENERATE SMART REMINDERS
        let remindersHTML = '';
        if (typeof USER_VET_APPS !== 'undefined') {
            USER_VET_APPS.filter(a => a.status !== 'Cancelled' && a.status !== 'Completed').forEach(app => {
                remindersHTML += `<div class="reminder-item warning"><div class="rem-icon"><i class="fa-solid fa-user-doctor"></i></div><div class="rem-text"><strong>${app.pet_name}'s Vet Visit</strong><small>${app.date} at ${app.time}</small></div></div>`;
            });
        }
        if (typeof USER_APPS !== 'undefined') {
            USER_APPS.filter(a => a.status === 'Approved').forEach(app => {
                remindersHTML += `<div class="reminder-item success"><div class="rem-icon"><i class="fa-solid fa-check"></i></div><div class="rem-text"><strong>Adoption Approved!</strong><small>You can now finalize ${app.pet_name}'s adoption.</small></div></div>`;
            });
        }
        // Fallback if no reminders
        if (remindersHTML === '') {
            remindersHTML = `<div style="text-align:center; color:#64748b; padding:20px; font-weight:600;"><i class="fa-solid fa-mug-hot" style="font-size:2rem; margin-bottom:10px; color:#cbd5e1;"></i><br>You're all caught up!</div>`;
        }

        // 3. PICK A RANDOM "PET OF THE DAY" FROM THE DATABASE
        const publicPets = REAL_DB_PETS.filter(p => p.status === 'Available');
        let potdHTML = '';
        if (publicPets.length > 0) {
            const randomIndex = Math.floor(Math.random() * publicPets.length);
            const potd = publicPets[randomIndex];
            const genderIcon = potd.gender === 'Female' ? '<i class="fa-solid fa-venus" style="color: #f472b6;"></i>' : '<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>';
            
            potdHTML = `
                <div class="home-card featured-pet-card" style="flex: 1;">
                    <div class="featured-badge"><i class="fa-solid fa-star"></i> Pet of the Day</div>
                    <img src="${potd.img}" alt="${potd.name}" class="featured-img">
                    <div class="featured-info">
                        <h3>${potd.name} ${genderIcon}</h3>
                        <p class="breed">${potd.breed} • ${potd.age}</p>
                        <p class="bio">${potd.reason_for_adoption || potd.personal_traits || "Looking for a loving forever home!"}</p>
                        <button class="btn-animated btn-adopt-potd" data-petid="${potd.id}" data-petname="${potd.name}" style="width: 100%; justify-content: center; margin-top: 10px;">Meet ${potd.name}</button>
                    </div>
                </div>
            `;
        } else {
            potdHTML = `
                <div class="home-card featured-pet-card" style="flex: 1; display:flex; justify-content:center; align-items:center; background:#1e293b;">
                    <div style="text-align:center; color:white; z-index:2; padding:20px;">
                        <i class="fa-solid fa-shield-cat" style="font-size:3rem; margin-bottom:15px; color:#64748b;"></i>
                        <h3>No Pets Available</h3><p style="color:#cbd5e1; font-size:0.9rem; margin-top:10px;">Check back later for new arrivals!</p>
                    </div>
                </div>
            `;
        }

        // 4. INJECT THE DYNAMIC HTML
        mainDisplayPanel.innerHTML = `
            <div class="home-container">
                <div class="home-banner">
                    <div class="banner-text"><h1>Welcome back, ${CURRENT_USER}! 👋</h1><p>Here is what's happening with your furry friends today.</p></div>
                    <div class="banner-icon"><i class="fa-solid fa-shield-cat"></i></div>
                </div>
                <div class="stats-row">
                    <div class="home-stat-card"><div class="stat-icon paw-bg"><i class="fa-solid fa-paw"></i></div><div><h3>My Pets</h3><h2>${myPetsCount}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon health-bg"><i class="fa-solid fa-notes-medical"></i></div><div><h3>Upcoming Vets</h3><h2>${upcomingVetsCount}</h2></div></div>
                    <div class="home-stat-card"><div class="stat-icon heart-bg"><i class="fa-solid fa-heart"></i></div><div><h3>Adoption Status</h3><h2 style="color:${statusColor}; font-size: 1.3rem;">${adoptionStatus}</h2></div></div>
                </div>
                <div class="dashboard-grid">
                    <div class="dashboard-col">
                        <div class="home-card" style="flex: 1;">
                            <h2 class="card-title">Reminders & Alerts</h2>
                            <div class="reminders-list">
                                ${remindersHTML}
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-col">
                        ${potdHTML}
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
        `;

        // 5. FETCH RECENT MATCH ALERTS FROM APPWRITE/SESSION!
        Promise.resolve({ status: 'success', matches: ACTIVE_MATCHES })
        .then(data => {
            const container = document.getElementById('homeMatchAlertsContainer');
            if(!container) return;
            
            if (data.status === 'success' && data.matches.length > 0) {
                let alertsHTML = '';
                // Only show the 3 most recent matches to keep it clean
                data.matches.slice(0, 3).forEach(m => {
                    let msg = m.status === 'approved' ? "Approved Match!" : "Pending Request";
                    let icon = m.status === 'approved' ? "💌" : "⏳";
                    alertsHTML += `
                        <div class="match-alert-item" style="cursor:pointer;" onclick="document.querySelector('[data-target=\\'breeding\\']').click()">
                            <img src="${m.their_pet_img}" alt="Pet">
                            <div class="alert-text"><strong>${m.their_pet_name} ${icon}</strong><span>${msg}</span></div>
                            <button class="btn-small-view">View</button>
                        </div>
                    `;
                });
                container.innerHTML = alertsHTML;
            } else {
                container.innerHTML = `<p style="text-align:center; color:#64748b; font-size:0.85rem; margin-top:20px;">No recent match activity.</p>`;
            }
        });

        // 5.5 FETCH REAL WEATHER FOR QUEZON CITY (Free Open-Meteo API)
        fetch('https://api.open-meteo.com/v1/forecast?latitude=14.6488&longitude=121.0509&current_weather=true')
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                
                const tempEl = document.getElementById('weatherTemp');
                const iconEl = document.getElementById('weatherIcon');
                const textEl = document.getElementById('weatherText');

                if (tempEl && iconEl && textEl) {
                    tempEl.innerText = `${temp}°C`;

                    // Smart Weather Logic!
                    if (code <= 3) {
                        // Clear or Partly Cloudy
                        iconEl.className = "fa-solid fa-sun weather-icon";
                        iconEl.style.color = "#fef08a";
                        textEl.innerHTML = `<strong>Perfect time for a walk!</strong><br>The weather is great today. Take your pets out before it gets too hot.`;
                    } else if (code >= 51 && code <= 67 || code >= 80) {
                        // Rain or Showers
                        iconEl.className = "fa-solid fa-cloud-rain weather-icon";
                        iconEl.style.color = "#bae6fd";
                        textEl.innerHTML = `<strong>It's a bit rainy!</strong><br>Keep your pets dry indoors today. A good time for some indoor training!`;
                    } else {
                        // Overcast or Fog
                        iconEl.className = "fa-solid fa-cloud weather-icon";
                        iconEl.style.color = "#e2e8f0";
                        textEl.innerHTML = `<strong>Nice and cool!</strong><br>A great day for some indoor play or a quick stroll around the neighborhood.`;
                    }
                }
            })
            .catch(err => console.error("Weather fetch error:", err));
        
        // 6. WIRE UP THE "MEET PET" BUTTON
        setTimeout(() => {
            const potdBtn = document.querySelector('.btn-adopt-potd');
            if (potdBtn) {
                potdBtn.addEventListener('click', (e) => {
                    const petId = e.target.getAttribute('data-petid');
                    const petName = e.target.getAttribute('data-petname');
                    mainDisplayPanel.innerHTML = generateAdoptionFormHTML(petId, petName);
                    // Visually update the sidebar selection
                    document.querySelectorAll('.sidebar-nav .nav-btn').forEach(b => b.classList.remove('active'));
                    document.querySelector('[data-target="pets"]').classList.add('active');
                });
            }
        }, 100);
    }
    
    // Call it immediately on page load
    loadHome();

    // ==========================================
    // REALTIME APPWRITE SUBSCRIPTION & TOASTS
    // ==========================================
    function getOrCreateToastContainer() {
        let container = document.getElementById('pawtrackToastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'pawtrackToastContainer';
            container.className = 'pawtrack-toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function showRealtimeToast(title, message, iconClass = 'fa-paw', targetTab = null, variant = 'default') {
        const container = getOrCreateToastContainer();
        const toast = document.createElement('div');
        toast.className = `pawtrack-toast-card ${variant === 'app' ? 'toast-app' : variant === 'info' ? 'toast-info' : ''}`;
        
        toast.innerHTML = `
            <div class="toast-icon-bubble">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <div class="toast-body">
                <div class="toast-title">
                    <span>${escapeHtml(title)}</span>
                </div>
                <p class="toast-msg">${escapeHtml(message)}</p>
            </div>
            <button class="toast-close" title="Dismiss">&times;</button>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        let dismissTimer = null;

        const dismiss = (e) => {
            if (e) e.stopPropagation();
            if (dismissTimer) clearTimeout(dismissTimer);
            toast.style.animation = 'toastSlideOut 0.25s forwards';
            setTimeout(() => {
                if (toast.parentElement) toast.parentElement.removeChild(toast);
            }, 250);
        };

        closeBtn.addEventListener('click', dismiss);

        if (targetTab) {
            toast.addEventListener('click', () => {
                dismiss();
                const targetBtn = document.querySelector(`.sidebar-nav .nav-btn[data-target="${targetTab}"]`);
                if (targetBtn) {
                    targetBtn.click();
                } else if (targetTab === 'pets') {
                    navButtons.forEach(b => b.classList.remove('active'));
                    const petsBtn = document.querySelector('[data-target="pets"]');
                    if (petsBtn) petsBtn.classList.add('active');
                    mainDisplayPanel.innerHTML = renderAvailablePetsHTML();
                } else if (targetTab === 'applications') {
                    navButtons.forEach(b => b.classList.remove('active'));
                    const appBtn = document.querySelector('[data-target="applications"]');
                    if (appBtn) appBtn.classList.add('active');
                    mainDisplayPanel.innerHTML = renderMyApplicationsHTML();
                }
            });
        }

        container.appendChild(toast);
        dismissTimer = setTimeout(dismiss, 7000);
    }

    function getActiveTab() {
        if (document.getElementById('adoptionApplicationForm')) return 'adopt-form';
        if (document.getElementById('petRegistrationForm') || document.getElementById('registerPetForm')) return 'register-pet';
        if (document.getElementById('profileFullName') || document.querySelector('.profile-container')) return 'profile';
        const activeBtn = document.querySelector('.sidebar-nav .nav-btn.active');
        return activeBtn ? activeBtn.getAttribute('data-target') : 'home';
    }

    function refreshCurrentView() {
        const tab = getActiveTab();
        if (tab === 'home') {
            loadHome();
        } else if (tab === 'pets') {
            mainDisplayPanel.innerHTML = renderAvailablePetsHTML();
        } else if (tab === 'applications') {
            mainDisplayPanel.innerHTML = renderMyApplicationsHTML();
        } else if (tab === 'profile') {
            populateProfileHub();
        } else if (tab === 'breeding') {
            if (typeof renderMatchMakerHTML === 'function' && !document.getElementById('matchDetailsOverlay')) {
                mainDisplayPanel.innerHTML = renderMatchMakerHTML();
            }
        }
    }

    function handleRealtimeEvent(response) {
        if (!response || !response.payload) return;
        const events = response.events || [];
        const doc = response.payload;
        const isCreate = events.some(e => e.includes('.create'));
        const isUpdate = events.some(e => e.includes('.update'));
        const isDelete = events.some(e => e.includes('.delete'));

        // Handle PETS collection
        if (doc.$collectionId === COLL_PETS || events.some(e => e.includes(`.${COLL_PETS}.`))) {
            const petId = doc.$id;
            const petData = { ...doc, id: doc.$id };

            if (isDelete) {
                const existed = REAL_DB_PETS.find(p => p.id === petId);
                REAL_DB_PETS = REAL_DB_PETS.filter(p => p.id !== petId);
                if (existed && existed.status === 'Available' && existed.owner !== CURRENT_USER) {
                    showRealtimeToast("Pet Removed", `${existed.name} is no longer listed for adoption.`, "fa-paw", "pets", "info");
                }
            } else if (isCreate) {
                const idx = REAL_DB_PETS.findIndex(p => p.id === petId);
                if (idx === -1) {
                    REAL_DB_PETS.unshift(petData);
                } else {
                    REAL_DB_PETS[idx] = petData;
                }

                // If another user listed this pet for adoption, notify in real time!
                if (petData.status === 'Available' && petData.owner !== CURRENT_USER) {
                    showRealtimeToast(
                        "New Pet for Adoption! 🐾",
                        `@${petData.owner || 'A caregiver'} just listed ${petData.name} (${petData.breed || 'Pet'}). Tap to meet them!`,
                        "fa-heart",
                        "pets",
                        "default"
                    );
                }
            } else if (isUpdate) {
                const idx = REAL_DB_PETS.findIndex(p => p.id === petId);
                const oldPet = idx !== -1 ? REAL_DB_PETS[idx] : null;
                if (idx !== -1) {
                    REAL_DB_PETS[idx] = petData;
                } else {
                    REAL_DB_PETS.unshift(petData);
                }

                if (petData.owner !== CURRENT_USER) {
                    if (oldPet && oldPet.status !== 'Available' && petData.status === 'Available') {
                        showRealtimeToast(
                            "Pet Available for Adoption! 🐾",
                            `${petData.name} (${petData.breed}) is now available for adoption! Tap to view.`,
                            "fa-heart",
                            "pets",
                            "default"
                        );
                    } else if (oldPet && oldPet.status === 'Available' && petData.status !== 'Available') {
                        showRealtimeToast(
                            "Pet Status Updated",
                            `${petData.name} is now ${petData.status}.`,
                            "fa-paw",
                            "pets",
                            "info"
                        );
                    }
                }
            }

            refreshCurrentView();
        }

        // Handle APPLICATIONS collection
        if (doc.$collectionId === COLL_APPS || events.some(e => e.includes(`.${COLL_APPS}.`))) {
            const appId = doc.$id;
            const appData = { ...doc, id: doc.$id };

            // Only act if this is the current user's application
            if (appData.user_id === CURRENT_USER_ID) {
                if (isDelete) {
                    USER_APPS = USER_APPS.filter(a => a.id !== appId);
                } else if (isCreate) {
                    const idx = USER_APPS.findIndex(a => a.id === appId);
                    if (idx === -1) {
                        USER_APPS.unshift(appData);
                    } else {
                        USER_APPS[idx] = appData;
                    }
                } else if (isUpdate) {
                    const idx = USER_APPS.findIndex(a => a.id === appId);
                    const oldStatus = idx !== -1 ? USER_APPS[idx].status : '';
                    if (idx !== -1) {
                        USER_APPS[idx] = appData;
                    } else {
                        USER_APPS.unshift(appData);
                    }

                    if (oldStatus !== appData.status) {
                        const isApproved = appData.status === 'Approved';
                        showRealtimeToast(
                            isApproved ? "🎉 Application Approved!" : "Application Status Updated",
                            `Your adoption application for ${appData.pet_name} is now: ${appData.status}!`,
                            isApproved ? "fa-circle-check" : "fa-clock",
                            "applications",
                            "app"
                        );
                    }
                }
                refreshCurrentView();
            }
        }
    }

    let isPollingSync = false;
    async function pollDatabaseSync() {
        if (isPollingSync) return;
        isPollingSync = true;
        try {
            const petsRes = await databases.listDocuments(DB_ID, COLL_PETS);
            const latestPets = petsRes.documents.map(d => ({ ...d, id: d.$id }));
            
            const oldIds = new Set(REAL_DB_PETS.map(p => p.id));
            const newlyAddedPets = latestPets.filter(p => !oldIds.has(p.id) && p.status === 'Available' && p.owner !== CURRENT_USER);
            
            const petsChanged = latestPets.length !== REAL_DB_PETS.length || 
                latestPets.some((p, i) => REAL_DB_PETS[i]?.id !== p.id || REAL_DB_PETS[i]?.status !== p.status);

            if (petsChanged) {
                REAL_DB_PETS = latestPets;
                if (newlyAddedPets.length > 0) {
                    const p = newlyAddedPets[0];
                    showRealtimeToast(
                        "New Pet for Adoption! 🐾",
                        `@${p.owner || 'A caregiver'} just listed ${p.name} (${p.breed || 'Pet'}). Tap to meet them!`,
                        "fa-heart",
                        "pets",
                        "default"
                    );
                }
                refreshCurrentView();
            }

            if (CURRENT_USER_ID) {
                const appsRes = await databases.listDocuments(DB_ID, COLL_APPS, [
                    Query.equal('user_id', CURRENT_USER_ID)
                ]);
                const latestApps = appsRes.documents.map(d => ({ ...d, id: d.$id }));
                const appsChanged = latestApps.length !== USER_APPS.length ||
                    latestApps.some((a, i) => USER_APPS[i]?.id !== a.id || USER_APPS[i]?.status !== a.status);
                if (appsChanged) {
                    USER_APPS = latestApps;
                    refreshCurrentView();
                }
            }
        } catch (e) {
            // Silently catch background poll errors
        } finally {
            isPollingSync = false;
        }
    }

    function initRealtimeSync() {
        try {
            if (client && typeof client.subscribe === 'function') {
                const channelPets = `databases.${DB_ID}.collections.${COLL_PETS}.documents`;
                const channelApps = `databases.${DB_ID}.collections.${COLL_APPS}.documents`;
                client.subscribe([channelPets, channelApps], (response) => {
                    handleRealtimeEvent(response);
                });
                console.log("PawTrack: Appwrite Realtime connected for live adoption sync.");
            }
        } catch (err) {
            console.warn("Realtime subscription fallback to polling:", err);
        }

        // Active background synchronization interval (every 8s)
        setInterval(pollDatabaseSync, 8000);
    }

    initRealtimeSync();

    function updateVetCardUI() {
        const doc = doctorsDB[currentVetIndex];
        const initialsEl = document.getElementById('vetInitials');
        if(!initialsEl) return; 
        initialsEl.innerText = doc.initials;
        document.getElementById('vetNameDisplay').innerText = doc.name;
        document.getElementById('vetSpecialtyDisplay').innerText = doc.specialty;
        document.getElementById('vetRatingDisplay').innerText = `⭐ ${doc.rating} (${doc.exp})`;
        document.getElementById('vetPhoneDisplay').innerText = doc.phone;
        document.getElementById('vetEmailDisplay').innerText = doc.email;
        document.getElementById('vetScheduleDisplay').innerText = doc.schedule;
        document.getElementById('vetClinicDisplay').innerText = doc.clinic;

        const selectedId = document.getElementById('apptVetIdHidden').value;
        const selectBtn = document.getElementById('btnSelectVet');
        
        if (selectedId === currentVetIndex.toString()) {
            selectBtn.innerText = "✅ Confirmed";
            selectBtn.classList.add('selected');
        } else {
            selectBtn.innerText = "Confirm";
            selectBtn.classList.remove('selected');
        }
    }

    function updateCartUI() {
        const badge = document.getElementById('cartBadge');
        if(badge) badge.innerText = cartItems.length;
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if(cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color:#64748b; font-weight:bold; margin-top: 50px;">Your cart is empty.</p>';
        } else {
            cartItems.forEach((item, index) => {
                total += parseFloat(item.price);
                cartItemsContainer.innerHTML += `
                    <div class="cart-item-row">
                        <img src="${item.img}" class="cart-item-img" onerror="this.src='/resources/shop/bowl.jpg'" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">₱ ${item.price}</div>
                        </div>
                        <div><button class="btn-remove-item" data-index="${index}" title="Remove item"><i class="fa-solid fa-trash-can"></i></button></div>
                    </div>
                `;
            });
        }
        cartTotalDisplay.innerText = `₱ ${total.toFixed(2)}`;
    }

    // --- MATCH MAKER LOGIC ---
    window.handleRewind = (index) => {
        const pet = passedPetsHistory[index];
        passedPetsHistory.splice(index, 1);
        currentCandidateIndex = Math.max(0, currentCandidateIndex - 1);
        loadCandidate();
    };

    function updateRewindUI() {
        const rewindList = document.getElementById('rewindList');
        if (!rewindList) return;
        rewindList.innerHTML = '';
        if (passedPetsHistory.length === 0) {
            rewindList.innerHTML = `
                <div style="text-align:center; padding: 20px; opacity:0.5;">
                    <i class="fa-solid fa-layer-group" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="font-size:0.85rem; font-weight:600;">History is empty</p>
                </div>`;
        } else {
            passedPetsHistory.forEach((p, idx) => {
                rewindList.innerHTML += `
                    <div class="rewind-item" data-index="${idx}" onclick="handleRewind(${idx})">
                        <img src="${p.imgs[0]}" alt="${p.name}">
                        <div class="rewind-info">
                            <strong>${p.name}</strong>
                            <span>${p.breed}</span>
                        </div>
                        <button class="btn-undo" title="Bring Back">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                `;
            });
        }
    }

    function loadCandidate() {
        if(currentFilteredCandidates.length === 0 || currentCandidateIndex >= currentFilteredCandidates.length) {
            document.getElementById('datingContentLayout').style.display = 'none';
            const overlay = document.getElementById('instructionOverlay');
            overlay.style.display = 'flex';
            overlay.innerHTML = `<i class="fa-solid fa-face-frown-open" style="color: #cbd5e1; font-size: 4rem; margin-bottom: 15px;"></i><p>No more matches available<br>for this pet at the moment.</p>`;
            return;
        }

        const cand = currentFilteredCandidates[currentCandidateIndex];
        currentPhotoIndex = 0; 
        
        const thumbContainer = document.getElementById('candThumbnails');
        thumbContainer.innerHTML = '';
        cand.imgs.forEach((imgSrc, i) => {
            thumbContainer.innerHTML += `<img src="${imgSrc}" class="cand-thumb ${i===0 ? 'active':''}" data-index="${i}" alt="Photo ${i+1}">`;
        });

        updateCandidatePhoto(cand, 0);
        
        const genderIcon = cand.gender === "Male" ? `<i class="fa-solid fa-mars" style="color: #60a5fa;"></i>` : `<i class="fa-solid fa-venus" style="color: #f472b6;"></i>`;
        document.getElementById('candNameAge').innerHTML = `${cand.name}, ${cand.age} ${genderIcon}`;
        document.getElementById('candBreedGender').innerHTML = `<i class="fa-solid fa-paw"></i> ${cand.breed}`;
        document.getElementById('candDesc').innerText = cand.desc;
        
        document.getElementById('candScoreText').innerText = `${cand.score}% Match`;
        document.getElementById('candScoreBar').style.width = `${cand.score}%`;

        const badgesContainer = document.getElementById('candBadges');
        badgesContainer.innerHTML = '';
        if(cand.badges.includes("vet")) badgesContainer.innerHTML += `<span class="v-badge badge-vet"><i class="fa-solid fa-stethoscope"></i> Vet Verified</span>`;
        if(cand.badges.includes("pedigree")) badgesContainer.innerHTML += `<span class="v-badge badge-pedigree"><i class="fa-solid fa-dna"></i> Purebred</span>`;
        if(cand.badges.includes("vax")) badgesContainer.innerHTML += `<span class="v-badge badge-vax"><i class="fa-solid fa-syringe"></i> Vaccinated</span>`;

        const traitsContainer = document.getElementById('candTraits');
        traitsContainer.innerHTML = '';
        cand.traits.forEach(t => { traitsContainer.innerHTML += `<span class="trait-tag">${t}</span>`; });

        // Update Insights Sidebar
        document.getElementById('candOwnerName').innerText = cand.ownerName;
        document.getElementById('candOwnerInitial').innerText = cand.ownerInitial;
        document.getElementById('candOwnerRating').innerText = `⭐ ${cand.ownerRating}`;
        document.getElementById('candOwnerPairs').innerText = `${cand.successPairs} Successful Pairs`;
        
        document.getElementById('barSize').style.width = `${cand.compSize}%`;
        document.getElementById('txtSize').innerText = `${cand.compSize}%`;
        document.getElementById('barEnergy').style.width = `${cand.compEnergy}%`;
        document.getElementById('txtEnergy').innerText = `${cand.compEnergy}%`;
        document.getElementById('barTemp').style.width = `${cand.compTemp}%`;
        document.getElementById('txtTemp').innerText = `${cand.compTemp}%`;

        const litterDiv = document.getElementById('litterPredictor');
        litterDiv.innerHTML = '';
        cand.litter.forEach(l => {
            const txtColor = (l.c === '#FFFFFF' || l.c === '#FFF8DC') ? '#0f172a' : 'white';
            litterDiv.innerHTML += `<div class="color-swatch" style="background:${l.c}; color:${txtColor};">${l.p}%</div>`;
        });

        document.getElementById('instructionOverlay').style.display = 'none';
        document.getElementById('datingContentLayout').style.display = 'flex';
        document.getElementById('treatCountDisplay').innerText = `${treatsLeft} Left`;
        updateRewindUI();
    }

    function updateCandidatePhoto(cand, index) {
        const imgEl = document.getElementById('candImg');
        imgEl.style.opacity = 0; 
        setTimeout(() => {
            imgEl.src = cand.imgs[index];
            imgEl.style.opacity = 1; 
        }, 150);

        document.querySelectorAll('.cand-thumb').forEach((thumb, i) => {
            if(i === parseInt(index)) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // 5. SIDEBAR NAVIGATION
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            navButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-target');

            mainDisplayPanel.scrollTo({ top: 0, behavior: 'smooth' });

            if (target === 'home') loadHome();
            else if (target === 'pets') mainDisplayPanel.innerHTML = renderAvailablePetsHTML();
           else if (target === 'applications') mainDisplayPanel.innerHTML = renderMyApplicationsHTML();
           else if (target === 'vet') {
                mainDisplayPanel.innerHTML = renderVetAppointmentsHTML();
                updateVetCardUI();
            } else if (target === 'shop') {
                mainDisplayPanel.innerHTML = renderPetShopHTML();
                updateCartUI(); 
            } else if (target === 'breeding') {
                mainDisplayPanel.innerHTML = renderMatchMakerHTML();
                selectedMyPetId = null;
            } else if (target === 'messages') {
                mainDisplayPanel.innerHTML = renderMessagesPageHTML();
                initMessengerPage();
            }
        });
    });

    // 6. TOP BAR ACTIONS
    document.getElementById('btnViewProfile').addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        mainDisplayPanel.scrollTo({ top: 0, behavior: 'smooth' });
        mainDisplayPanel.innerHTML = profileHTML;
        populateProfileHub();
    });

    document.getElementById('btnRegisterPet').addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        mainDisplayPanel.scrollTo({ top: 0, behavior: 'smooth' });
        mainDisplayPanel.innerHTML = registerPetHTML;

        const dropZone = document.getElementById('imageDropZone');
        const fileInput = document.getElementById('petImageInput');
        const preview = document.getElementById('imagePreview');
        const dropText = document.getElementById('dropZoneText');

        dropZone.addEventListener('click', () => fileInput.click());
        
        
        selectedPetFile = null;
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                selectedPetFile = this.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                    dropText.style.display = 'none';
                };
                reader.readAsDataURL(this.files[0]);
            }
        });

        document.getElementById('btnCancelReg').addEventListener('click', () => {
            loadHome();
            navButtons[0].classList.add('active'); 
        });
    });

    // 7. EVENT DELEGATION
        mainDisplayPanel.addEventListener('click', async (e) => {
            const btnMatchReg = e.target.closest('#btnMatchRegisterPet');
            if (btnMatchReg) {
                document.getElementById('btnRegisterPet').click();
                return;
            }

            // --- PROFILE TABS LOGIC ---
            if (e.target.classList.contains('profile-tab-btn')) {
                // Remove active state from all buttons
                document.querySelectorAll('.profile-tab-btn').forEach(btn => btn.classList.remove('active'));
                
                // Hide all tab content
                document.querySelectorAll('.profile-tab-content').forEach(content => content.classList.remove('active'));
                
                // Add active state to clicked button
                e.target.classList.add('active');
                
                // Show the corresponding content block
                const targetId = e.target.getAttribute('data-tab');
                document.getElementById(targetId).classList.add('active');
            }
        
        // --- DROPDOWNS (Details / View App) ---
        const viewBtn = e.target.closest('.btn-view-app') || e.target.closest('.btn-view-pet');
        if (viewBtn) {
            const targetId = viewBtn.getAttribute('data-target');
            const detailsDiv = document.getElementById(targetId);
            const cardDiv = viewBtn.closest('.app-card') || viewBtn.closest('.pet-card');
            if (detailsDiv.style.display === 'block') {
                detailsDiv.style.display = 'none';
                cardDiv.classList.remove('dropdown-open');
            } else {
                detailsDiv.style.display = 'block';
                cardDiv.classList.add('dropdown-open');
            }
        }

        const closePetBtn = e.target.closest('.btn-close-pet');
        if (closePetBtn) {
            const targetId = closePetBtn.getAttribute('data-target');
            const detailsDiv = document.getElementById(targetId);
            const cardDiv = detailsDiv.previousElementSibling;
            detailsDiv.style.display = 'none';
            cardDiv.classList.remove('dropdown-open');
        }

        // --- ADOPT NOW BUTTON ---
        const btnAdopt = e.target.closest('.btn-adopt');
        if (btnAdopt) {
            const petId = btnAdopt.getAttribute('data-petid');
            const petName = btnAdopt.getAttribute('data-petname');
            mainDisplayPanel.innerHTML = generateAdoptionFormHTML(petId, petName);
        }

        if (e.target.closest('#btnBackToPets')) {
            mainDisplayPanel.innerHTML = renderAvailablePetsHTML();
        }

        if (e.target.closest('.btn-edit-profile')) {
            document.getElementById('editProfileModal').style.display = 'flex';
        }

        // --- MOVE TO BIN (Soft Delete with Appwrite Database) ---
        const btnToBin = e.target.closest('.btn-archive-pet');
        if (btnToBin) {
            const petId = btnToBin.getAttribute('data-petid');
            showCustomConfirm("Move to Bin?", "Are you sure you want to move this pet to the Recycle Bin?", async () => {
                const pet = REAL_DB_PETS.find(p => p.id === petId);
                if (!pet) {
                    showCustomPopup("Error", "Pet record not found.", true);
                    return;
                }
                try {
                    const binDoc = await databases.createDocument(DB_ID, COLL_BIN, ID.unique(), {
                        name: pet.name,
                        breed: pet.breed,
                        gender: pet.gender,
                        owner: CURRENT_USER,
                        img: pet.img || ''
                    });
                    await databases.deleteDocument(DB_ID, COLL_PETS, petId);
                    REAL_DB_PETS = REAL_DB_PETS.filter(p => p.id !== petId);
                    BIN_PETS.unshift({ ...binDoc, id: binDoc.$id });
                    await addActivityLog('Moved a pet to the Recycle Bin', pet.name, 'fa-trash-can');
                    showCustomPopup("Moved to Bin", "Pet successfully moved to Recycle Bin.", false, () => {
                        refreshCurrentView();
                    });
                } catch(err) {
                    console.error("Appwrite Move to Bin Error:", err);
                    showCustomPopup("Error", err.message, true);
                }
            });
        }

        // --- NAVIGATE TO BIN PAGE ---
        if (e.target.closest('#btnViewBin')) {
            mainDisplayPanel.innerHTML = renderRecycleBinHTML();
        }

        // --- BACK TO PROFILE BUTTON ----
        if (e.target.closest('#btnEmptyBin')) {
            showCustomConfirm("Empty Bin?", "WARNING: Are you sure you want to permanently delete ALL pets in the Recycle Bin? This cannot be undone!", async () => {
                try {
                    for (const bPet of BIN_PETS) {
                        await databases.deleteDocument(DB_ID, COLL_BIN, bPet.id);
                    }
                    BIN_PETS = [];
                    await addActivityLog('Permanently emptied the Recycle Bin', '', 'fa-dumpster-fire');
                    showCustomPopup("Bin Emptied", "Recycle bin emptied successfully.", false, () => {
                        mainDisplayPanel.innerHTML = renderRecycleBinHTML();
                    });
                } catch(err) {
                    console.error("Appwrite Empty Bin Error:", err);
                    showCustomPopup("Error", err.message, true);
                }
            });
        }
        if (e.target.closest('#btnBackToProfile')) {
            mainDisplayPanel.innerHTML = profileHTML;
            populateProfileHub();
        }

        // --- RESTORE PET FROM BIN ---
        const btnRestore = e.target.closest('.btn-restore-pet');
        if (btnRestore) {
            const petId = btnRestore.getAttribute('data-petid');
            const pet = BIN_PETS.find(p => p.id === petId);
            if (pet) {
                try {
                    const restoredDoc = await databases.createDocument(DB_ID, COLL_PETS, ID.unique(), {
                        name: pet.name,
                        breed: pet.breed,
                        gender: pet.gender,
                        age: '1 yr',
                        status: 'Available',
                        health_status: 'Healthy',
                        owner: CURRENT_USER,
                        contact_number: CURRENT_USER_PHONE || '0917-000-0000',
                        personal_traits: 'Friendly',
                        reason_for_adoption: 'Restored from Recycle Bin',
                        img: pet.img || ''
                    });
                    await databases.deleteDocument(DB_ID, COLL_BIN, petId);
                    BIN_PETS = BIN_PETS.filter(p => p.id !== petId);
                    REAL_DB_PETS.unshift({ ...restoredDoc, id: restoredDoc.$id });
                    await addActivityLog('Restored a pet from the Recycle Bin', pet.name, 'fa-rotate-left');
                    showCustomPopup("Restored!", "Pet has been restored to the active board!", false, () => {
                        mainDisplayPanel.innerHTML = renderRecycleBinHTML();
                    });
                } catch(err) {
                    console.error("Appwrite Restore Error:", err);
                    showCustomPopup("Error", err.message, true);
                }
            }
        }

       // --- CANCEL APP ---
        const cancelAppBtn = e.target.closest('.btn-cancel-app');
        if (cancelAppBtn) {
            const appId = cancelAppBtn.getAttribute('data-appid');
            showCustomConfirm(
                "Cancel Application?", 
                "Are you sure you want to cancel this application?", 
                async () => {
                    try {
                        await databases.deleteDocument(DB_ID, COLL_APPS, appId);
                        USER_APPS = USER_APPS.filter(a => a.id !== appId);
                        await addActivityLog('Cancelled adoption application', '', 'fa-file-circle-xmark');
                        showCustomPopup("Cancelled", "Application successfully cancelled.", false, () => {
                            mainDisplayPanel.innerHTML = renderMyApplicationsHTML();
                        });
                    } catch(err) {
                        console.error("Appwrite Cancel App Error:", err);
                        showCustomPopup("Error", err.message, true);
                    }
                }
            );
        }

        // --- CANCEL VET APPOINTMENT ---
        const cancelVetBtn = e.target.closest('.btn-cancel-vet');
        if (cancelVetBtn) {
            const appId = cancelVetBtn.getAttribute('data-appid');
            showCustomConfirm(
                "Cancel Appointment?", 
                "Are you sure you want to cancel this veterinary appointment?", 
                async () => {
                    try {
                        await databases.deleteDocument(DB_ID, COLL_VET, appId);
                        USER_VET_APPS = USER_VET_APPS.filter(a => a.id !== appId);
                        await addActivityLog('Cancelled veterinary appointment', '', 'fa-calendar-xmark');
                        showCustomPopup("Cancelled", "Appointment successfully cancelled.", false, () => {
                            mainDisplayPanel.innerHTML = renderVetAppointmentsHTML();
                            updateVetCardUI();
                        });
                    } catch(err) {
                        console.error("Appwrite Cancel Vet Error:", err);
                        showCustomPopup("Error", err.message, true);
                    }
                }
            );
        }

        // --- VET VISUAL PET SELECTOR ---
        const visualPetBtn = e.target.closest('.pet-select-card');
        if (visualPetBtn && document.getElementById('apptPetSelectorHidden')) {
            document.querySelectorAll('.pet-select-card').forEach(c => c.classList.remove('selected'));
            visualPetBtn.classList.add('selected');
            const petId = visualPetBtn.getAttribute('data-pet');
            document.getElementById('apptPetSelectorHidden').value = petId;
            const petInfo = myPetsDB[petId];
            if (petInfo) {
                document.getElementById('apptOwner').value = petInfo.owner;
                document.getElementById('apptPetType').value = petInfo.type;
                document.getElementById('apptBreed').value = petInfo.breed;
                document.getElementById('apptGender').value = petInfo.gender;
                document.getElementById('apptWeight').value = petInfo.weight;
            }
        }

        if (e.target.closest('#btnPrevVet')) {
            currentVetIndex = (currentVetIndex - 1 + doctorsDB.length) % doctorsDB.length;
            updateVetCardUI();
        }
        if (e.target.closest('#btnNextVet')) {
            currentVetIndex = (currentVetIndex + 1) % doctorsDB.length;
            updateVetCardUI();
        }
        if (e.target.closest('#btnSelectVet')) {
            const doc = doctorsDB[currentVetIndex];
            document.getElementById('apptVetIdHidden').value = currentVetIndex;
            document.getElementById('apptSelectedVetName').value = doc.name;
            updateVetCardUI(); 
        }

        // --- SHOPPING CART ---
        if (e.target.classList.contains('btn-add-cart')) {
            cartItems.push({ 
                name: e.target.getAttribute('data-name'), 
                price: e.target.getAttribute('data-price'), 
                img: e.target.getAttribute('data-img') 
            });
            updateCartUI();
            const originalText = e.target.innerText;
            e.target.innerText = "✓ Added";
            e.target.style.background = "#10b981";
            e.target.style.color = "white";
            e.target.style.borderColor = "#10b981";
            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.background = "white";
                e.target.style.color = "#4f46e5";
                e.target.style.borderColor = "#4f46e5";
            }, 1000);
        }
        if (e.target.classList.contains('btn-buy-now')) {
            const card = e.target.closest('.shop-card');
            const addBtn = card.querySelector('.btn-add-cart');
            cartItems.push({ 
                name: addBtn.getAttribute('data-name'), price: addBtn.getAttribute('data-price'), img: addBtn.getAttribute('data-img') 
            });
            updateCartUI();
            document.getElementById('cartModalOverlay').style.display = 'flex';
        }
        if (e.target.closest('#btnOpenCart')) document.getElementById('cartModalOverlay').style.display = 'flex';

        // --- MATCH MAKER ---
        if (e.target.closest('.mode-btn')) {
            document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
            e.target.closest('.mode-btn').classList.add('active');
            if(selectedMyPetId) document.querySelector(`[data-pet="${selectedMyPetId}"]`).click();
        }

        // --- VET APPOINTMENT PET SELECTOR ---
        const vetPetCard = e.target.closest('.pet-select-card');
        if (vetPetCard && document.getElementById('vetBookingForm')) {
            // Highlight the selected pet visually
            document.querySelectorAll('.pet-select-card').forEach(c => c.classList.remove('selected'));
            vetPetCard.classList.add('selected');

            // Save the ID for the form submission
            const petId = vetPetCard.getAttribute('data-petid');
            document.getElementById('apptPetSelectorHidden').value = petId;

            // Auto-fill the form with real database data!
            const selectedPet = REAL_DB_PETS.find(p => p.id.toString() === petId);
            if (selectedPet) {
                document.getElementById('apptOwner').value = CURRENT_USER;
                document.getElementById('apptPetType').value = selectedPet.breed && selectedPet.breed.toLowerCase().includes('cat') ? "Cat" : "Dog"; 
                document.getElementById('apptBreed').value = selectedPet.breed || "Unknown";
                document.getElementById('apptGender').value = selectedPet.gender || "Unknown";
            }
        }

        const myPetCard = e.target.closest('.my-pet-card');
        if (myPetCard && !document.getElementById('apptPetSelectorHidden')) { 
            document.querySelectorAll('.my-pet-card').forEach(c => c.classList.remove('active'));
            myPetCard.classList.add('active');
            
            // ---> FIXED: Pull exact ID from the element and REAL_DB_PETS
            selectedMyPetId = myPetCard.getAttribute('data-petid'); 
            const myPet = REAL_DB_PETS.find(p => p.id.toString() === selectedMyPetId);
            
            document.getElementById('datingContentLayout').style.display = 'none';
            const overlay = document.getElementById('instructionOverlay');
            overlay.style.display = 'flex';
            overlay.innerHTML = `<div class="radar-container"><div class="radar-ring ring1"></div><div class="radar-ring ring2"></div><div class="radar-ring ring3"></div><div class="radar-center"><i class="fa-solid fa-satellite-dish"></i></div></div><p>Scanning database for verified matches...</p>`;
            
            // Candidates from Appwrite Database (other registered pets)
            Promise.resolve().then(() => {
                const candidates = REAL_DB_PETS.filter(p => p.owner !== CURRENT_USER).map(p => ({
                    id: p.id,
                    name: p.name,
                    breed: p.breed,
                    gender: p.gender,
                    age: p.age,
                    photos: [p.img],
                    imgs: [p.img],
                    owner: p.owner || 'PawUser',
                    ownerName: p.owner || 'PawUser',
                    score: 94,
                    traits: p.personal_traits ? p.personal_traits.split(',').map(t => t.trim()) : ['Playful', 'Friendly'],
                    desc: p.reason_for_adoption || 'Looking for a friend!',
                    verified: true
                }));
                return { status: 'success', candidates: candidates };
            })
            .then(data => {
                if (data.status === 'success' && data.candidates.length > 0) {
                    currentFilteredCandidates = data.candidates; 
                    currentCandidateIndex = 0;
                    setTimeout(() => { loadCandidate(); }, 800); 
                } else {
                    overlay.innerHTML = '<p style="color:#64748b; font-weight:bold; font-size:1.1rem;">No match candidates available right now. Invite friends or register more pets!</p>';
                }
            });
        }

        const thumbBtn = e.target.closest('.cand-thumb');
        if (thumbBtn) {
            const cand = currentFilteredCandidates[currentCandidateIndex];
            updateCandidatePhoto(cand, thumbBtn.getAttribute('data-index'));
        }

        const passBtn = e.target.closest('#btnPassCandidate');
        const matchBtn = e.target.closest('#btnMatchCandidate');
        const treatBtn = e.target.closest('#btnTreatCandidate');

        if (passBtn || matchBtn || treatBtn) {
            const cand = currentFilteredCandidates[currentCandidateIndex];
            
            // Get the real pet from REAL_DB_PETS!
            const myPet = REAL_DB_PETS.find(p => p.id.toString() === selectedMyPetId);
            
            let actionStr = 'pass';
            if (matchBtn) actionStr = 'like';
            if (treatBtn) actionStr = 'super_like';

            if (actionStr === 'super_like' && treatsLeft <= 0) {
                showCustomPopup("Out of Treats", "You have used all your Super Treats for today! Come back tomorrow.", true);
                return;
            }

            Promise.resolve({ status: 'success', isMatch: true })
            .then(data => {
                if (data.status === 'success') {
                    if (actionStr === 'super_like') treatsLeft--;
                    
                    // Add to History
                    passedPetsHistory.unshift(cand);
                    if(passedPetsHistory.length > 5) passedPetsHistory.pop();
                    
                    // Log it!
                    if (actionStr !== 'pass') {
                        addActivityLog(actionStr === 'super_like' ? 'Sent a Super Treat to' : 'Sent a match request to', cand.name, 'fa-heart');
                        
                        // Show the fun Match Popup if they liked them
                        document.getElementById('matchImgLeft').src = myPet.img;
                        document.getElementById('matchImgRight').src = cand.imgs[0];
                        document.getElementById('matchNameLeft').innerText = myPet.name;
                        document.getElementById('matchNameRight').innerText = cand.name;
                        
                        // Is it a mutual match?!
                        const statusMsg = data.isMatch ? "✨ IT'S A MATCH! ✨" : (actionStr === 'super_like' ? "Super Liked! 🦴 (Pending)" : "Pending Owner Approval");
                        
                        document.getElementById('matchDateSpot').innerText = "PawTrack Verified";
                       // ---> FIXED: Leave the box empty if it's pending so you don't accidentally send the status text!
                        const icebreakerInput = document.getElementById('matchIcebreaker');
                        icebreakerInput.value = data.isMatch ? "You matched! Let's plan a playdate!" : "";
                        icebreakerInput.placeholder = data.isMatch ? "Type a message..." : `Say hi to ${cand.ownerName} while you wait...`;
                        
                        // ---> FIX: Store the username on the button so we can send the message! <---
                        document.getElementById('btnContinueMatch').setAttribute('data-targetuser', cand.ownerName);
                        
                        document.getElementById('matchOverlay').style.display = 'flex';

                        // Add to local activePairs array so it shows instantly on the dashboard
                        activePairs.unshift({
                            id: "p" + Date.now(),
                            maleName: myPet.gender === "Male" ? myPet.name : cand.name,
                            femaleName: myPet.gender === "Female" ? myPet.name : cand.name,
                            maleImg: myPet.gender === "Male" ? myPet.img : cand.imgs[0],
                            femaleImg: myPet.gender === "Female" ? myPet.img : cand.imgs[0],
                            status: statusMsg,
                            isApproved: data.isMatch,
                            date: "Just Now",
                            
                            // ---> FIX: Add ownerUsername so the Message Owner button works! <---
                            ownerUsername: cand.ownerName 
                        });
                    }

                    // Move to next pet
                    currentCandidateIndex++;
                    loadCandidate();
                } else {
                    showCustomPopup("Error", data.message, true);
                }
            })
            .catch(err => console.error("Swipe Error:", err));
        }
        if (e.target.closest('#btnOpenPrefs')) document.getElementById('prefModal').style.display = 'flex';
        if (e.target.closest('#btnViewActivePairs')) loadMatchDashboard();
        if (e.target.closest('#btnBackToMatch')) {
            mainDisplayPanel.innerHTML = renderMatchMakerHTML();
            selectedMyPetId = null;
        }

        // --- MATCH DASHBOARD: ACCEPT OR DELETE REQUESTS ---
        const acceptBtn = e.target.closest('.btn-accept-match');
        const deleteBtn = e.target.closest('.btn-delete-pair');
        
        if (acceptBtn || deleteBtn) {
            const action = acceptBtn ? 'accept' : 'delete';
            const matchId = (acceptBtn || deleteBtn).getAttribute('data-matchid');
            
            if (action === 'delete') {
                // Pull the dynamic text straight from the X button we clicked!
                const popupTitle = deleteBtn.getAttribute('data-title') || "Cancel Request";
                const popupMsg = deleteBtn.getAttribute('data-msg') || "Are you sure you want to remove this match?";
                
                showCustomConfirm(popupTitle, popupMsg, () => {
                    ACTIVE_MATCHES = ACTIVE_MATCHES.filter(m => m.id !== matchId);
                    loadMatchDashboard();
                });
            } else {
                const targetMatch = ACTIVE_MATCHES.find(m => m.id === matchId);
                if (targetMatch) targetMatch.status = 'approved';
                loadMatchDashboard();
            }
        }
    }); 

    // 8. MODALS & FORMS OUTSIDE MAIN PANEL
    document.getElementById('btnCloseCart').addEventListener('click', () => document.getElementById('cartModalOverlay').style.display = 'none');
    document.getElementById('btnContinueShopping').addEventListener('click', () => document.getElementById('cartModalOverlay').style.display = 'none');
    document.getElementById('btnCheckout').addEventListener('click', () => {
        // 1. Modern error popup if cart is empty
        if(cartItems.length === 0) { 
            showCustomPopup("Empty Cart", "Your cart is empty! Please add some items first.", true); 
            return; 
        }
        
        // 2. Log the shopping checkout to your Recent Activity (from our last step!)
        addActivityLog('Completed a Pet Shop checkout', '', 'fa-bag-shopping');
        
        // 3. Clear the cart and hide the shop overlay
        cartItems = [];
        updateCartUI();
        document.getElementById('cartModalOverlay').style.display = 'none';
        
        // 4. Modern success popup!
        showCustomPopup("Order Placed!", "Order placed successfully! Thank you for shopping.", false);
    });

    const cartItemsContainerGlobal = document.getElementById('cartItemsContainer');
    cartItemsContainerGlobal.addEventListener('click', (e) => {
        const btnRemove = e.target.closest('.btn-remove-item');
        if (btnRemove) {
            cartItems.splice(parseInt(btnRemove.getAttribute('data-index')), 1);
            updateCartUI();
        }
    });

   document.getElementById('btnContinueMatch').addEventListener('click', (e) => {
        // Grab the username and message
        const targetUser = e.target.getAttribute('data-targetuser');
        const icebreaker = document.getElementById('matchIcebreaker').value.trim();
        
        // Only send if they typed something!
        if (icebreaker && targetUser) {
            if (!CHATS_STORE[targetUser]) CHATS_STORE[targetUser] = [];
            CHATS_STORE[targetUser].push({
                text: icebreaker,
                type: 'sent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            addActivityLog('Sent an Icebreaker message to', targetUser, 'fa-comment-dots');
        }

        document.getElementById('matchOverlay').style.display = 'none';
        loadMatchDashboard(); // Go straight to the dashboard!
    });

    document.getElementById('btnSavePrefs').addEventListener('click', () => {
        document.getElementById('prefModal').style.display = 'none';
        if(selectedMyPetId) document.querySelector(`[data-pet="${selectedMyPetId}"]`).click();
    });

    document.getElementById('prefModal').addEventListener('click', (e) => {
        if(e.target === document.getElementById('prefModal')) document.getElementById('prefModal').style.display = 'none';
    });

    // FORM SUBMISSIONS
    mainDisplayPanel.addEventListener('submit', (e) => {
        
        // VET FORM (Appwrite Database)
        if (e.target.id === 'vetBookingForm') {
            e.preventDefault();
            
            const petId = document.getElementById('apptPetSelectorHidden').value;
            const vetId = document.getElementById('apptVetIdHidden').value;
            
            if (!petId) { showCustomPopup("Error", "Please select a pet for the appointment by clicking their picture!", true); return; }
            if (!vetId) { showCustomPopup("Error", "Please choose a veterinarian by clicking 'Confirm' on the profile card!", true); return; }

            const petNameText = document.querySelector(`.pet-select-card[data-petid="${petId}"] span`).innerText;
            const vetNameText = document.getElementById('apptSelectedVetName').value;
            const petObj = REAL_DB_PETS.find(p => p.id?.toString() === petId?.toString());

            (async () => {
                try {
                    const createdVetDoc = await databases.createDocument(DB_ID, COLL_VET, ID.unique(), {
                        pet_name: petNameText,
                        vet_name: vetNameText,
                        status: 'Upcoming',
                        time: document.getElementById('apptTime').value || '',
                        date: document.getElementById('apptDate').value || '',
                        user_id: CURRENT_USER_ID,
                        img: petObj?.img || ''
                    });

                    USER_VET_APPS.unshift({ ...createdVetDoc, id: createdVetDoc.$id });
                    await addActivityLog('Booked vet visit for', petNameText, 'fa-user-doctor');
                    showCustomPopup("Request Sent!", "Appointment scheduled successfully! It is now Upcoming.", false, () => {
                        const vetBtn = document.querySelector('[data-target="vet"]');
                        if (vetBtn) vetBtn.click();
                        else {
                            mainDisplayPanel.innerHTML = renderVetAppointmentsHTML();
                            updateVetCardUI();
                        }
                    });
                } catch (err) {
                    console.error("Appwrite Vet Booking Error:", err);
                    showCustomPopup("Error", err.message, true);
                }
            })();
        }

        // ADOPTION FORM SUBMISSION (Appwrite Database)
        if (e.target.id === 'adoptionApplicationForm') {
            e.preventDefault();
            if (!document.getElementById('adoptTerms').checked) {
                showCustomPopup("Missing Requirement", "You must agree to the terms and conditions.", true);
                return;
            }

            const petId = document.getElementById('adoptPetId').value;
            const petName = document.getElementById('adoptPetName').value;
            const petObj = REAL_DB_PETS.find(p => p.id?.toString() === petId?.toString());

            (async () => {
                try {
                    const createdAppDoc = await databases.createDocument(DB_ID, COLL_APPS, ID.unique(), {
                        pet_name: petName,
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        status: 'Pending Review',
                        user_id: CURRENT_USER_ID,
                        img: petObj?.img || ''
                    });

                    USER_APPS.unshift({ ...createdAppDoc, id: createdAppDoc.$id });
                    await addActivityLog('Applied to adopt', petName, 'fa-house-chimney-user');
                    showCustomPopup("Application Sent!", "Successfully submitted! Status: PENDING REVIEW.", false, () => {
                        const appsBtn = document.querySelector('[data-target="applications"]');
                        if (appsBtn) appsBtn.click();
                        else {
                            mainDisplayPanel.innerHTML = renderMyApplicationsHTML();
                        }
                    });
                } catch (err) {
                    console.error("Appwrite Adoption Application Error:", err);
                    showCustomPopup("Error", err.message, true);
                }
            })();
        }

        // UPGRADED PET REGISTRATION (Appwrite Storage & Appwrite Database)
        if (e.target.id === 'petRegistrationForm' || e.target.id === 'registerPetForm') {
            e.preventDefault();
            
            (async () => {
                const fileInput = document.getElementById('petImageInput');
                const fileToUpload = selectedPetFile || (fileInput && fileInput.files && fileInput.files[0]);
                let petImageUrl = '';

                if (fileToUpload) {
                    try {
                        showCustomPopup("Uploading Photo", "Saving pet photo to PawTrack Storage...", false);
                        const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), fileToUpload);
                        petImageUrl = storage.getFileView(BUCKET_ID, uploaded.$id).toString();
                    } catch(uploadErr) {
                        console.error("Storage upload failed:", uploadErr);
                    }
                }

                if (!petImageUrl) {
                    petImageUrl = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80";
                }

                const adoptionCheckbox = document.getElementById('regForAdoption');
                const isForAdoption = adoptionCheckbox ? adoptionCheckbox.checked : true;
                const formData = new FormData(e.target);

                const newPetData = {
                    name: formData.get('name') || document.getElementById('regPetName')?.value || 'Unnamed Pet',
                    breed: formData.get('breed') || document.getElementById('regBreed')?.value || 'Mixed Breed',
                    gender: formData.get('gender') || document.getElementById('regGender')?.value || 'Male',
                    age: formData.get('age') || document.getElementById('regAge')?.value || '1 yr',
                    status: isForAdoption ? 'Available' : 'Private',
                    health_status: formData.get('health_status') || 'Healthy / Vaccinated',
                    owner: CURRENT_USER,
                    contact_number: formData.get('contact_number') || CURRENT_USER_PHONE || '0917-000-0000',
                    personal_traits: formData.get('personal_traits') || document.getElementById('regDesc')?.value || 'Friendly',
                    reason_for_adoption: formData.get('reason_for_adoption') || (isForAdoption ? 'Looking for a home' : 'Personal pet'),
                    img: petImageUrl
                };

                try {
                    const createdPetDoc = await databases.createDocument(DB_ID, COLL_PETS, ID.unique(), newPetData);
                    const newPet = { ...createdPetDoc, id: createdPetDoc.$id };
                    REAL_DB_PETS.unshift(newPet);
                    await addActivityLog(isForAdoption ? 'Listed pet for adoption' : 'Registered private pet', newPetData.name, 'fa-shield-cat');

                    const successMsg = isForAdoption 
                        ? "Pet Registered Successfully! Photo saved to PawTrack Storage and listed on the adoption board." 
                        : "Pet added to your personal roster! Photo saved to PawTrack Storage.";
                    showCustomPopup("Success!", successMsg, false, () => {
                        if (isForAdoption) {
                            const petsBtn = document.querySelector('[data-target="pets"]');
                            if (petsBtn) petsBtn.click();
                            else mainDisplayPanel.innerHTML = renderAvailablePetsHTML();
                        } else {
                            const homeBtn = document.querySelector('[data-target="home"]');
                            if (homeBtn) homeBtn.click();
                            else loadHome();
                        }
                    });
                } catch(dbErr) {
                    console.error("Appwrite Pet Registration Error:", dbErr);
                    showCustomPopup("Error", "Could not register pet: " + dbErr.message, true);
                }
            })();
        }
      });

    mainDisplayPanel.addEventListener('reset', (e) => {
        if (e.target.id === 'vetBookingForm') {
            document.querySelectorAll('.pet-select-card').forEach(c => c.classList.remove('selected'));
            if (document.getElementById('apptPetSelectorHidden')) document.getElementById('apptPetSelectorHidden').value = '';
            if (document.getElementById('apptVetIdHidden')) document.getElementById('apptVetIdHidden').value = '';
            setTimeout(() => { updateVetCardUI(); }, 10);
        }
    }); 

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fName = document.getElementById('editFirstName').value;
            const lName = document.getElementById('editLastName').value;
            const contact = document.getElementById('editContact').value;
            const newName = `${fName} ${lName}`.trim();

            try {
                if (newName) await account.updateName(newName);
                await account.updatePrefs({
                    ...CURRENT_USER_PREFS,
                    phone: contact
                });
                CURRENT_USER = newName;
                CURRENT_USER_PHONE = contact;
                const nameDisplay = document.getElementById('userNameDisplay');
                if (nameDisplay) {
                    nameDisplay.innerText = CURRENT_USER ? 'Welcome, ' + CURRENT_USER + '!' : 'Welcome!';
                }
                await addActivityLog('Updated profile settings & information', '', 'fa-user-pen');
                document.getElementById('editProfileModal').style.display = 'none';
                showCustomPopup("Profile Saved", "Profile updated successfully!", false, () => {
                    populateProfileHub();
                });
            } catch (err) {
                showCustomPopup("Error", err.message, true);
            }
        });
    }

    mainDisplayPanel.addEventListener('input', (e) => {
        if (e.target.id === 'shopPriceFilter') {
            document.getElementById('shopPriceDisplay').innerText = `₱${e.target.value}`;
            filterShopItems();
        }
    });

    mainDisplayPanel.addEventListener('change', (e) => {
        if (e.target.id === 'shopCategoryFilter') {
            filterShopItems();
        }
    });

    function filterShopItems() {
        const selectedCat = document.getElementById('shopCategoryFilter').value;
        const maxPrice = parseFloat(document.getElementById('shopPriceFilter').value);
        const filtered = SHOP_ITEMS.filter(item => {
            const matchesCat = selectedCat === 'All Categories' || item.category === selectedCat;
            const matchesPrice = item.price <= maxPrice;
            return matchesCat && matchesPrice;
        });
        document.getElementById('shopGridContainer').innerHTML = renderShopGrid(filtered);
    }

    async function populateProfileHub() {
        // --- 1. AVATAR & STORAGE UPLOAD ---
        const profilePic = document.getElementById('mainProfilePic');
        if (profilePic) {
            profilePic.src = CURRENT_USER_PREFS.avatarUrl || '/resources/avatar/Avatar 1.jpg';
        }

        const changePhotoBtn = document.getElementById('btnChangeAvatar') || document.querySelector('.btn-change-photo');
        const avatarInput = document.getElementById('avatarFileInput');
        if (changePhotoBtn && avatarInput) {
            changePhotoBtn.onclick = () => avatarInput.click();
            avatarInput.onchange = async function() {
                if (this.files && this.files[0]) {
                    try {
                        showCustomPopup("Uploading", "Uploading avatar to PawTrack Storage...", false);
                        const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), this.files[0]);
                        const avatarUrl = storage.getFileView(BUCKET_ID, uploaded.$id).toString();
                        await account.updatePrefs({
                            ...CURRENT_USER_PREFS,
                            avatarUrl: avatarUrl
                        });
                        CURRENT_USER_PREFS.avatarUrl = avatarUrl;
                        if (profilePic) profilePic.src = avatarUrl;
                        await addActivityLog('Updated profile picture', 'Saved to PawTrack Storage', 'fa-camera');
                        showCustomPopup("Success", "Profile photo uploaded to PawTrack Storage!");
                    } catch(e) {
                        showCustomPopup("Error", "Failed to upload photo: " + e.message, true);
                    }
                }
            };
        }

        // --- 2. PRE-FILL USER DETAILS ---
        const fullNameEl = document.getElementById('profileFullName');
        const usernameEl = document.getElementById('profileUsername');
        const emailEl = document.getElementById('profileEmail');
        const phoneEl = document.getElementById('profilePhone');
        
        if (fullNameEl) fullNameEl.innerText = CURRENT_USER;
        if (usernameEl) usernameEl.innerText = CURRENT_USER_PREFS.username ? '@' + CURRENT_USER_PREFS.username : '@' + CURRENT_USER_EMAIL.split('@')[0];
        if (emailEl) emailEl.innerText = CURRENT_USER_EMAIL;
        if (phoneEl) phoneEl.innerText = CURRENT_USER_PHONE || 'None';

        const [fName = '', ...lNameParts] = (CURRENT_USER || '').split(' ');
        const lName = lNameParts.join(' ');
        const editFName = document.getElementById('editFirstName');
        const editLName = document.getElementById('editLastName');
        const editPhone = document.getElementById('editContact');
        const editEmail = document.getElementById('editEmail');
        if (editFName) editFName.value = fName;
        if (editLName) editLName.value = lName;
        if (editPhone) editPhone.value = CURRENT_USER_PHONE || '';
        if (editEmail) editEmail.value = CURRENT_USER_EMAIL || '';

        // --- 3. FILTER PETS & STATS ---
        const myPets = REAL_DB_PETS.filter(p => p.owner === CURRENT_USER);
        const successfulAdoptions = USER_APPS.filter(a => a.status === 'Approved').length;
        const countOwned = document.getElementById('countOwnedPets');
        const countApps = document.getElementById('countSuccessfulApps');
        if (countOwned) countOwned.innerText = myPets.length;
        if (countApps) countApps.innerText = successfulAdoptions;

        // --- 4. ROSTER ---
        const privateRoster = document.getElementById('privateRosterGrid');
        const adoptionRoster = document.getElementById('adoptionRosterGrid');
        if (privateRoster && adoptionRoster) {
            privateRoster.innerHTML = '';
            adoptionRoster.innerHTML = '';

            myPets.forEach(pet => {
                const cardHTML = `
                    <div class="roster-card">
                        <img src="${pet.img}" class="roster-img">
                        <div class="roster-info"><h4>${pet.name}</h4><p>${pet.breed}</p></div>
                        <button class="btn-archive-pet" data-petid="${pet.id}" title="Move to Bin" 
                            style="background: white; border: 2px solid #ef4444; color: #ef4444; padding: 6px 15px; border-radius: 20px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s;" 
                            onmouseover="this.style.background='#ef4444'; this.style.color='white';" 
                            onmouseout="this.style.background='white'; this.style.color='#ef4444';">
                            <i class="fa-solid fa-trash-can"></i> Bin
                        </button>
                    </div>
                `;
                if (pet.status === 'Private') {
                    privateRoster.innerHTML += cardHTML;
                } else {
                    adoptionRoster.innerHTML += cardHTML;
                }
            });
        }

        // --- 5. ACTIVITY LOGS (DIRECT FROM APPWRITE DATABASE - ZERO LOCALSTORAGE) ---
        const logContainer = document.getElementById('recentActivityLogs');
        if (logContainer) {
            logContainer.innerHTML = '<div class="activity-loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading activity logs...</div>';
            try {
                const logsRes = await databases.listDocuments(DB_ID, COLL_LOGS, [
                    Query.equal('user_id', CURRENT_USER_ID),
                    Query.orderDesc('$createdAt'),
                    Query.limit(20)
                ]);
                logContainer.innerHTML = '';
                const logs = logsRes.documents;
                if (logs.length > 0) {
                    logs.forEach(log => {
                        const ts = parseInt(log.timestamp) || new Date(log.$createdAt).getTime();
                        const friendlyTime = formatFriendlyTime(ts);
                        const theme = getActivityTheme(log.action, log.icon);
                        const safeTarget = log.target ? escapeHtml(log.target) : '';
                        const safeAction = escapeHtml(log.action || 'Activity recorded');

                        logContainer.innerHTML += `
                            <div class="activity-item">
                                <div class="activity-icon-bubble ${theme.themeClass}">
                                    <i class="fa-solid ${theme.icon}"></i>
                                </div>
                                <div class="activity-details">
                                    <div class="activity-row-main">
                                        <span class="activity-action-text">${safeAction}</span>
                                        <span class="activity-category-pill ${theme.tagClass}">${theme.tagLabel}</span>
                                    </div>
                                    ${safeTarget ? `
                                        <div class="activity-target-pill">
                                            <i class="fa-solid fa-quote-left"></i>
                                            <span>${safeTarget}</span>
                                        </div>
                                    ` : ''}
                                    <div class="activity-meta">
                                        <span class="activity-timestamp"><i class="fa-regular fa-clock"></i> ${friendlyTime}</span>
                                        <span class="activity-verified-tag"><i class="fa-solid fa-circle-check"></i> Recorded</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    logContainer.innerHTML = `
                        <div class="activity-empty-state">
                            <div class="empty-icon-circle"><i class="fa-solid fa-shield-halved"></i></div>
                            <h4>Security & Account Verified</h4>
                            <p>Your session is active. Actions like pet registrations, adoptions, and profile updates will appear here in real time.</p>
                        </div>
                    `;
                }
            } catch (err) {
                console.warn("Could not load activity logs:", err);
                logContainer.innerHTML = `
                    <div class="activity-empty-state">
                        <div class="empty-icon-circle"><i class="fa-solid fa-circle-info"></i></div>
                        <h4>No Activity Recorded</h4>
                        <p>No past logs found for your account yet.</p>
                    </div>
                `;
            }
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getActivityTheme(action, icon) {
        const act = (action || '').toLowerCase();
        if (act.includes('log') || act.includes('auth') || act.includes('verified') || act.includes('session')) {
            return {
                themeClass: 'theme-emerald',
                icon: 'fa-shield-halved',
                tagClass: 'tag-emerald',
                tagLabel: 'Security'
            };
        }
        if (act.includes('bin') || act.includes('delet') || act.includes('dumpster') || act.includes('trash')) {
            return {
                themeClass: 'theme-rose',
                icon: 'fa-trash-can',
                tagClass: 'tag-rose',
                tagLabel: 'Archive'
            };
        }
        if (act.includes('pet') || act.includes('adopt') || act.includes('restor') || act.includes('breed')) {
            return {
                themeClass: 'theme-terracotta',
                icon: 'fa-paw',
                tagClass: 'tag-terracotta',
                tagLabel: 'Pet Care'
            };
        }
        if (act.includes('photo') || act.includes('avatar') || act.includes('profile') || act.includes('settings')) {
            return {
                themeClass: 'theme-honey',
                icon: 'fa-user-pen',
                tagClass: 'tag-honey',
                tagLabel: 'Profile'
            };
        }
        if (act.includes('shop') || act.includes('cart') || act.includes('item') || act.includes('buy')) {
            return {
                themeClass: 'theme-amber',
                icon: 'fa-bag-shopping',
                tagClass: 'tag-amber',
                tagLabel: 'Shop'
            };
        }
        let finalIcon = icon || 'fa-bell';
        if (finalIcon === 'fa-right-to-bracket') finalIcon = 'fa-arrow-right-to-bracket';
        return {
            themeClass: 'theme-sage',
            icon: finalIcon,
            tagClass: 'tag-sage',
            tagLabel: 'Activity'
        };
    }

    function formatFriendlyTime(ts) {
        const now = Date.now();
        const diff = Math.max(0, now - ts);
        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;

        const dateObj = new Date(ts);
        const timeStr = dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

        if (diff < 2 * minute) {
            return 'Just now';
        } else if (diff < 60 * minute) {
            const mins = Math.floor(diff / minute);
            return `${mins}m ago`;
        } else if (diff < 24 * hour) {
            const hrs = Math.floor(diff / hour);
            return `${hrs}h ago (${timeStr})`;
        } else {
            const isYesterday = (new Date(now - day)).toDateString() === dateObj.toDateString();
            if (isYesterday) {
                return `Yesterday at ${timeStr}`;
            }
            return dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ` at ${timeStr}`;
        }
    }
// ==========================================
    // PAWTRACK MESSENGER SYSTEM (SIDEBAR INTEGRATED)
    // ==========================================
    const logoutBtn = document.getElementById('btnLogout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await account.deleteSession('current');
            } catch(e) {
                console.warn(e);
            }
            window.location.href = '/PawTrackLogin.html';
        });
    }

    let currentActiveChat = null;

    // Seed friendly default welcome conversation if CHATS_STORE is empty
    if (Object.keys(CHATS_STORE).length === 0) {
        CHATS_STORE['PawTrackCommunity'] = [
            { text: "Welcome to PawTrack! Connect with pet lovers, adopters, and arrange playdates right here.", type: 'received', time: '10:00 AM' }
        ];
    }

    function renderMessagesPageHTML() {
        return `
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
        `;
    }

    function initMessengerPage(autoOpenUser = null) {
        const inboxList = document.getElementById('messengerInboxList');
        const chatPanel = document.getElementById('messengerChatPanel');
        const newChatBtn = document.getElementById('btnPageNewChat');
        const searchInput = document.getElementById('messengerSearchInput');

        if (!inboxList || !chatPanel) return;

        function refreshInbox(filter = '') {
            inboxList.innerHTML = '';
            const contacts = Object.keys(CHATS_STORE).filter(u => u.toLowerCase().includes(filter.toLowerCase()));

            if (contacts.length === 0) {
                inboxList.innerHTML = `
                    <div class="inbox-empty-state">
                        <i class="fa-solid fa-comments"></i>
                        <p>No conversations found.<br>Click "New Conversation" to start chatting!</p>
                    </div>
                `;
                return;
            }

            contacts.forEach(username => {
                const msgs = CHATS_STORE[username] || [];
                const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1].text : 'No messages yet';
                const lastTime = msgs.length > 0 ? msgs[msgs.length - 1].time : '';
                const isActive = username === currentActiveChat ? 'active' : '';

                const item = document.createElement('div');
                item.className = `inbox-item ${isActive}`;
                item.setAttribute('data-user', username);
                item.innerHTML = `
                    <div class="inbox-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="inbox-info">
                        <div class="inbox-info-header">
                            <h4>@${escapeHtml(username)}</h4>
                            <span class="inbox-time">${lastTime}</span>
                        </div>
                        <p class="inbox-snippet">${escapeHtml(lastMsg)}</p>
                    </div>
                `;
                item.onclick = () => openActiveChat(username);
                inboxList.appendChild(item);
            });
        }

        function openActiveChat(username) {
            currentActiveChat = username;

            // Highlight selected item in inbox list
            document.querySelectorAll('.inbox-item').forEach(el => {
                el.classList.toggle('active', el.getAttribute('data-user') === username);
            });

            const msgs = CHATS_STORE[username] || [];

            chatPanel.innerHTML = `
                <div class="chat-pane-header">
                    <div class="chat-header-user">
                        <div class="chat-header-avatar"><i class="fa-solid fa-user"></i></div>
                        <div>
                            <h3>@${escapeHtml(username)}</h3>
                            <span class="chat-online-status"><span class="status-dot-green"></span> Active Conversation</span>
                        </div>
                    </div>
                </div>

                <div class="chat-pane-messages" id="activeChatStream">
                    ${msgs.length === 0 ? '<div class="empty-stream"><p>This is the start of your message history with @' + escapeHtml(username) + '</p></div>' : ''}
                </div>

                <div class="chat-pane-input-bar">
                    <div class="chat-input-pill">
                        <input type="text" id="activeChatInput" placeholder="Write a message to @${escapeHtml(username)}...">
                    </div>
                    <button class="btn-chat-send" id="btnActiveSend">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            `;

            const stream = document.getElementById('activeChatStream');
            msgs.forEach(m => {
                appendChatMessageToStream(stream, m.text, m.type, m.time);
            });
            stream.scrollTop = stream.scrollHeight;

            const input = document.getElementById('activeChatInput');
            const sendBtn = document.getElementById('btnActiveSend');

            function handleSend() {
                const text = input.value.trim();
                if (!text || !currentActiveChat) return;

                const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                appendChatMessageToStream(stream, text, 'sent', timeStr);
                input.value = '';
                stream.scrollTop = stream.scrollHeight;

                if (!CHATS_STORE[currentActiveChat]) CHATS_STORE[currentActiveChat] = [];
                CHATS_STORE[currentActiveChat].push({ text, type: 'sent', time: timeStr });
                refreshInbox(searchInput.value.trim());

                if (currentActiveChat === 'PawTrackCommunity') {
                    setTimeout(() => {
                        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const replyText = "We're glad to have you! Feel free to connect with pet owners across PawTrack.";
                        CHATS_STORE['PawTrackCommunity'].push({ text: replyText, type: 'received', time: replyTime });
                        if (currentActiveChat === 'PawTrackCommunity') {
                            appendChatMessageToStream(stream, replyText, 'received', replyTime);
                            stream.scrollTop = stream.scrollHeight;
                        }
                        refreshInbox(searchInput.value.trim());
                    }, 1000);
                }
            }

            sendBtn.onclick = handleSend;
            input.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
            input.focus();
        }

        function appendChatMessageToStream(streamEl, text, type, timeStr) {
            const b = document.createElement('div');
            b.className = `stream-bubble bubble-${type}`;
            b.innerHTML = `
                <div class="bubble-text">${escapeHtml(text)}</div>
                <div class="bubble-time">${timeStr}</div>
            `;
            streamEl.appendChild(b);
        }

        searchInput.oninput = (e) => {
            refreshInbox(e.target.value.trim());
        };

        newChatBtn.onclick = () => {
            showCustomPrompt("Start Conversation", "Enter the PawTrack username you'd like to message:", (targetUser) => {
                if (targetUser && targetUser.trim()) {
                    const cleanUser = targetUser.trim().replace('@', '');
                    if (!CHATS_STORE[cleanUser]) {
                        CHATS_STORE[cleanUser] = [];
                    }
                    refreshInbox();
                    openActiveChat(cleanUser);
                }
            });
        };

        const allContacts = Object.keys(CHATS_STORE);
        const contactToOpen = autoOpenUser || (allContacts.length > 0 ? allContacts[0] : null);

        refreshInbox();
        if (contactToOpen) {
            openActiveChat(contactToOpen);
        } else {
            chatPanel.innerHTML = `
                <div class="empty-conversation-state">
                    <div class="empty-icon-circle"><i class="fa-solid fa-comments"></i></div>
                    <h3>Your Messages</h3>
                    <p>Select a conversation from the left or click "New Conversation" to start chatting.</p>
                </div>
            `;
        }
    }

    // Connect to "Message Owner" in Match Maker
    mainDisplayPanel.addEventListener('click', (e) => {
        const msgOwnerBtn = e.target.closest('.btn-message-owner');
        if (msgOwnerBtn) {
            const ownerUsername = msgOwnerBtn.getAttribute('data-owner');
            const msgNavBtn = document.querySelector('.sidebar-nav .nav-btn[data-target="messages"]');
            if (msgNavBtn) {
                navButtons.forEach(b => b.classList.remove('active'));
                msgNavBtn.classList.add('active');
            }
            mainDisplayPanel.scrollTo({ top: 0, behavior: 'smooth' });
            mainDisplayPanel.innerHTML = renderMessagesPageHTML();
            initMessengerPage(ownerUsername);
        }
    });

    // Sync settings range display & preferences saving
    mainDisplayPanel.addEventListener('input', (e) => {
        if (e.target.id === 'radarDistanceRange') {
            const valDisplay = document.getElementById('radarDistanceValue');
            if (valDisplay) valDisplay.innerText = `${e.target.value} km`;
        }
    });

    mainDisplayPanel.addEventListener('click', async (e) => {
        if (e.target.closest('#btnSaveAllSettings')) {
            const vetChecked = document.getElementById('notifVet')?.checked ?? true;
            const matchChecked = document.getElementById('notifMatch')?.checked ?? true;
            const appChecked = document.getElementById('notifAdoption')?.checked ?? true;
            const incognitoChecked = document.getElementById('prefIncognito')?.checked ?? false;
            const radarVal = document.getElementById('radarDistanceRange')?.value || '25';

            try {
                await account.updatePrefs({
                    ...CURRENT_USER_PREFS,
                    notifVet: vetChecked,
                    notifMatch: matchChecked,
                    notifAdoption: appChecked,
                    incognito: incognitoChecked,
                    radarDistance: radarVal
                });
                CURRENT_USER_PREFS.radarDistance = radarVal;
                CURRENT_USER_PREFS.incognito = incognitoChecked;
                await addActivityLog('Updated notification & discovery preferences', '', 'fa-sliders');
                showCustomPopup("Settings Saved", "Your notification, privacy, and discovery preferences have been updated successfully!");
            } catch (err) {
                showCustomPopup("Error", err.message, true);
            }
        }
    });

    // ==========================================
    // INTERACTIVE ONBOARDING TOUR & TUTORIAL LOGIC
    // ==========================================
    const TOUR_STEPS = [
        {
            title: "Your Care Dashboard 🏠",
            desc: "Welcome to PawTrack! From your Home dashboard, track registered pet counts, see active adoption statuses, review upcoming vet reminders, and get daily outdoor walk weather tips.",
            icon: "fa-house",
            targetSelector: ".sidebar-nav [data-target='home']",
            tab: "home",
            placement: "right"
        },
        {
            title: "Live Adoption Board 🐾",
            desc: "Browse companions looking for a loving home! When other users register a pet for adoption, it shows up here in real-time without reloading. Click 'Details' to view medical notes, or 'Adopt Now' to send a digital application.",
            icon: "fa-paw",
            targetSelector: ".sidebar-nav [data-target='pets']",
            tab: "pets",
            placement: "right"
        },
        {
            title: "Register Your Own Pet 📸",
            desc: "Add your furry family member with photo uploads to PawTrack Cloud Storage. Choose whether your companion is a private pet for health tracking or listed publicly for adoption.",
            icon: "fa-plus-circle",
            targetSelector: "#btnRegisterPet",
            tab: null,
            placement: "bottom"
        },
        {
            title: "Pet Matchmaker & Playdates ❤️",
            desc: "Find compatible playmates or breeding matches based on breed, age, and location. Give a Treat to express interest, or pass to browse more verified neighborhood companions.",
            icon: "fa-heart",
            targetSelector: ".sidebar-nav [data-target='breeding']",
            tab: "breeding",
            placement: "right"
        },
        {
            title: "Verified Vet Appointments 🩺",
            desc: "Book check-ups and medical visits with licensed veterinarians. Select your preferred clinic and time slot, and manage upcoming appointments in one place.",
            icon: "fa-user-doctor",
            targetSelector: ".sidebar-nav [data-target='vet']",
            tab: "vet",
            placement: "right"
        },
        {
            title: "Real-Time Messages & Alerts 💬",
            desc: "Chat directly with pet owners, caregivers, and adopters. Real-time notification toasts keep you updated the moment an application is approved or a new pet is posted!",
            icon: "fa-comment-dots",
            targetSelector: "#navMessagesBtn",
            tab: "messages",
            placement: "right"
        }
    ];

    let currentTourIndex = 0;
    let isTourActive = false;
    let currentHighlightedEl = null;

    function setHighlightedTarget(el) {
        if (currentHighlightedEl && currentHighlightedEl !== el) {
            currentHighlightedEl.classList.remove('tour-target-elevated');
        }
        if (el) {
            el.classList.add('tour-target-elevated');
            currentHighlightedEl = el;
        } else {
            currentHighlightedEl = null;
        }
    }

    function positionSpotlightAndCard(step) {
        const overlay = document.getElementById('pawtrackTourOverlay');
        const spotlight = document.getElementById('tourSpotlightBox');
        const card = document.getElementById('tourCard');
        if (!overlay || !spotlight || !card) return;

        let targetEl = step.targetSelector ? document.querySelector(step.targetSelector) : null;

        if (!targetEl || targetEl.offsetParent === null) {
            spotlight.style.display = 'none';
            overlay.classList.add('no-target');
            setHighlightedTarget(null);
            card.style.top = '50%';
            card.style.left = '50%';
            card.style.transform = 'translate(-50%, -50%)';
            return;
        }

        overlay.classList.remove('no-target');
        setHighlightedTarget(targetEl);
        spotlight.style.display = 'block';

        const rect = targetEl.getBoundingClientRect();
        const padding = 6;

        const top = Math.max(0, rect.top - padding);
        const left = Math.max(0, rect.left - padding);
        const width = rect.width + (padding * 2);
        const height = rect.height + (padding * 2);

        spotlight.style.top = `${top}px`;
        spotlight.style.left = `${left}px`;
        spotlight.style.width = `${width}px`;
        spotlight.style.height = `${height}px`;

        try {
            const computedStyle = window.getComputedStyle(targetEl);
            const br = parseFloat(computedStyle.borderRadius) || 12;
            spotlight.style.borderRadius = `${Math.max(10, br + 4)}px`;
        } catch (e) {
            spotlight.style.borderRadius = '14px';
        }

        if (window.innerWidth <= 768) {
            card.style.top = '';
            card.style.left = '';
            card.style.transform = '';
            return;
        }

        card.style.transform = 'none';
        const cardWidth = 390;
        const cardHeight = card.offsetHeight || 220;
        const margin = 16;

        let cardTop, cardLeft;

        if (step.placement === 'right') {
            cardLeft = rect.right + margin;
            cardTop = Math.max(20, rect.top + (rect.height / 2) - (cardHeight / 2));
            if (cardLeft + cardWidth > window.innerWidth - 20) {
                cardLeft = Math.max(20, rect.left - cardWidth - margin);
            }
        } else if (step.placement === 'bottom') {
            cardTop = rect.bottom + margin;
            cardLeft = rect.left + (rect.width / 2) - (cardWidth / 2);
            if (cardLeft + cardWidth > window.innerWidth - 20) {
                cardLeft = window.innerWidth - cardWidth - 24;
            }
            if (cardLeft < 20) {
                cardLeft = 20;
            }
            if (cardTop + cardHeight > window.innerHeight - 20) {
                cardTop = Math.max(20, rect.top - cardHeight - margin);
            }
        } else {
            cardTop = Math.max(20, (window.innerHeight / 2) - (cardHeight / 2));
            cardLeft = Math.max(20, (window.innerWidth / 2) - (cardWidth / 2));
        }

        cardTop = Math.min(Math.max(20, cardTop), window.innerHeight - cardHeight - 20);
        cardLeft = Math.min(Math.max(20, cardLeft), window.innerWidth - cardWidth - 20);

        card.style.top = `${cardTop}px`;
        card.style.left = `${cardLeft}px`;
    }

    function renderTourStep(index) {
        if (index < 0 || index >= TOUR_STEPS.length) {
            endTour();
            return;
        }
        currentTourIndex = index;
        const step = TOUR_STEPS[index];

        if (step.tab) {
            const tabBtn = document.querySelector(`.sidebar-nav [data-target="${step.tab}"]`);
            if (tabBtn && !tabBtn.classList.contains('active')) {
                tabBtn.click();
            }
        }

        const badge = document.getElementById('tourStepBadge');
        const title = document.getElementById('tourStepTitle');
        const desc = document.getElementById('tourStepDesc');
        const iconBubble = document.getElementById('tourIconBubble');
        const dotsContainer = document.getElementById('tourDots');
        const prevBtn = document.getElementById('tourBtnPrev');
        const nextBtn = document.getElementById('tourBtnNext');

        if (badge) badge.innerText = `STEP ${index + 1} OF ${TOUR_STEPS.length}`;
        if (title) title.innerText = step.title;
        if (desc) desc.innerText = step.desc;
        if (iconBubble) iconBubble.innerHTML = `<i class="fa-solid ${step.icon}"></i>`;

        if (dotsContainer) {
            dotsContainer.innerHTML = TOUR_STEPS.map((_, i) => 
                `<div class="tour-dot ${i === index ? 'active' : ''}"></div>`
            ).join('');
        }

        if (prevBtn) {
            prevBtn.style.display = index > 0 ? 'inline-block' : 'none';
        }

        if (nextBtn) {
            if (index === TOUR_STEPS.length - 1) {
                nextBtn.innerHTML = `Finish Tour <i class="fa-solid fa-check"></i>`;
            } else {
                nextBtn.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
            }
        }

        setTimeout(() => {
            positionSpotlightAndCard(step);
        }, 60);

        setTimeout(() => {
            positionSpotlightAndCard(step);
        }, 220);
    }

    function startInteractiveTour(startIndex = 0) {
        const welcomeModal = document.getElementById('tourWelcomeModal');
        if (welcomeModal) welcomeModal.style.display = 'none';

        const hiwModal = document.getElementById('howItWorksModal');
        if (hiwModal) hiwModal.style.display = 'none';

        const overlay = document.getElementById('pawtrackTourOverlay');
        if (!overlay) return;
        overlay.style.display = 'block';
        isTourActive = true;

        renderTourStep(startIndex);
    }

    function endTour(markCompleted = true) {
        const overlay = document.getElementById('pawtrackTourOverlay');
        if (overlay) overlay.style.display = 'none';
        isTourActive = false;
        setHighlightedTarget(null);

        if (markCompleted) {
            try {
                localStorage.setItem('pawtrack_tour_completed', 'true');
            } catch (e) {}
        }
    }

    function nextTourStep() {
        if (currentTourIndex < TOUR_STEPS.length - 1) {
            renderTourStep(currentTourIndex + 1);
        } else {
            endTour(true);
            showRealtimeToast(
                "Tour Complete! 🌟", 
                "You're all set! Click 'Guide & Tour' anytime at the top of your screen to replay.", 
                "fa-circle-check", 
                null, 
                "app"
            );
        }
    }

    function prevTourStep() {
        if (currentTourIndex > 0) {
            renderTourStep(currentTourIndex - 1);
        }
    }

    function openHowItWorksGuide() {
        const modal = document.getElementById('howItWorksModal');
        if (modal) modal.style.display = 'flex';
    }

    function closeHowItWorksGuide() {
        const modal = document.getElementById('howItWorksModal');
        if (modal) modal.style.display = 'none';
    }

    function checkFirstTimeUserTour() {
        try {
            const completed = localStorage.getItem('pawtrack_tour_completed');
            if (!completed) {
                setTimeout(() => {
                    const welcomeModal = document.getElementById('tourWelcomeModal');
                    const welcomeHeading = document.getElementById('welcomeTourHeading');
                    if (welcomeHeading && CURRENT_USER) {
                        welcomeHeading.innerText = `Welcome, ${CURRENT_USER}! 👋`;
                    }
                    if (welcomeModal) welcomeModal.style.display = 'flex';
                }, 1400);
            }
        } catch (e) {}
    }

    // Attach Tour and Guide listeners
    const btnStartTour = document.getElementById('btnStartTour');
    if (btnStartTour) {
        btnStartTour.addEventListener('click', () => {
            startInteractiveTour(0);
        });
    }

    const btnSidebarTour = document.getElementById('btnSidebarTour');
    if (btnSidebarTour) {
        btnSidebarTour.addEventListener('click', () => {
            openHowItWorksGuide();
        });
    }

    const btnWelcomeTourStart = document.getElementById('btnWelcomeTourStart');
    if (btnWelcomeTourStart) {
        btnWelcomeTourStart.addEventListener('click', () => {
            startInteractiveTour(0);
        });
    }

    const btnWelcomeTourSkip = document.getElementById('btnWelcomeTourSkip');
    if (btnWelcomeTourSkip) {
        btnWelcomeTourSkip.addEventListener('click', () => {
            const welcomeModal = document.getElementById('tourWelcomeModal');
            if (welcomeModal) welcomeModal.style.display = 'none';
            try {
                localStorage.setItem('pawtrack_tour_completed', 'true');
            } catch (e) {}
        });
    }

    const tourBtnClose = document.getElementById('tourBtnClose');
    if (tourBtnClose) tourBtnClose.addEventListener('click', () => endTour(true));

    const tourBtnSkip = document.getElementById('tourBtnSkip');
    if (tourBtnSkip) tourBtnSkip.addEventListener('click', () => endTour(true));

    const tourBtnNext = document.getElementById('tourBtnNext');
    if (tourBtnNext) tourBtnNext.addEventListener('click', nextTourStep);

    const tourBtnPrev = document.getElementById('tourBtnPrev');
    if (tourBtnPrev) tourBtnPrev.addEventListener('click', prevTourStep);

    const btnHiwClose = document.getElementById('btnHiwClose');
    if (btnHiwClose) btnHiwClose.addEventListener('click', closeHowItWorksGuide);

    const btnHiwDismiss = document.getElementById('btnHiwDismiss');
    if (btnHiwDismiss) btnHiwDismiss.addEventListener('click', closeHowItWorksGuide);

    const btnHiwStartTour = document.getElementById('btnHiwStartInteractiveTour');
    if (btnHiwStartTour) {
        btnHiwStartTour.addEventListener('click', () => {
            closeHowItWorksGuide();
            startInteractiveTour(0);
        });
    }

    const hiwModal = document.getElementById('howItWorksModal');
    if (hiwModal) {
        hiwModal.addEventListener('click', (e) => {
            if (e.target === hiwModal) {
                closeHowItWorksGuide();
            }
        });
    }

    const welcomeModalEl = document.getElementById('tourWelcomeModal');
    if (welcomeModalEl) {
        welcomeModalEl.addEventListener('click', (e) => {
            if (e.target === welcomeModalEl) {
                welcomeModalEl.style.display = 'none';
            }
        });
    }

    // HIW Guide Modal Tabs
    document.querySelectorAll('.hiw-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.hiw-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.hiw-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('data-tab');
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    window.addEventListener('resize', () => {
        if (isTourActive && TOUR_STEPS[currentTourIndex]) {
            positionSpotlightAndCard(TOUR_STEPS[currentTourIndex]);
        }
    });

    window.addEventListener('scroll', () => {
        if (isTourActive && TOUR_STEPS[currentTourIndex]) {
            positionSpotlightAndCard(TOUR_STEPS[currentTourIndex]);
        }
    }, true);

    // ==========================================
    // SIDEBAR MINIMIZE / MAXIMIZE CONTROLLER
    // ==========================================
    function initSidebarToggle() {
        const sidebar = document.querySelector('.sidebar');
        const togglePill = document.getElementById('sidebarTogglePill');
        const headerToggleBtn = document.getElementById('btnHeaderSidebarToggle');
        const logoWrapper = document.getElementById('sidebarLogoWrapper');

        if (!sidebar) return;

        // Restore persisted user preference
        const isCollapsed = localStorage.getItem('pawtrack_sidebar_collapsed') === 'true';
        if (isCollapsed && window.innerWidth > 768) {
            sidebar.classList.add('collapsed');
            if (togglePill) {
                togglePill.title = "Maximize sidebar";
                togglePill.setAttribute('aria-label', 'Maximize sidebar');
            }
            if (headerToggleBtn) {
                headerToggleBtn.title = "Maximize sidebar";
            }
        }

        function toggleSidebar(forcedState = null) {
            if (window.innerWidth <= 768) return;
            const willCollapse = forcedState !== null ? forcedState : !sidebar.classList.contains('collapsed');
            sidebar.classList.toggle('collapsed', willCollapse);
            try {
                localStorage.setItem('pawtrack_sidebar_collapsed', willCollapse ? 'true' : 'false');
            } catch (e) {}

            if (togglePill) {
                togglePill.title = willCollapse ? "Maximize sidebar" : "Minimize sidebar";
                togglePill.setAttribute('aria-label', willCollapse ? "Maximize sidebar" : "Minimize sidebar");
            }
            if (headerToggleBtn) {
                headerToggleBtn.title = willCollapse ? "Maximize sidebar" : "Minimize sidebar";
            }

            // Dispatch resize so charts and spotlight smoothly recalibrate
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 310);
        }

        if (togglePill) {
            togglePill.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSidebar();
            });
        }

        if (headerToggleBtn) {
            headerToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSidebar();
            });
        }

        // Clicking logo when minimized expands back to original form
        if (logoWrapper) {
            logoWrapper.addEventListener('click', () => {
                if (sidebar.classList.contains('collapsed')) {
                    toggleSidebar(false);
                }
            });
        }
    }

    initSidebarToggle();

    // Check on startup
    checkFirstTimeUserTour();

}); 