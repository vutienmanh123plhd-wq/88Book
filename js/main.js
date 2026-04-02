// ==================== DOM ELEMENTS ====================
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const closeProduct = document.getElementById('closeProduct');
const productModal = document.getElementById('productModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const sortBy = document.getElementById('sortBy');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const userBtn = document.getElementById('userBtn');

// ==================== STATE ====================
let cart = [];
let currentCategory = 'all';
let currentSort = 'newest';
let searchQuery = '';

// ==================== INITIALIZATION ====================
function init() {
    loadCart();
    renderProducts(allBooks);
    setupEventListeners();
}

// ==================== RENDER PRODUCTS ====================
function renderProducts(booksToShow = allBooks) {
    productsGrid.innerHTML = '';
    
    let filteredBooks = booksToShow;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Sort
    filteredBooks = sortBooks(filteredBooks);

    // Render
    if (filteredBooks.length === 0) {
        productsGrid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 40px;">Không tìm thấy sách phù hợp</p>';
        return;
    }

    filteredBooks.forEach(book => {
        const productCard = createProductCard(book);
        productsGrid.appendChild(productCard);
    });
}

// ==================== CREATE PRODUCT CARD ====================
function createProductCard(book) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discount = Math.round(((book.price - book.salePrice) / book.price) * 100);
    
    card.innerHTML = `
        <div class="product-image">${book.icon}</div>
        <div class="product-info">
            <h3 class="product-title">${book.title}</h3>
            <p class="product-author">Tác giả: ${book.author}</p>
            <div class="product-rating">
                <span>${renderStars(book.rating)}</span>
                <span>(${book.reviews} đánh giá)</span>
            </div>
            <p class="product-price">${formatPrice(book.price)}đ</p>
            <p class="product-sale-price">${formatPrice(book.salePrice)}đ</p>
            <div class="product-actions">
                <button class="btn-small btn-add" onclick="addToCart(${book.id})">
                    <i class="fas fa-shopping-cart"></i> Thêm
                </button>
                <button class="btn-small btn-favorite" onclick="toggleFavorite(this)" title="Yêu thích">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            showProductDetail(book);
        }
    });
    
    return card;
}

// ==================== STARS RATING ====================
function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star">★</span>';
    }
    
    if (hasHalf) {
        stars += '<span class="star" style="opacity: 0.5;">★</span>';
    }
    
    for (let i = fullStars + (hasHalf ? 1 : 0); i < 5; i++) {
        stars += '<span class="star" style="opacity: 0.3;">★</span>';
    }
    
    return stars;
}

// ==================== FORMAT PRICE ====================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(Math.floor(price));
}

// ==================== SORT BOOKS ====================
function sortBooks(books) {
    const sorted = [...books];
    
    switch(currentSort) {
        case 'price-asc':
            sorted.sort((a, b) => a.salePrice - b.salePrice);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.salePrice - a.salePrice);
            break;
        case 'popular':
            sorted.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'newest':
        default:
            // Keep original order
            break;
    }
    
    return sorted;
}

// ==================== SHOW PRODUCT DETAIL ====================
function showProductDetail(book) {
    const detail = document.getElementById('productDetail');
    const discount = Math.round(((book.price - book.salePrice) / book.price) * 100);
    
    detail.innerHTML = `
        <div class="detail-image">${book.icon}</div>
        <div class="detail-info">
            <h2>${book.title}</h2>
            <p class="detail-author">Tác giả: ${book.author}</p>
            <div class="detail-rating">
                ${renderStars(book.rating)}
                (${book.reviews} đánh giá)
            </div>
            <div class="detail-price-section">
                <span class="detail-price-old">${formatPrice(book.price)}đ</span>
                <span class="detail-price">${formatPrice(book.salePrice)}đ</span>
                <span style="color: var(--danger-color); font-weight: bold;"> (-${discount}%)</span>
            </div>
            <p class="detail-description">
                ${book.description}
            </p>
            <div class="detail-actions">
                <button class="btn btn-primary" onclick="addToCart(${book.id})">
                    <i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                </button>
                <button class="btn btn-secondary" onclick="toggleFavorite()">
                    <i class="far fa-heart"></i> Yêu thích
                </button>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
}

// ==================== CART FUNCTIONS ====================
function addToCart(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Show notification
    showNotification('Đã thêm vào giỏ hàng!');
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    updateCartUI();
}

function updateCartQuantity(bookId, quantity) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(bookId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Giỏ hàng trống</p>';
        cartTotal.textContent = '0đ';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const itemTotal = item.salePrice * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${formatPrice(item.salePrice)}đ x ${item.quantity}</div>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Xóa</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = formatPrice(total) + 'đ';
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Cart
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    closeProduct.addEventListener('click', () => {
        productModal.classList.remove('active');
    });
    
    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });
    
    // Sort
    sortBy.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });
    
    // Search
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // User button
    userBtn.addEventListener('click', () => {
        alert('Tính năng đăng nhập/đăng ký sẽ được cập nhật sớm!');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });
}

function performSearch() {
    searchQuery = searchInput.value;
    renderProducts();
}

// ==================== TOGGLE FAVORITE ====================
function toggleFavorite(btn) {
    if (btn) {
        btn.classList.toggle('favorite');
        if (btn.classList.contains('favorite')) {
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            showNotification('Đã thêm vào yêu thích!');
        } else {
            btn.innerHTML = '<i class="far fa-heart"></i>';
            showNotification('Đã xóa khỏi yêu thích!');
        }
    }
}

// ==================== NOTIFICATION ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== START APP ====================
document.addEventListener('DOMContentLoaded', init);
