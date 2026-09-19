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
        popupTimer = setTimeout(() => { closePopup(callback); }, 5000); // 5 sec timer

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

    // 3. CREATE ACCOUNT: Form Submission & API Fetch
    const defaultAvatars = [
        "/static/resources/avatar/Avatar 1.jpg",
        "/static/resources/avatar/Avatar 2.jpg",
        "/static/resources/avatar/Avatar 3.jpg",
        "/static/resources/avatar/Avatar 4.jpg",
        "/static/resources/avatar/Avatar 5.jpg",
        "/static/resources/avatar/Avatar 6.jpg",
        "/static/resources/avatar/Avatar 7.jpg"
    ];

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const inputs = signupForm.querySelectorAll('input:not([type="checkbox"])');
            const passwordFields = signupForm.querySelectorAll('.pass-field');
            
            if (passwordFields[0].value !== passwordFields[1].value) {
                showFloatingPopup("Error", "Passwords do not match!", true);
                return;
            }

            const newUserData = {
                last_name: inputs[0].value,
                first_name: inputs[1].value,
                contact_number: inputs[3].value,
                email: inputs[4].value,     
                username: inputs[5].value,  
                password: passwordFields[0].value
            };

            fetch('/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
                    const assignedAvatar = defaultAvatars[randomIndex];
                    localStorage.setItem("userAvatar", assignedAvatar);

                    // --- NEW: LOG ACCOUNT CREATION ---
                    const createdUsername = newUserData.username;
                    let regLogs = JSON.parse(localStorage.getItem('pawtrack_logs_' + createdUsername)) || [];
                    regLogs.unshift({
                        action: "Account successfully created",
                        target: "Welcome to PawTrack!",
                        icon: "fa-user-plus",
                        timestamp: Date.now()
                    });
                    localStorage.setItem('pawtrack_logs_' + createdUsername, JSON.stringify(regLogs));
                    // ---------------------------------

                    showFloatingPopup("Welcome!", data.message + " You will now be redirected to login.", false, () => {
                        window.location.href = '/login/'; 
                    });
                } else {
                    showFloatingPopup("Registration Failed", data.message, true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFloatingPopup("Connection Failed", "Server connection failed.", true);
            });
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.removeAttribute('action');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const usernameVal = document.getElementById('username').value;
            const passwordVal = document.getElementById('password').value;

            fetch('/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usernameVal, password: passwordVal })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // --- NEW: LOG LOGIN EVENT ---
                    let loginLogs = JSON.parse(localStorage.getItem('pawtrack_logs_' + usernameVal)) || [];
                    loginLogs.unshift({
                        action: "Logged into account",
                        target: "Authentication successful",
                        icon: "fa-right-to-bracket",
                        timestamp: Date.now()
                    });
                    localStorage.setItem('pawtrack_logs_' + usernameVal, JSON.stringify(loginLogs));
                    // ----------------------------

                    window.location.href = '/dashboard/';
                } else {
                    showFloatingPopup("Access Denied", data.message, true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFloatingPopup("Connection Failed", "Server connection failed.", true);
            });
        });
    }
});