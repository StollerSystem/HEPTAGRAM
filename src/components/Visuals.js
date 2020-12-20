
export function borderLight(id) {  
  const borderGlow = document.getElementById(`gb${id}`);
  const originalColor = borderGlow.getAttribute("fill");
  borderGlow.setAttribute("fill", "white");
  setTimeout(function() {    
    borderGlow.setAttribute("fill", originalColor)
  }, 200);
}

export function starLight(id) {  
  const starGlow = document.getElementById(`gs${id}`);  
  const originalColor = starGlow.getAttribute("fill");
  starGlow.setAttribute("fill", "white");  
  setTimeout(function() {    
    starGlow.setAttribute("fill", originalColor)   
  }, 200);
}