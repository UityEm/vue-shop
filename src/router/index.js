import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', component: Login},
    {path: '/home', component: Home}
  ]
})

// 路由导航守卫 只有登录用户才会访问后台Home路由
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 没有token就跳转到登录页面 俩种方式实现
//   // if(!tokenStr) return next('/login')

//   if (!tokenStr) return this.a.push('/login')
//   next()
// })
// 暴露路由对象
export default router
