<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <my-icon v-if="item.meta.icon" :type="item.meta.icon" />
      <router-link
        v-if="name != item.name && index!=0"
        :to="{ path: item.path === '' ? '/' : item.path }"
      >
        <span class="link">{{ item.meta.title }}</span>
      </router-link>
      <span v-else-if="index == breadList.length-1" style="color:#333333;cursor:text">{{ item.meta.title }}</span>
      <span v-else style="color:rgba(0, 0, 0, 0.45);cursor:text">{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import breadData from './breadcrumbConfig'
export default {
  data() {
    return {
      name: '',
      breadList: []
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.breadList = []
      this.name = this.$route.name
      let len = this.$route.matched.length
      let insertRoute = null
      for (let item of breadData) {
        if (item.name === this.name) {
          insertRoute = item.route
          break
        }
      }
      this.$route.matched.forEach((item, index) => {
        if (item.meta.title != '首页') {
          if (index == len - 1 && insertRoute) {
            let obj = {
              name: insertRoute.name,
              meta: {
                title: insertRoute.title
              },
              path: insertRoute.link
            }
            this.breadList.push(obj)
          }
          this.breadList.push(item)
        }
      })
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>

<style scoped>
.breadcrumb i {
  margin-right: 14px;
}
.link:hover{
  color: #333333;
}
</style>
