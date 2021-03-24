// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import routesUser from '../router/routesUser'
import routesData from '../router/routesData'
import routesLabel from '../router/routesLabel'

let asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/preset',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/preset/highLevel',
        component: RouteView,
        meta: { title: '概览', keepAlive: true, icon: 'iconkanban', permission: ['dashboard'], permissionCode: 'A11' },
        children: [
          {
            path: '/dashboard/preset',
            name: 'PresetLayout',
            component: () => import('@/views/dashboard/preset/PresetLayout'),
            meta: { title: '预置概览', keepAlive: false, permission: ['dashboard'], permissionCode: 'A11B01' },
            redirect: '/dashboard/preset/HighLevel',
            children: [
              {
                path: '/dashboard/preset/HighLevel',
                name: 'HighLevel',
                component: () => import('@/views/dashboard/preset/HighLevel'),
                meta: { title: '高层概览', keepAlive: false, permission: ['dashboard'], permissionCode: 'A11B01' }
              },
              {
                path: '/dashboard/preset/presetMarket',
                name: 'PresetMarket',
                component: () => import('@/views/dashboard/preset/PresetMarket'),
                meta: { title: '市场概览', keepAlive: false, permission: ['dashboard'], permissionCode: 'A11B01' }
              },
              {
                path: '/dashboard/preset/PresetOperating',
                name: 'PresetOperating',
                component: () => import('@/views/dashboard/preset/PresetOperating'),
                meta: { title: '营运概览', keepAlive: false, permission: ['dashboard'], permissionCode: 'A11B01' }
              }
            ]
          }
        ]
      },
      // 修改密码
      {
        path: '/upPassword', // 修改密码修改密码
        name: 'upPassword',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/user/upPassword'),
        meta: { title: '修改密码', permission: ['upPassword'], permissionCode: 'A01B05' },
        hidden: true
      },
      // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: '标签', icon: 'iconbiaoqian', permission: ['table'], permissionCode: 'A01B05' },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: '查询表格', keepAlive: true, permission: ['table'], permissionCode: 'A01B05' }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/StandardList'),
      //       meta: { title: '标准列表', keepAlive: true, permission: ['table'], permissionCode: 'A01B05' }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: '卡片列表', keepAlive: true, permission: ['table'], permissionCode: 'A01B05' }
      //     }
      //   ]
      // },

      // Exception
      {
        path: '/exception1',
        name: 'exception1',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '分析', icon: 'iconfenxi', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register/:token',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'reset/:token',
        name: 'reset',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'forget',
        name: 'forget',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

asyncRouterMap[0].children = asyncRouterMap[0].children.concat(routesLabel, routesUser, routesData)

export {
  constantRouterMap,
  asyncRouterMap
}
