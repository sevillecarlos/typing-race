<template>
  <div class="game-board">
    <div class="game-running" v-if="time !== 0">
      <button v-if="!startGame" @click="startCounter" class="restart-btn">
        Start Game
      </button>
      <Timer />
      <span v-if="correctsLetter.length !== 0" class="correct-letter">{{
        correctsLetter
      }}</span
      ><span class="word">{{ word }}</span>
    </div>
    <div class="game-stop" v-else>
      <span class="timeout-msg">Your time finish</span>
      <br />
      <button @click="restartGame" class="restart-btn">Restart Game</button>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import Timer from "./Timer.vue";
import { mapState } from "vuex";
export default {
  name: "GameBoard",
  components: {
    Timer,
  },
  data() {
    return {
      word: "",
      correctsLetter: "",
      counterLetter: 0,
      wordTypingCounter: 0,
      tempWord: "",
    };
  },
  created() {
    this.getWord();
  },
  methods: {
    async getWord() {
      const res = await axios.get(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const [data] = await res.data;
      this.word = data;
      this.tempWord = data;
    },
    checkWord(letter) {
      if (this.tempWord[this.counterLetter] === letter) {
        this.counterLetter++;
        this.word = this.word.replace(letter, "");

        this.correctsLetter = this.tempWord.slice(0, this.counterLetter);
        if (this.word.length === 0) {
          this.getWord();
          this.counterLetter = 0;
          this.correctsLetter = "";
        }
      }
    },
    restartGame() {
      this.clearState();
      this.getWord();
      this.$store.commit("setTime", -1);
    },
    startCounter() {
      this.$store.commit("setStartGame", true);
    },
    clearState() {
      (this.word = ""),
        (this.correctsLetter = ""),
        (this.counterLetter = 0),
        (this.wordTypingCounter = 0),
        (this.tempWord = "");
    },
  },
  computed: {
    ...mapState({
      time: "time",
      startGame: "startGame",
    }),
  },
  watch: {},
  mounted() {
    window.addEventListener("keypress", (ev) => {
      this.checkWord(ev.key);
    });
  },
};
</script>

<style>
.game-board {
  background-color: rgb(69, 82, 39);
  width: 50%;
  margin: auto;
  padding: 50px;
}
.word {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgb(0, 0, 0);
  font-size: 70px;
}
.input-word {
  padding: 15px;
  visibility: hidden;
}
.correct-letter {
  color: cornsilk;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 70px;
}
.timeout-msg {
  font-size: 80px;
  color: black;
}
.restart-btn {
  font-size: 20px;
  padding: 15px;
  border-radius: 20px;
}
</style>
