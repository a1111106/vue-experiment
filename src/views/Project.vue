<template>
  <div class="container">
    <div class="card">
      <h2>项目中心</h2>
      <!-- ✅ 恢复RouterView，作为嵌套子路由出口！ -->
      <RouterView />
    </div>
  </div>
</template>
<script setup>
// 引入RouterView
import { RouterView } from 'vue-router'
</script>
<style scoped>
.container{
  padding:15px;
}
.card{
  border:1px solid var(--border);
  border-radius:12px;
  padding:20px;
  box-shadow: 0 4px 12px #00000015;
  background:var(--card);
  color:var(--text);
}
h2{
  text-align:center;
  margin-bottom:16px;
}
</style>
