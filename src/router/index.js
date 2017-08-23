import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index/index'
import Splash from '@/pages/Splash/index'

import Music from '@/pages/Music/index'
import MyMusic from '@/pages/MyMusic/index'
import Friend from '@/pages/Friend/index'
import Content from '@/pages/Content/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/splash'
    },
    {
    	path:'/splash',
    	component:Splash
    },
    {
    	path:'/index',
    	component:Index,
      children: [
        {
          path: 'music',
          component: Music
        },
        {
          path: 'mymusic',
          component: MyMusic
        },
        {
          path: 'friend',
          component: Friend
        },
        {
          path: 'content',
          component: Content
        },
      ]
    }
  ]
})
