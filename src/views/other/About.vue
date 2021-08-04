<template>
  <div class="home" style="display: none">
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <wjf-echart
      style="width:100%;height: 375px;display: block"
      config="设备分布及状态--多色柱"
      ref="UtilizationYear"
    />
    <wjf-three style="display: block" />
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {}
}
</script>
<style></style>
