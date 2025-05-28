<template>
  <div class="container">
    <h1>精选推荐</h1>
    <div class="recommendation-grid">
      <a href="#characters" class="recommendation-card">
        <!-- 人物推荐卡片 -->
        <div class="recommendation-card">
          <div class="card-image">
            <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.NirrTS62xmR_AsARBDDzMAHaEo?w=249&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="推荐内容">
          </div>
          <div class="card-content">
            <h3 class="card-title">角色</h3>
            <p class="card-description">这里放置角色的简要描述和推荐理由，内容简明扼要突出重点...</p>
            <div class="card-tags">
                <span class="tag">人物</span>
                <span class="tag">剧情</span>
                <span class="tag">2023</span>
            </div>
          </div>
        </div>
      </a>

      <a href="#movies" class="recommendation-card">
        <!-- 电影推荐卡片 -->
        <div class="recommendation-card">
          <div class="card-image">
            <img src="https://source.unsplash.com/random/800x600?movie" alt="推荐内容">
          </div>
          <div class="card-content">
            <h3 class="card-title">影片名称</h3>
            <p class="card-description">这里放置影片的简要描述和推荐理由，内容简明扼要突出重点...</p>
            <div class="card-tags">
              <span class="tag">电影</span>
              <span class="tag">剧情</span>
              <span class="tag">2023</span>
            </div>
          </div>
        </div>
      </a>
          
      <a href="#music" class="recommendation-card">
        <!-- 音乐推荐卡片 -->
        <div class="recommendation-card">
          <div class="card-image">
            <img src="https://source.unsplash.com/random/800x600?music" alt="推荐内容">
          </div>
          <div class="card-content">
            <h3 class="card-title">专辑名称</h3>
            <p class="card-description">这里放置音乐的简要描述和推荐理由，突出艺术特色和推荐亮点...</p>
            <div class="card-tags">
              <span class="tag">音乐</span>
              <span class="tag">流行</span>
              <span class="tag">2023</span>
            </div>
          </div>
        </div>
      </a>
      <!-- 更多推荐卡片... -->
    </div>

    <!-- 新增内容分区 -->
    <section id="characters" class="content-section">
      <h2 class="section-title">凡人修仙传 · 风云录</h2>
      <div class="evergarden-grid">
        <div 
          v-for="(character, index) in cultivationRoles"
          :key="character.name"
          class="evergarden-card"
          :class="{ 'expanded': expandedIndex === index }"
        >
          <div class="card-bg" :style="{ backgroundImage: `url(${character.bg})` }"></div>
          
          <div class="card-main">
            <div class="avatar-wrapper">
              <img 
                :src="character.avatar" 
                :alt="character.name"
                class="character-avatar"
              >
            </div>
            
            <div class="card-content">
              <h3 class="character-name">{{ character.name }}</h3>
              <p class="character-title">{{ character.title }}</p>
              
              <div class="divider"></div>

              <p class="character-desc">{{ character.shortDesc }}</p>

              <button 
                class="evergarden-btn"
                @click.stop="toggleExpand(index)"
              >
                {{ expandedIndex === index ? '收起仙缘' : '展开命途' }}
                <span class="btn-arrow">{{ expandedIndex === index ? '▼' : '▶' }}</span>
              </button>

              <transition name="fade-expand">
                <div v-if="expandedIndex === index" class="expanded-detail">
                  <div class="detail-section">
                    <h4>修为境界</h4>
                    <p>{{ character.cultivationLevel }}</p>
                  </div>
                  <div class="detail-section">
                    <h4>本命法宝</h4>
                    <ul class="artifact-list">
                      <li v-for="item in character.artifacts" :key="item">{{ item }}</li>
                    </ul>
                  </div>
                  <div class="signature-quote">{{ character.quote }}</div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="movies" class="content-section">
      <div class="container">
        <h2 class="section-title">电影精选</h2>
        <!-- 具体推荐内容 -->
        <div class="recommendation-grid">
            <!-- 重复3-4个推荐卡片 -->
        </div>
      </div>
    </section>

    <section id="music" class="content-section">
      <div class="container">
        <h2 class="section-title">音乐合集</h2>
        <!-- 具体推荐内容 -->
        <div class="recommendation-grid">
            <!-- 重复3-4个推荐卡片 -->
        </div>
      </div>
    </section>

    <BackToTop />
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop.vue'
//import CharacterRecommendation from '@/components/CharacterRecommendation.vue'

export default {
  components: {
    BackToTop
  },
  data() {
    return {
      expandedIndex: null,
      cultivationRoles: [
        {
          name: '韩立',
          title: '凡人修仙· 大道独行',
          avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.NirrTS62xmR_AsARBDDzMAHaEo?w=249&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          bg: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.NirrTS62xmR_AsARBDDzMAHaEo?w=249&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          shortDesc: '本为一介凡人，偶得神秘小瓶，踏上逆天修仙之路...',
          cultivationLevel: '大乘期 · 半步真仙',
          artifacts: ['掌天瓶', '青竹蜂云剑', '风雷翅'],
          quote: "大道无情，唯争一线机缘",
          tags: ['主角', '炼器大师', '谨慎果断']
        },
        {
          name: '南宫婉',
          title: '掩月宗主 · 冰凤之体',
          avatar: 'https://example.com/nangong-avatar.jpg',
          bg: 'https://example.com/nangong-bg.jpg',
          shortDesc: '掩月宗天才修士，身具特殊体质，与韩立结下不解之缘...',
          cultivationLevel: '化神后期',
          artifacts: ['寒月轮', '冰魄神光', '凤鸣琴'],
          quote: "仙路漫漫，愿与君共证大道",
          tags: ['道侣', '冰系术法', '宗门领袖']
        }
        // 可继续添加其他角色...
      ]
    }
  },
  methods: {
    toggleExpand(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index
    }
  }
}
</script>

<style scoped>
  /* 内容容器 */
  .container {
    max-width: 1200px;
    margin: 80px auto 40px;
    padding: 0 20px;
  }

  /* 推荐卡片 */
  .recommendation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
  }

  .recommendation-card {
    background: rgba(255, 255, 255, 0.95); /* 微透明卡片背景 */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    position: relative;
  }

  .recommendation-card:hover {
    transform: translateY(-5px);
  }

  .recommendation-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .card-image {
    height: 200px;
    background: #e0e0e0;
    position: relative;
    overflow: hidden;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  .card-description {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .card-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    background: #e9ecef;
    color: #495057;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  /* 新增样式 */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* 防止导航栏遮挡 */
  }

  /* 内容分区样式 */
  .content-section {
    padding: 4rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .section-title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    padding-left: 1rem;
    border-left: 4px solid #3498db;
  }


  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .full-description {
    display: block;
    margin-top: 0.8rem;
    color: #666;
  }



  /* Evergarden风格核心样式 */
  .evergarden-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
  }

  .evergarden-card {
    background: rgba(255, 255, 255, 0.93);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    min-height: 480px;
  }

  .evergarden-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 180px;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6) saturate(1.2);
  }

  .card-main {
    position: relative;
    padding: 24px;
    z-index: 1;
  }

  .avatar-wrapper {
    width: 120px;
    height: 120px;
    margin: -80px auto 20px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .character-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .character-name {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.8rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 8px;
  }

  .character-title {
    font-size: 0.95rem;
    color: #7f8c8d;
    text-align: center;
    letter-spacing: 1px;
  }

  .divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3498db, transparent);
    margin: 1.5rem auto;
  }

  .character-desc {
    font-size: 0.92rem;
    line-height: 1.8;
    color: #666;
    text-align: justify;
    margin-bottom: 1.5rem;
  }

  .evergarden-btn {
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .evergarden-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  }

  .btn-arrow {
    margin-left: 8px;
    font-size: 0.9em;
  }

  /* 展开详情样式 */
  .expanded-detail {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .detail-section {
    margin-bottom: 1.2rem;
  }

  .detail-section h4 {
    color: #2c3e50;
    font-size: 0.95rem;
    margin-bottom: 0.6rem;
    position: relative;
    padding-left: 1rem;
  }

  .detail-section h4::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 70%;
    background: #3498db;
  }

  .artifact-list {
    list-style: none;
    padding-left: 1rem;
  }

  .artifact-list li {
    position: relative;
    padding-left: 1.2rem;
    margin-bottom: 0.4rem;
  }

  .artifact-list li::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: #3498db;
  }

  .signature-quote {
    font-style: italic;
    color: #7f8c8d;
    text-align: center;
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(236, 240, 241, 0.3);
    border-radius: 8px;
  }

  /* 动画效果 */
  .fade-expand-enter-active,
  .fade-expand-leave-active {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
  }

  .fade-expand-enter-from,
  .fade-expand-leave-to {
    opacity: 0;
    max-height: 0;
  }

  .fade-expand-enter-to,
  .fade-expand-leave-from {
    opacity: 1;
    max-height: 500px;
  }

  /* 响应式调整 */
  @media (max-width: 1200px) {
    .evergarden-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 992px) {
    .evergarden-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .evergarden-card {
      min-height: 420px;
    }
  }

  @media (max-width: 768px) {
    .evergarden-grid {
      grid-template-columns: 1fr;
    }
    .character-name {
      font-size: 1.6rem;
    }
  }

</style>