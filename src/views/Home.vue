<template>
    <div id="web-bg"></div>
    <!-- 可以添加更多内容 -->
    <div class="content">
      <!-- 动态文字 -->
      <h1 class="typing">{{ currentText }}<span class="cursor">|</span></h1>
      <!--分隔-->
      <div class="glass-divider"></div>
      <div class="section-divider"></div>
      <!-- 主页面部分 -->

      <!-- 首页轮播卡片组件 -->
      <CarouselCards />

    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const texts = [
  '欢迎来到凡人修仙传',
  '探索修仙世界，踏上长生之路',
  '从凡人到仙人，只差一步',
]

const currentText = ref('')
let currentIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const fullText = texts[currentIndex]

  if (isDeleting) {
    currentText.value = fullText.substring(0, charIndex--)
  } else {
    currentText.value = fullText.substring(0, charIndex++)
  }

  if (!isDeleting && charIndex === fullText.length) {
    setTimeout(() => isDeleting = true, 1500)
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    currentIndex = (currentIndex + 1) % texts.length
  }

  setTimeout(typeEffect, isDeleting ? 50 : 120)
}

onMounted(() => {
  typeEffect()
})
</script>


<script>
import CarouselCards from '@/components/CarouselCards.vue'

export default {
  components:{
    CarouselCards,
  }
}
</script>

<style>

#web-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0c2138; /* 备用背景色 */;
    filter: blur(1px);
    background-image: url('../assets/web-bg1.png'); /* 替换为你的背景图片 */
    background-size: cover;
    background-position: center;
    z-index: -1;
    /* 添加渐变效果 */
    will-change: transform;
    background-attachment: fixed;
    animation: blur-to-clear 1s cubic-bezier(0.62, 0.21, 0.25, 1) 0s 1 normal backwards running,
        scale 1.5s cubic-bezier(0.62, 0.21, 0.25, 1) 0s 1 both;
}

.content {
    position: relative;
    z-index: 1; /* 确保内容在背景之上 */
    color: white;
    text-align: center;
    padding: 2rem;
    font-family: 'Arial', sans-serif;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: fadeIn 1s ease-in-out;
}

p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    animation: fadeIn 1s ease-in-out;
}

/*打字动画 */
.typing {
  font-size: 2.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  margin-top: 20rem;
  margin-bottom: 20rem;
}

.cursor {
  display: inline-block;
  width: 1ch;
  animation: blink 0.8s infinite;
  color: #00ffff;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}


/* 动画定义 */
@keyframes blur-to-clear {
  0% {
    filter: blur(10px);
    opacity: 0.5;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes scale {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}

.glass-divider {
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
}

.section-divider {
  height: 120px;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.9));
}
</style>