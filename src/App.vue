<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
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
import Footer from './views/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  methods:{
    
  }
}


</script>

<style>
  /* 新增样式 */

:root{
  --blackmode-color: #312742
}
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
  background-color: var(--blackmode-color);
  color: #ddd;
}

body.dark-mode .header.scrolled {
  background: var(--blackmode-color); /* 滚动时深色背景 */
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
}

body.dark-mode .footer {
  background: var(--blackmode-color); /* 滚动时深色背景 */
  color: #ddd;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
}

body.dark-mode .back-to-top {
  background-color: var(--blackmode-color);
  color: #ddd;
}

body.dark-mode .section-divider{
  background: linear-gradient(to bottom, transparent, var(--blackmode-color));
}
/* 卡片暗色模式样式 */
body.dark-mode .character-card {
  background-color: #3e2f52;
  color: #ddd;
  border: 1px solid #5a4b6e;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
}

body.dark-mode .character-name {
  color: #fff;
}

body.dark-mode .character-desc {
  color: #ccc;
}

body.dark-mode .section-title {
  color: #eee;
  border-left: 5px solid #66e0e0;
}




</style>

