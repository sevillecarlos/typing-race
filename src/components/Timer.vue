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
    return {};
  },
  watch: {
    startGame() {
      this.startGame && this.timer();
    },
  },
  computed: {
    ...mapState({
      startGame: "startGame",
      time: "time",
    }),
  },
  methods: {
    timer() {
      const timerCounter = setInterval(() => {
        let timeTemp = this.time;
        timeTemp--;
        this.$store.commit("setTime", timeTemp);
        if (this.time === 0) {
          clearInterval(timerCounter);
          this.$store.commit("setStartGame", false);
        }
      }, 1000);
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
