<template>
  <div id="web-bg"></div>
  <div class="info-main">
    <div v-if="currentTab === 'character'">
      <div class="search-bar-wrapper">
        <input
          v-model="searchText"
          class="search-bar"
          type="text"
          placeholder="搜索角色名：韩立..."
          @keyup.enter="searchCharacter"
        />
        <span class="search-icon" @click="searchCharacter">🔍</span>
        <span v-if="searchText && searchNoMatch" class="search-hint">未找到相关角色</span>
      </div>
      <div class="character-section">
        <!-- 左侧信息 -->
        <div class="character-info">
          <div style="display: flex; align-items: center;">
            <h2 style="margin-right: 8px;">{{ currentCharacter.name }}</h2>
            <button class="relation-btn" @click="showRelation = true" title="查看人物关系图谱">
              <img :src="relationIcon" alt="人物关系图谱" class="relation-icon-svg" />
            </button>
          </div>
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
    </div>
    <Artifact v-else-if="currentTab === 'artifact'" />
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
    <div v-if="showRelation" class="relation-modal">
      <div class="relation-mask" @click="closeRelation"></div>
      <div class="relation-content"
        @wheel="onRelationWheel"
        @mousedown="onRelationMouseDown"
        style="overflow: hidden;">
        <button class="relation-close-btn" @click="closeRelation">×</button>
        <img
          :src="currentCharacter.relationImg || '/src/images/relation-demo.png'"
          alt="人物关系图谱"
          class="relation-img"
          :style="{
            transform: `translate(${relationOffset.x}px, ${relationOffset.y}px) scale(${relationScale})`,
            pointerEvents: dragging ? 'none' : 'auto'
          }"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '../store/theme'
import Artifact from './Artifact.vue'

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
    realm: '目前结单后期',
    realmLong: '在动画中，韩立目前的修为境界为结单后期，正准备结婴。',
    experience: '青元剑芒、巨剑术、雷遁术等',
    experienceLong: '韩立擅长的神通种类繁多，如青元剑芒、巨剑术、雷遁术等，战斗经验丰富，善于应对各种危机。',
    desc: '本作主角，天南胥国境州青牛镇五里沟人氏...',
    backgroundLong: '韩立，天南越国镜州青牛镇五里沟人氏，小名二愣子，相貌普通，皮肤黝黑，家中排行老四。童年被三叔介绍到七玄门，因身具灵根可修炼长春功而被墨大夫收为弟子，后来凭借升仙令加入越国七大仙派之一的黄枫谷，正式踏上修仙之路。',
    artifacts: '掌天瓶、青云剑、鬼罗幡等',
    artifactsLong: '韩立拥有多件法宝，如掌天瓶、青云剑、鬼罗幡等，这些法宝在战斗中发挥了重要作用。',
    skills: '大衍诀、长春功、三转重元功等',
    skillsLong: '韩立擅长多种功法，如大衍诀、长春功、三砖重元功等，战斗技巧高超。',
    cv: '钱文青',
    relationImg: '/src/images/韩立人物关系图谱.png'
  },
  {
    name: '南宫婉',
    avatar: '/src/images/南宫碗头像.png',
    images: ['/src/images/南宫碗1.png', '/src/images/南宫碗2.png'],
    realm: '结单中期',
    realmLong: '南宫婉目前的修为境界为结单中期。',
    experience: '冰火双修、幻术、剑术等',
    experienceLong: '南宫婉擅长冰火双修，幻术和剑术等多种神通，战斗能力强大。',
    desc: '温婉聪慧，韩立的红颜知己。',
    backgroundLong: '是韩立的伴侣，气质优雅高贵、容貌倾国倾城，和韩立一样一心向道。南宫婉极大影响了韩立的修仙轨迹，是韩立心中最重要的人。',
    artifacts: '朱雀环、诛邪刺等',
    artifactsLong: '南宫婉拥有朱雀环、诛邪刺等法宝，这些法宝在战斗中发挥了重要作用。',
    skills: '素女轮回功',
    skillsLong: '南宫婉主修功法为素女轮回功。',
    cv: '李诗萌',
    relationImg: '/src/images/南宫碗人物关系图谱.png'
  },
  {
    name: '紫灵',
    avatar: '/src/images/紫灵头像.png',
    images: ['/src/images/紫灵1.png', '/src/images/紫灵2.png'],
    realm: '结单初期',
    realmLong: '紫灵目前的修为境界为结单初期。',
    experience: '幻术、空间法术、剑术等',
    experienceLong: '紫灵擅长幻术、空间法术和剑术等多种神通，战斗能力强大。',
    desc: '神秘少女，身世成谜，天赋异禀。',
    backgroundLong: '紫灵，原名：汪凝，别名：仙子、紫丫头，是女主角之一，周媛跟汪恒的女儿，韩立的红颜之一，人界乱星海妙音门少主、魔界六极圣祖门下弟子、黑水上人弟子。',
    artifacts: '紫灵仙剑',
    artifactsLong: '紫灵拥有紫灵仙剑。',
    skills: '紫灵剑法、空间法术等',
    skillsLong: '紫灵擅长紫灵剑法、空间法术等多种功法，战斗技巧高超。',
    cv: '刘蕊（成年）、江月（幼年）',
    relationImg: '/src/images/紫灵人物关系图谱.png'
  }
])
// 追加更多示例
characters.value.push(
  { name: '历飞雨', avatar: '/src/images/历飞雨头像.png', images: ['/src/images/历飞雨1.png', '/src/images/历飞雨2.png'], desc: '厉飞雨，七玄门弟子，韩立好友。和韩立同年上山...', cv: '杨天翔', relationImg: '/src/images/relation-demo.png' },
  { name: '石穿空', avatar: '/src/images/紫灵头像.png', images: ['/src/images/2.png'], desc: '体修高手，力大无穷。', cv: '配音B', relationImg: '/src/images/relation-demo.png' },
  { name: '白飞儿', avatar: '/src/images/紫灵头像.png', images: ['/src/images/3.png'], desc: '灵兽使，善驭灵禽。', cv: '配音C', relationImg: '/src/images/relation-demo.png' },
  { name: '青元子', avatar: '/src/images/紫灵头像.png', images: ['/src/images/1.png'], desc: '炼丹宗师，医术高明。', cv: '配音D', relationImg: '/src/images/relation-demo.png' },
  { name: '李慕婉', avatar: '/src/images/紫灵头像.png', images: ['/src/images/1.png'], desc: '神秘女修，心思缜密。', cv: '配音A', relationImg: '/src/images/relation-demo.png' },
  { name: '石穿空', avatar: '/src/images/紫灵头像.png', images: ['/src/images/2.png'], desc: '体修高手，力大无穷。', cv: '配音B', relationImg: '/src/images/relation-demo.png' },
  { name: '白飞儿', avatar: '/src/images/紫灵头像.png', images: ['/src/images/3.png'], desc: '灵兽使，善驭灵禽。', cv: '配音C', relationImg: '/src/images/relation-demo.png' },
  { name: '青元子', avatar: '/src/images/紫灵头像.png', images: ['/src/images/1.png'], desc: '炼丹宗师，医术高明。', cv: '配音D', relationImg: '/src/images/relation-demo.png' }
)
const currentIndex = ref(0)
const imageIndex = ref(0)
const currentCharacter = computed(() => characters.value[currentIndex.value])
// 切换人物时重置形象索引
function selectCharacter(idx) {
  currentIndex.value = idx
  imageIndex.value = 0
  // 自动滚动到对应人物头像
  nextTick(() => {
    const list = document.querySelector('.character-list')
    if (list) {
      const items = list.querySelectorAll('.char-item')
      if (items[idx]) {
        items[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  })
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
  { title: '背景', content: currentCharacter.value.background || currentCharacter.value.desc, contentLong: currentCharacter.value.backgroundLong },
  { title: '境界', content: currentCharacter.value.realm || currentCharacter.value.realm, contentLong: currentCharacter.value.realmLong },
  { title: '神通', content: currentCharacter.value.experience || currentCharacter.value.experience, contentLong: currentCharacter.value.experienceLong },
  { title: '法宝', content: currentCharacter.value.artifacts || currentCharacter.value.artifacts, contentLong: currentCharacter.value.artifactsLong },
  { title: '功法', content: currentCharacter.value.skills || currentCharacter.value.skills, contentLong: currentCharacter.value.skillsLong }
])
const profileCards = ref(null)
// 横向滚动支持鼠标滚轮滑动
function bindScrollInertia() {
  nextTick(() => {
    // 简介卡片横向滚动
    const profileCardsWrapper = document.querySelector('.profile-cards-wrapper')
    if (profileCardsWrapper && !profileCardsWrapper._inertiaBind) {
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
      profileCardsWrapper._inertiaBind = true
    }
    // 人物列表横向滚动
    const list = document.querySelector('.character-list')
    if (list && !list._inertiaBind) {
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
      list._inertiaBind = true
    }
  })
}

onMounted(() => {
  bindScrollInertia()
})
watch(currentTab, val => {
  if (val === 'character') {
    bindScrollInertia()
  }
})
const expandedCardIdx = ref(null)
function expandCard(idx) { expandedCardIdx.value = idx }
function closeExpand() { expandedCardIdx.value = null }
const showRelation = ref(false)
const theme = useThemeStore()
const relationIcon = computed(() =>
  theme.isDarkMode
    ? '/src/images/人际关系-白色.svg'
    : '/src/images/人际关系-灰色.svg'
)
const searchText = ref('')
const searchNoMatch = ref(false)
function searchCharacter() {
  const keyword = searchText.value.trim()
  if (!keyword) {
    searchNoMatch.value = false
    return
  }
  const idx = characters.value.findIndex(c => c.name.includes(keyword))
  if (idx !== -1) {
    selectCharacter(idx)
    searchNoMatch.value = false
  } else {
    searchNoMatch.value = true
  }
}
watch(searchText, val => {
  if (!val) searchNoMatch.value = false
})
const filteredCharacters = computed(() => {
  if (!searchText.value.trim()) return characters.value
  return characters.value.filter(c =>
    c.name.includes(searchText.value.trim()) ||
    (c.desc && c.desc.includes(searchText.value.trim()))
  )
})
const relationScale = ref(0.7)
const relationOffset = ref({ x: 0, y: -130 })
const dragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const imgStart = ref({ x: 0, y: 0 })

function onRelationWheel(e) {
  e.preventDefault()
  let scale = relationScale.value + (e.deltaY < 0 ? 0.1 : -0.1)
  scale = Math.max(0.3, Math.min(3, scale))
  relationScale.value = scale
}
function onRelationMouseDown(e) {
  if (e.button !== 0) return
  dragging.value = true
  dragStart.value = { x: e.clientX, y: e.clientY }
  imgStart.value = { ...relationOffset.value }
  window.addEventListener('mousemove', onRelationMouseMove)
  window.addEventListener('mouseup', onRelationMouseUp)
}
function onRelationMouseMove(e) {
  if (!dragging.value) return
  relationOffset.value = {
    x: imgStart.value.x + (e.clientX - dragStart.value.x),
    y: imgStart.value.y + (e.clientY - dragStart.value.y)
  }
}
function onRelationMouseUp() {
  dragging.value = false
  window.removeEventListener('mousemove', onRelationMouseMove)
  window.removeEventListener('mouseup', onRelationMouseUp)
}
function closeRelation() {
  showRelation.value = false
  relationScale.value = 0.7
  relationOffset.value = { x: 0, y: -60 }
}
watch(showRelation, val => {
  if (val) {
    relationScale.value = 0.7
    relationOffset.value = { x: 0, y: -130 }
  }
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
.info-main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 125px;
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
  /* 保证高度一致，便于人物列表绝对定位 */
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
  transition: all 0.3s ease;
}
body.dark-mode .profile-card {
  background: #7e5fb3;
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
  transition: all 0.3s ease;
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
.relation-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #ac97f7;
  cursor: pointer;
  margin-left: 2px;
  border-radius: 6px;
  padding: 2px 6px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
}
.relation-btn:hover {
  background: #f3eaff;
}
body.dark-mode .relation-btn:hover {
  background: #3a2e4e !important;
  /* 可以自定义为更深的色或加边框等 */
  box-shadow: 0 0 0 2px #bfa7ff;
}
.relation-icon-svg {
  width: 28px;
  height: 28px;
  display: block;
}
.relation-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.relation-mask {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(6px);
  z-index: 1;
}
.relation-content {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ac97f799;
  padding: 24px 24px 18px 24px;
  min-width: 320px;
  max-width: 90vw;
  min-height: 120px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: modal-pop 0.18s cubic-bezier(.5,1.8,.7,1) both;
  overflow: hidden;
  position: relative;
  user-select: none;
}
.relation-close-btn {
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
.relation-close-btn:hover {
  background: #f3eaff;
}
.relation-img {
  max-width: none;
  max-height: none;
  width: auto;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 12px #ac97f733;
  margin-top: 12px;
  display: block;
  object-fit: contain;
  cursor: grab;
  transition: box-shadow 0.2s;
}
.relation-img:active {
  cursor: grabbing;
}
.search-bar-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 24px 0;
  padding: 0 8px;
}
.search-bar {
  width: 260px;
  height: 38px;
  border-radius: 20px;
  border: 1.5px solid #ac97f7;
  background: #f8f6ff;
  color: #333;
  font-size: 1.08rem;
  padding: 0 40px 0 16px;
  outline: none;
  box-shadow: 0 2px 8px #ac97f722;
  transition: border 0.2s, background 0.2s, color 0.2s;
}
.search-bar:focus {
  border-color: #7e6bc9;
  background: #f3eaff;
}
.search-icon {
  margin-left: -32px;
  font-size: 1.2rem;
  color: #ac97f7;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}
.search-icon:hover {
  color: #7e6bc9;
}
body.dark-mode .search-bar {
  background: #2a2238;
  color: #eee;
  border: 1.5px solid #bfa7ff;
  box-shadow: 0 2px 8px #0002;
}
body.dark-mode .search-bar:focus {
  background: #312742;
  border-color: #bfa7ff;
}
body.dark-mode .search-icon {
  color: #bfa7ff;
}
body.dark-mode .search-icon:hover {
  color: #fff;
}
.search-hint {
  margin-left: 12px;
  color: #e57373;
  font-size: 0.98rem;
  transition: color 0.2s;
  font-weight: 700;
}
body.dark-mode .search-hint {
  color: #ffb3b3;
}
</style>