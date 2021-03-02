import {
  echartColor,
  getAdapterFont,
  getEchartedge
} from 'components/echart/setting'

export const option = {
  backgroundColor: '#ffffff',
  color: echartColor,
  title: {
    text: '',
    left: 'center',
    textStyle: {
      color: '#333' // 主标题颜色
    },
    subtext: '',
    subtextStyle: {
      lineHeight: 36,
      color: '#666', // 副标题颜色
      fontSize: getAdapterFont(7)
    }
  },

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      show: false,
      lineStyle: {
        color: 'rgba(179, 180, 180, 0.16)',
        width: 20
      },
      shadowColor: 'rgba(0, 0, 0, 0.16)'
    }
  },

  legend: {
    data: [],
    top: '5%',
    right: '8%',
    itemWidth: 12,
    itemHeight: 10,
    textStyle: {
      color: '#808080'
    }
  },

  grid: {
    top: getEchartedge(2),
    left: getEchartedge(1.2),
    right: getEchartedge(1)
  },

  dataZoom: [
    {
      type: 'inside',
      bottom: 30,
      start: 0,
      end: 50,
      minValueSpan: 4,
      maxValueSpan: 30
    }
  ],
  calculable: true,
  xAxis: {
    triggerEvent: false,
    type: 'category',
    // rotate: -90,
    interval: 1,
    axisLabel: {
      show: true,
      interval: 0,
      rotate: 30,
      color: '#666', // x轴字体颜色
      textStyle: {
        fontSize: getAdapterFont(6)
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#d9d9d9' // x轴线颜色
      }
    },
    axisTick: {
      show: false,
      inside: true
    },
    boundaryGap: true,
    data: [
      '湖北庞源',
      '陕西庞源',
      '河南庞源',
      '庞源在线简称',
      '浙江庞源',
      '南通庞源',
      '常州庞源',
      '福建开辉',
      '皖北庞源',
      '马来西亚庞源',
      '庞源吊运',
      '庞源架桥机'
    ]
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
      color: '#666',
      fontSize: getAdapterFont(6),
      align: 'right'
    },
    splitLine: {
      show: true,
      lineStyle: { type: 'dashed' }
    },
    axisLine: {
      lineStyle: {
        color: '#d9d9d9' // y轴线颜色
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      color: '#666' // y轴字体颜色
    },
    splitArea: {
      show: false
    },
    minInterval: 1
  },
  series: [
    {
      name: '',
      type: 'bar',
      stack: '总量',
      barMaxWidth: 18,
      barGap: '10%',
      label: {
        normal: {
          show: true,
          textStyle: { color: '#fff' },
          position: 'inside',
          formatter: function(p) {
            return p.value > 0 ? p.value : ''
          }
        }
      },
      data: [
        '74.16',
        '50.00',
        '45.30',
        '0.00',
        '0.00',
        '0.00',
        '0.00',
        '74.16',
        '50.00',
        '45.30',
        '0.00',
        '0.00',
        '0.00',
        '0.00'
      ]
    },
    {
      name: '',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          textStyle: { color: '#fff' },
          position: 'inside',
          formatter: function(p) {
            return p.value > 0 ? p.value : ''
          }
        }
      },
      data: []
    },
    {
      name: '',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          textStyle: { color: '#fff' },
          position: 'inside',
          formatter: function(p) {
            return p.value > 0 ? p.value : ''
          }
        }
      },
      data: []
    },
    {
      name: '总数',
      type: 'line',
      symbol: 'none',
      lineStyle: {
        opacity: 0
      },
      label: {
        show: true,
        textStyle: {}
      },
      data: []
    }
  ]
}
