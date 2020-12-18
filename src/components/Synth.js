import React, { Component } from 'react';
import * as Tone from 'tone';
import Controls from './Controls';
import Heptagram from './Heptagram';
import EditStep from './EditStep'
import { BorderLight, starLight } from './Visuals';


class Synth extends Component {

  state = {
    notes: {
      mood1: ["D3", "F3", "A3", "C4", "D4", "E4", "G4"]
    },
    steps: {
      b1: { active: false, note: 1 },
      b2: { active: false, note: 2 },
      b3: { active: false, note: 3 },
      b4: { active: false, note: 4 },
      b5: { active: false, note: 5 },
      b6: { active: false, note: 6 },
      b7: { active: false, note: 7 }
    },
    stepEdit: null
  };

  transport = Tone.Transport;
  volume = new Tone.Volume(-17);
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
    let steps = this.state.steps;
    steps[id].active = !steps[id].active;
    this.setState({ steps: steps })
  }

  handleEditStep = (id) => {

    if (!this.state.editStep || this.state.editStep !== id) {
      this.setState({ editStep: id })
    } else {
      this.setState({ editStep: null })
    }
  }

  handleChangeNote = (step, note) => {
    let steps = this.state.steps;
    steps[step].note = note;
    this.setState({ steps: steps })
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
    let stepCount = this.index % 7;
    // this.synth.triggerAttackRelease(this.state.notes.mood1[stepCount], "32n", time)
    if (this.state.steps[`b${stepCount + 1}`].active) {      
      const note = this.state.steps[`b${stepCount + 1}`].note-1;
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

    document.addEventListener("input", this.NoteListener);

    var delaySlide = document.getElementById('delayLevel');
    const delay = this.delay;
    delay.wet.value = 0;
    delaySlide.addEventListener("input", function () {
      delay.wet.value = this.value / 100;
    });

    const filter = this.filter;
    var filterSlide = document.getElementById('filterCutoff');
    filterSlide.addEventListener("input", function () {
      filter.frequency.value = this.value * 100;
    });

    var bpmSlide = document.getElementById('bpmCount');
    bpmSlide.addEventListener("input", function () {
      Tone.Transport.bpm.value = this.value;
    });

    const vol = this.volume;
    var volumeSlide = document.getElementById('volume');
    volumeSlide.addEventListener("input", function() {     
      vol.volume.value = this.value-35;     
    });


  }

  NoteListener = (e) => {
    if (e.target.id === "noteSlider") {      
      if (e.target.value) {        
        let steps = this.state.steps;
        steps[this.state.editStep].note = e.target.value
        this.setState({ steps: steps })        
      };
    };
  };

  render() {

    let editStep = null
    if (this.state.editStep) {
      editStep = <EditStep
        stepId={this.state.editStep}
        toggleStep={this.handleToggleStep}
        changeNote={this.handleChangeNote}
        attachListener={this.attachNoteListener}
        editStep={this.handleEditStep}
        currentStep={this.state.steps[this.state.editStep]}
      />

    }

    return (
      <React.Fragment>
        <div className="grid-container">
          <div className="item1">
            <Controls
              start={this.handleSequenceStart}
              stop={this.handleSequenceStop}
            />
            {editStep}
          </div>
          <div className="item2">
            <Heptagram
              // toggleStep={this.handleToggleStep}
              stepsActive={this.state.steps}
              stepEditing={this.state.editStep}
              editStep={this.handleEditStep}
              />
          </div>
          <div className="item3">
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Synth;