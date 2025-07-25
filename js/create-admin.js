// Utility script to create initial admin user
// Run this once to create your admin account

import { auth, db } from './firebase-init.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function createAdminUser() {
    const adminEmail = 'admin@sokofreshi.com'; // Change this to your desired admin email
    const adminPassword = 'admin123'; // Change this to a secure password
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
        const user = userCredential.user;
        
        // Create admin document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: 'admin',
            createdAt: new Date(),
            isAdmin: true
        });
        
        console.log('Admin user created successfully!');
        alert('Admin user created successfully!');
    } catch (error) {
        console.error('Error creating admin user:', error);
        alert('Error creating admin user: ' + error.message);
    }
}

// Uncomment the line below and run this script once to create admin user
// createAdminUser();

window.createAdminUser = createAdminUser;