import React from 'react';


function Controls(props) {

  return (
    <React.Fragment>
      <button onClick={props.start}>start</button>
      <button onClick={props.stop}>stop</button>
      <p>DLY LVL<input type="range" min="0" max="100" defaultValue="0" className="slider" id="delayLevel"/></p> 
      <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filterCutoff"/></p>
    </React.Fragment>
  )
}

export default Controls;