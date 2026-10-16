<template>
  <el-container class="page-header-wrap">
    <el-header class="page-header" height="auto">
      <div class="header-inner">
        <h1>
          <el-icon><User /></el-icon>
          Vue3个人简历
        </h1>
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          class="nav-menu"
          router
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
          <el-menu-item index="/project/list">项目中心</el-menu-item>
          <el-menu-item index="/article/list">文章列表</el-menu-item>
          <el-menu-item v-if="!authStore.isLogin" index="/login">登录</el-menu-item>
          <el-menu-item v-if="authStore.isLogin" index="/admin">后台管理</el-menu-item>
        </el-menu>
        <div class="header-right">
          <el-button
            v-if="authStore.isLogin"
            type="danger"
            plain
            size="small"
            @click="handleLogout"
          >
            <el-icon><SwitchButton /></el-icon>&nbsp;退出登录
          </el-button>
          <el-button size="small" @click="$emit('toggle-dark')">
            <el-icon><Moon v-if="!isDark" /><Sunny v-else /></el-icon>
            &nbsp;{{ isDark ? '浅色' : '暗色' }}
          </el-button>
        </div>
      </div>
    </el-header>
  </el-container>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const $route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
defineProps(['isDark'])
defineEmits(['toggle-dark'])

// 根据当前路由高亮菜单项
const activeMenu = computed(() => {
  if ($route.path.startsWith('/project')) return '/project/list'
  if ($route.path.startsWith('/article')) return '/article/list'
  return $route.path
})

const handleLogout = () => {
  authStore.logout()
  router.push('/home')
}
</script>
<style scoped>
.page-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
h1 {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}
.nav-menu {
  flex: 1;
  border-bottom: none;
  background: transparent;
}
.header-right {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
