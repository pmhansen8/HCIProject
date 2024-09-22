import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database'

// Your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase only if there are no apps already initialized

firebase.initializeApp(firebaseConfig);


// Export Firebase services
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();

export { auth, storage, database };
