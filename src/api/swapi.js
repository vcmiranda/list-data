export default {
  getPlanets(page) {
    if (page) {
      return window.axios.get(`/planets/?page=${page}`);
    }
    return window.axios.get('/planets/');
  },
  getPeople(page) {
    if (page) {
      return window.axios.get(`/people/?page=${page}`);
    }
    return window.axios.get('/people/');
  },
};

