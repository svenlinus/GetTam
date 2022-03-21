window.addEventListener("click", function(){
  this.location.href="./index.html";
})
window.addEventListener('touchstart', function (event){
    switch(event.touches.length) {
        case 1:
            this.location.href="./index.html";
        default:
          return;
    }
}, false);