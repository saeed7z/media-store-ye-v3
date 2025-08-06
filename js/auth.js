// Authentication System with Multiple Providers

// Auth configuration
const authConfig = {
    facebook: {
        enabled: true,
        appId: 'YOUR_FACEBOOK_APP_ID', // يجب تحديثه مع معرف التطبيق الحقيقي
        name: 'فيسبوك',
        icon: 'fab fa-facebook-f',
        color: '#1877F2'
    },
    google: {
        enabled: true,
        clientId: 'YOUR_GOOGLE_CLIENT_ID', // يجب تحديثه مع معرف العميل الحقيقي
        name: 'جوجل',
        icon: 'fab fa-google',
        color: '#DB4437'
    },
    phone: {
        enabled: true,
        name: 'رقم الهاتف',
        icon: 'fas fa-mobile-alt',
        color: '#28A745'
    }
};

// Current user state
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function() {
    setupAuthForms();
    updateAuthUI();
    setupPhoneAuth();
});

// Setup authentication forms
function setupAuthForms() {
    addSocialLoginButtons();
    setupFormValidation();
    setupCountryPhoneIntegration();
}

// Add social login buttons to forms
function addSocialLoginButtons() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        const socialButtons = createSocialLoginButtons('login');
        loginForm.insertAdjacentHTML('afterbegin', socialButtons);
    }
    
    if (registerForm) {
        const socialButtons = createSocialLoginButtons('register');
        registerForm.insertAdjacentHTML('afterbegin', socialButtons);
    }
}

// Create social login buttons HTML
function createSocialLoginButtons(type) {
    const actionText = type === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب';
    
    return `
        <div class="social-login-section mb-4">
            <h6 class="text-center mb-3">${actionText} باستخدام</h6>
            
            <div class="row g-2 mb-3">
                <div class="col-6">
                    <button type="button" class="btn btn-outline-primary w-100 social-login-btn" 
                            onclick="loginWithFacebook()" 
                            style="border-color: ${authConfig.facebook.color}; color: ${authConfig.facebook.color};">
                        <i class="${authConfig.facebook.icon} me-2"></i>
                        ${authConfig.facebook.name}
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-outline-danger w-100 social-login-btn" 
                            onclick="loginWithGoogle()"
                            style="border-color: ${authConfig.google.color}; color: ${authConfig.google.color};">
                        <i class="${authConfig.google.icon} me-2"></i>
                        ${authConfig.google.name}
                    </button>
                </div>
            </div>
            
            <div class="mb-3">
                <button type="button" class="btn btn-outline-success w-100 social-login-btn" 
                        onclick="togglePhoneAuth()"
                        style="border-color: ${authConfig.phone.color}; color: ${authConfig.phone.color};">
                    <i class="${authConfig.phone.icon} me-2"></i>
                    ${actionText} برقم الهاتف
                </button>
            </div>
            
            <div class="text-center">
                <span class="text-muted">أو</span>
            </div>
            <hr class="mb-4">
        </div>
    `;
}

// Facebook login integration
function loginWithFacebook() {
    // Check if Facebook SDK is loaded
    if (typeof FB === 'undefined') {
        initializeFacebookSDK().then(() => {
            performFacebookLogin();
        });
    } else {
        performFacebookLogin();
    }
}

// Initialize Facebook SDK
function initializeFacebookSDK() {
    return new Promise((resolve) => {
        // Load Facebook SDK
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/ar_AR/sdk.js';
        script.onload = () => {
            FB.init({
                appId: authConfig.facebook.appId,
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });
            resolve();
        };
        document.head.appendChild(script);
    });
}

// Perform Facebook login
function performFacebookLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', {fields: 'name,email,picture'}, function(userData) {
                const user = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    profileImage: userData.picture.data.url,
                    authProvider: 'facebook',
                    isVerified: true
                };
                
                handleSuccessfulAuth(user);
            });
        } else {
            showNotification('تم إلغاء تسجيل الدخول بفيسبوك', 'warning');
        }
    }, {scope: 'email,public_profile'});
}

// Google login integration
function loginWithGoogle() {
    // Check if Google SDK is loaded
    if (typeof google === 'undefined') {
        initializeGoogleSDK().then(() => {
            performGoogleLogin();
        });
    } else {
        performGoogleLogin();
    }
}

// Initialize Google SDK
function initializeGoogleSDK() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
            google.accounts.id.initialize({
                client_id: authConfig.google.clientId,
                callback: handleGoogleResponse
            });
            resolve();
        };
        document.head.appendChild(script);
    });
}

// Perform Google login
function performGoogleLogin() {
    google.accounts.id.prompt();
}

// Handle Google login response
function handleGoogleResponse(response) {
    const userObject = JSON.parse(atob(response.credential.split('.')[1]));
    
    const user = {
        id: userObject.sub,
        name: userObject.name,
        email: userObject.email,
        profileImage: userObject.picture,
        authProvider: 'google',
        isVerified: true
    };
    
    handleSuccessfulAuth(user);
}

// Phone authentication
function togglePhoneAuth() {
    const phoneAuthSection = document.getElementById('phoneAuthSection');
    
    if (!phoneAuthSection) {
        createPhoneAuthSection();
    } else {
        phoneAuthSection.style.display = phoneAuthSection.style.display === 'none' ? 'block' : 'none';
    }
}

// Create phone authentication section
function createPhoneAuthSection() {
    const phoneAuthHTML = `
        <div id="phoneAuthSection" class="phone-auth-section mb-4 p-3 border rounded">
            <h6 class="mb-3">تسجيل الدخول برقم الهاتف</h6>
            
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="authCountryCode" class="form-label">الدولة</label>
                    <select class="form-select country-selector" id="authCountryCode" required>
                        <!-- Will be populated by countries.js -->
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="authPhoneNumber" class="form-label">رقم الهاتف</label>
                    <div class="input-group">
                        <span class="input-group-text" id="authPhoneCodeDisplay">+967</span>
                        <input type="tel" class="form-control" id="authPhoneNumber" 
                               placeholder="123456789" required>
                    </div>
                </div>
            </div>
            
            <div id="otpSection" style="display: none;">
                <div class="mb-3">
                    <label for="otpCode" class="form-label">رمز التحقق</label>
                    <input type="text" class="form-control" id="otpCode" 
                           placeholder="ادخل رمز التحقق المرسل إليك" maxlength="6">
                    <div class="form-text">
                        سيتم إرسال رمز التحقق إلى رقم هاتفك
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-primary" onclick="verifyOTP()">
                        تأكيد الرمز
                    </button>
                    <button type="button" class="btn btn-outline-secondary" onclick="resendOTP()">
                        إعادة إرسال
                    </button>
                </div>
            </div>
            
            <div id="phoneLoginSection">
                <button type="button" class="btn btn-success w-100" onclick="sendOTP()">
                    <i class="fas fa-mobile-alt me-2"></i>
                    إرسال رمز التحقق
                </button>
            </div>
        </div>
    `;
    
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
        authForm.insertAdjacentHTML('beforeend', phoneAuthHTML);
        initializeCountrySelector();
        setupCountryPhoneIntegration();
    }
}

// Setup phone authentication
function setupPhoneAuth() {
    // Initialize country selector for phone auth
    const authCountrySelector = document.getElementById('authCountryCode');
    if (authCountrySelector) {
        authCountrySelector.addEventListener('change', updateAuthPhoneCodeDisplay);
    }
}

// Update phone code display for auth
function updateAuthPhoneCodeDisplay() {
    const countrySelector = document.getElementById('authCountryCode');
    const phoneCodeDisplay = document.getElementById('authPhoneCodeDisplay');
    
    if (countrySelector && phoneCodeDisplay) {
        const selectedOption = countrySelector.options[countrySelector.selectedIndex];
        const phoneCode = selectedOption.dataset.phoneCode || '+967';
        phoneCodeDisplay.textContent = phoneCode;
    }
}

// Send OTP
function sendOTP() {
    const countryCode = document.getElementById('authCountryCode').value;
    const phoneNumber = document.getElementById('authPhoneNumber').value;
    
    if (!phoneNumber) {
        showNotification('يرجى إدخال رقم الهاتف', 'error');
        return;
    }
    
    if (!validatePhoneNumber(phoneNumber, countryCode)) {
        showNotification('رقم الهاتف غير صحيح', 'error');
        return;
    }
    
    // Simulate OTP sending (in real app, this would call backend)
    showNotification('تم إرسال رمز التحقق إلى هاتفك', 'success');
    
    // Show OTP section
    document.getElementById('phoneLoginSection').style.display = 'none';
    document.getElementById('otpSection').style.display = 'block';
    
    // Store phone number for verification
    localStorage.setItem('verificationPhone', formatPhoneNumber(phoneNumber, countryCode));
}

// Verify OTP
function verifyOTP() {
    const otpCode = document.getElementById('otpCode').value;
    
    if (!otpCode || otpCode.length !== 6) {
        showNotification('يرجى إدخال رمز التحقق المكون من 6 أرقام', 'error');
        return;
    }
    
    // Simulate OTP verification (in real app, this would verify with backend)
    const phoneNumber = localStorage.getItem('verificationPhone');
    
    const user = {
        id: 'phone_' + Date.now(),
        name: 'مستخدم ' + phoneNumber.substr(-4),
        phone: phoneNumber,
        authProvider: 'phone',
        isVerified: true
    };
    
    handleSuccessfulAuth(user);
    localStorage.removeItem('verificationPhone');
}

// Resend OTP
function resendOTP() {
    showNotification('تم إعادة إرسال رمز التحقق', 'info');
}

// Handle successful authentication
function handleSuccessfulAuth(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    showNotification(`مرحباً ${user.name}!`, 'success');
    
    // Redirect to appropriate page
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1500);
}

// Update authentication UI
function updateAuthUI() {
    const authButtons = document.querySelectorAll('.auth-nav-items');
    const userNav = document.querySelectorAll('.user-nav-items');
    
    if (currentUser) {
        // User is logged in
        authButtons.forEach(el => el.style.display = 'none');
        userNav.forEach(el => el.style.display = 'block');
        
        // Update user info displays
        const userNameDisplays = document.querySelectorAll('.user-name-display');
        userNameDisplays.forEach(el => el.textContent = currentUser.name);
        
        const userImageDisplays = document.querySelectorAll('.user-image-display');
        userImageDisplays.forEach(el => {
            if (currentUser.profileImage) {
                el.src = currentUser.profileImage;
            }
        });
    } else {
        // User is not logged in
        authButtons.forEach(el => el.style.display = 'block');
        userNav.forEach(el => el.style.display = 'none');
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Clear Facebook session if exists
    if (typeof FB !== 'undefined') {
        FB.logout();
    }
    
    showNotification('تم تسجيل الخروج بنجاح', 'info');
    updateAuthUI();
    
    // Redirect to home if on protected page
    if (window.location.pathname.includes('dashboard')) {
        window.location.href = '../index.html';
    }
}

// Setup form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });
}

// Setup country and phone integration
function setupCountryPhoneIntegration() {
    const countrySelectors = document.querySelectorAll('.country-selector');
    
    countrySelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            updatePhoneCodeDisplay();
            updateAuthPhoneCodeDisplay();
        });
    });
}

// Check if user is authenticated (for protected pages)
function requireAuth() {
    if (!currentUser) {
        showNotification('يجب تسجيل الدخول أولاً', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return false;
    }
    return true;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}