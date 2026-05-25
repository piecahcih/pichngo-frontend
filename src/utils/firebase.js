import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNdQ6k-XtppQXP_Fkx3-rWd4X5TSkjAm8",
  authDomain: "pichngo-42e23.firebaseapp.com",
  projectId: "pichngo-42e23",
  storageBucket: "pichngo-42e23.firebasestorage.app",
  messagingSenderId: "862057125303",
  appId: "1:862057125303:web:bfc8e8607b850b4dc14432",
  measurementId: "G-1X42DDF93N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()