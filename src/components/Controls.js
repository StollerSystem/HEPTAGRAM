import React from 'react';


function Controls(props) {

  return (
    
    <div className="controlBox">
      <button onClick={props.start}>start</button>
      <button onClick={props.stop}>stop</button>
      <p>BPM<input type="range" min="20" max="250" defaultValue="90" className="slider" id="bpmCount"/></p>
      <p>DLY LVL<input type="range" min="0" max="100" defaultValue="0" className="slider" id="delayLevel"/></p> 
      <div className="synthControls">
        <p>SYNTH 1</p>
        <p>OCTAVE<input type="range" min="1" max="5" defaultValue="3" className="slider" id="octave1"/></p>
        <p>VOLUME<input type="range" min="0" max="35" defaultValue="18" className="slider" id="volume1"/></p>
        <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filterCutoff1"/></p>
      </div>
      <div className="synthControls">
        <p>SYNTH 2</p>
        <p>OCTAVE<input type="range" min="1" max="5" defaultValue="2" className="slider" id="octave2"/></p>
        <p>VOLUME<input type="range" min="0" max="35" defaultValue="18" className="slider" id="volume2"/></p>        
        <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filterCutoff2"/></p>
      </div>
    
    </div>
  )
}

export default Controls;