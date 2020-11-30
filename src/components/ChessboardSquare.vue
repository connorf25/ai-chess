<template>
  <div :class="generateClass">
    <img v-if="piece" :src="getImgUrl(piece)" />
  </div>
</template>

<script>
export default {
  name: 'ChessboardSquare',
  props: {
    isAlternative: Boolean,
    isMove: Boolean,
    isAttack: Boolean,
    piece: String
  },
  computed: {
    generateClass: function() {
      let returnClass = "chess-square";
      if (this.isAlternative)
        returnClass += " light";
      else
        returnClass += " dark";
      if (this.isMove)
        returnClass += " move";
      if (this.isAttack)
        returnClass += " attack"
      return returnClass;
    }
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
.move {
  background-color: rgba(0, 255, 255, 0.5);
}
.attack {
  background-color: rgba(255, 0, 0, 0.5)
}
</style>
