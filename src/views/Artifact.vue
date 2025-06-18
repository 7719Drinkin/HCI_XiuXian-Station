<template>
  <div id="web-bg"></div>
  <div class="artifact-main">
    <div class="character-section">
      <!-- 左侧信息 -->
      <div class="character-info">
        <h2>{{ currentArtifact.name }}</h2>
        <p class="cv">类型：{{ currentArtifact.type }}</p>
        <!-- 横向简介卡片滑动区 -->
        <div class="profile-cards-wrapper">
          <div class="profile-cards" ref="profileCards">
            <div class="profile-card" v-for="(card, idx) in profileCardList" :key="idx">
              <button class="expand-btn" @click="expandCard(idx)">⤢</button>
              <h4 class="profile-card-title">{{ card.title }}</h4>
              <div class="profile-card-content">{{ card.content }}</div>
            </div>
          </div>
        </div>
        <!-- 横向滚动法宝列表 -->
        <div class="character-list">
          <div v-for="(item, idx) in artifacts" :key="item.name" :class="['char-item', {selected: idx === currentIndex}]" @click="selectArtifact(idx)">
            <img :src="item.avatar" :alt="item.name" />
          </div>
        </div>
      </div>
      <!-- 右侧形象展示 -->
      <div class="character-image-section">
        <img :src="currentArtifact.images[imageIndex]" class="character-image" :alt="currentArtifact.name" />
        <div class="image-switch-btns">
          <button v-for="(img, idx) in currentArtifact.images" :key="idx" :class="['img-btn', {active: idx === imageIndex}]" @click="imageIndex = idx">形态{{ idx+1 }}</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 放大卡片弹窗 -->
  <div v-if="expandedCardIdx !== null" class="card-modal">
    <div class="card-modal-mask" @click="closeExpand"></div>
    <div class="card-modal-content">
      <button class="expand-close-btn" @click="closeExpand">×</button>
      <h3 class="profile-card-title">{{ profileCardList[expandedCardIdx].title }}</h3>
      <div class="profile-card-content profile-card-content-large">{{ profileCardList[expandedCardIdx].contentLong || profileCardList[expandedCardIdx].content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const artifacts = ref([
  {
    name: '玄天葫芦',
    avatar: '/src/images/玄天葫芦.png',
    images: ['/src/images/玄天葫芦1.png'],
    type: '灵宝',
    desc: '可吞噬炼化万物，威力无穷。',
    background: '上古遗宝，传说可炼化天地灵气。',
    backgroundLong: '玄天葫芦为上古灵宝，内蕴空间，可吞纳万物，炼化灵气，乃修士梦寐以求之物。',
    ability: '吞噬、炼化、空间',
    abilityLong: '玄天葫芦可吞噬敌人法宝、灵气，甚至生灵，炼化为己用。其内空间广阔，可储存大量物品。',
    experience: '韩立机缘所得，屡次化险为夷。',
    experienceLong: '韩立在秘境中偶得玄天葫芦，凭此多次脱险，成为其修仙路上的重要依仗。'
  },
  {
    name: '乌龙夺',
    avatar: '/src/images/乌龙夺.png',
    images: ['/src/images/乌龙夺.png'],
    type: '飞剑',
    desc: '锋利无比，可破万法。',
    background: '以紫金为材，祭炼多年。',
    backgroundLong: '乌龙夺由罕见紫金锻造，锋芒毕露，祭炼后可破除诸多禁制与法阵。',
    ability: '破法、御敌',
    abilityLong: '此剑可破敌法宝防御，亦可御敌千里之外，攻守兼备。',
    experience: '随韩立征战四方。',
    experienceLong: '乌龙夺伴随韩立征战四方，斩妖除魔，立下赫赫战功。'
  },
  {
    name: '青凝镜',
    avatar: '/src/images/青凝镜.png',
    images: ['/src/images/青凝镜1.png'],
    type: '法器',
    desc: '可映照虚实，洞察一切。',
    background: '古老法器，能映照虚实，洞察隐秘。',
    backgroundLong: '青凝镜乃古老法器，能映照虚实，洞察一切隐秘，常用于探查敌情与破解阵法。',
    ability: '映照、探查、破解',
    abilityLong: '青凝镜可映照虚实，探查敌情，破解阵法与禁制，乃修士必备之物。',
    experience: '韩立常用法器。',
    experienceLong: '青凝镜为韩立常用法器，屡次助其洞察敌情，破解重重危机。'
  }
])
const currentIndex = ref(0)
const imageIndex = ref(0)
const currentArtifact = computed(() => artifacts.value[currentIndex.value])
function selectArtifact(idx) {
  currentIndex.value = idx
  imageIndex.value = 0
}
const profileCardList = computed(() => [
  { title: '背景', content: currentArtifact.value.background || currentArtifact.value.desc, contentLong: currentArtifact.value.backgroundLong },
  { title: '能力', content: currentArtifact.value.ability || '未知', contentLong: currentArtifact.value.abilityLong },
  { title: '经历', content: currentArtifact.value.experience || '暂无详细经历', contentLong: currentArtifact.value.experienceLong }
])
const expandedCardIdx = ref(null)
function expandCard(idx) { expandedCardIdx.value = idx }
function closeExpand() { expandedCardIdx.value = null }

onMounted(() => {
  nextTick(() => {
    // 卡片横向滚动支持鼠标滚轮滑动和惯性
    const profileCardsWrapper = document.querySelector('.profile-cards-wrapper')
    if (profileCardsWrapper) {
      let velocity = 0
      let rafId = null
      function animate() {
        if (Math.abs(velocity) > 0.5) {
          profileCardsWrapper.scrollLeft += velocity
          velocity *= 0.85
          rafId = requestAnimationFrame(animate)
        } else {
          velocity = 0
          rafId = null
        }
      }
      profileCardsWrapper.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault()
          velocity += e.deltaY * 0.35
          if (!rafId) animate()
        }
      }, { passive: false })
    }
    // 法宝列表横向滚动（惯性逻辑）
    const list = document.querySelector('.character-list')
    if (list) {
      let velocity = 0
      let rafId = null
      function animate() {
        if (Math.abs(velocity) > 0.5) {
          list.scrollLeft += velocity
          velocity *= 0.85
          rafId = requestAnimationFrame(animate)
        } else {
          velocity = 0
          rafId = null
        }
      }
      list.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault()
          velocity += e.deltaY * 0.35
          if (!rafId) animate()
        }
      }, { passive: false })
    }
  })
})
</script>

<style scoped>
#web-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: url('/src/images/日照.png') center/cover no-repeat;
  opacity: 1;
  transition: opacity 0.3s, background 0.3s;
}
body.dark-mode #web-bg {
  background-image: url('../assets/web-bg1.png');
  /* 或者和主页保持一致的背景设置 */
}
.artifact-main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0px;
  min-height: 70vh;
}
.character-section {
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-width: 900px;
  min-height: 420px;
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 24px;
  gap: 40px;
  transition: all 0.3s ease;
}
body.dark-mode .character-section {
  background: #312742;
  color: #ddd;
}
.character-info {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 260px;
  position: relative;
  height: 420px;
}
.character-info h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #111;
  transition: all 0.3s ease;
}
body.dark-mode .character-info h2 {
  color: #fff;
}
.cv {
  color: #ac97f7;
  font-weight: bold;
  margin-bottom: 1rem;
}
.profile-cards-wrapper {
  width: 100%;
  margin-bottom: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(194, 180, 245, 0.3) transparent;
}
.profile-cards {
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: max-content;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(172,151,247,0.3) transparent;
}
.profile-cards-wrapper::-webkit-scrollbar {
  height: 5px;
  background: transparent;
}
.profile-cards-wrapper::-webkit-scrollbar-thumb {
  background: rgba(172,151,247,0.3);
  border-radius: 6px;
}
.profile-cards-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(172,151,247,0.6);
}
.profile-cards::-webkit-scrollbar {
  height: 5px;
  background: transparent;
}
.profile-cards::-webkit-scrollbar-thumb {
  background: rgba(172,151,247,0.3);
  border-radius: 6px;
}
.profile-cards::-webkit-scrollbar-thumb:hover {
  background: rgba(172,151,247,0.6);
}
.profile-card {
  min-width: 160px;
  max-width: 200px;
  height: 90px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px #ac97f733;
  padding: 10px 16px 10px 14px;
  color: #222;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}
body.dark-mode .profile-card {
  background: #312742;
  color: #ddd;
  box-shadow: 0 2px 8px rgba(255,255,255,0.1);
}
.expand-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #ac97f7;
  cursor: pointer;
  z-index: 2;
  padding: 2px 4px;
  border-radius: 6px;
  transition: background 0.2s;
}
.expand-btn:hover {
  background: #f3eaff;
}
.profile-card-title {
  font-size: 1.02rem;
  font-weight: bold;
  color: #ac97f7;
  margin-bottom: 4px;
  margin-top: 0;
  margin-left: 0;
}
.profile-card-content {
  font-size: 0.98rem;
  color: #333;
  word-break: break-all;
  overflow-y: auto;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: rgba(172,151,247,0.3) transparent;
}
body.dark-mode .profile-card-content {
  color: #ddd;
}
.profile-card-content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}
.profile-card-content::-webkit-scrollbar-thumb {
  background: rgba(172,151,247,0.3);
  border-radius: 6px;
}
.profile-card-content::-webkit-scrollbar-thumb:hover {
  background: rgba(172,151,247,0.6);
}
.character-list {
  display: flex;
  flex-direction: row;
  gap: 0;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 8px;
  position: absolute;
  left: 0;
  bottom: 0;
  color: #111;
  scrollbar-width: thin;
  scrollbar-color: rgba(194, 180, 245, 0.3) transparent;
}
.character-list::-webkit-scrollbar {
  height: 5px;
  background: transparent;
}
.character-list::-webkit-scrollbar-thumb {
  background: rgba(172,151,247,0.3);
  border-radius: 6px;
}
.character-list::-webkit-scrollbar-thumb:hover {
  background: rgba(172,151,247,0.6);
}
.char-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px 8px;
  transition: background 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
}
.char-item.selected {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}
.char-item.selected img {
  border-color: #ac97f7;
  box-shadow: 0 0 0 6px #e5d6ff, 0 4px 20px #ac97f799;
  outline: 3px solid #ac97f7;
  outline-offset: 2px;
}
.char-item img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
  box-shadow: 0 0 0 4px #fff, 0 2px 12px #ac97f7aa;
  background: #fff;
  transition: box-shadow 0.2s, border-color 0.2s;
  position: relative;
  z-index: 2;
}
.char-item span {
  font-size: 1.1rem;
}
.character-image-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: 420px;
  width: 320px;
}
.character-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 4px 24px #ac97f7aa;
  background: #fff;
}
.image-switch-btns {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 10px;
  margin-right: 10px;
}
.img-btn {
  background: #eee;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  margin: 8px 0;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.img-btn.active, .img-btn:hover {
  background: #ac97f7;
  color: #fff;
}
.other-tab-placeholder {
  width: 100%;
  text-align: center;
  margin-top: 120px;
  color: #ac97f7;
  font-size: 2rem;
}
.card-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-modal-mask {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(6px);
  z-index: 1;
}
body.dark-mode .card-modal-mask {
  background: rgba(49,39,66,0.5);
}
.card-modal-content {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ac97f799;
  padding: 32px 36px 28px 36px;
  min-width: 320px;
  max-width: 420px;
  min-height: 120px;
  max-height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: modal-pop 0.18s cubic-bezier(.5,1.8,.7,1) both;
  overflow: hidden;
  transition: all 0.3s ease;
}
body.dark-mode .card-modal-content {
  background: #312742;
}
@keyframes modal-pop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.expand-close-btn {
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #ac97f7;
  cursor: pointer;
  z-index: 3;
  padding: 2px 6px;
  border-radius: 8px;
  transition: background 0.2s;
}
.expand-close-btn:hover {
  background: #f3eaff;
}
.profile-card-content-large {
  font-size: 1.08rem;
  color: #333;
  margin-top: 10px;
  max-height: 38vh;
  overflow-y: auto;
  line-height: 1.8;
  width: 100%;
}
</style>
