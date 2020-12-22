import React, { Component } from 'react';
import Synth from './Synth';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    console.log("hide")
    this.setState({ visible: false });
  }
  

  customStyles = {
    backgroundColor: "black",
    border: "solid #7e7e7e",
    borderWidth: "1px"
  }

  render() {
    return (
      <React.Fragment>
        {/* <button onClick={this.show.bind(this)}>show</button> */}
        <Rodal
        className="rodalSplash" 
        visible={this.state.visible} 
        onClose={this.hide.bind(this)}
        width={75}
        height={35}
        measure={"%"}
        showCloseButton={true}
        animation={"fade"}
        duration={2000}
        showMask={false}
        customStyles={this.customStyles}>
          <div className="splashModal">
            <h1>HEPTAGRAM</h1>  
            <h2>DUAL VOICE GEOMETRIC STEP SEQUENCER</h2> 
            <p>BUILT BY: <a href="https://github.com/StollerSystem"><span>STOLLERSYSTEM</span></a></p>        
          </div>
        </Rodal>
        <div className="main">
          <Synth />
        </div>
      </React.Fragment>
    );
  };
};

export default App;