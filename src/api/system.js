import { axios } from '@/utils/request'

const api = {
  userGroup_all: '/nexus-sso/api/userGroup/all', // 用户组
  userPage: '/nexus-sso/api/user/page', // 用户管理列表
  userGroup_save: '/nexus-sso/api/userGroup/save', // 新增用户组
  userGroup_del: '/nexus-sso/api/userGroup/delete', // 删除用户组
  user_disable: '/nexus-sso/api/user/disable', // 禁用用户
  user_enable: '/nexus-sso/api/user/enable', // 启用用户
  user_reset: '/nexus-sso/api/user/sendReset', // 重置密码
  user_del: '/nexus-sso/api/user/delete', // 删除用户
  role_all: '/nexus-sso/api/role/all', // 角色列表
  user_save: '/nexus-sso/api/user/save', // 邀请用户
  user_detail: '/nexus-sso/api/user/detail' // 用户详情
}

export default api

export function getUserGroup(parameter) {
  return axios({
    url: api.userGroup_all,
    method: 'post',
    data: parameter
  })
}
export function getUserPage(parameter) {
  return axios({
    url: api.userPage,
    method: 'post',
    data: parameter
  })
}
export function saveUserGroup(parameter) {
  return axios({
    url: api.userGroup_save,
    method: 'post',
    data: parameter
  })
}
export function delUserGroup(parameter) {
  return axios({
    url: api.userGroup_del,
    method: 'get',
    params: parameter
  })
}
export function delUser(parameter) {
  return axios({
    url: api.user_del,
    method: 'get',
    params: parameter
  })
}
export function disableUser(parameter) {
  return axios({
    url: api.user_disable,
    method: 'get',
    params: parameter
  })
}
export function enableUser(parameter) {
  return axios({
    url: api.user_enable,
    method: 'get',
    params: parameter
  })
}
export function resetUser(parameter) {
  return axios({
    url: api.user_reset,
    method: 'get',
    params: parameter
  })
}
export function getRoleList(parameter) {
  return axios({
    url: api.role_all,
    method: 'post',
    data: parameter
  })
}
export function saveUser(parameter) {
  return axios({
    url: api.user_save,
    method: 'post',
    data: parameter
  })
}
export function getUserDetail(parameter) {
  return axios({
    url: api.user_detail,
    method: 'get',
    params: parameter
  })
}
