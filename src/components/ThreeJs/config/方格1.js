/*
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-08-04 23:37:07
 * @LastEditors: steven
 * @LastEditTime: 2021-08-04 23:42:28
 * @Description: 有问题，找我
 */
import * as Three from 'three'

export const option = {
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
  }
}
