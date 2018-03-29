import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i in lines) {
        const [a,b,c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}


function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
}

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            turn: "X"
        }
    }

    handleClick(i) {
        let squares = this.state.squares.slice()
        if (squares[i]) {
            return // If seelcted already taken field dont do shit
        }
        squares[i] = this.state.turn
        let nextTurn = this.state.turn == "X" ? "O" : "X"
        let winner = calculateWinner(squares)

        if (winner) {
            alert(winner + " wins!")
            squares = Array(9).fill(null)
            nextTurn = winner == "X" ? "O" : "X"
        }
        this.setState({squares: squares, turn: nextTurn})
    }

    renderSquare(i) {
        return (
            <Square
            value = {this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            />
        )
    }

    render() {
        const status = 'Current turn: ' + this.state.turn

        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
