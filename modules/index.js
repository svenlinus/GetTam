
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, push, get } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

export function newGame() {
  var games = get(child(reference, 'TotalGamesPlayed')).then((snapshot) => {
    var temp = snapshot.val();
    set(game, temp+1);
  });

  var breh = get(child(reference, dat)).then((snapshot) => {
    var temp = snapshot.val();
    set(logs, temp+1);
  });
  

  let id = getCookie('id');
  if(id == '') {
    setCookie('id', createID(), 365);
  }
  // var path = 'PlayerData/' + getCookie('id');
  // var gamesPlayed = ref(database, path);

  // var data = get(reference,path).then((snapshot)=> {
  //   var temp = snapshot.val();
   
  //   console.log(snapshot.val().PlayerData);
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

export function highScoreEvent() {
  
  var board = get(child(reference, 'Leaderboard')).then((snapshot) => {
    var temp = snapshot.val();
  
    var high = parseInt(getCookie("maxScore"));
    var id = getCookie("id");

    //sortBoard(temp,high,leaderboard);
    var index;
    if(high > temp[temp.length-1].score) {
      for(var i = 0; i < temp.length; i++) {
        if(id == temp[i].id && high > temp[i].score) {
          temp.splice(i, 1);    
          for(var j = i; j >= 0; j--) {
            if(temp[j].score > high) {
              temp.splice(j+1, 0, {name: getCookie('name'), id: id, score: high});
              break;
            }
            else if(j === 0) {
              temp.splice(0, 0, {name: getCookie('name'), id: id, score: high});
            }
          }
          set(leaderboard,temp);
          return;
        } 
        if(id == temp[i].id && high < temp[i].score) return;
      }
      for(var i = temp.length-2; i >= 0; i--) {
        if(id == temp[i].id) return;
        if(temp[i].score > high) {
          index = i+1;
          break;
        }
        else if(i === 0) {
          index = 0;
        }
      }
      var newBoard = [];
      
      for(var i = 0; i < temp.length; i++) {
        if(i === index) {
          newBoard.push({
            name: getCookie('name'),
            score: high,
            id: getCookie('id')
            });
        }
        newBoard.push(temp[i]);
      }
      newBoard.pop();
      set(leaderboard, newBoard);
    }

  });
}



export async function getBoard() {
  var board = await get(child(reference, 'Leaderboard'))
  return board.val();
}

function checkDailyBoard() {
  var bibson = get(child(reference, dat+'-Leaderboard')).then((snapshot) => {
    var temp = snapshot.val();
    
  });
}

export function resetBoard() {
  var b = [];
  for(var i = 0; i < 10; i++) {
    b.push({name: 'Brah', score: 0, id: 'aaa000'});
  }
  set(leaderboard, b);
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
var leaderboard = ref(database, 'Leaderboard');
var dailyBoard = ref(database, dat + '-Leaderboard');

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