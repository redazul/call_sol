import React, { Component } from 'react';
import "./App.css"




class App extends Component {

  goCall()
{
  console.log("hello")
}

  render() {
    return (
      <div style={{marginTop:window.screen.availHeight/3}} className='center'>
        <button onClick={this.goCall} className='glow'>Call</button>
      </div>
    );
  }
}

export default App;
