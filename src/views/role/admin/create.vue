
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
            <a-form-model-item ref="username" label="用户名" prop="username">
              <a-input v-model="queryParam.username" placeholder="请输入用户名" />
            </a-form-model-item>
            <a-form-model-item ref="email" label="邮箱" prop="email">
              <a-input v-model="queryParam.email" placeholder="请输入邮箱" />
            </a-form-model-item>
            <a-form-model-item ref="orgCode" label="组织" prop="orgCode">
              <user-organization :groupId="queryParam.orgCode" v-model="queryParam.orgCode" @change="changeGroup"/>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </div>
    <div class="buttonList">
      <span class="cancel-btn" @click="handleCancel">取消</span>
      <a-button type="primary" shape="round" style="width:120px" @click="handleSubmit">发送邀请</a-button>
    </div>
  </div>
</template>

<script>
import UserOrganization from '@/components/Selects/UserOrganization'
import { inviteAdmin } from '@/api/user-center'
export default {
  name: 'ManagementCreate',
  components: {
    'user-organization': UserOrganization
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      // 查询参数
      queryParam: {
        username: '',
        orgCode: undefined,
        eamil: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 1, max: 20, message: '用户名不能超过20个字符', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱！', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱格式！', trigger: 'change' }
        ],
        orgCode: [
          { required: true, message: '请选择组织！', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {},
    // 提交表单
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert('submit!')
          const params = {
            email: this.queryParam.eamil,
            orgCode: this.queryParam.orgCode,
            registerUir: window.location.origin,
            username: this.queryParam.username
          }
          console.info(params)
          inviteAdmin(params)
            .then(res => {
              if (res && res.status == 200) {

              }
            })
            .catch(err => {
              console.info(err)
            })
        } else {
          console.log('error submit!!')
        }
      })
    },

    // 取消
    handleCancel() {
      this.$router.back(-1)
    },

    changeGroup(value) {
      this.queryParam.orgCode = value
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
