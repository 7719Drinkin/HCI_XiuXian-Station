import { createRouter, createWebHistory } from 'vue-router'

// 导入你的组件
const Home = () => import('@/views/Home.vue')
const Synopsis = () => import('@/views/Synopsis.vue')
const Original = () => import('@/views/Original.vue')
const Information = () => import('@/views/Information.vue')
const Resource = () => import('@/views/Resource.vue')
const Artifact = () => import('@/views/Artifact.vue')

const routes = [
  {
    path: '/',         // 根路径
    redirect: '/home'  // 自动重定向到 /home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/synopsis',
    name: 'Synopsis',
    component: Synopsis
  },
  {
    path: '/original',
    name: 'Original',
    component: Original
  },
  {
    path: '/information',
    name: 'Information',
    component: Information
  },
  {
    path: '/resource',
    name: 'Resource',
    component: Resource
  },
  {
    path: '/artifact',
    name: 'Artifact',
    component: Artifact
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router