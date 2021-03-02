<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <echart
      style="width:100%;height: 375px;"
      config="设备分布及状态--多色柱"
      ref="UtilizationYear"
    />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>
