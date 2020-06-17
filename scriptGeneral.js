
// DISAPEARING HEADER
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
var animationPosition = document.getElementById("animation_container").offsetTop;

if(currentScrollPos<animationPosition-100)
{
document.getElementById("leftButton").style.top = "0";
}
else{
  document.getElementById("leftButton").style.top="-1024px";
}
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header_container").style.top = "0";
    
  } else {
    document.getElementById("header_container").style.top = "-1024px";
  }
  prevScrollpos = currentScrollPos;
}
// make arrow follow scroll



/////////////////////////////////////////Change mode
// check for saved 'darkMode' in localStorage
let lightMode = localStorage.getItem('lightMode');


const enableLightMode = () => {

  document.body.classList.add('dark-off');

  localStorage.setItem('lightMode', 'enabled');
}

const disableLightMode = () => {

  document.body.classList.remove('dark-off');
 
  localStorage.setItem('lightMode', null);
}




function changeMode() {

  lightMode = localStorage.getItem('lightMode'); 
  

  if (lightMode !== 'enabled') {
    enableLightMode();
  
  } else {  
    disableLightMode(); 
  }
};
///////////////////////Keep checkbox the same after refresh

window.onload=_=>
 {
   if(lightMode==='enabled')
  {
    enableLightMode();
    
    
  }
  var elements = document.getElementsByTagName("INPUT");
for (var inp of elements) {
    if (inp.type === "checkbox"&&lightMode==='enabled')
        inp.checked = false;

    else{
      inp.checked=true;
    }
}
  
  
  
  
}
