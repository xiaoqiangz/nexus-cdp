
<template>
  <div class="invitedBox">
    <div class="content-box content-shadow">
      <a-row>
        <a-col :span="12" :offset="6">
          <a-form-model
            ref="ruleForm"
            :model="queryParam"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item ref="name" label="原密码" prop="oldPassword">
              <a-input v-model="queryParam.oldPassword" />
            </a-form-model-item>
            <a-form-model-item ref="email" label="新密码" prop="password">
              <a-input v-model="queryParam.password" type="password"/>
            </a-form-model-item>
            <a-form-model-item label="确认新密码" prop="confirmPassword">
              <a-input v-model="queryParam.confirmPassword" type="password"/>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </div>
    <div class="buttonList">
      <a-button type="primary" shape="round" style="width:120px" @click="handleSubmit">保存</a-button>
    </div>
    <a-modal v-model="visible" title="密码提示" @ok="handleOk">
      <p>{{ errMessage }}</p>
    </a-modal>
  </div>
</template>

<script>
import { modifyUserPassword } from '@/api/login'
// sql编辑器
export default {
  name: 'ManagementCreate',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      errMessage: '两次密码输入不一致',
      visible: false,
      // 查询参数
      queryParam: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原始密码' },
          { min: 3, max: 17, message: '密码长度需要保持在3 - 17个字符' }
        ],
        password: [
          { required: true, message: '请输入新的密码！' },
          { min: 3, max: 17, message: '密码长度需要保持在3 - 17个字符' }
        ],
        confirmPassword: [
          { required: true, message: '请确认新的密码' },
          { min: 3, max: 17, message: '密码长度需要保持在3 - 17个字符' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {},

    handleOk(e) {
      this.visible = false
    },

    // 提交表单
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.info('this.queryParam')
          console.info(this.queryParam)
          if (this.queryParam.password !== this.queryParam.confirmPassword) {
            this.visible = true
            return false
          }
          const params = {
            oldPassword: this.queryParam.oldPassword,
            newPassword: this.queryParam.password,
            confirmPassword: this.queryParam.confirmPassword
          }
          modifyUserPassword(params).then(res => {

          }).catch(error => {
            console.info(error)
          })
        } else {
          console.log('error submit!!')
        }
      })
    },
    // 取消
    handleCancel() {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.invitedBox {
  .content-box {
    padding-top: 70px;
    width: 100%;
    background-color: @backgroudColor;
    height: calc(~'100vh - 146px');
  }
  .buttonList {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    .cancel-btn {
      margin-right: 30px;
    }
  }
  /deep/ .ant-form-item-label {
    margin-right: 10px;
  }
}
</style>
