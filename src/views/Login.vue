<template>
  <div class="container login-wrap">
    <el-card class="login-card" shadow="always">
      <template #header>
        <div class="login-title">
          <el-icon :size="22"><Lock /></el-icon>
          <span>后台登录</span>
        </div>
      </template>
      <el-alert
        title="演示账号：任意输入用户名密码即可登录"
        type="info"
        :closable="false"
        style="margin-bottom: 18px"
      />
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="60px"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable>
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="handleLogin"
          >
            <template #prefix><el-icon><Key /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Right" style="width: 100%" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/authStore'
const router = useRouter()
const authStore = useAuthStore()
const loginFormRef = ref()
const loginForm = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  authStore.login()
  ElMessage.success('登录成功，正在跳转后台管理')
  router.push('/admin')
}
</script>
<style scoped>
.login-wrap {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.login-card {
  width: 420px;
}
.login-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
}
</style>
