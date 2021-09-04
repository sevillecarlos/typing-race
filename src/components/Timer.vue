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
      time: 5,
    };
  },
  watch: {
    startGame() {
      this.startGame && this.timer();
    },
  },
  computed: {
    ...mapState({
      startGame: "startGame",
    }),
  },
  methods: {
    timer() {
      const timerCounter = setInterval(() => {
        this.time--;
        this.$store.commit("setTime", this.time);
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
