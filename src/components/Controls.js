import React from 'react';


function Controls(props) {

  return (
    <React.Fragment>
      <button onClick={props.start}>start</button>
      <button onClick={props.stop}>stop</button>
      <p>VOLUME<input type="range" min="0" max="35" defaultValue="18" className="slider" id="volume"/></p>
      <p>DLY LVL<input type="range" min="0" max="100" defaultValue="0" className="slider" id="delayLevel"/></p> 
      <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filterCutoff"/></p>
      <p>BPM<input type="range" min="20" max="250" defaultValue="90" className="slider" id="bpmCount"/></p>
    </React.Fragment>
  )
}

export default Controls;