<template>
  <a-spin :spinning="loading">
    <a-card class="custom-card" :loading="false" title="会员转漏斗">
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

      <!-- <echarts-funnel ref="echarts" containerId="funnelChart" :optionsData="dataOptions" /> -->
      <v-chart :options="echartData" />
    </a-card>
  </a-spin>
</template>

<script>
import EchartFunnel from './EchartFunnel'
import ECharts from 'vue-echarts'
import { merge, isEmpty, debounce } from 'lodash'
export default {
  name: 'Funnel',
  components: {
    'echarts-funnel': EchartFunnel,
    'v-chart': ECharts
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
      dataOptions: {},
      echartData: {
        title: {
          text: '漏斗图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
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
    }
  },
  created() {
    // this.updateFetchData()
  },
  mounted() {
    this.dataOptions = {
      legendData: ['注册', '审核通过', '首次', '二次复购', '三次以上复购'],
      colorList: ['#5BE047', '#59CB7C', '#58B8A7', '#58A2D4', '#588EFF'],
      dataList: [
        { value: 60, name: '注册' },
        { value: 40, name: '审核通过' },
        { value: 20, name: '首次' },
        { value: 80, name: '二次复购' },
        { value: 100, name: '三次以上复购' }
      ]
    }
    this.showChart = true
    // this.$echarts.funnel('funnelChart', options);
  },
  methods: {
    getPosition: obj => {
      return {
        action: obj.action,
        percent: 'median'
      }
    },

    getContent: obj => {
      return parseInt(String(obj.percent * 100)) + '%'
    },

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
      // this.$refs.echarts.refresh(true)
      this.loading = true
      setTimeout(() => {
        const newData = [
          { value: 30, name: '注册' },
          { value: 10, name: '审核通过' },
          { value: 5, name: '首次' },
          { value: 50, name: '二次复购' },
          { value: 80, name: '三次以上复购' }
        ]
        this.echartData = merge({}, this.echartData, {
          series: [
            {
              data: newData
            }
          ]
        })
        // this.dataOptions.dataList = [
        //   { value: 30, name: '注册' },
        //   { value: 10, name: '审核通过' },
        //   { value: 5, name: '首次' },
        //   { value: 50, name: '二次复购' },
        //   { value: 80, name: '三次以上复购' }
        // ]
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
