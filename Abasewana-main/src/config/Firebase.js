import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, Firestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB97jHR-sjepvJxLV-n0lzBqT_4kmHXejc',
  authDomain: 'ambasewana-37141.firebaseapp.com',
  projectId: 'ambasewana-37141',
  storageBucket: 'ambasewana-37141.appspot.com',
  messagingSenderId: '1038432371948',
  appId: '1:1038432371948:web:e7153167b464f0d2c351c9',
  measurementId: 'G-CK00066159',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

// export const createUserDocument = async (user, userFirstName, userLastName) => {
//     if (!user) return;

//     const userRef = doc(db, 'users', user.uid);
//     const snapshot = await getDoc(userRef);

//     if (!snapshot.exists()) {
//         const { email } = user;

//         try {
//             await addDoc(userRef, {
//                 email,
//                 firstName: userFirstName,
//                 lastName: userLastName,
//             });

//             await updateProfile(auth.currentUser, {
//                 displayName: userFirstName, // Set the username
//             });

//             console.log('User document created successfully');
//         } catch (error) {
//             console.error('Error creating user document:', error);
//         }
//     }
// };
