<!--
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-02-23 19:36:22
 * @LastEditors: steven
 * @LastEditTime: 2021-08-04 23:43:37
-->
<template>
  <section>
    <div id="container"></div>
  </section>
</template>

<script>
import { WEBGL } from './isWebGL'
export default {
  name: 'three',
  data() {
    return {
      option: null,
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
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
  mounted() {
    // 判断浏览器是否支持webGL
    this.option = require('./config/' + this.config).option
    if (WEBGL.isWebGLAvailable()) {
      // this.option.init()
      this.animate()
    } else {
      const warning = WEBGL.getWebGLErrorMessage()
      document.getElementById('container').appendChild(warning)
    }
    window.addEventListener('resize', this.onresize, false)
  },
  methods: {
    // 监听屏幕变化
    onresize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.05
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>
