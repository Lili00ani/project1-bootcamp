import React from "react";
import Mole from "./Mole";
import End from "./End";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import audio from "./audio/chick.mp3";
import ProgressBar from "react-bootstrap/ProgressBar";

const BOARD_X = 3;
const BOARD_Y = 3;
const TIMER = 50;

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

    //creating 3x3 empty board
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
    let indexI = Math.floor(Math.random() * 3);
    let indexJ = Math.floor(Math.random() * 3);

    while (
      indexI === this.state.positionMoleI &&
      indexJ === this.state.positionMoleJ
    ) {
      indexI = Math.floor(Math.random() * 3);
      indexJ = Math.floor(Math.random() * 3);
    }

    const copiedBoard = createBoard();
    copiedBoard[indexI][indexJ] = true;

    this.setState({
      board: copiedBoard,
      positionMoleI: indexI,
      positionMoleJ: indexJ,
    });
  };

  countScore = () => {
    //update all the scores

    this.setState((prevState) => ({
      score: prevState.score + 10,
    }));
  };

  reset = () => {
    this.setState({
      board: createBoard(),
      score: 0,
      mode: "play",
      timerRemaining: TIMER,
    });
  };

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

  componentDidMount() {
    this.countTimer();
    this.timerId = setInterval(() => {
      this.addMole();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  playAudio = () => {
    new Audio(audio).play();
  };

  render() {
    const messageEnd = (
      <div>
        <End score={this.state.score} reset={this.reset} />
      </div>
    );

    const moleDuration = Math.max(600, 1100 - this.state.score * 7);

    const headerGame = (
      <div className="header">
        <p>Score: {this.state.score} points</p>
        <div className="progress-bar">
          <ProgressBar
            variant="warning"
            animated
            now={this.state.timerRemaining * 2}
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
