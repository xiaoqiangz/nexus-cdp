<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <a-row v-if="device == 'desktop'">
        <a-col :span="15">
          <div class="left">
            <img src="../assets/logo_apex.png" alt class="logo" />
            <p class="copyright">Copyright 2020 Apex. All Rights Reserved.</p>
          </div>
        </a-col>
        <a-col :span="9">
          <div class="right">
            <route-view></route-view>
          </div>
        </a-col>
      </a-row>
      <!-- 移动 pad -->
      <route-view v-else></route-view>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data() {
    return {}
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    height: 100%;
    // padding: 110px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }
    .left {
      position: relative;
      width: 100%;
      height: 100vh;
      background: url('../assets/img_login.jpg') no-repeat;
      background-size: 100%;
      .logo {
        width: 360px;
        height: 80px;
        position: absolute;
        left: 40px;
        top: 50px;
      }
      .copyright {
        position: absolute;
        left: 60px;
        bottom: 26px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 0.5;
      }
    }
    .right{
      padding-top: 181px;
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }
  }
}
</style>
