import React from "react";
import "./App.css";

class Mole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      duration: this.props.moleDuration,
      style: "mole",
    };
  }

  //hide mole
  hideMole = () => {
    this.setState({
      isVisible: false,
    });
  };

  //activate "hideMole" function after 1 secs
  hideMoleAfter = () => {
    setTimeout(() => {
      this.hideMole();
    }, this.state.duration);
  };

  //trigger hideMoleAfter, after mole appear.
  componentDidMount() {
    this.hideMoleAfter();
  }

  handleClick = () => {
    this.props.onClick();
    this.setState({
      style: "activeMole",
    });
  };

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        <div>
          {isVisible && (
            <div className={this.state.style} onClick={this.handleClick}></div>
          )}
        </div>
      </div>
    );
  }
}

export default Mole;
