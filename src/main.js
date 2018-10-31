import Vue from 'vue';
import Quasar from 'quasar';
import PouchDB from 'pouchdb';
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

Vue.prototype.$PouchDB = PouchDB;
window.$PouchDB = PouchDB;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeDestroy() {
    pouchDB.dbClose('list-data');
  },
  render: h => h(App),
}).$mount('#app');
