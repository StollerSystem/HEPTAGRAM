
export function borderLight(id,active,decay,editing) {  
  // console.log(editing)
  const borderGlow = document.getElementById(`gb${id}`);  
  const border = document.getElementById(`b${id}`); 
  if (active) {
    borderGlow.setAttribute("fill", "white");
    border.setAttribute("fill", "#81d09b");
    setTimeout(function() {
      border.setAttribute("fill", "#00d547");
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
  const star = document.getElementById(`s${id}`);  
  if (active) {
    starGlow.setAttribute("fill", "white");
    star.setAttribute("fill", "#81d09b");
    setTimeout(function() {
      star.setAttribute("fill", "#00d547");
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