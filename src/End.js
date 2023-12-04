import React from "react";
import "./App.css";

class End extends React.Component {
  render() {
    let finalScore = this.props.score;
    let imageURL = "";
    let scoreText = "";

    // i think it would be nicer if we would define a function to return us the result here.
    // const { imageURL, scoreText } = getResults() or something along those lines
    if (finalScore < 40) {
      imageURL = require("./img/mock2.png");
      scoreText = "Good start. Keep trying";
    } else if (finalScore >= 40 && finalScore <= 70) {
      imageURL = require("./img/sad.png");
      scoreText = "Nice effort";
    } else {
      imageURL = require("./img/dead.png");
      scoreText = "Egg-cellent Whacker";
    }

    return (
      <div className="end-page">
        <div className="end-page-image">
          <img src={imageURL} alt="score_image" style={{ maxWidth: "100%" }} />
        </div>
        <h1>{scoreText}</h1>
        <h3>Your score is {this.props.score}</h3>
        <button className="btn btn-dark" onClick={this.props.reset}>
          Play Again
        </button>
      </div>
    );
  }
}

export default End;
