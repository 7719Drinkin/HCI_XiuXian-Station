<template>
  <div id="web-bg"></div>
  <div class="info-main">
    <div v-if="currentTab === 'character'" class="character-section">
      <!-- 左侧信息 -->
      <div class="character-info">
        <h2>{{ currentCharacter.name }}</h2>
        <p class="cv">CV：{{ currentCharacter.cv }}</p>
        <p class="desc">{{ currentCharacter.desc }}</p>
        <!-- 横向滚动人物列表 -->
        <div class="character-list">
          <div v-for="(char, idx) in characters" :key="char.name" :class="['char-item', {selected: idx === currentIndex}]" @click="selectCharacter(idx)">
            <img :src="char.avatar" :alt="char.name" />
            <span>{{ char.name }}</span>
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
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const tabMap = { character: '人物', artifact: '法宝', array: '阵法' }
    const currentTab = ref(route.query.tab || 'character')
    watch(() => route.query.tab, val => { currentTab.value = val || 'character' })

    // 示例人物数据
    const characters = ref([
      {
        name: '韩立',
        avatar: '/src/images/1.png',
        images: ['/src/images/韩立.png', '/src/images/2.png'],
        desc: '本作主角，资质平庸却坚韧不拔，凭借毅力踏上修仙之路。',
        cv: '刘三木'
      },
      {
        name: '南宫婉',
        avatar: '/src/images/2.png',
        images: ['/src/images/2.png', '/src/images/3.png'],
        desc: '温婉聪慧，韩立的红颜知己，修为高深。',
        cv: '小N'
      },
      {
        name: '紫灵',
        avatar: '/src/images/3.png',
        images: ['/src/images/3.png'],
        desc: '神秘少女，身世成谜，天赋异禀。',
        cv: '陶典'
      }
    ])
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
    return {
      currentTab, tabMap, characters, currentCharacter, currentIndex, imageIndex, selectCharacter
    }
  }
}
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
}
.character-list {
  display: flex;
  flex-direction: row;
  gap: 18px;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 8px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(255,255,255,0.95);
  border-radius: 0 0 12px 12px;
  box-shadow: 0 -2px 8px #eee;
}
.char-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px 12px;
  transition: background 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
}
.char-item.selected {
  background: #f3eaff;
  border-color: #ac97f7;
  box-shadow: 0 2px 8px #ac97f7aa;
}
.char-item img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
  border: 2px solid #eee;
}
.char-item span {
  font-size: 0.95rem;
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
</style>