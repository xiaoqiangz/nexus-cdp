import api from './index'
import { axios } from '@/utils/request'

/**
 * token func
 * parameter: {
 *     client_id: '',
 *     client_secret: '',
 *     grant_type : '',
 *     username: '',
 *     password: ''
 * }
 * @param parameter
 * @returns {*}
 */
export function postOauthToken(parameter) {
  return axios({
    url: '/nexus-sso/oauth/token',
    method: 'post',
    params: parameter
  })
}

/**
 * 列出当前用户权限(树状) func
 * 
 * @param parameter
 * @returns {*}
 */
export function getRoleMenus(parameter) {
  return axios({
    url: '/nexus-sso/api/permission/listInTree',
    method: 'get'
  })
}

/**
 * 修改密码 func
 * 
 * @param parameter
 * @returns {*}
 */
export function modifyUserPassword(parameter) {
  return axios({
    url: '/nexus-sso/api/user/modifyPassword',
    method: 'post',
    params: parameter
  })
}

/**
 * 查询当前用户信息 func
 * @param parameter {*}
 */
export function getInfo () {
  return axios({
    url: '/nexus-sso/api/user/currentUser',
    method: 'get'
  })
}

/**
 * 用户登出 func
 * @param parameter {*}
 */
export function logout () {
  return axios({
    url: '/nexus-sso/oauth/revoke',
    method: 'get'
  })
}

/**
 * 根据code查询用户 func
 * @param parameter {*}
 */
export function queryUserByCode (parameter) {
  return axios({
    url: '/nexus-sso/api/user/queryByCode',
    method: 'get',
    params: parameter
  })
}

/**
 * 重置用户密码 func
 * @param parameter {*}
 */
export function resetUserPassword (parameter) {
  return axios({
    url: '/nexus-sso/api/user/resetPassword',
    method: 'post',
    data: parameter
  })
}

/**
 * 激活用户 func
 * @param parameter {*}
 */
export function activeTheUser (parameter) {
  return axios({
    url: '/nexus-sso/api/user/activate',
    method: 'post',
    data: parameter
  })
}
