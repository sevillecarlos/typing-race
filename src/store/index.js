import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    time: -1,
    startGame: false,
    token: "",
  },
  mutations: {
    setTime(state, payload) {
      state.time = payload;
    },
    setStartGame(state, payload) {
      state.startGame = payload;
    },
    setToken(state, payload) {
      state.token = payload;
      console.log(payload);
    },
  },
  actions: {
    async signIn({ commit }, payload) {
      const res = await axios.post(`http://localhost:5000/signin`, payload);
      const { jwtToken } = await res.data;
      commit("setToken", jwtToken);
      localStorage.setItem("@uth", jwtToken);
    },
    async signUp({ commit }, payload) {
      const res = await axios.post(`http://localhost:5000/signup`, payload);
      const { jwtToken } = await res.data;
      commit("setToken", jwtToken);
      localStorage.setItem("@uth", jwtToken);
    },
    getToken({ commit }) {
      const token = localStorage.getItem("@uth");
      if (token) {
        commit("setToken", token);
      }
    },
    signOut({ commit }) {
      localStorage.removeItem("@uth");
      commit("setToken", "");
    },
  },
  modules: {},
});
