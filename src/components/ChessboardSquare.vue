<template>
  <div :class="generateClass()">
    <img v-if="piece" :src="getImgUrl(piece)" />
  </div>
</template>

<script>
export default {
  name: 'ChessboardSquare',
  props: {
    isAlternative: Boolean,
    isHighlighted: Boolean,
    piece: String
  },
  methods: {
    isUpperCase(char) {
      return char === char.toUpperCase();
    },
    getImgUrl(piece) {
      var white = require.context('../assets/pieces/white', false, /\.png$/)
      var black = require.context('../assets/pieces/black', false, /\.png$/)
      if (this.isUpperCase(piece))
        return white('./' + piece + ".png");
      else
        return black('./' + piece + ".png");
    },
    generateClass() {
      let returnClass = "chess-square";
      if (this.isAlternative)
        returnClass += " light";
      else
        returnClass += " dark";
      if (this.isHighlighted)
        returnClass += " highlight";
      return returnClass
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chess-square {
  height: 60px;
  width: 60px;
  margin: 0px;
  border: 1px solid black;
}
.light {
  background-color: white;
}
.dark {
  background-color: rgb(120, 120, 41);
}
.highlight {
  background-color: aqua;
}
</style>
