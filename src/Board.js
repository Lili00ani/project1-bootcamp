import React from "react";
import Mole from "./Mole";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import audio from "./audio/sound.wav";

const BOARD_X = 3;
const BOARD_Y = 3;
const TIMER = 60;

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
      timerRemaining: TIMER,
    };
  }

  //add random new mole in the board
  addMole = () => {
    let indexI = Math.floor(Math.random() * 3);
    let indexJ = Math.floor(Math.random() * 3);
    console.log(indexI, indexJ);
    // const copiedBoard = this.state.board.map((row) => [...row]);
    const copiedBoard = createBoard();
    copiedBoard[indexI][indexJ] = true;

    this.setState({
      board: copiedBoard,
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
          timerRemaining: prevState.timerRemaining - 1,
        }));
      } else {
        this.setState({ mode: "end" });
        clearInterval(this.timerId2);
      }
    }, 1000);
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
        <button className="btn btn-dark" onClick={() => this.reset()}>
          Play Again
        </button>
      </div>
    );

    const moleDuration = 1100 - this.state.score * 8;

    return (
      <div>
        <div className="header">
          <p>Score: {this.state.score} points</p>
          <p>Time Left: {this.state.timerRemaining} s</p>
        </div>
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

          <div className="restart">
            {this.state.mode === "end" && messageEnd}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
