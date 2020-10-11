import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(VueRouter)

let router = null

router = new VueRouter({
  mode: 'history',
  base: '/juejin/home',
  routes: [
    {
      path: '/',
      redirect: '/recommended',
    },
    {
      path: '/:primaryTag',
      component: Home,
    },
    {
      path: '/:primaryTag/:secondaryTag',
      component: Home,
    },
  ],
})

export function destroy() {
  router = null
}

export default router
