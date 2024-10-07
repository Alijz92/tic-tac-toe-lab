let board
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const restartButton = document.querySelector('#restartButton')
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'x'
  winner = false
  tie = false
  render(turn, winner, tie)
}

const render = (player, winner, tie) => {
  updateBoard()
  updateMessage(player, winner, tie)
}

const updateBoard = () => {
  board.forEach((cell, index) => {
    squareEls[index].textContent = cell
  })
}

const updateMessage = (player, winner, tie) => {
  if (winner) {
    messageEl.textContent = `${player} wins!`
  } else if (tie) {
    messageEl.textContent = "It's a tie!"
  } else {
    messageEl.textContent = `It is ${player}'s turn`
  }
}

const placePiece = (index) => {
  board[index] = turn
  squareEls[index].textContent = turn
}

const handleClick = (event) => {
  const squareIndex = event.target.id
  if (board[squareIndex] || winner) {
    return
  }

  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
}

const checkForWinner = () => {
  for (let combination of winningCombos) {
    const [a, b, c] = combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true
      render(turn, winner, tie)
      return
    }
  }
}

const switchPlayerTurn = () => {
  if (!winner && !tie) {
    if (turn === 'x') {
      turn = 'o'
    } else {
      turn = 'x'
    }
    render(turn, winner, tie)
  }
}

const checkForTie = () => {
  if (!board.includes('') && !winner) {
    tie = true
    render(turn, winner, tie)
  }
}

init()

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((el) => {
  el.addEventListener('click', handleClick)
})
restartButton.addEventListener('click', init)
