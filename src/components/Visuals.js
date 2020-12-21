
export function borderLight(id,active,decay) {  
  const borderGlow = document.getElementById(`gb${id}`);
  const originalColor = borderGlow.getAttribute("fill");
  if (active) {
    borderGlow.setAttribute("fill", "white");
  } else {
    borderGlow.setAttribute("fill", "#525252");
  }  
  setTimeout(function() {    
    borderGlow.setAttribute("fill", originalColor)
  }, decay*75);
}

export function starLight(id,active,decay) {  
  const starGlow = document.getElementById(`gs${id}`);  
  const originalColor = starGlow.getAttribute("fill");
  if (active) {
    starGlow.setAttribute("fill", "white");
  } else {
    starGlow.setAttribute("fill", "#525252");
  }
  setTimeout(function() {    
    starGlow.setAttribute("fill", originalColor)   
  }, decay*75);
}