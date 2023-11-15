import React from "react";
import "./App.css";
import intro from "./audio/intro.mp3";

class Home extends React.Component {
  playAudio = () => {
    const audio = new Audio(intro);
    audio.loop = true;
    audio.play();
  };

  render() {
    return (
      <div className="front-page">
        <h1>Catch-a-Mocking-Chicken</h1>

        <div className="start">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              this.props.onPlayClick();
              this.playAudio();
            }}
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
