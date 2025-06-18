<!-- src/components/ContentRecommend.vue -->
<template>
  <div class="recommend-panel">
    <div
      class="recommend-card"
      v-for="item in items"
      :key="item.id"
      @click="goToWebsite(item.path)"
    >
      <div class="icon">{{ item.icon }}</div>
      <div class="info">
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <!-- About Us 卡片 -->
    <div class="recommend-card about-us-card" @click="goToGithub">
      <div class="icon fab fa-github github-icon"></div>
      <div class="info">
        <div class="title">关于我们</div>
        <div class="desc">了解我们的项目和开发过程</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const items = [
  {
    id: 1,
    title: '人物志',
    desc: '探索主角和反派的命运交织',
    icon: '🧙‍♂️',
    route: '/synopsis',
    path: 'https://zhuanlan.zhihu.com/p/30560699',
  },
  {
    id: 2,
    title: '章节导览',
    desc: '回顾修仙旅程的重要篇章',
    icon: '📖',
    route: '/chapters',
    path: 'https://www.qidian.com/book/107580/',
  },
  {
    id: 3,
    title: '音乐欣赏',
    desc: '沉浸在仙乐缥缈的世界',
    icon: '🎵',
    route: '/music',
    path: 'https://www.bilibili.com/video/BV1Z8EjzrEzr?spm_id_from=333.788.videopod.sections&vd_source=4f5b1f5587fe1b79f0d2a306b980c3d0',
  },
  {
    id: 4,
    title: '影视改编',
    desc: '观看修仙世界的影像表达',
    icon: '🎬',
    route: '/media',
    path: 'https://www.bilibili.com/bangumi/play/ss28747?spm_id_from=333.337.0.0',
  },
]

function navigateTo(path) {
  router.push(path)
}

function goToGithub() {
  window.open('https://github.com/7719Drinkin/HCI_Project', '_blank')
}

function goToWebsite(path) {
  window.open(path, '_blank')
}

</script>

<style scoped>
.recommend-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.recommend-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.recommend-card:hover {
  background: rgba(172, 151, 247, 0.2);
  transform: translateY(-3px);
}

.about-us-card {
  height: auto;
}

.icon {
  font-size: 2rem;
  margin-right: 1rem;
  color: rgb(255, 255, 255); 
}

.info {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
}


.desc {
  font-size: 0.9rem;
  color: #ffffff;
  margin-top: 0.2rem;
}



</style>
