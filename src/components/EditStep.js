import React from 'react';

function EditStep(props) {

  

  const id = props.stepId;

  // window.onLoad = function () {
  //   const slider = document.getElementById("noteSlider")
  //   console.log(slider)
  // }


  return (
    <React.Fragment>
      {/* <p>EDIT STEP</p> */}
      <p>NOTE<input type="range" min="1" max="7" defaultValue="1" className="slider" id="noteSlider"/></p>
      <button onClick={() => props.toggleStep(id)}>ACTIVATE</button>
    </React.Fragment>    
  )
}

export default EditStep;