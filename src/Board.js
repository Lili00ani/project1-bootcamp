import React from "react";
import Mole from "./Mole";
import End from "./End";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import audio from "./audio/chick.mp3";
import ProgressBar from "react-bootstrap/ProgressBar";

//constant variable
// good job defining these outside of the component
const BOARD_X = 3;
const BOARD_Y = 3;
const TIMER = 30;
const SUCCESSFULHIT = 10;

function createBoard() {
  const board = [];
  for (let i = 0; i < BOARD_X; i++) {
    const row = [];
    for (let j = 0; j < BOARD_Y; j++) {
      row.push(null);
    }
    board.push(row);
  }
  return board;
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    //creating 3x3 empty boards, this comment seems redundant as the createBoard function already documents this
    this.state = {
      board: createBoard(),
      score: 0,
      mode: "play",
      timerDuration: TIMER,
      timerRemaining: TIMER + 2,
      positionMoleI: null,
      positionMoleJ: null,
    };
  }

  //add random new mole in the board, also redundant comment, as the function name itself details this
  addMole = () => {
    //randomise index for the board array, also redundant. Math.random() should be intuitive to read
    let indexI = Math.floor(Math.random() * 3);
    let indexJ = Math.floor(Math.random() * 3);

    //making sure the new mole position is different from previous mole position, this is a good comment!
    while (
      indexI === this.state.positionMoleI &&
      indexJ === this.state.positionMoleJ
    ) {
      indexI = Math.floor(Math.random() * 3);
      indexJ = Math.floor(Math.random() * 3);
    }

    const copiedBoard = createBoard(); // wouldn't a copied board be this.state.board instead?
    copiedBoard[indexI][indexJ] = true;
    //update state of the board and mole position, redundant comment
    this.setState({
      board: copiedBoard,
      positionMoleI: indexI,
      positionMoleJ: indexJ,
    });
  };

  //update all the score, should the function then be called updateScore instead?
  countScore = () => {
    //every successful hit +10 points
    this.setState((prevState) => ({
      score: prevState.score + SUCCESSFULHIT,
    }));
  };

  //reset the state so player can restart the game
  // is this really a reset? I don't see all properties being reset here as per default state definition.
  reset = () => {
    this.setState({
      board: createBoard(),
      score: 0,
      mode: "play",
      timerDuration: TIMER,
      timerRemaining: TIMER,
    });
  };

  //timer function that will update every 0.1s
  // a better comment here would be describing what this timer is used for instead of stating the interval, which we can see in the code
  countTimer = () => {
    this.timerId2 = setInterval(() => {
      if (this.state.timerRemaining > 0) {
        this.setState((prevState) => ({
          timerRemaining: prevState.timerRemaining - 0.1,
        }));
      } else {
        this.setState({ mode: "end" });
        clearInterval(this.timerId2);
      }
    }, 100);
  };

  //when mole component is called, it will disappear after 2 seconds
  // this comment seems misleading to me. The code tells me you add a mole, but comments says a mole disappears.
  componentDidMount() {
    this.countTimer();
    this.timerId = setInterval(() => {
      this.addMole();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  //play background music, redundant comment
  playAudio = () => {
    new Audio(audio).play();
  };

  render() {
    // does this need to be stored in a variable? only gets used once and is a 3 liner.
    const messageEnd = (
      <div>
        <End score={this.state.score} reset={this.reset} />
      </div>
    );
    //duration of mole staying visible.
    //depending on their score and minimum shortest duration is 0.6s.
    const moleDuration = Math.max(600, 1100 - this.state.score * 10);

    //showing score + timer bar
    // I think this could be an own component, that takes a prop. Everytime we get a rerender, this variable gets defined anew, and as we see another component being used here plus a few more lines of code, I think this borderline warrants the use of another component.
    const headerGame = (
      <div className="header">
        <p>Score: {this.state.score} points</p>
        <div className="progress-bar">
          <ProgressBar
            variant="warning"
            animated
            now={this.state.timerRemaining * 3.33}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );

    return (
      <div>
        {/* If we have multiple game modes, I would suggest creating a variable that keeps track of these, so we can not make typos and create bugs
        
          const GAME_MODE = {
            PLAY: "play",
            PAUSE: "pause",
            GAME_OVER: "game_over",
          }

          then we can make a comparison

          {this.state.mode === GAME_MODE.PLAY && headerGame}

          That way we don't need to manually type repeating strings and don't run the risk of typos
        */}
        {this.state.mode === "play" && headerGame}

        <div className="main">
          {/* This whole block could probably be dynamically generated. The only thing changing is the index accessor on the arrays, so we probably can use some kind of other way of doing this. We can probably run a map that renders empty div or a div with a Mole, depending on the mole position. Let the code work for us :) */}
          {this.state.mode === "play" && (
            <div className="board">
              <div>
              {/* Ternary operator that results in null just adds bloat, let's use the && shorthand */}
                {this.state.board[0][0] && (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                
                )}
              </div>
              <div>
                {this.state.board[0][1] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
              <div>
                {this.state.board[0][2] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
              <div>
                {this.state.board[1][0] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
              <div>
                {this.state.board[1][1] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
              <div>
                {this.state.board[1][2] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
              <div>
                {this.state.board[2][0] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
              <div>
                {this.state.board[2][1] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
              <div>
                {this.state.board[2][2] ? (
                  <Mole
                    moleDuration={moleDuration}
                    onClick={() => {
                      this.countScore();
                      this.playAudio();
                    }}
                  />
                ) : null}
              </div>
            </div>
          )}

          <div>{this.state.mode === "end" && messageEnd}</div>
        </div>
      </div>
    );
  }
}

export default Board;
