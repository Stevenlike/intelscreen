<!--
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-08-01 15:28:42
 * @LastEditors: steven
 * @LastEditTime: 2021-08-10 09:34:32
 * @Description: 有问题，找我
-->
<template>
  <section>
    <canvas
      :id="canvasId"
      :width="width"
      :height="height"
      @mousedown="canvasDown($event)"
      @mouseup="canvasUp($event)"
      @mousemove="canvasMove($event)"
    ></canvas>
  </section>
</template>

<script>
import { guid } from '@/utils/util'
export default {
  name: 'Canvas',
  data() {
    return {
      option: '',
      canvasId: 'c_' + guid()
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
    if (this.config) this.option = require('./config/' + this.config)
  },
  mounted() {
    const canvas = document.getElementById(this.canvasId)
    if (this.config) this.option.init(canvas)
  },
  methods: {
    canvasDown(e) {
      console.log('mousedown ' + JSON.stringify(e))
    },
    canvasMove(e) {
      console.log('mouseup ' + JSON.stringify(e))
    },
    canvasUp(e) {
      console.log('mousemove ' + JSON.stringify(e))
    }
  }
}
</script>
