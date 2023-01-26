
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, push, get } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

let id;
let uid;



export async function newGame() {
  id = getCookie('id');
  
  if(getCookie('name') != "" && getCookie('name').length < 3) setCookie('name', '', 0);
  get(child(reference, 'test')).then((snapshot) => {
    const temp = snapshot.val();
    let count = 0;
    for(let k of Object.keys(temp)) {
      if(temp[k].name) count ++;
    }
    print("Total Users: " + count);
  });
  get(child(reference, 'Leaderboard')).then((snapshot) => {
    var temp = snapshot.val();
    for(let i = 0; i < temp.length; i ++) {
      const name = temp[i] ? temp[i].name : false;
      if(!name || name == "" || name == " " || temp[i].name.length < 3 || temp[i].name.length > 20) {
        temp.splice(i, 1);
        temp.push({name: '', score: 0, id: 'aaa000'});
      }
    }
    // for(let i = 0; i < 50; i ++) {
    //     temp.push({name: '', score: 0, id: 'aaa000'});
    // }
    set(leaderboard, temp);
  });
  
  var pathlist = await get(child(reference, 'blacklist'));
  var list = pathlist.val();
  for(var i = 0; i < list.length; i++) {
    if(list[i] === id) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      
      return;
    }
  }
  
  var games = get(child(reference, 'TotalGamesPlayed')).then((snapshot) => {
    var temp = snapshot.val();
    set(game, temp+1);
  });

  var breh = get(child(reference, dat)).then((snapshot) => {
    if(window.location.href.includes('repl')) return;
    var temp = snapshot.val();
    set(logs, temp+1);
  });
  
  if(id == '') {
    setCookie('id', createID(), 365);
  }

  highScoreEvent();
}


export function highScoreEvent() {
  var high = parseInt(getCookie("maxScore"));
  var id = getCookie("id");

  if(high && high%4 != 0) {
    setCookie("maxScore", 0, 0);
    addBlacklist(id);
    return;
  }
  
  var test = ref(database, 'test/'+uid);
  set(test, {
      id: id,
      name: getCookie('name'),
      score: high
  })
  
  var board = get(child(reference, 'Leaderboard')).then((snapshot) => {
    var temp = snapshot.val();
    
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

export async function updateName() {
  var bruhBoard = await getBoard();
  var id = getCookie("id");
  
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

export async function addBlacklist(name) {
  if(!name) return;
  var snapshot = await get(child(reference, 'blacklist'));
  var list = snapshot.val();
  list.push(name);
  set(ref(database, 'blacklist'), list);

  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  
}

export async function removePlayer(index) {
  var board = await get(child(reference,'Leaderboard'));
  var board = board.val();
  board.splice(index, 1);
  board.push({name: '', score: 0, id: 'bru000'});
  set(leaderboard,board);
  console.log('done');
}




export function resetBoard() {
  var b = [];
  for(var i = 0; i < 20; i++) {
    b.push({name: '', score: 0, id: 'aaa000'});
  }
  set(leaderboard, b);
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

var loadedID = false;



const auth = getAuth(app);
signInAnonymously(auth);
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
    loadedID = true;
  } else {
    console.log(auth.currentUser);
  }
});

var date = new Date();
var month = date.getMonth().toString();
var day = date.getDate().toString();
var dat = month + '-' + day;



var playPath = 'TotalGamesPlayed';
var bruhDate = dat;
// if(window.location.href.includes('repl')) {
//   playPath = 'testingGamesPlayed';
//   bruhDate = dat + '-testing';
// }

var logs = ref(database, bruhDate);
var hourLog = ref(database, bruhDate + " hours");

var game = ref(database, playPath);
var leaderboard = ref(database, 'Leaderboard');
var dailyBoard = ref(database, dat + '-Leaderboard');

let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];



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

export async function leaderBoardChecker() {
  if (!loadedID) {
    return;
  }
  
  var high = parseInt(getCookie("maxScore"));
  var id = getCookie("id");

  if(high%4 != 0) {
    setCookie("maxScore", 0, 0);
    addBlacklist(id);
    return;
  }

  var board = await get(child(reference,'Leaderboard'));
  board = board.val();

  console.log(board[uid]);
}