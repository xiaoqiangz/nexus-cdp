/**
 * 用户中心
 */

import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export default [
  {
    path: '/label',
    name: 'label',
    component: RouteView,
    meta: { title: '标签', icon: 'iconbiaoqian', permission: ['label'], permissionCode: 'A31' },
    children: [
      {
        path: '/label/group',
        name: 'LabelUsers',
        component: () => import('@/views/label/group/labelUsers'),
        meta: { title: '标签', permission: ['label'], permissionCode: 'A31B01' }
      },
      {
        path: '/label/group/createLabel',
        name: 'CreateLabel',
        component: () => import('@/views/label/group/createLabel'),
        meta: { title: '创建用户列表', permission: ['label'], permissionCode: 'A31B01' },
        hidden: true
      },
      {
        path: '/label/label/labelDetail',
        name: 'LabelDetail',
        component: () => import('@/views/label/label/labelDetail'),
        meta: { title: '标签详情', permission: ['label'], permissionCode: 'A31B02' }
      },
      {
        path: '/label/portrait/labelPortrait',
        name: 'labelPortrait',
        component: () => import('@/views/label/portrait/labelPortrait'),
        meta: { title: '图像', permission: ['label'], permissionCode: 'A31B02' }
      }
    ]
  }
]

