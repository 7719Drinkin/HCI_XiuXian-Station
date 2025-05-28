<template>
  <!-- 返回顶部按钮 -->
  <div 
    class="back-to-top" 
    :class="{ show: showBackToTop }"
    @click="scrollToTop"
  >
    <svg viewBox="0 0 24 24">
      <path d="M12 4l-8 8h5v8h6v-8h5l-8-8z"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      showBackToTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
/* 返回顶部按钮样式 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: rgba(248, 249, 250, 0.9);
  backdrop-filter: blur(5px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top.show {
  opacity: 1;
}

.back-to-top svg {
  width: 18px;
  height: 18px;
  fill: #3498db;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
  }
}
</style>