// Payment Methods Management System

// Payment configuration
const paymentConfig = {
    creditCard: {
        name: 'بطاقة ائتمان',
        icon: 'fas fa-credit-card',
        description: 'Visa, MasterCard',
        available: true
    },
    paypal: {
        name: 'PayPal',
        icon: 'fab fa-paypal',
        description: 'دفع آمن عبر PayPal',
        available: true
    },
    bankDeposit: {
        name: 'تحويل بنكي محلي',
        icon: 'fas fa-university',
        description: 'حوالة بنكية يمنية',
        available: true,
        banks: [
            {
                id: 'alqutibi',
                name: 'بنك القطيبي',
                accountNumber: '1234567890',
                accountName: 'لوحة التسويق الاجتماعي',
                branch: 'الفرع الرئيسي - صنعاء'
            },
            {
                id: 'alkuraimi',
                name: 'بنك الكريمي',
                accountNumber: '0987654321',
                accountName: 'لوحة التسويق الاجتماعي',
                branch: 'فرع الزبيري - صنعاء'
            },
            {
                id: 'alomqi',
                name: 'بنك العمقي',
                accountNumber: '1357924680',
                accountName: 'لوحة التسويق الاجتماعي',
                branch: 'فرع جولة جمال - صنعاء'
            },
            {
                id: 'alshabakat',
                name: 'الشبكات الموحدة',
                accountNumber: '2468013579',
                accountName: 'لوحة التسويق الاجتماعي',
                branch: 'فرع الستين - صنعاء'
            }
        ]
    }
};

// Current selected payment method
let selectedPaymentMethod = null;
let selectedBank = null;

// Initialize payment system
document.addEventListener('DOMContentLoaded', function() {
    setupPaymentMethods();
});

// Setup payment methods
function setupPaymentMethods() {
    const paymentContainer = document.getElementById('paymentMethods');
    if (paymentContainer) {
        createPaymentMethods(paymentContainer);
    }
    
    // Add to cart checkout if exists
    const checkoutSection = document.querySelector('.cart-actions');
    if (checkoutSection && !document.getElementById('cartPaymentMethods')) {
        addPaymentSectionToCart();
    }
}

// Create payment methods HTML
function createPaymentMethods(container) {
    const paymentHTML = `
        <div class="payment-methods">
            <h5 class="mb-3">
                <i class="fas fa-credit-card me-2 text-primary"></i>
                اختر طريقة الدفع
            </h5>
            
            <div class="payment-options">
                <!-- Credit Card Option -->
                <div class="payment-option mb-3">
                    <div class="form-check payment-method-check">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="creditCard" value="creditCard">
                        <label class="form-check-label payment-method-label" for="creditCard">
                            <div class="d-flex align-items-center">
                                <i class="${paymentConfig.creditCard.icon} fa-2x me-3 text-primary"></i>
                                <div>
                                    <h6 class="mb-1">${paymentConfig.creditCard.name}</h6>
                                    <small class="text-muted">${paymentConfig.creditCard.description}</small>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- PayPal Option -->
                <div class="payment-option mb-3">
                    <div class="form-check payment-method-check">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="paypal" value="paypal">
                        <label class="form-check-label payment-method-label" for="paypal">
                            <div class="d-flex align-items-center">
                                <i class="${paymentConfig.paypal.icon} fa-2x me-3" style="color: #0070ba;"></i>
                                <div>
                                    <h6 class="mb-1">${paymentConfig.paypal.name}</h6>
                                    <small class="text-muted">${paymentConfig.paypal.description}</small>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Bank Deposit Option -->
                <div class="payment-option mb-3">
                    <div class="form-check payment-method-check">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="bankDeposit" value="bankDeposit">
                        <label class="form-check-label payment-method-label" for="bankDeposit">
                            <div class="d-flex align-items-center">
                                <i class="${paymentConfig.bankDeposit.icon} fa-2x me-3 text-success"></i>
                                <div>
                                    <h6 class="mb-1">${paymentConfig.bankDeposit.name}</h6>
                                    <small class="text-muted">${paymentConfig.bankDeposit.description}</small>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Forms Container -->
        <div id="paymentFormsContainer" class="mt-4" style="display: none;">
            ${createCreditCardForm()}
            ${createBankDepositForm()}
        </div>
    `;
    
    container.innerHTML = paymentHTML;
    setupPaymentEventListeners();
}

// Create credit card form
function createCreditCardForm() {
    return `
        <div id="creditCardForm" class="payment-form" style="display: none;">
            <div class="card border-primary">
                <div class="card-header bg-primary text-white">
                    <h6 class="mb-0">
                        <i class="fas fa-credit-card me-2"></i>
                        بيانات البطاقة الائتمانية
                    </h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="cardNumber" class="form-label">رقم البطاقة</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
                                <span class="input-group-text">
                                    <i class="fas fa-credit-card"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="cardName" class="form-label">اسم صاحب البطاقة</label>
                            <input type="text" class="form-control" id="cardName" placeholder="الاسم كما هو مكتوب على البطاقة" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="cardExpiry" class="form-label">تاريخ الانتهاء</label>
                            <input type="text" class="form-control" id="cardExpiry" placeholder="MM/YY" maxlength="5" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="cardCvv" class="form-label">رمز الأمان (CVV)</label>
                            <input type="text" class="form-control" id="cardCvv" placeholder="123" maxlength="4" required>
                        </div>
                    </div>
                    <div class="alert alert-info">
                        <i class="fas fa-shield-alt me-2"></i>
                        جميع المعلومات محمية بتشفير SSL 256-bit
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create bank deposit form
function createBankDepositForm() {
    const banksOptions = paymentConfig.bankDeposit.banks.map(bank => 
        `<option value="${bank.id}">${bank.name}</option>`
    ).join('');

    return `
        <div id="bankDepositForm" class="payment-form" style="display: none;">
            <div class="card border-success">
                <div class="card-header bg-success text-white">
                    <h6 class="mb-0">
                        <i class="fas fa-university me-2"></i>
                        معلومات التحويل البنكي
                    </h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="selectedBank" class="form-label">اختر البنك</label>
                            <select class="form-select" id="selectedBank" required>
                                <option value="">اختر البنك</option>
                                ${banksOptions}
                            </select>
                        </div>
                    </div>

                    <!-- Bank Details Display -->
                    <div id="bankDetails" class="bank-details" style="display: none;">
                        <div class="alert alert-warning">
                            <h6 class="alert-heading">
                                <i class="fas fa-info-circle me-2"></i>
                                معلومات التحويل
                            </h6>
                            <div id="bankInfo"></div>
                        </div>
                    </div>

                    <!-- Transfer Details Form -->
                    <div id="transferForm" style="display: none;">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="senderName" class="form-label">اسم المرسل</label>
                                <input type="text" class="form-control" id="senderName" placeholder="اسمك الكامل" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="transferAmount" class="form-label">مبلغ التحويل</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="transferAmount" placeholder="0.00" readonly>
                                    <span class="input-group-text currency-text">ر.س</span>
                                </div>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="transferDate" class="form-label">تاريخ التحويل</label>
                                <input type="date" class="form-control" id="transferDate" required>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="receiptUpload" class="form-label">رفع صورة الإيصال</label>
                                <input type="file" class="form-control" id="receiptUpload" accept="image/*" required>
                                <div class="form-text">
                                    <i class="fas fa-image me-1"></i>
                                    صور مقبولة: JPG, PNG, GIF (حد أقصى 5 ميجا)
                                </div>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="transferNotes" class="form-label">ملاحظات إضافية (اختياري)</label>
                                <textarea class="form-control" id="transferNotes" rows="3" placeholder="أي ملاحظات إضافية حول التحويل"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add payment section to order form
function addPaymentSectionToOrder() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    const paymentSection = document.createElement('div');
    paymentSection.id = 'paymentSection';
    paymentSection.className = 'col-12 mt-4';
    paymentSection.innerHTML = '<div id="paymentMethods"></div>';

    // Insert before submit button
    const submitButton = orderForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.parentElement.parentNode.insertBefore(paymentSection, submitButton.parentElement);
        createPaymentMethods(paymentSection.querySelector('#paymentMethods'));
    }
}

// Add payment section to cart
function addPaymentSectionToCart() {
    const cartActions = document.querySelector('.cart-actions');
    if (!cartActions) return;

    const paymentSection = document.createElement('div');
    paymentSection.id = 'cartPaymentMethods';
    paymentSection.className = 'mt-4';
    paymentSection.innerHTML = '<div id="paymentMethodsCart"></div>';

    // Insert before checkout button
    const checkoutBtn = cartActions.querySelector('.checkout-btn');
    if (checkoutBtn) {
        cartActions.insertBefore(paymentSection, checkoutBtn);
        createPaymentMethods(paymentSection.querySelector('#paymentMethodsCart'));
    }
}

// Setup payment event listeners
function setupPaymentEventListeners() {
    // Payment method selection
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            selectedPaymentMethod = this.value;
            showPaymentForm(this.value);
        });
    });

    // Bank selection
    const bankSelect = document.getElementById('selectedBank');
    if (bankSelect) {
        bankSelect.addEventListener('change', function() {
            selectedBank = this.value;
            showBankDetails(this.value);
        });
    }

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }

    // Card expiry formatting
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', formatCardExpiry);
    }

    // Receipt upload preview
    const receiptUpload = document.getElementById('receiptUpload');
    if (receiptUpload) {
        receiptUpload.addEventListener('change', handleReceiptUpload);
    }

    // Transfer amount auto-fill
    updateTransferAmount();
}

// Show payment form based on selection
function showPaymentForm(paymentMethod) {
    const formsContainer = document.getElementById('paymentFormsContainer');
    if (!formsContainer) return;

    // Show container
    formsContainer.style.display = 'block';

    // Hide all forms
    const allForms = formsContainer.querySelectorAll('.payment-form');
    allForms.forEach(form => form.style.display = 'none');

    // Show selected form
    if (paymentMethod === 'creditCard') {
        let creditCardForm = document.getElementById('creditCardForm');
        if (!creditCardForm) {
            // Re-create the forms if they were removed
            formsContainer.innerHTML = createCreditCardForm() + createBankDepositForm();
            setupPaymentEventListeners();
        }
        document.getElementById('creditCardForm').style.display = 'block';
    } else if (paymentMethod === 'bankDeposit') {
        let bankDepositForm = document.getElementById('bankDepositForm');
        if (!bankDepositForm) {
            // Re-create the forms if they were removed
            formsContainer.innerHTML = createCreditCardForm() + createBankDepositForm();
            setupPaymentEventListeners();
        }
        document.getElementById('bankDepositForm').style.display = 'block';
    } else if (paymentMethod === 'paypal') {
        showPayPalInfo();
    }
}

// Show PayPal information
function showPayPalInfo() {
    const formsContainer = document.getElementById('paymentFormsContainer');
    if (!formsContainer) return;

    // Hide all existing forms first
    const allForms = formsContainer.querySelectorAll('.payment-form');
    allForms.forEach(form => form.style.display = 'none');

    // Check if PayPal info already exists
    let paypalInfo = document.getElementById('paypalInfo');
    if (!paypalInfo) {
        paypalInfo = document.createElement('div');
        paypalInfo.id = 'paypalInfo';
        paypalInfo.className = 'payment-form';
        paypalInfo.innerHTML = `
            <div class="card border-info">
                <div class="card-header bg-info text-white">
                    <h6 class="mb-0">
                        <i class="fab fa-paypal me-2"></i>
                        الدفع عبر PayPal
                    </h6>
                </div>
                <div class="card-body text-center">
                    <i class="fab fa-paypal fa-4x text-primary mb-3"></i>
                    <h5>ستتم إعادة توجيهكم إلى PayPal</h5>
                    <p class="text-muted">بعد تأكيد الطلب، ستتم إعادة توجيهكم إلى موقع PayPal لإكمال عملية الدفع الآمن.</p>
                    <div class="alert alert-success">
                        <i class="fas fa-shield-alt me-2"></i>
                        دفع آمن ومضمون 100%
                    </div>
                </div>
            </div>
        `;
        formsContainer.appendChild(paypalInfo);
    }

    // Show PayPal info
    paypalInfo.style.display = 'block';
}

// Show bank details
function showBankDetails(bankId) {
    const bank = paymentConfig.bankDeposit.banks.find(b => b.id === bankId);
    if (!bank) return;

    const bankDetails = document.getElementById('bankDetails');
    const bankInfo = document.getElementById('bankInfo');
    const transferForm = document.getElementById('transferForm');

    if (bankDetails && bankInfo && transferForm) {
        bankInfo.innerHTML = `
            <p class="mb-2"><strong>اسم البنك:</strong> ${bank.name}</p>
            <p class="mb-2"><strong>رقم الحساب:</strong> <code class="fs-6">${bank.accountNumber}</code></p>
            <p class="mb-2"><strong>اسم الحساب:</strong> ${bank.accountName}</p>
            <p class="mb-0"><strong>الفرع:</strong> ${bank.branch}</p>
            <hr>
            <p class="mb-0 text-warning">
                <i class="fas fa-exclamation-triangle me-2"></i>
                يرجى التحويل بالمبلغ المحدد بالضبط ورفع صورة واضحة للإيصال
            </p>
        `;

        bankDetails.style.display = 'block';
        transferForm.style.display = 'block';
    }
}

// Format card number input
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
}

// Format card expiry input
function formatCardExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

// Handle receipt upload
function handleReceiptUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. يرجى اختيار صورة أصغر من 5 ميجا.');
        e.target.value = '';
        return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة صالح.');
        e.target.value = '';
        return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        showReceiptPreview(e.target.result, file.name);
    };
    reader.readAsDataURL(file);
}

// Show receipt preview
function showReceiptPreview(src, filename) {
    let previewContainer = document.getElementById('receiptPreview');
    
    if (!previewContainer) {
        previewContainer = document.createElement('div');
        previewContainer.id = 'receiptPreview';
        previewContainer.className = 'mt-3';
        document.getElementById('receiptUpload').parentNode.appendChild(previewContainer);
    }

    previewContainer.innerHTML = `
        <div class="receipt-preview border rounded p-3">
            <h6 class="text-success">
                <i class="fas fa-check-circle me-2"></i>
                تم رفع الإيصال بنجاح
            </h6>
            <div class="d-flex align-items-center">
                <img src="${src}" alt="معاينة الإيصال" class="receipt-thumbnail me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                <div>
                    <p class="mb-1"><strong>اسم الملف:</strong> ${filename}</p>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeReceiptPreview()">
                        <i class="fas fa-trash-alt me-1"></i>
                        إزالة
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Remove receipt preview
function removeReceiptPreview() {
    const previewContainer = document.getElementById('receiptPreview');
    const fileInput = document.getElementById('receiptUpload');
    
    if (previewContainer) {
        previewContainer.remove();
    }
    
    if (fileInput) {
        fileInput.value = '';
    }
}

// Update transfer amount
function updateTransferAmount() {
    const transferAmountInput = document.getElementById('transferAmount');
    if (!transferAmountInput) return;

    // Get total from order form or cart
    let total = 0;
    const totalPriceInput = document.getElementById('totalPrice');
    const cartTotal = document.querySelector('.cart-total h5:last-child');

    if (totalPriceInput && totalPriceInput.value) {
        total = parseFloat(totalPriceInput.value);
    } else if (cartTotal) {
        const totalText = cartTotal.textContent;
        total = parseFloat(totalText.replace(/[^\d.]/g, ''));
    }

    transferAmountInput.value = total.toFixed(2);
}

// Validate payment form
function validatePaymentForm() {
    if (!selectedPaymentMethod) {
        alert('يرجى اختيار طريقة الدفع');
        return false;
    }

    if (selectedPaymentMethod === 'creditCard') {
        return validateCreditCardForm();
    } else if (selectedPaymentMethod === 'bankDeposit') {
        return validateBankDepositForm();
    }

    return true;
}

// Validate credit card form
function validateCreditCardForm() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;

    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
        alert('يرجى إدخال رقم بطاقة صالح');
        return false;
    }

    if (!cardName.trim()) {
        alert('يرجى إدخال اسم صاحب البطاقة');
        return false;
    }

    if (!cardExpiry || !cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        alert('يرجى إدخال تاريخ انتهاء صالح (MM/YY)');
        return false;
    }

    if (!cardCvv || cardCvv.length < 3) {
        alert('يرجى إدخال رمز الأمان الصحيح');
        return false;
    }

    return true;
}

// Validate bank deposit form
function validateBankDepositForm() {
    const selectedBank = document.getElementById('selectedBank').value;
    const senderName = document.getElementById('senderName').value;
    const transferDate = document.getElementById('transferDate').value;
    const receiptUpload = document.getElementById('receiptUpload').files[0];

    if (!selectedBank) {
        alert('يرجى اختيار البنك');
        return false;
    }

    if (!senderName.trim()) {
        alert('يرجى إدخال اسم المرسل');
        return false;
    }

    if (!transferDate) {
        alert('يرجى إدخال تاريخ التحويل');
        return false;
    }

    if (!receiptUpload) {
        alert('يرجى رفع صورة الإيصال');
        return false;
    }

    return true;
}

// Process payment
function processPayment() {
    if (!validatePaymentForm()) {
        return false;
    }

    const paymentData = {
        method: selectedPaymentMethod,
        timestamp: new Date().toISOString()
    };

    if (selectedPaymentMethod === 'creditCard') {
        paymentData.cardLast4 = document.getElementById('cardNumber').value.slice(-4);
        paymentData.cardName = document.getElementById('cardName').value;
    } else if (selectedPaymentMethod === 'bankDeposit') {
        paymentData.bank = selectedBank;
        paymentData.senderName = document.getElementById('senderName').value;
        paymentData.transferDate = document.getElementById('transferDate').value;
        paymentData.receiptUploaded = true;
    }

    // Save payment data
    localStorage.setItem('lastPaymentData', JSON.stringify(paymentData));
    
    return true;
}

// Get selected payment method
function getSelectedPaymentMethod() {
    return {
        method: selectedPaymentMethod,
        bank: selectedBank
    };
}

// Export functions
window.PaymentManager = {
    validatePaymentForm,
    processPayment,
    getSelectedPaymentMethod
};

// Make functions globally available
window.validatePaymentForm = validatePaymentForm;
window.processPayment = processPayment;
window.removeReceiptPreview = removeReceiptPreview;