// Cart and Order Management JavaScript

// Cart state
let cart = {
    items: [],
    total: 0
};

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartDisplay();
    setupCartEventListeners();
    
    // Load selected service if coming from services page
    loadSelectedService();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('smmCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('smmCart', JSON.stringify(cart));
}

// Load selected service from services page
function loadSelectedService() {
    const selectedService = localStorage.getItem('selectedService');
    
    if (selectedService && window.location.pathname.includes('order.html')) {
        const service = JSON.parse(selectedService);
        
        // Pre-fill order form
        const platformSelect = document.getElementById('platform');
        const serviceTypeSelect = document.getElementById('serviceType');
        const quantityInput = document.getElementById('quantity');
        
        if (platformSelect) {
            platformSelect.value = service.platform;
            
            // Trigger change event to populate services
            const event = new Event('change');
            platformSelect.dispatchEvent(event);
            
            setTimeout(() => {
                if (serviceTypeSelect) {
                    serviceTypeSelect.value = service.serviceId;
                    serviceTypeSelect.dispatchEvent(event);
                }
                
                if (quantityInput) {
                    quantityInput.value = service.minOrder;
                    quantityInput.dispatchEvent(new Event('input'));
                }
            }, 100);
        }
        
        // Clear the selected service
        localStorage.removeItem('selectedService');
    }
}

// Setup cart event listeners
function setupCartEventListeners() {
    // Add event listeners for cart-related buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-to-cart')) {
            const packageType = e.target.getAttribute('data-package');
            addPackageToCart(packageType);
        }
        
        if (e.target.matches('.remove-from-cart')) {
            const itemId = e.target.getAttribute('data-item-id');
            removeFromCart(itemId);
        }
        
        if (e.target.matches('.clear-cart')) {
            clearCart();
        }
        
        if (e.target.matches('.checkout-btn')) {
            proceedToCheckout();
        }
    });
    
    // Update quantity listeners
    document.addEventListener('input', function(e) {
        if (e.target.matches('.cart-quantity')) {
            const itemId = e.target.getAttribute('data-item-id');
            const newQuantity = parseInt(e.target.value);
            updateCartItemQuantity(itemId, newQuantity);
        }
    });
}

// Add package to cart
function addPackageToCart(packageType) {
    const packages = {
        starter: {
            id: 'starter_package',
            name: 'باقة البداية',
            description: '1000 متابع انستقرام + 500 لايك',
            price: 25,
            platform: 'instagram',
            services: [
                { type: 'followers', quantity: 1000 },
                { type: 'likes', quantity: 500 }
            ]
        },
        professional: {
            id: 'professional_package',
            name: 'باقة الاحتراف',
            description: '5000 متابع انستقرام + 2000 لايك + 500 تعليق',
            price: 45,
            platform: 'instagram',
            services: [
                { type: 'followers', quantity: 5000 },
                { type: 'likes', quantity: 2000 },
                { type: 'comments', quantity: 500 }
            ]
        },
        enterprise: {
            id: 'enterprise_package',
            name: 'باقة المؤسسات',
            description: '20000 متابع + 10000 لايك + 2000 تعليق',
            price: 120,
            platform: 'instagram',
            services: [
                { type: 'followers', quantity: 20000 },
                { type: 'likes', quantity: 10000 },
                { type: 'comments', quantity: 2000 }
            ]
        }
    };
    
    const packageData = packages[packageType];
    if (!packageData) return;
    
    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.id === packageData.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
        cart.items.push({
            id: packageData.id,
            name: packageData.name,
            description: packageData.description,
            price: packageData.price,
            quantity: 1,
            subtotal: packageData.price,
            type: 'package',
            platform: packageData.platform,
            services: packageData.services
        });
    }
    
    updateCartTotal();
    saveCart();
    updateCartDisplay();
    
    // Show success message
    if (typeof SMM !== 'undefined' && SMM.showAlert) {
        SMM.showAlert('تم إضافة الباقة إلى السلة بنجاح!', 'success');
    }
}

// Add custom service to cart
function addServiceToCart(serviceData) {
    const itemId = `service_${serviceData.platform}_${serviceData.serviceId}_${Date.now()}`;
    
    cart.items.push({
        id: itemId,
        name: serviceData.serviceName,
        description: `${serviceData.platformName} - ${serviceData.quantity} وحدة`,
        price: serviceData.totalPrice,
        quantity: 1,
        subtotal: serviceData.totalPrice,
        type: 'service',
        platform: serviceData.platform,
        serviceId: serviceData.serviceId,
        serviceQuantity: serviceData.quantity,
        profileLink: serviceData.profileLink
    });
    
    updateCartTotal();
    saveCart();
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(itemId) {
    cart.items = cart.items.filter(item => item.id !== itemId);
    updateCartTotal();
    saveCart();
    updateCartDisplay();
    
    if (typeof SMM !== 'undefined' && SMM.showAlert) {
        SMM.showAlert('تم إزالة العنصر من السلة', 'info');
    }
}

// Update cart item quantity
function updateCartItemQuantity(itemId, newQuantity) {
    const item = cart.items.find(item => item.id === itemId);
    
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        item.subtotal = item.quantity * item.price;
        
        updateCartTotal();
        saveCart();
        updateCartDisplay();
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('هل أنت متأكد من حذف جميع العناصر من السلة؟')) {
        cart.items = [];
        cart.total = 0;
        saveCart();
        updateCartDisplay();
        
        if (typeof SMM !== 'undefined' && SMM.showAlert) {
            SMM.showAlert('تم مسح السلة بنجاح', 'info');
        }
    }
}

// Update cart total
function updateCartTotal() {
    cart.total = cart.items.reduce((total, item) => total + item.subtotal, 0);
}

// Update cart display
function updateCartDisplay() {
    updateCartBadge();
    updateCartSummary();
    updateCartModal();
}

// Update cart badge in navigation
function updateCartBadge() {
    const cartBadges = document.querySelectorAll('.cart-badge');
    const itemCount = cart.items.length;
    
    cartBadges.forEach(badge => {
        if (itemCount > 0) {
            badge.textContent = itemCount;
            badge.style.display = 'inline';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Update cart summary
function updateCartSummary() {
    const cartSummary = document.getElementById('cartSummary');
    if (!cartSummary) return;
    
    if (cart.items.length === 0) {
        cartSummary.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">السلة فارغة</h5>
                <p class="text-muted">أضف بعض الخدمات أو الباقات للمتابعة</p>
                <a href="services.html" class="btn btn-primary">تصفح الخدمات</a>
            </div>
        `;
        return;
    }
    
    let summaryHTML = `
        <div class="cart-items">
            ${cart.items.map(item => `
                <div class="cart-item border rounded p-3 mb-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${item.name}</h6>
                            <p class="text-muted small mb-2">${item.description}</p>
                            <div class="d-flex align-items-center">
                                <label class="form-label me-2 mb-0">الكمية:</label>
                                <input type="number" class="form-control form-control-sm cart-quantity" 
                                       style="width: 80px;" value="${item.quantity}" min="1" 
                                       data-item-id="${item.id}">
                            </div>
                        </div>
                        <div class="text-end">
                            <p class="mb-1 fw-bold">${item.subtotal.toFixed(2)} ر.س</p>
                            <small class="text-muted">${item.price.toFixed(2)} ر.س × ${item.quantity}</small>
                            <br>
                            <button class="btn btn-outline-danger btn-sm mt-2 remove-from-cart" 
                                    data-item-id="${item.id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-total border-top pt-3">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">الإجمالي:</h5>
                <h5 class="mb-0 text-primary">${cart.total.toFixed(2)} ر.س</h5>
            </div>
        </div>
        
        <div class="cart-actions mt-3">
            <div class="d-grid gap-2">
                <button class="btn btn-primary btn-lg checkout-btn">
                    <i class="fas fa-credit-card me-2"></i>متابعة الدفع
                </button>
                <button class="btn btn-outline-secondary clear-cart">
                    <i class="fas fa-trash-alt me-2"></i>مسح السلة
                </button>
            </div>
        </div>
    `;
    
    cartSummary.innerHTML = summaryHTML;
}

// Update cart modal
function updateCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (!cartModal) return;
    
    const modalBody = cartModal.querySelector('.modal-body');
    if (!modalBody) return;
    
    if (cart.items.length === 0) {
        modalBody.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h6 class="text-muted">السلة فارغة</h6>
                <p class="text-muted small">لم تقم بإضافة أي عناصر بعد</p>
            </div>
        `;
        return;
    }
    
    modalBody.innerHTML = `
        <div class="cart-items">
            ${cart.items.map(item => `
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">${item.quantity} × ${item.price.toFixed(2)} ر.س</small>
                    </div>
                    <div class="text-end">
                        <span class="fw-bold">${item.subtotal.toFixed(2)} ر.س</span>
                        <br>
                        <button class="btn btn-outline-danger btn-sm remove-from-cart" 
                                data-item-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-total pt-3 mt-3 border-top">
            <div class="d-flex justify-content-between align-items-center">
                <h5>الإجمالي:</h5>
                <h5 class="text-primary">${cart.total.toFixed(2)} ر.س</h5>
            </div>
        </div>
    `;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.items.length === 0) {
        if (typeof SMM !== 'undefined' && SMM.showAlert) {
            SMM.showAlert('السلة فارغة! أضف بعض الخدمات أولاً', 'warning');
        }
        return;
    }
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.email) {
        if (typeof SMM !== 'undefined' && SMM.showAlert) {
            SMM.showAlert('يجب تسجيل الدخول أولاً للمتابعة', 'warning');
        }
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'pages/login.html';
        }, 1500);
        return;
    }
    
    // Process orders
    processCartOrders();
}

// Process cart orders
function processCartOrders() {
    const orders = cart.items.map(item => ({
        id: 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5),
        platform: item.platform || 'mixed',
        service: item.name,
        serviceType: item.serviceId || item.type,
        quantity: item.serviceQuantity || item.quantity,
        total: item.subtotal.toFixed(2),
        status: 'pending',
        date: new Date().toISOString(),
        profileLink: item.profileLink || '',
        userEmail: JSON.parse(localStorage.getItem('user')).email,
        type: item.type,
        services: item.services || []
    }));
    
    // Save orders to localStorage
    let existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    existingOrders = existingOrders.concat(orders);
    localStorage.setItem('userOrders', JSON.stringify(existingOrders));
    
    // Clear cart
    cart.items = [];
    cart.total = 0;
    saveCart();
    updateCartDisplay();
    
    // Show success message
    if (typeof SMM !== 'undefined' && SMM.showAlert) {
        SMM.showAlert(`تم إرسال ${orders.length} طلب بنجاح!`, 'success');
    }
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'pages/dashboard.html';
    }, 2000);
}

// Get cart summary
function getCartSummary() {
    return {
        itemCount: cart.items.length,
        total: cart.total,
        items: cart.items
    };
}

// Add to cart from package buttons (used in index.html)
function addToCart(packageType) {
    addPackageToCart(packageType);
}

// Export cart functions
window.CartManager = {
    addPackageToCart,
    addServiceToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    proceedToCheckout,
    getCartSummary,
    addToCart
};

// Make addToCart globally available
window.addToCart = addToCart;
