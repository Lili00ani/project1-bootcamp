import React from "react";
import Mole from "./Mole";
import "./board.css";

const BOARD_X = 3;
const BOARD_Y = 3;

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
      gameStatus: true,
    };
  }

  //add random new mole in the board
  addMole = () => {
    let indexI = Math.floor(Math.random() * 3);
    let indexJ = Math.floor(Math.random() * 3);
    const copiedBoard = [...this.state.board];
    // const copiedBoard = this.state.board.map((row) => [...row]);
    copiedBoard[indexI][indexJ] = true;
    console.log(`${indexI}, ${indexJ}`);

    this.setState({
      board: copiedBoard,
    });
  };

  countScore = () => {
    //update all the scores
    console.log("whack");
    this.setState((prevState) => ({
      score: prevState.score + 10,
    }));
  };

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.addMole();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    console.log(this.state.board);
    return (
      <div>
        <div className="header">
          <h5>Score: {this.state.score}</h5>
        </div>
        <div className="main">
          <div className="board">
            <div>
              {this.state.board[0][0] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[0][1] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[0][2] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[1][0] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[1][1] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[1][2] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[2][0] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[2][1] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
            <div>
              {this.state.board[2][2] ? (
                <Mole onClick={() => this.countScore()} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
