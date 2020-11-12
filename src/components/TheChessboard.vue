<template>
  <div>
    <div class="chessboard-row" v-for="(row, y) in chessboardState" :key="y">
      <span class="chessboard-square" v-for="(piece, x) in row" :key="x" @click="highlightMoveSquares(piece, x, y)">
        <ChessboardSquare :piece="piece" :isAlternative="y % 2 ? (x % 2 ? true : false) : (x % 2 ? false : true)" :isHighlighted="isHighlighted(x, y)" />
      </span>
    </div>
  </div>
</template>

<script>
import ChessboardSquare from "./ChessboardSquare.vue";

export default {
  name: 'TheChessboard',
  components: {
    ChessboardSquare
  },
  methods: {
    isHighlighted(x, y) {
      return this.highlightedSquares.find(el => el[0] === x && el[1] === y) ? true : false;
    },
    highlightMoveSquares(piece, x, y) {
      this.selectedPiece = piece;
      this.highlightedSquares = this.generatePossibleMoves(piece, x, y);
      console.log(this.highlightedSquares);
    },
    generatePossibleMoves(piece, x, y) {
      switch(piece) {
        case 'P':
          return [[x, y-1]];
        case 'p':
          return [[x, y+1]];
        default:
          return [];
      }
    }
  },
  data() {
    return {
      selectedPiece: '',
      highlightedSquares: [],
      chessboardState: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chessboard-row {
}
.chessboard-square {
  margin: -4px;
  display: table-cell;
}
</style>
