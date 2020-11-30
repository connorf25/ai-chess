<template>
  <div>
    <div class="chessboard-row" v-for="(row, r) in chessboardState" :key="r">
      <span class="chessboard-square" v-for="(piece, c) in row" :key="c" @click="onClickSquare(r, c)">
        <ChessboardSquare 
          :piece="piece"
          :isAlternative="r % 2 ? (c % 2 ? true : false) : (c % 2 ? false : true)"
          :isMove="isHighlighted(r, c, 'move')" 
          :isAttack="isHighlighted(r, c, 'attack')"
        />
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
      moveSquares: [],
      attackSquares: []
    }
  },
  methods: {
    onClickSquare(r, c) {
      // Move a Piece
      if (this.selectedPiece && this.isHighlighted(r, c)) {
        // Move piece to that square
        movePiece(this.selectedPiece[0], this.selectedPiece[1], r, c);
        this.moveSquares = [];
        this.attackSquares = [];
        this.selectedPiece = null;
      }
      // Get possible moves for piece
      else {
        const { moves, attacks } = getPossibleMoves(r, c);
        this.moveSquares = moves;
        this.attackSquares = attacks;
        // Is not a piece/that players move/possible move
        if (this.moveSquares.length === 0 && this.attackSquares.length === 0)
          this.selectedPiece = null;
        else
          this.selectedPiece = [r, c];
      }
    },
    isHighlighted(r, c, type = 'both') {
      switch(type) {
        case('move'):
          return this.moveSquares.find(el => el[0] === r && el[1] === c) ? true : false;
        case('attack'):
          return this.attackSquares.find(el => el[0] === r && el[1] === c) ? true : false;
        case('both'): {
          const both = this.moveSquares.concat(this.attackSquares);
          return both.find(el => el[0] === r && el[1] === c) ? true : false;
        }
        default:
          throw("Type not correctly specified in isHighlighted function:", type);
      }
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
