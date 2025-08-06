// SMM Panel Main JavaScript Functions

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkUserAuth();
    setupEventListeners();
});

// Application initialization
function initializeApp() {
    console.log('SMM Panel initialized');
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Setup form validation
    setupFormValidation();
    
    // Initialize counters and animations
    initializeCounters();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
}

// Check user authentication status
function checkUserAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const currentPage = window.location.pathname;
    
    // Update navigation based on auth status
    updateNavigation(user);
    
    // Redirect to login if accessing protected pages without auth
    if (currentPage.includes('dashboard.html') && !user.email) {
        window.location.href = 'login.html';
    }
}

// Update navigation based on user authentication
function updateNavigation(user) {
    const loginLink = document.querySelector('a[href*="login.html"]');
    const registerLink = document.querySelector('a[href*="register.html"]');
    
    if (user.email && loginLink && registerLink) {
        // User is logged in, show user menu
        const userMenu = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user-circle me-2"></i>${user.name || 'المستخدم'}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="pages/dashboard.html"><i class="fas fa-tachometer-alt me-2"></i>لوحة التحكم</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>تسجيل الخروج</a></li>
                </ul>
            </li>
        `;
        
        loginLink.parentElement.style.display = 'none';
        registerLink.parentElement.outerHTML = userMenu;
    }
}

// Setup global event listeners
function setupEventListeners() {
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
    
    // Handle order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
        setupOrderFormDynamics();
    }
    
    // Handle track order form
    const trackForm = document.getElementById('trackForm');
    if (trackForm) {
        trackForm.addEventListener('submit', handleTrackOrder);
    }
    
    // Handle newsletter subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubscription);
    }
}

// Setup form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// Initialize counters and animations
function initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
}

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        element.textContent = Math.floor(current).toLocaleString('ar-SA');
        
        if (current >= target) {
            element.textContent = target.toLocaleString('ar-SA');
            clearInterval(timer);
        }
    }, 16);
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle contact form submission
function handleContactSubmission(event) {
    event.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        orderNumber: document.getElementById('orderNumber').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (in a real app, send to server)
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(formData);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    showAlert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
    event.target.reset();
}

// Handle order form submission
function handleOrderSubmission(event) {
    event.preventDefault();
    
    const orderData = {
        id: 'ORD' + Date.now(),
        platform: document.getElementById('platform').value,
        serviceType: document.getElementById('serviceType').value,
        profileLink: document.getElementById('profileLink').value,
        quantity: parseInt(document.getElementById('quantity').value),
        userEmail: document.getElementById('userEmail').value,
        notes: document.getElementById('notes').value,
        total: document.getElementById('totalPrice').value,
        status: 'pending',
        date: new Date().toISOString(),
        estimated_delivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    orders.push(orderData);
    localStorage.setItem('userOrders', JSON.stringify(orders));
    
    showAlert(`تم إرسال طلبك بنجاح! رقم الطلب: ${orderData.id}`, 'success');
    
    // Redirect to dashboard or track page
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

// Setup order form dynamics
function setupOrderFormDynamics() {
    const platformSelect = document.getElementById('platform');
    const serviceSelect = document.getElementById('serviceType');
    const quantityInput = document.getElementById('quantity');
    const totalPriceInput = document.getElementById('totalPrice');
    
    if (!platformSelect || !serviceSelect) return;
    
    // Platform change handler
    platformSelect.addEventListener('change', function() {
        updateServiceOptions(this.value);
        calculateTotal();
    });
    
    // Service type change handler
    serviceSelect.addEventListener('change', calculateTotal);
    
    // Quantity change handler
    if (quantityInput) {
        quantityInput.addEventListener('input', calculateTotal);
    }
    
    function updateServiceOptions(platform) {
        const services = getServicesByPlatform(platform);
        serviceSelect.innerHTML = '<option value="">اختر نوع الخدمة</option>';
        
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.name} - ${window.formatPrice ? window.formatPrice(service.basePriceUSD || service.price) : service.price + ' ر.س'}`;
            option.dataset.price = service.basePriceUSD || service.price;
            option.dataset.basePriceUsd = service.basePriceUSD || service.price;
            serviceSelect.appendChild(option);
        });
    }
    
    function calculateTotal() {
        const selectedService = serviceSelect.options[serviceSelect.selectedIndex];
        const quantity = parseInt(quantityInput.value) || 0;
        
        if (selectedService && selectedService.dataset.price) {
            const pricePerThousand = parseFloat(selectedService.dataset.price);
            const total = (quantity / 1000) * pricePerThousand;
            totalPriceInput.value = total.toFixed(2);
        } else {
            totalPriceInput.value = '0.00';
        }
    }
}

// Get services by platform
function getServicesByPlatform(platform) {
    const services = {
        instagram: [
            { id: 'ig_followers', name: 'متابعين انستقرام', price: 25 },
            { id: 'ig_likes', name: 'لايكات انستقرام', price: 15 },
            { id: 'ig_comments', name: 'تعليقات انستقرام', price: 30 },
            { id: 'ig_views', name: 'مشاهدات ريلز', price: 10 }
        ],
        tiktok: [
            { id: 'tt_followers', name: 'متابعين تيك توك', price: 20 },
            { id: 'tt_likes', name: 'لايكات تيك توك', price: 12 },
            { id: 'tt_views', name: 'مشاهدات تيك توك', price: 8 },
            { id: 'tt_comments', name: 'تعليقات تيك توك', price: 25 }
        ],
        youtube: [
            { id: 'yt_subscribers', name: 'مشتركين يوتيوب', price: 40 },
            { id: 'yt_views', name: 'مشاهدات يوتيوب', price: 5 },
            { id: 'yt_likes', name: 'لايكات يوتيوب', price: 18 },
            { id: 'yt_comments', name: 'تعليقات يوتيوب', price: 35 }
        ],
        twitter: [
            { id: 'tw_followers', name: 'متابعين تويتر', price: 30 },
            { id: 'tw_likes', name: 'لايكات تويتر', price: 20 },
            { id: 'tw_retweets', name: 'إعادة تغريد', price: 25 },
            { id: 'tw_comments', name: 'تعليقات تويتر', price: 28 }
        ],
        facebook: [
            { id: 'fb_followers', name: 'متابعين فيسبوك', price: 22 },
            { id: 'fb_likes', name: 'لايكات فيسبوك', price: 16 },
            { id: 'fb_shares', name: 'مشاركات فيسبوك', price: 24 }
        ],
        snapchat: [
            { id: 'sc_followers', name: 'متابعين سناب شات', price: 35 },
            { id: 'sc_views', name: 'مشاهدات سناب شات', price: 12 }
        ]
    };
    
    return services[platform] || [];
}

// Handle track order
function handleTrackOrder(event) {
    event.preventDefault();
    
    const orderId = document.getElementById('orderId').value.trim();
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        displayOrderStatus(order);
    } else {
        showAlert('لم يتم العثور على الطلب. يرجى التأكد من رقم الطلب.', 'warning');
    }
}

// Display order status
function displayOrderStatus(order) {
    const statusContainer = document.getElementById('orderStatus');
    
    if (!statusContainer) return;
    
    // Update order details
    document.getElementById('displayOrderId').textContent = order.id;
    document.getElementById('orderDate').textContent = new Date(order.date).toLocaleDateString('ar-SA');
    document.getElementById('orderPlatform').textContent = getPlatformName(order.platform);
    document.getElementById('orderService').textContent = order.serviceType;
    document.getElementById('orderQuantity').textContent = order.quantity.toLocaleString('ar-SA');
    document.getElementById('orderTotal').textContent = order.total + ' ر.س';
    document.getElementById('orderLink').textContent = order.profileLink;
    
    // Update status badge
    const statusBadge = document.getElementById('orderStatusBadge');
    statusBadge.textContent = getStatusText(order.status);
    statusBadge.className = `badge ${getStatusClass(order.status)}`;
    
    // Update timeline
    updateTimeline(order.status);
    
    // Show status container
    statusContainer.style.display = 'block';
    statusContainer.scrollIntoView({ behavior: 'smooth' });
}

// Get platform display name
function getPlatformName(platform) {
    const names = {
        instagram: 'انستقرام',
        tiktok: 'تيك توك',
        youtube: 'يوتيوب',
        twitter: 'تويتر',
        facebook: 'فيسبوك',
        snapchat: 'سناب شات'
    };
    return names[platform] || platform;
}

// Get status display text
function getStatusText(status) {
    const texts = {
        pending: 'في الانتظار',
        processing: 'جاري التنفيذ',
        completed: 'مكتمل',
        cancelled: 'ملغي'
    };
    return texts[status] || status;
}

// Get status CSS class
function getStatusClass(status) {
    const classes = {
        pending: 'bg-info',
        processing: 'bg-warning',
        completed: 'bg-success',
        cancelled: 'bg-danger'
    };
    return classes[status] || 'bg-secondary';
}

// Update timeline based on status
function updateTimeline(status) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const statusOrder = ['pending', 'processing', 'completed'];
    const currentIndex = statusOrder.indexOf(status);
    
    for (let i = 0; i <= currentIndex; i++) {
        const item = document.querySelector(`[data-status="${statusOrder[i]}"]`);
        if (item) {
            item.classList.add('active');
        }
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertContainer.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, 5000);
}

// Refresh order status
function refreshOrderStatus() {
    const orderId = document.getElementById('displayOrderId').textContent;
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        // Simulate status updates
        simulateStatusUpdate(order);
        displayOrderStatus(order);
        showAlert('تم تحديث حالة الطلب', 'info');
    }
}

// Simulate order status updates
function simulateStatusUpdate(order) {
    const timeSinceOrder = Date.now() - new Date(order.date).getTime();
    const hoursElapsed = timeSinceOrder / (1000 * 60 * 60);
    
    if (order.status === 'pending' && hoursElapsed > 1) {
        order.status = 'processing';
    } else if (order.status === 'processing' && hoursElapsed > 6) {
        order.status = 'completed';
    }
    
    // Update in localStorage
    let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const index = orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
        orders[index] = order;
        localStorage.setItem('userOrders', JSON.stringify(orders));
    }
}

// Contact support
function contactSupport() {
    const orderId = document.getElementById('displayOrderId').textContent;
    const message = `مرحباً، أحتاج مساعدة بخصوص الطلب رقم: ${orderId}`;
    
    if (confirm('سيتم توجيهك إلى صفحة التواصل. هل تريد المتابعة؟')) {
        localStorage.setItem('supportMessage', message);
        window.location.href = 'contact.html';
    }
}

// Newsletter subscription
function handleNewsletterSubscription(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        showAlert('تم اشتراكك في النشرة الإخبارية بنجاح!', 'success');
    } else {
        showAlert('أنت مشترك بالفعل في النشرة الإخبارية.', 'info');
    }
    
    event.target.reset();
}

// Logout function
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('user');
        window.location.href = '../index.html';
    }
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2) + ' ر.س';
}

function generateOrderId() {
    return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Export functions for other modules
window.SMM = {
    showAlert,
    formatDate,
    formatPrice,
    generateOrderId,
    getServicesByPlatform,
    getPlatformName,
    getStatusText,
    getStatusClass
};
