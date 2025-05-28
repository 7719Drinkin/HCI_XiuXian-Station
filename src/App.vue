<template>
  <div id='app'>
    <nav class='nav-links'>
      <router-link to="/home">首页</router-link>
      <router-link to="/synopsis">故事梗概</router-link>
      <router-link to="/original">原作导航</router-link>
      <router-link to="/information">信息百科</router-link>
      <router-link to="/resource">资源</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  /* 导航栏 */
  .app {
    background: #f8f9fa; /* 与背景色一致 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    padding: 1rem 5%;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-links a {
    text-decoration: none;
    color: #4a4a4a;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: #3498db;
  }
</style>