import React from 'react';

function EditStep(props) {  

  const id = props.stepId;

  let buttonText = "ACTIVATE!";
  if (props.currentStep.active) {
    buttonText = "DEACTIVATE!"
  }

  return (
    <div className="editBox">
      <div className="synthControls">
        <p>EDIT STEP: {id.toUpperCase()}</p>
        <p>NOTE<input type="range" min="1" max="7" defaultValue="1" className="slider" id="noteSlider"/></p>
        <button onClick={() => props.toggleStep(id)}>{buttonText}</button>
        <button onClick={() => props.editStep(id)}>CLOSE (x)</button>
        {/* <div onKeyPress={() => props.toggleStep(id)}></div> */}
      </div>
    </div>      
  )  
}

export default EditStep;  