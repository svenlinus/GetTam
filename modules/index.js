~
// Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getDatabase, ref, set, child, update, remove, push, get } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

export function newGame() {
  var games = get(child(reference, 'TotalGamesPlayed')).then((snapshot)=> {
    var temp = snapshot.val();
    set(game, temp+1);
  });

    var breh = get(child(reference, dat)).then((snapshot)=> {
    var temp = snapshot.val();
    set(logs, temp+1);
  });
  

  let id = getCookie('id');
  if(id == '') {
    setCookie('id', createID(), 365);
  }
  // var path = 'PlayerData/' + getCookie('id');
  // var gamesPlayed = ref(database, 'PlayerData');

  // var data = get(gamesPlayed,getCookie('id')).then((snapshot)=> {
  //   var temp = snapshot.val();
   
  //   console.log(snapshot.val());
  //   var tempRef = ref(database,path);
  //   if(temp === null) {
  //     set(tempRef,1);
  //   }
  //   else {
  //     set(tempRef, temp+1);
  //   }
  // });
  
  //child(reference, path)
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
var reference = ref(database);

var date = new Date();
var month = date.getMonth().toString();
var day = date.getDate().toString();
var dat = month + '-' + day;

var logs = ref(database, dat);

  // var breh = get(child(reference, dat)).then((snapshot)=> {
  //   var temp = snapshot.val();
  //   set(logs, temp+1);
  // });
//push(logs,1);

var game = ref(database, 'TotalGamesPlayed');

let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m', 'n', 'o', 'p', 'q','r','s','t','u','v','w','x','y','z'];

// let id = getCookie('id');
// if(id == '') {
//   setCookie('id',createID(),365);
// }





function createID() {
  var key = randLetter() + (Math.floor(Math.random()*1000)).toString();
  return key;
}

function randLetter() {
  var seq = '';
  for(var i = 0; i < 3; i++) {
    var index = Math.floor(Math.random() * 26);
    seq = seq + letters[index];
  }
  return seq;
}