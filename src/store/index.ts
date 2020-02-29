import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentActiveTheme: 'light',
  },
  mutations: {
    upadteCurrentActiveTheme(state, data) {
      state.currentActiveTheme = data;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    currentActiveTheme(state) {
      return state.currentActiveTheme;
    }
  }
})
