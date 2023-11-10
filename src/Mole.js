import React from "react";
import "./board.css";

class Mole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
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
    }, 800);
  };

  //trigger hideMoleAfter, after mole appear.
  componentDidMount() {
    this.hideMoleAfter();
  }

  handleClick = () => {
    this.props.onClick();
  };

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        {isVisible && (
          <div>
            <div className="mole" onClick={this.handleClick}></div>
          </div>
        )}
      </div>
    );
  }
}

export default Mole;
