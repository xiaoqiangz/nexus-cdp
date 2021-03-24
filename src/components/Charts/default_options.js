import echarts from 'echarts'

// 漏斗图基本配置
const BASIC_FUNNEL_OPTIONS = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  legend: {
    data: []
  },
  series: [
    {
      name: '',
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
      color: [],
      data: []
    }
  ]
}

// 漏斗图数据为空时的配置
const EMPTY_FUNNEL_OPTIONS = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  legend: {
    data: []
  },
  series: [
    {
      name: '',
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
      color: [],
      data: [
        { value: 30, name: '' },
        { value: 10, name: '' },
        { value: 5, name: '' },
        { value: 50, name: '' },
        { value: 80, name: '' }
      ]
    }
  ]
}

// 线性图基本配置
const BASIC_LINE_OPTIONS = {
  legend: {
    top: 20,
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 5,
    itemGap: 13,
    data: [],
    right: '4%',
    textStyle: {
      fontSize: 12,
      color: '#F1F1F3'
    }
  },
  grid: {
    top: 100,
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    data: []
  }],
  yAxis: [{
    type: 'value',
    name: '(%)',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    },
    splitLine: {
      lineStyle: {
        color: '#57617B'
      }
    }
  }],
  series: [{
    name: 'CMCC',
    type: 'line',
    left: '10%',
    top: 60,
    bottom: 60,
    width: '80%',
    // height: {totalHeight} - y - y2,
    min: 0,
    max: 100,
    minSize: '0%',
    maxSize: '100%',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 1
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(137, 189, 27, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(137, 189, 27, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    itemStyle: {
      normal: {
        color: 'rgb(137,189,27)',
        borderColor: 'rgba(137,189,2,0.27)',
        borderWidth: 12

      }
    },
    data: []
  }, {
    name: 'CTCC',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 1
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(0, 136, 212, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(0, 136, 212, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    itemStyle: {
      normal: {
        color: 'rgb(0,136,212)',
        borderColor: 'rgba(0,136,212,0.2)',
        borderWidth: 12

      }
    },
    data: []
  }, {
    name: 'CUCC',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 1
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(219, 50, 51, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(219, 50, 51, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    itemStyle: {
      normal: {
        color: 'rgb(219,50,51)',
        borderColor: 'rgba(219,50,51,0.2)',
        borderWidth: 12
      }
    },
    data: []
  }]
}

// 线性图数据为空时的配置
const EMPTY_LINE_OPTIONS = {
  
}

// 柱形图基本配置
const BASIC_COLUMN_OPTIONS = {
  legend: {},
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  dataset: {
    source: []
  },
  xAxis: [
    { type: 'category', gridIndex: 0 }
  ],
  yAxis: [
    { gridIndex: 0 }
  ],
  grid: [
    { bottom: '0' }
  ],
  series: [
      // These series are in the first grid.
    { type: 'bar',
    left: '10%',
    top: 60,
    bottom: 60,
    width: '80%',
     seriesLayoutBy: 'row' },
    { type: 'bar', 
    left: '10%',
    top: 60,
    bottom: 60,
    width: '80%',
    seriesLayoutBy: 'row' },
    { type: 'bar', 
    left: '10%',
    top: 60,
    bottom: 60,
    width: '80%',
    seriesLayoutBy: 'row' }
  ]
}

// 柱形图数据为空时的配置
const EMPTY_COLUMN_OPTIONS = {

}

export { BASIC_FUNNEL_OPTIONS, EMPTY_FUNNEL_OPTIONS, BASIC_LINE_OPTIONS, EMPTY_LINE_OPTIONS, BASIC_COLUMN_OPTIONS, EMPTY_COLUMN_OPTIONS }
