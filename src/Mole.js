import React from "react";
import "./App.css";

class Mole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      duration: this.props.moleDuration, // good job to have this dynamic
      style: "mole",
    };
  }

  //hide mole, redundant comment
  hideMole = () => {
    this.setState({
      isVisible: false,
    });
  };

  //activate "hideMole" function after 1 secs
  // I think it would be easier to rename the funtion to hideMoleAfterDuration, then the comment is not needed. I was a bit confused to read the function name, seeing 1 secs but seeing that we use the dynamic duration prop here. That combination makes me scratch my head a bit
  hideMoleAfter = () => {
    setTimeout(() => {
      this.hideMole();
    }, this.state.duration);
  };

  //trigger hideMoleAfter, after mole appear. redundant comment
  componentDidMount() {
    this.hideMoleAfter();
  }

  handleClick = () => {
    this.props.onClick(); // this makes the component more generic, good job!
    this.setState({
      style: "activeMole",
    });
  };

  render() {
    const { isVisible } = this.state;
    return (
      // If the mole is not visible, and by using empty divs on the Board component already, do we need 2 more layers of possibly empty divs here? I think either we remove the possibly empty divs on the Board component, remove one layer of divs here - or we remove all possibly empty divs here and keep the one on the Board component.

      /*

        The final result should just be:
        <div>
          <Mole />
        </div>

        Whereas mole should just be the div within the isVisible condition.

      */
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
