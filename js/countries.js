// Arab Countries Data with Phone Codes

const arabCountries = [
    { code: 'YE', name: 'اليمن', phoneCode: '+967', flag: '🇾🇪' },
    { code: 'SA', name: 'السعودية', phoneCode: '+966', flag: '🇸🇦' },
    { code: 'AE', name: 'الإمارات', phoneCode: '+971', flag: '🇦🇪' },
    { code: 'QA', name: 'قطر', phoneCode: '+974', flag: '🇶🇦' },
    { code: 'KW', name: 'الكويت', phoneCode: '+965', flag: '🇰🇼' },
    { code: 'BH', name: 'البحرين', phoneCode: '+973', flag: '🇧🇭' },
    { code: 'OM', name: 'عمان', phoneCode: '+968', flag: '🇴🇲' },
    { code: 'JO', name: 'الأردن', phoneCode: '+962', flag: '🇯🇴' },
    { code: 'LB', name: 'لبنان', phoneCode: '+961', flag: '🇱🇧' },
    { code: 'SY', name: 'سوريا', phoneCode: '+963', flag: '🇸🇾' },
    { code: 'IQ', name: 'العراق', phoneCode: '+964', flag: '🇮🇶' },
    { code: 'EG', name: 'مصر', phoneCode: '+20', flag: '🇪🇬' },
    { code: 'LY', name: 'ليبيا', phoneCode: '+218', flag: '🇱🇾' },
    { code: 'TN', name: 'تونس', phoneCode: '+216', flag: '🇹🇳' },
    { code: 'DZ', name: 'الجزائر', phoneCode: '+213', flag: '🇩🇿' },
    { code: 'MA', name: 'المغرب', phoneCode: '+212', flag: '🇲🇦' },
    { code: 'SD', name: 'السودان', phoneCode: '+249', flag: '🇸🇩' },
    { code: 'SO', name: 'الصومال', phoneCode: '+252', flag: '🇸🇴' },
    { code: 'DJ', name: 'جيبوتي', phoneCode: '+253', flag: '🇩🇯' },
    { code: 'KM', name: 'جزر القمر', phoneCode: '+269', flag: '🇰🇲' },
    { code: 'MR', name: 'موريتانيا', phoneCode: '+222', flag: '🇲🇷' },
    { code: 'PS', name: 'فلسطين', phoneCode: '+970', flag: '🇵🇸' }
];

// Initialize country selector
function initializeCountrySelector() {
    const countrySelectors = document.querySelectorAll('.country-selector');
    
    countrySelectors.forEach(selector => {
        // Clear existing options
        selector.innerHTML = '';
        
        // Add countries with Yemen first
        arabCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.flag} ${country.name} (${country.phoneCode})`;
            option.dataset.phoneCode = country.phoneCode;
            
            // Select Yemen by default
            if (country.code === 'YE') {
                option.selected = true;
            }
            
            selector.appendChild(option);
        });
    });
}

// Get country info by code
function getCountryInfo(countryCode) {
    return arabCountries.find(country => country.code === countryCode);
}

// Get phone code by country code
function getPhoneCode(countryCode) {
    const country = getCountryInfo(countryCode);
    return country ? country.phoneCode : '+967';
}

// Update phone code display when country changes
function updatePhoneCodeDisplay() {
    const countrySelector = document.getElementById('countryCode');
    const phoneCodeDisplay = document.getElementById('phoneCodeDisplay');
    
    if (countrySelector && phoneCodeDisplay) {
        const selectedOption = countrySelector.options[countrySelector.selectedIndex];
        const phoneCode = selectedOption.dataset.phoneCode || '+967';
        phoneCodeDisplay.textContent = phoneCode;
    }
}

// Validate phone number format
function validatePhoneNumber(phoneNumber, countryCode) {
    // Remove any non-digit characters except +
    const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
    
    // Basic validation - check if it's not empty and has reasonable length
    if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
        return false;
    }
    
    // Country-specific validation can be added here
    switch (countryCode) {
        case 'YE': // Yemen
            return cleanPhone.length >= 9 && cleanPhone.length <= 9;
        case 'SA': // Saudi Arabia
            return cleanPhone.length >= 9 && cleanPhone.length <= 9;
        case 'AE': // UAE
            return cleanPhone.length >= 9 && cleanPhone.length <= 9;
        default:
            return cleanPhone.length >= 7 && cleanPhone.length <= 15;
    }
}

// Format phone number with country code
function formatPhoneNumber(phoneNumber, countryCode) {
    const phoneCode = getPhoneCode(countryCode);
    const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
    
    // If phone already starts with country code, return as is
    if (phoneNumber.startsWith(phoneCode)) {
        return phoneNumber;
    }
    
    // If phone starts with 0, remove it
    const finalPhone = cleanPhone.startsWith('0') ? cleanPhone.substring(1) : cleanPhone;
    
    return `${phoneCode}${finalPhone}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCountrySelector();
    
    // Add event listeners for country selector changes
    const countrySelectors = document.querySelectorAll('.country-selector');
    countrySelectors.forEach(selector => {
        selector.addEventListener('change', updatePhoneCodeDisplay);
    });
    
    // Initial phone code display update
    updatePhoneCodeDisplay();
});