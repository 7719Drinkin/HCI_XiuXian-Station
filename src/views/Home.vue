<!--Home.vue-->
<template>
    <div id="web-bg"></div>
    <!-- 可以添加更多内容 -->
    <div class="content">
      <!-- 动态文字 -->
      <h1 class="typing">{{ currentText }}<span class="cursor">|</span>
        <p class="intro">欢迎来到修仙小站————一个自制凡人修仙传介绍网站</p>
      </h1>
      
      

      <!-- 包装容器控制左右对齐 -->
      <div class="section-container">
        <!-- 分隔线 -->
        <div class="section-divider" @click="scrollToSection">
          <i class="fa-solid fa-angle-down scroll-icon"></i>
        </div>

        <!-- 主内容区域：左右两栏 -->
        <div class="main-content-row">
          <!-- 左边 Carousel 卡片 -->
          <div class="left-panel">
            <CarouselCards class="carouselcard" />
          </div>

          <!-- 右边占位卡片或组件 -->
          <div class="right-panel">
            <ContentRecommend />
          </div>
        </div>

        <!-- 主页卡片内容扩展 -->
        <div v-for="section in groupedItems" :key="section.title" class="card-section">
          <h2 class="section-title">{{ section.title }}</h2>
          <div class="card-list-grid">
            <div class="character-card" v-for="item in section.items" :key="item.id" >
              <div class="character-image">
                <img :src="item.image" alt="card" />
              </div>
              <div class="character-info">
                <h3 class="character-name">{{ item.title }}</h3>
                <p class="character-desc">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  <RightSideBar />
</template>


<script setup>
import { ref, onMounted } from 'vue'

const texts = [
  '时光如流水一般，物是人非，变幻莫测；我们还会再见面的，是吧？',
  '人生苦短，终归尘土。凭什么仙家就可以遨游天地？而我等凡人只能做这井底之蛙...',
  '在这个世界上没有所谓的对与错，成王败寇就是唯一的真理。',
  '杀人放火厉飞雨，万人敬仰韩天尊',
  '他日仙界再重逢，一生道友皆沧桑',
  '苦修万载终成仙 从此缘何两重天 他人依旧修行苦 我自逍遥天地间',
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

function scrollToSection() {
  const section = document.querySelector('.section-container')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const groupedItems = [
  {
    title: '内容梗概',
    items: [
      { id: 1, title: '凡人修仙传', description: '一个凡人追寻长生的故事', image: '/images/story1.jpg' },
      { id: 2, title: '初入修真界', description: '韩立机缘巧合进入七玄门', image: '/images/story2.jpg' },
      { id: 3, title: '险境突围', description: '在秘境中生死边缘突破', image: '/images/story3.jpg' },
      { id: 4, title: '问道长生', description: '踏遍仙路，天道无情亦有情', image: '/images/story4.jpg' },
      { id: 5, title: '背叛与信任', description: '修仙之路不仅有敌人，也有背后的暗箭', image: '/images/story5.jpg' },
      { id: 6, title: '成仙之谜', description: '韩立逐渐发现修仙世界背后隐藏的秘密', image: '/images/story6.jpg' }
    ]
  },
  {
    title: '主要人物',
    items: [
      { id: 7, title: '韩立', description: '主角，谨慎冷静，擅长隐忍', image: 'src/images/hanli.jpg' },
      { id: 8, title: '南宫婉', description: '掩月宗长老，韩立道侣。气质清冷，天资卓越。', image: 'src/images/nangongwan.jpg' },
      { id: 9, title: '厉飞雨', description: '桀骜不驯，修魔之人却重情重义', image: 'src/images/历飞雨1.png' },
    ]
  },
  {
    title: '概念场景',
    items: [
      { id: 10, title: '七玄门', description: '凡尘起点，江湖风云', image: 'src/images/1.png' },
      { id: 11, title: '黄枫谷', description: '仙门初入，筑基之地', image: 'src/images/2.png' },
      { id: 12, title: '虚天殿', description: '上古遗迹，至宝之争', image: 'src/images/3.png' },
    ]
  },
  {
    title: '原作导航',
    items: [
      { id: 13, title: '第一卷 凡人篇', description: '初入修仙界的艰难求存', image: '/images/vol1.jpg' },
      { id: 14, title: '第二卷 灵兽篇', description: '韩立踏上寻找灵兽的旅途', image: '/images/vol2.jpg' },
      { id: 15, title: '第三卷 魔道篇', description: '与魔道高手展开血战', image: '/images/vol3.jpg' },
      { id: 16, title: '第四卷 灵界篇', description: '进入更高级的修炼世界', image: '/images/vol4.jpg' }
    ]
  },
  {
    title: '动画导航',
    items: [
      { id: 17, title: '第一季', description: '从普通人踏入修仙界', image: '/images/anime1.jpg' },
      { id: 18, title: '第二季', description: '仙魔混战，危机四伏', image: '/images/anime2.jpg' },
      { id: 19, title: '第三季', description: '灵界修行，命运转折', image: '/images/anime3.jpg' },
      { id: 20, title: '剧场版', description: '全新剧情，制作精良', image: '/images/anime4.jpg' }
    ]
  }
]



</script>


<script>
import CarouselCards from '@/components/CarouselCards.vue'
import BackToTop from '@/components/BackToTop.vue';
import RightSideBar from '@/components/RightSideBar.vue';
import ContentRecommend from '@/components/ContentRecommend.vue';

export default {
  components:{
    CarouselCards,
    BackToTop,
    RightSideBar,
    ContentRecommend,
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

.p {
    font-size: 1.0rem;
    margin: 0.5rem 0;
    animation: fadeIn 1s ease-in-out;
}

.intro{
    font-size: 2.0rem;
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

.section-container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 分隔线 */
.section-divider {
  height: 120px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9));
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
  position: relative;
  transition: all 0.3s;
}

.section-divider:hover {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.9));
}

.scroll-icon {
  font-size: 3rem;
  color: #ffffff;
  animation: bounce 1.5s infinite;
}

/* 上下浮动动画 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

/* 主内容行：左右排布 */
.main-content-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 0px;
}

/* 左右两侧固定宽度或等比 */
.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 左侧对齐 */
.left-panel {
  flex: 7;
  margin: 2rem auto;
  justify-content: flex-start;
}

/* 右侧对齐 */
.right-panel {
  flex: 3;
  margin: 2rem auto;
  justify-content: flex-end;
}


.home-sections {
  margin-top: 3rem;
  width: 100%;
}

.content-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1rem;
  border-left: 5px solid #8b5cf6;
  padding-left: 1rem;
}

.card-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin: 50px auto;
  max-width: 1200px;
  padding: 0 1rem;
}

.character-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
  border: 1px solid #f0f0f0;
}

.character-card:hover {
  transform: translateY(-8px);
}

.character-image {
  height: 200px;
  background: linear-gradient(45deg, #e0f7fa, #bbdefb);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.character-image::before {
  content: "";
  position: absolute;
  width: 150%;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(-25deg) translateY(-80px);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { transform: rotate(-25deg) translateY(-80px); }
  100% { transform: rotate(-25deg) translateY(300px); }
}

.character-info {
  padding: 20px;
}

.character-name {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.character-desc {
  color: #666;
  font-size: 0.95rem;
}

.card-section {
  margin: 4rem auto;
  width: 100%;
  max-width: 1200px;
}

.section-title {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: left;
  padding-left: 0.5rem;
  border-left: 5px solid #00cccc;
  font-weight: bold;
}

</style>