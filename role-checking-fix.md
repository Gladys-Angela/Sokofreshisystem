# Role Checking Fix

## What Was Changed
1. Created role-check-register.js that stores user roles in a global localStorage map
2. Created role-check-login.js that checks the selected role against the stored role
3. Updated registration and login pages to use these new scripts

## How It Works
- During registration, the user's email and role are stored in a global map in localStorage
- During login, the selected role is checked against the stored role for that email
- If the roles don't match, the login is rejected with an appropriate error message
- This ensures users can only log in with the role they registered with

## How to Test
1. Register levymax@gmail.com as a customer
2. Try to log in as a vendor with levymax@gmail.com - you should see an error
3. Log in as a customer with levymax@gmail.com - this should work
4. Register a different email as a vendor
5. Try to log in as a customer with that email - you should see an error
6. Log in as a vendor with that email - this should work

## Note
This solution uses localStorage to store user roles, which is not as secure as a server-side database but works well for this scenario. The role map is stored in localStorage under the key 'userRolesMap'.