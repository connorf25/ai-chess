<template>
  <div>
    <div class="chessboard-row" v-for="(row, r) in chessboardState" :key="r">
      <span class="chessboard-square" v-for="(piece, c) in row" :key="c" @click="onClickSquare(r, c)">
        <ChessboardSquare :piece="piece" :isAlternative="r % 2 ? (c % 2 ? true : false) : (c % 2 ? false : true)" :isHighlighted="isHighlighted(r, c)" />
      </span>
    </div>
  </div>
</template>

<script>
import ChessboardSquare from "./ChessboardSquare.vue";
import { getChessboardState, getPossibleMoves, movePiece } from "../game/chess";

export default {
  name: 'TheChessboard',
  components: {
    ChessboardSquare
  },
  computed: {
    chessboardState: getChessboardState,
  },
  data() {
    return {
      selectedPiece: null,
      highlightedSquares: []
    }
  },
  methods: {
    onClickSquare(r, c) {
      console.log([r, c])
      // Move a Piece
      if (this.selectedPiece && this.isHighlighted(r, c)) {
        console.log("Moving piece")
        // Move piece to that square
        movePiece(this.selectedPiece[0], this.selectedPiece[1], r, c);
        this.highlightedSquares = [];
        this.selectedPiece = null;
      }
      // Get possible moves for piece
      else {
        // Is a piece
        if (this.chessboardState[r][c] !== '') {
          this.highlightedSquares = getPossibleMoves(r, c);
          this.selectedPiece = [r, c];
        // Is an empty square
        } else {
          this.highlightedSquares = [];
          this.selectedPiece = null;
        }
      }
    },
    isHighlighted(r, c) {
      return this.highlightedSquares.find(el => el[0] === r && el[1] === c) ? true : false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chessboard-square {
  margin: -4px;
  display: table-cell;
}
</style>
