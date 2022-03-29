import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUFgXG0owGWVT9O7Hyr3MKjRpRcHfjE4c",
  authDomain: "validation-a2b6e.firebaseapp.com",
  databaseURL: "https://validation-a2b6e-default-rtdb.firebaseio.com",
  projectId: "validation-a2b6e",
  storageBucket: "validation-a2b6e.appspot.com",
  messagingSenderId: "19602312773",
  appId: "1:19602312773:web:9ce15440584d95d5be5d2c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
