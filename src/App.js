import React from "react";
import Board from "./Board";
import Home from "./Home";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showBoard: false,
    };
  }

  onPlayClick = () => {
    this.setState((prevState) => ({ showBoard: !prevState.showBoard }));
  };

  render() {
    return (
      <div>
        {this.state.showBoard ? (
          <Board />
        ) : (
          <Home onPlayClick={this.onPlayClick} />
        )}
      </div>
    );
  }
}

export default App;
