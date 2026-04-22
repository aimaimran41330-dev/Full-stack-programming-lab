// Global cart array
let cart = [];

// Products data
const products = [
    { id: 1, name: 'iPhone 16 Pro', price: 129999, img: '📱' },
    { id: 2, name: 'MacBook Pro M3', price: 249999, img: '💻' },
    { id: 3, name: 'AirPods Pro 2', price: 34999, img: '🎧' },
    { id: 4, name: 'Apple Watch Ultra', price: 89999, img: '⌚' },
    { id: 5, name: 'iPad Pro M4', price: 179999, img: '📱' },
    { id: 6, name: 'Magic Keyboard', price: 24999, img: '⌨️' }
];

// REST PARAMETER FUNCTION - Add multiple items to cart
function addToCart(...items) {
    console.log('🛒 Using REST operator - Adding items:', items);
    
    // Add items to cart using rest parameters
    cart.push(...items);
    updateCartDisplay();
    
    // Visual feedback
    items.forEach(item => {
        const btn = document.querySelector(`[data-product-id="${item.id}"]`);
        btn.textContent = '✅ Added!';
        btn.classList.add('added');
        setTimeout(() => {
            btn.textContent = `Add to Cart PKR ${item.price.toLocaleString()}`;
            btn.classList.remove('added');
        }, 1500);
    });
    
    return cart;
}

// SPREAD OPERATOR - Clone cart
function cloneCart() {
    const clonedCart = [...cart]; // Spread operator to clone
    console.log('🔄 Using SPREAD operator - Cloned Cart:', clonedCart);
    
    displayClonedCart(clonedCart);
}

// ARRAY DESTRUCTURING
function showDestructuredItems() {
    if (cart.length === 0) {
        alert('Cart is empty! Add some products first.');
        return;
    }
    
    const [firstItem, ...remainingItems] = cart; // Destructuring
    console.log('📦 Using DESTRUCTURING:');
    console.log('First item:', firstItem);
    console.log('Remaining items:', remainingItems);
    
    displayDestructured(firstItem, remainingItems);
}

// Initialize products
function initializeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 15px;">${product.img}</div>
            <h3>${product.name}</h3>
            <div class="product-price">PKR ${product.price.toLocaleString()}</div>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                Add to Cart PKR ${product.price.toLocaleString()}
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Update cart display
function updateCartDisplay() {
    const cartTotalItems = document.getElementById('cartTotalItems');
    const cartInfo = document.getElementById('cartInfo');
    const cartItems = document.getElementById('cartItems');
    
    cartTotalItems.textContent = cart.length;
    
    // Cart Info
    cartInfo.innerHTML = `
        <h3>📊 Cart Statistics</h3>
        <p><strong>Total Items:</strong> ${cart.length}</p>
        <p><strong>Total Value:</strong> PKR ${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</p>
        <p><strong>Average Price:</strong> PKR ${Math.round(cart.reduce((sum, item) => sum + item.price, 0) / cart.length || 0).toLocaleString()}</p>
    `;
    
    // Cart Items List
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.img} ${item.name}</span>
            <span>PKR ${item.price.toLocaleString()}</span>
        </div>
    `).join('');
}

// Display cloned cart
function displayClonedCart(clonedCart) {
    const cartInfo = document.getElementById('cartInfo');
    cartInfo.innerHTML += `
        <div style="margin-top: 20px; padding: 15px; background: rgba(0,184,148,0.2); border-radius: 10px;">
            <h4>🔄 CLONED CART (Spread Operator)</h4>
            <p><strong>Items:</strong> ${clonedCart.length}</p>
            <p><strong>First 3 Items:</strong> ${clonedCart.slice(0,3).map(item => item.name).join(', ')}</p>
        </div>
    `;
}

// Display destructured items
function displayDestructured(firstItem, remainingItems) {
    const cartInfo = document.getElementById('cartInfo');
    cartInfo.innerHTML += `
        <div style="margin-top: 20px; padding: 15px; background: rgba(0,184,148,0.2); border-radius: 10px;">
            <h4>📦 DESTRUCTURED VIEW</h4>
            <p><strong>First Item:</strong> ${firstItem ? firstItem.name : 'None'}</p>
            <p><strong>Remaining Items:</strong> ${remainingItems.length}</p>
            ${remainingItems.slice(0,3).map(item => `<span style="margin-right: 5px;">${item.img}</span>`).join('')}
        </div>
    `;
}

// Clear cart
function clearCart() {
    cart = [];
    document.getElementById('cartInfo').innerHTML = `
        <h3>🛒 Cart is Empty</h3>
        <p>Add some products to get started!</p>
    `;
    document.getElementById('cartItems').innerHTML = '';
    updateCartDisplay();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Animate entrance
    setTimeout(() => {
        document.querySelector('.products-section').classList.add('slide-in');
    }, 500);
    
    initializeProducts();
    updateCartDisplay();
    
    // Product buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.productId);
            const product = products.find(p => p.id === productId);
            addToCart(product); // REST PARAMETER IN ACTION
        }
    });
    
    // Cart buttons
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('cloneCart').addEventListener('click', cloneCart);
    document.getElementById('showDestructured').addEventListener('click', showDestructuredItems);
});
