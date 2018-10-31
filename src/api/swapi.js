export default {
  getPlanets() {
    return window.axios.get('/planets/');
  },
  getPeople() {
    return window.axios.get('/people/');
  },
};

