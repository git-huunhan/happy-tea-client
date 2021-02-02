import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFWdDx5pW9-BBGLgqWYNMREsCkJ2ED3UY",
  authDomain: "happy-tea-1a89b.firebaseapp.com",
  projectId: "happy-tea-1a89b",
  storageBucket: "happy-tea-1a89b.appspot.com",
  messagingSenderId: "54664585445",
  appId: "1:54664585445:web:09d7b1e1f30fa59a3ff40c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();