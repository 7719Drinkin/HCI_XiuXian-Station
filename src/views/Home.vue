<template>
    <div id="web-bg"></div>
    <!-- 可以添加更多内容 -->
    <div class="content">
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <h1>欢迎来到凡人修仙传</h1>
        <p>这里是一个关于凡人修仙传的精彩世界。</p>
        <p>探索故事梗概、原作导航、信息百科和资源。</p>
        <p>点击上方导航栏开始你的修仙之旅！</p>
    </div>

</template>

<script>
export default {

}
</script>

<style>

#web-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0c2138; /* 备用背景色 */;
    filter: blur(1px);
    background-image: url('C:/Users/Drink/Desktop/Assignments/HCI/WebProject/HCI_finalpro/src/assets/web-bg1.png'); /* 替换为你的背景图片 */
    background-size: cover;
    background-position: center;
    z-index: -1;
    /* 添加渐变效果 */
    will-change: transform;
    background-attachment: fixed;
    animation: blur-to-clear 1s cubic-bezier(0.62, 0.21, 0.25, 1) 0s 1 normal backwards running,
        scale 1.5s cubic-bezier(0.62, 0.21, 0.25, 1) 0s 1 both;
}

.content {
    position: relative;
    z-index: 1; /* 确保内容在背景之上 */
    color: white;
    text-align: center;
    padding: 2rem;
    font-family: 'Arial', sans-serif;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: fadeIn 1s ease-in-out;
}

p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    animation: fadeIn 1s ease-in-out;
}


/* 动画定义 */
@keyframes blur-to-clear {
  0% {
    filter: blur(10px);
    opacity: 0.5;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes scale {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}

</style>