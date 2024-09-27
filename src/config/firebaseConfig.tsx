import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCwrSLagdZF-JPNJi9ZnNhMefvVq4OO7mY",
  authDomain: "productsnature-d9c1e.firebaseapp.com",
  projectId: "productsnature-d9c1e",
  storageBucket: "productsnature-d9c1e.appspot.com",
  messagingSenderId: "511930493346",
  appId: "1:511930493346:web:dc5e80c3470b556b842afb",
  databaseURL: "https://productsnature-d9c1e-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const dbRealTime = getDatabase(firebase);
