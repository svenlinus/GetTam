document.addEventListener('DOMContentLoaded', function () {
	update_fonts();
	let r = document.querySelector(':root');
  if(getCookie('id') == "ucj285" || getCookie('name') == "carson")
    r.style.setProperty('--popDisplay', 'block');
})

let mobile = false;
// Link of website
let link = window.location.href;
// Copies link to clipboard.
function copy_link() {
	navigator.clipboard.writeText(link);
	$.notify("Copied to your clipboard", "success");
}

// Resizes things depending on phone/computer
function update_fonts() {

  if (navigator.userAgent.match(/Android/i) //I copied this if statement from https://redstapler.co/detect-mobile-device-with-javascript/
    || navigator.userAgent.match(/webOS/i) //This if statment is true if the website is being run in a mobile browser
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
    //Sets the font-size of the page if on mobile
    mobile = true;
  	let r = document.querySelector(':root');
  
  	r.style.setProperty('--smallFontSize', '24pt');
  	r.style.setProperty('--scoreFontSize', '24pt');
  	r.style.setProperty('--pFontSize', '20pt');
  	// document.getElementById('first-intro-p').innerHTML = '<button class="btn" onClick="setup()">Restart</button>';
	// r.style.setProperty('--width', '700px');
  } else {
    //Sets the font-size of the page if not on mobile
    
  }
}

//const highScore = new Event("highScore");

// Call to update the score on the page.
// Will update high score too and manage
// High score.
function update_score(current_score) {
  if(current_score > 0 && !check(current_score)) return;
	let max_score_string = getCookie('maxScore')
	let max_score = parseInt(max_score_string);
	if (max_score_string == ''
		|| max_score < current_score) {
		max_score = current_score;
		setCookie('maxScore', current_score, 360);
    // document.dispatchEvent(highScore);
	}
	document.getElementById('score-holder').innerHTML = current_score;
	document.getElementById('max-score-holder').innerHTML = max_score;
  // console.log(current_score > board.maxScore());
  // if(current_score > board.maxScore()) {
  //   console.log(current_score-pscore);
  //   console.log(keyCode);
  //   table(board.rows);
  //   noLoop();
  // }
  //document.dispatchEvent(highScore);
}

var school_list = [
	"TamisCal",
	"Marin Academy",
	"San Marin",
	"Terra Linda",
	"Redwood",
	"Novato",
	"Archie Williams",
	"Marin Catholic",
	"San Rafael",
	"Branson",
	"Tamalpais",
  "JC Farr"
]



// Enter current school (int). Displays current school and max school.
function update_school(current_school) {
	let max_school_string = getCookie('maxSchool');
	let max_school = parseInt(max_school_string)
	if (max_school_string == ''
		|| max_school < current_school || isNaN(max_school)) {
		max_school = current_school;
		setCookie('maxSchool', current_school, 360);
	}
	document.getElementById('school-holder').innerHTML = school_list[current_school];
	document.getElementById('max-school-holder').innerHTML = school_list[max_school];
}


// A cookie storing whether or not a user has gotten Tam
// Returns the value of 'gotTam' if no input is specified
function hasWon(won) {
	const got_tam_bool = getCookie('gotTam');
	let got_tam = got_tam_bool == "true";

  if(won == null) return got_tam;
  
  if(got_tam == '' || won != got_tam) {
    got_tam = won;
    setCookie('gotTam', won, 360);
  }

  return got_tam;
}


// Cookie manipulation functions copy and pasted from W3Schools
function setCookie(cname, cvalue, exdays) {
  if(cname == "maxScore" && cvalue > 0) {
    if(!check(cvalue)) return;
  }
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
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

function check(val) {
  if(!started || val%4 != 0 || !checkUpdate() || val > board.maxScore()) {
    document.dispatchEvent(rick);
    return false;
  }
  return true;
}