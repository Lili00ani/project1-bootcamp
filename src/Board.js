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
    };
  }

  //add random new mole in the board
  addMole = () => {
    let indexI = Math.floor(Math.random() * 3);
    let indexJ = Math.floor(Math.random() * 3);
    const copiedBoard = createBoard();
    // const copiedBoard = this.state.board.map((row) => [...row]);
    copiedBoard[indexI][indexJ] = true;
    console.log(`${indexI}, ${indexJ}`);

    this.setState({
      board: copiedBoard,
    });
  };

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.addMole();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    console.log(this.state.board);
    return (
      <div className="board">
        {/* {this.state.board.map((row, i) => (
          <div key={i}>
            {row.map((cell, j) => (
              <div key={`${i}${j}`}>
                {this.state.board[i][j] ? <Mole /> : null}
              </div>
            ))}
          </div>
        ))} */}
        <div>{this.state.board[0][0] ? <Mole /> : null}</div>
        <div>{this.state.board[0][1] ? <Mole /> : null}</div>
        <div>{this.state.board[0][2] ? <Mole /> : null}</div>
        <div>{this.state.board[1][0] ? <Mole /> : null}</div>
        <div>{this.state.board[1][1] ? <Mole /> : null}</div>
        <div>{this.state.board[1][2] ? <Mole /> : null}</div>
        <div>{this.state.board[2][0] ? <Mole /> : null}</div>
        <div>{this.state.board[2][1] ? <Mole /> : null}</div>
        <div>{this.state.board[2][2] ? <Mole /> : null}</div>
      </div>
    );
  }
}

export default Board;
