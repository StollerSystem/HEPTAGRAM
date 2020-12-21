import React, { Component } from 'react';
import * as Tone from 'tone';
import Controls from './Controls';
import Heptagram from './Heptagram';
import EditStep from './EditStep'
import { borderLight, starLight } from './Visuals';
import { patterns, moods, delayTimeDiv } from '../constants/Constants'
// import { Transition } from 'react-transition-group';

class Synth extends Component {

  state = {    
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
    editStep: null,
    currentMood: 1,
    synth1Octave: 0,
    synth2Octave: -1,
    synth1Pattern: 1,
    synth2Pattern: 1,
    delayTimeDiv: 3,
  };


  transport = Tone.Transport;
  index = 0;
  draw = Tone.Draw
  delay = new Tone.FeedbackDelay(.5, .5);
  // chorus = new Tone.Chorus(5, 2.5, 1);
  // reverb = new Tone.JCReverb(0.4)
  reverb = new Tone.Freeverb(.9, 3000)


  volume1 = new Tone.Volume(-17);
  filter1 = new Tone.Filter(5000, 'lowpass', -24);
  synth1 = new Tone.Synth().chain(this.volume1, this.filter1, this.delay, this.reverb, Tone.Destination);

  volume2 = new Tone.Volume(-17);
  filter2 = new Tone.Filter(5000, 'lowpass', -24);
  synth2 = new Tone.Synth().chain(this.volume2, this.filter2, this.delay, this.reverb, Tone.Destination);  


  handleToggleStep = (id) => {
    let steps = this.state.steps;
    steps[id].active = !steps[id].active;
    this.setState({ steps: steps });
  };

  handleEditStep = (id) => {
    if (!this.state.editStep || this.state.editStep !== id) {
      this.setState({ editStep: id })
    } else {
      this.setState({ editStep: null })
    };
  };

  handleChangeNote = (e) => {
    let steps = this.state.steps;
    steps[this.state.editStep].note = e.target.value
    // console.log(e.target.value)
    this.setState({ steps: steps });
  };

  handleSequenceStart = () => {
    Tone.start();    
    this.transport.start();
  };

  handleSequenceStop = () => {
    this.transport.stop()
  };

  handleOctaveChange = (synth, value) => {
    this.setState({
      [synth]: value
    });
  };

  handlePatternChange = (synth, value) => {
    this.setState({
      [`synth${synth}Pattern`]: value
    })
    console.log(this.state.synth1Pattern)
  };

  handleChangeDelayTime = (e) => {    
    this.setState({
      delayTimeDiv: parseInt(e.target.value)
    }, () => {      
      const div = delayTimeDiv[this.state.delayTimeDiv]
      const bpm = this.transport.bpm.value      
      const delayMS = (div / bpm) / 1000;
      const delayTime = (delayMS < 1) ? delayMS : 1;
      this.delay.delayTime.value = delayTime;
    });    
  };

  handleMoodChange = (e) => {
    this.setState({
      currentMood: e.target.value
    });
  };

  handleBPMDelayChange = () => {
    const div = delayTimeDiv[this.state.delayTimeDiv]
    const bpm = this.transport.bpm.value    
    const delayMS = (div / bpm) / 1000;
    const delayTime = (delayMS < 1) ? delayMS : 1;
    this.delay.delayTime.value = delayTime;
  };


  repeat = (time) => {

    const mood = this.state.currentMood;    

    const Pattern1 = patterns[this.state.synth1Pattern]
    const patternCount1 = this.index % Pattern1.length
    const patternStep1 = Pattern1[patternCount1]
    const active1 = this.state.steps[`b${patternStep1}`].active;
    if (active1) {      
      const noteNum = this.state.steps[`b${patternStep1}`].note - 1;      
      const octave = this.state.synth1Octave;
      const split = moods[mood][noteNum].split('');
      split[split.length-1] = (parseInt(split[split.length-1])+octave).toString();
      const note = split.join('')      
      this.synth1.triggerAttackRelease(note, "64n", time)
      console.log("SYNTH 1: " + note)
    }

    const Pattern2 = patterns[this.state.synth2Pattern]
    const patternCount2 = this.index % Pattern2.length
    const patternStep2 = Pattern2[patternCount2]
    const active2 = this.state.steps[`s${patternStep2}`].active;
    if (active2) {
      const noteNum = this.state.steps[`s${patternStep2}`].note - 1;
      const octave = this.state.synth2Octave;
      const split = moods[mood][noteNum].split('');
      split[split.length-1] = (parseInt(split[split.length-1])+octave).toString();
      const note = split.join('')
      this.synth2.triggerAttackRelease(note, "64n", time)
      console.log("SYNTH 2: " + note)
    }

    const synth1Rel = this.synth1.envelope.release
    const synth2Rel = this.synth2.envelope.release    
    const editing = this.state.editStep
    this.draw.schedule(function () {
      borderLight(patternStep1, active1, synth1Rel, editing);
      starLight(patternStep2, active2, synth2Rel, editing);
    }, time)

    this.index++
  }


  componentDidMount() {

    this.synth1.oscillator.type = "square";
    this.synth2.oscillator.type = "sawtooth";
    this.transport.bpm.value = 90
    this.transport.scheduleRepeat(this.repeat, '8n');
    this.draw.anticipation = 1;
    // this.chorus.wet.value = 0;

    const reverb = this.reverb;
    reverb.wet.value = 0;

    const delay = this.delay;
    delay.wet.value = .1;
    delay.maxDelay = 3;

    // document.addEventListener("input", this.noteSliderListener);
    // document.addEventListener("click", this.globalClickListener)
    window.addEventListener('keypress', this.onKeyPress)

    var reverbSlide = document.getElementById('reverbLevel');
    reverbSlide.addEventListener("input", function () {
      reverb.wet.value = this.value / 100;
    });

    var delaySlide = document.getElementById('delayLevel');
    delaySlide.addEventListener("input", function () {
      delay.wet.value = this.value / 100;
    });

    var delayFBSlide = document.getElementById('delayFB');
    delayFBSlide.addEventListener("input", function () {
      delay.feedback.value = this.value / 100;
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

    const handleDelayChange = this.handleBPMDelayChange;
    var bpmSlide = document.getElementById('bpmCount');
    bpmSlide.addEventListener("input", function () {
      Tone.Transport.bpm.value = this.value;
      handleDelayChange(this.value)      
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
      octaveChange("synth1Octave", this.value-3)
    })

    var octaveSlide2 = document.getElementById('octave2');
    octaveSlide2.addEventListener("input", function () {
      octaveChange("synth2Octave", this.value-3)
    })

    const patternChange = this.handlePatternChange
    var patternSlide1 = document.getElementById('pattern1');
    patternSlide1.addEventListener("input", function () {
      patternChange(1, this.value)
    })

    var patternSlide2 = document.getElementById('pattern2');
    patternSlide2.addEventListener("input", function () {
      patternChange(2, this.value)
    })

    const synth1 = this.synth1;
    var releaseSlide1 = document.getElementById('release1');
    releaseSlide1.addEventListener("input", function () {
      synth1.envelope.release = this.value / 4;
    });

    const synth2 = this.synth2;
    var releaseSlide2 = document.getElementById('release2');
    releaseSlide2.addEventListener("input", function () {
      synth2.envelope.release = this.value / 4;
    });
  }  

  // globalClickListener = (e) => {
  //   console.log(e.target)
  // }

  onKeyPress = (event) => {
    // console.log(event.key)
    if (this.state.editStep && event.key === " ") {
      this.handleToggleStep(this.state.editStep)
    } else if (event.key === " " && this.transport.state !== "started") {
      this.handleSequenceStart();
      console.log(this.transport.state)
    } else if (event.key === " ") {
      this.handleSequenceStop();
      console.log(this.transport.state)
    } else if (this.state.editStep && event.key === "x") {
      this.setState({ editStep: null })
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
          <div className="item1 col">
            <Controls
              start={this.handleSequenceStart}
              stop={this.handleSequenceStop}
              changeDelayTime={this.handleChangeDelayTime}
              changeMood={this.handleMoodChange}
            />
          </div>
          <div className="item2 col">
            <Heptagram
              stepsActive={this.state.steps}
              stepEditing={this.state.editStep}
              editStep={this.handleEditStep}
              />
          </div>
          <div className="item3 col">
              {editStep}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Synth;