<!--
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-02-23 19:36:22
 * @LastEditors: steven
 * @LastEditTime: 2021-08-01 12:20:31
-->
<template>
  <section>
    <div id="container"></div>
  </section>
</template>

<script>
import * as Three from 'three'
import { WEBGL } from './isWebGL'
export default {
  name: 'three',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  mounted() {
    // 判断浏览器是否支持webGL
    if (WEBGL.isWebGLAvailable()) {
      this.init()
      this.animate()
    } else {
      const warning = WEBGL.getWebGLErrorMessage()
      document.getElementById('container').appendChild(warning)
    }
    window.addEventListener('resize', this.onresize, false)
  },
  methods: {
    init() {
      let container = document.getElementById('container')
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      )
      this.camera.position.z = 0.6
      this.scene = new Three.Scene()
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new Three.MeshNormalMaterial()
      this.mesh = new Three.Mesh(geometry, material)
      this.scene.add(this.mesh)

      this.renderer = new Three.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.05
      this.renderer.render(this.scene, this.camera)
    },
    onresize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>
