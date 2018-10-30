export default {
  getPlanets() {
    return window.axios.get('/planets/');
  },
};

