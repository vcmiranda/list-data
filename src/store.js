import Vue from 'vue';
import Vuex from 'vuex';
import dataAPI from './api/swapi';
import pouchDB from './plugins/pouchdb';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, value) {
      this.state.loading = value;
    },
  },
  actions: {
    getPlanets({ commit }) {
      commit('setLoading', true);
      return dataAPI.getPlanets()
        .then(ret => pouchDB.dbSetBulk('list-data', ret.data.results))
        .catch(err => console.log(err))
        .finally(() => commit('setLoading', false));
    },
    getPeople({ commit }, payload) {
      commit('setLoading', true);
      console.log(payload);
      // payload = payload.map(person => )
      // let p = Promise.resolve();
      // for (let i = 0; i < transfers.length; i += 1) {
      //   p = p.then(() => new Promise((resolve, reject) => {
      //     dataAPI.getPeople()
      //       .then((ret) => {
      //         console.log(ret);
      //         resolve();
      //       })
      //       .catch(err => reject(err))
      // })}
      // p = p.then(() => ({ successTransfers, errorsTransfers }));
      // return p;
    },
  },
});
