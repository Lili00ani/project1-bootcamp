import React from "react";
import "./App.css";
import Board from "./Board";

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
