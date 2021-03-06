import React from 'react';

function EditStep(props) {  

  const id = props.stepId;

  let buttonText = <i style={{color: "red"}} className="fas fa-toggle-off fa-2x"></i>
  if (props.currentStep.active) {
    buttonText = <i style={{color: "#00d547"}} className="fas fa-toggle-on fa-2x"></i>;
  }

  return (
    <div className="editBox">
      <div  id="editControls">
        <button className="editClose" onClick={() => props.editStep(id)}><i className="far fa-window-close fa-2x"></i></button>
        <p><u><strong>EDITING STEP: {id.toUpperCase()}</strong></u></p>
        <p>PITCH<input type="range" min="1" max="7" value={props.currentStep.note} className="slider" id="noteSlider" 
        onChange={props.changeNote}/></p>
        <p>TURN STEP ON/OFF</p>    
        <button className="stepButton" onClick={() => props.toggleStep(id)}>{buttonText}</button>        
      </div>
    </div>      
  )  
}

export default EditStep;  