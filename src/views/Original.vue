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

<style>
.original-main {
  max-width: 600px;
  margin: 120px auto 0 auto;
  padding: 40px 24px;
  background: rgba(255,255,255,0.92);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  text-align: center;
  margin: 235px auto;
}
.original-title {
  font-size: 2rem;
  color: #ac97f7;
  margin-bottom: 32px;
  font-weight: bold;
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