<template>
  <div class="timer">
    <span class="time">
      {{ time }}
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      timerCounter: null,
      prepareTimer: null,
    };
  },
  watch: {
    startGame() {
      this.startGame && this.timer();
    },
    pauseGame() {
      if (this.pauseGame) {
        clearInterval(this.timerCounter);
      } else {
        this.timer();
      }
    },
  },
  computed: {
    ...mapState({
      startGame: "startGame",
      time: "time",
      pauseGame: "pauseGame",
    }),
  },
  methods: {
    timer() {
      this.timerCounter = setInterval(this.timeCounter, 1000);
    },
    timeCounter() {
      let timeTemp = this.time;
      timeTemp--;
      this.$store.commit("setTime", timeTemp);
      if (this.time === 0) {
        clearInterval(this.timerCounter);
        this.$store.commit("setStartGame", false);
      }
    },
  },
};
</script>

<style>
.time {
  font-size: 40px;
  color: black;
}
</style>
