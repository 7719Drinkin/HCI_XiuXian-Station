<template>
  <div id="app">
    <Header />
    <router-view />
    <BackToTop />
    <Footer v-if="showFooterPaths.includes(route.path)"/>
  </div>

</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useThemeStore } from './store/theme'
import { useRoute } from 'vue-router'

const route = useRoute()

const theme = useThemeStore()
// 定义在哪些路由路径下显示 Foote
const showFooterPaths = ['/home', '/synopsis', '/resource'] 


onMounted(() => {
  theme.init()
})

onMounted(() => {
  const createSwordExplosion = (e) => {
    const particleCount = 16
    for (let i = 0; i < particleCount; i++) {
      const sword = document.createElement('div')
      sword.className = 'flying-sword'

      const angle = Math.random() * 2 * Math.PI
      const speed = Math.random() * 100 + 50
      const x = Math.cos(angle) * speed
      const y = Math.sin(angle) * speed
      const rotation = Math.random() * 720 - 360

      sword.style.left = `${e.pageX}px`
      sword.style.top = `${e.pageY}px`
      sword.style.setProperty('--x', `${x}px`)
      sword.style.setProperty('--y', `${y}px`)
      sword.style.setProperty('--r', `${rotation}deg`)

      document.body.appendChild(sword)

      setTimeout(() => {
        sword.remove()
      }, 800)
    }
  }

  window.addEventListener('click', createSwordExplosion)
  onUnmounted(() => {
    window.removeEventListener('click', createSwordExplosion)
  })
})

</script>

<script>
import Header from './views/Header.vue'
import Footer from './views/Footer.vue';
import BackToTop from './components/BackToTop.vue';


export default {
  components: {
    Header,
    Footer,
    BackToTop,
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



.flying-sword {
  position: absolute;
  width: 2px;
  height: 16px;
  background: linear-gradient(to bottom, #00ffc0, #007b5e);
  border-radius: 1px;
  box-shadow: 0 0 8px #00ffbb;
  transform: translate(-50%, -50%) rotate(0deg);
  animation: sword-explode 0.8s ease-out forwards;
  pointer-events: none;
  z-index: 9999;
}

@keyframes sword-explode {
  to {
    transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(0.3);
    opacity: 0;
    filter: blur(1px);
  }
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
  background-color: var(--blackmode-color);
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

body.dark-mode .recommendation-card {
  background: var(--blackmode-color);
}


body.dark-mode .card-image {
  background: var(--blackmode-color)
}

body.dark-mode .card-title {
  color: #ddd;
}

body.dark-mode .tag{
  background: black;
  color: #ddd;
}

body.dark-mode .video-player {
  background: var(--blackmode-color);
  color: #ddd;
}



</style>

