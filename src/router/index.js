import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login.vue'
import MainPage from '@/views/mainPage.vue'
import ProfilePage from '@/views/profilePage.vue'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      componet: MainPage
    },
    {
      path: '/ProfilePage',
      name: 'ProfilePage',
      component: ProfilePage
    }
  ]
})
