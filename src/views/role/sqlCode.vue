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
        @cursorActivity="showUnit"
      ></codemirror>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/sql/sql.js'
// theme css
import 'codemirror/theme/solarized.css'
import 'codemirror/addon/hint/show-hint.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// closebrackets
import 'codemirror/addon/edit/closebrackets.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'

// sql编辑器
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
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-mysql'
        // theme: 'solarized light'
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {},
    showSQL(val) {
      this.queryParam.queryText = val
    },
    onCmReady(cm) {
      // this.codemirror.setSize('-webkit-fill-available', 'auto')
    },
    onCmFocus(cm) {
      // console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      // this.queryParam.queryText = newCode
      // this.$emit('codeChange', this.queryParam.queryText)
    },
    // 自动提示
    showUnit() {
      this.codemirror.showHint()
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
