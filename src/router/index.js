import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/template/home/Home'
import Experiences from '@/template/components/Experiences'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/experiences',
      name: 'Experiences',
      component: Experiences
    }
  ],
  linkActiveClass: 'active'
})
