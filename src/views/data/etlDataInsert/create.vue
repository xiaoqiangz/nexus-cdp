<template>
  <div class="container">
    <div class="left-content content-shadow">
      <div class="add-data-source">
        <a-icon type="link" />
        数据源
      </div>
      <div class="menu-box">
        
      </div>
    </div>
    <div class="right-content">
      <div class="progress-box content-shadow">
        <div class="progress-item active">
          <!-- <a-icon type="check-circle" /> -->
          <span class="icon">1</span>
          <span class="text">输入配置</span>
        </div>
        <div class="progress-line"></div>
        <div class="progress-item">
          <span class="icon">2</span>
          <span class="text">抽取规则</span>
        </div>
        <div class="progress-line"></div>
        <div class="progress-item">
          <span class="icon">3</span>
          <span class="text">存储目标</span>
        </div>
      </div>
      <div class="form-box content-shadow">
        <a-form :form="submitForm">
          <a-form-item class="task-name" label="任务名称">
            <a-input v-model="submitForm.taskName" placeholder="请输入任务名称" />
          </a-form-item>
          <a-form-item class="rely-on-task" label="依赖任务">
            <a-input v-model="submitForm.relyonTask" placeholder="如存在任务执行序列，请输入父任务ID，以逗号分隔" />
          </a-form-item>
          <a-form-item class="data-table" label="数据表">
            <div class="select-table-box">
              <div class="btn-box">
                <a-icon class="icon" type="eye" />
                <span>预览</span>
                <a-divider type="vertical" />
                <a-icon class="icon setting" type="setting" />
                <span class="setting">进入常规配置</span>
              </div>
              <div class="placeholder">
                请从左侧拖曳数据表（底色为
                <span class></span>
                ）
              </div>
            </div>
          </a-form-item>
          <a-form-item class="SQL-insert" label="输入SQL语句">
            <div class="insert-box">
              <span class="btn-box">列出所有字段</span>
              <div class="insert-tips">
                <a-icon class="icon-tips" type="info-circle" />载入列(可对列进行函数操作, 如substring, left, right等)编辑框支持 SQL语言
              </div>
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
          </a-form-item>
          <a-form-item label="map" class="map-select">
            <a-select default-value="2" style="width: 300px">
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
              <a-select-option value="3">3</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
      <div class="footer-box">
        <div class="cancel-btn">取消</div>
        <div class="next-btn">下一步</div>
        <div class="save-btn">存草稿</div>
      </div>
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
export default {
  components: { codemirror },
  data() {
    return {
      submitForm: {},
      // 查询参数
      queryParam: {
        queryText: ''
      },
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-mysql',
        theme: 'solarized light'
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {},
  created() {
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
      this.codemirror.showHint()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  // 左边菜单
  .left-content {
    float: left;
    width: 250px;
    height: calc(~'100% - 50px');
    background-color: #ffffff;
    padding: 25px 16px 18px;
    .add-data-source{
      width: 120px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #FFFFFF;
      background-color: @primary;
      border-radius: 15px;
      margin-bottom: 18px;
    }
    .menu-box{
      padding-left: 3px;

    }
  }
  // 右边表单
  .right-content {
    float: left;
    width: calc(~'100% - 266px');
    height: 100%;
    margin-left: 16px;
    .progress-box {
      height: 78px;
      margin-bottom: 10px;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      .progress-item {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        .icon {
          width: 32px;
          height: 32px;
          line-height: 26px;
          text-align: center;
          color: #cccccc;
          font-weight: 600;
          border: 2px solid #cccccc;
          border-radius: 50%;
          margin-right: 9px;
        }
        .text {
          color: #cccccc;
        }
      }
      .progress-item.active {
        .icon {
          line-height: 32px;
          border: none;
          color: #ffffff;
          background-color: @primary;
        }
        .text {
          color: #333;
        }
      }
      .progress-line {
        width: 233px;
        height: 2.2px;
        background-color: #cccccc;
        margin: 0 25px;
      }
    }
    .form-box {
      height: calc(~'100% - 138px');
      background-color: #ffffff;
      padding: 35px 30px;
      /deep/ .ant-form.ant-form-horizontal {
        display: flex;
        flex-wrap: wrap;
        /deep/ .ant-form-item-label {
          line-height: 35px;
        }
      }
      .task-name {
        width: 45%;
        /deep/ .ant-col.ant-form-item-control-wrapper {
          width: 70%;
        }
      }
      .rely-on-task {
        width: 55%;
        /deep/ .ant-col.ant-form-item-control-wrapper {
          width: 80%;
        }
      }
      .data-table,
      .SQL-insert {
        width: 100%;
        .insert-box {
          position: relative;
          .btn-box {
            color: @primary;
            position: absolute;
            right: 0;
            top: -40px;
          }
        }
        .insert-tips {
          width: 100%;
          height: 40px;
          background: rgba(150, 188, 250, 0.2);
          border: 1px solid rgba(150, 188, 250, 1);
          border-radius: 8px;
          margin-bottom: 12px;
          padding: 0 14px;
          .icon-tips {
            color: @primary;
            margin-right: 14px;
          }
        }
        .codemirror {
          height: auto;
          min-height: 180px;
        }
        .codemirror /deep/ .CodeMirror-scroll {
          min-height: 180px;
          .cm-s-solarized.cm-s-light .CodeMirror-gutters {
            background-color: #ffffff;
          }
        }
      }
      .data-table {
        .select-table-box {
          width: 100%;
          height: 60px;
          background-color: #ffffff;
          border: 1px solid #dddddd;
          position: relative;
          .btn-box {
            color: #999999;
            position: absolute;
            right: 0;
            top: -40px;
            .icon {
              margin-right: 10px;
            }
            .setting {
              color: @primary;
            }
          }
          .placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
      .map-select {
        display: flex;
      }
    }
    // 底部按钮
    .footer-box {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .next-btn,
      .save-btn {
        height: 32px;
        line-height: 32px;
        color: @primary;
        padding: 0px 37px 0px 40px;
        border: 1px solid @primary;
        border-radius: 15px;
        margin-left: 10px;
      }
    }
  }
}
</style>
