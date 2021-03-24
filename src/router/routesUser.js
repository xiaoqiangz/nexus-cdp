/**
 * 用户中心
 */

import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export default [
  {
    path: '/system',
    name: 'system',
    redirect: '/system/management',
    component: RouteView,
    meta: { title: '用户中心', icon: 'iconyonghu', permission: ['system'], permissionCode: 'A01' },
    children: [
      {
        path: '/system/management',
        name: 'management',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/user/list'),
        meta: { title: '用户管理', permission: ['system'], permissionCode: 'A01B05' }
      },
      {
        path: '/system/role',
        name: 'roleList',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/roleList'),
        meta: { title: '角色管理', permission: ['system'], permissionCode: 'A01B04' }
      },
      {
        path: '/system/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/admin/list'),
        meta: { title: '超级管理员', permission: ['system'], permissionCode: 'A01B06' }
      },
      {
        path: '/system/organization',
        name: 'Organization',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/admin/organization'),
        meta: { title: '组织管理', permission: ['system'], permissionCode: 'A01B03' }
      },
      {
        path: '/system/sqlCode',
        name: 'sqlCode',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/sqlCode'),
        meta: { title: 'sqlCode', permission: ['system'], permissionCode: 'A01B05' },
        hidden: true
      },
      {
        path: '/system/jsonCode',
        name: 'sqlCode',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/jsonCode'),
        meta: { title: 'jsonCode', permission: ['system'], permissionCode: 'A01B05' },
        hidden: true
      },
      {
        path: '/system/management/create',
        name: 'create',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/user/create'),
        meta: { title: '邀请用户', permission: ['system'], permissionCode: 'A01B05' },
        hidden: true
      },
      {
        path: '/system/management/edit/:id',
        name: 'edit',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/user/create'),
        meta: { title: '编辑邀请', permission: ['system'], permissionCode: 'A01B05' },
        hidden: true
      },
      {
        path: '/system/admin/create',
        name: 'adminCreate',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/admin/create'),
        meta: { title: '邀请管理员', permission: ['system'], permissionCode: 'A01B06' },
        hidden: true
      },
      {
        path: '/system/admin/edit/:id',
        name: 'adminEdit',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/role/admin/create'),
        meta: { title: '编辑邀请', permission: ['system'] },
        hidden: true
      }
    ]
  }
]

