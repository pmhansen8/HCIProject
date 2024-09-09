import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database'

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEUXWVfQxkp9gGuRfemQj3GVONh4Z9lk4",
    authDomain: "hciproject-49e87.firebaseapp.com",
    projectId: "hciproject-49e87",
    storageBucket: "hciproject-49e87.appspot.com",
    messagingSenderId: "826847451620",
    appId: "1:826847451620:web:c6745e7eb1f685d6d40ff1",
    measurementId: "G-FHYVL37L8M"
};

// Initialize Firebase only if there are no apps already initialized

firebase.initializeApp(firebaseConfig);


// Export Firebase services
const auth = firebase.auth();
const storage = firebase.storage();

const database = firebase.database();

export { auth, storage, database };
