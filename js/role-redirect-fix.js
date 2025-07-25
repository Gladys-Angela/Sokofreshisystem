// Fixed role-based redirect functionality

// Check user authentication and redirect based on role
function checkAuthAndRedirect() {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            try {
                // Get user role from Firestore
                const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                
                let userRole = 'customer'; // default role
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    userRole = userData.role || 'customer';
                }
                
                // Store role in localStorage for quick access
                localStorage.setItem('userRole', userRole);
                
                // Only redirect if on login pages or explicitly requested
                if (isLoginPage() || window.location.search.includes('redirect=true')) {
                    redirectBasedOnRole(userRole);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        } else {
            // User not authenticated, redirect to login only if on protected pages
            if (isProtectedPage()) {
                window.location.href = 'login.html';
            }
        }
    });
}

// Redirect user based on their role
function redirectBasedOnRole(role) {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (role) {
        case 'admin':
            if (currentPage !== 'admin.html') {
                window.location.href = 'admin.html';
            }
            break;
        case 'vendor':
            if (currentPage !== 'vendor_dashboard.html') {
                window.location.href = 'vendor_dashboard.html';
            }
            break;
        case 'customer':
        default:
            if (isLoginPage()) {
                window.location.href = 'customer_dashboard.html';
            }
            break;
    }
}

// Check if current page is a login page
function isLoginPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const loginPages = ['login.html', 'admin_login.html', 'register.html', 'register_customer.html', 'register_vendor.html', 'login_redirect.html', 'register_redirect.html'];
    return loginPages.includes(currentPage);
}

// Check if current page is a protected page requiring authentication
function isProtectedPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const publicPages = [
        'index.html', 'home.html', 'login.html', 'admin_login.html', 
        'register.html', 'register_customer.html', 'register_vendor.html', 
        'about.html', 'products.html', 'login_redirect.html', 'register_redirect.html'
    ];
    return !publicPages.includes(currentPage) && currentPage !== '';
}

// Get user role from Firestore
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

// Check if user has specific role
async function hasRole(requiredRole) {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userRole = await getUserRole(user.uid);
                resolve(userRole === requiredRole);
            } else {
                resolve(false);
            }
        });
    });
}

// Make functions available globally
window.checkAuthAndRedirect = checkAuthAndRedirect;
window.getUserRole = getUserRole;
window.hasRole = hasRole;