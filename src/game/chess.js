import { isWhitePiece } from "./logic/helper.js"
import { pawn, knight } from "./logic/pieces.js"

// Keep track for castling
// var whiteKingMoved = false;
// var whiteQueenRookMoved = false;
// var whiteKingRookMoved = false;

// var blackKingMoved = false;
// var blackQueenRookMoved = false;
// var blackKingRookMoved = false;

var isWhitesTurn = true;

// Chessboard, using index r, c
// r = rows
// c = columns
// Uppercase letters are white
var chessboardState = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
]

// Getters
function getChessboardState() {
  return chessboardState;
}

function getPossibleMoves(r, c) {
  let piece = getChessboardState()[r][c];
  let isWhite = isWhitePiece(r, c);
  // If not that players turn
  if (isWhitesTurn !== isWhite)
    return [];
  switch(piece.toLowerCase()) {
    case 'p':
      return pawn(r, c, isWhite);
    case 'n':
      return knight(r, c, isWhite);
    default:
      return [];
  }
}

// Mutations
function movePiece(or, oc, nr, nc) {
  isWhitesTurn = !isWhitesTurn
  let piece = getChessboardState()[or][oc];
  chessboardState[or][oc] = '';
  chessboardState[nr][nc] = piece;
}

export {
  getChessboardState,
  getPossibleMoves,
  movePiece
}