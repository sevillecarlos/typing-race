<template>
  <div class="timer">
    <span class="time">
      {{ time }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 5,
    };
  },
  created() {
    this.timer();
  },
  methods: {
    timer() {
      const timerCounter = setInterval(() => {
        this.time--;
        this.$store.commit("setTime", this.time);
        if (this.time === 0) {
          clearInterval(timerCounter);
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
