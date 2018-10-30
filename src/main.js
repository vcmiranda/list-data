import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';

import './styles/quasar.styl';
import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
import 'quasar-extras/fontawesome';
import Quasar from 'quasar';

Vue.use(Quasar, {
  config: {},
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
