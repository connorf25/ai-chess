<template>
  <div>
    <div class="chessboard-row" v-for="(row, i) in chessboardState" :key="i">
      <span class="chessboard-square" v-for="(piece, j) in row" :key="j" @click="generateMove(piece, i, j)">
        <ChessboardSquare :piece="piece" :isAlternative="i % 2 ? (j % 2 ? true : false) : (j % 2 ? false : true)" />
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
    generateMove(piece, i, j) {
      if(piece) {
        console.log(i, j)
      }
    }
  },
  data() {
    return {
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
