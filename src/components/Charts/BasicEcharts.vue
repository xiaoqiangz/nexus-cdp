<template>
  <a-row>
    <div :id="containerId" ref="container" style="height: 350px;"></div>
  </a-row>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'BasicEcharts',
  props: {
    containerId: {
      type: String,
      default: ''
    },
    optionsData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      $_basicChart: null,
      $_resizeHandler: null,
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        }
      }
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.$_basicChart) {
      return
    }
    this.$_basicChart.dispose()
    this.$_basicChart = null
    this.destroyListener()
  },
  methods: {
    refresh (bool = false) {
      this.initChart()
    },
    async initChart () {
      if (!this.$_basicChart) {
        const container = this.containerId
        this.$_basicChart = this.$echarts.init(document.getElementById(container))
      }
      const defaultOptions = {
        legend: {
          data: ['注册', '审核通过', '首次', '二次复购', '三次以上复购']
        },
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            color: ['#5BE047', '#59CB7C', '#58B8A7', '#58A2D4', '#588EFF'],
            data: [
              { value: 60, name: '注册' },
              { value: 40, name: '审核通过' },
              { value: 20, name: '首次' },
              { value: 80, name: '二次复购' },
              { value: 100, name: '三次以上复购' }
            ]
          }
        ]
      }
      const basicOptions = Object.assign(this.options, defaultOptions, this.optionsData)
      this.$_basicChart.setOption(basicOptions)
      if (!this.$_resizeHandler) {
        this.$_resizeHandler = debounce(() => {
          this.resize()
        }, 200)
        this.$_resizeHandler()
        window.addEventListener('resize', this.$_resizeHandler)
      }
    },
    resize () {
      this.$_basicChart.resize()
    },
    destroyListener () {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null
    }
  }
}
</script>

<style>
</style>
