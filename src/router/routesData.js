/**
 * 数据服务
 */

import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export default [
  {
    path: '/data',
    name: 'data',
    component: RouteView,
    meta: { title: '数据服务', icon: 'iconshuju' },
    redirect: '/data/index',
    hidden: true,
    children: [
      {
        path: '/data/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/data/index'),
        meta: { title: '首页', permission: ['system'], permissionCode: 'A02B03' }
      },
      {
        path: '/data/etl-data-result',
        name: 'etlResultList',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataResult/list'),
        meta: { title: '我的数据集', permission: ['system'], permissionCode: 'A02B03' },
        hidden: true
      },
      {
        path: '/data/etl-data-insert',
        name: 'etlInsertList',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataInsert/list'),
        meta: { title: '数据接入', permission: ['system'], permissionCode: 'A02B01' },
        hidden: true
      },
      {
        path: '/data/etl-data-source',
        name: 'etlSourceList',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataSource/list'),
        meta: { title: '数据源', permission: ['system'], permissionCode: 'A02B02' },
        hidden: true
      },
      {
        path: '/data/etl-data-result/detail',
        name: 'etlresultDetail',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataResult/columnList'),
        meta: { title: '结果集' },
        hidden: true
      },
      // 数据接入-查看工程
      {
        path: '/data/etl-data-insert/detail',
        name: 'etlInsertDetail',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataInsert/detail'),
        meta: { title: '查看工程' },
        hidden: true
      },
      {
        path: '/data/etl-data-insert/create',
        name: 'create',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataInsert/create'),
        meta: { title: 'ETL任务' },
        hidden: true
      }
      // {
      //   path: '/data/etl-data-insert/create-realtime-data',
      //   name: 'addRealtimeData',
      //   component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataInsert/createRealtimeData'),
      //   meta: { title: '创建实时数据' },
      //   hidden: true
      // },
      // {
      //   path: '/data/etl-data-insert/create-main-table',
      //   name: 'addMainTable',
      //   component: () => import(/* webpackChunkName: "fail" */ '@/views/data/etlDataInsert/createMainTable'),
      //   meta: { title: '创建主表' },
      //   hidden: true
      // }
    ]
  }
]

