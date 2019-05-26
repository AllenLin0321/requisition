import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'order',
      // route level code-splitting
      // this generates a separate chunk (label.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Order.vue')
    },
    {
      path: '/label',
      name: 'label',
      // route level code-splitting
      // this generates a separate chunk (label.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Label.vue')
    }
  ]
})
