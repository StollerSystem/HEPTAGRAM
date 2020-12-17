import React, { Component } from 'react';
import * as Tone from 'tone';
import Controls from './Controls';
import Heptagram from './Heptagram';
import { BorderLight, starLight } from './Visuals';


class Synth extends Component {

  state = {
    notes: {
      mood1: ["D3", "F3", "A3", "C4", "D4", "E4", "G4"]
    },
    steps: {
      b1: {active: false, note: 1},
      b2: {active: false, note: 2},
      b3: {active: false, note: 3},
      b4: {active: false, note: 4},
      b5: {active: false, note: 5},
      b6: {active: false, note: 6},
      b7: {active: false, note: 7}
    }
  };

  transport = Tone.Transport;
  volume = new Tone.Volume(-20);
  delay = new Tone.FeedbackDelay(.5, .5);
  filter = new Tone.Filter(7500, 'lowpass', -24);
  synth = new Tone.Synth().chain(this.volume, this.delay, this.filter, Tone.Destination);
  index = 0;
  draw = Tone.Draw


  // notes = this.state.steps
  // sequence = new Tone.Pattern(
  //   (time, note) => {
  //     this.synth.triggerAttackRelease(note, "8n", time)
  //   },
  //   this.notes,
  //   "upDown"   
  // )
  handleToggleStep = (id) => {
    console.log("toggle"+id)
    let steps = this.state.steps;
    steps[id].active = !steps[id].active;
    this.setState({steps: steps})
    console.log(this.state.steps)
  }


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
    // console.log(time)
    let stepCount = this.index % 7;
    // this.synth.triggerAttackRelease(this.state.notes.mood1[stepCount], "32n", time)
    if (this.state.steps[`b${stepCount+1}`].active) {
      console.log("hit")
      const note = this.state.steps[`b${stepCount+1}`].note;
      this.synth.triggerAttackRelease(this.state.notes.mood1[note], "32n", time)
    }
    this.index++

    this.draw.schedule(function () {
      BorderLight(stepCount + 1);
      starLight(stepCount + 1);
    }, time)

  }


  componentDidMount() {

    this.transport.bpm.value = 90
    this.transport.scheduleRepeat(this.repeat, '8n');
    this.draw.anticipation = 1;

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
        <Heptagram 
        toggleStep={this.handleToggleStep}
        stepsActive={this.state.steps}
        />
      </React.Fragment>
    )
  }
}

export default Synth;