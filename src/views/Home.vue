<template>
  <div class="home">
    <GameBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import GameBoard from "@/components/GameBoard.vue";
export default {
  name: "Home",
  components: {
    GameBoard,
  },
};
</script>
<style scoped>
.home {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
  width: 80%;
  border-top: 3px solid black;
  background: rgba(0, 0, 0, 0.171);
  border-bottom: 3px solid black;
}
</style>
