import React from "react";
import "./App.css";

class Home extends React.Component {
  render() {
    return (
      <div className="front-page">
        <h1>Catch-a-Mocking-Chicken</h1>
        <div className="start">
          <button
            type="button"
            class="btn btn-dark"
            onClick={this.props.onPlayClick}
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
