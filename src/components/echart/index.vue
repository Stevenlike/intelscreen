<template>
  <div :style="{ width: width, height: height }" id="myChart">
    <div
      v-show="!hasError"
      class="echarts"
      :id="domID"
      :style="{ width: width, height: height }"
    />
    <div v-show="hasError">{{ err }}</div>

    <div
      :id="domID + 'copy'"
      :style="{ width: Width + 'px', height: Height + 'px' }"
      style="display: none;"
    ></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { guid } from '@/utils/util'
import $ from 'jquery'
export default {
  name: 'echart',
  data() {
    return {
      hasError: false,
      err: '',
      domID: 'e_' + guid(),
      option: null,
      chart: null,
      Width: null,
      Height: null
    }
  },
  props: {
    width: {
      default: '100%',
      type: String
    },
    height: {
      default: '100%',
      type: String
    },
    config: {
      default: '',
      type: String
    }
  },
  created() {
    this.option = require('./config/' + this.config).option
  },
  mounted: function() {
    console.log(this.width, this.height)
    $(window).bind('resize', this.resizeB)
    try {
      if (this.option == null) {
        this.err = '找不到配置信息'
        this.hasError = true
      } else {
        this.chart = echarts.init(document.getElementById(this.domID))
        document.getElementById(this.domID).style.height = '100%'
        this.chart.setOption(this.option)
      }
    } catch (e) {
      this.err = e.message
      this.hasError = true
    }
  },
  activated() {
    const timer = setTimeout(() => {
      clearTimeout(timer)
    }, 400)
    $(window).bind('resize', this.resizeB)
  },
  deactivated() {
    $(window).unbind('resize', this.resizeB)
  },
  destroyed() {
    $(window).unbind('resize', this.resizeB)
  },
  methods: {
    refresh: function() {
      this.chart.setOption(this.option)
    },
    dispatchAction(e) {
      setTimeout(() => {
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        })
        this.chart.on('mouseout', () => {
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
        })
        this.chart.on('mouseover', params => {
          if (params.name === e[0].name) {
            this.chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            })
          } else {
            this.chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: 0
            })
          }
        })
      }, 400)
      this.chart.setOption(this.option)
    },
    resizeB: function() {
      /* 调用了改变echart自适应 */
      const timer1 = setTimeout(() => {
        this.chart.resize()
        this.refresh()
        clearTimeout(timer1)
      }, 200)
    },
    resizeC: function() {
      const timer1 = setTimeout(() => {
        this.chart.resize()
        this.refresh()
        clearTimeout(timer1)
      }, 10)
    },
    clear() {
      this.chart.clear()
    },
    downloadChart(
      name = '未知',
      width,
      height,
      param = { xAxis: false, extra: null, interval: 5, seriesPosition: 'top' }
    ) {
      /* 设置的canvas大小 */
      const artwork = $('#myChart').find('canvas')[0] /* 界面上的图形大小 */
      /* 如果不设置大小，就是界面上的图形大小 */
      width = width > height ? width : height + 100 // width 大于 height 那就用width，不然height + 100
      this.Width = width || artwork.width
      this.Height = height || artwork.height

      this.$nextTick(() => {
        // 等待dom渲染（新的canvas渲染）
        const echartsOption = JSON.parse(JSON.stringify(this.option)) // 分离两项配置，做到配置互不牵扯
        echartsOption.dataZoom = null // 去掉缩放
        echartsOption.animation = false // 去掉动画效果
        echartsOption.backgroundColor = '#ffffff' // 背景色白色

        Object.assign(echartsOption.legend, {
          textStyle: {
            color: '#808080',
            fontSize: width / 500 > 14 ? width / 500 : 14
          }
        }) // 图例

        // 标题设置
        echartsOption.title.textStyle = {
          fontSize: width / 400 > 20 ? width / 400 : 20
        }
        if (echartsOption.title.subtextStyle)
          echartsOption.title.subtextStyle.fontSize =
            width / 600 > 16 ? width / 600 : 16

        // 图形上的数据
        echartsOption.series.map((x, index) => {
          if (x.symbol) delete x.symbol // 折线上的标记的图形。用于显示数据
          x.showSymbol = true // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
          const seriesLabel = {
            show: true,
            position: x.type === 'line' ? param.seriesPosition || 'top' : 'top', // 只设置折线图
            // position: 'top', // 只设置折线图
            // distance: x.type === 'line' ? -28 : null, // 距离图形元素的距离
            distance: x.type === null, // 距离图形元素的距离
            formatter: function(item) {
              let valueType
              console.log(
                '@@@@@@@@@ ',
                x.type,
                item.dataIndex,
                index,
                param.interval,
                x.data.length
              )
              if (
                (item.dataIndex + index) % (param.interval || 5) === 0 ||
                (item.dataIndex + 1) % x.data.length === 0
              ) {
                // 隔5行显示数据,
                const seriesData = Array.isArray(item.value)
                  ? item.value[1]
                  : item.value
                valueType = 'blue'
                // switch (index) { // 每条数据都多给一个换行
                switch (
                  index + 10 // 每条数据都多给一个换行
                ) {
                  case 0:
                    return '\n\n{' + valueType + '|' + seriesData + '}'
                  case 1:
                    return '{' + valueType + '|' + seriesData + '}\n\n'
                  case 2:
                    return '\n\n\n\n{' + valueType + '|' + seriesData + '}'
                  case 3:
                    return '{' + valueType + '|' + seriesData + '}\n\n\n\n'
                  case 4:
                    return '\n\n\n\n{' + valueType + '|' + seriesData + '}'
                  case 5:
                    return '{' + valueType + '|' + seriesData + '}\n'
                  default:
                    return seriesData
                }
              } else {
                return ''
              }
            },
            rich: {
              blue: {
                // color: 'blue',
                // fontSize: '20px'
              },
              red: {
                // color: 'red',
                // fontSize: '28px'
              }
            }
          }
          if (x.label) {
            if (x.label.normal) {
              if (!x.label.normal.position) {
                console.log('进来了')
                Object.assign(x.label.normal, seriesLabel)
              }
            } else {
              Object.assign(x.label, { normal: seriesLabel })
            }
          } else {
            x.label = { normal: seriesLabel }
          }
        })

        if (param.xAxis) {
          // x轴 - 配置信息
          if (Array.isArray(echartsOption.xAxis)) {
            // 数组时默认，添加配置到第一个上面
            // 加入axisLabel字段,interval后面加你想要间隔的个数
            echartsOption.xAxis[0].axisLabel
              ? Object.assign(echartsOption.xAxis[0].axisLabel, {
                  interval: 0,
                  rotate: 90,
                  textStyle: {
                    fontSize: width / 700 > 14 ? width / 700 : 14,
                    color: '#666',
                    fontFamily: 'Helvetica Neue'
                  }
                })
              : (echartsOption.xAxis[0].axisLabel = {
                  interval: 0,
                  rotate: 90,
                  textStyle: {
                    fontSize: width / 700 > 14 ? width / 700 : 14,
                    color: '#666',
                    fontFamily: 'Helvetica Neue'
                  }
                })
          } else {
            // 直接添加配置
            /* 加入axisLabel字段,interval后面加你想要间隔的个数 */
            echartsOption.xAxis.axisLabel
              ? Object.assign(echartsOption.xAxis.axisLabel, {
                  interval: 0,
                  rotate: 90,
                  textStyle: {
                    fontSize: width / 700 > 14 ? width / 700 : 14,
                    color: '#666',
                    fontFamily: 'Helvetica Neue'
                  }
                })
              : (echartsOption.xAxis.axisLabel = {
                  interval: 0,
                  rotate: 90,
                  textStyle: {
                    fontSize: width / 700 > 14 ? width / 700 : 14,
                    color: '#666',
                    fontFamily: 'Helvetica Neue'
                  }
                })
          }
        }
        // 额外配置项
        if (param.extra)
          Object.assign(echartsOption[param.extra.key], param.extra.value)
        // 初始化 canvas
        var copyCanvas = echarts.init(
          document.getElementById(this.domID + 'copy')
        )
        copyCanvas.setOption(echartsOption)
        // 获取dom节点
        var copy = $('#' + this.domID + 'copy').find('canvas')[0]
        var image = copy.toDataURL('image/png')
        var $a = document.createElement('a')
        // 下载
        $a.setAttribute('href', image)
        $a.setAttribute('download', name)
        $a.click()
      })
    }
  }
}
</script>

<style scoped>
@font-face {
  font-weight: normal;
  font-style: normal;
}
.echarts {
  height: 100% !important;
}
.echarts div {
  height: 100% !important;
}
</style>
