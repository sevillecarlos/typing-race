import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    time: -1,
  },
  mutations: {
    setTime(state, payload) {
      state.time = payload;
    },
  },
  actions: {},
  modules: {},
});
