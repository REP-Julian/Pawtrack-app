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

            // Robust field retrieval using IDs with querySelector fallback
            const lastName = (document.getElementById('signupLastName')?.value || inputs[0]?.value || '').trim();
            const firstName = (document.getElementById('signupFirstName')?.value || inputs[1]?.value || '').trim();
            const middleName = (document.getElementById('signupMiddleName')?.value || inputs[2]?.value || '').trim();
            const contact = (document.getElementById('signupContact')?.value || inputs[3]?.value || '').trim();
            const email = (document.getElementById('signupEmail')?.value || inputs[4]?.value || '').trim().toLowerCase();
            const username = (document.getElementById('signupUsername')?.value || inputs[5]?.value || '').trim();
            const password = document.getElementById('signupPassword')?.value || passwordFields[0]?.value || '';
            const repeatPassword = document.getElementById('signupRepeatPassword')?.value || passwordFields[1]?.value || '';
            const fullName = `${firstName} ${lastName}`.trim();

            if (!email || !password || !username) {
                showFloatingPopup("Error", "Username, Email, and Password are required!", true);
                return;
            }

            if (password !== repeatPassword) {
                showFloatingPopup("Error", "Passwords do not match!", true);
                return;
            }

            if (password.length < 8) {
                showFloatingPopup("Error", "Password must be at least 8 characters long!", true);
                return;
            }

            if (username.includes('@')) {
                showFloatingPopup("Error", "Username cannot contain '@'.", true);
                return;
            }

            // Check if user is existing user (by email or username) in user_profiles
            try {
                const existingEmailDoc = await databases.listDocuments('pawtrack_db', 'user_profiles', [
                    Query.equal('email', email)
                ]);
                if (existingEmailDoc.documents.length > 0) {
                    showFloatingPopup("Existing User", "An account with this email address already exists. Please log in instead.", true, () => {
                        window.location.href = '/PawTrackLogin.html';
                    });
                    return;
                }

                const existingUserDoc = await databases.listDocuments('pawtrack_db', 'user_profiles', [
                    Query.equal('username', username.toLowerCase())
                ]);
                if (existingUserDoc.documents.length > 0) {
                    showFloatingPopup("Account Exists", "This username is already taken. If this is your account, please log in.", true, () => {
                        window.location.href = '/PawTrackLogin.html';
                    });
                    return;
                }
            } catch (chkErr) {
                console.warn("User existence pre-check warning:", chkErr);
            }

            try {
                // Clear any lingering session before creating account to prevent conflicts
                try {
                    await account.deleteSession('current');
                } catch (_) {}

                // Register user using Appwrite Auth (storing username as primary Auth Name)
                const newUser = await account.create(
                    ID.unique(),
                    email,
                    password,
                    username || fullName
                );

                // CRITICAL: Immediately record username->email mapping in user_profiles collection
                try {
                    await databases.createDocument('pawtrack_db', 'user_profiles', newUser.$id, {
                        username: username.toLowerCase(),
                        email: email,
                        user_id: newUser.$id
                    });
                } catch(profileErr) {
                    console.warn("Could not save user profile document:", profileErr);
                    // Fallback to random ID if newUser.$id document collision happens
                    try {
                        await databases.createDocument('pawtrack_db', 'user_profiles', ID.unique(), {
                            username: username.toLowerCase(),
                            email: email,
                            user_id: newUser.$id
                        });
                    } catch (retryErr) {
                        console.error("Failed retry user profile creation:", retryErr);
                    }
                }

                // Cache in localStorage for immediate offline/fast resolution
                localStorage.setItem('pawtrack_user_' + username.toLowerCase(), email);
                localStorage.setItem('pawtrack_is_new_user_' + newUser.$id, 'true');
                sessionStorage.setItem('pawtrack_registered_username', username);
                sessionStorage.setItem('pawtrack_just_registered_user', newUser.$id);
                sessionStorage.setItem('pawtrack_is_new_registration', 'true');

                // Temporary session to update user preferences & save initial activity log
                try {
                    await account.createEmailPasswordSession(email, password);
                    await account.updatePrefs({
                        phone: contact,
                        username: username,
                        fullName: fullName,
                        firstName: firstName,
                        lastName: lastName,
                        middleName: middleName,
                        avatarUrl: '/resources/avatar/Avatar 1.jpg',
                        is_new_user: true,
                        tour_completed: false,
                        registered_at: Date.now().toString()
                    });

                    try {
                        await databases.createDocument('pawtrack_db', 'activity_logs', ID.unique(), {
                            user_id: newUser.$id,
                            action: "Account successfully created",
                            target: `@${username}`,
                            icon: "fa-user-plus",
                            timestamp: Date.now().toString()
                        });
                    } catch(logErr) {
                        console.warn("Could not save initial activity log to Appwrite:", logErr);
                    }

                    // Log out of temporary session so the login page has no session conflicts
                    await account.deleteSession('current');
                } catch(sessionErr) {
                    console.warn("Preference update warning:", sessionErr);
                    try { await account.deleteSession('current'); } catch (_) {}
                }

                showFloatingPopup("Welcome!", "Account created successfully! Redirecting to login...", false, () => {
                    window.location.href = '/PawTrackLogin.html'; 
                });
            } catch (error) {
                console.error('Appwrite Register Error:', error);
                if (error.code === 409 || error.type === 'user_already_exists' || (error.message && error.message.toLowerCase().includes('already exists'))) {
                    showFloatingPopup("Existing User", "An account with this email already exists. Please log in instead.", true, () => {
                        window.location.href = '/PawTrackLogin.html';
                    });
                } else {
                    showFloatingPopup("Registration Failed", error.message, true);
                }
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
            usernameInput.setAttribute('placeholder', 'Enter your username or email');

            // Auto-fill username if redirected from registration
            const registeredUser = sessionStorage.getItem('pawtrack_registered_username');
            if (registeredUser) {
                usernameInput.value = registeredUser;
                sessionStorage.removeItem('pawtrack_registered_username');
                const passInput = document.getElementById('password');
                if (passInput) passInput.focus();
            }
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

                    // 1. Query with lowercase username
                    try {
                        const results = await databases.listDocuments('pawtrack_db', 'user_profiles', [
                            Query.equal('username', usernameVal.toLowerCase())
                        ]);
                        if (results.documents.length > 0) {
                            loginEmail = results.documents[0].email;
                            found = true;
                        }
                    } catch (lookupErr) {
                        console.warn("Lowercase username lookup failed in user_profiles:", lookupErr);
                    }

                    // 2. Query with exact username (fallback for legacy records)
                    if (!found) {
                        try {
                            const exactResults = await databases.listDocuments('pawtrack_db', 'user_profiles', [
                                Query.equal('username', usernameVal)
                            ]);
                            if (exactResults.documents.length > 0) {
                                loginEmail = exactResults.documents[0].email;
                                found = true;
                            }
                        } catch (exactErr) {
                            console.warn("Exact username lookup fallback failed:", exactErr);
                        }
                    }

                    // 3. Fallback to local cache
                    if (!found) {
                        const cachedEmail = localStorage.getItem('pawtrack_user_' + usernameVal.toLowerCase());
                        if (cachedEmail) {
                            loginEmail = cachedEmail;
                            found = true;
                        }
                    }

                    if (!found) {
                        showFloatingPopup("Access Denied", "Username not found. Please check your username or login with your email address.", true);
                        return;
                    }
                }

                // CRITICAL: Ensure no lingering active session prevents login
                try {
                    await account.deleteSession('current');
                } catch (_) {}

                // Login user using Appwrite Auth with resolved email
                await account.createEmailPasswordSession(
                    loginEmail.trim().toLowerCase(), 
                    passwordVal
                );

                // Cache for fast subsequent logins on this browser
                localStorage.setItem('pawtrack_user_' + usernameVal.toLowerCase(), loginEmail.trim().toLowerCase());

                // Auto-heal: Ensure user_profiles has a record for this user if missing
                try {
                    const currentUser = await account.get();
                    const profileCheck = await databases.listDocuments('pawtrack_db', 'user_profiles', [
                        Query.equal('user_id', currentUser.$id)
                    ]);
                    if (profileCheck.total === 0) {
                        const profileUsername = (currentUser.prefs?.username || currentUser.name || usernameVal.replace(/@.*/, '')).trim();
                        if (profileUsername) {
                            await databases.createDocument('pawtrack_db', 'user_profiles', currentUser.$id, {
                                username: profileUsername.toLowerCase(),
                                email: currentUser.email.toLowerCase(),
                                user_id: currentUser.$id
                            });
                            localStorage.setItem('pawtrack_user_' + profileUsername.toLowerCase(), currentUser.email.toLowerCase());
                        }
                    }

                    const displayName = currentUser.prefs?.username || currentUser.name || usernameVal;
                    await databases.createDocument('pawtrack_db', 'activity_logs', ID.unique(), {
                        user_id: currentUser.$id,
                        action: `Logged in as @${displayName}`,
                        target: "Authentication successful",
                        icon: "fa-right-to-bracket",
                        timestamp: Date.now().toString()
                    });
                } catch (logErr) {
                    console.warn("Post-login activity/heal warning:", logErr);
                }

                window.location.href = '/Dashboard.html';
            } catch (error) {
                console.error('Appwrite Login Error:', error);
                showFloatingPopup("Access Denied", error.message || "Invalid username or password!", true);
            }
        });
    }
});