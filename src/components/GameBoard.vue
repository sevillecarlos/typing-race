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
              <button @click="restartGame" class="restart-btn">
                Restart Game
              </button>
              <div>
                <span class="complete-word-msg"
                  >You complete {{ completeWordCounter }} words</span
                >
              </div>
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
              <div class="user-level-point">
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
              <button
                :disabled="word === '...Loading'"
                @click="startCounter"
                class="start-btn"
              >
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
          <div class="sound-container">
            <b-icon
              :icon="playGameMusic ? 'volume-up-fill' : 'volume-mute-fill'"
              @click="playGameMusic = !playGameMusic"
              variant="dark"
              class="sound-icon"
            ></b-icon>
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

import gameMusic from "../assets/game-music.wav";
import timeCountSound from "../assets/time-count-sound.wav";
import gamePauseSound from "../assets/pause-game-sound.wav";


const gameAudio = new Audio(gameMusic);
const timeCountAudio = new Audio(timeCountSound);
const gamePauseAudio = new Audio(gamePauseSound);


export default {
  name: "GameBoard",
  components: {
    Timer,
    SideBar,
    NavBar,
  },
  data() {
    return {
      word: "...Loading",
      nextWord: "",
      verifyWord: "",
      correctsLetter: "",
      counterLetter: 0,
      wordTypingCounter: 0,
      completeWordCounter: 0,
      showPrepare: false,
      showRules: false,
      playGameMusic: true,
    };
  },
  async created() {
    this.word = await this.getWord();
    this.verifyWord = this.word;
    this.token && this.$store.dispatch("getUserGameData", this.userEmail);
    gameAudio.loop = true;
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
      gameAudio.volume = 1;
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
      gameAudio.volume = 0.05;

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
    playGameMusic() {
      if (this.playGameMusic) {
        gameAudio.play();
      } else {
        gameAudio.pause();
      }
    },
    time() {
      timeCountAudio.play();
    },
    pauseGame() {
      if (this.pauseGame) {
        gamePauseAudio.volume = 0.8;
        gamePauseAudio.play();
      }
    },
  },
  mounted() {
    gameAudio.play();
    window.addEventListener("keypress", (ev) => {
      if (this.startGameKeyEvent && !this.pauseGame)
        this.prepareTime === 0 && this.checkWord(ev.key.toLowerCase());
    });
  },
};
</script>

<style>
/******************************/
/**GAMEBOARD**/
.game-board {
  margin-top: 1vw;
  padding: 1%;
  background: #faa507fa !important;
  border-radius: 10px;
}
.game-container {
  margin-top: 2px;
  text-align: center;
  font-size: 5vw;
}
.sound-container {
  text-align: right;
  padding: 5px;
  font-size: 2vw;
}
.sound-icon:hover {
  color: rgb(88, 86, 84) !important;
  cursor: pointer;
}

/******************************/
/**WORD INPUT**/
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
}
.input-word {
  padding: 15px;
  visibility: hidden;
}
/******************************/
/**USER POINTS AND LEVEL**/
.user-points {
  color: black;
  font-size: 1vw;
}
.user-score-board {
  padding: 2%;
}
.user-level-score {
  font-size: 1vw;
  float: left;
  color: black;
}
.level {
  font-weight: bold;
  font-size: 2vw;
  padding: 3px;
  text-align: justify !important;
  border-radius: 15px;
}
.user-level-point {
  float: right;
}
.points {
  font-weight: bold;
  font-size: 2vw;
  padding: 2%;
  border-radius: 15px;
}
/******************************/
/**BUTTONS**/
.btn-container {
  text-align: center;
  padding: 1%;
}
.game-stop {
  text-align: center;
  box-sizing: border-box;
  color: black !important;
}
.game-stop * {
  padding: 5px;
}
.start-btn {
  background: rgb(115, 255, 0) !important;
  margin-right: 10px;
}
.show-rules-btn {
  background: rgb(0, 153, 255);
}
.restart-btn {
  background: rgb(115, 255, 0);
}
.pause-btn {
  background: rgb(255, 0, 51);
}

/******************************/
/**PREPARE START**/
.prepare-msg-container {
  font-size: 2vw;
  color: black;
  font-weight: bold;
}
.prepare-time {
  font-size: 4vw;
  color: black;
  font-weight: bold;
}
/******************************/
/**FINISH GAME**/
.timeout-msg {
  font-size: 2.5vw;
  font-weight: bold;
}

.complete-word-msg {
  color: black;
  font-size: 1.5vw;
  font-weight: bold;
  padding: 5px;
}

/******************************/
/**FINISH GAME**/
.overlay-content {
  text-align: center;
}
.pause-btn-container {
  text-align: center;
}
.not-sign-container {
  border-top: 2px solid black;
  color: rgb(0, 0, 0);
  font-weight: bold;
  padding: 10px;
  font-size: 0.9vw;
}

/***************************************************************************/

/* Small tablets to big tablets: from 768 to 1032*/
@media only screen and (max-width: 1032px) {
  .game-board {
    margin-top: 10%;
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
    .sound-container {
  font-size: 3vw;
}

}
/* Small phones to small tablets: from 481 to 767*/
@media only screen and (max-width: 767px) {
  .game-board {
    margin-top: 15%;
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
    .sound-container {
  font-size: 5vw;
}

}
/*Small Phone from 0 to 480px*/
@media only screen and (max-width: 400px) {
  .game-board {
    margin-top: 30%;
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
  .sound-container {
  font-size: 5vw;
}
}
</style>
