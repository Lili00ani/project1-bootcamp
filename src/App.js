import React from "react";
import "./App.css";
import Board from "./Board";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <h5>Score: </h5>
        </div>
        <div className="main">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
