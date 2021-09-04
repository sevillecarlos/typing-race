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
  margin-top: 1px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  width: 75%;
}
</style>
