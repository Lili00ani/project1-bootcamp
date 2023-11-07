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
    }, 1000);
  };

  //trigger hideMoleAfter, after mole appear.
  componentDidMount() {
    this.hideMoleAfter();
  }

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        {isVisible && (
          <div>
            <h1 className="mole"></h1>
          </div>
        )}
      </div>
    );
  }
}

export default Mole;
