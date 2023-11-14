import React from "react";
import "./App.css";

class End extends React.Component {
  render() {
    let finalScore = this.props.score;
    let imageURL = "";

    if (finalScore < 40) {
      imageURL = require("./img/mock2.png");
    } else if (finalScore >= 40 && finalScore <= 70) {
      imageURL = require("./img/sad.png");
    } else {
      imageURL = require("./img/dead.png");
    }

    return (
      <div className="end-page">
        <div className="end-page-image">
          <img src={imageURL} alt="score_image" style={{ maxWidth: "100%" }} />
        </div>
        <h3>Your score is {this.props.score}</h3>
        <button className="btn btn-dark" onClick={this.props.reset}>
          Play Again
        </button>
      </div>
    );
  }
}

export default End;
