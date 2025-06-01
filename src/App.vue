<template>

  <div id='app'>
    <Header />
  </div>


</template>

    <!-- 鼠标点击特效 -->
<script>
import Header from './views/Header.vue'
export default {
  components: {
    Header
  },
}
</script>

<style>
  /* 新增样式 */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* 防止导航栏遮挡 */
  }
</style>

