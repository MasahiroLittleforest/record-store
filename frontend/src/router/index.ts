import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Signup from '@/components/Signup.vue'
import Signin from '@/components/Signin.vue'
import Records from '@/components/records/Records.vue'
import Artists from '@/components/artists/Artists.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists,
  },
  {
    path: '/records',
    name: 'Records',
    component: Records,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
