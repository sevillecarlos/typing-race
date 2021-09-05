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
/* Big tablets to 1200px*/
@media only screen and (max-width: 1200px) {
}

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
    .home {
    width: 100%;
  }
}

/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
    .home {
    width: 100%;
  }
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .home {
    width: 100%;
  }
}
</style>
