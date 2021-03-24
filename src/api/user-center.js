import { axios } from '@/utils/request'

/**
 * 查询所有角色 func
 * @param parameter
 * @returns {*}
 */
export function queryAllRoles(parameter) {
  return axios({
    url: '/nexus-sso/api/role/all',
    method: 'post',
    params: parameter
  })
}

/**
 * 查询所有权限模块 func
 * @param parameter
 * @returns {*}
 */
export function queryAccessRouteTree(parameter) {
  return axios({
    url: '/nexus-sso/api/permission/listAll',
    method: 'get',
    params: parameter
  })
}
 
/**
 * 删除角色 func
 * @param parameter
 * @returns {*}
 */
export function deleteRole(parameter) {
  return axios({
    url: '/nexus-sso/api/role/delete',
    method: 'get',
    params: parameter
  })
}

/**
 * 根据ID查询角色详情 func
 * @param parameter
 * @returns {*}
 */
export function queryRoleDetail(parameter) {
  return axios({
    url: '/nexus-sso/api/role/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 创建用户角色 func
 * @param parameter
 * @returns {*}
 */
export function createUserGroup(parameter) {
  return axios({
    url: '/nexus-sso/api/userGroup/save',
    method: 'get',
    params: parameter
  })
}

/**
 * 保存角色;支持保存和新增，roleId不存在为新增 func
 * @param parameter
 * @returns {*}
 */
export function editRole(parameter) {
  return axios({
    url: '/nexus-sso/api/role/save',
    method: 'post',
    data: parameter
  })
}

/**
 * 给超级管理员获取所有角色列表 func
 * @param parameter
 * @returns {*}
 */
export function queryAdminPages(parameter) {
  return axios({
    url: '/nexus-sso/api/user/adminPage',
    method: 'post',
    data: parameter
  })
}

/**
 * 超级管理员禁用某个用户 func
 * @param parameter
 * @returns {*}
 */
export function disabledAdmin(parameter) {
  return axios({
    url: '/nexus-sso/api/user/adminDisable',
    method: 'post',
    params: parameter
  })
}

/**
 * 超级管理员删除某个用户 func
 * @param parameter
 * @returns {*}
 */
export function deletedAdmin(parameter) {
  return axios({
    url: '/nexus-sso/api/user/adminDelete',
    method: 'get',
    params: parameter
  })
}

/**
 * 邀请管理员 func
 * @param parameter
 * @returns {*}
 */
export function inviteAdmin(parameter) {
  return axios({
    url: '/nexus-sso/api/user/adminSave',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取用户组织列表 func
 * @param parameter
 * @returns {*}
 */
export function getUserOrganizationList(parameter) {
  return axios({
    url: '/nexus-sso/api/org/all',
    method: 'post',
    params: parameter
  })
}

/**
 * 获取用户组织详情 func
 * @param parameter
 * @returns {*}
 */
export function getOrganizationDetail(parameter) {
  return axios({
    url: '/nexus-sso/api/org/permissions',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除组织 func
 * @param parameter
 * @returns {*}
 */
export function doDeleteOrg(parameter) {
  return axios({
    url: '/nexus-sso/api/org/delete',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取用户组织菜单栏 func
 * @param parameter
 * @returns {*}
 */
export function getOrganizationDefault(parameter) {
  return axios({
    url: '/nexus-sso/api/permission/listDefault',
    method: 'get',
    params: parameter
  })
}

/**
 * 保存用户组织菜单 func
 * @param parameter
 * @returns {*}
 */
export function saveOrgMenu(parameter) {
  return axios({
    url: '/nexus-sso/api/org/save',
    method: 'post',
    data: parameter
  })
}

/**
 * 激活用户 func
 * @param parameter
 * @returns {*}
 */
export function activateUser(parameter) {
  return axios({
    url: '/nexus-sso/api/user/queryByCode',
    method: 'post',
    params: parameter
  })
}

/**
 * 查询角色校区树 func
 * @param parameter
 * @returns {*}
 */
export function getRoleSchoolTree(parameter) {
  return axios({
    url: '/nexus-sso/api/school/tree',
    method: 'post',
    params: parameter
  })
}

/**
 * 保存角色学校绑定 func
 * @param parameter
 * @returns {*}
 */
export function saveRoleSchoolBind(parameter) {
  return axios({
    url: '/nexus-sso/api/school/save',
    method: 'post',
    data: parameter
  })
}
