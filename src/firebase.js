// @ts-ignore
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getDatabase } from "firebase/database";
// @ts-ignore
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    "https://carrot-rad-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "gs://carrot-rad.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
// @ts-ignore
const database = getDatabase(app);
const storage = getStorage(app);
