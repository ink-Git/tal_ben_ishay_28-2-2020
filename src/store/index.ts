import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentActiveTheme: 'light',
    favoriteWatherCity : [{}],
    favoriteWather : [{}],
  },

  mutations: {
    upadteCurrentActiveTheme(state, data) {
      state.currentActiveTheme = data;
    },

    updateFavoriteWather(state,data){
      state.favoriteWather = data;
    },

    favoriteWatherCity(state,data){
      state.favoriteWather = data;
    }
  },

  actions: {
  },

  modules: {
  },

  getters: {
    currentActiveTheme(state) {
      return state.currentActiveTheme;
    },

    favoriteWather(state){
      return state.favoriteWather;
    },

    favoriteWatherCity(state){
      return state.favoriteWatherCity;
    }
  }
})
