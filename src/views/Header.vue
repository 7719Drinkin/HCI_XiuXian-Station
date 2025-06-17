<!--Header.vue-->
<template>
    <div :class="['header', {scrolled: isScrolled}]">
      <div class="header-container">
        <div class="logo">
          <router-link :class="['nav-item', {scrolled: isScrolled}]" to="/home">
            <span :class="['gradient-text', {scrolled: isScrolled }]">凡人修仙传</span>
          </router-link>
        </div>
        <!--中间导航栏部分-->
        <nav class='nav-links'>
          <router-link to="/home" :class="['nav-item', {scrolled: isScrolled }]">首页</router-link>
          <router-link to="/synopsis" :class="['nav-item', {scrolled: isScrolled }]">故事梗概</router-link>
          <router-link to="/original" :class="['nav-item', {scrolled: isScrolled }]">原作导航</router-link>
          <div class="nav-item info-nav-wrapper" :class="{scrolled: isScrolled}" @mouseenter="showInfoSubnav = true" @mouseleave="showInfoSubnav = false">
            <router-link to="/information" class="info-nav-link">信息百科</router-link>
            <transition name="fade">
              <div v-if="showInfoSubnav" class="info-subnav" @mouseenter="showInfoSubnav = true" @mouseleave="showInfoSubnav = false">
                <router-link class="subnav-item" :to="{ path: '/information', query: { tab: 'character' } }">人物</router-link>
                <router-link class="subnav-item" :to="{ path: '/information', query: { tab: 'artifact' } }">法宝</router-link>
                <router-link class="subnav-item" :to="{ path: '/information', query: { tab: 'array' } }">阵法</router-link>
              </div>
            </transition>
          </div>
          <router-link to="/resource" :class="['nav-item', {scrolled: isScrolled }]">资源</router-link>
        </nav>
        <!--右侧按钮 -->
        <div class="function-buttons">
          <button class="func-btn" @click="theme.toggle()">{{ theme.isDarkMode ? '🌞' : '🌙' }}</button>
          <button class="func-btn fab fa-github github-icon" @click="goToGithub"></button>
          <button class="func-btn">👤</button>
          <button class="func-btn">🧭</button>
        </div>
        <!-- 右上角展开按钮 -->
        <button class="sidebar-toggle-btn" @click="sidebar.toggle">☰</button>
        <!-- 右侧栏 -->
        <transition name="sidebar-fade">
          <div v-if="sidebar.isOpen" class="sidebar">
            <router-link to="/home" class="nav-item" @click="sidebar.close">首页</router-link>
            <router-link to="/synopsis" class="nav-item" @click="sidebar.close">故事梗概</router-link>
            <router-link to="/original" class="nav-item" @click="sidebar.close">原作导航</router-link>
            <router-link to="/information" class="nav-item" @click="sidebar.close">信息百科</router-link>
            <router-link to="/resource" class="nav-item" @click="sidebar.close">资源</router-link>
          </div>
        </transition>
      </div>
    </div>
    


</template>


<script setup>

import { useSidebarStore } from '../store/sidebar'
import { useThemeStore } from '../store/theme'

const sidebar = useSidebarStore()
const theme = useThemeStore()

function goToGithub() {
  window.open('https://github.com/7719Drinkin/HCI_Project', '_blank')
}

</script>

<script>

export default {
  data() {
    return {
      isScrolled: false,
      showInfoSubnav: false,
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
    },
  },
}

</script>

<style scoped> 
  /* 导航栏 */
:root {
  --light-color: rgba(255, 255, 255, 0.7);
  --dark-color: #1f1f1f;
  --bg-transparent: transparent;
  --bg-white: #ffffff;
  --hover-bg-color: #ac97f7;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: var(--bg-transparent);
  backdrop-filter: blur(10px);
  transition: background 0.3s, box-shadow 0.3s;
}

.header.scrolled {
  background: white;
  box-shadow: 0 2px 4px rgb(255, 255, 255);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1.5rem;
}


.logo {
  flex-shrink: 0;
  margin-right: 1rem;
}

.logo-link {
    margin-right: auto;
}

.gradient:hover{
    opacity: 0.8;
    transition: opacity 0.3s;
    background: #ac97f7;
    color: rgba(255, 255, 255, 0.7);
}

.gradient-text {
  background: linear-gradient(to right, violet, pink);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
}

.header.scrolled .gradient-text {
  background: none;
  color: var(--dark-color);
}

.header.scrolled .gradient-text:hover {
    opacity: 0.8;
    transition: opacity 0.3s;
    background: #ac97f7;
    color: rgba(255, 255, 255, 0.7);
}

.nav-links {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-shrink: 1;      /* 可以缩小 */
  flex-grow: 1;        /* 不要自动撑开 */
  flex-wrap: nowrap;   /* 不要换行 */
  max-width: 50%;      /* 不允许过宽，防止压右边 */
  overflow: hidden;    /* 防止溢出 */
}

.nav-item {
    width: max-content;
    color: rgba(255, 255, 255, 0.7);
    position: relative;
    text-decoration: none;
    padding: 12px 18px;
    border-radius: 24px;
    font-size: 1.2rem;
    font-weight: bold;
    transition: all 0.3s;
    animation: 1.5s linear 1s 1 normal both running show;
}

/* 滚动时背景变白，文字应变为深色 */
.header.scrolled .nav-item {
  color: var(--dark-color);
}

.nav-item:hover {
    background: #ac97f7;
    color: rgba(206, 255, 235, 0.7);
}

/* 滚动时背景变白，将鼠标放上后字体变回浅色*/
.header.scrolled .nav-item:hover {
  background: #ac97f7;
  color: rgba(255, 255, 255, 0.7);
}

.function-buttons {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-shrink: 0;
}

.func-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s;
}

/* 滚动后按钮颜色变深 */
.header.scrolled .func-btn {
  color: var(--dark-color);
}

/* 悬停时统一背景色和文字亮度 */
.func-btn:hover,
.header.scrolled .func-btn:hover {
  background: #ac97f7;
  color: white;
}

.sidebar-toggle-btn {
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.3s;
}

.header.scrolled .sidebar-toggle-btn{
  color: var(--dark-color);
}

.sidebar-toggle-btn:hover,
.header.scrolled .sidebar-toggle-btn:hover{
  background: #ac97f7;
  color: rgba(255, 255, 255, 0.7);
}

.sidebar {
  position: fixed;
  top: 60px; /* 紧贴导航栏底部 */
  right: 1rem;
  background: var(--bg-transparent);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 1rem;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s;
  min-width: 150px;
  max-width: 220px;
}

.header.scrolled .sidebar{
  background: #ffffff;
}


body.dark-mode .header.scrolled .sidebar {
  background-color: #1f1f1f;
  color: white;
}

/* Sidebar 中按钮继承 nav-item 样式 */
.sidebar .nav-item {
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  transition: background 0.3s;
}

.sidebar .nav-item:hover {
  background: #ac97f7;
  color: white;
}

/* 展开动画过渡定义 */
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: all 0.3s ease;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  transition: opacity 0.2s;
}

.sidebar-fade-enter-to,
.sidebar-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}



@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
/* 可以添加汉堡菜单按钮 */
}



.info-nav-wrapper {
  position: relative;
  display: inline-block;
}
.info-subnav {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 8px;
  min-width: 120px;
  z-index: 2000;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.info-subnav .subnav-item {
  color: #333;
  padding: 8px 20px;
  text-align: left;
  font-size: 1rem;
  border-radius: 4px;
  transition: background 0.2s;
  text-decoration: none;
}
.info-subnav .subnav-item:hover {
  background: #ac97f7;
  color: #fff;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>