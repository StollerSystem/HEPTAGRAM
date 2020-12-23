import React from 'react';

function LeftControls(props) {

  return (

    <div className="controlBox">
      <div className="synthControls">
        {props.started ?  
        <button 
          className="playButton" 
          style={{color: "red"}} 
          onClick={props.stop}>
          <i className="fas fa-stop"></i>
        </button> :
        <button 
          className="playButton" 
          style={{color: "#00d547"}}
          onClick={props.start}>
            <i className="fas fa-play"></i>
        </button>}
        <p>SPEED<input type="range" min="20" max="250" defaultValue="90" className="slider" id="bpmCount" /></p>
        <p>MOOD<input type="range" min="1" max="7" defaultValue="1" className="slider" id="moodSlider" onChange={props.changeMood} /></p>
      </div>
      <div className="synthControls">
        <p>FX</p>
        <p>REVERB LVL<input type="range" min="0" max="50" defaultValue="0" className="slider" id="reverbLevel" /></p>
        <p>DELAY LVL<input type="range" min="0" max="60" defaultValue="10" className="slider" id="delayLevel" /></p>
        <p>DELAY TIME<input type="range" min="1" max="4" defaultValue="3" className="slider" id="delayTime" onChange={props.changeDelayTime} /></p>
        <p>DELAY FB<input type="range" min="1" max="90" defaultValue="50" className="slider" id="delayFB" /></p>
      </div>
    </div>
  );
};

export default LeftControls;