import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

let flag = false;

router.beforeEach((to, from, next) => {

  if (!flag){
    flag = true
    store.dispatch('GetInfo').then(res => {
      // 拉取user_info
      const roles = res.roles
      store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
      // 测试 默认静态页面
      // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
        // 根据roles权限生成可访问的路由表
       // console.log("accessRoutes::" + accessRoutes)
        router.addRoutes(accessRoutes) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
      })
    })
      .catch(err => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(err)
          next({ path: '/' })
        })
      })
  } else{
    next()
  }
})

const whiteList = ['/login', '/auth-redirect', '/bind', '/register'] 

router.afterEach(() => {
  NProgress.done()
})
