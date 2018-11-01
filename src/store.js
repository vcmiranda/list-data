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
        .then((retExt) => {
          let page = '';
          let planets = [];
          let p = Promise.resolve();
          for (let i = 0; i < Math.ceil(retExt.data.count / 10); i += 1) {
            p = p.then(() => new Promise((resolve, reject) => {
              dataAPI.getPlanets(page)
                .then((retInt) => {
                  retInt.data.results.forEach((planet) => {
                    planets.push(planet);
                  });
                  if (retInt.data.next) {
                    page = retInt.data.next.split('?page=')[1];
                  }
                  resolve();
                })
                .catch(err => reject(err));
            }));
          }
          p = p.then(() => pouchDB.dbGetBulk('people'))
            .then((ret) => {
              planets = planets.map((planet) => {
                planet.residents = planet.residents.map(resident => ({
                  url: resident,
                  name: ret.rows.find(person => person.doc.url === resident).doc.name,
                }));
                return planet;
              });
              return { planets };
            });
          return p;
        })
        .then(ret => pouchDB.dbSetBulk('planets', ret.planets))
        .catch(err => console.log(err))
        .finally(() => commit('setLoading', false));
    },
    getPeople({ commit }) {
      commit('setLoading', true);
      return dataAPI.getPeople()
        .then((retExt) => {
          let page = '';
          const people = [];
          let p = Promise.resolve();
          for (let i = 0; i < Math.ceil(retExt.data.count / 10); i += 1) {
            p = p.then(() => new Promise((resolve, reject) => {
              dataAPI.getPeople(page)
                .then((retInt) => {
                  retInt.data.results.forEach((person) => {
                    people.push(person);
                  });
                  if (retInt.data.next) {
                    page = retInt.data.next.split('?page=')[1];
                  }
                  resolve();
                })
                .catch(err => reject(err));
            }));
          }
          p = p.then(() => ({ people }));
          return p;
        })
        .then(ret => pouchDB.dbSetBulk('people', ret.people))
        .catch(err => console.log(err))
        .finally(() => commit('setLoading', false));
    },
  },
});
