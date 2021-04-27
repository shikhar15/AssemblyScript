import React from 'react';
import MathWasm from './Modules/MathWasm/MathWasm';
import SingleMath from './Modules/SingleMath/SingleMath';
import WebCam from './Modules/WebCam/WebCam';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <MathWasm />
        <SingleMath />
        <WebCam />
      </header>
    </div>
  );
}

export default App;
