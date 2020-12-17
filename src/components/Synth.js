import React, {Component} from 'react';
import * as Tone from 'tone';
import Controls from './Controls'


class Synth extends Component {
  state = {
    steps: ["D3","F3","A3","C4","D4","E4","G4","A4"],
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
        <Controls
        start={this.handleSequenceStart}
        stop={this.handleSequenceStop}
        />        
      </React.Fragment>
    )
  }
}

export default Synth;