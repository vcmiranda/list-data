import Vue from 'vue';
import Vuex from 'vuex';
import dataAPI from './api/swapi';

// Mutations
const SET_PLANETS = 'SET_PLANETS';
const SET_LOADING = 'SET_LOADING';

// Actions
const GET_PLANETS = 'GET_PLANETS';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    planets: [],
    loading: false,
  },
  mutations: {
    [SET_PLANETS](state, value) {
      this.state.planets = value;
    },
    [SET_LOADING](state, value) {
      this.state.loading = value;
    },
  },
  actions: {
    [GET_PLANETS]({ commit }) {
      commit('SET_LOADING', true);
      return dataAPI.getPlanets()
        .then((ret) => {
          const planets = [...ret.data.results];
          for (let i = 0; i < planets.length; i++) {
            planets[i].id = i + 1;
          }
          commit('SET_PLANETS', planets);
          return null;
        })
        .catch(err => console.log(err))
        .finally(() => commit('SET_LOADING', false));
    },
  },
});
