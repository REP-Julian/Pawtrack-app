import { account, databases } from './appwrite.js';
import { ID, Query } from 'appwrite';

document.addEventListener('DOMContentLoaded', () => {
    
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '=')) {
            event.preventDefault();
        }
    });
    document.addEventListener('wheel', function(event) {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
        }
    }, { passive: false });

    let popupTimer;

    function showFloatingPopup(title, message, isError = false, callback = null) {
        const popupBox = document.getElementById('floatingPopupBox');
        const titleEl = document.getElementById('floatingPopupTitle');
        const messageEl = document.getElementById('floatingPopupMessage');

        if (!popupBox || !titleEl || !messageEl) {
            alert(`${title}: ${message}`);
            if (callback) callback();
            return;
        }

        titleEl.innerText = title;
        messageEl.innerText = message;
        titleEl.className = isError ? 'custom-popup-title title-error' : 'custom-popup-title title-success';
        
        popupBox.style.display = 'block';

        clearTimeout(popupTimer);
        popupTimer = setTimeout(() => { closePopup(callback); }, 5000); 

        const closeBtn = document.getElementById('floatingPopupClose');
        if (closeBtn) {
            closeBtn.onclick = () => {
                clearTimeout(popupTimer);
                closePopup(callback);
            };
        }
    }

    function closePopup(callback) {
        const popupBox = document.getElementById('floatingPopupBox');
        if (popupBox) popupBox.style.display = 'none';
        if (callback) callback(); 
    }

    // 1. LOGIN PAGE: Eye Icon Toggle
    const togglePass = document.getElementById('togglePass');
    const passwordInput = document.getElementById('password');
    if (togglePass && passwordInput) {
        togglePass.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePass.textContent = type === 'password' ? '👁️' : '🔒';
        });
    }

    // 2. CREATE ACCOUNT PAGE: "Show Passwords" Checkbox
    const showPassCheckbox = document.getElementById('showPasswords');
    if (showPassCheckbox) {
        showPassCheckbox.addEventListener('change', function() {
            const passFields = document.querySelectorAll('.pass-field');
            passFields.forEach(input => {
                input.type = this.checked ? 'text' : 'password';
            });
        });
    }

    // 3. CREATE ACCOUNT: Form Submission (Appwrite SDK)
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const inputs = signupForm.querySelectorAll('input:not([type="checkbox"])');
            const passwordFields = signupForm.querySelectorAll('.pass-field');
            
            if (passwordFields.length >= 2 && passwordFields[0].value !== passwordFields[1].value) {
                showFloatingPopup("Error", "Passwords do not match!", true);
                return;
            }

            const lastName = inputs[0]?.value || '';
            const firstName = inputs[1]?.value || '';
            const middleName = inputs[2]?.value || '';
            const contact = inputs[3]?.value || '';
            const email = inputs[4]?.value || '';
            const username = inputs[5]?.value || '';
            const password = passwordFields[0].value;
            const fullName = `${firstName} ${lastName}`.trim();

            if (!email || !password) {
                showFloatingPopup("Error", "Email and Password are required!", true);
                return;
            }

            try {
                // Register user using Appwrite Auth (storing username as primary Auth Name)
                await account.create(
                    ID.unique(),
                    email,
                    password,
                    username || fullName
                );

                // Create initial session to update preferences
                try {
                    await account.createEmailPasswordSession(email, password);
                    await account.updatePrefs({
                        phone: contact,
                        username: username,
                        fullName: fullName,
                        firstName: firstName,
                        lastName: lastName,
                        middleName: middleName,
                        avatarUrl: '/resources/avatar/Avatar 1.jpg'
                    });

                    // Store username->email mapping for login lookup
                    try {
                        const currentUser = await account.get();
                        await databases.createDocument('pawtrack_db', 'user_profiles', currentUser.$id, {
                            username: username,
                            email: email,
                            user_id: currentUser.$id
                        });
                        localStorage.setItem('pawtrack_user_' + username.toLowerCase(), email);
                    } catch(profileErr) {
                        console.warn("Could not save user profile mapping:", profileErr);
                    }
                } catch(sessionErr) {
                    console.warn("Could not set initial session prefs:", sessionErr);
                }

                // Persist activity log directly into Appwrite activity_logs collection
                try {
                    const currentUser = await account.get().catch(() => null);
                    await databases.createDocument('pawtrack_db', 'activity_logs', ID.unique(), {
                        user_id: currentUser ? currentUser.$id : email,
                        action: "Account successfully created",
                        target: `@${username}`,
                        icon: "fa-user-plus",
                        timestamp: Date.now().toString()
                    });
                } catch(logErr) {
                    console.warn("Could not save initial activity log to Appwrite:", logErr);
                }

                showFloatingPopup("Welcome!", "Account created successfully! You will now be redirected to login.", false, () => {
                    window.location.href = '/PawTrackLogin.html'; 
                });
            } catch (error) {
                console.error('Appwrite Register Error:', error);
                showFloatingPopup("Registration Failed", error.message, true);
            }
        });
    }

    // 4. LOGIN: Form Submission (Username or Email via Appwrite)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.removeAttribute('action');
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.setAttribute('type', 'text');
            usernameInput.setAttribute('placeholder', 'Enter your username');
        }

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const usernameVal = document.getElementById('username').value.trim();
            const passwordVal = document.getElementById('password').value;

            if (!usernameVal || !passwordVal) {
                showFloatingPopup("Error", "Username and Password are required!", true);
                return;
            }

            try {
                let loginEmail = usernameVal;
                
                // If it doesn't contain '@', look up email by username in user_profiles
                if (!usernameVal.includes('@')) {
                    let found = false;
                    try {
                        const results = await databases.listDocuments('pawtrack_db', 'user_profiles', [
                            Query.equal('username', usernameVal)
                        ]);
                        if (results.documents.length > 0) {
                            loginEmail = results.documents[0].email;
                            found = true;
                        }
                    } catch (lookupErr) {
                        console.warn("Username lookup failed in user_profiles:", lookupErr);
                    }

                    // Fallback to local cache if offline or network glitch
                    if (!found) {
                        const cachedEmail = localStorage.getItem('pawtrack_user_' + usernameVal.toLowerCase());
                        if (cachedEmail) {
                            loginEmail = cachedEmail;
                            found = true;
                        }
                    }

                    if (!found) {
                        showFloatingPopup("Access Denied", "Username not found. Please check and try again.", true);
                        return;
                    }
                }

                // Login user using Appwrite Auth with resolved email
                await account.createEmailPasswordSession(
                    loginEmail, 
                    passwordVal
                );

                // Cache for fast subsequent logins on this browser
                localStorage.setItem('pawtrack_user_' + usernameVal.toLowerCase(), loginEmail);

                // Persist login activity log directly to Appwrite
                try {
                    const currentUser = await account.get();
                    const displayName = currentUser.prefs?.username || usernameVal;
                    await databases.createDocument('pawtrack_db', 'activity_logs', ID.unique(), {
                        user_id: currentUser.$id,
                        action: `Logged in as @${displayName}`,
                        target: "Authentication successful",
                        icon: "fa-right-to-bracket",
                        timestamp: Date.now().toString()
                    });
                } catch (logErr) {
                    console.warn("Could not write login log to Appwrite:", logErr);
                }

                window.location.href = '/Dashboard.html';
            } catch (error) {
                console.error('Appwrite Login Error:', error);
                showFloatingPopup("Access Denied", error.message || "Invalid username or password!", true);
            }
        });
    }
});