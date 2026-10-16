<template>
  <div :class="{ dark: isDark }" class="app">
    <!-- 只保留Header里的导航，删除App中多余的nav，解决双导航问题 -->
    <Header :is-dark="isDark" @toggle-dark="isDark = !isDark" />
    
    <RouterView />
    <Footer />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
const isDark = ref(false)
const isLogin = ref(false)
// 读取登录状态，封装函数，登录/退出后可调用
function updateLoginState() {
  isLogin.value = localStorage.getItem('isLogin') === 'true'
}
onMounted(() => {
  updateLoginState()
  // 监听storage，其他页面登录后自动更新状态
  window.addEventListener('storage', updateLoginState)
})
// 退出登录
const handleLogout = () => {
  localStorage.removeItem('isLogin')
  updateLoginState()
}
</script>
<style>
:root {
  --bg: #f3f5f9;
  --card: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --border: #e5e7eb;
  --primary: #10b981;
  --primary-hover: #059669;
  --danger: #ef4444;
  --danger-hover: #dc2626;
  --shadow: 0 10px 30px rgba(0, 0, 0.06);
}
.dark {
  --bg: #0f172a;
  --card: #1e293b;
  --text: #f1f5f9;
  --muted: #94a3b8;
  --border: #334155;
  --primary: #34d399;
  --primary-hover: #10b981;
  --danger: #f87171;
  --danger-hover: #ef4444;
  --shadow: 0 10px 30px rgba(0, 0, 0.25);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Microsoft Yahei', 'PingFang SC', sans-serif;
}
.app {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s ease, color 0.3s ease;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 28px;
  box-shadow: var(--shadow);
  transition: background 0.3s ease, border-color 0.3s ease;
}
</style>
