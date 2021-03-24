<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="200px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <logo :collapsed="collapsed"/>
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 0px;"
    ></s-menu>
    <div class="fixed-bottom">
      <a href="javascript:void(0)" title="数据服务" @click="toDataService">
        <my-icon type="iconshuju"/>
        <span class="data-service">数据服务</span>
      </a>
      <a-icon
        v-if="device === 'mobile'"
        class="trigger"
        :type="collapsed ? 'menu-fold' : 'menu-unfold'"
        @click="toggle"
      />
      <a-icon
        v-else
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggle"
      />
    </div>
  </a-layout-sider>
</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    },
    toggle() {
      this.$emit('toggle')
    },
    toDataService() {
      this.$router.push({ name: 'data' })
    }
  }
}
</script>

<style lang="less" scoped>
.fixed-bottom {
  position: fixed;
  width: 200px;
  left: 0;
  bottom: 0;
  height: 50px;
  font-size: 14px;
  color: #fff;
  line-height: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: table;
  box-sizing: border-box;
  a,
  i {
    line-height: 50px !important;
    float: left;
  }
  a {
    float: left;
    white-space: nowrap;
    overflow: hidden;
    height: 50px;
    display: block;
    padding-left: 25px;
    width: 160px;
    color: #fff;
    border-right: 1px solid rgba(255, 255, 255, 0.23);
    i {
      padding: 0;
    }
  }
  .anticon-menu-fold,.icon-packup {
    padding: 0 12px !important;
  }
}

.ant-layout-sider-collapsed {
  flex: 0 0 56px !important;
  max-width: 56px !important;
  min-width: 56px !important;
  width: 56px !important;
  .fixed-bottom {
    width: 56px;
    overflow: hidden;
    display: block;
    height: 100px;
    border-top: none;
    i {
      width: 16px;
      display: block;
      padding: 0 20px;
    }
    a {
      margin: 0;
      padding: 0;
      border: none;
      span {
        display: none;
      }
    }
  }
}
.layout.ant-layout .trigger {
  font-size: 16px;
  display: table-cell;
}
.data-service{
  margin-left: 20px;
}
</style>
