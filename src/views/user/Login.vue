<template>
  <div :class="['main', device]">
    <div class="head-bg">
      <img src="../../assets/bg_login_title.jpg" class="bg" alt />
      <img src="../../assets/logo_h5.png" class="title" alt />
    </div>
    <div class="content">
      <p class="title">{{ title }}</p>

      <a-form-model ref="ruleForm" class="user-layout-login" :model="ruleForm" :rules="rules">
        <a-form-model-item prop="email" v-if="pageType==3 || pageType==2 || pageType==4">
          <a-input
            type="text"
            class="input1"
            placeholder="请输入邮箱"
            v-model="ruleForm.email"
            autocomplete="off"
          >
            <my-icon slot="suffix" type="iconemail" style="font-size:20px" />
          </a-input>
        </a-form-model-item>

        <a-form-model-item prop="userName" v-if="pageType==1 || pageType==2">
          <a-input
            type="text"
            class="input1"
            placeholder="请输入用户名"
            v-model="ruleForm.userName"
            autocomplete="off"
          >
            <my-icon slot="suffix" type="iconemail" style="font-size:20px" />
          </a-input>
        </a-form-model-item>

        <a-form-model-item prop="passWord">
          <a-input-password
            size="large"
            placeholder="密码，至少6个字符"
            v-model="ruleForm.passWord"
            type="password"
            autocomplete="off"
            v-if="pageType != 4"
          />
        </a-form-model-item>

        <a-form-model-item prop="confirmPassword" v-if="pageType==3 || pageType==2">
          <a-input-password
            size="large"
            placeholder="确认密码"
            v-model="ruleForm.confirmPassWord"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>

        <a-form-model-item v-if="pageType==1">
          <a-checkbox :checked="checked" @change="handleChangeCheckbox" style="color:#4C8EFA">记住我</a-checkbox>
          <a class="forge-password" style="float: right;" @click="linkReset()">忘记密码</a>
        </a-form-model-item>

        <a-form-model-item>
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
            @click="submitForm('ruleForm')"
          >确定</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix, getCookie, setCookie, removeCookie } from '@/utils/util'
import { mixinDevice } from '@/utils/mixin'
import { queryUserByCode, resetUserPassword, activeTheUser } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入您的用户名！'))
      } else {
        callback()
      }
    }

    const validateEmail = (rule, value, callback) => {
      const regex = /([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (this.ruleForm.email == '') {
        callback(new Error('请输入您的邮箱！'))
      } else if (!regex.test(this.ruleForm.email)) {
        callback(new Error('您输入的邮箱地址不正确！请重新输入...'))
      } else {
        callback()
      }
    }

    const validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的密码！'))
      } else if (value.length < 6) {
        callback(new Error('请至少输入六位字符或数字'))
      } else {
        callback()
      }
    }

    const validateConfirmPassword = (rule, value, callback) => {
      if (this.ruleForm.confirmPassWord === '') {
        callback(new Error('请确认您的密码！'))
      } else if (this.ruleForm.confirmPassWord.length < 6) {
        callback(new Error('请至少输入六位字符或数字'))
      } else if (this.ruleForm.confirmPassWord !== this.ruleForm.passWord) {
        callback(new Error('两个密码必须保持一致！'))
      } else {
        callback()
      }
    }

    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      checked: false,
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      title: '登录系统',
      pageType: 1,
      ruleForm: {
        userName: '',
        email: '',
        passWord: '',
        confirmPassWord: ''
      },
      rulesLogin: {
        userName: [{ validator: validateUsername, trigger: 'blur' }],
        passWord: [{ validator: validatePassWord, trigger: 'blur' }]
      },
      rulesResetPass: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        passWord: [{ validator: validatePassWord, trigger: 'blur' }],
        confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
      },
      rulesForget: {
        email: [{ validator: validateEmail, trigger: 'blur' }]
      },
      rulesRegister: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        userName: [{ validator: validateUsername, trigger: 'blur' }],
        passWord: [{ validator: validatePassWord, trigger: 'blur' }],
        confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
      },
      rules: {},
      postParams: {},
      token: null
    }
  },
  mixins: [mixinDevice],
  created() {
    this.init()
  },
  methods: {
    ...mapActions(['PostOauthToken']),

    init() {
      Object.assign(this.ruleForm, {
        userName: '',
        email: '',
        passWord: '',
        confirmPassWord: ''
      })
      this.token = this.$route.params && this.$route.params.token
      this.rules = {}
      switch (this.$route.name) {
        case 'login':
          this.title = '登录系统'
          this.rules = this.rulesLogin
          this.pageType = 1
          let username = getCookie('username')
          if (username) {
            this.ruleForm.userName = username
            this.checked = true
          }
          break
        case 'register':
          this.title = '邀请注册'
          this.pageType = 2
          this.rules = this.rulesRegister
          break
        case 'reset':
          this.title = '重置密码'
          this.rules = this.rulesResetPass
          this.pageType = 3
          break
        case 'forget':
          this.title = '忘记密码'
          this.rules = this.rulesForget
          this.pageType = 4
          break
      }
      this.token && this.token != 'token' && this.queryResetPasswordUser(this.token)
    },

    async queryResetPasswordUser(token) {
      const ret = await queryUserByCode({ code: token })
      if (ret && ret.status == 200) {
        this.ruleForm.email = ret.data && ret.data.data && ret.data.data.email
        this.ruleForm.userName = ret.data && ret.data.data && ret.data.data.username
      }
    },

    submitForm(formName) {
      const { PostOauthToken } = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const additionParams = {
            client_id: 'nexus',
            client_secret: 'nexus',
            grant_type: 'password'
          }
          this.postParams = {}
          if (this.pageType == 1) {
            this.postParams = { ...additionParams, username: this.ruleForm.userName, password: this.ruleForm.passWord }
          } else {
            this.postParams = { code: this.token, password: this.ruleForm.passWord }
          }
          if (this.pageType == 1) {
            this.state.loginBtn = true
            PostOauthToken(this.postParams)
              .then(res => {
                this.state.loginBtn = false
                if (res && res == 'success') {
                  this.$store.commit('SET_RESPONSE', false)
                  if (this.checked) {
                    setCookie('username', this.ruleForm.userName, { expires: 7 })
                  } else {
                    removeCookie('username')
                  }
                  this.loginSuccess(res)
                }
              })
              .catch(err => {
                this.requestFailed(err)
              })
              .finally(() => {
                this.state.loginBtn = false
              })
          }

          if (this.pageType == 2) {
            this.state.loginBtn = true
            activeTheUser(this.postParams)
              .then(res => {
                if (res && res.status == 200) {
                  this.$ls.remove(ACCESS_TOKEN)
                  this.$router.push({ path: '/user/login' })
                }
              })
              .catch(err => {
                this.requestFailed(err)
              })
              .finally(() => {
                this.state.loginBtn = false
              })
          }

          if (this.pageType == 3) {
            this.state.loginBtn = true
            resetUserPassword(this.postParams)
              .then(res => {
                if (res && res.status == 200) {
                  this.$ls.remove(ACCESS_TOKEN)
                  this.$router.push({ path: '/user/login' })
                }
              })
              .catch(err => {
                this.requestFailed(err)
              })
              .finally(() => {
                this.state.loginBtn = false
              })
          }
          if (this.pageType == 4) {}
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleChangeCheckbox(e) {
      this.checked = e.target.checked
    },

    // 忘记密码
    linkReset() {
      const token = 'token'
      this.$router.push({
        path: `/user/forget`
      })
      setTimeout(() => {
        this.init()
      }, 1000)
    },

    loginSuccess(res) {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },

    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  },
  watch: {
    $route() {
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.head-bg {
  display: none;
}
.mobile,
.tablet {
  max-width: 100% !important;
  width: 100% !important;
  .content {
    width: 66% !important;
  }
  .head-bg {
    margin-bottom: 20px;
    display: block;
    position: relative;
    .bg {
      width: 100%;
    }
    .title {
      position: absolute;
      width: 66%;
      left: 50%;
      top: 50%;
      margin-top: -10%;
      margin-left: -33%;
    }
  }
}
.tablet .ant-form .ant-form-item {
  margin-bottom: 44px;
}
.main .content {
  margin: 0 auto;
  .title {
    font-size: 26px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 99px;
    text-align: center;
  }
  .user-layout-login {
    label {
      font-size: 14px;
    }

    /deep/ input {
      outline: none;
      border: none;
      border-bottom: 1px solid #d9d9d9;
      appearance: none;

      &:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid #d9d9d9;
        appearance: none;
      }
    }

    /deep/ .ant-input-password-icon {
      font-size: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
      background: linear-gradient(
        0deg,
        rgba(100, 150, 244, 1),
        rgba(135, 173, 244, 1),
        rgba(63, 124, 244, 1),
        rgba(45, 106, 233, 1)
      );
      box-shadow: 0px 1px 10px 0px rgba(91, 143, 242, 0.6);
      border-radius: 16px;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
}
</style>
