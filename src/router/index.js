import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login.vue'
import MainPage from '@/views/mainPage.vue'
import ProfilePage from '@/views/profilePage.vue'
import TiePage from '@/views/tiePage.vue'
import BlockPage from '@/views/blockPage.vue'
import TieZi from '@/views/tiezi.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/BlockPage/:forum_id',
      name: 'BlockPage',
      component: BlockPage
    },
    {
      path: '/TiePage/:forum_id',
      name: 'TiePage',
      component: TiePage
    },
    {
      path: '/TieZi/:topic_id',
      name: 'TieZi',
      component: TieZi
    },
    {
      path: '/ProfilePage',
      name: 'ProfilePage',
      component: ProfilePage
    }
  ]
})
