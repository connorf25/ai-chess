import { getChessboardState } from "../chess.js";

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

export {
  isWhitePiece,
  isPiece,
  squareExists
}