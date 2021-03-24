<template>
  <a-row>
    <div :id="containerId" ref="container" :style="{height: height}"></div>
  </a-row>
</template>

<script>
import { merge, isEmpty, debounce } from 'lodash'
import { BASIC_FUNNEL_OPTIONS, EMPTY_FUNNEL_OPTIONS } from './default_options'
export default {
  name: 'EchartFunnel',
  props: {
    containerId: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '350px'
    },
    optionsData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      $_basicChart: null,
      $_resizeHandler: null
    }
  },
  mounted () {
    const container = this.containerId
    this.$_basicChart = this.$echarts.init(document.getElementById(container))
  },
  beforeDestroy () {
    if (!this.$_basicChart) return
    
    this.$_basicChart.dispose && this.$_basicChart.dispose()
    this.$_basicChart = null
    this.destroyListener()
  },
  watch: {
    'optionsData.dataList': {
      deep: true,
      handler() {
        this.updateChartView()  
      }
    }
  },
  methods: {
    /**
     * 将业务数据加入到基础样式配置中
     * @returns {Object} 完整的echart配置
     */
    mergeOptions() {
      const _this = this
      return merge(
        {},
        BASIC_FUNNEL_OPTIONS,
        {
          legend: {
            data: _this.optionsData.legendData
          },
          series: [{
            color: _this.optionsData.colorList,
            data: _this.optionsData.dataList
          }]
        }
      )
    },

    updateChartView() {
      if (!this.$_basicChart) return
      const mergeOptions = isEmpty(this.optionsData.dataList) ? EMPTY_FUNNEL_OPTIONS : this.mergeOptions()
      this.$_basicChart.setOption(mergeOptions, true)
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
