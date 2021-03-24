<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <!-- <LogoSvg alt="logo" /> -->
      <!-- <h1 v-if="showTitle">{{ title }}</h1> -->
      <img src="../../assets/logo_h5_2.png" alt="" v-if="device != 'desktop' && !collapsed" class="logo-moble">
      <div v-else>
        <img v-if="collapsed" src="../../assets/logo_nexus_s.png" alt="" class="smallLogo">
        <img v-else src="../../assets/logo_nexus.png" alt="" class="bigLogo">
      </div>
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'
export default {
  name: 'Logo',
  components: {
    // LogoSvg
  },
  props: {
    title: {
      type: String,
      default: 'APEX NEXUS',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    collapsed: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less" scoped>
  .logo-moble{
    width: 100% !important;
    height: auto !important;
  }
</style>
