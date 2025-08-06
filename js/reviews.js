// Reviews Management System

// Initialize reviews system
document.addEventListener('DOMContentLoaded', function() {
    loadRecentReviews();
    setupReviewsForServices();
});

// Load recent reviews for homepage
async function loadRecentReviews() {
    const reviewsContainer = document.getElementById('recentReviews');
    if (!reviewsContainer) return;

    try {
        const response = await fetch('/api/reviews/recent?limit=6');
        const reviews = await response.json();
        
        reviewsContainer.innerHTML = reviews.map(review => createReviewCard(review)).join('');
    } catch (error) {
        console.error('Error loading recent reviews:', error);
        reviewsContainer.innerHTML = '<p class="text-center text-muted">لا توجد تقييمات متاحة حالياً</p>';
    }
}

// Load reviews for specific service
async function loadServiceReviews(serviceId) {
    try {
        const response = await fetch(`/api/reviews/service/${serviceId}`);
        const reviews = await response.json();
        return reviews;
    } catch (error) {
        console.error('Error loading service reviews:', error);
        return [];
    }
}

// Create review card HTML
function createReviewCard(review) {
    const starsHtml = createStarsHTML(review.rating);
    const verifiedBadge = review.isVerified ? '<i class="fas fa-check-circle text-success me-1"></i>' : '';
    const timeAgo = getTimeAgo(new Date(review.createdAt));
    
    return `
        <div class="review-card bg-light p-3 rounded mb-3">
            <div class="d-flex align-items-start">
                <div class="review-avatar me-3">
                    <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <div class="review-content flex-grow-1">
                    <div class="d-flex align-items-center mb-2">
                        <h6 class="mb-0 me-2">${review.userName}</h6>
                        ${verifiedBadge}
                        <small class="text-muted">مشتري مؤكد</small>
                        <small class="text-muted me-auto">${timeAgo}</small>
                    </div>
                    <div class="review-rating mb-2">
                        ${starsHtml}
                    </div>
                    <p class="review-text mb-0 text-dark">${review.comment}</p>
                </div>
            </div>
        </div>
    `;
}

// Create stars HTML
function createStarsHTML(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star text-warning"></i>';
        } else {
            starsHtml += '<i class="far fa-star text-muted"></i>';
        }
    }
    return starsHtml;
}

// Calculate time ago
function getTimeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'منذ يوم واحد';
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
    return `منذ ${Math.floor(diffDays / 30)} شهر`;
}

// Setup reviews for service pages
function setupReviewsForServices() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const serviceId = card.dataset.serviceId;
        if (serviceId) {
            addReviewsToServiceCard(card, serviceId);
        }
    });
}

// Add reviews preview to service card
async function addReviewsToServiceCard(card, serviceId) {
    const reviews = await loadServiceReviews(serviceId);
    
    if (reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        const reviewsCount = reviews.length;
        
        const reviewsSummary = `
            <div class="service-reviews mt-2 pt-2 border-top">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="reviews-rating">
                        ${createStarsHTML(Math.round(avgRating))}
                        <small class="text-muted me-2">(${reviewsCount} تقييم)</small>
                    </div>
                    <small class="text-primary">عرض التقييمات</small>
                </div>
            </div>
        `;
        
        card.querySelector('.card-body').insertAdjacentHTML('beforeend', reviewsSummary);
    }
}

// Show service reviews modal
function showServiceReviews(serviceId, serviceName) {
    loadServiceReviews(serviceId).then(reviews => {
        const modalContent = `
            <div class="modal fade" id="reviewsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">تقييمات خدمة: ${serviceName}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${reviews.length > 0 ? 
                                reviews.map(review => createReviewCard(review)).join('') :
                                '<p class="text-center text-muted">لا توجد تقييمات لهذه الخدمة بعد</p>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
        const modal = new bootstrap.Modal(document.getElementById('reviewsModal'));
        modal.show();
        
        // Remove modal from DOM when hidden
        document.getElementById('reviewsModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    });
}

// Submit review function (will be called after order completion)
async function submitReview(orderId, serviceId, rating, comment) {
    try {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                serviceId,
                rating,
                comment
            })
        });
        
        if (response.ok) {
            showNotification('تم إرسال تقييمك بنجاح!', 'success');
            return true;
        } else {
            throw new Error('Failed to submit review');
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        showNotification('حدث خطأ أثناء إرسال التقييم', 'error');
        return false;
    }
}

// Show notification helper
function showNotification(message, type = 'info') {
    const alertClass = type === 'success' ? 'alert-success' : 
                      type === 'error' ? 'alert-danger' : 'alert-info';
    
    const notification = `
        <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
             style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if (alert) alert.remove();
    }, 5000);
}