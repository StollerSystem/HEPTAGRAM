import React, {Component} from 'react';
import * as Tone from 'tone';


class Synth extends Component {
  state = {
    steps: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'],
    BPM: 90
  }

  volume = new Tone.Volume(0)
  synth = new Tone.Synth().chain(this.volume, Tone.Destination);

  

  notes = this.state.steps
  sequence = new Tone.Pattern(
    (time, note) => {
      this.synth.triggerAttackRelease(note, "8n", time)
    },
    this.notes,
    "upDown"   
  )

  handleSequenceStart = () => {
    this.sequence.start(0)
    Tone.Transport.toggle() 
    Tone.Transport.bpm.value = this.state.BPM  
  }

  handleSequenceStop = () => {
    this.sequence.stop()
    Tone.Transport.toggle()
  }

  render() {
    return(
      <React.Fragment>
        <p>synth test</p>
        <button onClick={this.handleSequenceStart}>start</button>
        <button onClick={this.handleSequenceStop}>stop</button>
      </React.Fragment>
    )
  }
}

export default Synth;