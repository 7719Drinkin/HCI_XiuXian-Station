<template>
  <div id="web-bg"></div>
  <!-- <h1>Original</h1> -->
  <div class="original-main">
    <h2 class="original-title">原作阅读资源</h2>
    <div class="resource-links">
      <a class="resource-btn" href="https://www.bilibili.com/bangumi/play/ep1231545/?share_source=copy_web" target="_blank">B站动画观看</a>
      <a class="resource-btn" href="https://www.qidian.com/book/107580/" target="_blank">起点小说阅读</a>
    </div>
  </div>
</template>

<script>
export default {

}
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
.original-main {
  max-width: 600px;
  margin: 120px auto 0 auto;
  padding: 40px 24px;
  background: rgba(255,255,255,0.92);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  text-align: center;
  margin: 233px auto;
  transition: all 0.3s ease;
}
body.dark-mode .original-main {
  background: #312742;
  color: #fff;
}
.original-title {
  font-size: 2rem;
  color: #ac97f7;
  margin-bottom: 32px;
  font-weight: bold;
  transition: all 0.3s ease;
}
body.dark-mode .original-title {
  color: #fff;
}
.resource-links {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
.resource-btn {
  display: inline-block;
  padding: 14px 36px;
  font-size: 1.15rem;
  color: #fff;
  background: linear-gradient(90deg, #ac97f7 60%, #7e6bc9 100%);
  border-radius: 32px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 2px 12px #ac97f733;
  transition: background 0.2s, box-shadow 0.2s;
}
.resource-btn:hover {
  background: linear-gradient(90deg, #7e6bc9 60%, #ac97f7 100%);
  box-shadow: 0 4px 24px #ac97f799;
}
</style>