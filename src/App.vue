<template>
  <div id="app">
    <Header />
    <router-view />
  </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './store/theme'

const theme = useThemeStore()

onMounted(() => {
  theme.init()
})

</script>

<script>
import Header from './views/Header.vue'


export default {
  components: {
    Header
  },
  methods:{
    
  }
}


</script>

<style>
  /* 新增样式 */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px; /* 防止导航栏遮挡 */
}

body {
  background-color: white;
  color: black;
  transition: background-color 0.3s, color 0.3s;
}

body.dark-mode {
  background-color: #121212;
  color: #ddd;
}

body.dark-mode .header.scrolled {
  background: #1f1f1f; /* 滚动时深色背景 */
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
}

</style>

