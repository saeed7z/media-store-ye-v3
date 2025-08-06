// Currency Management System

// Currency configuration with exchange rates (base: USD)
const currencyConfig = {
    USD: {
        name: 'دولار أمريكي',
        symbol: '$',
        rate: 1.0, // Base currency
        code: 'USD'
    },
    SAR: {
        name: 'ريال سعودي',
        symbol: 'ر.س',
        rate: 3.75, // 1 USD = 3.75 SAR
        code: 'SAR'
    },
    YER: {
        name: 'ريال يمني',
        symbol: 'ر.ي',
        rate: 250, // 1 USD = 250 YER (approximate)
        code: 'YER'
    }
};

// Current selected currency
let currentCurrency = 'SAR'; // Default to Saudi Riyal

// Initialize currency system
document.addEventListener('DOMContentLoaded', function() {
    initializeCurrency();
    setupCurrencySelector();
    loadSavedCurrency();
});

// Initialize currency system
function initializeCurrency() {
    // Load saved currency preference
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && currencyConfig[savedCurrency]) {
        currentCurrency = savedCurrency;
    }
    
    // Update all prices on page load
    updateAllPrices();
    updateCurrencyDisplay();
}

// Setup currency selector
function setupCurrencySelector() {
    // Create currency selector if it doesn't exist
    createCurrencySelector();
    
    // Add event listeners for currency change
    const currencySelectors = document.querySelectorAll('.currency-selector');
    currencySelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            changeCurrency(this.value);
        });
    });
}

// Create currency selector HTML
function createCurrencySelector() {
    const selectorHTML = `
        <div class="currency-selector-wrapper">
            <label for="currencySelector" class="form-label">
                <i class="fas fa-money-bill-wave me-1"></i>
                العملة
            </label>
            <select class="form-select currency-selector" id="currencySelector">
                <option value="SAR" ${currentCurrency === 'SAR' ? 'selected' : ''}>
                    ${currencyConfig.SAR.symbol} - ${currencyConfig.SAR.name}
                </option>
                <option value="YER" ${currentCurrency === 'YER' ? 'selected' : ''}>
                    ${currencyConfig.YER.symbol} - ${currencyConfig.YER.name}
                </option>
                <option value="USD" ${currentCurrency === 'USD' ? 'selected' : ''}>
                    ${currencyConfig.USD.symbol} - ${currencyConfig.USD.name}
                </option>
            </select>
        </div>
    `;
    
    // Add to navigation bar if exists
    const navbar = document.querySelector('.navbar .container');
    if (navbar && !document.querySelector('.currency-selector-wrapper')) {
        const currencyDiv = document.createElement('div');
        currencyDiv.className = 'currency-selector-nav d-none d-lg-block me-3';
        currencyDiv.innerHTML = selectorHTML;
        
        // Insert before the user menu
        const userMenu = navbar.querySelector('.navbar-nav:last-child');
        if (userMenu) {
            userMenu.parentNode.insertBefore(currencyDiv, userMenu);
        }
    }
    
    // Add to order form if exists
    const orderForm = document.getElementById('orderForm');
    if (orderForm && !orderForm.querySelector('.currency-selector-wrapper')) {
        const totalSection = orderForm.querySelector('.order-total') || orderForm.querySelector('.form-group:last-child');
        if (totalSection) {
            const currencyDiv = document.createElement('div');
            currencyDiv.className = 'col-md-6 mb-3';
            currencyDiv.innerHTML = selectorHTML;
            
            // Insert before total section
            totalSection.parentNode.insertBefore(currencyDiv, totalSection);
        }
    }
    
    // Add to cart if exists
    const cartSummary = document.getElementById('cartSummary');
    if (cartSummary && !document.querySelector('.cart-currency-selector')) {
        const currencyDiv = document.createElement('div');
        currencyDiv.className = 'cart-currency-selector mb-3 p-3 bg-light rounded';
        currencyDiv.innerHTML = selectorHTML;
        
        // Insert at the beginning of cart summary
        cartSummary.insertBefore(currencyDiv, cartSummary.firstChild);
    }
}

// Change currency
function changeCurrency(newCurrency) {
    if (!currencyConfig[newCurrency]) {
        console.error('Invalid currency:', newCurrency);
        return;
    }
    
    currentCurrency = newCurrency;
    
    // Save preference
    localStorage.setItem('selectedCurrency', newCurrency);
    
    // Update all currency selectors
    const selectors = document.querySelectorAll('.currency-selector');
    selectors.forEach(selector => {
        selector.value = newCurrency;
    });
    
    // Update all prices
    updateAllPrices();
    updateCurrencyDisplay();
    
    // Show notification
    showCurrencyChangeNotification(currencyConfig[newCurrency].name);
}

// Load saved currency preference
function loadSavedCurrency() {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency && currencyConfig[savedCurrency]) {
        currentCurrency = savedCurrency;
        
        // Update selectors
        const selectors = document.querySelectorAll('.currency-selector');
        selectors.forEach(selector => {
            selector.value = savedCurrency;
        });
    }
}

// Convert price from USD to selected currency
function convertPrice(usdPrice) {
    const rate = currencyConfig[currentCurrency].rate;
    const convertedPrice = usdPrice * rate;
    
    // Round based on currency
    if (currentCurrency === 'YER') {
        return Math.round(convertedPrice); // No decimals for YER
    } else {
        return Math.round(convertedPrice * 100) / 100; // 2 decimal places
    }
}

// Format price with currency symbol
function formatPrice(price, currencyCode = null) {
    const currency = currencyCode ? currencyConfig[currencyCode] : currencyConfig[currentCurrency];
    const convertedPrice = currencyCode ? price : convertPrice(price);
    
    if (currency.code === 'YER') {
        return `${convertedPrice.toLocaleString('ar-SA')} ${currency.symbol}`;
    } else {
        return `${convertedPrice.toFixed(2)} ${currency.symbol}`;
    }
}

// Update all prices on the page
function updateAllPrices() {
    // Update service prices
    const servicePrices = document.querySelectorAll('[data-price]');
    servicePrices.forEach(element => {
        const basePrice = parseFloat(element.dataset.price);
        if (!isNaN(basePrice)) {
            element.textContent = formatPrice(basePrice);
        }
    });
    
    // Update package prices
    const packagePrices = document.querySelectorAll('[data-package-price]');
    packagePrices.forEach(element => {
        const basePrice = parseFloat(element.dataset.packagePrice);
        if (!isNaN(basePrice)) {
            element.textContent = formatPrice(basePrice);
        }
    });
    
    // Update order total
    const totalPriceInputs = document.querySelectorAll('#totalPrice');
    totalPriceInputs.forEach(input => {
        const basePrice = parseFloat(input.dataset.basePrice || input.value);
        if (!isNaN(basePrice)) {
            const convertedPrice = convertPrice(basePrice);
            input.value = currentCurrency === 'YER' ? convertedPrice.toString() : convertedPrice.toFixed(2);
        }
    });
    
    // Update cart prices
    updateCartPrices();
    
    // Update dashboard order prices
    updateDashboardPrices();
}

// Update cart prices
function updateCartPrices() {
    if (typeof cart !== 'undefined' && cart.items) {
        cart.items.forEach(item => {
            // Update item prices if they have base price data
            if (item.basePriceUSD) {
                item.price = convertPrice(item.basePriceUSD);
                item.subtotal = item.price * item.quantity;
            }
        });
        
        // Update cart total
        if (typeof updateCartTotal === 'function') {
            updateCartTotal();
        }
        
        // Update cart display
        if (typeof updateCartDisplay === 'function') {
            updateCartDisplay();
        }
    }
}

// Update dashboard prices
function updateDashboardPrices() {
    const orderPrices = document.querySelectorAll('[data-order-price]');
    orderPrices.forEach(element => {
        const basePrice = parseFloat(element.dataset.orderPrice);
        if (!isNaN(basePrice)) {
            element.textContent = formatPrice(basePrice);
        }
    });
}

// Update currency display throughout the site
function updateCurrencyDisplay() {
    // Update currency symbols in text
    const currencyTexts = document.querySelectorAll('.currency-text');
    currencyTexts.forEach(element => {
        element.textContent = currencyConfig[currentCurrency].symbol;
    });
    
    // Update currency labels
    const currencyLabels = document.querySelectorAll('.currency-label');
    currencyLabels.forEach(element => {
        element.textContent = currencyConfig[currentCurrency].name;
    });
}

// Show currency change notification
function showCurrencyChangeNotification(currencyName) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        تم تغيير العملة إلى ${currencyName}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Get current currency info
function getCurrentCurrency() {
    return {
        code: currentCurrency,
        name: currencyConfig[currentCurrency].name,
        symbol: currencyConfig[currentCurrency].symbol,
        rate: currencyConfig[currentCurrency].rate
    };
}

// Get all available currencies
function getAvailableCurrencies() {
    return Object.keys(currencyConfig).map(code => ({
        code: code,
        name: currencyConfig[code].name,
        symbol: currencyConfig[code].symbol
    }));
}

// Export functions
window.CurrencyManager = {
    convertPrice,
    formatPrice,
    changeCurrency,
    getCurrentCurrency,
    getAvailableCurrencies,
    updateAllPrices
};

// Make functions globally available
window.convertPrice = convertPrice;
window.formatPrice = formatPrice;
window.changeCurrency = changeCurrency;