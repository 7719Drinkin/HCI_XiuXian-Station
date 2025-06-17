<template>
  <div id="web-bg"></div>
  <div class="info-main">
    <div v-if="currentTab === 'character'" class="character-section">
      <!-- 左侧信息 -->
      <div class="character-info">
        <h2>{{ currentCharacter.name }}</h2>
        <p class="cv">CV：{{ currentCharacter.cv }}</p>
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
        <!-- 横向滚动人物列表 -->
        <div class="character-list">
          <div v-for="(char, idx) in characters" :key="char.name" :class="['char-item', {selected: idx === currentIndex}]" @click="selectCharacter(idx)">
            <img :src="char.avatar" :alt="char.name" />
          </div>
        </div>
      </div>
      <!-- 右侧形象展示 -->
      <div class="character-image-section">
        <img :src="currentCharacter.images[imageIndex]" class="character-image" :alt="currentCharacter.name" />
        <div class="image-switch-btns">
          <button v-for="(img, idx) in currentCharacter.images" :key="idx" :class="['img-btn', {active: idx === imageIndex}]" @click="imageIndex = idx">形象{{ idx+1 }}</button>
        </div>
      </div>
    </div>
    <div v-else class="other-tab-placeholder">
      <h2>敬请期待：{{ tabMap[currentTab] || '其他内容' }}</h2>
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
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tabMap = { character: '人物', artifact: '法宝', array: '阵法' }
const currentTab = ref(route.query.tab || 'character')
watch(() => route.query.tab, val => { currentTab.value = val || 'character' })

const characters = ref([
  {
    name: '韩立',
    avatar: '/src/images/韩立头像.png',
    images: ['/src/images/韩立.png', '/src/images/韩立2.png'],
    desc: '本作主角，天南胥国境州青牛镇五里沟人氏...',
    cv: '钱文青'
  },
  {
    name: '南宫婉',
    avatar: '/src/images/南宫碗头像.png',
    images: ['/src/images/2.png', '/src/images/3.png'],
    desc: '温婉聪慧，韩立的红颜知己，修为高深。',
    cv: '小N'
  },
  {
    name: '紫灵',
    avatar: '/src/images/紫灵头像.png',
    images: ['/src/images/3.png'],
    desc: '神秘少女，身世成谜，天赋异禀。',
    cv: '陶典'
  }
])
// 追加更多示例
characters.value.push(
  { name: '李慕婉', avatar: '/images/extra1.jpg', images: ['/src/images/1.png'], desc: '神秘女修，心思缜密。', cv: '配音A' },
  { name: '石穿空', avatar: '/images/extra2.jpg', images: ['/src/images/2.png'], desc: '体修高手，力大无穷。', cv: '配音B' },
  { name: '白飞儿', avatar: '/images/extra3.jpg', images: ['/src/images/3.png'], desc: '灵兽使，善驭灵禽。', cv: '配音C' },
  { name: '青元子', avatar: '/images/extra4.jpg', images: ['/src/images/1.png'], desc: '炼丹宗师，医术高明。', cv: '配音D' },
  { name: '李慕婉', avatar: '/images/extra1.jpg', images: ['/src/images/1.png'], desc: '神秘女修，心思缜密。', cv: '配音A' },
  { name: '石穿空', avatar: '/images/extra2.jpg', images: ['/src/images/2.png'], desc: '体修高手，力大无穷。', cv: '配音B' },
  { name: '白飞儿', avatar: '/images/extra3.jpg', images: ['/src/images/3.png'], desc: '灵兽使，善驭灵禽。', cv: '配音C' },
  { name: '青元子', avatar: '/images/extra4.jpg', images: ['/src/images/1.png'], desc: '炼丹宗师，医术高明。', cv: '配音D' }
)
const currentIndex = ref(0)
const imageIndex = ref(0)
const currentCharacter = computed(() => characters.value[currentIndex.value])
// 切换人物时重置形象索引
function selectCharacter(idx) {
  currentIndex.value = idx
  imageIndex.value = 0
}
// 切tab时重置人物
watch(currentTab, val => {
  if (val === 'character') {
    currentIndex.value = 0
    imageIndex.value = 0
  }
})
// 处理鼠标滚轮事件
function handleScroll(e) {
  const list = document.querySelector('.character-list')
  if (list) {
    list.scrollLeft += e.deltaY
  }
}
// 横向简介卡片内容
const profileCardList = computed(() => [
  { title: '背景', content: currentCharacter.value.background || currentCharacter.value.desc, contentLong: currentCharacter.value.backgroundLong || '本作主角，天南越国镜州青牛镇五里沟人氏，小名二愣子，相貌普通，皮肤黝黑，家中排行老四。童年被三叔介绍到七玄门，因身具灵根可修炼长春功而被墨大夫收为弟子，后来凭借升仙令加入越国七大仙派之一的黄枫谷，正式踏上修仙之路。' },
  { title: '境界', content: currentCharacter.value.realm || '结单后期', contentLong: currentCharacter.value.realmLong },
  { title: '经历', content: currentCharacter.value.experience || '目前已从乱星海回归，暂居落云宗', contentLong: currentCharacter.value.experienceLong || '目前已从乱星海回归，暂居落云宗' },
  { title: '法宝', content: currentCharacter.value.artifacts || '掌天瓶、青云剑...', contentLong: currentCharacter.value.artifactsLong || '韩立拥有多件法宝，如掌天瓶、青云剑。' },
  { title: '技能', content: currentCharacter.value.skills || '巨剑术', contentLong: currentCharacter.value.skillsLong || '韩立擅长多种战斗技巧，尤其是巨剑术、大衍诀。' }
])
const profileCards = ref(null)
// 横向滚动支持鼠标滚轮滑动
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 简介卡片横向滚动支持鼠标滚轮滑动和惯性
  nextTick(() => {
    const profileCards = document.querySelector('.profile-cards-wrapper')
    if (profileCards) {
      let velocity = 0
      let rafId = null
      function animate() {
        if (Math.abs(velocity) > 0.5) {
          profileCards.scrollLeft += velocity
          velocity *= 0.85
          rafId = requestAnimationFrame(animate)
        } else {
          velocity = 0
          rafId = null
        }
      }
      profileCards.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault()
          velocity += e.deltaY * 0.35
          if (!rafId) animate()
        }
      }, { passive: false })
    }
    // 人物列表横向滚动（惯性逻辑保留）
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
const expandedCardIdx = ref(null)
function expandCard(idx) { expandedCardIdx.value = idx }
function closeExpand() { expandedCardIdx.value = null }
</script>

<style scoped>
.info-main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 80px;
  min-height: 70vh;
}
.character-section {
  display: flex;
  width: 100%;
  max-width: 1200px;
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 32px 24px;
  gap: 40px;
}
.character-info {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 260px;
  position: relative;
  height: 420px;
  /* 保证高度一致，便于人物列表绝对定位 */
}
.character-info h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #111;
}
.cv {
  color: #ac97f7;
  font-weight: bold;
  margin-bottom: 1rem;
}
.desc {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-height: 120px;
  overflow-y: auto;
  color: #111;
}
.profile-cards-wrapper {
  width: 100%;
  margin-bottom: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.profile-cards {
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: max-content;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #ac97f7 #f3eaff;
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
.profile-cards-wrapper {
  scrollbar-width: thin;
  scrollbar-color: rgba(194, 180, 245, 0.3) transparent;
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
.profile-cards {
  scrollbar-width: thin;
  scrollbar-color: rgba(172,151,247,0.3) transparent;
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
.profile-card-content {
  scrollbar-width: thin;
  scrollbar-color: rgba(172,151,247,0.3) transparent;
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
  /* 隐藏人物列表的边框与背景 */
  /* background: rgba(255,255,255,0.95); */
  /* border-radius: 0 0 12px 12px; */
  /* box-shadow: 0 -2px 8px #eee; */
  color: #111;
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
.character-list {
  scrollbar-width: thin;
  scrollbar-color: rgba(194, 180, 245, 0.3) transparent;
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
  /* border: 4px solid #ac97f7; */
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