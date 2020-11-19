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

function isWhitePiece(r, c) {
  let piece = getChessboardState()[r][c];
  return piece === piece.toUpperCase();
}

function isPiece(r, c) {
  return getChessboardState()[r][c] !== '' ? true : false;
}

function squareExists(r, c) {
  if (r < 0 || r > 7 || c < 0 || c > 7)
    return false;
  else
    return true;
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

// Calculate moves for each piece
// {{{
function pawn(r, c, isWhite) {
  let possibleMoves = [];
  let possibleAttacks = [];
  let actualMoves = [];
  let actualAttacks = [];
  // Is White
  if (isWhite) {
    possibleAttacks = [[r-1, c-1], [r-1, c+1]];
    if (r === 6)
      possibleMoves = [[r-1, c], [r-2, c]];
    else
      possibleMoves = [[r-1, c]]; 
  } 
  // Is Black
  else {
    possibleAttacks = [[r+1, c-1], [r+1, c+1]];
    if (r === 1)
      possibleMoves = [[r+1, c], [r+2, c]];
    else
      possibleMoves = [[r+1, c]]; 
  }
  possibleMoves.some(move => {
    if (isPiece(move[0], move[1])) {
      return true;
    } else {
      actualMoves.push(move);
      return false;
    }
  })
  possibleAttacks.forEach(move => {
    if (isPiece(move[0], move[1]) && (isWhite !== isWhitePiece(move[0], move[1])))
      actualAttacks.push(move);
  })
  // Return moves
  return actualMoves.concat(actualAttacks);
}

function knight(r, c, isWhite) {
  let possibleMoves = [[r+2, c+1], [r+2, c-1], [r-2, c+1], [r-2, c-1], [r+1, c+2], [r+1, c-2], [r-1, c+2], [r-1, c-2]];
  let actualMoves = [];
  let actualAttacks = [];
  possibleMoves.forEach(move => {
    // Check if move exists on board
    if (!squareExists(move[0], move[1]))
      return;
    // No piece occupies
    if (!isPiece(move[0], move[1])) {
      actualMoves.push(move);
    }
    // Else check if enemy piece
    else if (isWhite !== isWhitePiece(move[0], move[1])) {
      actualAttacks.push(move);
    }
  })
  return actualMoves.concat(actualAttacks);
}
// }}}

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