
// DISAPEARING HEADER
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header_container").style.top = "0";
  } else {
    document.getElementById("header_container").style.top = "-1024px";
  }
  prevScrollpos = currentScrollPos;
}

//Change mode
function changeMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");  
}

