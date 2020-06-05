var darkMode=false;

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
  darkMode=!darkMode; 
  
 
}
function keepMode()
{ var element = document.body;

  if(darkMode)
  {
    element.classList.add("dark-mode");
  }
  else {element.classList.remove("dark-mode");}
  darkMode=!darkMode;
   
}


window.onload = _ =>
  keepMode();