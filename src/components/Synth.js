import React, {Component} from 'react';
import * as Tone from 'tone';


class Synth extends Component {
  state = {
    steps: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'],
    BPM: 90
  }

  volume = new Tone.Volume(-20);
  delay = new Tone.FeedbackDelay(.5, .5);  
  filter = new Tone.Filter(7500, 'lowpass', -24)
  synth = new Tone.Synth().chain(this.volume, this.delay, this.filter, Tone.Destination);

  

  notes = this.state.steps
  sequence = new Tone.Pattern(
    (time, note) => {
      this.synth.triggerAttackRelease(note, "8n", time)
    },
    this.notes,
    "upDown"   
  )

  handleSequenceStart = () => {
    Tone.start();
    this.sequence.start(0)
    Tone.Transport.toggle() 
    Tone.Transport.bpm.value = this.state.BPM  
  }

  handleSequenceStop = () => {
    this.sequence.stop()
    Tone.Transport.toggle()
  }

  handleDelayLevel = () => {

  }

  componentDidMount() {

    const delay = this.delay; 
    const filter = this.filter
    delay.wet.value = 0;

    var delaySlide = document.getElementById('delayLevel');
    delaySlide.addEventListener("input", function() {  
      console.log(this.value)
      delay.wet.value = this.value/100;     
    });  

    var filterSlide = document.getElementById('filterCutoff');
    filterSlide.addEventListener("input", function() {     
      filter.frequency.value = this.value*100;     
    });

  }

  render() {
    return(
      <React.Fragment>
        <p>synth test</p>
        <button onClick={this.handleSequenceStart}>start</button>
        <button onClick={this.handleSequenceStop}>stop</button>
        <p>DLY LVL<input type="range" min="0" max="100" defaultValue="0" className="slider" id="delayLevel"/></p> 
        <p>FILTER<input type="range" min="0" max="100" defaultValue="75" className="slider" id="filterCutoff"/></p>
      </React.Fragment>
    )
  }
}

export default Synth;