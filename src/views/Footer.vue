<!-- src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-container">
      <p>© 2025 修仙小站 · 项目组</p>
      <a
        href="https://github.com/7719Drinkin/HCI_Project"
        target="_blank"
        class="github-link"
      >
        <i class="fab fa-github"></i> GitHub 项目
      </a>
    </div>
  </footer>
</template>

<script setup>
// 如果需要可以写逻辑，这里暂时纯展示
</script>

<style scoped>
.footer {
  background: white; /* 和 header 一致 */
  color: rgb(61, 61, 61);
  padding: 1.0rem 0;
  text-align: center;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, box-shadow 0.3s;
}


.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.github-link {
  color: #93c5fd;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.github-link:hover {
  color: #60a5fa;
}

.footer i {
  margin-right: 0.5rem;
}
</style>
