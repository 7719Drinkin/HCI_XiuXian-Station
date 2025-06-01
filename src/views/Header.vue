<template>
    <div class="['header', {'scrolled': isScrolled }]">
      <div class="logo">
        <router-link class="nav-item" to="/home">
          <span class="gradient-text">凡人修仙传</span>
        </router-link>
      </div>
      <nav class='nav-links'>
        <router-link to="/home" class="nav-item">首页</router-link>
        <router-link to="/synopsis" class="nav-item">故事梗概</router-link>
        <router-link to="/original" class="nav-item">原作导航</router-link>
        <router-link to="/information" class="nav-item">信息百科</router-link>
        <router-link to="/resource" class="nav-item">资源</router-link>
      </nav>
    </div>


</template>

<script>
export default {
  data() {
    return {
      isScrolled: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    }
  }
}
</script>

<style scoped> 
  /* 导航栏 */
:root {
  --light-color: rgba(255, 255, 255, 0.7);
  --dark-color: #333;
  --bg-transparent: transparent;
  --bg-white: #ffffff;
  --hover-bg-color: #ac97f7;
}

.header {
    width: 100%;
    height: 60px;
    background: var(--bg-transparent);;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    padding: 0 2rem;
    transition: background 0.3s, box-shadow 0.3s
}

.header.scrolled {
  background: var(--bg-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    height: 100%;
}

.logo-link {
    margin-right: auto;
}

.gradient:hover{
    opacity: 0.8;
    transition: opacity 0.3s;
    background: #ac97f7;
}

.gradient-text {
  background: linear-gradient(to right, violet, pink);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  
}


.nav-links {
    display: flex;
    gap: 2rem;
    margin: 0 auto;
}

.nav-item {
    width: max-content;
    color: rgba(255, 255, 255, 0.7);
    position: relative;
    text-decoration: none;
    padding: 12px 18px;
    border-radius: 24px;
    transition: all 0.3s;
    animation: 1.5s linear 1s 1 normal both running show;
}

.nav-item:hover {
    background: #ac97f7;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
/* 可以添加汉堡菜单按钮 */
}

</style>