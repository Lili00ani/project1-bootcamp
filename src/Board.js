import React from "react";
import Mole from "./Mole";
import End from "./End";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import audio from "./audio/chick.mp3";
import ProgressBar from "react-bootstrap/ProgressBar";

//constant variable
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

    //creating 3x3 empty boards
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

  //add random new mole in the board
  addMole = () => {
    //randomise index for the board array
    let indexI = Math.floor(Math.random() * 3);
    let indexJ = Math.floor(Math.random() * 3);

    //making sure the new mole position is different from previous mole position
    while (
      indexI === this.state.positionMoleI &&
      indexJ === this.state.positionMoleJ
    ) {
      indexI = Math.floor(Math.random() * 3);
      indexJ = Math.floor(Math.random() * 3);
    }

    const copiedBoard = createBoard();
    copiedBoard[indexI][indexJ] = true;
    //update state of the board and mole position
    this.setState({
      board: copiedBoard,
      positionMoleI: indexI,
      positionMoleJ: indexJ,
    });
  };

  //update all the scores
  countScore = () => {
    //every successful hit +10 points
    this.setState((prevState) => ({
      score: prevState.score + SUCCESSFULHIT,
    }));
  };

  //reset the state so player can restart the game
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
  componentDidMount() {
    this.countTimer();
    this.timerId = setInterval(() => {
      this.addMole();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  //play background music
  playAudio = () => {
    new Audio(audio).play();
  };

  render() {
    const messageEnd = (
      <div>
        <End score={this.state.score} reset={this.reset} />
      </div>
    );
    //duration of mole staying visible.
    //depending on their score and minimum shortest duration is 0.6s.
    const moleDuration = Math.max(600, 1100 - this.state.score * 10);

    //showing score + timer bar
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
        {this.state.mode === "play" && headerGame}

        <div className="main">
          {this.state.mode === "play" && (
            <div className="board">
              {" "}
              <div>
                {this.state.board[0][0] ? (
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
