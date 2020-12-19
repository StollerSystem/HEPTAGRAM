import React from 'react';

function EditStep(props) {  

  const id = props.stepId;

  let buttonText = "ACTIVATE! (space)";
  if (props.currentStep.active) {
    buttonText = "DEACTIVATE! (space)"
  }

  return (
    <div className="editBox">
      <p>EDIT STEP: {id.toUpperCase()}</p>
      <p>NOTE<input type="range" min="1" max="7" defaultValue="1" className="slider" id="noteSlider"/></p>
      <button onClick={() => props.toggleStep(id)}>{buttonText}</button>
      <button onClick={() => props.editStep(id)}>CLOSE (x)</button>
      {/* <div onKeyPress={() => props.toggleStep(id)}></div> */}
    </div>      
  )  
}

export default EditStep;  