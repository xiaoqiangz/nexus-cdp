import Vue from 'vue'
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
const action = Vue.directive('action', {
  inserted: function(el, binding, vnode) {
    const roles = store.getters.permissions.data
    const elPid = vnode.context.$route.meta.permissionCode // 父级pid
    const elCode = binding.value // 按钮code
    let isPermissions = false
    let flag = false
    for (let p of roles) {
      for (let child of p.children) {
        if (child.permissionCode == elPid) {
          for (let but of child.categories['2']) {
            if (but.permissionCode == elCode && but.accessible) {
              isPermissions = true
              flag = true
              break
            }
          }
          if (flag) break
        }
        if (flag) break
      }
      if (flag) break
    }
    if (!isPermissions) {
      ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
    }
  }
})

export default action
