import React from 'react';


function LeftControls(props) {

  return (

    <div className="controlBox">
      <div className="synthControls">
        <button onClick={props.start}>start</button>
        <button onClick={props.stop}>stop</button>
        <p>BPM<input type="range" min="20" max="250" defaultValue="90" className="slider" id="bpmCount" /></p>
        <p>MOOD<input type="range" min="1" max="2" defaultValue="1" className="slider" id="moodSlider" onChange={props.changeMood} /></p>
      </div>
      <div className="synthControls">
        <p>FX</p>
        <p>REVERB LVL<input type="range" min="0" max="50" defaultValue="0" className="slider" id="reverbLevel" /></p>
        <p>DLY LVL<input type="range" min="0" max="60" defaultValue="10" className="slider" id="delayLevel" /></p>
        <p>DLY TIME<input type="range" min="1" max="4" defaultValue="3" className="slider" id="delayTime" onChange={props.changeDelayTime} /></p>
        <p>DLY FB<input type="range" min="1" max="90" defaultValue="50" className="slider" id="delayFB" /></p>
      </div>
      {/* <div className="synthControls">
        <p>SYNTH 1</p>
        <p>OCTAVE<input type="range" min="1" max="5" defaultValue="3" className="slider" id="octave1" /></p>
        <p>VOLUME<input type="range" min="0" max="35" defaultValue="18" className="slider" id="volume1" /></p>
        <p>FILTER<input type="range" min="0" max="100" defaultValue="50" className="slider" id="filterCutoff1" /></p>
        <p>RELEASE<input type="range" min="0" max="60" defaultValue="10" className="slider" id="release1" /></p>
        <p>PATTERN<input type="range" min="1" max="4" defaultValue="1" className="slider" id="pattern1" /></p>
      </div>
      <div className="synthControls">
        <p>SYNTH 2</p>
        <p>OCTAVE<input type="range" min="1" max="5" defaultValue="2" className="slider" id="octave2" /></p>
        <p>VOLUME<input type="range" min="0" max="35" defaultValue="18" className="slider" id="volume2" /></p>
        <p>FILTER<input type="range" min="0" max="100" defaultValue="50" className="slider" id="filterCutoff2" /></p>
        <p>RELEASE<input type="range" min="0" max="60" defaultValue="10" className="slider" id="release2" /></p>
        <p>PATTERN<input type="range" min="1" max="4" defaultValue="1" className="slider" id="pattern2" /></p>
      </div> */}

    </div>
  )
}

export default LeftControls;