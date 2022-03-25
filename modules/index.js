
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, push, get } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

let id;


export async function newGame() {
  id = getCookie('id');
  
  var pathlist = await get(child(reference, 'blacklist'));
  var list = pathlist.val();
  for(var i = 0; i < list.length; i++) {
    if(list[i] === id) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  }
  
  var games = get(child(reference, 'TotalGamesPlayed')).then((snapshot) => {
    var temp = snapshot.val();
    set(game, temp+1);
  });

  var breh = get(child(reference, dat)).then((snapshot) => {
    var temp = snapshot.val();
    set(logs, temp+1);
  });
  
  // let id = getCookie('id');
  if(id == '') {
    setCookie('id', createID(), 365);
  }
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
          set(leaderboard, temp);
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

//export async function 

export async function updateName() {
  var bruhBoard = await getBoard();
  var id = getCookie("id");
  console.log(bruhBoard);
  console.log(id);
  for(var i = 0; i < bruhBoard.length; i++) {
    highScoreEvent();
    if(bruhBoard[i].id === id) {
      bruhBoard[i].name = getCookie('name');
      set(leaderboard, bruhBoard);
    }
  }
  await getBoard();
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
  for(var i = 0; i < 20; i++) {
    b.push({name: '', score: 0, id: 'aaa000'});
  }
  set(leaderboard, b);
}


export async function blacklistUser() {
  var pathlist = await get(child(reference, 'blacklist'));
  var list = pathlist.val();
  list.push(getCookie('id'));
  set(blacklist, list);
  clearCookies();
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


  // var breh = get(child(reference, dat)).then((snapshot)=> {
  //   var temp = snapshot.val();
  //   set(logs, temp+1);
  // });
//push(logs,1);

var playPath = 'TotalGamesPlayed';
var bruhDate = dat;
if(window.location.href.includes('repl')) {
  playPath = 'testingGamesPlayed';
  bruhDate = dat + '-testing';
}

var logs = ref(database, bruhDate);

var game = ref(database, playPath);
var leaderboard = ref(database, 'Leaderboard');
var blacklist = ref(database, 'Blacklist');
var dailyBoard = ref(database, dat + '-Leaderboard');

let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m', 'n', 'o', 'p', 'q','r','s','t','u','v','w','x','y','z'];

// let id = getCookie('id');
// if(id == '') {
//   setCookie('id',createID(),365);
// }

// let bruhID = getCookie('id');
// var pathlist = await get(child(reference, 'blacklist'));
// var list = pathlist.val();
// for(var i = 0; i < list.length; i++) {
//   if(list[i] === bruhID) {
//     window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
//   }
// }

// var pathlist = ref(database,'blacklist');
// set(pathlist,[bruhID]);



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