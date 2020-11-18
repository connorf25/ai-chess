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

function isWhitePiece(piece) {
  return piece === piece.toUpperCase();
}

function getPossibleMoves(r, c) {
  let piece = getChessboardState()[r][c];
  let isWhite = isWhitePiece(piece);
  // If not that players turn
  if (isWhitesTurn !== isWhite)
    return [];
  switch(piece.toLowerCase()) {
    case 'p':
      return pawn(r, c, isWhite);
  }
}

// Mutations
function movePiece(or, oc, nr, nc) {
  isWhitesTurn = !isWhitesTurn
  console.log([or, oc, nr, nc]);
  let piece = getChessboardState()[or][oc];
  chessboardState[or][oc] = '';
  chessboardState[nr][nc] = piece;
}

// Calculate moves for each piece
function pawn(r, c, isWhite) {
  if (isWhite) {
    if (r === 6)
      return [[r-1, c], [r-2, c]];
    return [[r-1, c]]; 
  } else {
    if (r === 1)
      return [[r+1, c], [r+2, c]];
    return [[r+1, c]]; 
  }
}

export {
  getChessboardState,
  getPossibleMoves,
  movePiece
}