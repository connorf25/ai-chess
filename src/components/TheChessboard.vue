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
      // Move a Piece
      if (this.selectedPiece && this.isHighlighted(r, c)) {
        // Move piece to that square
        movePiece(this.selectedPiece[0], this.selectedPiece[1], r, c);
        this.highlightedSquares = [];
        this.selectedPiece = null;
      }
      // Get possible moves for piece
      else {
        this.highlightedSquares = getPossibleMoves(r, c);
        // Is not a piece/that players move
        if (this.highlightedSquares.length === 0)
          this.selectedPiece = null;
        else
          this.selectedPiece = [r, c];
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
