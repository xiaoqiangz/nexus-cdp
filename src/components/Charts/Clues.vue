<template>
  <a-card class="custom-card" :loading="loading" title="会员情况">
    <div class="m-date">
      <span @click="showDatePicker = !showDatePicker" v-if="!showDatePicker" >2018-01-01 ～2018-12-31</span>
      <a-range-picker v-else size="small" /><a-divider type="vertical" /><span>过去1年</span>
    </div>
    <v-chart :forceFit="true" :height="350" :data="data" padding="auto" :scale="scale">
      <v-tooltip/>
      <v-axis dataKey="type" :label="label" :tickLine="tickLine"/>
      <v-axis dataKey="value" :label="label" :title="title"/>
      <v-interval position="type*value" :opacity="1" :adjust="adjust" color="company"/>
    </v-chart>
  </a-card>
</template>

<script>
const data = [{
  company: 'Apple',
  type: '整体',
  value: 30
}, {
  company: 'Facebook',
  type: '整体',
  value: 35
}, {
  company: 'Google',
  type: '整体',
  value: 28
}, {
  company: 'Apple',
  type: '非技术岗',
  value: 40
}, {
  company: 'Facebook',
  type: '非技术岗',
  value: 65
}, {
  company: 'Google',
  type: '非技术岗',
  value: 47
}, {
  company: 'Apple',
  type: '技术岗',
  value: 23
}, {
  company: 'Facebook',
  type: '技术岗',
  value: 18
}, {
  company: 'Google',
  type: '技术岗',
  value: 20
}, {
  company: 'Apple',
  type: '技术岗',
  value: 35
}, {
  company: 'Facebook',
  type: '技术岗',
  value: 30
}, {
  company: 'Google',
  type: '技术岗',
  value: 25
}]

const scale = [{
  dataKey: 'value',
  alias: '占比（%）',
  max: 75,
  min: 0,
  tickCount: 4
}]

const label = {
  textStyle: {
    fill: '#aaaaaa'
  }
}

const title = {
  offset: 50
}

const tickLine = {
  alignWithLabel: false,
  length: 0
}

const adjust = [{
  type: 'dodge',
  marginRatio: 1 / 32
}]
export default {
  name: 'Clues',
  data () {
      return {
        data,
        scale,
        label,
        tickLine,
        title,
        adjust,
        loading: false,
        showDatePicker: false
      }
  }
}
</script>

<style>

</style>
