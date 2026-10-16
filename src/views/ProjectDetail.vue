<template>
<div class="container">
  <div class="card">
    <h2>项目详情</h2>
    <div v-if="item">
      <p>项目名称：{{item.name}}</p>
      <p>项目描述：{{item.content}}</p>
      <p>状态：{{item.status}}</p>
    </div>
    <div v-else style="color:var(--danger)">
      <p>未找到该项目</p>
    </div>
    <button @click="backToList">返回项目列表</button>
  </div>
</div>
</template>
<script setup>
import {useRoute,useRouter} from 'vue-router'
// 引入pinia项目仓库
import { useProjectStore } from '../stores/projectStore'
const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

// 从pinia全局列表查找项目，统一数据源
const item = projectStore.list.find(p => p.id === Number(route.params.id))

// 返回项目列表
const backToList = ()=>{
  router.push('/project/list')
}
</script>
<style scoped>
.container{
  padding:15px;
}
.card{
  border:1px solid var(--border);
  background:var(--card);
  color:var(--text);
  border-radius:12px;
  padding:20px;
}
h2{
  text-align:center;
  margin-bottom:12px;
}
p{
  margin:8px 0;
}
button{
  margin-top:10px;
  padding:6px 12px;
  cursor:pointer;
  background:var(--primary);
  color:#fff;
  border:none;
  border-radius:8px;
}
button:hover{
  background:var(--primary-hover);
}
</style>
