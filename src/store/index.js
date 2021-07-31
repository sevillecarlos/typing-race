import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    time: -1,
    startGame: false,
  },
  mutations: {
    setTime(state, payload) {
      state.time = payload;
    },
    setStartGame(state, payload) {
      state.startGame = payload;
    },
  },
  actions: {},
  modules: {},
});
