<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <TheChessboard />
  </div>
</template>

<script>
import TheChessboard from './components/TheChessboard.vue'

export default {
  name: 'App',
  components: {
    TheChessboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
