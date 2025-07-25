// Scroll to top on page load
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {
    // Get cart elements
    const cartBtns = document.querySelectorAll('.cart-btn');
    const cartCount = document.querySelectorAll('.cart span');
    const cartItems = document.querySelector('.cart-items');
    const orderItems = document.querySelector('.order-items');
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    const placeOrderBtn = document.getElementById('place-order-btn');

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add item to cart
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        updateCart();
    }

    // Function to update cart
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    // Function to update cart UI
    function updateCartUI() {
        // Update cart count
        cartCount.forEach(count => {
            count.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        });

        // Update cart items display
        if (cartItems) {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price}</p>
                        <div class="quantity-controls">
                            <button onclick="decreaseQuantity('${item.id}')">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="increaseQuantity('${item.id}')">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
        }

        // Update order items display
        if (orderItems) {
            orderItems.innerHTML = '';
            cart.forEach(item => {
                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                orderItems.appendChild(orderItem);
            });
        }
    }

    // Add event listeners to cart buttons
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productBox = this.closest('.product-box');
            const product = {
                id: productBox.dataset.id || Date.now().toString(),
                name: productBox.querySelector('h3').textContent,
                price: parseFloat(productBox.querySelector('.price').textContent.replace('$', '')),
                image: productBox.querySelector('img').src
            };
            addToCart(product);
            alert('Product added to cart!');
        });
    });

    // Add event listeners to checkout buttons
    checkoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Your cart is empty!');
            }
        });
    });

    // Place order functionality
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length > 0) {
                alert('Order placed successfully!');
                cart = [];
                updateCart();
                window.location.href = 'my_orders.html';
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    // Initialize cart UI
    updateCart();

    // Global functions for cart management
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    };

    window.increaseQuantity = function(productId) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += 1;
            updateCart();
        }
    };

    window.decreaseQuantity = function(productId) {
        const item = cart.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            updateCart();
        }
    };
});

// Enhanced login function with role checking (using Firebase compat)
async function loginUser(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Get user role from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        let userRole = 'customer'; // default role
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            userRole = userData.role || 'customer';
        }
        
        // Store role in session and localStorage for quick access
        sessionStorage.setItem('userRole', userRole);
        localStorage.setItem('userRole', userRole);
        
        // Redirect based on role
        redirectAfterLogin(userRole);
        
        return { success: true, user, role: userRole };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

// Redirect after successful login
function redirectAfterLogin(role) {
    switch (role) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'vendor':
            window.location.href = 'vendor_dashboard.html';
            break;
        case 'customer':
        default:
            window.location.href = 'customer_dashboard.html';
            break;
    }
}

// Enhanced registration function with role assignment (using Firebase compat)
async function registerUser(email, password, role, additionalData = {}) {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Create user document in Firestore with role
        await firebase.firestore().collection('users').doc(user.uid).set({
            email: user.email,
            role: role,
            createdAt: new Date(),
            ...additionalData
        });
        
        // Store role in session and localStorage
        sessionStorage.setItem('userRole', role);
        localStorage.setItem('userRole', role);
        
        // Redirect based on role
        redirectAfterLogin(role);
        
        return { success: true, user, role };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
}

// Get user role from Firestore (using Firebase compat)
async function getUserRole(userId) {
    try {
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data().role || 'customer';
        }
        return 'customer';
    } catch (error) {
        console.error('Error getting user role:', error);
        return 'customer';
    }
}

// Export functions for use in other files
window.loginUser = loginUser;
window.registerUser = registerUser;
window.getUserRole = getUserRole;

// Enhanced login function with role checking
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Get user role from Firestore
        const userRole = await getUserRole(user.uid);
        
        // Store role in session for quick access
        sessionStorage.setItem('userRole', userRole);
        
        // Redirect based on role
        redirectAfterLogin(userRole);
        
        return { success: true, user, role: userRole };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
}