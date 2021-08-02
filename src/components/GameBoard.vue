<template>
  <div>
    <SideBar />
    <b-overlay :show="time === 0" rounded="sm">
      <template #overlay>
        <div class="d-flex align-items-center">
          <div class="game-stop">
            <span class="timeout-msg">Your time finish</span>
            <br />
            <button @click="restartGame" class="restart-btn">
              Restart Game
            </button>
            <br />
            <span>You complete {{ completeWordCounter }} words</span>
            <br />.
            <div v-if="!token">
              <span
                >Not sing in? Sign In so you can up level and become a typing
                race master</span
              >
              <a href="/authentication">Sing In</a>
            </div>
          </div>
        </div>
      </template>
      <div class="game-board">
        <div class="game-running">
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
                    Get ready to typing.
                  </p>
                  <p class="step-msg" v-else-if="prepareTime === 2">Ready?</p>
                  <p class="go-msg" v-else>Go!</p>
                </div>
              </div>
            </template>

            <div v-if="token" class="user-score-board">
              <span class="user-level-score">
                {{ userName }} is a
                <span class="level-label">{{ userLevel }}</span>
              </span>
              <span class="user-points">Points: {{ userPoints }}</span>
            </div>
            <br />
            <Timer />
            <div class="word-container">
              <span v-if="correctsLetter.length !== 0" class="correct-letter">{{
                correctsLetter
              }}</span
              ><span class="word">{{ word }}</span>
            </div>
            <div class="btn-container">
              <button
                v-if="!startGame"
                @click="startCounter"
                class="restart-btn"
              >
                Start Game
              </button>

              <button class="show-rules-btn" v-b-toggle.sidebar-1>
                Show Rules
              </button>
            </div>

            <button v-if="startGame" @click="pauseGameBoard">
              {{ pauseGame ? "Resume" : "Pause" }}
            </button>
          </b-overlay>
        </div>
        <br />
      </div>
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
      correctsLetter: "",
      counterLetter: 0,
      wordTypingCounter: 0,
      tempWord: "",
      completeWordCounter: 0,
      showPrepare: false,
    };
  },
  created() {
    this.getWord();

    this.token && this.$store.dispatch("getUserGameData", this.userEmail);
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
          this.completeWordCounter++;
          this.getWord();
          this.counterLetter = 0;
          this.correctsLetter = "";
        }
      }
    },
    restartGame() {
      if (this.token) {
        this.$store.dispatch("addUserGameData", {
          email: this.userEmail,
          completeWords: this.completeWordCounter,
        });
      }
      this.clearState();
      this.getWord();
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
  color: azure;
  font-weight: bold;
}
.word {
  text-transform: uppercase;
  letter-spacing: 5px;
  color: rgb(0, 0, 0);
  font-size: 120px;
  font-weight: bold;
}
.word-container {
  margin: auto;
  text-align: center;
}
.input-word {
  padding: 15px;
  visibility: hidden;
}
.correct-letter {
  color: azure;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: bold;
  font-size: 100px;
}
.timeout-msg {
  font-size: 80px;
  color: black;
}
.user-points {
  color: black;
  font-size: 30px;
}
.level-label {
  background-color: darkblue;
  color: aliceblue;
  border-radius: 20px;
  padding: 20px;
}
.user-level-score {
  font-size: 20px;
  color: black;
}
.btn-container {
  text-align: center;
  padding: 10px;
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
.restart-btn {
  background: rgba(128, 255, 0, 0.295);
}
.show-rules-btn {
  background: rgba(0, 153, 255, 0.295);
}
.btn-container button:hover {
  color: azure;
}
.prepare-msg-container {
  font-size: 40px;
  font-weight: bold;
  color: azure;
}
.overlay-content {
  text-align: center;
}
</style>
