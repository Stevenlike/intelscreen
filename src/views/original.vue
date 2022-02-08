<!--
 * @Author: steven
 * @Github: https://github.com/Stevenlike
 * @Date: 2021-08-01 14:51:35
 * @LastEditors: steven
 * @LastEditTime: 2021-08-08 22:14:48
 * @Description: 有问题，找我
-->
<template>
  <section>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">echart</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to="/echart_one">echart1</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/echart_two">echart2</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link to="/echart_three">echart3</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">canvas</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/canvas_one">canvas1</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/canvas_two">canvas2</router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link to="/canvas_three">canvas3</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">three</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <router-link to="/three_one">three1</router-link>
          </el-menu-item>
          <el-menu-item index="3-2">
            <router-link to="/three_two">three2</router-link>
          </el-menu-item>
          <el-menu-item index="3-3">
            <router-link to="/three_three">three3</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">其他</span>
      </el-menu-item>
    </el-menu>

    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'original',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
section {
  height: 100%;
}
a {
  width: 100%;
  height: 100%;
  display: block;
}
.el-menu-demo {
  margin-bottom: 20px;
}
</style>
