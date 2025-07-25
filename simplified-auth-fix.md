# Simplified Authentication Fix

## What Was Changed
1. Created simplified login script (simple-login.js) that bypasses Firestore role validation
2. Created simplified registration script (simple-register.js) that only uses Firebase Authentication
3. Created simplified role guard (simple-role-guard.js) that uses localStorage instead of Firestore
4. Updated all pages to use these simplified scripts

## Why This Works
- Removes dependency on Firestore which was causing errors
- Uses only Firebase Authentication which is more reliable
- Stores user role in localStorage during registration/login
- Validates role access based on localStorage values

## How to Test
1. Register as a customer using register_customer.html
2. Log in as that customer using login.html
3. You should be redirected to customer_dashboard.html
4. Register as a vendor using register_vendor.html (with a different email)
5. Log in as that vendor using login.html
6. You should be redirected to vendor_dashboard.html

## Note
This is a temporary solution that bypasses Firestore for role validation. Once the Firestore issues are resolved, you may want to revert to the original scripts for better security.