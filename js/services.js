// Services Management JavaScript

// Services data structure
const servicesData = {
    instagram: {
        name: 'انستقرام',
        icon: 'fab fa-instagram',
        color: '#E4405F',
        services: [
            {
                id: 'ig_followers_basic',
                name: 'متابعين انستقرام - عادي',
                description: 'متابعين حقيقيين من حسابات نشطة',
                price: 25,
                basePriceUSD: 6.67,
                minOrder: 100,
                maxOrder: 10000,
                deliveryTime: '24 ساعة',
                quality: 'عالي',
                features: ['متابعين حقيقيين', 'تسليم تدريجي', 'ضمان عدم النقصان']
            },
            {
                id: 'ig_followers_premium',
                name: 'متابعين انستقرام - مميز',
                description: 'متابعين عالي الجودة مع تفاعل',
                price: 45,
                basePriceUSD: 12.00,
                minOrder: 500,
                maxOrder: 50000,
                deliveryTime: '12 ساعة',
                quality: 'ممتاز',
                features: ['متابعين مميزين', 'تفاعل حقيقي', 'ضمان مدى الحياة']
            },
            {
                id: 'ig_likes_auto',
                name: 'لايكات انستقرام - تلقائي',
                description: 'لايكات تلقائية للمنشورات الجديدة',
                price: 15,
                basePriceUSD: 4.00,
                minOrder: 100,
                maxOrder: 5000,
                deliveryTime: '1 ساعة',
                quality: 'عالي',
                features: ['لايكات تلقائية', 'سرعة في التسليم', 'لايكات حقيقية']
            },
            {
                id: 'ig_likes_instant',
                name: 'لايكات انستقرام - فوري',
                description: 'لايكات فورية للمنشورات',
                price: 18,
                basePriceUSD: 4.80,
                minOrder: 50,
                maxOrder: 10000,
                deliveryTime: '5 دقائق',
                quality: 'عالي',
                features: ['تسليم فوري', 'لايكات عالية الجودة', 'أمان 100%']
            },
            {
                id: 'ig_comments_custom',
                name: 'تعليقات انستقرام - مخصصة',
                description: 'تعليقات مخصصة باللغة العربية',
                price: 35,
                basePriceUSD: 9.33,
                minOrder: 10,
                maxOrder: 1000,
                deliveryTime: '2 ساعة',
                quality: 'ممتاز',
                features: ['تعليقات مخصصة', 'باللغة العربية', 'حسابات حقيقية']
            },
            {
                id: 'ig_views_story',
                name: 'مشاهدات القصص',
                description: 'مشاهدات للقصص المنشورة',
                price: 12,
                basePriceUSD: 3.20,
                minOrder: 100,
                maxOrder: 20000,
                deliveryTime: '30 دقيقة',
                quality: 'عالي',
                features: ['مشاهدات سريعة', 'حسابات نشطة', 'آمن تماماً']
            }
        ]
    },
    
    tiktok: {
        name: 'تيك توك',
        icon: 'fab fa-tiktok',
        color: '#000000',
        services: [
            {
                id: 'tt_followers_global',
                name: 'متابعين تيك توك - عالمي',
                description: 'متابعين من جميع أنحاء العالم',
                price: 20,
                minOrder: 100,
                maxOrder: 25000,
                deliveryTime: '24 ساعة',
                quality: 'عالي',
                features: ['متابعين عالميين', 'تسليم تدريجي', 'جودة عالية']
            },
            {
                id: 'tt_followers_arab',
                name: 'متابعين تيك توك - عرب',
                description: 'متابعين من الدول العربية',
                price: 35,
                minOrder: 100,
                maxOrder: 10000,
                deliveryTime: '48 ساعة',
                quality: 'ممتاز',
                features: ['متابعين عرب', 'تفاعل محلي', 'أسماء عربية']
            },
            {
                id: 'tt_likes_fast',
                name: 'لايكات تيك توك - سريع',
                description: 'لايكات سريعة للفيديوهات',
                price: 12,
                minOrder: 100,
                maxOrder: 100000,
                deliveryTime: '1 ساعة',
                quality: 'عالي',
                features: ['تسليم سريع', 'لايكات حقيقية', 'سعر منافس']
            },
            {
                id: 'tt_views_viral',
                name: 'مشاهدات تيك توك - انتشار',
                description: 'مشاهدات لانتشار الفيديو',
                price: 8,
                minOrder: 1000,
                maxOrder: 1000000,
                deliveryTime: '6 ساعات',
                quality: 'عالي',
                features: ['مشاهدات حقيقية', 'انتشار سريع', 'تحسين الوصول']
            },
            {
                id: 'tt_shares',
                name: 'مشاركات تيك توك',
                description: 'مشاركات للفيديوهات',
                price: 25,
                minOrder: 50,
                maxOrder: 5000,
                deliveryTime: '4 ساعات',
                quality: 'عالي',
                features: ['مشاركات حقيقية', 'زيادة الانتشار', 'حسابات نشطة']
            }
        ]
    },
    
    youtube: {
        name: 'يوتيوب',
        icon: 'fab fa-youtube',
        color: '#FF0000',
        services: [
            {
                id: 'yt_subscribers_real',
                name: 'مشتركين يوتيوب - حقيقي',
                description: 'مشتركين حقيقيين ونشطين',
                price: 40,
                minOrder: 100,
                maxOrder: 10000,
                deliveryTime: '48 ساعة',
                quality: 'ممتاز',
                features: ['مشتركين حقيقيين', 'نشطين ومتفاعلين', 'ضمان عدم الإلغاء']
            },
            {
                id: 'yt_views_targeted',
                name: 'مشاهدات يوتيوب - مستهدفة',
                description: 'مشاهدات مستهدفة حسب المنطقة',
                price: 5,
                minOrder: 1000,
                maxOrder: 1000000,
                deliveryTime: '12 ساعة',
                quality: 'عالي',
                features: ['مشاهدات مستهدفة', 'تحسين الترتيب', 'مشاهدة كاملة']
            },
            {
                id: 'yt_likes_engagement',
                name: 'لايكات يوتيوب - تفاعل',
                description: 'لايكات لزيادة التفاعل',
                price: 18,
                minOrder: 100,
                maxOrder: 50000,
                deliveryTime: '6 ساعات',
                quality: 'عالي',
                features: ['لايكات حقيقية', 'تحسين التفاعل', 'حسابات نشطة']
            },
            {
                id: 'yt_comments_arabic',
                name: 'تعليقات يوتيوب - عربية',
                description: 'تعليقات باللغة العربية',
                price: 45,
                minOrder: 10,
                maxOrder: 1000,
                deliveryTime: '24 ساعة',
                quality: 'ممتاز',
                features: ['تعليقات عربية', 'محتوى مناسب', 'حسابات حقيقية']
            },
            {
                id: 'yt_watchtime',
                name: 'ساعات مشاهدة',
                description: 'ساعات مشاهدة لتحقيق شروط الربح',
                price: 60,
                minOrder: 100,
                maxOrder: 10000,
                deliveryTime: '72 ساعة',
                quality: 'ممتاز',
                features: ['ساعات حقيقية', 'تحقيق الشروط', 'مشاهدة طبيعية']
            }
        ]
    },
    
    twitter: {
        name: 'تويتر',
        icon: 'fab fa-twitter',
        color: '#1DA1F2',
        services: [
            {
                id: 'tw_followers_active',
                name: 'متابعين تويتر - نشطين',
                description: 'متابعين نشطين ومتفاعلين',
                price: 30,
                minOrder: 100,
                maxOrder: 20000,
                deliveryTime: '24 ساعة',
                quality: 'عالي',
                features: ['متابعين نشطين', 'حسابات متفاعلة', 'ضمان الجودة']
            },
            {
                id: 'tw_likes_instant',
                name: 'لايكات تويتر - فوري',
                description: 'لايكات فورية للتغريدات',
                price: 20,
                minOrder: 50,
                maxOrder: 10000,
                deliveryTime: '10 دقائق',
                quality: 'عالي',
                features: ['تسليم فوري', 'لايكات حقيقية', 'زيادة الانتشار']
            },
            {
                id: 'tw_retweets_viral',
                name: 'إعادة تغريد - انتشار',
                description: 'إعادة تغريد لزيادة الانتشار',
                price: 25,
                minOrder: 50,
                maxOrder: 5000,
                deliveryTime: '30 دقيقة',
                quality: 'عالي',
                features: ['انتشار سريع', 'حسابات متنوعة', 'زيادة الوصول']
            },
            {
                id: 'tw_impressions',
                name: 'مرات ظهور التغريدات',
                description: 'زيادة مرات ظهور التغريدات',
                price: 15,
                minOrder: 1000,
                maxOrder: 100000,
                deliveryTime: '2 ساعة',
                quality: 'عالي',
                features: ['زيادة الظهور', 'وصول أكبر', 'تحليلات أفضل']
            }
        ]
    },
    
    facebook: {
        name: 'فيسبوك',
        icon: 'fab fa-facebook',
        color: '#4267B2',
        services: [
            {
                id: 'fb_followers_page',
                name: 'متابعين صفحة فيسبوك',
                description: 'متابعين لصفحة فيسبوك',
                price: 22,
                minOrder: 100,
                maxOrder: 15000,
                deliveryTime: '24 ساعة',
                quality: 'عالي',
                features: ['متابعين حقيقيين', 'صفحات نشطة', 'ضمان الاستمرار']
            },
            {
                id: 'fb_likes_post',
                name: 'لايكات منشورات فيسبوك',
                description: 'لايكات للمنشورات',
                price: 16,
                minOrder: 100,
                maxOrder: 20000,
                deliveryTime: '4 ساعات',
                quality: 'عالي',
                features: ['لايكات سريعة', 'حسابات حقيقية', 'تفاعل طبيعي']
            },
            {
                id: 'fb_shares_viral',
                name: 'مشاركات فيسبوك',
                description: 'مشاركات للمنشورات',
                price: 24,
                minOrder: 50,
                maxOrder: 5000,
                deliveryTime: '6 ساعات',
                quality: 'عالي',
                features: ['مشاركات حقيقية', 'انتشار واسع', 'وصول أكبر']
            },
            {
                id: 'fb_views_video',
                name: 'مشاهدات فيديو فيسبوك',
                description: 'مشاهدات للفيديوهات',
                price: 10,
                minOrder: 1000,
                maxOrder: 500000,
                deliveryTime: '12 ساعة',
                quality: 'عالي',
                features: ['مشاهدات حقيقية', 'زيادة التفاعل', 'تحسين الوصول']
            }
        ]
    },
    
    snapchat: {
        name: 'سناب شات',
        icon: 'fab fa-snapchat',
        color: '#FFFC00',
        services: [
            {
                id: 'sc_followers',
                name: 'متابعين سناب شات',
                description: 'متابعين لحساب سناب شات',
                price: 35,
                minOrder: 100,
                maxOrder: 10000,
                deliveryTime: '48 ساعة',
                quality: 'عالي',
                features: ['متابعين حقيقيين', 'حسابات نشطة', 'ضمان الجودة']
            },
            {
                id: 'sc_views_story',
                name: 'مشاهدات قصص سناب شات',
                description: 'مشاهدات للقصص',
                price: 12,
                minOrder: 100,
                maxOrder: 50000,
                deliveryTime: '6 ساعات',
                quality: 'عالي',
                features: ['مشاهدات سريعة', 'حسابات متنوعة', 'زيادة التفاعل']
            }
        ]
    }
};

// Initialize services page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('services.html')) {
        initializeServicesPage();
        setupServiceFilters();
        loadServices();
    }
});

// Initialize services page
function initializeServicesPage() {
    // Load services grid
    loadServices('all');
    
    // Setup platform filters
    setupPlatformFilters();
    
    // Setup search functionality
    setupServiceSearch();
}

// Setup service filters
function setupServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update button styles
            filterButtons.forEach(btn => {
                if (btn.classList.contains('active')) {
                    btn.className = 'btn btn-primary filter-btn active';
                } else {
                    btn.className = 'btn btn-outline-primary filter-btn';
                }
            });
            
            // Filter services
            const platform = this.getAttribute('data-platform');
            loadServices(platform);
        });
    });
}

// Setup platform filters
function setupPlatformFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const platform = urlParams.get('platform');
    
    if (platform && servicesData[platform]) {
        const filterButton = document.querySelector(`[data-platform="${platform}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
    
    // Handle hash navigation
    const hash = window.location.hash.substring(1);
    if (hash && servicesData[hash]) {
        const filterButton = document.querySelector(`[data-platform="${hash}"]`);
        if (filterButton) {
            filterButton.click();
            setTimeout(() => {
                document.querySelector('#servicesGrid').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
}

// Setup service search
function setupServiceSearch() {
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            filterServicesBySearch(query);
        });
    }
}

// Load and display services
function loadServices(platform = 'all') {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    let servicesToShow = [];
    
    if (platform === 'all') {
        // Get all services from all platforms
        Object.keys(servicesData).forEach(platformKey => {
            servicesData[platformKey].services.forEach(service => {
                servicesToShow.push({
                    ...service,
                    platform: platformKey,
                    platformName: servicesData[platformKey].name,
                    platformIcon: servicesData[platformKey].icon,
                    platformColor: servicesData[platformKey].color
                });
            });
        });
    } else if (servicesData[platform]) {
        // Get services for specific platform
        servicesData[platform].services.forEach(service => {
            servicesToShow.push({
                ...service,
                platform: platform,
                platformName: servicesData[platform].name,
                platformIcon: servicesData[platform].icon,
                platformColor: servicesData[platform].color
            });
        });
    }
    
    // Render services
    renderServices(servicesToShow);
}

// Render services in grid
function renderServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">لم يتم العثور على خدمات</h5>
                    <p class="text-muted">جرب تغيير فلتر البحث أو اختيار منصة أخرى</p>
                </div>
            </div>
        `;
        return;
    }
    
    let servicesHTML = '';
    
    services.forEach(service => {
        servicesHTML += `
            <div class="col-lg-4 col-md-6 mb-4 service-card-container" data-platform="${service.platform}">
                <div class="service-item h-100">
                    <div class="d-flex align-items-center mb-3">
                        <div class="service-platform-icon" style="background-color: ${service.platformColor};">
                            <i class="${service.platformIcon}"></i>
                        </div>
                        <div>
                            <h6 class="mb-0">${service.name}</h6>
                            <small class="text-muted">${service.platformName}</small>
                        </div>
                    </div>
                    
                    <p class="text-muted small mb-3">${service.description}</p>
                    
                    <div class="service-details mb-3">
                        <div class="row text-center">
                            <div class="col-4">
                                <small class="text-muted d-block">السعر</small>
                                <span class="service-price">${service.price} ر.س</span>
                                <small class="text-muted d-block">لكل 1000</small>
                            </div>
                            <div class="col-4">
                                <small class="text-muted d-block">التسليم</small>
                                <span class="fw-bold">${service.deliveryTime}</span>
                            </div>
                            <div class="col-4">
                                <small class="text-muted d-block">الجودة</small>
                                <span class="fw-bold text-success">${service.quality}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-features mb-3">
                        ${service.features.map(feature => 
                            `<small class="d-block text-muted"><i class="fas fa-check text-success me-2"></i>${feature}</small>`
                        ).join('')}
                    </div>
                    
                    <div class="service-limits mb-3">
                        <small class="text-muted">
                            الحد الأدنى: ${service.minOrder.toLocaleString('ar-SA')} | 
                            الحد الأقصى: ${service.maxOrder.toLocaleString('ar-SA')}
                        </small>
                    </div>
                    
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100" onclick="orderService('${service.id}', '${service.platform}')">
                            <i class="fas fa-shopping-cart me-2"></i>اطلب الآن
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    servicesGrid.innerHTML = servicesHTML;
    
    // Add fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.service-card-container').forEach(card => {
            card.classList.add('fade-in');
        });
    }, 100);
}

// Filter services by search query
function filterServicesBySearch(query) {
    const serviceCards = document.querySelectorAll('.service-card-container');
    
    serviceCards.forEach(card => {
        const serviceName = card.querySelector('h6').textContent.toLowerCase();
        const platformName = card.querySelector('small').textContent.toLowerCase();
        const description = card.querySelector('.text-muted.small').textContent.toLowerCase();
        
        if (serviceName.includes(query) || platformName.includes(query) || description.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Order a specific service
function orderService(serviceId, platform) {
    // Find the service
    const service = servicesData[platform].services.find(s => s.id === serviceId);
    
    if (!service) {
        alert('لم يتم العثور على الخدمة');
        return;
    }
    
    // Store service details for order form
    const orderData = {
        platform: platform,
        platformName: servicesData[platform].name,
        serviceId: serviceId,
        serviceName: service.name,
        price: service.price,
        minOrder: service.minOrder,
        maxOrder: service.maxOrder,
        deliveryTime: service.deliveryTime
    };
    
    localStorage.setItem('selectedService', JSON.stringify(orderData));
    
    // Redirect to order page
    window.location.href = 'order.html';
}

// Get service by ID and platform
function getServiceById(serviceId, platform) {
    if (!servicesData[platform]) return null;
    return servicesData[platform].services.find(s => s.id === serviceId);
}

// Get all services for a platform
function getServicesByPlatform(platform) {
    if (!servicesData[platform]) return [];
    return servicesData[platform].services.map(service => ({
        id: service.id,
        name: service.name,
        price: service.price,
        description: service.description
    }));
}

// Get platform info
function getPlatformInfo(platform) {
    return servicesData[platform] || null;
}

// Search services across all platforms
function searchServices(query) {
    const results = [];
    
    Object.keys(servicesData).forEach(platform => {
        servicesData[platform].services.forEach(service => {
            if (service.name.toLowerCase().includes(query.toLowerCase()) ||
                service.description.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    ...service,
                    platform: platform,
                    platformName: servicesData[platform].name,
                    platformIcon: servicesData[platform].icon,
                    platformColor: servicesData[platform].color
                });
            }
        });
    });
    
    return results;
}

// Export functions for use in other scripts
window.ServicesManager = {
    servicesData,
    getServiceById,
    getServicesByPlatform,
    getPlatformInfo,
    searchServices,
    orderService,
    loadServices,
    renderServices
};
