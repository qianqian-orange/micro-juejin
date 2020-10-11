import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(VueRouter)

let router = null

router = new VueRouter({
  mode: 'history',
  base: '/juejin/pins',
  routes: [
    {
      path: '/',
      redirect: '/recommended',
    },
    {
      path: '/:type',
      component: Home,
    },
    {
      path: '/:type/:id',
      component: Home,
    },
  ],
})

export function destroy() {
  router = null
}

export default router
