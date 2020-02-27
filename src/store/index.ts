import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentActiveTheme: 'light',
    tal: {
      x: 1
    }
  },
  mutations: {
    upadteCurrentActiveTheme(state, data) {
      debugger;
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
