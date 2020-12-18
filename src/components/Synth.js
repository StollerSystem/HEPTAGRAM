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
      b7: { active: false, note: 7 },

      s1: { active: false, note: 1 },
      s2: { active: false, note: 2 },
      s3: { active: false, note: 3 },
      s4: { active: false, note: 4 },
      s5: { active: false, note: 5 },
      s6: { active: false, note: 6 },
      s7: { active: false, note: 7 }
    },
    stepEdit: null
  };

  transport = Tone.Transport;
  index = 0;
  draw = Tone.Draw


  volume1 = new Tone.Volume(-17);
  delay = new Tone.FeedbackDelay(.5, .5);
  filter1 = new Tone.Filter(7500, 'lowpass', -24);
  synth1 = new Tone.Synth().chain(this.volume1, this.delay, this.filter1, Tone.Destination);
  

  volume2 = new Tone.Volume(-17);
  filter2 = new Tone.Filter(7500, 'lowpass', -24);
  synth2 = new Tone.Synth().chain(this.volume2, this.filter2, Tone.Destination);
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
      this.synth1.triggerAttackRelease(this.state.notes.mood1[note], "32n", time)
    }

    if (this.state.steps[`s${stepCount + 1}`].active) {      
      const note = this.state.steps[`s${stepCount + 1}`].note-1;
      this.synth2.triggerAttackRelease(this.state.notes.mood1[note], "32n", time)
    }



    this.index++
    this.draw.schedule(function () {
      BorderLight(stepCount + 1);
      starLight(stepCount + 1);
    }, time)

  }


  componentDidMount() {

    this.synth1.oscillator.type = "square";  
    this.synth2.oscillator.type = "sawtooth";  

    this.transport.bpm.value = 90
    this.transport.scheduleRepeat(this.repeat, '8n');
    this.draw.anticipation = 1;

    document.addEventListener("input", this.NoteListener);
    window.addEventListener('keypress', this.onKeyPress)

    var delaySlide = document.getElementById('delayLevel');
    const delay = this.delay;
    delay.wet.value = 0;
    delaySlide.addEventListener("input", function () {
      delay.wet.value = this.value / 100;
    });

    const filter1 = this.filter1;
    var filterSlide = document.getElementById('filterCutoff1');
    filterSlide.addEventListener("input", function () {
      filter1.frequency.value = this.value * 100;
    });

    const filter2 = this.filter2;
    var filterSlide2 = document.getElementById('filterCutoff2');
    filterSlide2.addEventListener("input", function () {
      filter2.frequency.value = this.value * 100;
    });

    var bpmSlide = document.getElementById('bpmCount');
    bpmSlide.addEventListener("input", function () {
      Tone.Transport.bpm.value = this.value;
    });

    const vol1 = this.volume1;
    var volumeSlide = document.getElementById('volume1');
    volumeSlide.addEventListener("input", function() {     
      vol1.volume.value = this.value-35;     
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
 
  onKeyPress = (event) => {    
    if (this.state.editStep && event.key === " ") {
      this.handleToggleStep(this.state.editStep)
    }
  }  

 
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