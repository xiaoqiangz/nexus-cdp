<template>
  <a-spin :spinning="loading">
    <a-card class="custom-card" :loading="false" title="线索潜客趋势概览">
      <div class="m-date">
        <span
          @click="showDatePicker = !showDatePicker"
          v-if="!showDatePicker"
        >2018-01-01 ～2018-12-31</span>
        <a-range-picker v-else size="small" />
        <a-divider type="vertical" />
        <span @click="fetchDurationDate">{{ durationDate }}</span>
      </div>
      <a v-if="showFresh" href="javascript:void(0);" slot="extra" @click="updateFetchData">
        <a-icon type="redo" />
      </a>

      <echarts-column containerId="columnChart" :optionsData="dataOptions" />
    </a-card>
  </a-spin>
</template>

<script>
import EchartColumn from './EchartColumn'
export default {
  name: 'Column',
  components: {
    'echarts-column': EchartColumn
  },
  props: {
    showFresh: {
      type: Boolean,
      default: () => true
    },
    fetchPromiseFunction: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      loading: false,
      showDatePicker: false,
      funnelOptions: {},
      durationDate: '过去一年',
      durationKey: 1,
      duratonArr: { 1: '过去一年', 2: '过去三个月', 3: '过去一周' },
      startDate: '20200202',
      endDate: '20200501',
      showChart: false,
      dataOptions: {}
    }
  },

  created () {
    this.updateFetchData()
  },
  mounted () {
    this.dataOptions = {
      sourceList: [
        ['product', '2012', '2013', '2014', '2015'],
        ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
        ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
        ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
      ]
    }

    this.showChart = true
  },
  methods: {
    fetchDurationDate () {
      if (this.loading) {
        return false
      }
      if (this.durationKey > 2) {
        this.durationKey = 0
      }
      this.durationKey++
      this.durationDate = this.duratonArr[this.durationKey]
      this.updateFetchData()
    },

    async updateFetchData () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
      if (!this.fetchPromiseFunction) {
        return false
      }
      const param = Object.assign(
        {},
        {
          start: this.startDate,
          end: this.endDate
        }
      )
      const ret = await this.fetchPromiseFunction(param)
      if (ret && ret.code === 200) {
      }
    }
  }
}
</script>

<style>
</style>
