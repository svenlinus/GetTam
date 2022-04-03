import { getBoard, highScoreEvent, updateName } from "../modules/index.js";

window.addEventListener("load", loadLeaderboard);

async function loadLeaderboard(b) {
  // IFF no username --> dropdown
  // setCookie( new username ) continue
  // dispatch event highScoreEvent to refresh leaderboard data

  if(!getCookie('name')) dropdown();
  
  const users = await getBoard();
  console.log(users);

  const id = getCookie('id')
  console.log(id);
  
  let table = document.getElementById('table-content');
  
  table.innerHTML = ""
  
  for (let i = 0; i < users.length; i++){
    let htmlclass = "";
    if(users[i].id == id) htmlclass = " class='active-row'";
    const displayName = users[i].name; // || users[i].id;
    var row = "<tr"+htmlclass+"><td>"+(i+1)+"</td><td>"+displayName+"</td><td>"+users[i].score+"</td></tr>"
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
	document.querySelector('body').addEventListener('wheel', preventScroll, {passive: false});
	form.addEventListener("submit", function(event) {
  	event.preventDefault();
		let name = form.elements['playername'].value;
		if (validation(name)) {
			form.style.display = 'none';
			screen_locked = false;
			r.style.setProperty('--formDisplay', 'none');
			document.querySelector('body').removeEventListener('wheel', preventScroll, {passive: false});
			setCookie('name', name, 365);
      updateName().then( loadLeaderboard );
		}
	}, true);
}


function validation(name) {
	if (name.length > 20) {
		alert('Must be less than 20 characters.');
		return false;
	} else if (!containsAnyLetter(name)) {
		alert('Must contain at least one letter.');
		return false;
	}
	return true;
}

function containsAnyLetter(str) {
  // 👇️ using the `i` flag
  return /[a-z]/i.test(str);
}

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}






// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + (exdays*24*60*60*1000));
//   let expires = "expires="+ d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }