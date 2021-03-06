import { constantRoutes } from "@/router";
import { getRouters } from "@/api/menu";
import Layout from "@/layout/index";

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    }
  },

  menus: {
    msg: "操作成功",
    code: 200,
    data: [
      {
        name: "System",
        path: "/system",
        hidden: false,
        redirect: "noRedirect",
        component: "Layout",
        alwaysShow: true,
        meta: {
          title: "系统管理",
          icon: "system"
        },
        children: [
          {
            name: "UserManager",
            path: "userIndex",
            hidden: false,
            component: "system/user/index",
            meta: {
              title: "用户管理",
              icon: "user"
            }
          },
          {
            name: "SwitchCache",
            path: "cache/switch",
            hidden: false,
            component: "system/cacheswitch/index",
            meta: {
              title: "缓存开关",
              icon: "user"
            }
          },
          {
            name: "SiteCache",
            path: "cache/site",
            hidden: false,
            component: "system/sitecache/index",
            meta: {
              title: "岗位缓存",
              icon: "user"
            }
          }]
      }
    ]
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        // getRouters().then(res => {
        //   //const accessedRoutes = filterAsyncRouter(res.data)
        //   const accessedRoutes = filterAsyncRouter(menuData)
        //   accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        //   commit('SET_ROUTES', accessedRoutes)
        //   resolve(accessedRoutes)
        // })
        const accessedRoutes = filterAsyncRouter(permission.menus.data);
        accessedRoutes.push({ path: "*", redirect: "/404", hidden: true });
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  }
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
}

export const loadView = view => {
  // 路由懒加载
  return () => import(`@/views/${view}`);
};

export default permission;
