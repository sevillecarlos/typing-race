<template>
  <div>
    <b-sidebar id="sidebar-1" title="Typing Race Rules" shadow>
      <div class="px-3 py-2">
        <p>
          noob x 0 points
        </p>
        <p>
          pro x 50 points
        </p>
        <p>
          master x 60 points
        </p>
        <p>
          leave your mom basement please x 70 points
        </p>

        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
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
          <b-overlay :show="prepareTime !== 0 && showPrepare" rounded="sm">
            <template #overlay>
              <div class="d-flex align-items-center">
                <div class="prepare-time">
                  {{ prepareTime }}
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
            <button v-if="!startGame" @click="startCounter" class="restart-btn">
              Start Game
            </button>
            <Timer />
            <button class="restart-btn" v-b-toggle.sidebar-1>Show Rules</button>
            <br />
            <span v-if="correctsLetter.length !== 0" class="correct-letter">{{
              correctsLetter
            }}</span
            ><span class="word">{{ word }}</span>
            <br />
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
</style>
