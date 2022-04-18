/*
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2022-02-08 15:55:01
 * @LastEditors: steven
 * @LastEditTime: 2022-04-18 21:09:51
 * @Description: 有问题，找我
 */

import * as THREE from 'three'
import { initStats, initTrackballControls } from '@/utils/util'

export const option = {
  init(id, scene, camera, renderer, controls, gui) {
    var stats = initStats()
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0

    // add the plane to the scene
    scene.add(plane)

    // position and point the camera to the center of the scene
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x3c3c3c)
    scene.add(ambientLight)

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    // add the output of the renderer to the html element
    id.appendChild(renderer.domElement)

    // call the render function
    // var step = 0

    controls = new (function() {
      this.rotationSpeed = 0.02
      this.numberOfObjects = scene.children.length

      this.removeCube = function() {
        var allChildren = scene.children
        var lastObject = allChildren[allChildren.length - 1]
        if (lastObject instanceof THREE.Mesh) {
          scene.remove(lastObject)
          this.numberOfObjects = scene.children.length
        }
      }

      this.addCube = function() {
        var cubeSize = Math.ceil(Math.random() * 3)
        var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
        var cubeMaterial = new THREE.MeshLambertMaterial({
          color: Math.random() * 0xffffff
        })
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.castShadow = true
        cube.name = 'cube-' + scene.children.length

        // position the cube randomly in the scene

        cube.position.x =
          -30 + Math.round(Math.random() * planeGeometry.parameters.width)
        cube.position.y = Math.round(Math.random() * 5)
        cube.position.z =
          -20 + Math.round(Math.random() * planeGeometry.parameters.height)

        // add the cube to the scene
        scene.add(cube)
        this.numberOfObjects = scene.children.length
      }

      this.outputObjects = function() {
        console.log(scene.children)
      }
    })()

    gui.add(controls, 'rotationSpeed', 0, 0.5)
    gui.add(controls, 'addCube')
    gui.add(controls, 'removeCube')
    gui.add(controls, 'outputObjects')
    gui.add(controls, 'numberOfObjects').listen()

    // attach them here, since appendChild needs to be called first
    var trackballControls = initTrackballControls(camera, renderer)
    var clock = new THREE.Clock()

    render()

    function render() {
      trackballControls.update(clock.getDelta())
      stats.update()

      // rotate the cubes around its axes
      scene.traverse(function(e) {
        if (e instanceof THREE.Mesh && e != plane) {
          e.rotation.x += controls.rotationSpeed
          e.rotation.y += controls.rotationSpeed
          e.rotation.z += controls.rotationSpeed
        }
      })

      // render using requestAnimationFrame
      requestAnimationFrame(render)
      renderer.render(scene, camera)
    }
  }
}
