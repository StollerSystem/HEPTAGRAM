import React, { Component } from 'react';
import * as Tone from 'tone';
import Controls from './Controls';
import Heptagram from './Heptagram';
import { BorderLight } from './Visuals';


class Synth extends Component {
  state = {
    steps: ["D3", "F3", "A3", "C4", "D4", "E4", "G4"],

  }
  transport = Tone.Transport;
  volume = new Tone.Volume(-20);
  delay = new Tone.FeedbackDelay(.5, .5);
  filter = new Tone.Filter(7500, 'lowpass', -24);
  synth = new Tone.Synth().chain(this.volume, this.delay, this.filter, Tone.Destination);
  index = 0;


  // notes = this.state.steps
  // sequence = new Tone.Pattern(
  //   (time, note) => {
  //     this.synth.triggerAttackRelease(note, "8n", time)
  //   },
  //   this.notes,
  //   "upDown"   
  // )

  handleSequenceStart = () => {
    Tone.start();
    console.log(this.transport.bpm.value)
    // this.sequence.start(0)
    this.transport.start()
  }

  handleSequenceStop = () => {
    this.transport.stop()
  }

  repeat = (time) => {

    let stepCount = this.index % 7;
    this.synth.triggerAttackRelease(this.state.steps[stepCount], "32n", time)
    this.index++

    Tone.Draw.schedule(function () {
      BorderLight(stepCount + 1);
    }, time)

  }


  componentDidMount() {

    this.transport.bpm.value = 90
    this.transport.scheduleRepeat(this.repeat, '8n');

    var delaySlide = document.getElementById('delayLevel');
    const delay = this.delay;
    delay.wet.value = 0;
    delaySlide.addEventListener("input", function () {
      delay.wet.value = this.value / 100;
    });

    const filter = this.filter
    var filterSlide = document.getElementById('filterCutoff');
    filterSlide.addEventListener("input", function () {
      filter.frequency.value = this.value * 100;
    });

    var bpmSlide = document.getElementById('bpmCount');
    bpmSlide.addEventListener("input", function () {
      Tone.Transport.bpm.value = this.value
    });

  }

  render() {
    return (
      <React.Fragment>
        <p>synth test</p>
        <Controls
          start={this.handleSequenceStart}
          stop={this.handleSequenceStop}
        />
        <Heptagram />
      </React.Fragment>
    )
  }
}

export default Synth;