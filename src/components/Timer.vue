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
      }
    },
    prepareTimePause() {
      if (this.prepareTimePause) {
        this.timer();
        this.$store.commit("setPrepareTimePause", false);
      }
    },
  },
  computed: {
    ...mapState({
      startGame: "startGame",
      time: "time",
      pauseGame: "pauseGame",
      prepareTimePause: "prepareTimePause",
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
.timer{
  text-align: center;
}
.time {
  font-size: 40px;
  color: black;
  font-weight: bold;
}
</style>
