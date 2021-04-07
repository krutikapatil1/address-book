import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDazjs2QaP61mx65NtyuDY2VK3RrfVwJA8",
    authDomain: "address-book-8ed35.firebaseapp.com",
    projectId: "address-book-8ed35",
    storageBucket: "address-book-8ed35.appspot.com",
    messagingSenderId: "651566836760",
    appId: "1:651566836760:web:f733f2fa0c110ee257e76d"
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init firestore service
const projectFirestore = firebase.firestore();

export { projectFirestore }