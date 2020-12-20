import React, { Component } from 'react';
import * as Tone from 'tone';
import Controls from './Controls';
import Heptagram from './Heptagram';
import EditStep from './EditStep'
import { borderLight, starLight } from './Visuals';
import { patterns, moods } from '../constants/Constants'
// import { Transition } from 'react-transition-group';

class Synth extends Component {

  state = {
    // notes: {
    //   mood1: ["D", "E", "F", "G", "A", "B", "C"],
    //   mood2: ["E", "F#", "G", "A", "B", "C#", "D"]
    // },
    steps: {
      b1: { active: false, note: 1 },
      b2: { active: false, note: 1 },
      b3: { active: false, note: 1 },
      b4: { active: false, note: 1 },
      b5: { active: false, note: 1 },
      b6: { active: false, note: 1 },
      b7: { active: false, note: 1 },

      s1: { active: false, note: 1 },
      s2: { active: false, note: 1 },
      s3: { active: false, note: 1 },
      s4: { active: false, note: 1 },
      s5: { active: false, note: 1 },
      s6: { active: false, note: 1 },
      s7: { active: false, note: 1 }
    },
    stepEdit: null,
    currentMood: 1,
    synth1Octave: 3,
    synth2Octave: 2,
    synth1Pattern: 1,
    synth2Pattern: 1
  };

  transport = Tone.Transport;
  index = 0;
  draw = Tone.Draw
  delay = new Tone.FeedbackDelay(.5, .5);

  volume1 = new Tone.Volume(-17);
  filter1 = new Tone.Filter(5000, 'lowpass', -24);
  synth1 = new Tone.Synth().chain(this.volume1, this.filter1, this.delay, Tone.Destination);

  volume2 = new Tone.Volume(-17);
  filter2 = new Tone.Filter(5000, 'lowpass', -24);
  synth2 = new Tone.Synth().chain(this.volume2, this.filter2, this.delay, Tone.Destination);

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

  handleChangeNote = (e) => {
    let steps = this.state.steps;
    steps[this.state.editStep].note = e.target.value
    console.log(e.target.value)
    this.setState({ steps: steps })
  }


  handleSequenceStart = () => {
    Tone.start();
    // this.sequence.start(0)
    this.transport.start()
  }

  handleSequenceStop = () => {
    this.transport.stop()
  }

  handleOctaveChange = (synth, value) => {
    this.setState({
      [synth]: value
    })
  }

  handlePatternChange = (synth, value) => {
    this.setState({
      [`synth${synth}Pattern`]: value
    })
    console.log(this.state.synth1Pattern)
  }



  repeat = (time) => {

    const mood = this.state.currentMood;
    // console.log(this.state.synth1Pattern)
    const Pattern1 = patterns[this.state.synth1Pattern]
    let patternCount1 = this.index % Pattern1.length
    let patternStep1 = Pattern1[patternCount1]

    const Pattern2 = patterns[this.state.synth2Pattern]
    let patternCount2 = this.index % Pattern2.length
    let patternStep2 = Pattern2[patternCount2]
    // console.log(patternStep)

    // let stepCount = this.index % 7;    
    // this.synth.triggerAttackRelease(this.state.notes.mood1[stepCount], "32n", time)

    if (this.state.steps[`b${patternStep1}`].active) {
      const octave = this.state.synth1Octave.toString();
      const noteNum = this.state.steps[`b${patternStep1}`].note - 1;
      const note = moods[mood][noteNum] + octave;
      this.synth1.triggerAttackRelease(note, "32n", time)
      console.log("SYNTH 1: "+note)
    }

    if (this.state.steps[`s${patternStep2}`].active) {
      const octave = this.state.synth2Octave.toString();
      const noteNum = this.state.steps[`s${patternStep2}`].note - 1;
      const note = moods[mood][noteNum] + octave;
      this.synth2.triggerAttackRelease(note, "32n", time)
      console.log("SYNTH 2: "+note)
    }

    this.index++
    this.draw.schedule(function () {
      borderLight(patternStep1);
      starLight(patternStep2);
    }, time)
  }


  componentDidMount() {

    this.synth1.oscillator.type = "square";
    this.synth2.oscillator.type = "sawtooth";
    this.transport.bpm.value = 90
    this.transport.scheduleRepeat(this.repeat, '8n');
    this.draw.anticipation = 1;
    const delay = this.delay;
    delay.wet.value = .1;
    delay.maxDelay = 3;

    // document.addEventListener("input", this.noteSliderListener);
    // document.addEventListener("click", this.globalClickListener)
    window.addEventListener('keypress', this.onKeyPress)

    var delaySlide = document.getElementById('delayLevel');
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
      let dottedEighth = (45000/this.value)/1000;
      let delayTime = (dottedEighth < 1) ? dottedEighth : 1;
      delay.delayTime.value = delayTime;
      console.log(delay.delayTime.value);
    });

    const vol1 = this.volume1;
    var volumeSlide = document.getElementById('volume1');
    volumeSlide.addEventListener("input", function () {
      vol1.volume.value = this.value - 35;
    });

    const vol2 = this.volume2;
    var volumeSlide2 = document.getElementById('volume2');
    volumeSlide2.addEventListener("input", function () {
      vol2.volume.value = this.value - 35;
    });

    const octaveChange = this.handleOctaveChange
    var octaveSlide1 = document.getElementById('octave1');
    octaveSlide1.addEventListener("input", function () {
      octaveChange("synth1Octave", this.value)
    })
    
    var octaveSlide2 = document.getElementById('octave2');
    octaveSlide2.addEventListener("input", function () {
      octaveChange("synth2Octave", this.value)
    })

    const patternChange = this.handlePatternChange
    var patternSlide1 = document.getElementById('pattern1');
    patternSlide1.addEventListener("input", function () {
      patternChange(1,this.value)
    })
    
    var patternSlide2 = document.getElementById('pattern2');
    patternSlide2.addEventListener("input", function () {
      patternChange(2,this.value)
    })
  }

  // noteSliderListener = (e) => {
  //   if (e.target.id === "noteSlider") {
  //     if (e.target.value) {
  //       let steps = this.state.steps;
  //       steps[this.state.editStep].note = e.target.value
  //       this.setState({ steps: steps })
  //     };
  //   };
  // };

  // globalClickListener = (e) => {
  //   console.log(e.target)
  // }

  onKeyPress = (event) => {
    console.log(event.key)
    if (this.state.editStep && event.key === " ") {
      this.handleToggleStep(this.state.editStep)
    } else if (event.key=== " " && this.transport.state !== "started") {
      this.handleSequenceStart();   
      console.log(this.transport.state)
    } else if (event.key=== " ") {
      this.handleSequenceStop();
      console.log(this.transport.state)
    } else if (this.state.editStep && event.key === "x") {
      this.setState({editStep: null})
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
        key={1}
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