<template>
  <div>
    <SideBar />

    <div class="game-board">
      <NavBar />
      <b-overlay
        :show="time === 0"
        rounded="sm"
        variant="warning"
        opacity="0.90"
      >
        <template #overlay>
          <div class="d-flex align-items-center">
            <div class="game-stop">
              <span class="timeout-msg">Your time finish</span>
              <br />
              <button @click="restartGame" class="restart-btn">
                Restart
              </button>
              <br />
              <span class="complete-word-msg"
                >You complete {{ completeWordCounter }} words</span
              >
              <br />
              <div v-if="!token" class="not-sign-container">
                <p class="not-sign-in-msg">
                  Not Sign In? Sign In, so you can up levels and become a typing
                  race master
                </p>
              </div>
            </div>
          </div>
        </template>
        <b-overlay
          :show="prepareTime !== 0 && showPrepare"
          rounded="lg"
          class="overlay-prepare"
          variant="warning"
          opacity="0.9"
        >
          <template #overlay>
            <div class="overlay-content">
              <div>
                <span class="prepare-time">
                  {{ prepareTime }}
                </span>
              </div>

              <div class="prepare-msg-container">
                <p class="ready-msg" v-if="prepareTime === 3">
                  Get ready to type.
                </p>
                <p class="step-msg" v-else-if="prepareTime === 2">Ready?</p>
                <p class="go-msg" v-else>Go!</p>
              </div>
            </div>
          </template>
          <div class="game-board-container">
            <div v-if="token" class="user-score-board">
              <span class="user-level-score">
                <span>Level:</span>
                <span class="level">{{ userLevel }}</span>
              </span>
              <div class="points-container">
                <span class="user-points"
                  >Points:<span class="points">{{ userPoints }}</span>
                </span>
              </div>
            </div>
            <br />
            <div class="game-container">
              <Timer />
              <br />
              <span v-if="correctsLetter.length !== 0" class="correct-letter">{{
                correctsLetter
              }}</span
              ><span class="word">{{ word }}</span>
            </div>
            <div v-if="!startGame" class="btn-container">
              <button :disabled="!word" @click="startCounter" class="start-btn">
                Start Game
              </button>

              <button
                class="show-rules-btn"
                @click="showRules = !showRules"
                v-b-toggle.sidebar-1
              >
                {{ showRules ? "Hide" : "Show" }} Rules
              </button>
            </div>
            <div class="pause-btn-container">
              <button
                class="pause-btn"
                v-if="startGame"
                @click="pauseGameBoard"
              >
                {{ pauseGame ? "Resume" : "Pause" }}
              </button>
            </div>
          </div>
        </b-overlay>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Timer from "./Timer.vue";
import SideBar from "../ui/SideBar.vue";
import NavBar from "../ui/NavBar.vue";
import { mapState } from "vuex";
export default {
  name: "GameBoard",
  components: {
    Timer,
    SideBar,
    NavBar,
  },
  data() {
    return {
      word: "",
      nextWord: "",
      verifyWord: "",
      correctsLetter: "",
      counterLetter: 0,
      wordTypingCounter: 0,
      completeWordCounter: 0,
      showPrepare: false,
      showRules: false,
    };
  },
  async created() {
    this.word = await this.getWord();
    this.verifyWord = this.word;
    this.token && this.$store.dispatch("getUserGameData", this.userEmail);
  },
  methods: {
    async getWord() {
      const res = await axios.get(
        "https://random-word-api.herokuapp.com/word?number=5"
      );
      const [data] = await res.data.filter((v) => v.length < 11);
      console.log(data);
      return data;
    },

    checkWord(letter) {
      if (this.verifyWord[this.counterLetter] === letter) {
        this.counterLetter++;
        this.word = this.word.replace(letter, "");
        this.correctsLetter = this.verifyWord.slice(0, this.counterLetter);
        if (this.word.length === 0) {
          this.completeWordCounter++;
          this.word = this.nextWord;
          this.verifyWord = this.word;
          this.counterLetter = 0;
          this.correctsLetter = "";
        }
      }
    },
    async getNextWord() {
      this.nextWord = await this.getWord();
    },
    async restartGame() {
      if (this.token) {
        this.$store.dispatch("addUserGameData", {
          email: this.userEmail,
          completeWords: this.completeWordCounter,
        });
      }
      this.clearState();
      this.word = this.nextWord;
      this.verifyWord = this.word;
      this.$store.commit("setTime", this.originalTime);
    },
    pauseGameBoard() {
      this.$store.commit("setPauseGame", !this.pauseGame);
      this.showPrepare = true;
      if (!this.pauseGame) {
        this.$store.commit("setPrepareTime", 3);
        this.prepareTimeCounter("setPrepareTimePause", true);
      }
    },

    startCounter() {
      this.showPrepare = true;
      this.prepareTimeCounter("setStartGame", true);
    },
    prepareTimeCounter(mutation, value) {
      this.$store.commit("setPrepareTime", 3);
      const countPrepareTime = setInterval(() => {
        let prepareTime = this.prepareTime;
        prepareTime--;
        this.$store.commit("setPrepareTime", prepareTime);
        if (this.prepareTime === 0) {
          clearInterval(countPrepareTime);
          this.$store.commit(mutation, value);
        }
      }, 1000);
    },
    clearState() {
      this.word = "";
      this.correctsLetter = "";
      this.counterLetter = 0;
      this.wordTypingCounter = 0;
      this.tempWord = "";
      this.completeWordCounter = 0;
    },
  },
  computed: {
    ...mapState({
      time: "time",
      startGame: "startGame",
      token: "token",
      userName: "userName",
      userEmail: "userEmail",
      userLevel: "userLevel",
      userPoints: "userPoints",
      pauseGame: "pauseGame",
      prepareTime: "prepareTime",
      prepareTimePause: "prepareTimePause",
      originalTime: "originalTime",
    }),
    startGameKeyEvent() {
      return this.startGame;
    },
  },
  watch: {
    startGameKeyEvent() {},
    verifyWord() {
      this.getNextWord();
    },
  },
  mounted() {
    window.addEventListener("keypress", (ev) => {
      if (this.startGameKeyEvent && !this.pauseGame)
        this.prepareTime === 0 && this.checkWord(ev.key.toLowerCase());
    });
  },
};
</script>

<style>
.game-board {
  margin-top: 5%;
  padding: 1%;
  background: #faa507fa !important;
  border-radius: 10px;
}

.game-container {
  margin-top: 2px;
  text-align: center;
  font-size: 100px;
}

.word {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.correct-letter {
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 100px;
}
.input-word {
  padding: 15px;
  visibility: hidden;
}
.timeout-msg {
  font-size: 65px;
  font-weight: bold;
}
.user-points {
  color: black;
  font-size: 20px;
}

.user-score-board {
  padding: 2%;
}

.level {
  font-weight: bold;
  font-size: 25px;
  padding: 3px;
  text-align: justify !important;
  border-radius: 15px;
}
.user-level-score {
  font-size: 20px;
  float: left;
  color: black;
}
.btn-container {
  text-align: center;
  padding: 10px;
}
.game-stop {
  text-align: center;
  padding: 15px;
  color: black !important;
}

.points-container {
  float: right;
}
.points {
  font-weight: bold;
  font-size: 30px;
  padding: 1px;
  padding: 15px;

  border-radius: 15px;
}
.start-btn {
  background: rgb(115, 255, 0) !important;
  margin-right: 10px;
}
.show-rules-btn {
  background: rgb(0, 153, 255);
}

.prepare-msg-container {
  font-size: 40px;
  color: black;
  font-weight: bold;
}
.prepare-time {
  font-size: 80px;
  color: black;
  font-weight: bold;
}

.complete-word-msg {
  color: black;
  font-size: 25px;
  font-weight: bold;
}
.overlay-content {
  text-align: center;
}
.pause-btn-container {
  text-align: center;
}
.restart-btn {
  background: rgb(115, 255, 0) !important;
  font-size: 20px;
  font-weight: bold;
  border: none;
}
.pause-btn {
  font-size: 25px !important;
  background: rgb(255, 0, 51) !important;
}

.not-sign-container * {
  color: rgb(0, 0, 0);
  font-weight: bold;
  padding: 10px;
}
.sign-in-link-overlay {
  text-decoration: none;
  color: black !important;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  background: rgba(206, 14, 14, 0.507);
  padding: 5px;
}
.sign-in-link-overlay:hover {
  color: beige !important;
}
/***************************************************************************/
/* Big tablets to 1200px*/
@media only screen and (max-width: 1200px) {
  .game-board {
    margin-top: 1%;
    padding: 25px;
    background: #faa507fa !important;
    border-radius: 10px;
  }

  .game-container {
    margin-top: 30px;
    text-align: center;
    font-size: 100px;
  }

  .word {
    text-transform: uppercase;
    color: rgb(0, 0, 0);
    font-weight: bold;
  }

  .correct-letter {
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-weight: bold;
    font-size: 100px;
  }
  .input-word {
    padding: 15px;
    visibility: hidden;
  }

  .timeout-msg {
    font-size: 65px;
    font-weight: bold;
  }
  .user-points {
    color: black;
    font-size: 20px;
  }
  .level-label {
    font-weight: bold;
    font-size: 25px;
    padding: 3px;
    text-align: justify !important;
    border-radius: 15px;
  }
  .user-level-score {
    font-size: 20px;
    float: left;
    color: black;
  }
  .btn-container {
    text-align: center;
    padding: 10px;
  }
  .game-stop {
    text-align: center;
    padding: 15px;
    color: black !important;
  }

  .points-container {
    float: right;
  }
  .points {
    font-weight: bold;
    font-size: 30px;
    padding: 1px;
    border-radius: 15px;
  }
  .start-btn {
    background: rgb(115, 255, 0) !important;
    margin-right: 10px;
  }
  .show-rules-btn {
    background: rgb(0, 153, 255);
  }

  .prepare-msg-container {
    font-size: 40px;
    color: black;
    font-weight: bold;
  }
  .prepare-time {
    font-size: 80px;
    color: black;
    font-weight: bold;
  }

  .complete-word-msg {
    color: black;
    font-size: 25px;
    font-weight: bold;
  }
  .overlay-content {
    text-align: center;
  }
  .pause-btn-container {
    text-align: center;
  }
  .restart-btn {
    background: rgb(115, 255, 0) !important;
    font-size: 20px;
    font-weight: bold;
    border: none;
  }
  .pause-btn {
    font-size: 25px !important;
    background: rgb(255, 0, 51) !important;
  }

  .not-sign-container * {
    color: rgb(0, 0, 0);
    font-weight: bold;
    padding: 10px;
  }
  .sign-in-link-overlay {
    text-decoration: none;
    color: black !important;
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    background: rgba(206, 14, 14, 0.507);
    padding: 5px;
  }
  .sign-in-link-overlay:hover {
    color: beige !important;
  }
}

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
    .game-board {
    margin-top: 3%;
    padding: 5px;
  }
  .restart-btn {
    font-size: 25px !important;
  }
  .word,
  .correct-letter {
    font-size: 80px;
    letter-spacing: 1px;
  }
  .game-container {
    margin-top: 2px;
  }


  .prepare-msg-container {
    font-size: 50px;
    color: black;
    font-weight: bold;
  }
  .prepare-time {
    font-size: 55px;
    color: black;
    font-weight: bold;
  }
  .timeout-msg {
    font-size: 50px;
    font-weight: bold;
  }

  .game-stop {
    padding: 5px;
  }
  .not-sign-container * {
    color: rgb(0, 0, 0);
    font-weight: bold;
    padding: 1px;
    font-size: 25px;
  }
  .complete-word-msg {
    font-size: 25px;
  }

  .user-points {
    color: black;
    font-size: 25px;
  }
  .level {
    font-weight: bold;
    font-size: 25px;
    padding: 1px;
    text-align: justify !important;
    border-radius: 15px;
  }
  .user-level-score {
    font-size: 24px;
    float: left;
    color: black;
  }

  .points {
    font-weight: bold;
    font-size: 25px;
    padding: 1px;
    border-radius: 15px;
  }
}

/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .game-board {
    margin-top: 3%;
    padding: 5px;
  }
  .restart-btn {
    font-size: 20px !important;
  }
  .word,
  .correct-letter {
    font-size: 60px;
    letter-spacing: 1px;
  }
  .game-container {
    margin-top: 2px;
  }


  .prepare-msg-container {
    font-size: 40px;
    color: black;
    font-weight: bold;
  }
  .prepare-time {
    font-size: 45px;
    color: black;
    font-weight: bold;
  }
  .timeout-msg {
    font-size: 30px;
    font-weight: bold;
  }

  .game-stop {
    padding: 5px;
  }
  .not-sign-container * {
    color: rgb(0, 0, 0);
    font-weight: bold;
    padding: 1px;
    font-size: 20px;
  }
  .complete-word-msg {
    font-size: 20px;
  }

  .user-points {
    color: black;
    font-size: 20px;
  }
  .level {
    font-weight: bold;
    font-size: 25px;
    padding: 1px;
    text-align: justify !important;
    border-radius: 15px;
  }
  .user-level-score {
    font-size: 20px;
    float: left;
    color: black;
  }

  .points {
    font-weight: bold;
    font-size: 25px;
    padding: 1px;
    border-radius: 15px;
  }
}

/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .game-board {
    margin-top: 1%;
    padding: 1px;
  }
  .restart-btn {
    font-size: 15px !important;
  }
  .word,
  .correct-letter {
    font-size: 40px;
    letter-spacing: 1px;
  }
  .game-container {
    margin-top: 1px;
  }

  .start-btn {
    background: rgb(115, 255, 0) !important;
    margin-right: 10px;
  }
  .show-rules-btn {
    background: rgb(0, 153, 255);
  }

  .prepare-msg-container {
    font-size: 30px;
    color: black;
    font-weight: bold;
  }
  .prepare-time {
    font-size: 40px;
    color: black;
    font-weight: bold;
  }
  .timeout-msg {
    font-size: 25px;
    font-weight: bold;
  }

  .game-stop {
    padding: 5px;
  }
  .not-sign-container * {
    color: rgb(0, 0, 0);
    font-weight: bold;
    padding: 1px;
    font-size: 15px;
  }
  .complete-word-msg {
    font-size: 15px;
  }

  .user-points {
    color: black;
    font-size: 15px;
  }
  .level {
    font-weight: bold;
    font-size: 25px;
    padding: 1px;
    text-align: justify !important;
    border-radius: 15px;
  }
  .user-level-score {
    font-size: 15px;
    float: left;
    color: black;
  }

  .points {
    font-weight: bold;
    font-size: 25px;
    padding: 1px;
    border-radius: 15px;
  }
}
</style>
