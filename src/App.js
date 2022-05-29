import React, { Component } from 'react';
import "./App.css"

class App extends Component {
  render() {
    return (
      <div style={{marginTop:window.screen.availHeight/3}} className='center'>
        <button className='glow'>Call</button>
      </div>
    );
  }
}

export default App;
