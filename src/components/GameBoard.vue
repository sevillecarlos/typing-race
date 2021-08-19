<template>
  <div>
    <SideBar />
    <b-overlay
      :show="prepareTime !== 0 && showPrepare"
      rounded="lg"
      class="overlay-prepare"
      variant="dark"
      opacity="0.90"
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
      <b-overlay :show="time === 0" rounded="sm" variant="dark" opacity="0.90">
        <template #overlay>
          <div class="d-flex align-items-center">
            <div class="game-stop">
              <span class="timeout-msg">Your time finish</span>
              <br />
              <button @click="restartGame" class="restart-btn">
                Restart Game
              </button>
              <br />
              <span class="complete-word-msg"
                >You complete {{ completeWordCounter }} words</span
              >
              <br />.
              <div v-if="!token" class="not-sign-container">
                <p class="not-sign-in-msg">
                  Not Sing In? Sign In so you can up levels and become a typing
                  race master
                </p>
                <a class="sign-in-link-overlay" href="/authentication"
                  >Sing In</a
                >
              </div>
            </div>
          </div>
        </template>
        <div class="game-board">
          <div class="game-running">
            <div v-if="token" class="user-score-board">
              <span class="user-level-score">
                <span>Level:</span>
                <span class="level-label">{{ userLevel }}</span>
              </span>
              <div class="points-container">
                <span class="user-points"
                  >Points: <span class="points">{{ userPoints }}</span>
                </span>
              </div>
            </div>
            <br />
            <div class="game-container">
              <Timer />

              <span v-if="correctsLetter.length !== 0" class="correct-letter">{{
                correctsLetter
              }}</span
              ><span class="word">{{ word }}</span>
            </div>
            <div v-if="!startGame" class="btn-container">
              <button @click="startCounter" class="start-btn">
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
          <br />
        </div>
      </b-overlay>
    </b-overlay>
  </div>
</template>

<script>
import axios from "axios";
import Timer from "./Timer.vue";
import SideBar from "../ui/SideBar.vue";
import { mapState } from "vuex";
export default {
  name: "GameBoard",
  components: {
    Timer,
    SideBar,
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
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const [data] = await res.data;
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
        console.log(prepareTime);
        this.$store.commit("setPrepareTime", prepareTime);
        if (this.prepareTime === 0) {
          clearInterval(countPrepareTime);
          this.$store.commit(mutation, value);
        }
      }, 1000);
    },
    clearState() {
      (this.word = ""),
        (this.correctsLetter = ""),
        (this.counterLetter = 0),
        (this.wordTypingCounter = 0),
        (this.tempWord = "");
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
  userLevel() {
    console.log(this.userLevel);
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
  margin: auto;
  padding: 50px;
  border-left: 3px solid black;
  border-right: 3px solid black;
  background: rgba(0, 0, 0, 0.199);
}
.prepare-time {
  font-size: 80px;
  color: beige;
  font-weight: bold;
}
.word {
  text-transform: uppercase;
  letter-spacing: 5px;
  color: rgb(0, 0, 0);
  font-size: 100px;
  font-weight: bold;
}
.game-container {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;

  text-align: center;
}
.input-word {
  padding: 15px;
  visibility: hidden;
}
.correct-letter {
  color: beige;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: bold;
  font-size: 100px;
}
.timeout-msg {
  font-size: 65px;
  color: beige;
  font-weight: bold;
}
.user-points {
  color: black;
  font-size: 20px;
}
.level-label {
  font-weight: bold;
  font-size: 25px;
  padding: 2.5px;
  background: rgba(0, 0, 255, 0.445);
  border-top: 2px solid black !important;
  border-bottom: 2px solid black !important;
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
}
.btn-container button {
  border: none;
  margin: 5px;
  font-weight: bold;
  font-size: 20px;
  padding: 15px;
  border-top: 2px solid black !important;
  border-bottom: 2px solid black !important;
}
.points-container {
  float: right;
}
.points {
  font-weight: bold;
  font-size: 30px;
  padding: 1px;
  border-top: 2px solid black !important;
  border-bottom: 2px solid black !important;
  background: rgba(255, 255, 0, 0.527);
}
.start-btn {
  background: rgba(128, 255, 0, 0.295);
}
.show-rules-btn {
  background: rgba(0, 153, 255, 0.295);
}
.btn-container button:hover {
  color: beige;
}
.prepare-msg-container {
  font-size: 40px;
  color: beige;
}
.complete-word-msg {
  color: beige;
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
  background: rgba(143, 187, 108, 0.747);
  font-size: 20px;
  padding: 5px;
  font-weight: bold;
  border: none;
  border-top: 2px solid black !important;
  border-bottom: 2px solid black !important;
}
.restart-btn:hover {
  color: beige !important;
}
.pause-btn {
  background: rgba(74, 75, 77, 0.747);
  font-size: 20px;
  padding: 5px;
  border: none;
  border-top: 2px solid black !important;
  border-bottom: 2px solid black !important;
}
.pause-btn:hover {
  color: beige !important;
}
.not-sign-container * {
  color: beige;
  font-weight: bold;
  padding: 15px;
}
.sign-in-link-overlay {
  text-decoration: none;
  color: black !important;
  font-size: 20px;
  letter-spacing: 1px;
  border-left: 2px solid black;
  border-right: 2px solid black;
  font-weight: bold;
  background: rgba(206, 14, 14, 0.507);
  padding: 5px;
}
.sign-in-link-overlay:hover {
  color: beige !important;
}
</style>
