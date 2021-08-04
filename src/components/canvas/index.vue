<!--
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-08-01 15:28:42
 * @LastEditors: steven
 * @LastEditTime: 2021-08-02 01:28:09
 * @Description: 有问题，找我
-->
<template>
  <section>
    <canvas
      :id="canvasId"
      :width="canvasWidth"
      :height="canvasHeight"
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
  created() {
    // this.option = require('./config/' + this.config).option

    const canvas = document.querySelector(this.canvasId)
    console.log(canvas)
  },
  methods: {
    canvasDown(e) {
      console.log('mousedown ' + e)
    },
    canvasMove(e) {
      console.log('mouseup ' + e)
    },
    canvasUp(e) {
      console.log('mousemove ' + e)
    }
  }
}
</script>
