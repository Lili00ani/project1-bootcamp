import React from "react";
import "./App.css";

class Home extends React.Component {
  render() {
    return (
      <div className="front-page">
        <h1>Whac-a-mole Game</h1>
        <div className="start">
          <button className="btn btn-dark" onClick={this.props.onPlayClick}>
            Play
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
