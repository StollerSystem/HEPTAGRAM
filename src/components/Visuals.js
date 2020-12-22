
export function borderLight(id,active,decay,editing) {  
  // console.log(editing)
  const borderGlow = document.getElementById(`gb${id}`);  
  if (active) {
    borderGlow.setAttribute("fill", "white");
    setTimeout(function() {
      if (editing === `b${id}`) {        
        borderGlow.setAttribute("fill", "#009f94");
      } else {
        borderGlow.setAttribute("fill", "#00d547");
      };
      }, decay*75);
  } else {
    borderGlow.setAttribute("fill", "#525252");
    setTimeout(function() {
      if (editing === `b${id}`) {        
        borderGlow.setAttribute("fill", "#009f94");
      } else {
        borderGlow.setAttribute("fill", "black");
      };
    }, decay*75);
  };   
};

export function starLight(id,active,decay,editing) {  
  const starGlow = document.getElementById(`gs${id}`);   
  if (active) {
    starGlow.setAttribute("fill", "white");
    setTimeout(function() {
      if (editing === `s${id}`) {        
        starGlow.setAttribute("fill", "#009f94");
      } else {
        starGlow.setAttribute("fill", "#00d547");
      };
    }, decay*75);
  } else {
    starGlow.setAttribute("fill", "#525252");
    setTimeout(function() {    
      if (editing === `s${id}`) {        
        starGlow.setAttribute("fill", "#009f94");
      } else {
        starGlow.setAttribute("fill", "black");
      };
    }, decay*75);
  }; 
};