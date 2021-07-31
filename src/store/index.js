import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
  actions: {
    async signIn(_, payload) {
      const res = await axios.post(`http://localhost:5000/signin`, payload);
      const { jwtToken } = await res.data;

      localStorage.setItem("@uth", jwtToken);
    },
    async signUp(_, payload) {
      const res = await axios.post(`http://localhost:5000/signup`, payload);
      const { jwtToken } = await res.data;

      localStorage.setItem("@uth", jwtToken);
    },
    signOut() {
      localStorage.removeItem("@uth");
    },
  },
  modules: {},
});
