<template>
  <div class="userList">
    <div class="codemirror">
      <codemirror
        ref="myCm"
        v-model="queryParam.queryText"
        :options="cmOptions"
        @ready="onCmReady"
        @focus="onCmFocus"
        @input="onCmCodeChange"
      ></codemirror>
    </div>
    <a-button type="primary" @click="hanleFormat">格式化</a-button>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import jsonlint from 'jsonlint'

// require styles
import 'codemirror/lib/codemirror.css'
 
// require more codemirror resource...

import 'codemirror/mode/javascript/javascript' // 这js模式必须引入的

import 'codemirror/addon/selection/active-line' // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime' // sublime编辑器效果
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css' // 编辑器主题样式，配置里面theme需要设置monokai

// 下面这几个引入的主要是验证提示类的,配置里的lint需要设置true,gutters: ['CodeMirror-lint-markers']
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/display/autorefresh' // 及时自动更新，配置里面也需要设置autoRefresh为true

// json编辑器
export default {
  name: 'TableList',
  components: { codemirror },
  data() {
    return {
      // 查询参数
      queryParam: {
        queryText: ''
      },
      cmOptions: {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        theme: 'rubyblue',
        lint: true
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  created() {
    // window.jsonlint = jsonlint
    this.fetchData()
  },
  methods: {
    fetchData() {},
    showSQL(val) {
      this.queryParam.queryText = val
    },
    onCmReady(cm) {
      this.codemirror.setSize('-webkit-fill-available', 'auto')
    },
    onCmFocus(cm) {
      // console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.queryParam.queryText = newCode
      // this.$emit('codeChange', this.queryParam.queryText)
    },
    // 自动提示
    showUnit() {
      // this.codemirror.showHint()
    },
    hanleFormat() {
      this.$nextTick(() => {
          this.codemirror.setValue((JSON.stringify(JSON.parse(this.queryParam.queryText), null, 2)))
        })
    }
  }
}
</script>
<style lang="less" scoped>
.userList {
  height: 100%;
  width: 100%;
}

.codemirror {
  height: auto;
  min-height: 180px;
}
.codemirror /deep/ .CodeMirror-scroll {
  min-height: 180px;
}
</style>
