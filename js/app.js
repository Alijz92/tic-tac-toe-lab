let board
let turn
let winner
let tie

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
]
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'x'
  winner = false
  tie = false
  render()
  resetBtnEl.addEventListener('click', init)
}

const render = () => {
  updateBoard()
  updateMessage()
}
const updateBoard = () => {
  squareEls.forEach((square, i) => {
    square.textContent = board[i]
  })
}

const updateMessage = () => {
  if (winner) {
    messageEl.textContent = `${turn} has won`
  } else if (tie) {
    messageEl.textContent = "It's a tie"
  } else {
    messageEl.textContent = `${turn} turn`
  }
}

const handleClick = (event) => {
  const squareIndex = parseInt(event.target.id)
  if (board[squareIndex] === 'x' || board[squareIndex] === 'o') {
    messageEl.textContent = 'This square is already taken'
    return
  } else if (winner) {
    return
  }
  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayer()
  render()
}

const placePiece = (i) => {
  board[i] = turn
}

const checkForWinner = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ]

  for (let i = 0; i < winningCombos.length; i++) {
    let c = winningCombos[i]
    let fC = c[0]
    let sC = c[1]
    let tC = c[2]
    if (board[fC] !== '') {
      if (board[fC] === board[sC] && board[fC] === board[tC]) {
        winner = board[fC]
        return
      }
    }
  }
  winner = null
}

const checkForTie = () => {
  let fill = true
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      fill = false
      break
    }
  }
  tie = fill && winner === null
}

const switchPlayer = () => {
  if (!winner) {
    if (turn === 'x') {
      turn = 'o'
    } else {
      turn = 'x'
    }
  }
}

console.log(turn)

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick)
})

init()
