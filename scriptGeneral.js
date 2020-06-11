
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

/////////////////////////////////////////Change mode
// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode');


const enableDarkMode = () => {

  document.body.classList.add('dark-mode');

  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {

  document.body.classList.remove('dark-mode');
 
  localStorage.setItem('darkMode', null);
}

// If the user already visited and enabled darkMode
// start things off with it on


function changeMode() {

  darkMode = localStorage.getItem('darkMode'); 
  

  if (darkMode !== 'enabled') {
    enableDarkMode();
  
  } else {  
    disableDarkMode(); 
  }
};
///////////////////////Keep checkbox the same after refresh
function check()
{
  var cb=document.getElementsByClassName("slider round");
  if( dark==='enabled')
  {
    document.body.classList.add("input:checked + .slider ");
  }
  else
  {
    document.body.classList.add(".slider:before");
  }
}
window.onload=_=>
 {
   if(darkMode==='enabled')
  {
    enableDarkMode();
    
    
  }
  var elements = document.getElementsByTagName("INPUT");
for (var inp of elements) {
    if (inp.type === "checkbox"&&darkMode==='enabled')
        inp.checked = true;
}
  
  
  
  
}
