import React from 'react';


function Controls(props) {

  return (
    
    <div className="controlBox">
      <button onClick={props.start}>start</button>
      <button onClick={props.stop}>stop</button>
      <p>BPM<input type="range" min="20" max="250" defaultValue="90" className="slider" id="bpmCount"/></p>
      <div className="synthControls">
        <p>SYNTH 1</p>
        <p>VOLUME<input type="range" min="0" max="35" defaultValue="18" className="slider" id="volume1"/></p>
        <p>DLY LVL<input type="range" min="0" max="100" defaultValue="0" className="slider" id="delayLevel"/></p> 
        <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filterCutoff1"/></p>
      </div>
      <div className="synthControls">
        <p>SYNTH 2</p>
        <p>VOLUME<input type="range" min="0" max="35" defaultValue="18" className="slider" id="volume2"/></p>
        {/* <p>DLY LVL<input type="range" min="0" max="100" defaultValue="0" className="slider" id="delayLevel"/></p>  */}
        <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filterCutoff2"/></p>
      </div>
    
    </div>
  )
}

export default Controls;