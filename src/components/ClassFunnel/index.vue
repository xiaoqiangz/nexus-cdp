<template>
  <div class="funnel-box">
    <div class="section-title" v-if="this.propsData.title">
      <div class="block-left">{{ propsData.title }}</div>
      <div class="block-right">总转化率：{{ transRate }}</div>
    </div>

    <ul class="ul-left">
      <li v-for="(item) in funnelArray" :key="item.name">{{ item.name }}</li>
    </ul>

    <ul class="ul-right">
      <li v-for="(item, index) in funnelRateArray" :key="index">{{ item }}</li>
    </ul>
    
    <ul class="ul-center">
      <li v-for="(item) in funnelArray" :key="item.name">
        <template v-for="(child, index) in item.children">
          <a-tooltip placement="top" :key="index">
            <template slot="title"><span>网报注册 100394人</span></template>
            <i :key="index" :style="{'width': child.width, 'background-color': child.color }"></i>
          </a-tooltip>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ClassFunnel',
  props: {
    propsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      colorsArr: ['#6E9DFE', '#5CCEE2', '#59CB7C', '#F4B739', '#F4A294'],
      funnelArray: [],
      funnelRateArray: [],
      transRate: '30%'
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (!this.propsData) return
      let colorsOptions = this.propsData && this.propsData.colors && this.propsData.colors.length > 0 ? this.propsData.colors : this.colorsArr
      let emptyArr = []
      let rateArr = []
      let lastTotal = 0
      let firstChildTotal = 0
      this.funnelRateArray = []
      this.propsData.options[0] && this.propsData.options[0].children.forEach(item => {
        firstChildTotal += item.value
      })
      this.propsData.options.map((item, index) => {
        let currentTotal = 0
        if (item.children) {
          item.children.map((child, i) => {
            child.color = colorsOptions[i]
            currentTotal += child.value
            child.width = parseFloat((child.value / firstChildTotal) * 100).toFixed(2) + '%'
          })
        }
        let currentRate = lastTotal && currentTotal && index > 0 ? parseFloat((currentTotal / lastTotal) * 100).toFixed(2) : '0.00'
        item.total = currentTotal
        emptyArr.push(item)
        if (index > 0) {
          this.funnelRateArray.push(currentRate + '%')
        }
        lastTotal = currentTotal
      })
      this.funnelArray = emptyArr
    }
  },
  render: function(h) {
    return h('<li>转化</li>')
  }
}
</script>

<style lang="less" scoped>

</style>
