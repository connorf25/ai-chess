<template>
  <div :class="isAlternative ? 'chess-square dark' : 'chess-square light'">
    {{piece}}
  </div>
</template>

<script>
export default {
  name: 'ChessboardSquare',
  props: {
    isAlternative: Boolean,
    piece: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chess-square {
  height: 50px;
  width: 50px;
  margin: 0px;
  border: 1px solid black;
}
.light {
  background-color: white;
}
.dark {
  background-color: rgb(73, 83, 25);
}
</style>
