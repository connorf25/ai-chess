// Keep track for castling
// var whiteKingMoved = false;
// var whiteQueenRookMoved = false;
// var whiteKingRookMoved = false;

// var blackKingMoved = false;
// var blackQueenRookMoved = false;
// var blackKingRookMoved = false;


// Chessboard, using index r, c
// r = rows
// c = columns
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
  switch(piece) {
    case 'P':
      if (r === 6)
        return [[r-1, c], [r-2, c]];
      return [[r-1, c]]; 
    case 'p':
      if (r === 1)
        return [[r+1, c], [r+2, c]];
      return [[r+1, c]]; 
    default:
      return [];
  }
}

// Mutations
function movePiece(or, oc, nr, nc) {
  console.log([or, oc, nr, nc]);
  let piece = getChessboardState()[or][oc];
  chessboardState[or][oc] = '';
  chessboardState[nr][nc] = piece;

}

export {
  getChessboardState,
  getPossibleMoves,
  movePiece
}