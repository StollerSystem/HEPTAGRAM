// import React from 'react';


export function BorderLight(id) {
  console.log("border light")
  const borderGlow = document.getElementById(`gb${id}`);
  const originalColor = borderGlow.getAttribute("fill");
  borderGlow.setAttribute("fill", "white");
  setTimeout(function() {    
    borderGlow.setAttribute("fill", originalColor)
  }, 200);
}