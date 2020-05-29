import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'order',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/OrderPage.vue'),
    },
    {
      path: '/label',
      name: 'label',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/LabelPage.vue'),
    },
  ],
});
