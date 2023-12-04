import React from "react";
import Board from "./Board";
import Home from "./Home";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showBoard: false,
    };
  }

  // onPlayClick seems oddly named. I would probably name this startGame, showBoard or the like
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
