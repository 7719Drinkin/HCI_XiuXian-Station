<!--CarouselCard.vue-->
<template>
  <div class="carousel-wrapper">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <router-link
        v-for="(card, index) in cards"
        :key="index"
        :to="card.route"
        class="carousel-card"
        :style="{ backgroundImage: `url(${card.image})` }"
      >
        <div class="card-info">
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-subtitle">{{ card.desc }}</p>
        </div>
      </router-link>
    </div>

    <button class="nav-btn left" @click="prevCard">‹</button>
    <button class="nav-btn right" @click="nextCard">›</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cards = [
  {
    title: '韩立初入修仙界',
    desc: '凡人少年踏上逆天修仙路',
    image: new URL('@/assets/web-bg1.png', import.meta.url).href,
    route: '/synopsis'
  },
  {
    title: '灵兽伙伴介绍',
    desc: '契约灵兽，纵横仙界',
    image: new URL('@/assets/card2.jpg', import.meta.url).href,
    route: '/resource'
  },
  {
    title: '炼丹术揭秘',
    desc: '灵药炼丹术的秘密',
    image: new URL('@/assets/card3.jpg', import.meta.url).href,
    route: '/resource'
  }
]

const currentIndex = ref(0)

const prevCard = () => {
  currentIndex.value = (currentIndex.value - 1 + cards.length) % cards.length
}
const nextCard = () => {
  currentIndex.value = (currentIndex.value + 1) % cards.length
}
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1080px;
  border-radius: 16px;
  background: #c9c9c9;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-card {
  flex: 0 0 100%;
  height: 520px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.carousel-card:hover {
  transform: scale(1.01);
}

.card-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1.5rem 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 80%);
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中内容 */
  justify-content: center;
  text-align: center;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.card-subtitle {
  font-size: 1.1rem;
  opacity: 0.85;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
}

/* 导航按钮 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  color: rgb(161, 160, 160);
  border: none;
  font-size: 2rem;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  border-radius: 10%;
  z-index: 5;
  transition: background 0.3s ease;
}

.nav-btn:hover {
  background: rgb(162, 162, 162);
  color: rgb(50, 50, 50);
}

.nav-btn.left {
  left: 1rem;
}
.nav-btn.right {
  right: 1rem;
}
</style>
