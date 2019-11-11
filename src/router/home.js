export default [
  {
    path: '/home',
    name: 'home-home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/home/home.vue'),
    meta: {
      title: '首页',
      keepAlive: false,
      auth: true
    }
  }
]
