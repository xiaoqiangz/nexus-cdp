import Vue from 'vue'
import { RESPONSE_STOPED } from '@/store/mutation-types'
const system = {
  state: {
    responseStoped: false
  },
  mutations: {
    SET_RESPONSE: (state, responseStoped) => {
      state.responseStoped = responseStoped
      Vue.ls.set(RESPONSE_STOPED, responseStoped)
    }
  }
}
export default system
