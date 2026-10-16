<template>
<div class="container">
  <div class="card">
    <h2>404 页面不存在</h2>
    <p>访问地址无效</p>
    <button @click="goHome">返回首页</button>
  </div>
</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
<style scoped>
.container{
  padding:15px;
  margin-top:30px;
  display:flex;
  justify-content:center;
}
.card{
  border:1px solid var(--border);
  border-radius:12px;
  padding:24px;
  background:var(--card);
  color:var(--text);
  text-align:center;
}
button{
  margin-top:12px;
  padding:8px 16px;
  background:var(--primary);
  color:#fff;
  border:none;
  border-radius:8px;
  cursor:pointer;
}
button:hover{
  background:var(--primary-hover);
}
</style>
