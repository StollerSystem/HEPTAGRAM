import React from 'react';

function EditStep(props) {

  

  const id = props.stepId;

  // window.onLoad = function () {
  //   const slider = document.getElementById("noteSlider")
  //   console.log(slider)
  // }


  return (
    <React.Fragment>
      <p>EDIT STEP</p>
      <button onClick={() => props.toggleStep(id)}>ACTIVATE</button>
      <p>BPM<input type="range" min="1" max="7" defaultValue="1" className="slider" id="noteSlider"/></p>
    </React.Fragment>    
  )
}

export default EditStep;