// 1. المنتجات المتاحة بالمتجر (محاكاة للـ Database)
const dbProducts = [
    { id: 1, title: "سماعة رأس لاسلكية احترافية", price: 199, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "ساعة ذكية رياضية متطورة", price: 250, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "حقيبة ظهر للسفر والأعمال", price: 85, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "نظارة شمسية كلاسيكية", price: 120, category: "accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80" },
    { id: 5, title: "كاميرا رقمية مدمجة", price: 550, category: "electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80" },
    { id: 6, title: "حذاء رياضي مريح", price: 95, category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
    { id: 7, title: "تيشيرت قطني عصري", price: 35, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80" },
    { id: 8, title: "مكبر صوت بلوتوث محمول", price: 75, category: "electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80" },
    { id: 9, title: "لوحة مفاتيح ميكانيكية", price: 110, category: "electronics", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80" },
    { id: 10, title: "قبعة رياضية كاجوال", price: 25, category: "fashion", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80" },
    { id: 11, title: "محفظة جلدية فاخرة", price: 65, category: "accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80" },
    { id: 12, title: "بنطال جينز أزرق", price: 55, category: "fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80" },
    { id: 13, title: "شاحن لاسلكي سريع", price: 40, category: "electronics", image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=400&q=80" },
    { id: 14, title: "طقم أساور لليد", price: 30, category: "accessories", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80" },
    { id: 15, title: "جاكيت شتوي دافئ", price: 145, category: "fashion", image: "https://images.unsplash.com/photo-1551028719-01c1eb562145?auto=format&fit=crop&w=400&q=80" },
    { id: 16, title: "حزام جلدي أنيق", price: 45, category: "accessories", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=400&q=80" }
];

// 2. إدارة حالة التطبيق (State Management)
let cart = JSON.parse(localStorage.getItem('NEXUS_CART')) || [];
let activeCoupon = null;
const COUPON_CODE = "NEXT20";
const DISCOUNT_RATE = 0.20;

// استدعاء عناصر الواجهة
const grid = document.getElementById('products-grid');
const cartPanel = document.getElementById('cart-panel');
const backdrop = document.getElementById('blur-backdrop');
const checkoutOverlay = document.getElementById('checkout-overlay');

// 3. رندرة المنتجات بالصفحة الرئيسية
function renderProducts(list) {
    grid.innerHTML = list.map(p => `
        <div class="product-card glass">
            <div class="img-box">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="add-to-cart-overlay">
                <button class="btn-add" onclick="pushToCart(${p.id})">أضف إلى السلة</button>
            </div>
            <div class="p-info">
                <span class="p-title">${p.title}</span>
                <span class="p-price">${p.price} $</span>
            </div>
        </div>
    `).join('');
}

// 4. نظام الفلترة والبحث السريع
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.dataset.cat;
        renderProducts(cat === 'all' ? dbProducts : dbProducts.filter(p => p.category === cat));
    });
});



// 5. التنبيهات المنبثقة التلقائية
function triggerToast(text) {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #059669"></i> <span>${text}</span>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// 6. منطق سلة المشتريات
window.pushToCart = function(id) {
    const matched = dbProducts.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if(item) { item.quantity++; } else { cart.push({...matched, quantity: 1}); }
    syncCart();
    triggerToast(`تمت إضافة "${matched.title}" لسلة المشتريات.`);
};

window.alterQty = function(id, amt) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.quantity += amt;
        if(item.quantity <= 0) cart = cart.filter(i => i.id !== id);
        syncCart();
    }
};

// حساب وتحديث الأسعار والكوبونات
function syncCart() {
    localStorage.setItem('NEXUS_CART', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((a, b) => a + b.quantity, 0);
    
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    let finalTotal = subtotal;
    
    document.getElementById('subtotal-price').innerText = `${subtotal} $`;
    
    if (activeCoupon) {
        const savings = subtotal * DISCOUNT_RATE;
        finalTotal = subtotal - savings;
        document.getElementById('discount-box').style.display = 'flex';
        document.getElementById('discount-price').innerText = `-${savings.toFixed(1)} $`;
    } else {
        document.getElementById('discount-box').style.display = 'none';
    }
    
    document.getElementById('total-price').innerText = `${finalTotal.toFixed(1)} $`;
    document.getElementById('checkout-final-amount').innerText = `(${finalTotal.toFixed(1)} $)`;
    
    // بناء عناصر الـ DOM للسلة
    const container = document.getElementById('cart-items');
    if(cart.length === 0) {
        container.innerHTML = `<p style="text-align:center;color:var(--text-dark);margin-top:40px;">السلة فارغة حالياً</p>`;
    } else {
        container.innerHTML = cart.map(i => `
            <div class="cart-item glass">
                <img src="${i.image}">
                <div class="item-details">
                    <h4>${i.title}</h4>
                    <span>${i.price} $</span>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="alterQty(${i.id}, -1)">-</button>
                        <span>${i.quantity}</span>
                        <button class="qty-btn" onclick="alterQty(${i.id}, 1)">+</button>
                    </div>
                </div>
                <i class="fa-regular fa-trash-can remove-item" onclick="alterQty(${i.id}, -${i.quantity})"></i>
            </div>
        `).join('');
    }
}

// تشغيل نظام الخصومات (Coupons)
document.getElementById('apply-coupon').addEventListener('click', () => {
    const val = document.getElementById('coupon-input').value.trim();
    if(val === COUPON_CODE) {
        activeCoupon = COUPON_CODE;
        syncCart();
        triggerToast("تم تفعيل كود الخصم 20% بنجاح!");
    } else {
        alert("كود الخصم غير صحيح!");
    }
});

// 7. تشغيل معالج خطوت الدفع الفوري وعمليات الـ Wizard الشغالة
document.getElementById('checkout-trigger').addEventListener('click', () => {
    if(cart.length === 0) return alert("سلة المشتريات فارغة، أضف منتجات أولاً!");
    cartPanel.classList.remove('open');
    backdrop.classList.remove('show');
    checkoutOverlay.classList.add('open');
    switchStep(1);
});

function switchStep(stepNum) {
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${stepNum}`).classList.add('active');
    
    // تلوين النقاط الخاصة بالمؤشر
    for(let i=1; i<=3; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if(i <= stepNum) dot.classList.add('active'); else dot.classList.remove('active');
    }
}

// معالجة الخطوة الأولى (الشحن)
document.getElementById('shipping-form').addEventListener('submit', (e) => {
    e.preventDefault();
    switchStep(2);
});

document.getElementById('back-to-1').addEventListener('click', () => switchStep(1));

// تنسيق وتأقلم أرقام الفيزا تلقائياً أثناء الكتابة (الاحترافية المطلقة)
document.getElementById('card-number').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    for (let i=0, len=match.length; i<len; i+=4) { parts.push(match.substring(i, i+4)); }
    if (parts.length > 0) { e.target.value = parts.join(' '); } else { e.target.value = v; }
});

document.getElementById('card-expiry').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if(v.length >= 2) { e.target.value = v.substring(0,2) + '/' + v.substring(2,4); }
});

// معالجة الخطوة الثانية وتوليد الفاتورة النهائية الحقيقية
document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // توليد رقم فاتورة عشوائي احترافي
    const invNum = 'NEX-' + Math.floor(100000 + Math.random() * 900000);
    const finalPrice = document.getElementById('total-price').innerText;
    
    document.getElementById('invoice-details').innerHTML = `
        <div class="invoice-title">رقم الفاتورة الرقمية: ${invNum}</div>
        <div class="invoice-row"><span>عدد المواد المشحونة:</span> <span>${cart.reduce((a,b)=>a+b.quantity,0)} قطع</span></div>
        <div class="invoice-row" style="color:var(--accent); font-weight:bold;"><span>المبلغ الإجمالي المدفوع:</span> <span>${finalPrice}</span></div>
    `;
    
    switchStep(3);
    
    // تصفير السلة بعد نجاح الدفع تماماً كالمواقع الكبرى
    cart = [];
    activeCoupon = null;
    document.getElementById('coupon-input').value = '';
    syncCart();
});

// إنهاء العملية والعودة
document.getElementById('finish-checkout').addEventListener('click', () => checkoutOverlay.classList.remove('open'));
document.getElementById('close-wizard').addEventListener('click', () => checkoutOverlay.classList.remove('remove', checkoutOverlay.classList.remove('open')));

// فتح وإغلاق السلة الجانبية
document.getElementById('cart-toggle').addEventListener('click', () => { cartPanel.classList.add('open'); backdrop.classList.add('show'); });
document.getElementById('close-cart').addEventListener('click', () => { cartPanel.classList.remove('open'); backdrop.classList.remove('show'); });
backdrop.addEventListener('click', () => { cartPanel.classList.remove('open'); backdrop.classList.remove('show'); });

// قائمة الهمبرغر للموبايل والتابلت
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navOverlay = document.getElementById('nav-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

// مزامنة البحث في الموبايل والديسكتوب
const searchDesktop = document.getElementById('search-input-desktop');
const searchMobile = document.getElementById('search-input');

function handleSearch(term) {
    const t = term.toLowerCase();
    renderProducts(dbProducts.filter(p => p.title.toLowerCase().includes(t)));
}

if (searchDesktop) searchDesktop.addEventListener('input', e => handleSearch(e.target.value));
if (searchMobile) searchMobile.addEventListener('input', e => handleSearch(e.target.value));

// الإقلاع الأول عند التحميل
document.addEventListener('DOMContentLoaded', () => { renderProducts(dbProducts); syncCart(); });