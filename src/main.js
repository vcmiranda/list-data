import Vue from 'vue';
import Quasar from 'quasar';
import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
import 'quasar-extras/fontawesome';
import './plugins/axios';
import './styles/quasar.styl';
import pouchDB from './plugins/pouchdb';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Quasar, {
  config: {},
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeDestroy() {
    Promise.all([
      pouchDB.dbClose('planets'),
      pouchDB.dbClose('people'),
    ]);
  },
  render: h => h(App),
}).$mount('#app');
