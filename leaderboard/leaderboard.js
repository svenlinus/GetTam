import { getBoard, highScoreEvent, updateName } from "../modules/index.js";

window.addEventListener("load", loadLeaderboard);

async function loadLeaderboard(b) {
  // IFF no username --> dropdown
  // setCookie( new username ) continue
  // dispatch event highScoreEvent to refresh leaderboard data

  if (!getCookie('name')) dropdown();

  const users = await getBoard();

  const id = getCookie('id')

  let table = document.getElementById('table-content');

  table.innerHTML = ""

  for (let i = 0; i < 250; i++) {
    let htmlclass = "";
    if (users[i].id == id) htmlclass = " class='active-row'";
    const displayName = users[i].name; // || users[i].id;
    var row = "<tr" + htmlclass + "><td>" + (i + 1) + "</td><td>" + displayName + "</td><td>" + users[i].score + "</td></tr>"
    table.innerHTML += row
  }

}





let screen_locked = false;

function dropdown(end_func) {
  // Set up form
  let r = document.querySelector(':root');
  r.style.setProperty('--formDisplay', 'block');
  screen_locked = true;
  let form = document.querySelector('#username-form');
  form.style.display = 'block';
  document.getElementById('autofocus').focus();
  screen_locked = true;
  document.querySelector('body').addEventListener('wheel', preventScroll, { passive: false });
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = form.elements['playername'].value.trim();
    
    if (validation(name)) {
      form.style.display = 'none';
      screen_locked = false;
      r.style.setProperty('--formDisplay', 'none');
      document.querySelector('body').removeEventListener('wheel', preventScroll, { passive: false });
      setCookie('name', name, 365);
      updateName().then(loadLeaderboard);
    }
  }, true);
}


function validation(name) {
  if (name.length > 20) {
    alert('Name must be less than 20 characters.');
    return false;
  } if (name.length < 3) {
    alert('Name must be at least 3 characters');
    return false;
  } if (!containsAnyLetter(name)) {
    alert('Name must contain at least one letter.');
    return false;
  }
  return true;
}

function containsAnyLetter(str) {
  // 👇️ using the `i` flag
  return /[a-z]/i.test(str);
}

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  return false;
}
