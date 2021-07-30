<template>
  <div class="game-board">
    <span v-if="correctsLetter.length !== 0" class="correct-letter">{{
      correctsLetter
    }}</span
    ><span class="word">{{ word }}</span>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      word: "",
      correctsLetter: "",
      inputLetter: "",
      counterLetter: 0,
      wordTypingCounter: 0,
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
    },
    checkWord() {
      console.log(this.word[this.counterLetter]);
      if (this.word[this.counterLetter] === this.inputLetter) {
        this.counterLetter++;

        const accertLetter = this.word.slice(0, this.counterLetter);
        console.log(accertLetter);
        // this.word = this.word.replace(accertLetter, "");
        this.correctsLetter = accertLetter;
        if (this.word.length === 0) {
          this.getWord();
          this.counterLetter = 0;
        }
      }
    },
  },
  computed: {
    cWord() {
      return this.word;
    },
    cInputLetter() {
      return this.inputLetter;
    },
  },
  watch: {
    inputLetter() {
      this.checkWord();
    },
  },
  mounted() {
    window.addEventListener("keypress", (e) => {
      console.log(e.key);
      this.inputLetter = e.key;
    });
  },
};
</script>

<style>
.game-board {
  background-color: blue;
  width: 50%;
  margin: auto;
  padding: 50px;
}
.word {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: brown;
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
</style>
