
// Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getDatabase, ref, set, child, update, remove, push } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

export function newGame() {
  push(game,1);
}

export function printBruh() {
  console.log("bruh2");
}


const firebaseConfig = {
  apiKey: "AIzaSyBQp9ljmUgP1ZuxcaGaY3KJHb8h9GGRlS8",
  authDomain: "get-tam.firebaseapp.com",
  projectId: "get-tam",
  storageBucket: "get-tam.appspot.com",
  messagingSenderId: "8679519646",
  appId: "1:8679519646:web:85204f21b7074c3bd1528f",
  measurementId: "G-ZQYL5YN5TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var database = getDatabase(app);
var logs = ref(database, 'Mar17');


push(logs,1);

var game = ref(database, 'gamesPlayed');





