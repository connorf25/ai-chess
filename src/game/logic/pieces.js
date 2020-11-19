import { squareExists, isPiece, isWhitePiece } from "./helper.js";

// Calculate moves for each piece
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
    // Check if move exists on board
    if (!squareExists(move[0], move[1]))
      return false;
    if (isPiece(move[0], move[1])) {
      return true;
    } else {
      actualMoves.push(move);
      return false;
    }
  })
  possibleAttacks.forEach(move => {
    // Check if move exists on board
    if (!squareExists(move[0], move[1]))
      return;
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

function directionalPiece(r, c, isWhite, possibleDirections) {
  let actualMoves = [];
  let actualAttacks = [];
  possibleDirections.forEach(direction => {
    for (let i = 1; i < 8; i++) {
      let move = eval(direction);
      // Does the square exist
      if (!squareExists(move[0], move[1])) {
        break;
      }
      // Is it an enemy piece
      else if (isPiece(move[0], move[1]) && (isWhite !== isWhitePiece(move[0], move[1]))) {
        actualAttacks.push(move);
        break;
      }
      // Is it a friendly piece
      else if (isPiece(move[0], move[1])) {
        break;
      }
      // Square is vacant
      else {
        actualMoves.push(move);
      }
    }
  })
  return actualMoves.concat(actualAttacks);
}

function rook(r, c, isWhite) {
  let possibleDirections = ['[r+i, c]', '[r-i, c]', '[r, c+i]', '[r, c-i]']
  return directionalPiece(r, c, isWhite, possibleDirections);
}

function bishop(r, c, isWhite) {
  let possibleDirections = ['[r+i, c+i]', '[r-i, c-i]', '[r-i, c+i]', '[r+i, c-i]']
  return directionalPiece(r, c, isWhite, possibleDirections);
}

function queen(r, c, isWhite) {
  let possibleDirections = ['[r+i, c]', '[r-i, c]', '[r, c+i]', '[r, c-i]', '[r+i, c+i]', '[r-i, c-i]', '[r-i, c+i]', '[r+i, c-i]']
  return directionalPiece(r, c, isWhite, possibleDirections);
}

export { 
  pawn,
  knight,
  rook,
  bishop,
  queen
}