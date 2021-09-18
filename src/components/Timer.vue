<template>
  <span class="time">
    {{ time }}
  </span>
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
/******************************/
/**TIMER**/
.time {
  font-size: 2vw;
  color: black;
  font-weight: bold;
}

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
  .time {
    font-size: 40px;
  }
}

/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .time {
    font-size: 35px;
  }
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .time {
    font-size: 30px;
  }
}
</style>
