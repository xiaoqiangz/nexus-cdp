import Vue from 'vue'
import { postOauthToken, getInfo, logout, getRoleMenus } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
// import { resolve, reject } from 'node_modules/any-promise/index'

const user = {
  state: {
    token: '',
    name: '天野远子',
    welcome: '欢迎',
    userId: '',
    avatar: '/avatar2.jpg',
    permissions: [],
    info: {
      'id': '4291d7da9005377ec9aec4a71ea837f',
      'name': '天野远子',
      'username': 'admin',
      'password': '',
      'avatar': '/avatar2.jpg',
      'status': 1,
      'telephone': '',
      'lastLoginIp': '27.154.74.117',
      'lastLoginTime': 1534837621348,
      'creatorId': 'admin',
      'createTime': 1497160610259,
      'merchantCode': 'TLif2btpzg079h15bk',
      'deleted': 0,
      'roleId': 'admin',
      'role': {}
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_USERID: (state, userid) => {
      state.userId = userid
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONS: (state, roles) => {
      state.permissions = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录登陆之前获取用户token
    PostOauthToken ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        postOauthToken(userInfo).then(response => {
          if (response) {
            const accessToken = response.token_type + ' ' + response.access_token
            if (response.access_token && response.access_token != undefined) {
              Vue.ls.set(ACCESS_TOKEN, accessToken, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', accessToken)
              resolve('success')
            } else {
              resolve('failed')
            }
          } else {
            resolve('failed')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 登录
    // Login ({ commit }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     login(userInfo).then(response => {
    //       const result = response.result
    //       Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
    //       commit('SET_TOKEN', result.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    GetUserMenus({ commit }) {
      return new Promise((resolve, reject) => {
        getRoleMenus().then(response => {
          const result = response && response.data
          commit('SET_PERMISSIONS', result)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response && response.data && response.data.data
          // if (result.role && result.role.permissions.length > 0) {
          //   const role = result.role
          //   role.permissions = result.role.permissions
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
          //       const action = per.actionEntitySet.map(action => { return action.action })
          //       per.actionList = action
          //     }
          //   })
          //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   commit('SET_ROLES', result.role)
          //   commit('SET_INFO', result)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }

          commit('SET_NAME', { name: result.username, welcome: welcome() })
          commit('SET_USERID', result.userId)
          // commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERID', '')
          commit('SET_PERMISSIONS', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
