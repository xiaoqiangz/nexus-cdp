
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
            <a-form-model-item ref="name" label="用户名" prop="username">
              <a-input v-model="queryParam.username" placeholder="请输入用户名" />
            </a-form-model-item>
            <a-form-model-item ref="email" label="邮箱" prop="email">
              <a-input
                v-model="queryParam.email"
                placeholder="请输入邮箱"
                :disabled="$route.name == 'edit'?true:false"
              />
            </a-form-model-item>
            <a-form-model-item label="用户组" prop="groupId">
              <a-select v-model="queryParam.groupId" placeholder="请选择用户组">
                <a-select-option
                  :value="item.groupId"
                  v-for="item in userList"
                  :key="item.groupId"
                >{{ item.groupName }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="角色" prop="roleIds">
              <a-checkbox-group v-model="queryParam.roleIds">
                <a-checkbox
                  :value="item.roleId"
                  name="roleIds"
                  v-for="item in roleList"
                  :key="item.roleId"
                >{{ item.roleName }}</a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </div>
    <div class="buttonList">
      <span class="cancel-btn" @click="$router.back(-1)">取消</span>
      <a-button
        type="primary"
        shape="round"
        style="width:120px"
        :loading="loading"
        @click="handleSubmit"
      >{{ $route.name == 'edit'? '保存' : '发送邀请' }}</a-button>
    </div>
  </div>
</template>

<script>
import { getUserGroup, getRoleList, saveUser, getUserDetail } from '@/api/system'
// sql编辑器
export default {
  name: 'ManagementCreate',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      // 查询参数
      queryParam: {
        username: '',
        email: '',
        roleIds: [],
        groupId: undefined
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱'
          },
          {
            required: true,
            message: '请输入邮箱'
          }
        ],
        groupId: [{ required: true, message: '请选择用户组', trigger: 'change' }],
        roleIds: [
          {
            type: 'array',
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ]
      },
      userList: [],
      roleList: [],
      loading: false
    }
  },
  created() {
    this.getUserGroupFn()
  },
  methods: {
    async fetchData() {
      if (this.$route.name == 'edit' && this.$route.params.id) {
        let userData = await getUserDetail({ userId: this.$route.params.id })
        const { username, email, groupId, roles } = userData.data.data
        let roleIds = []
        roles.forEach(role => {
          roleIds.push(role.roleId)
        })
        this.queryParam = { username, email, groupId, roleIds }
      }
    },
    async getUserGroupFn() {
      let users = await getUserGroup()
      this.userList = users.data.data
      let roles = await getRoleList()
      this.roleList = roles.data.data
      this.fetchData()
    },
    // 提交表单
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          let params = { ...this.queryParam }
          params.registerUir = window.location.origin
          if (this.$route.params.id) {
            params.userId = this.$route.params.id
          }
          saveUser(params)
            .then(res => {
              if (res && res.status == 200) {
                this.$message.success(this.$route.params.id ? '编辑用户成功' : '邀请用户成功')
                this.$router.push({ path: '/system/management' })
              }
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
        }
      })
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
  .ant-checkbox-wrapper + .ant-checkbox-wrapper{
    margin: 0 8px 8px 0;
  }
}
</style>
