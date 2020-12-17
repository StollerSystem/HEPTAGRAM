import React, { Component } from 'react';
import Synth from './Synth';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="main">
          <Synth/>
        </div>
      </React.Fragment>
    );
  };
};

export default App;