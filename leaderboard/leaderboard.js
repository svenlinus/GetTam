import { getBoard } from "../modules/index.js";

window.addEventListener("load", loadLeaderboard);

async function loadLeaderboard() {
  // IFF no username --> dropdown
  // setCookie( new username ) continue
  // dispatch event highScoreEvent to refresh leaderboard data

  const users = await getBoard();
  console.log(users);

  const id = getCookie('id')
  console.log(id);
  
  let table = document.getElementById('table-content')
  
  for (let i = 0; i < users.length; i++){
    let htmlclass = "";
    if(users[i].id == id) htmlclass = " class='active-row'";
    var row = "<tr"+htmlclass+"><td>"+(i+1)+"</td><td>"+users[i].id+"</td><td>"+users[i].score+"</td></tr>"
    table.innerHTML += row
  }
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  // const users = [
  //   {name: "AubsNob", score: 20200},
  //   {name: "Linus", score: 20156},
  //   {name: "Joe Fosty", score: 20120},
  //   {name: "Jake", score: 20111},
  //   {name: "Nattybumpo", score: 20056},
  // ];

let screen_locked = false;

function dropdown(end_func) {
  // textSize(40pt);
  // textWidth("string") --> pixel length
	// Must be < 25 

	// Set up form
	screen_locked = true;
	let form = document.querySelector('#username-form');
	form.style.display = 'block';
	docuemnt.getElementById('autofocus').autofocus = true;
	form.addEventListener("submit", function(event) {
  		event.preventDefault();
		document.querySelector('body').innerHTML = form.elements['playername'].value;
		console.log('lllll');
		console.log(form.elements['playername'] + 'lll');
		form.style.display = 'none';
	}, true);
}

function submitted(event) {
	// Check
	// If not right, send back to user
	// If so call end_func
	console.log('lllll');
	return true;
}

dropdown();