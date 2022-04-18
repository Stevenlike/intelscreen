<!--
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-02-23 19:36:22
 * @LastEditors: steven
 * @LastEditTime: 2022-02-10 10:53:43
-->
<template>
  <section>
    <div id="container"></div>
  </section>
</template>

<script>
import { WEBGL } from './isWebGL'
import * as THREE from 'three'
import dat from 'dat.gui'

export default {
  name: 'three',
  data() {
    return {
      option: null,
      camera: null, // 摄像机
      scene: null, // 场景
      renderer: null, // 渲染
      controls: null, // 控制
      mesh: {
        rotation: { x: 0, y: 0 }
      },
      gui: null // 界面组件，可以用来修改代码中的变量
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
    // 判断浏览器是否支持webGL
    if (WEBGL.isWebGLAvailable()) {
      this.main()
    } else {
      const warning = WEBGL.getWebGLErrorMessage()
      document.getElementById('container').appendChild(warning)
    }
    // 监听屏幕变化
    window.addEventListener('resize', this._onresize, false)
  },
  methods: {
    /* 入口 */
    main() {
      const id = document.getElementById('container')
      this.style() // 样式【注册3D引擎场景】
      // this.animate() // 动画
      // this.lighting() // 灯光
      // this.material() // 材质
      // this.render() // 渲染
      /* 初始化方法 */
      const { scene, camera, renderer, gui, controls } = this
      this.option.init(id, scene, camera, renderer, controls, gui)
    },
    /* 注册3D引擎场景 */
    style() {
      /* 创建一个场景，它将包含我们所有的元素，如物体，摄像机和灯光 */
      this.scene = new THREE.Scene()
      /* 摄像机 - 创建一个相机，它定义了我们正在看的地方 */
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      /* 渲染 - 创建渲染器并设置大小 */
      this.renderer = new THREE.WebGLRenderer()
      /* 控制 */
      // this.controls = null
      /* 【注册】界面组件 */
      this.gui = new dat.GUI()
    },
    // 监听屏幕变化
    _onresize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  },
  beforeDestroy() {
    // 组件销毁时，销毁监听事件
    window.removeEventListener('resize', this._onresize)
    /* 【销毁】界面组件 */
    this.gui.destroy()
  }
}
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>
