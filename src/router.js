import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import pouchDB from '@/plugins/pouchdb';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./App.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/Home.vue'),
          beforeEnter: (to, from, next) => {
            pouchDB.dbDelete('list-data')
              .then(() => store.dispatch('getPlanets'))
              .then(() => next());
          },
        },
      ],
    },
  ],
});
