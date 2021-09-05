import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
import { jwtDecoded } from "../helper/jwtDecoded";

export default new Vuex.Store({
  state: {
    time: 45,
    originalTime: 45,
    prepareTime: 0,
    startGame: false,
    token: "",
    userPoints: 0,
    userName: "",
    userEmail: "",
    userPhoto: "",
    points: "",
    userLevel: "",
    pauseGame: false,
    prepareTimePause: false,
    error: "",
    error2: "",
  },
  mutations: {
    setTime(state, payload) {
      state.time = payload;
    },
    setOriginalTime(state, payload) {
      state.originalTime = payload;
    },
    setPrepareTime(state, payload) {
      state.prepareTime = payload;
    },
    setStartGame(state, payload) {
      state.startGame = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setUserPoints(state, payload) {
      state.userPoints = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUserEmail(state, payload) {
      state.userEmail = payload;
    },
    setUserPhoto(state, payload) {
      state.userPhoto = payload;
    },
    setUserLevel(state, payload) {
      state.userLevel = payload;
    },
    setPauseGame(state, payload) {
      state.pauseGame = payload;
    },
    setPrepareTimePause(state, payload) {
      state.prepareTimePause = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setError2(state, payload) {
      state.error2 = payload;
    },
  },
  actions: {
    async signIn({ commit }, payload) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_URL}/signin`,
          payload
        );
        const data = await res.data;
        if (data?.error) {
          commit("setError", data.error);
        } else {
          const { jwtToken } = data;
          commit("setToken", jwtToken);
          localStorage.setItem("@uth", jwtToken);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async signUp({ commit }, payload) {
      try {
        const res = await axios.post(`${process.env.VUE_APP_URL}/signup`, payload);
        const data = await res.data;
        if (data?.error) {
          commit("setError2", data.error);
        } else {
          const { jwtToken } = data;
          commit("setToken", jwtToken);
          localStorage.setItem("@uth", jwtToken);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getToken({ commit }) {
      const token = localStorage.getItem("@uth");
      if (token) {
        commit("setToken", token);
      }
    },
    getUserData({ commit }, token) {
      const { name, email, userPhoto } = jwtDecoded(token);
      const firstName = name.split(" ").shift();
      commit("setUserEmail", email);
      commit("setUserName", firstName);
      commit("setUserPhoto", userPhoto);
    },
    signOut({ commit }) {
      localStorage.removeItem("@uth");
      commit("setToken", "");
    },

    async getUserGameData({ commit }, email) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_URL}/get-user-data-game`,
          {
            email,
          }
        );
        const {
          user: { points, level, time },
        } = await res.data;
        commit("setUserPoints", points);
        commit("setUserLevel", level);
        commit("setTime", time);
        commit("setOriginalTime", time);
      } catch (error) {
        console.log(error);
      }
    },
    async addUserGameData({ commit }, gameData) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_URL}/add-user-game-data`,
          gameData
        );
        const { user } = await res.data;
        const [userData] = user;
        const { points, level } = userData;
        commit("setUserPoints", points);
        commit("setUserLevel", level);
      } catch (error) {
        console.log(error);
      }
    },
    async restartGame({ commit }, email) {
      try {
        const res = await axios.put(`${process.env.VUE_APP_URL}/restart-game`, {
          email,
        });
        const {
          user: { points, level, time },
        } = await res.data;
        commit("setUserPoints", points);
        commit("setUserLevel", level);
        commit("setTime", time);
        commit("setOriginalTime", time);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
