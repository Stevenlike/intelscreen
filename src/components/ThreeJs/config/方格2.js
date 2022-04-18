/*
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2022-02-08 09:49:46
 * @LastEditors: steven
 * @LastEditTime: 2022-04-18 21:09:45
 * @Description: 有问题，找我
 */
import * as Three from 'three'

export const option = {
  init(id) {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new Three.Scene()

    // create a camera, which defines where we're looking at.
    var camera = new Three.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // create a render and set the size
    var renderer = new Three.WebGLRenderer()
    renderer.setClearColor(new Three.Color(0x000000))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // show axes in the screen
    var axes = new Three.AxesHelper(20)
    scene.add(axes)

    // create the ground plane
    var planeGeometry = new Three.PlaneGeometry(60, 20)
    var planeMaterial = new Three.MeshBasicMaterial({
      color: 0xaaaaaa
    })
    var plane = new Three.Mesh(planeGeometry, planeMaterial)

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, 0, 0)

    // add the plane to the scene
    scene.add(plane)

    // create a cube
    var cubeGeometry = new Three.BoxGeometry(4, 4, 4)
    var cubeMaterial = new Three.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    })
    var cube = new Three.Mesh(cubeGeometry, cubeMaterial)

    // position the cube
    cube.position.set(-4, 3, 0)

    // add the cube to the scene
    scene.add(cube)

    // create a sphere
    var sphereGeometry = new Three.SphereGeometry(4, 20, 20)
    var sphereMaterial = new Three.MeshBasicMaterial({
      color: 0x7777ff,
      wireframe: true
    })
    var sphere = new Three.Mesh(sphereGeometry, sphereMaterial)

    // position the sphere
    sphere.position.set(20, 4, 2)

    // add the sphere to the scene
    scene.add(sphere)

    // position and point the camera to the center of the scene
    camera.position.set(-30, 40, 30)
    camera.lookAt(scene.position)

    id.appendChild(renderer.domElement)

    // render the scene
    renderer.render(scene, camera)
  }
}
