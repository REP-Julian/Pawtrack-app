import { account, databases } from './appwrite.js';
import { ID } from 'appwrite';

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

        titleEl.innerText = title;
        messageEl.innerText = message;
        titleEl.className = isError ? 'custom-popup-title title-error' : 'custom-popup-title title-success';
        
        popupBox.style.display = 'block';

        clearTimeout(popupTimer);
        popupTimer = setTimeout(() => { closePopup(callback); }, 5000); 

        document.getElementById('floatingPopupClose').onclick = () => {
            clearTimeout(popupTimer);
            closePopup(callback);
        };
    }

    function closePopup(callback) {
        document.getElementById('floatingPopupBox').style.display = 'none';
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
    const defaultAvatars = [
        "/resources/avatar/Avatar 1.jpg",
        "/resources/avatar/Avatar 2.jpg",
        "/resources/avatar/Avatar 3.jpg",
        "/resources/avatar/Avatar 4.jpg",
        "/resources/avatar/Avatar 5.jpg",
        "/resources/avatar/Avatar 6.jpg",
        "/resources/avatar/Avatar 7.jpg"
    ];

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const inputs = signupForm.querySelectorAll('input:not([type="checkbox"])');
            const passwordFields = signupForm.querySelectorAll('.pass-field');
            
            if (passwordFields[0].value !== passwordFields[1].value) {
                showFloatingPopup("Error", "Passwords do not match!", true);
                return;
            }

            const email = inputs[4].value;
            const password = passwordFields[0].value;
            const firstName = inputs[1].value;
            const lastName = inputs[0].value;
            const name = `${firstName} ${lastName}`;

            try {
                // Register user using Appwrite Auth
                const response = await account.create(
                    ID.unique(),
                    email,
                    password,
                    name
                );

                const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
                const assignedAvatar = defaultAvatars[randomIndex];
                localStorage.setItem("userAvatar", assignedAvatar);

                const createdUsername = email;
                let regLogs = JSON.parse(localStorage.getItem('pawtrack_logs_' + createdUsername)) || [];
                regLogs.unshift({
                    action: "Account successfully created",
                    target: "Welcome to PawTrack!",
                    icon: "fa-user-plus",
                    timestamp: Date.now()
                });
                localStorage.setItem('pawtrack_logs_' + createdUsername, JSON.stringify(regLogs));

                showFloatingPopup("Welcome!", "Account created successfully! You will now be redirected to login.", false, () => {
                    window.location.href = '/PawTrackLogin.html'; 
                });
            } catch (error) {
                console.error('Appwrite Register Error:', error);
                showFloatingPopup("Registration Failed", error.message, true);
            }
        });
    }

    // 4. LOGIN: Form Submission (Appwrite SDK)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.removeAttribute('action');
        // change label from USERNAME to EMAIL
        const label = loginForm.querySelector('label');
        if(label && label.innerText.includes('USERNAME')) {
            label.innerText = 'EMAIL:';
            document.getElementById('username').setAttribute('type', 'email');
        }

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const emailVal = document.getElementById('username').value; // Using email instead of username for Appwrite
            const passwordVal = document.getElementById('password').value;

            try {
                // Login user using Appwrite Auth
                const session = await account.createEmailPasswordSession(
                    emailVal, 
                    passwordVal
                );

                let loginLogs = JSON.parse(localStorage.getItem('pawtrack_logs_' + emailVal)) || [];
                loginLogs.unshift({
                    action: "Logged into account",
                    target: "Authentication successful",
                    icon: "fa-right-to-bracket",
                    timestamp: Date.now()
                });
                localStorage.setItem('pawtrack_logs_' + emailVal, JSON.stringify(loginLogs));

                window.location.href = '/Dashboard.html';
            } catch (error) {
                console.error('Appwrite Login Error:', error);
                showFloatingPopup("Access Denied", error.message || "Invalid email or password!", true);
            }
        });
    }
});