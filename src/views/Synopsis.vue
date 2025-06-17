<template>
  <div id="web-bg"></div>
  <div class="container">
    <!-- 头部 -->
    <header class="fade-in">
      <p class="logo">修仙之路，凡人亦可成仙</p>
    </header>
    <!-- 内容梗概 -->
    <section class="content-section fade-in delay-1">
      <h2 class="section-title">内容梗概</h2>
      <div class="section-content">
        <p>《凡人修仙传》是忘语创作的修仙类网络小说，讲述了一个普通山村少年韩立偶然进入江湖小门派，依靠自身努力和合理算计最终修炼成仙的故事。</p>
        <p>小说以"凡人流"开创者的身份在网文界占据重要地位，其最大特点是真实感极强的修仙历程描写，主角没有逆天的运气和背景，完全依靠谨慎的性格、合理的算计和坚定的道心一步步走向巅峰。</p>
        <p>故事分为人界篇、灵界篇和仙界篇（未完），时间跨度长达数万年，构建了一个庞大而严谨的修仙世界体系。从炼气、筑基、结丹、元婴到化神等境界的突破，都伴随着巨大的风险和考验。</p>
      </div>
    </section>
    <div class="navigation">
      <button 
        v-for="(chapter, index) in chapters" 
        :key="index"
        class="nav-btn"
        :class="{ active: currentChapter === index }"
        @click="changeChapter(index)"
      >
        {{ chapter.title }}
      </button>
    </div>
    
    <transition name="fade" mode="out-in">
      <div class="story-container" :key="currentChapter">
        <h2 class="story-title">{{ chapters[currentChapter].title }}</h2>
        <div class="story-content" v-html="chapters[currentChapter].content"></div>
      </div>
    </transition>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧内容 -->
      <div class="content-left">
        <!-- 主角介绍 -->
        <section class="content-section fade-in delay-2">
          <h2 class="section-title">主要人物</h2>
          <div class="character-list">
            <div class="character-card" v-for="(character, index) in characters" :key="index">
              <div class="character-image">
                <img :src="character.image" alt="推荐内容" style="max-width: 350px; height: auto">
              </div>
              <div class="character-info">
                <h3 class="character-name">{{ character.name }}</h3>
                <p class="character-desc">{{ character.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 作品特色 -->
        <section class="content-section fade-in delay-3">
          <h2 class="section-title">作品特色</h2>
          <div class="features">
            <div class="feature-card" v-for="(feature, index) in features" :key="index">
              <i :class="feature.icon + ' feature-icon'"></i>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-desc">{{ feature.description }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- 右侧侧边栏 -->
      <div class="sidebar">
        <div class="info-box fade-in delay-2">
          <h3 class="info-title">作品信息</h3>
          <ul class="info-list">
            <li><span class="info-label">作者：</span><span class="info-value">{{ workInfo.author }}</span></li>
            <li><span class="info-label">类型：</span><span class="info-value">{{ workInfo.type }}</span></li>
            <li><span class="info-label">状态：</span><span class="info-value">{{ workInfo.status }}</span></li>
            <li><span class="info-label">创作时间：</span><span class="info-value">{{ workInfo.creationTime }}</span></li>
            <li><span class="info-label">字数：</span><span class="info-value">{{ workInfo.wordCount }}</span></li>
            <li><span class="info-label">改编作品：</span><span class="info-value">{{ workInfo.adaptations }}</span></li>
          </ul>
        </div>

        <div class="info-box fade-in delay-3">
          <h3 class="info-title">修炼境界</h3>
          <ul class="info-list">
            <li v-for="(level, index) in cultivationLevels" :key="index">
              <span class="info-label">{{ level.name }}：</span>
              <span class="info-value">{{ level.stages }}</span>
            </li>
          </ul>
        </div>

        <div class="quote-box fade-in delay-4">
          <p class="quote-text">"修仙之路，本就是逆天而行。要么在仙途中走得更高更远，要么就身死道消，没有第三条路可选。"</p>
          <p class="quote-author">—— 韩立</p>
        </div>

        <div class="quote-box fade-in delay-4">
          <p class="quote-text">"修仙不是为了逃避世俗，而是为了超越一切，超越自己。"</p>
          <p class="quote-author">—— 南宫婉</p>
        </div>
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop.vue'
export default {
  components: {
    BackToTop
  },
  data() {
    return {
      currentChapter: 0,
      hoverCharacter: null,
      currentLevel: 3,
      selectedArtifact: null,
      chapters: [
        {
          title: "第一章：七玄门风云",
          content: `
            <p>韩立，一个来自青牛镇的普通农家少年，因身具灵根而被七玄门墨大夫收为弟子。在七玄门中，韩立初涉江湖，经历了师门争斗、江湖恩怨。他意外获得神秘小瓶，此瓶能催熟灵草，成为他日后修仙路上的关键。</p>
            <p>在七玄门期间，韩立结识了厉飞雨、张铁等同门，同时也遭遇了墨大夫的阴谋。墨大夫企图夺舍韩立，却被韩立反杀，获得其修仙功法《长春功》。此后，韩立离开七玄门，踏上真正的修仙之路。</p>
          `
        },
        {
          title: "第二章：黄枫谷筑基",
          content: `
            <p>韩立通过升仙大会加入黄枫谷，成为一名外门弟子。在黄枫谷，他低调修炼，凭借神秘小瓶培育灵药，修为稳步提升。期间结识了陈巧倩、聂盈等同门，并拜入李化元门下。</p>
            <p>在血色禁地试炼中，韩立历经生死考验，获得众多珍稀灵草。凭借这些资源，他成功炼制筑基丹，突破筑基期。筑基后，韩立开始涉足炼丹、制符等修仙百艺，为日后修行打下坚实基础。</p>
          `
        },
        {
          title: "第三章：乱星海奇遇",
          content: `
            <p>为躲避正魔大战，韩立通过古传送阵来到乱星海。在这里，他化名曲魂，以散修身份活动。乱星海资源丰富但危险重重，韩立加入星宫成为客卿长老，同时修炼大衍诀、青元剑诀等功法。</p>
            <p>在虚天殿探险中，韩立历经艰险，最终获得虚天鼎、乾蓝冰焰等至宝。期间收服了噬金虫，此虫日后成为他的重要战力。结丹成功后，韩立在乱星海建立起自己的势力，为结婴做准备。</p>
          `
        },
        {
          title: "第四章：大晋风云",
          content: `
            <p>结婴成功后，韩立重返天南，却发现故人已逝，物是人非。他参与幕兰草原之战，大展神威，名震天南。之后为寻找突破化神的机缘，韩立远赴大晋。</p>
            <p>在大晋，韩立卷入佛道之争，获得诸多机缘。他修复了元磁神山，修炼成元磁神光，解决了修炼瓶颈。在昆吾山封印之战中，韩立与诸多化神修士联手对抗古魔，最终成功封印古魔，获得通天灵宝。</p>
          `
        },
        {
          title: "第五章：灵界篇",
          content: `
            <p>突破化神后，韩立通过逆灵通道飞升灵界。在灵界，他面临更强大的敌人和更残酷的修炼环境。韩立加入天渊城，参与对抗妖族入侵的战斗，逐渐崭露头角。</p>
            <p>为突破炼虚期，韩立远赴蛮荒世界寻找机缘。期间收服了豹麟兽，获得金阙玉书，修炼成百脉炼宝诀。在广寒界中，韩立获得惊蛰诀等大机缘，最终突破合体期，成为灵界一方霸主。</p>
          `
        }
      ],
      characters: [
        {
          name: '韩立',
          description: '本作主角，资质普通但心智坚韧，行事谨慎，善于隐藏实力。拥有神秘小瓶催熟灵药，一路从凡人修炼至大乘期。',
          image: 'https://ts1.tc.mm.bing.net/th/id/R-C.8183a567fabd47638d3139314e07555e?rik=fN4ShLw9uBVTXQ&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20112%2f40%2fw480h360%2f20231125%2f6555-1cfdc35ec5e1a209f67e3561959885c4.jpg&ehk=N%2fitXBuIYsM9ce6rTrsVDYU7aFOvjY%2b%2bbOzxVB1KjJk%3d&risl=&pid=ImgRaw&r=0',
        },
        {
          name: '南宫婉',
          description: '掩月宗长老，韩立道侣。气质清冷，天资卓越，与韩立在血色禁地相识，经历诸多磨难后结为道侣。',
          image: 'https://ts1.tc.mm.bing.net/th/id/R-C.1aa2280113230fcc12ae7d634a7f4fcd?rik=qz4UwjiA6GIPJw&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd10012%2f200%2fw1080h720%2f20200624%2fac21-ivmqpci3628770.jpg&ehk=w89GUiU%2frL6aCWiM%2f7qb55RXMQPKxJbzpcSR%2besCmOQ%3d&risl=&pid=ImgRaw&r=0',
        },
        {
          name: '银月',
          description: '天奎狼王之妃，妖狼族公主，因故寄身于韩立的法宝中，后成为器灵，与韩立关系密切。',
          image: 'https://ts1.tc.mm.bing.net/th/id/R-C.1aa2280113230fcc12ae7d634a7f4fcd?rik=qz4UwjiA6GIPJw&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd10012%2f200%2fw1080h720%2f20200624%2fac21-ivmqpci3628770.jpg&ehk=w89GUiU%2frL6aCWiM%2f7qb55RXMQPKxJbzpcSR%2besCmOQ%3d&risl=&pid=ImgRaw&r=0',
        },
        {
          name: '大衍神君',
          description: '千竹教创派祖师，寄身傀儡中的上古修士，精通傀儡术和炼器术，对韩立帮助极大。',
          image: 'https://ts1.tc.mm.bing.net/th/id/R-C.1aa2280113230fcc12ae7d634a7f4fcd?rik=qz4UwjiA6GIPJw&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd10012%2f200%2fw1080h720%2f20200624%2fac21-ivmqpci3628770.jpg&ehk=w89GUiU%2frL6aCWiM%2f7qb55RXMQPKxJbzpcSR%2besCmOQ%3d&risl=&pid=ImgRaw&r=0',
        }
      ],
      features: [
        {
          title: '凡人流开山之作',
          description: '开创了"凡人流"修仙流派，主角没有逆天背景和运气，完全依靠自身努力和算计成长',
          icon: 'fas fa-user'
        },
        {
          title: '严谨的修炼体系',
          description: '构建了从炼气、筑基到化神、渡劫的完整修仙体系，每个境界都有详细设定',
          icon: 'fas fa-sitemap'
        },
        {
          title: '真实的人物刻画',
          description: '主角性格谨慎稳重，行事符合逻辑，配角形象丰满，没有脸谱化角色',
          icon: 'fas fa-brain'
        }
      ],
      workInfo: {
        author: '忘语',
        type: '仙侠、修真',
        status: '已完结（人界篇、灵界篇）',
        creationTime: '2008年-2013年',
        wordCount: '约747万字',
        adaptations: '动画、漫画、手游'
      },
      cultivationLevels: [
        { name: '炼气期', stages: '1-13层' },
        { name: '筑基期', stages: '初期、中期、后期' },
        { name: '结丹期', stages: '初期、中期、后期' },
        { name: '元婴期', stages: '初期、中期、后期' },
        { name: '化神期', stages: '初入、稳固、大成' },
        { name: '炼虚期', stages: '灵界境界' }
      ]
    };
  },
  methods: {
    changeChapter(index) {
      this.currentChapter = index;
    },
    showArtifactInfo(index) {
      this.selectedArtifact = index;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Serif SC', serif;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #333;
  line-height: 1.7;
  overflow-x: hidden;
  position: relative;
}

body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="%23e0e0e0" stroke-width="0.5"/></svg>');
  opacity: 0.15;
  z-index: -1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部样式 */
header {
  height: 180px;
  padding: 30px 0;
  text-align: center;
  position: relative;
  margin-bottom: 50px;
  max-width: 2000px;
  background-size: 105%; /* 将背景图放大到原始尺寸的150% */
  background-position: center; /* 确保中心区域显示 */
}

.logo {
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 5px;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}

.logo::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #5d93bb, transparent);
}

/* 导航 */
nav {
  margin: 30px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-container {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.nav-link {
  margin: 0 20px;
  text-decoration: none;
  color: #555;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #3a7ca5;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #3a7ca5;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

/* 主内容区 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  margin: 50px 0;
}

.content-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #f0f0f0;
}

.content-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #3a7ca5, #8fc1e3);
  border-radius: 3px;
}

.section-content {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
}

.section-content p {
  margin-bottom: 20px;
  text-align: justify;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.7);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-family: 'Noto Serif SC', serif;
}

.nav-btn:hover, .nav-btn.active {
  background: rgb(116, 116, 116);
  color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
}

/* 故事梗概区域 - 白色背景 */
.story-container {
  background: white;
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(212, 175, 55, 0.1);
  transition: all 0.5s ease;
}

.story-title {
  font-size: 2.2rem;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  font-family: 'Ma Shan Zheng', cursive;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding-bottom: 0.8rem;
}

.story-content {
  font-size: 1.1rem;
  line-height: 1.9;
  color: var(--text-color);
}

.story-content p {
  margin-bottom: 1.5rem;
  text-align: justify;
}

.story-content p:first-letter {
  font-size: 2.5rem;
  color: var(--accent-color);
  float: left;
  line-height: 0.8;
  margin-right: 8px;
  font-family: 'Ma Shan Zheng', cursive;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.character-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.character-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
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

.character-icon {
  font-size: 4rem;
  color: #3a7ca5;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
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

/* 侧边栏 */
.sidebar {
  position: sticky;
  top: 100px;
}

.info-box {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  border: 1px solid #f0f0f0;
}

.info-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.info-list {
  list-style: none;
}

.info-list li {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
}

.info-label {
  font-weight: bold;
  color: #3a7ca5;
  width: 100px;
  flex-shrink: 0;
}

.info-value {
  color: #555;
}

.quote-box {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 30px;
  border-radius: 12px;
  border-left: 4px solid #3a7ca5;
  margin-top: 30px;
}

.quote-text {
  font-style: italic;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
}

.quote-author {
  text-align: right;
  color: #666;
  font-size: 0.95rem;
}

/* 特色部分 */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  border: 1px solid #f0f0f0;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 2.5rem;
  color: #3a7ca5;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.feature-desc {
  color: #666;
  font-size: 0.95rem;
}

/* 页脚 */
footer {
  background: rgba(255, 255, 255, 0.95);
  padding: 50px 0 30px;
  margin-top: 70px;
  border-top: 1px solid #eee;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.footer-section {
  flex: 1;
  padding: 0 20px;
}

.footer-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  text-decoration: none;
  color: #666;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #3a7ca5;
}

.copyright {
  text-align: center;
  padding-top: 30px;
  color: #888;
  font-size: 0.9rem;
  border-top: 1px solid #f0f0f0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .logo {
    font-size: 3rem;
  }
  
  .nav-container {
    flex-wrap: wrap;
  }
  
  .nav-link {
    margin: 5px 10px;
  }
  
  .character-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .sidebar {
    grid-template-columns: 1fr;
  }
  
  .card:nth-child(3) {
    grid-column: span 1;
  }
  
  .artifacts {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .navigation {
    gap: 0.5rem;
  }
  
  .nav-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
</style>