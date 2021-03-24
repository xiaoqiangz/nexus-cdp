<template>
  <a-spin :spinning="loading">
    <a-card class="custom-card" :loading="false" title="会员情况">
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

      <echarts-line containerId="areaChart" :optionsData="dataOptions" />
    </a-card>
  </a-spin>
</template>

<script>
import echarts from 'echarts'
import EchartLine from './EchartLine'

export default {
  name: 'Area',
  components: {
    'echarts-line': EchartLine
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
  data() {
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
  created() {
    this.updateFetchData()
  },
  mounted() {
    this.dataOptions = {
      legendData: ['CMCC', 'CTCC', 'CUCC'],
      XData: [ '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55' ],
      dataList1: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
      dataList2: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
      dataList3: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
    }

    this.showChart = true
  },
  methods: {
    fetchDurationDate() {
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

    async updateFetchData() {
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
