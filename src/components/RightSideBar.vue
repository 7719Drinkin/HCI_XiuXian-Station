<!-- RightSidebar.vue -->
<template>
  <div class="right-sidebar">
    <router-link
      v-for="item in links"
      :key="item.route"
      :to="item.route"
      class="sidebar-btn"
      :title="item.label"
    >
      {{ item.icon }}
    </router-link>
  </div>
</template>

<script setup>
const links = [
  { label: '故事梗概', route: '/synopsis', icon: '📖' },
  { label: '原作导航', route: '/original', icon: '📚' },
  { label: '信息百科', route: '/information', icon: '🧠' },
  { label: '资源中心', route: '/resource', icon: '💾' }
]
</script>

<script>
</script>

<style scoped>
.right-sidebar {
  position: fixed;
  top: 55%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999;
}

.sidebar-btn {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.sidebar-btn:hover {
  background: #ffffff;
  color: white;
  transform: scale(1.1);
}

body.dark-mode .sidebar-btn {
  background: #312742;
  color: white;
}
</style>
